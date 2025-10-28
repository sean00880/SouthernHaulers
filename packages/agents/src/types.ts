// Shared types for agents
import { z } from 'zod';

// ============================================================================
// Agent Response Types
// ============================================================================

export const AgentResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.any().optional(),
  reasoning: z.string().optional(), // Explainability
  confidence_score: z.number().min(0).max(1).optional(),
  timestamp: z.string().datetime(),
});

export type AgentResponse = z.infer<typeof AgentResponseSchema>;

// ============================================================================
// Risk Assessment
// ============================================================================

export const RiskLevel = z.enum(['low', 'medium', 'high', 'critical']);
export type RiskLevel = z.infer<typeof RiskLevel>;

export const RiskAssessmentSchema = z.object({
  risk_level: RiskLevel,
  risk_score: z.number().min(0).max(100),
  factors: z.array(
    z.object({
      factor: z.string(),
      impact: z.string(),
      weight: z.number(),
    })
  ),
  recommended_actions: z.array(z.string()),
  estimated_cost_impact: z.number().optional(),
});

export type RiskAssessment = z.infer<typeof RiskAssessmentSchema>;

// ============================================================================
// Agent Configuration
// ============================================================================

export const AgentConfigSchema = z.object({
  enabled: z.boolean().default(true),
  model: z.enum(['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo']).default('gpt-4-turbo'),
  temperature: z.number().min(0).max(1).default(0.7),
  max_tokens: z.number().default(1000),
  auto_execute: z.boolean().default(false), // If true, execute recommendations automatically
  require_approval: z.boolean().default(true),
});

export type AgentConfig = z.infer<typeof AgentConfigSchema>;
