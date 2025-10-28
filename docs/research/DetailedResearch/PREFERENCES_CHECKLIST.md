# Southern Haulers TMS - Customer Preferences Checklist

**Purpose**: Capture customer preferences to tailor the TMS platform to specific business needs
**Status**: Pre-Implementation
**Instructions**: Review each section and mark preferences with ✅ (Keep), ❌ (Remove), or ⚙️ (Configure)

---

## 1. Branding & User Interface

### Theme & Styling
- [ ] **Dark Mode** - Enable dark color scheme
  - ⚙️ Options: System default, user toggle, organization default
- [ ] **Light Mode** - Enable light color scheme
  - ⚙️ Options: System default, user toggle, organization default
- [ ] **Accent Color**
  - ⚙️ Current: Southern Haulers brand blue
  - ⚙️ Custom: _________________
- [ ] **Typography**
  - ⚙️ Current: Sans-serif (system fonts)
  - ⚙️ Custom: _________________

### Logo & Header
- [ ] **Logo Placement**
  - ⚙️ Options: Top-left (default), Top-center, Sidebar
- [ ] **Tagline Display**
  - Current: "A Top-Rated South Georgia Carrier"
  - Custom: _________________
- [ ] **Favicon**
  - ⚙️ Use default or provide custom

### Navigation
- [ ] **Hamburger Menu (Mobile)** - Collapsible navigation on mobile
- [ ] **Breadcrumbs** - Show navigation trail on detail pages
- [ ] **Quick Actions Bar** - Frequently used actions pinned to top

---

## 2. Authentication & User Management

### Single Sign-On (SSO)
- [ ] **Enterprise SSO** - via WorkOS
  - ⚙️ Provider: _________________
  - ⚙️ Options: Azure AD, Okta, Google Workspace, OneLogin
- [ ] **Magic Link Login** - Passwordless email login (fallback)
- [ ] **SMS OTP** - Two-factor authentication via SMS

### Session Management
- [ ] **Session Timeout**
  - ⚙️ Options: 30 min, 1 hour, 4 hours, 8 hours, Never
  - ⚙️ Preferred: _________________
- [ ] **Remember Me** - Keep users logged in across sessions
- [ ] **Force Logout on Password Change** - Security setting

### User Roles (RBAC)
- [ ] **Admin** - Full system access
- [ ] **Dispatcher** - Assign loads, manage shipments
- [ ] **Accountant** - Billing, invoicing, settlements
- [ ] **Driver** - View assigned shipments, update status
- [ ] **Customer** - Track shipments, download documents
- [ ] **Recruiter** - Manage driver applications and onboarding
- [ ] **Custom Roles**
  - ⚙️ Role Name: _________________
  - ⚙️ Permissions: _________________

---

## 3. Operational Surface

### PortPro Integration
- [ ] **Hybrid Mode (Mirror PortPro Data)** - Keep PortPro as system of record while mirroring to Southern Haulers
  - ⚙️ Entities to mirror: [ ] Loads [ ] Drivers [ ] Invoices [ ] Equipment [ ] Customers
- [ ] **Full Custom Mode** - Use Southern Haulers as sole system of record
- [ ] **Authority Swap by Entity** - Choose system of record per load/customer
  - ⚙️ Default Authority: [ ] PortPro [ ] Southern Haulers
  - ⚙️ Override per: [ ] Customer [ ] Load Type [ ] Terminal

### Terminal Operating Modes
- [ ] **PIN-Based Workflow** (Savannah GCT)
  - ⚙️ PIN expiration alerts: [ ] 24 hours [ ] 48 hours [ ] 1 week
- [ ] **Appointment-Based Workflow** (eModal/CargoSmart terminals)
  - ⚙️ Appointment lead time: [ ] 24 hours [ ] 48 hours [ ] 72 hours
- [ ] **Hybrid Mode** - Switch based on terminal configuration
  - ⚙️ Per-terminal override: [ ] Yes [ ] No

### EDI Integration
- [ ] **EDI 204 (Load Tender)** - Inbound load offers from brokers
- [ ] **EDI 214 (Status Update)** - Outbound shipment status to brokers
- [ ] **EDI 210 (Invoice)** - Outbound invoices to brokers
- [ ] **EDI 990 (Response)** - Acknowledgments
- [ ] **EDI Frequency**
  - ⚙️ Options: Real-time, Hourly, Daily batch
  - ⚙️ Preferred: _________________

---

## 4. Agentic Operations (AI Automation)

### Appointment Agent
- [ ] **Enable Appointment Agent** - AI-powered terminal appointment scheduling
- [ ] **Auto-Book Mode** - Automatically book best appointment slot
  - ⚙️ Requires: Manual approval, Threshold-based approval, Fully automatic
  - ⚙️ Approval Threshold: Score ≥ _____ / 100
- [ ] **Suggest Mode** - Recommend top 3 slots for dispatcher approval
- [ ] **Notification Preferences**
  - [ ] Email [ ] SMS [ ] Slack [ ] In-app

### Exception Agent
- [ ] **Enable Exception Agent** - Proactive TMF/demurrage risk detection
- [ ] **Alert Thresholds**
  - ⚙️ TMF Risk: Alert when _____ days to last free day
  - ⚙️ Per Diem Risk: Alert when _____ days beyond free time
  - ⚙️ Driver Delay: Alert when ETA variance ≥ _____ minutes
  - ⚙️ Cost Impact: Escalate when estimated cost ≥ $ _____
- [ ] **Auto-Notify**
  - [ ] Email [ ] SMS [ ] Slack [ ] In-app
  - ⚙️ Recipients: _________________
- [ ] **Escalation Rules**
  - ⚙️ Critical alerts (>$500 impact): Notify _______________
  - ⚙️ High alerts ($100-$500): Notify _______________

### Pricing Agent
- [ ] **Enable Pricing Agent** - AI-assisted quote generation
- [ ] **Auto-Price Mode** - Generate prices automatically based on historical data
  - ⚙️ Requires: Manual review, Threshold approval, Fully automatic
  - ⚙️ Approval Threshold: Quote value ≥ $ _____
- [ ] **Suggest Mode** - Recommend pricing range for manual adjustment
- [ ] **Factors to Consider**
  - [ ] Historical lane rates
  - [ ] Current capacity availability
  - [ ] Fuel surcharge index
  - [ ] Accessorial fees (TMF, per diem, chassis split)
  - [ ] Competitor pricing (if available)

### Compliance Agent
- [ ] **Enable Compliance Agent** - Automated driver compliance monitoring
- [ ] **Blocking Mode** - Prevent assignment if driver non-compliant
  - ⚙️ Block for: [ ] CDL expired [ ] Medical card expired [ ] TWIC expired [ ] Clearinghouse missing
- [ ] **Warning Mode** - Allow assignment with warning
  - ⚙️ Warn when: _____ days before expiry
- [ ] **Auto-Notify Driver** - Send renewal reminders
  - ⚙️ Frequency: [ ] Weekly [ ] Bi-weekly [ ] Monthly
  - ⚙️ Delivery: [ ] Email [ ] SMS [ ] Both

### Human-in-the-Loop
- [ ] **Require Approval for All Agent Actions** - No fully automatic agent execution
- [ ] **Threshold-Based Approval** - Approve low-risk actions automatically
  - ⚙️ Define thresholds per agent (see above)
- [ ] **Audit Log All Agent Decisions** - Track recommendations and outcomes

---

## 5. Analytics & Reporting

### Built-In Dashboards
- [ ] **Executive Dashboard** - High-level KPIs and trends
  - Metrics: Revenue, active loads, on-time %, TMF savings
- [ ] **Operations Dashboard** - Real-time shipment tracking
  - Metrics: In-transit loads, driver availability, exception alerts
- [ ] **Financial Dashboard** - Billing and settlements
  - Metrics: Receivables, payables, profit margin by lane
- [ ] **Compliance Dashboard** - Driver compliance scores
  - Metrics: TWIC status, CDL expiry, Clearinghouse consent
- [ ] **Custom Dashboards**
  - ⚙️ Dashboard Name: _________________
  - ⚙️ Metrics: _________________

### External BI Connector
- [ ] **Enable BI Export** - Connect to external tools (Tableau, Power BI, Looker)
  - ⚙️ Preferred Tool: _________________
  - ⚙️ Refresh Frequency: Real-time, Hourly, Daily
- [ ] **Data Warehouse Export** - Export to BigQuery, Snowflake, Redshift
  - ⚙️ Preferred Warehouse: _________________

### Alert Routing
- [ ] **Email Alerts** - Operational alerts via email
  - ⚙️ Recipients: _________________
- [ ] **SMS Alerts** - Critical alerts via SMS
  - ⚙️ Recipients: _________________
- [ ] **Slack Alerts** - Real-time alerts in Slack channel
  - ⚙️ Channel: _________________
- [ ] **Webhook Alerts** - Send alerts to custom endpoint
  - ⚙️ Endpoint URL: _________________

---

## 6. SEO & Marketing

### Programmatic SEO
- [ ] **Enable Programmatic City/State Pages** - Generate location-based landing pages
  - ⚙️ Initial Scope: [ ] Savannah only [ ] Georgia ports [ ] Southeast [ ] National
  - ⚙️ Target Page Count: _____ pages
- [ ] **LocalBusiness JSON-LD** - Structured data for Google search
- [ ] **Multi-Sitemap Strategy** - Separate sitemaps for locations, services, blog
- [ ] **Dynamic OG Images** - Social media preview images per location

### Case Studies & Reviews
- [ ] **Case Study Section** - Success stories and testimonials
  - ⚙️ Featured Customers: _________________
- [ ] **Review Integration** - Display Google/Trustpilot reviews
  - ⚙️ Minimum Rating: _____ stars
- [ ] **Before/After Metrics** - Show operational improvements (turn times, cost savings)

### Blog & Content
- [ ] **Blog/News Section** - Industry insights and company updates
  - ⚙️ Posting Frequency: Weekly, Bi-weekly, Monthly
- [ ] **Resource Library** - Downloadable guides, whitepapers, templates
- [ ] **Video Library** - Tutorial videos and product demos

---

## 7. Recruiting & Driver Onboarding

### SMS Bot & Lead Capture
- [ ] **Enable SMS Bot** - Automated recruiting via A2P 10DLC
  - ⚙️ Carrier: [ ] Twilio [ ] Telnyx [ ] Bandwidth
  - ⚙️ Brand Registration: Required (already submitted)
- [ ] **Meta Lead Ads Integration** - Capture leads from Facebook/Instagram
  - ⚙️ Ad Account ID: _________________
- [ ] **SMS Cadence**
  - ⚙️ Initial Message: Immediate
  - ⚙️ Follow-up 1: _____ hours later
  - ⚙️ Follow-up 2: _____ days later
  - ⚙️ Max Messages: _____ before manual handoff
- [ ] **Opt-Out Compliance** - Automatic "STOP" keyword handling

### ATS (Applicant Tracking System) Sync
- [ ] **Sync with External ATS** - Integrate with existing recruiting software
  - ⚙️ ATS Provider: _________________
  - ⚙️ Sync Frequency: Real-time, Hourly, Daily

### EEOC Compliance
- [ ] **Use EEOC-Compliant Templates** - Pre-approved messaging for recruiting
- [ ] **Disable Custom Recruiting Copy** - Enforce templates only
- [ ] **Manual Review of Custom Messages** - Require approval before sending

### Onboarding Checklist
- [ ] **Automated Checklist** - Track document collection and compliance steps
  - Items: [ ] CDL [ ] Medical Card [ ] TWIC [ ] W-9 [ ] COI [ ] Direct Deposit [ ] Background Check
- [ ] **E-Signature Integration** - DocuSign, Adobe Sign, or built-in
  - ⚙️ Preferred Provider: _________________
- [ ] **Background Check Integration** - Checkr, HireRight, or manual
  - ⚙️ Preferred Provider: _________________

---

## 8. Compliance & Safety

### Clearinghouse
- [ ] **Automated Clearinghouse Queries** - FMCSA pre-employment and annual queries
  - ⚙️ Query Frequency: Pre-employment, Annual, Both
  - ⚙️ Consent Expiry Alert: _____ days before expiry
- [ ] **Manual Clearinghouse Entry** - Log queries performed outside system

### TWIC Tracking
- [ ] **TWIC Status Surface** - Display TWIC expiry on driver profiles
- [ ] **TWIC Renewal Reminders** - Auto-notify drivers before expiry
  - ⚙️ Reminder: _____ days before expiry
- [ ] **Block Port Jobs for Expired TWIC** - Compliance enforcement

### HOS/ELD
- [ ] **HOS Summary Display** - Read-only view of driver hours (no violation automation)
  - ⚙️ ELD Provider Integration: _________________
- [ ] **Hours Violation Alerts** - Notify if driver approaching HOS limits
  - ⚙️ Warning Threshold: _____ hours remaining

### Truth-in-Leasing (49 CFR 376)
- [ ] **Generate Leasing Agreements** - Automated document generation for independent contractors
- [ ] **E-Signature Integration** - Sign lease agreements electronically
- [ ] **Archive Signed Agreements** - Immutable storage with audit trail
- [ ] **Manual Upload** - Upload externally signed agreements

---

## 9. Deployment & Hosting

### Hosting Tier
- [ ] **Standard Tier** - Shared infrastructure, 99.5% uptime SLA
  - ⚙️ Estimated Traffic: <10,000 loads/month
- [ ] **Premium Tier** - Dedicated resources, 99.9% uptime SLA
  - ⚙️ Estimated Traffic: 10,000-50,000 loads/month
- [ ] **Enterprise Tier** - Multi-region, 99.95% uptime SLA
  - ⚙️ Estimated Traffic: >50,000 loads/month
- [ ] **Custom Infrastructure** - On-premises or private cloud
  - ⚙️ Cloud Provider: _________________

### Regions & Data Residency
- [ ] **Primary Region**
  - ⚙️ Options: US East (Virginia), US West (Oregon), US Central (Iowa)
  - ⚙️ Preferred: _________________
- [ ] **Multi-Region Deployment** - Redundancy across regions
- [ ] **Data Residency Requirements** - Legal/compliance constraints
  - ⚙️ Requirements: _________________

### Environments
- [ ] **Staging Environment** - Pre-production testing
- [ ] **Sandbox Environment** - Training and demos
- [ ] **DR (Disaster Recovery) Environment** - Failover capability

---

## 10. Support & Training

### Support SLA
- [ ] **Standard Support** - Business hours (M-F, 9am-5pm ET)
  - Response time: <4 hours (high priority), <24 hours (normal)
- [ ] **Premium Support** - Extended hours (M-F, 7am-7pm ET)
  - Response time: <2 hours (high priority), <8 hours (normal)
- [ ] **24/7 Support** - Around-the-clock coverage
  - Response time: <1 hour (critical), <4 hours (high priority)

### Support Channels
- [ ] **Email Support** - support@southernhaulers.com
- [ ] **Phone Support** - Dedicated support hotline
- [ ] **Slack Channel** - Direct Slack integration for real-time support
- [ ] **Help Center** - Self-service knowledge base

### Training
- [ ] **Remote Training** - Virtual onboarding sessions
  - ⚙️ Duration: _____ hours
  - ⚙️ Participants: _________________
- [ ] **On-Site Training** - In-person training at customer location
  - ⚙️ Duration: _____ days
  - ⚙️ Participants: _________________
- [ ] **Video Library** - On-demand tutorial videos
- [ ] **Documentation Portal** - Comprehensive user guides

### Change Management
- [ ] **Weekly Release Notes** - Email summary of new features and fixes
- [ ] **Monthly Product Updates** - Webinar or video showcasing new capabilities
- [ ] **Beta Program** - Early access to new features for testing

---

## 11. Integrations & APIs

### Third-Party Integrations
- [ ] **Accounting Software**
  - ⚙️ Options: [ ] QuickBooks [ ] Xero [ ] NetSuite [ ] Sage [ ] Custom
  - ⚙️ Sync Frequency: Real-time, Hourly, Daily
- [ ] **Fleet Management**
  - ⚙️ Options: [ ] Samsara [ ] Geotab [ ] Verizon Connect [ ] Custom
- [ ] **Fuel Card Integration**
  - ⚙️ Options: [ ] WEX [ ] Comdata [ ] EFS [ ] Custom
- [ ] **Load Boards**
  - ⚙️ Options: [ ] DAT [ ] Truckstop.com [ ] 123Loadboard [ ] Custom
- [ ] **Custom API Integration**
  - ⚙️ API Endpoint: _________________
  - ⚙️ Authentication: _________________

### API Access
- [ ] **Enable Public API** - Allow external systems to integrate with Southern Haulers TMS
  - ⚙️ Rate Limit: _____ requests/minute
  - ⚙️ Authentication: API Key, OAuth 2.0, JWT
- [ ] **Webhook Subscriptions** - Push events to external systems
  - ⚙️ Events: [ ] Shipment Created [ ] Status Updated [ ] Invoice Generated [ ] Custom
  - ⚙️ Endpoint URL: _________________

---

## 12. Miscellaneous Preferences

### Language & Localization
- [ ] **Primary Language**: English (US)
- [ ] **Additional Languages**
  - [ ] Spanish [ ] Other: _________________
- [ ] **Date Format**
  - ⚙️ Options: MM/DD/YYYY (US), DD/MM/YYYY (EU), YYYY-MM-DD (ISO)
- [ ] **Time Format**
  - ⚙️ Options: 12-hour (AM/PM), 24-hour
- [ ] **Timezone**
  - ⚙️ Default: America/New_York (Eastern Time)
  - ⚙️ Per-User Override: [ ] Yes [ ] No

### Notifications
- [ ] **Email Notifications** - System-generated emails
  - ⚙️ Frequency: Real-time, Daily digest, Weekly digest
- [ ] **Push Notifications** - Browser/mobile notifications
  - ⚙️ Types: [ ] Critical alerts [ ] Status updates [ ] Reminders
- [ ] **SMS Notifications** - Text message alerts
  - ⚙️ Types: [ ] Critical alerts only [ ] All notifications

### Data Retention
- [ ] **Shipment Data Retention**
  - ⚙️ Duration: 1 year, 3 years, 7 years, Indefinite
- [ ] **Document Retention**
  - ⚙️ Duration: 3 years, 7 years, Indefinite
- [ ] **Audit Log Retention**
  - ⚙️ Duration: 1 year, 3 years, 7 years
- [ ] **Compliance with Regulations** - Automatic retention per 49 CFR requirements

### Backup & Recovery
- [ ] **Automated Backups** - Daily, hourly, continuous (point-in-time recovery)
- [ ] **Backup Retention**
  - ⚙️ Duration: 7 days, 30 days, 90 days
- [ ] **Disaster Recovery Plan** - Documented recovery procedures
  - ⚙️ RTO (Recovery Time Objective): _____ hours
  - ⚙️ RPO (Recovery Point Objective): _____ hours

---

## Submission Instructions

**How to Complete**:
1. Review each section with stakeholders (operations, finance, IT, compliance)
2. Mark preferences with:
   - ✅ Keep (include this feature)
   - ❌ Remove (exclude this feature)
   - ⚙️ Configure (fill in specific settings)
3. Fill in all ⚙️ configuration fields
4. Return completed checklist to: implementation@southernhaulers.com

**Timeline**:
- Please complete within **5 business days** of kickoff
- Questions? Contact your implementation manager

**Next Steps After Submission**:
1. Review call to clarify preferences
2. System configuration and setup
3. Staging environment provisioned
4. Training and onboarding scheduled

---

**This checklist ensures your Southern Haulers TMS is configured exactly to your business needs. No preference is too small—every detail matters for a successful implementation.**
