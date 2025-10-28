// Compliance Agent: Monitor driver compliance (TWIC, Clearinghouse, Leasing Agreements)
import { z } from 'zod';
import type { Driver } from '@southernhaulers/domain';
import type { AgentResponse } from './types';
import dayjs from 'dayjs';

// ============================================================================
// Compliance Blocker Schema
// ============================================================================

export const ComplianceBlockerSchema = z.object({
  type: z.enum([
    'twic_expiring',
    'twic_expired',
    'twic_missing',
    'cdl_expiring',
    'cdl_expired',
    'medical_card_expiring',
    'medical_card_expired',
    'clearinghouse_consent_expired',
    'clearinghouse_consent_missing',
    'clearinghouse_violation',
    'leasing_agreement_missing',
    'leasing_agreement_expired',
    'leasing_agreement_unsigned',
  ]),

  severity: z.enum(['low', 'medium', 'high', 'critical']),
  blocking: z.boolean(), // If true, driver cannot be assigned

  // Description
  message: z.string(),
  action_required: z.string(),
  deadline: z.string().datetime().optional(),

  // Impact
  blocks_port_jobs: z.boolean().default(false),
  blocks_all_jobs: z.boolean().default(false),
});

export type ComplianceBlocker = z.infer<typeof ComplianceBlockerSchema>;

// ============================================================================
// Compliance Status Schema
// ============================================================================

export const ComplianceStatusSchema = z.object({
  driver_id: z.string().uuid(),
  driver_name: z.string(),

  // Overall status
  is_compliant: z.boolean(),
  compliance_score: z.number().min(0).max(100),

  // Blockers
  blockers: z.array(ComplianceBlockerSchema),
  warnings: z.array(ComplianceBlockerSchema),

  // Specific capabilities
  can_assign_port_jobs: z.boolean(),
  can_assign_general_jobs: z.boolean(),

  // Next actions
  recommended_actions: z.array(z.string()),

  // Timestamps
  checked_at: z.string().datetime(),
});

export type ComplianceStatus = z.infer<typeof ComplianceStatusSchema>;

// ============================================================================
// Compliance Agent Class
// ============================================================================

export class ComplianceAgent {
  private config: {
    enabled: boolean;
    auto_notify: boolean;
    warning_days_before_expiry: number;
  };

  constructor(config?: Partial<ComplianceAgent['config']>) {
    this.config = {
      enabled: config?.enabled ?? true,
      auto_notify: config?.auto_notify ?? true,
      warning_days_before_expiry: config?.warning_days_before_expiry ?? 30,
    };
  }

  /**
   * Check driver compliance status
   * Returns blockers and warnings for TWIC, CDL, Medical Card, Clearinghouse, Leasing
   */
  async checkDriverCompliance(driver: Driver): Promise<AgentResponse & { status?: ComplianceStatus }> {
    if (!this.config.enabled) {
      return {
        success: false,
        message: 'Compliance Agent is disabled',
        timestamp: new Date().toISOString(),
      };
    }

    try {
      const now = dayjs();
      const blockers: ComplianceBlocker[] = [];
      const warnings: ComplianceBlocker[] = [];

      // 1. TWIC (Transportation Worker Identification Credential) - Required for port jobs
      if (driver.twic_number) {
        const twic_check = this.checkTWIC(driver, now);
        if (twic_check.blocker) blockers.push(twic_check.blocker);
        if (twic_check.warning) warnings.push(twic_check.warning);
      } else {
        warnings.push({
          type: 'twic_missing',
          severity: 'low',
          blocking: false,
          message: 'TWIC card not on file',
          action_required: 'Upload TWIC card if driver will handle port jobs',
          blocks_port_jobs: true,
          blocks_all_jobs: false,
        });
      }

      // 2. CDL (Commercial Driver's License)
      const cdl_check = this.checkCDL(driver, now);
      if (cdl_check.blocker) blockers.push(cdl_check.blocker);
      if (cdl_check.warning) warnings.push(cdl_check.warning);

      // 3. Medical Card
      const medical_check = this.checkMedicalCard(driver, now);
      if (medical_check.blocker) blockers.push(medical_check.blocker);
      if (medical_check.warning) warnings.push(medical_check.warning);

      // 4. Clearinghouse (FMCSA Drug & Alcohol)
      const clearinghouse_check = this.checkClearinghouse(driver, now);
      if (clearinghouse_check.blocker) blockers.push(clearinghouse_check.blocker);
      if (clearinghouse_check.warning) warnings.push(clearinghouse_check.warning);

      // 5. Leasing Agreement (49 CFR Part 376 - for independent contractors)
      if (driver.employment_type === 'independent_contractor') {
        const leasing_check = this.checkLeasingAgreement(driver, now);
        if (leasing_check.blocker) blockers.push(leasing_check.blocker);
        if (leasing_check.warning) warnings.push(leasing_check.warning);
      }

      // Calculate compliance score (100 = fully compliant, 0 = major blockers)
      const blocker_weights = { critical: 50, high: 30, medium: 15, low: 5 };
      const total_deductions = blockers.reduce((sum, b) => sum + blocker_weights[b.severity], 0);
      const compliance_score = Math.max(0, 100 - total_deductions);

      const is_compliant = blockers.length === 0;
      const can_assign_port_jobs = !blockers.some((b) => b.blocks_port_jobs) && !warnings.some((w) => w.blocks_port_jobs);
      const can_assign_general_jobs = !blockers.some((b) => b.blocks_all_jobs);

      const status: ComplianceStatus = {
        driver_id: driver.id,
        driver_name: `${driver.first_name} ${driver.last_name}`,
        is_compliant,
        compliance_score,
        blockers,
        warnings,
        can_assign_port_jobs,
        can_assign_general_jobs,
        recommended_actions: this.generateRecommendedActions(blockers, warnings),
        checked_at: now.toISOString(),
      };

      return {
        success: true,
        message: is_compliant
          ? `Driver is fully compliant (score: ${compliance_score}/100)`
          : `Driver has ${blockers.length} compliance blocker(s) and ${warnings.length} warning(s)`,
        data: status,
        status,
        reasoning: this.generateComplianceExplanation(status),
        confidence_score: 0.95,
        timestamp: now.toISOString(),
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to check compliance: ${error.message}`,
        timestamp: new Date().toISOString(),
      };
    }
  }

  /**
   * Check TWIC card status
   */
  private checkTWIC(
    driver: Driver,
    now: dayjs.Dayjs
  ): { blocker?: ComplianceBlocker; warning?: ComplianceBlocker } {
    if (!driver.twic_expiry) return {};

    const expiry = dayjs(driver.twic_expiry);
    const days_until_expiry = expiry.diff(now, 'days');

    if (days_until_expiry < 0) {
      // Expired
      return {
        blocker: {
          type: 'twic_expired',
          severity: 'high',
          blocking: true,
          message: `TWIC card expired on ${expiry.format('YYYY-MM-DD')}`,
          action_required: 'Renew TWIC card immediately',
          deadline: now.add(7, 'days').toISOString(),
          blocks_port_jobs: true,
          blocks_all_jobs: false,
        },
      };
    } else if (days_until_expiry <= this.config.warning_days_before_expiry) {
      // Expiring soon
      return {
        warning: {
          type: 'twic_expiring',
          severity: days_until_expiry <= 7 ? 'high' : 'medium',
          blocking: false,
          message: `TWIC card expires in ${days_until_expiry} days`,
          action_required: 'Schedule TWIC renewal',
          deadline: expiry.toISOString(),
          blocks_port_jobs: false,
          blocks_all_jobs: false,
        },
      };
    }

    return {};
  }

  /**
   * Check CDL status
   */
  private checkCDL(
    driver: Driver,
    now: dayjs.Dayjs
  ): { blocker?: ComplianceBlocker; warning?: ComplianceBlocker } {
    if (!driver.cdl_expiry) return {};

    const expiry = dayjs(driver.cdl_expiry);
    const days_until_expiry = expiry.diff(now, 'days');

    if (days_until_expiry < 0) {
      return {
        blocker: {
          type: 'cdl_expired',
          severity: 'critical',
          blocking: true,
          message: `CDL expired on ${expiry.format('YYYY-MM-DD')}`,
          action_required: 'Renew CDL immediately - cannot drive until renewed',
          deadline: now.toISOString(),
          blocks_port_jobs: true,
          blocks_all_jobs: true,
        },
      };
    } else if (days_until_expiry <= this.config.warning_days_before_expiry) {
      return {
        warning: {
          type: 'cdl_expiring',
          severity: days_until_expiry <= 7 ? 'high' : 'medium',
          blocking: false,
          message: `CDL expires in ${days_until_expiry} days`,
          action_required: 'Schedule CDL renewal',
          deadline: expiry.toISOString(),
          blocks_port_jobs: false,
          blocks_all_jobs: false,
        },
      };
    }

    return {};
  }

  /**
   * Check Medical Card status
   */
  private checkMedicalCard(
    driver: Driver,
    now: dayjs.Dayjs
  ): { blocker?: ComplianceBlocker; warning?: ComplianceBlocker } {
    if (!driver.medical_card_expiry) return {};

    const expiry = dayjs(driver.medical_card_expiry);
    const days_until_expiry = expiry.diff(now, 'days');

    if (days_until_expiry < 0) {
      return {
        blocker: {
          type: 'medical_card_expired',
          severity: 'critical',
          blocking: true,
          message: `Medical card expired on ${expiry.format('YYYY-MM-DD')}`,
          action_required: 'Obtain new DOT medical card - cannot drive until renewed',
          deadline: now.toISOString(),
          blocks_port_jobs: true,
          blocks_all_jobs: true,
        },
      };
    } else if (days_until_expiry <= this.config.warning_days_before_expiry) {
      return {
        warning: {
          type: 'medical_card_expiring',
          severity: days_until_expiry <= 7 ? 'high' : 'medium',
          blocking: false,
          message: `Medical card expires in ${days_until_expiry} days`,
          action_required: 'Schedule DOT physical exam',
          deadline: expiry.toISOString(),
          blocks_port_jobs: false,
          blocks_all_jobs: false,
        },
      };
    }

    return {};
  }

  /**
   * Check Clearinghouse consent status (FMCSA Drug & Alcohol)
   */
  private checkClearinghouse(
    driver: Driver,
    now: dayjs.Dayjs
  ): { blocker?: ComplianceBlocker; warning?: ComplianceBlocker } {
    if (!driver.clearinghouse_consent_date) {
      return {
        blocker: {
          type: 'clearinghouse_consent_missing',
          severity: 'critical',
          blocking: true,
          message: 'Clearinghouse consent not on file',
          action_required: 'Obtain Clearinghouse consent form (FMCSA requirement)',
          deadline: now.add(7, 'days').toISOString(),
          blocks_port_jobs: true,
          blocks_all_jobs: true,
        },
      };
    }

    const consent_date = dayjs(driver.clearinghouse_consent_date);
    const months_since_consent = now.diff(consent_date, 'months');

    // Clearinghouse consent must be renewed annually
    if (months_since_consent > 12) {
      return {
        blocker: {
          type: 'clearinghouse_consent_expired',
          severity: 'high',
          blocking: true,
          message: 'Clearinghouse consent expired (older than 12 months)',
          action_required: 'Obtain new Clearinghouse consent form',
          deadline: now.add(7, 'days').toISOString(),
          blocks_port_jobs: true,
          blocks_all_jobs: true,
        },
      };
    }

    return {};
  }

  /**
   * Check Leasing Agreement status (49 CFR Part 376 - Truth-in-Leasing)
   */
  private checkLeasingAgreement(
    driver: Driver,
    now: dayjs.Dayjs
  ): { blocker?: ComplianceBlocker; warning?: ComplianceBlocker } {
    if (!driver.leasing_agreement_signed) {
      return {
        blocker: {
          type: 'leasing_agreement_missing',
          severity: 'critical',
          blocking: true,
          message: 'Truth-in-Leasing agreement not signed (required for independent contractors)',
          action_required: 'Sign leasing agreement per 49 CFR Part 376',
          deadline: now.add(3, 'days').toISOString(),
          blocks_port_jobs: true,
          blocks_all_jobs: true,
        },
      };
    }

    // Check if leasing agreement is expired (if applicable)
    // Note: Trip leases vs. term leases have different expiry logic
    // This is a simplified check

    return {};
  }

  /**
   * Generate recommended actions
   */
  private generateRecommendedActions(
    blockers: ComplianceBlocker[],
    warnings: ComplianceBlocker[]
  ): string[] {
    const actions = new Set<string>();

    blockers.forEach((b) => actions.add(b.action_required));
    warnings.forEach((w) => actions.add(w.action_required));

    return Array.from(actions);
  }

  /**
   * Generate compliance explanation
   */
  private generateComplianceExplanation(status: ComplianceStatus): string {
    if (status.is_compliant) {
      return `Driver is fully compliant with all FMCSA and DOT regulations. Compliance score: ${status.compliance_score}/100.`;
    }

    const critical_blockers = status.blockers.filter((b) => b.severity === 'critical');
    const high_blockers = status.blockers.filter((b) => b.severity === 'high');

    const parts: string[] = [];

    if (critical_blockers.length > 0) {
      parts.push(`${critical_blockers.length} critical blocker(s) preventing assignment`);
    }

    if (high_blockers.length > 0) {
      parts.push(`${high_blockers.length} high-priority issue(s)`);
    }

    if (!status.can_assign_port_jobs) {
      parts.push('cannot be assigned to port jobs');
    }

    if (!status.can_assign_general_jobs) {
      parts.push('cannot be assigned to any jobs');
    }

    return parts.join('; ') + `. Compliance score: ${status.compliance_score}/100.`;
  }
}
