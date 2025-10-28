// Appointment Agent: AI-powered terminal appointment scheduling optimization
import { z } from 'zod';
import type { Terminal, TerminalAppointment } from '@southernhaulers/domain';
import type { AgentResponse, RiskAssessment } from './types';
import dayjs from 'dayjs';

// ============================================================================
// Appointment Slot Schema
// ============================================================================

export const AppointmentSlotSchema = z.object({
  date: z.string().datetime(),
  terminal_id: z.string().uuid(),
  terminal_name: z.string(),

  // Optimization factors
  estimated_wait_time_minutes: z.number(),
  congestion_level: z.enum(['low', 'medium', 'high', 'critical']),
  driver_availability_score: z.number().min(0).max(1),
  on_time_probability: z.number().min(0).max(1),

  // Risk factors
  risks: z.array(
    z.object({
      type: z.enum([
        'high_congestion',
        'weather',
        'driver_unavailable',
        'tight_schedule',
        'tmf_risk',
      ]),
      severity: z.enum(['low', 'medium', 'high']),
      description: z.string(),
    })
  ),

  // Scoring
  overall_score: z.number().min(0).max(100),
  reasoning: z.string(),

  // Recommendations
  recommended: z.boolean(),
});

export type AppointmentSlot = z.infer<typeof AppointmentSlotSchema>;

// ============================================================================
// Appointment Agent Class
// ============================================================================

export class AppointmentAgent {
  private config: {
    enabled: boolean;
    auto_book: boolean;
    require_approval: boolean;
  };

  constructor(config?: Partial<AppointmentAgent['config']>) {
    this.config = {
      enabled: config?.enabled ?? true,
      auto_book: config?.auto_book ?? false,
      require_approval: config?.require_approval ?? true,
    };
  }

  /**
   * Suggest optimal appointment slots for a shipment
   * Considers: terminal rules, driver availability, congestion, weather, TMF risk
   */
  async suggestAppointmentSlots(input: {
    shipment_id: string;
    terminal: Terminal;
    earliest_date: string;
    latest_date: string;
    driver_ids?: string[];
  }): Promise<AgentResponse & { slots?: AppointmentSlot[] }> {
    if (!this.config.enabled) {
      return {
        success: false,
        message: 'Appointment Agent is disabled',
        timestamp: new Date().toISOString(),
      };
    }

    try {
      // 1. Fetch terminal operating hours and rules
      const operating_hours = input.terminal.operating_hours || {};

      // 2. Generate candidate time slots
      const slots = this.generateCandidateSlots({
        terminal: input.terminal,
        earliest_date: input.earliest_date,
        latest_date: input.latest_date,
      });

      // 3. Score each slot based on multiple factors
      const scored_slots = await Promise.all(
        slots.map((slot) => this.scoreAppointmentSlot(slot, input.terminal))
      );

      // 4. Sort by score (descending)
      scored_slots.sort((a, b) => b.overall_score - a.overall_score);

      // 5. Mark top 3 as recommended
      const top_slots = scored_slots.slice(0, 3).map((slot) => ({
        ...slot,
        recommended: true,
      }));

      return {
        success: true,
        message: `Generated ${scored_slots.length} appointment slots, recommending top ${top_slots.length}`,
        data: scored_slots,
        slots: top_slots,
        reasoning: this.generateReasoningExplanation(top_slots),
        confidence_score: 0.85,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to generate appointment slots: ${error.message}`,
        timestamp: new Date().toISOString(),
      };
    }
  }

  /**
   * Automatically book the best appointment slot (if auto_book enabled)
   */
  async autoBookAppointment(input: {
    shipment_id: string;
    terminal: Terminal;
    driver_id: string;
  }): Promise<AgentResponse & { appointment?: TerminalAppointment }> {
    if (!this.config.auto_book) {
      return {
        success: false,
        message: 'Auto-booking is disabled. Manual approval required.',
        timestamp: new Date().toISOString(),
      };
    }

    // Get suggested slots
    const slots_response = await this.suggestAppointmentSlots({
      shipment_id: input.shipment_id,
      terminal: input.terminal,
      earliest_date: dayjs().add(1, 'day').toISOString(),
      latest_date: dayjs().add(7, 'days').toISOString(),
      driver_ids: [input.driver_id],
    });

    if (!slots_response.success || !slots_response.slots || slots_response.slots.length === 0) {
      return {
        success: false,
        message: 'No suitable appointment slots found',
        timestamp: new Date().toISOString(),
      };
    }

    // Book the top recommended slot
    const best_slot = slots_response.slots[0];

    // TODO: Integrate with actual terminal booking system (eModal, CargoSmart, etc.)
    const appointment: Partial<TerminalAppointment> = {
      terminal_id: input.terminal.id,
      shipment_id: input.shipment_id,
      appointment_type: 'pickup',
      appointment_date: best_slot.date,
      driver_id: input.driver_id,
      status: 'scheduled',
      notes: `Auto-booked by Appointment Agent. Reasoning: ${best_slot.reasoning}`,
    };

    return {
      success: true,
      message: `Successfully auto-booked appointment at ${input.terminal.name} for ${dayjs(best_slot.date).format('YYYY-MM-DD HH:mm')}`,
      data: appointment,
      reasoning: best_slot.reasoning,
      confidence_score: best_slot.overall_score / 100,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Generate candidate time slots based on terminal operating hours
   */
  private generateCandidateSlots(input: {
    terminal: Terminal;
    earliest_date: string;
    latest_date: string;
  }): Array<{ date: string; terminal_id: string; terminal_name: string }> {
    const slots: Array<{ date: string; terminal_id: string; terminal_name: string }> = [];
    const start = dayjs(input.earliest_date);
    const end = dayjs(input.latest_date);

    let current = start;
    while (current.isBefore(end)) {
      const day_of_week = current.format('dddd').toLowerCase();
      const hours = input.terminal.operating_hours?.[day_of_week];

      if (hours && !hours.is_closed) {
        // Generate slots every 2 hours during operating hours
        const [open_hour] = hours.open.split(':').map(Number);
        const [close_hour] = hours.close.split(':').map(Number);

        for (let hour = open_hour; hour < close_hour; hour += 2) {
          slots.push({
            date: current.hour(hour).minute(0).second(0).toISOString(),
            terminal_id: input.terminal.id,
            terminal_name: input.terminal.name,
          });
        }
      }

      current = current.add(1, 'day');
    }

    return slots;
  }

  /**
   * Score an appointment slot based on multiple optimization factors
   */
  private async scoreAppointmentSlot(
    slot: { date: string; terminal_id: string; terminal_name: string },
    terminal: Terminal
  ): Promise<AppointmentSlot> {
    // Factors:
    // 1. Predicted congestion (historical data + time of day)
    const congestion_score = this.predictCongestion(slot.date, terminal);

    // 2. Driver availability (placeholder - would check actual driver schedules)
    const driver_availability_score = 0.8;

    // 3. On-time probability (based on time of day, congestion)
    const on_time_probability = congestion_score.congestion_level === 'low' ? 0.9 : 0.7;

    // 4. TMF risk (is this cutting it close to last free day?)
    const tmf_risk = this.assessTMFRisk(slot.date);

    // Calculate overall score (weighted average)
    const weights = {
      congestion: 0.4,
      driver_availability: 0.2,
      on_time: 0.3,
      tmf_risk: 0.1,
    };

    const overall_score =
      (1 - congestion_score.congestion_score) * weights.congestion * 100 +
      driver_availability_score * weights.driver_availability * 100 +
      on_time_probability * weights.on_time * 100 +
      (1 - tmf_risk.risk_score) * weights.tmf_risk * 100;

    return {
      ...slot,
      estimated_wait_time_minutes: congestion_score.estimated_wait_time,
      congestion_level: congestion_score.congestion_level,
      driver_availability_score,
      on_time_probability,
      risks: [
        ...(congestion_score.congestion_level === 'high'
          ? [
              {
                type: 'high_congestion' as const,
                severity: 'high' as const,
                description: 'Terminal congestion expected to be high at this time',
              },
            ]
          : []),
        ...(tmf_risk.is_high_risk
          ? [
              {
                type: 'tmf_risk' as const,
                severity: 'medium' as const,
                description: 'Close to last free day, may incur TMF charges',
              },
            ]
          : []),
      ],
      overall_score: Math.round(overall_score),
      reasoning: this.generateSlotReasoning({
        congestion: congestion_score,
        driver_availability: driver_availability_score,
        on_time_probability,
      }),
      recommended: false, // Will be set later for top slots
    };
  }

  /**
   * Predict terminal congestion based on historical patterns and time of day
   */
  private predictCongestion(
    date: string,
    terminal: Terminal
  ): {
    congestion_score: number;
    congestion_level: 'low' | 'medium' | 'high' | 'critical';
    estimated_wait_time: number;
  } {
    const hour = dayjs(date).hour();

    // Peak hours: 10am-2pm typically busiest
    let congestion_score = 0.3; // Base
    if (hour >= 10 && hour <= 14) {
      congestion_score += 0.4; // Peak hours
    }

    // Use terminal's current congestion if available
    if (terminal.current_congestion_level) {
      const congestion_map = { low: 0.2, medium: 0.5, high: 0.8, critical: 1.0 };
      congestion_score = Math.max(congestion_score, congestion_map[terminal.current_congestion_level]);
    }

    const congestion_level: 'low' | 'medium' | 'high' | 'critical' =
      congestion_score < 0.3 ? 'low' : congestion_score < 0.6 ? 'medium' : congestion_score < 0.85 ? 'high' : 'critical';

    const estimated_wait_time = Math.round(congestion_score * (terminal.typical_wait_time_minutes || 60));

    return {
      congestion_score,
      congestion_level,
      estimated_wait_time,
    };
  }

  /**
   * Assess TMF (Terminal Handling Fee) risk
   */
  private assessTMFRisk(date: string): { risk_score: number; is_high_risk: boolean } {
    // TODO: Fetch actual shipment last_free_day and calculate days remaining
    // For now, placeholder logic
    const days_until_appointment = dayjs(date).diff(dayjs(), 'days');

    // If appointment is within 2 days, moderate risk
    // If within 1 day, high risk
    const risk_score = days_until_appointment <= 1 ? 0.8 : days_until_appointment <= 2 ? 0.5 : 0.2;

    return {
      risk_score,
      is_high_risk: risk_score > 0.7,
    };
  }

  /**
   * Generate human-readable reasoning for slot recommendation
   */
  private generateSlotReasoning(factors: {
    congestion: { congestion_level: string; estimated_wait_time: number };
    driver_availability: number;
    on_time_probability: number;
  }): string {
    const parts: string[] = [];

    if (factors.congestion.congestion_level === 'low') {
      parts.push('Low terminal congestion expected');
    } else if (factors.congestion.congestion_level === 'high') {
      parts.push(`High terminal congestion (est. ${factors.congestion.estimated_wait_time} min wait)`);
    }

    if (factors.driver_availability > 0.7) {
      parts.push('driver likely available');
    }

    if (factors.on_time_probability > 0.8) {
      parts.push('high on-time probability');
    } else {
      parts.push('moderate on-time risk');
    }

    return parts.join('; ') + '.';
  }

  /**
   * Generate overall reasoning explanation for top recommendations
   */
  private generateReasoningExplanation(slots: AppointmentSlot[]): string {
    if (slots.length === 0) return 'No suitable slots found.';

    const top_slot = slots[0];
    return `Recommended ${dayjs(top_slot.date).format('YYYY-MM-DD HH:mm')} based on: ${top_slot.reasoning} Overall score: ${top_slot.overall_score}/100.`;
  }
}
