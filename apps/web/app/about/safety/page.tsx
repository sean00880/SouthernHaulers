import { Metadata } from 'next';
import { ArrowRight, Shield, FileCheck, UserCheck, Award, CheckCircle2, AlertTriangle, Lock, ClipboardCheck, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Safety & Compliance | Southern Haulers',
  description: 'FMCSA compliant, TWIC certified drivers, Truth-in-Leasing documentation, HOS/ELD compliance, and comprehensive insurance coverage for your peace of mind.',
};

export default function SafetyPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative border-b">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="container relative">
          <div className="flex flex-col items-center justify-center space-y-8 py-24 md:py-32 text-center">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
              <Shield className="mr-2 h-4 w-4 text-primary" />
              <span className="font-medium">Safety & Compliance</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl">
              Certified{' '}
              <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                Safety-First
              </span>
              {' '}Transportation
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Fully licensed, insured, and compliant with all federal and state transportation regulations. FMCSA certified, TWIC drivers, Truth-in-Leasing documentation, and comprehensive safety programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/quote"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
              >
                Request Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a
                href="/drivers"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
              >
                Become a Driver
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Core Certifications */}
      <section className="container py-24">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Certifications & Compliance
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Southern Haulers maintains all required federal and state certifications for safe, compliant transportation operations.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card p-6 space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">FMCSA Compliant</h3>
            <p className="text-sm text-muted-foreground">
              Federal Motor Carrier Safety Administration certified with active DOT and MC authority. Current safety rating and regular audits.
            </p>
            <div className="text-xs text-muted-foreground">
              <p><strong className="text-foreground">DOT#:</strong> [XXXX]</p>
              <p><strong className="text-foreground">MC#:</strong> [XXXX]</p>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-6 space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <UserCheck className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">TWIC Certified</h3>
            <p className="text-sm text-muted-foreground">
              All port drivers maintain Transportation Worker Identification Credentials for secure terminal access at all Southeast ports.
            </p>
            <div className="text-xs text-muted-foreground">
              <p>TSA background checks</p>
              <p>Biometric verification</p>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-6 space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <FileCheck className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Truth-in-Leasing</h3>
            <p className="text-sm text-muted-foreground">
              49 CFR Part 376 compliant lease agreements with all owner-operators. Documented lease terms and compensation disclosures.
            </p>
            <div className="text-xs text-muted-foreground">
              <p>Written lease agreements</p>
              <p>Compensation transparency</p>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-6 space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Fully Insured</h3>
            <p className="text-sm text-muted-foreground">
              Comprehensive cargo and liability insurance coverage exceeding federal minimums. Additional coverage for high-value and hazardous cargo.
            </p>
            <div className="text-xs text-muted-foreground">
              <p>$1M+ liability coverage</p>
              <p>Cargo insurance included</p>
            </div>
          </div>
        </div>
      </section>

      {/* Driver Qualification */}
      <section className="border-t bg-muted/50">
        <div className="container py-24">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Driver Qualification & Safety
              </h2>
              <p className="text-lg text-muted-foreground">
                Rigorous driver screening, ongoing training, and continuous monitoring to ensure the highest safety standards.
              </p>
            </div>

            <div className="space-y-6">
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <ClipboardCheck className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div className="space-y-2 flex-1">
                    <h3 className="text-xl font-semibold">Pre-Employment Screening</h3>
                    <p className="text-muted-foreground">
                      Comprehensive background checks, employment verification, and safety record review for all drivers before hiring.
                    </p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>MVR (Motor Vehicle Record) review for all applicants</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>PSP (Pre-Employment Screening Program) via FMCSA</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Drug and alcohol testing (DOT-compliant 5-panel screen)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>FMCSA Clearinghouse query for drug/alcohol violations</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-card p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <UserCheck className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div className="space-y-2 flex-1">
                    <h3 className="text-xl font-semibold">Driver Qualification Files</h3>
                    <p className="text-muted-foreground">
                      Complete DQ files maintained for all drivers per 49 CFR Part 391, with annual updates and certifications.
                    </p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Valid Commercial Driver's License (CDL) with endorsements</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>DOT medical card (current certificate on file)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Employment application and previous employer references</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Annual MVR review and driver certification</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-card p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <Shield className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div className="space-y-2 flex-1">
                    <h3 className="text-xl font-semibold">Ongoing Training & Monitoring</h3>
                    <p className="text-muted-foreground">
                      Continuous driver training, safety meetings, and performance monitoring to maintain high safety standards.
                    </p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Quarterly safety meetings and training sessions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Annual review of driving performance and safety record</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Random drug and alcohol testing program</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Incident review and corrective action when necessary</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOS & ELD Compliance */}
      <section className="container py-24">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Hours of Service & ELD Compliance
            </h2>
            <p className="text-lg text-muted-foreground">
              Strict compliance with 49 CFR Part 395 Hours of Service regulations using FMCSA-registered Electronic Logging Devices.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border bg-card p-6 space-y-3">
              <div className="flex items-start gap-3">
                <ClipboardCheck className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div className="space-y-2">
                  <h3 className="font-semibold">FMCSA-Registered ELD</h3>
                  <p className="text-sm text-muted-foreground">
                    All drivers use FMCSA-registered Electronic Logging Devices that automatically record driving time and ensure HOS compliance.
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Automatic duty status recording</li>
                    <li>• Real-time HOS violation alerts</li>
                    <li>• 8-day log retention on device</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-6 space-y-3">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div className="space-y-2">
                  <h3 className="font-semibold">HOS Violation Prevention</h3>
                  <p className="text-sm text-muted-foreground">
                    Dispatch monitors driver HOS availability in real-time and prevents assignments that would result in violations.
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• 11-hour driving limit enforcement</li>
                    <li>• 14-hour on-duty limit monitoring</li>
                    <li>• 30-minute break requirement tracking</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-6 space-y-3">
              <div className="flex items-start gap-3">
                <FileCheck className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div className="space-y-2">
                  <h3 className="font-semibold">Log Audits & Records</h3>
                  <p className="text-sm text-muted-foreground">
                    Regular ELD log audits to identify and correct anomalies. Six-month log retention for regulatory compliance.
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Weekly log review by safety department</li>
                    <li>• Form and manner violations tracking</li>
                    <li>• Driver coaching for log errors</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-6 space-y-3">
              <div className="flex items-start gap-3">
                <Lock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div className="space-y-2">
                  <h3 className="font-semibold">Roadside Inspection Ready</h3>
                  <p className="text-sm text-muted-foreground">
                    Drivers trained on ELD data transfer procedures for roadside inspections using web services or email/fax transfer.
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Bluetooth data transfer to inspector</li>
                    <li>• Backup paper log procedures</li>
                    <li>• Driver instruction card in cab</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FMCSA Clearinghouse */}
      <section className="border-t bg-muted/50">
        <div className="container py-24">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                FMCSA Drug & Alcohol Clearinghouse
              </h2>
              <p className="text-lg text-muted-foreground">
                Full compliance with FMCSA Clearinghouse requirements for pre-employment, annual, and reasonable suspicion queries.
              </p>
            </div>

            <div className="rounded-lg border-2 border-primary bg-card p-8 space-y-6">
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">Clearinghouse Compliance Procedures</h3>
                <p className="text-muted-foreground">
                  Southern Haulers conducts required Clearinghouse queries and maintains documented consent for all current and prospective drivers.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Pre-Employment Queries</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Full query for all new driver applicants</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Electronic consent obtained via Clearinghouse portal</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Query results reviewed before hire decision</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Annual Queries</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Limited query for all current drivers annually</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Automated reminders for consent renewal</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Follow-up full query if violations indicated</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Return-to-Duty Monitoring</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>SAP (Substance Abuse Professional) referral</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Documented return-to-duty process</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Follow-up testing program for 12-60 months</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Reporting & Recordkeeping</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Positive drug/alcohol tests reported within 2 days</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Refusals to test reported to Clearinghouse</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Consent forms retained for audit trail</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Coverage */}
      <section className="container py-24">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Comprehensive Insurance Coverage
            </h2>
            <p className="text-lg text-muted-foreground">
              Southern Haulers maintains comprehensive insurance coverage exceeding federal minimums for your complete peace of mind.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border bg-card p-6 space-y-3">
              <div className="flex items-start gap-3">
                <Shield className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div className="space-y-2">
                  <h3 className="font-semibold">Liability Insurance</h3>
                  <p className="text-sm text-muted-foreground">
                    $1,000,000+ general liability coverage for bodily injury and property damage. Exceeds federal minimum requirements for interstate commerce.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-6 space-y-3">
              <div className="flex items-start gap-3">
                <Award className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div className="space-y-2">
                  <h3 className="font-semibold">Cargo Insurance</h3>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive cargo coverage included on all shipments. Additional coverage available for high-value or specialized cargo.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-6 space-y-3">
              <div className="flex items-start gap-3">
                <FileCheck className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div className="space-y-2">
                  <h3 className="font-semibold">Certificates of Insurance</h3>
                  <p className="text-sm text-muted-foreground">
                    COI available upon request with your facility named as additional insured. Fast turnaround for facility access requirements.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-6 space-y-3">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div className="space-y-2">
                  <h3 className="font-semibold">Workers' Compensation</h3>
                  <p className="text-sm text-muted-foreground">
                    Full workers' compensation coverage for all employees. Occupational accident coverage for independent contractors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-muted/50">
        <div className="container py-24">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Safety-First Transportation Partner
            </h2>
            <p className="text-lg text-muted-foreground">
              Get a quote from a fully certified, compliant, and insured carrier. Your cargo and peace of mind are our priority.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/quote"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
              >
                Request Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
              >
                Contact Sales
              </a>
            </div>
            <div className="flex items-center justify-center gap-8 pt-4 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>FMCSA certified</span>
              <span>•</span>
              <span>TWIC drivers</span>
              <span>•</span>
              <span>Fully insured</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
