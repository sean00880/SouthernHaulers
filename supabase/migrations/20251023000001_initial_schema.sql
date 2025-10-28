-- =====================================================================
-- Southern Haulers TMS - Initial Database Schema
-- Migration: 20251023000001_initial_schema
-- Description: Creates all core tables with RLS policies
-- Author: Claude Code
-- Date: 2025-10-23
-- =====================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "vector";

-- =====================================================================
-- 1. ORGANIZATIONS (Multi-Tenant Root)
-- =====================================================================
CREATE TABLE IF NOT EXISTS organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  features JSONB NOT NULL DEFAULT '{}'::jsonb,
  settings JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_organizations_slug ON organizations(slug);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON organizations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================================
-- 2. USERS (Authentication & RBAC)
-- =====================================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'dispatcher', 'driver', 'customer', 'compliance', 'sales')),
  permissions JSONB NOT NULL DEFAULT '[]'::jsonb,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_users_org_id ON users(org_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Updated_at trigger
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS Policy
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY users_org_isolation ON users
  FOR SELECT
  USING (org_id = current_setting('app.org_id', true)::uuid);

-- =====================================================================
-- 3. DRIVERS (Driver Management & Compliance)
-- =====================================================================
CREATE TABLE IF NOT EXISTS drivers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,

  -- License
  license_number TEXT NOT NULL,
  license_state TEXT NOT NULL,
  license_class TEXT,
  license_expires_at DATE NOT NULL,

  -- TWIC
  twic_number TEXT,
  twic_expires_at DATE,

  -- Medical
  medical_card_expires_at DATE,

  -- FMCSA Clearinghouse
  clearinghouse_consent_given BOOLEAN DEFAULT false,
  clearinghouse_consent_date TIMESTAMPTZ,
  clearinghouse_last_query TIMESTAMPTZ,

  -- Status
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended', 'terminated')),
  hire_date DATE,
  termination_date DATE,

  -- Metadata
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_drivers_org_id ON drivers(org_id);
CREATE INDEX IF NOT EXISTS idx_drivers_status ON drivers(status);
CREATE INDEX IF NOT EXISTS idx_drivers_license_expires_at ON drivers(license_expires_at);
CREATE INDEX IF NOT EXISTS idx_drivers_twic_expires_at ON drivers(twic_expires_at);

-- Updated_at trigger
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON drivers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS Policy
ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;

CREATE POLICY drivers_org_isolation ON drivers
  FOR SELECT
  USING (org_id = current_setting('app.org_id', true)::uuid);

-- =====================================================================
-- 4. VEHICLES (Fleet Management)
-- =====================================================================
CREATE TABLE IF NOT EXISTS vehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,

  -- Vehicle Info
  unit_number TEXT NOT NULL,
  vin TEXT NOT NULL,
  year INT NOT NULL,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  vehicle_type TEXT NOT NULL CHECK (vehicle_type IN ('truck', 'trailer', 'chassis')),

  -- Registration
  license_plate TEXT NOT NULL,
  license_state TEXT NOT NULL,
  registration_expires_at DATE,

  -- Inspection
  inspection_expires_at DATE,

  -- Status
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'maintenance', 'out_of_service', 'retired')),

  -- Metadata
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_vehicles_org_id ON vehicles(org_id);
CREATE INDEX IF NOT EXISTS idx_vehicles_unit_number ON vehicles(unit_number);
CREATE INDEX IF NOT EXISTS idx_vehicles_status ON vehicles(status);

-- Updated_at trigger
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON vehicles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS Policy
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

CREATE POLICY vehicles_org_isolation ON vehicles
  FOR SELECT
  USING (org_id = current_setting('app.org_id', true)::uuid);

-- =====================================================================
-- 5. SHIPMENTS (Core TMS Entity)
-- =====================================================================
CREATE TABLE IF NOT EXISTS shipments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,

  -- External Reference
  external_id TEXT, -- PortPro load ID
  external_system TEXT, -- 'portpro', 'internal'

  -- Status
  status TEXT NOT NULL DEFAULT 'quote' CHECK (status IN (
    'quote', 'booked', 'assigned', 'en_route', 'at_terminal',
    'loading', 'loaded', 'in_transit', 'at_destination',
    'unloading', 'delivered', 'invoiced', 'paid', 'cancelled'
  )),

  -- Locations
  origin_address TEXT NOT NULL,
  origin_city TEXT,
  origin_state TEXT,
  origin_zip TEXT,
  origin_location GEOGRAPHY(POINT),

  destination_address TEXT NOT NULL,
  destination_city TEXT,
  destination_state TEXT,
  destination_zip TEXT,
  destination_location GEOGRAPHY(POINT),

  -- Container
  container_number TEXT,
  container_size TEXT CHECK (container_size IN ('TEU', 'FEU', '40HC', '45HC')),
  container_type TEXT CHECK (container_type IN ('dry', 'reefer', 'flatbed', 'tank')),

  -- Assignment
  driver_id UUID REFERENCES drivers(id) ON DELETE SET NULL,
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,

  -- Terminal Info
  terminal_name TEXT,
  terminal_code TEXT,
  appointment_at TIMESTAMPTZ,
  appointment_number TEXT,

  -- Fees & Charges
  base_rate NUMERIC(10, 2),
  tmf_amount NUMERIC(10, 2),
  demurrage_amount NUMERIC(10, 2) DEFAULT 0,
  per_diem_amount NUMERIC(10, 2) DEFAULT 0,
  accessorial_charges JSONB DEFAULT '[]'::jsonb,
  total_amount NUMERIC(10, 2),

  -- Free Time
  demurrage_free_days INT DEFAULT 5,
  demurrage_free_until TIMESTAMPTZ,

  -- Dates
  pickup_date DATE,
  delivery_date DATE,
  actual_pickup_at TIMESTAMPTZ,
  actual_delivery_at TIMESTAMPTZ,

  -- Customer
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,

  -- References
  bol_number TEXT,
  po_number TEXT,

  -- Metadata
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_shipments_org_id ON shipments(org_id);
CREATE INDEX IF NOT EXISTS idx_shipments_status ON shipments(status);
CREATE INDEX IF NOT EXISTS idx_shipments_driver_id ON shipments(driver_id);
CREATE INDEX IF NOT EXISTS idx_shipments_external_id ON shipments(external_id);
CREATE INDEX IF NOT EXISTS idx_shipments_container_number ON shipments(container_number);
CREATE INDEX IF NOT EXISTS idx_shipments_pickup_date ON shipments(pickup_date);
CREATE INDEX IF NOT EXISTS idx_shipments_delivery_date ON shipments(delivery_date);

-- Geospatial indexes
CREATE INDEX IF NOT EXISTS idx_shipments_origin_location ON shipments USING GIST(origin_location);
CREATE INDEX IF NOT EXISTS idx_shipments_destination_location ON shipments USING GIST(destination_location);

-- Updated_at trigger
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON shipments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS Policy
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;

CREATE POLICY shipments_org_isolation ON shipments
  FOR SELECT
  USING (org_id = current_setting('app.org_id', true)::uuid);

-- =====================================================================
-- 6. SHIPMENT_STATUS_HISTORY (Event Sourcing)
-- =====================================================================
CREATE TABLE IF NOT EXISTS shipment_status_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shipment_id UUID NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  notes TEXT,
  location GEOGRAPHY(POINT),
  location_name TEXT,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_shipment_status_history_shipment_id ON shipment_status_history(shipment_id);
CREATE INDEX IF NOT EXISTS idx_shipment_status_history_created_at ON shipment_status_history(created_at);

-- Trigger: Update shipments.status on insert
CREATE OR REPLACE FUNCTION update_shipment_status_fn()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE shipments
  SET status = NEW.status, updated_at = now()
  WHERE id = NEW.shipment_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_shipment_status
  AFTER INSERT ON shipment_status_history
  FOR EACH ROW
  EXECUTE FUNCTION update_shipment_status_fn();

-- RLS Policy
ALTER TABLE shipment_status_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY shipment_status_history_org_isolation ON shipment_status_history
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM shipments
      WHERE shipments.id = shipment_status_history.shipment_id
      AND shipments.org_id = current_setting('app.org_id', true)::uuid
    )
  );

-- =====================================================================
-- 7. QUOTES (CPQ with Versioning)
-- =====================================================================
CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  version INT NOT NULL DEFAULT 1,

  -- Status
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN (
    'draft', 'pending_approval', 'approved', 'sent', 'accepted', 'rejected', 'expired', 'converted'
  )),

  -- Customer
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,

  -- Shipment Details
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  container_size TEXT NOT NULL,
  container_type TEXT,

  -- Pricing
  base_rate NUMERIC(10, 2) NOT NULL,
  accessorials JSONB NOT NULL DEFAULT '[]'::jsonb,
  total_amount NUMERIC(10, 2) NOT NULL,

  -- Validity
  valid_until TIMESTAMPTZ NOT NULL,

  -- Approval
  approved_by UUID REFERENCES users(id) ON DELETE SET NULL,
  approved_at TIMESTAMPTZ,
  approval_notes TEXT,

  -- Conversion
  converted_to_shipment_id UUID REFERENCES shipments(id) ON DELETE SET NULL,
  converted_at TIMESTAMPTZ,

  -- Metadata
  notes TEXT,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_quotes_org_id ON quotes(org_id);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);
CREATE INDEX IF NOT EXISTS idx_quotes_customer_email ON quotes(customer_email);
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes(created_at);

-- Updated_at trigger
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON quotes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS Policy
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY quotes_org_isolation ON quotes
  FOR SELECT
  USING (org_id = current_setting('app.org_id', true)::uuid);

-- =====================================================================
-- 8. INVOICES (Billing)
-- =====================================================================
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  shipment_id UUID NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,

  -- External Reference
  external_id TEXT, -- PortPro invoice ID

  -- Invoice Details
  invoice_number TEXT NOT NULL UNIQUE,
  amount NUMERIC(10, 2) NOT NULL,

  -- Status
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN (
    'draft', 'sent', 'paid', 'partial', 'overdue', 'cancelled'
  )),

  -- Dates
  issued_at TIMESTAMPTZ,
  due_at TIMESTAMPTZ NOT NULL,
  paid_at TIMESTAMPTZ,

  -- Payment
  payment_method TEXT,
  payment_reference TEXT,

  -- Metadata
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_invoices_org_id ON invoices(org_id);
CREATE INDEX IF NOT EXISTS idx_invoices_shipment_id ON invoices(shipment_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_invoice_number ON invoices(invoice_number);
CREATE INDEX IF NOT EXISTS idx_invoices_due_at ON invoices(due_at);

-- Updated_at trigger
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON invoices
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS Policy
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY invoices_org_isolation ON invoices
  FOR SELECT
  USING (org_id = current_setting('app.org_id', true)::uuid);

-- =====================================================================
-- 9. LEASING_ARTIFACTS (Truth-in-Leasing Compliance - IMMUTABLE)
-- =====================================================================
CREATE TABLE IF NOT EXISTS leasing_artifacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  driver_id UUID NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,

  -- Artifact Type
  artifact_type TEXT NOT NULL CHECK (artifact_type IN (
    'lease_agreement',
    'equipment_receipt_start',
    'equipment_receipt_end',
    'settlement_statement',
    'insurance_certificate',
    'w9_form'
  )),

  -- Signature
  signed_at TIMESTAMPTZ NOT NULL,
  signed_document_url TEXT NOT NULL,
  signature_ip TEXT NOT NULL,
  signature_user_agent TEXT,

  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_leasing_artifacts_org_id ON leasing_artifacts(org_id);
CREATE INDEX IF NOT EXISTS idx_leasing_artifacts_driver_id ON leasing_artifacts(driver_id);
CREATE INDEX IF NOT EXISTS idx_leasing_artifacts_type ON leasing_artifacts(artifact_type);

-- RLS Policy
ALTER TABLE leasing_artifacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY leasing_artifacts_org_isolation ON leasing_artifacts
  FOR SELECT
  USING (org_id = current_setting('app.org_id', true)::uuid);

-- IMMUTABLE: Prevent updates and deletes
CREATE OR REPLACE FUNCTION prevent_modification()
RETURNS TRIGGER AS $$
BEGIN
  RAISE EXCEPTION 'Cannot modify or delete immutable leasing artifacts';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER prevent_leasing_artifact_update
  BEFORE UPDATE OR DELETE ON leasing_artifacts
  FOR EACH ROW
  EXECUTE FUNCTION prevent_modification();

-- =====================================================================
-- 10. AUDIT_LOGS (Security Audit Trail)
-- =====================================================================
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,

  -- Action
  action TEXT NOT NULL CHECK (action IN ('created', 'updated', 'deleted', 'viewed', 'exported')),
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,

  -- Changes (for updates)
  changes JSONB,

  -- Request Info
  ip_address TEXT,
  user_agent TEXT,

  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_audit_logs_org_id ON audit_logs(org_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);

-- RLS Policy (Admins only)
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY audit_logs_admin_only ON audit_logs
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = current_setting('app.user_id', true)::uuid
      AND users.role = 'admin'
      AND users.org_id = audit_logs.org_id
    )
  );

-- =====================================================================
-- 11. EXCEPTIONS (TMF/Demurrage/Detention Tracking)
-- =====================================================================
CREATE TABLE IF NOT EXISTS exceptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  shipment_id UUID NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,

  -- Exception Type
  exception_type TEXT NOT NULL CHECK (exception_type IN (
    'demurrage_risk', 'per_diem_risk', 'tmf_late', 'appointment_missed',
    'eta_delayed', 'terminal_closed', 'equipment_failure', 'other'
  )),

  -- Severity
  severity TEXT NOT NULL DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high', 'critical')),

  -- Risk
  risk_score INT CHECK (risk_score >= 0 AND risk_score <= 100),
  cost_exposure NUMERIC(10, 2),

  -- Status
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'acknowledged', 'resolved', 'escalated', 'closed')),

  -- Resolution
  resolved_by UUID REFERENCES users(id) ON DELETE SET NULL,
  resolved_at TIMESTAMPTZ,
  resolution_notes TEXT,

  -- Metadata
  description TEXT NOT NULL,
  recommended_action TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_exceptions_org_id ON exceptions(org_id);
CREATE INDEX IF NOT EXISTS idx_exceptions_shipment_id ON exceptions(shipment_id);
CREATE INDEX IF NOT EXISTS idx_exceptions_status ON exceptions(status);
CREATE INDEX IF NOT EXISTS idx_exceptions_severity ON exceptions(severity);

-- Updated_at trigger
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON exceptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS Policy
ALTER TABLE exceptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY exceptions_org_isolation ON exceptions
  FOR SELECT
  USING (org_id = current_setting('app.org_id', true)::uuid);

-- =====================================================================
-- 12. WEBHOOKS_RECEIVED (Integration Audit)
-- =====================================================================
CREATE TABLE IF NOT EXISTS webhooks_received (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,

  -- Source
  source TEXT NOT NULL, -- 'portpro', 'meta', 'twilio', etc.
  event_type TEXT NOT NULL,
  event_id TEXT NOT NULL,

  -- Payload
  payload JSONB NOT NULL,
  headers JSONB,

  -- Processing
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'success', 'failed', 'retrying')),
  processed_at TIMESTAMPTZ,
  error_message TEXT,
  retry_count INT DEFAULT 0,

  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_webhooks_received_org_id ON webhooks_received(org_id);
CREATE INDEX IF NOT EXISTS idx_webhooks_received_source ON webhooks_received(source);
CREATE INDEX IF NOT EXISTS idx_webhooks_received_event_id ON webhooks_received(event_id);
CREATE INDEX IF NOT EXISTS idx_webhooks_received_status ON webhooks_received(status);
CREATE INDEX IF NOT EXISTS idx_webhooks_received_created_at ON webhooks_received(created_at);

-- Unique constraint: Prevent duplicate webhook processing
CREATE UNIQUE INDEX IF NOT EXISTS idx_webhooks_received_event_unique
  ON webhooks_received(source, event_id);

-- =====================================================================
-- 13. DOCUMENT_EMBEDDINGS (pgvector for RAG)
-- =====================================================================
CREATE TABLE IF NOT EXISTS document_embeddings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,

  -- Document
  document_type TEXT NOT NULL CHECK (document_type IN (
    'policy', 'tariff', 'terminal_rules', 'compliance_doc', 'faq', 'other'
  )),
  title TEXT NOT NULL,
  content TEXT NOT NULL,

  -- Embedding (OpenAI ada-002 = 1536 dimensions)
  embedding vector(1536),

  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_document_embeddings_org_id ON document_embeddings(org_id);
CREATE INDEX IF NOT EXISTS idx_document_embeddings_type ON document_embeddings(document_type);

-- Vector similarity index (cosine distance)
CREATE INDEX IF NOT EXISTS idx_document_embeddings_vector
  ON document_embeddings USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- Updated_at trigger
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON document_embeddings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS Policy
ALTER TABLE document_embeddings ENABLE ROW LEVEL SECURITY;

CREATE POLICY document_embeddings_org_isolation ON document_embeddings
  FOR SELECT
  USING (org_id = current_setting('app.org_id', true)::uuid);

-- =====================================================================
-- HELPER FUNCTIONS
-- =====================================================================

-- Function: Set RLS context (call this in middleware)
CREATE OR REPLACE FUNCTION set_request_context(p_org_id UUID, p_user_id UUID)
RETURNS void AS $$
BEGIN
  PERFORM set_config('app.org_id', p_org_id::text, false);
  PERFORM set_config('app.user_id', p_user_id::text, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function: Search documents by vector similarity
CREATE OR REPLACE FUNCTION search_documents(
  p_org_id UUID,
  p_query_embedding vector(1536),
  p_limit INT DEFAULT 5
)
RETURNS TABLE (
  id UUID,
  title TEXT,
  content TEXT,
  similarity FLOAT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    de.id,
    de.title,
    de.content,
    1 - (de.embedding <=> p_query_embedding) AS similarity
  FROM document_embeddings de
  WHERE de.org_id = p_org_id
  ORDER BY de.embedding <=> p_query_embedding
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- =====================================================================
-- MIGRATION COMPLETE
-- =====================================================================

-- Verify extensions
SELECT
  extname,
  extversion
FROM pg_extension
WHERE extname IN ('uuid-ossp', 'postgis', 'vector');

-- Verify tables
SELECT
  schemaname,
  tablename
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

COMMENT ON DATABASE postgres IS 'Southern Haulers TMS - Production Database';
