// Exception Agent: Proactive risk detection for TMF, per diem, and delivery exceptions
import { z } from 'zod';
import type { Shipment } from '@southernhaulers/domain';
import type { AgentResponse, RiskAssessment, RiskLevel } from './types';
import dayjs from 'dayjs';

// ============================================================================
// Exception Alert Schema
// ============================================================================

export const ExceptionAlertSchema = z.object({
  id: z.string().uuid(),
  shipment_id: z.string().uuid(),
  shipment_number: z.string(),

  // Alert details
  type: z.enum([
    'tmf_exceeded',
    'tmf_approaching',
    'per_diem_accruing',
    'per_diem_high',
    'driver_delayed',
    'eta_variance_high',
    'appointment_missed',
    'terminal_congestion',
    'weather_delay',
  ]),

  severity: z.enum(['low', 'medium', 'high', 'critical']),
  status: z.enum(['active', 'acknowledged', 'resolved', 'dismissed']),

  // Impact
  message: z.string(),
  estimated_cost_impact: z.number(), // In dollars
  recommended_actions: z.array(z.string()),

  // Context
  current_state: z.any().optional(),
  risk_assessment: z.any().optional(),

  // Resolution
  acknowledged_by: z.string().uuid().optional(),
  acknowledged_at: z.string().datetime().optional(),
  resolved_by: z.string().uuid().optional(),
  resolved_at: z.string().datetime().optional(),
  resolution_notes: z.string().optional(),

  // Metadata
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type ExceptionAlert = z.infer<typeof ExceptionAlertSchema>;

// ============================================================================
// Exception Agent Class
// ============================================================================

export class ExceptionAgent {
  private config: {
    enabled: boolean;
    auto_notify: boolean;
    escalation_threshold_dollars: number;
  };

  constructor(config?: Partial<ExceptionAgent['config']>) {
    this.config = {
      enabled: config?.enabled ?? true,
      auto_notify: config?.auto_notify ?? true,
      escalation_threshold_dollars: config?.escalation_threshold_dollars ?? 500,
    };
  }

  /**
   * Detect all risks for a shipment
   */
  async detectRisks(shipment: Shipment): Promise<AgentResponse & { alerts?: ExceptionAlert[] }> {
    if (!this.config.enabled) {
      return {
        success: false,
        message: 'Exception Agent is disabled',
        timestamp: new Date().toISOString(),
      };
    }

    try {
      const alerts: ExceptionAlert[] = [];

      // 1. TMF (Terminal Handling Fee) risk
      const tmf_alert = await this.checkTMFRisk(shipment);
      if (tmf_alert) alerts.push(tmf_alert);

      // 2. Per Diem risk
      const per_diem_alert = await this.checkPerDiemRisk(shipment);
      if (per_diem_alert) alerts.push(per_diem_alert);

      // 3. Driver delay / ETA variance
      const eta_alert = await this.checkETAVariance(shipment);
      if (eta_alert) alerts.push(eta_alert);

      // 4. Appointment status
      const appointment_alert = await this.checkAppointmentStatus(shipment);
      if (appointment_alert) alerts.push(appointment_alert);

      // Calculate total estimated cost impact
      const total_cost_impact = alerts.reduce((sum, alert) => sum + alert.estimated_cost_impact, 0);

      return {
        success: true,
        message: alerts.length > 0
          ? `Detected ${alerts.length} risk(s) with total estimated impact of $${total_cost_impact}`
          : 'No risks detected',
        data: { alerts, total_cost_impact },
        alerts,
        reasoning: this.generateRiskExplanation(alerts),
        confidence_score: 0.9,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to detect risks: ${error.message}`,
        timestamp: new Date().toISOString(),
      };
    }
  }

  /**
   * Check for TMF (Terminal Handling Fee) risk
   * TMF typically kicks in after "last free day" at the terminal
   */
  private async checkTMFRisk(shipment: Shipment): Promise<ExceptionAlert | null> {
    if (!shipment.last_free_day) return null;

    const now = dayjs();
    const last_free_day = dayjs(shipment.last_free_day);
    const days_overdue = now.diff(last_free_day, 'days');

    if (days_overdue > 0) {
      // Already exceeded last free day
      const tmf_per_day = 75; // Typical TMF fee
      const estimated_cost = days_overdue * tmf_per_day;

      return {
        id: crypto.randomUUID(),
        shipment_id: shipment.id,
        shipment_number: shipment.shipment_number,
        type: 'tmf_exceeded',
        severity: days_overdue > 3 ? 'critical' : days_overdue > 1 ? 'high' : 'medium',
        status: 'active',
        message: `TMF charges accruing: ${days_overdue} days past last free day`,
        estimated_cost_impact: estimated_cost,
        recommended_actions: [
          'Expedite container pickup immediately',
          'Contact terminal for potential waiver',
          'Assign priority driver',
          `Current estimated charges: $${estimated_cost}`,
        ],
        current_state: {
          last_free_day: last_free_day.format('YYYY-MM-DD'),
          days_overdue,
          daily_rate: tmf_per_day,
        },
        created_at: now.toISOString(),
        updated_at: now.toISOString(),
      };
    } else if (days_overdue >= -2) {
      // Approaching last free day (within 2 days)
      return {
        id: crypto.randomUUID(),
        shipment_id: shipment.id,
        shipment_number: shipment.shipment_number,
        type: 'tmf_approaching',
        severity: 'medium',
        status: 'active',
        message: `Approaching last free day (${Math.abs(days_overdue)} days remaining)`,
        estimated_cost_impact: 0,
        recommended_actions: [
          'Schedule pickup before last free day',
          'Confirm driver assignment',
          'Verify terminal appointment',
        ],
        current_state: {
          last_free_day: last_free_day.format('YYYY-MM-DD'),
          days_remaining: Math.abs(days_overdue),
        },
        created_at: now.toISOString(),
        updated_at: now.toISOString(),
      };
    }

    return null;
  }

  /**
   * Check for Per Diem risk
   * Per diem charges accrue after "free days" for container usage
   */
  private async checkPerDiemRisk(shipment: Shipment): Promise<ExceptionAlert | null> {
    if (!shipment.container_available_date) return null;

    const now = dayjs();
    const available_date = dayjs(shipment.container_available_date);
    const days_in_use = now.diff(available_date, 'days');
    const free_days = 5; // Typical free days
    const per_diem_rate = 100; // Per day

    if (days_in_use > free_days) {
      const days_accruing = days_in_use - free_days;
      const estimated_cost = days_accruing * per_diem_rate;

      return {
        id: crypto.randomUUID(),
        shipment_id: shipment.id,
        shipment_number: shipment.shipment_number,
        type: days_accruing > 3 ? 'per_diem_high' : 'per_diem_accruing',
        severity: days_accruing > 5 ? 'high' : 'medium',
        status: 'active',
        message: `Per diem charges accruing: ${days_accruing} days beyond free time`,
        estimated_cost_impact: estimated_cost,
        recommended_actions: [
          'Return container ASAP',
          'Negotiate extended free time with shipping line',
          'Expedite delivery',
          `Current charges: $${estimated_cost}`,
        ],
        current_state: {
          container_available_date: available_date.format('YYYY-MM-DD'),
          days_in_use,
          free_days,
          days_accruing,
          daily_rate: per_diem_rate,
        },
        created_at: now.toISOString(),
        updated_at: now.toISOString(),
      };
    }

    return null;
  }

  /**
   * Check for ETA variance / driver delay
   */
  private async checkETAVariance(shipment: Shipment): Promise<ExceptionAlert | null> {
    if (!shipment.driver_id || shipment.status !== 'in_transit') return null;

    // TODO: Fetch real-time driver location and calculate actual ETA variance
    // For now, using placeholder logic
    const eta_variance_minutes = 45; // Placeholder

    if (eta_variance_minutes > 30) {
      return {
        id: crypto.randomUUID(),
        shipment_id: shipment.id,
        shipment_number: shipment.shipment_number,
        type: 'driver_delayed',
        severity: eta_variance_minutes > 60 ? 'high' : 'medium',
        status: 'active',
        message: `Driver running ${eta_variance_minutes} minutes behind schedule`,
        estimated_cost_impact: 0, // May result in missed appointment (see next check)
        recommended_actions: [
          'Notify customer of delay',
          'Check if appointment needs to be rescheduled',
          'Contact driver for status update',
        ],
        current_state: {
          eta_variance_minutes,
          driver_id: shipment.driver_id,
          driver_name: shipment.driver_name,
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    }

    return null;
  }

  /**
   * Check appointment status
   */
  private async checkAppointmentStatus(shipment: Shipment): Promise<ExceptionAlert | null> {
    if (!shipment.appointment_date) return null;

    const now = dayjs();
    const appointment = dayjs(shipment.appointment_date);

    // Check if appointment was missed (more than 2 hours ago and status not updated)
    if (
      now.isAfter(appointment.add(2, 'hours')) &&
      shipment.status !== 'at_terminal' &&
      shipment.status !== 'delivered'
    ) {
      return {
        id: crypto.randomUUID(),
        shipment_id: shipment.id,
        shipment_number: shipment.shipment_number,
        type: 'appointment_missed',
        severity: 'high',
        status: 'active',
        message: `Appointment may have been missed at ${appointment.format('YYYY-MM-DD HH:mm')}`,
        estimated_cost_impact: 150, // Potential rescheduling fee + detention
        recommended_actions: [
          'Contact driver immediately',
          'Verify appointment status with terminal',
          'Reschedule if necessary',
          'Update shipment status',
        ],
        current_state: {
          appointment_date: appointment.format('YYYY-MM-DD HH:mm'),
          current_status: shipment.status,
        },
        created_at: now.toISOString(),
        updated_at: now.toISOString(),
      };
    }

    return null;
  }

  /**
   * Generate human-readable risk explanation
   */
  private generateRiskExplanation(alerts: ExceptionAlert[]): string {
    if (alerts.length === 0) return 'All shipment parameters within acceptable ranges.';

    const critical_alerts = alerts.filter((a) => a.severity === 'critical');
    const high_alerts = alerts.filter((a) => a.severity === 'high');

    const parts: string[] = [];

    if (critical_alerts.length > 0) {
      parts.push(`${critical_alerts.length} critical issue(s) requiring immediate attention`);
    }

    if (high_alerts.length > 0) {
      parts.push(`${high_alerts.length} high-priority issue(s)`);
    }

    const total_cost = alerts.reduce((sum, a) => sum + a.estimated_cost_impact, 0);
    if (total_cost > 0) {
      parts.push(`estimated cost exposure: $${total_cost}`);
    }

    return parts.join('; ') + '.';
  }

  /**
   * Calculate risk score for a shipment (0-100)
   */
  async calculateRiskScore(shipment: Shipment): Promise<RiskAssessment> {
    const risks_response = await this.detectRisks(shipment);
    const alerts = risks_response.alerts || [];

    // Weighted risk scoring
    const severity_weights = {
      low: 10,
      medium: 30,
      high: 60,
      critical: 100,
    };

    const total_risk_points = alerts.reduce(
      (sum, alert) => sum + severity_weights[alert.severity],
      0
    );

    // Cap at 100
    const risk_score = Math.min(total_risk_points, 100);

    const risk_level: RiskLevel =
      risk_score < 20 ? 'low' : risk_score < 50 ? 'medium' : risk_score < 80 ? 'high' : 'critical';

    return {
      risk_level,
      risk_score,
      factors: alerts.map((alert) => ({
        factor: alert.type,
        impact: alert.message,
        weight: severity_weights[alert.severity],
      })),
      recommended_actions: alerts.flatMap((alert) => alert.recommended_actions),
      estimated_cost_impact: alerts.reduce((sum, alert) => sum + alert.estimated_cost_impact, 0),
    };
  }
}
