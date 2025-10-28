'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  required: boolean;
  compliance_notes?: string;
  documents?: {
    name: string;
    url?: string;
    uploaded_at?: string;
  }[];
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  compliance_score: number;
  created_at: string;
}

export default function OnboardingChecklist() {
  const params = useParams();
  const router = useRouter();
  const candidateId = params.id as string;

  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    // const fetchData = async () => {
    //   const { data: candidateData } = await supabase
    //     .from('candidates')
    //     .select('*')
    //     .eq('id', candidateId)
    //     .single();
    //
    //   const { data: checklistData } = await supabase
    //     .from('onboarding_checklist')
    //     .select('*')
    //     .eq('candidate_id', candidateId)
    //     .order('order');
    // };

    // Mock data
    setCandidate({
      id: candidateId,
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 (555) 123-4567',
      status: 'documents_pending',
      compliance_score: 72,
      created_at: '2024-01-15T10:30:00Z',
    });

    setChecklist([
      {
        id: '1',
        title: 'CDL License Verification',
        description: 'Upload valid Class A CDL license',
        status: 'completed',
        required: true,
        documents: [
          {
            name: 'cdl_license_front.pdf',
            url: '/uploads/cdl_front.pdf',
            uploaded_at: '2024-01-15T11:00:00Z',
          },
        ],
      },
      {
        id: '2',
        title: 'MVR (Motor Vehicle Record)',
        description: 'Request and review 3-year MVR',
        status: 'in_progress',
        required: true,
        compliance_notes: 'Pending review by safety team',
      },
      {
        id: '3',
        title: 'FMCSA Clearinghouse Consent',
        description: 'Electronic consent for drug and alcohol database queries',
        status: 'completed',
        required: true,
        compliance_notes: '49 CFR Part 382 - Completed via electronic signature',
      },
      {
        id: '4',
        title: 'TWIC Card',
        description: 'Transportation Worker Identification Credential for port access',
        status: 'pending',
        required: true,
        compliance_notes: 'Required for drayage operations at secure facilities',
      },
      {
        id: '5',
        title: 'Drug Test',
        description: 'Pre-employment drug screening (DOT 5-panel)',
        status: 'in_progress',
        required: true,
        compliance_notes: 'Scheduled for 2024-01-18',
      },
      {
        id: '6',
        title: 'Background Check',
        description: 'Criminal background check (7-year lookback)',
        status: 'completed',
        required: true,
      },
      {
        id: '7',
        title: 'Employment Verification',
        description: 'Verify past 3 years employment history',
        status: 'in_progress',
        required: true,
        compliance_notes: '49 CFR Part 391 - 2 of 3 employers verified',
      },
      {
        id: '8',
        title: 'Medical Certificate',
        description: 'DOT medical examination certificate',
        status: 'pending',
        required: true,
        compliance_notes: '49 CFR Part 391 - Valid medical card required',
      },
      {
        id: '9',
        title: 'Truth-in-Leasing Agreement',
        description: 'Sign lease agreement per 49 CFR Part 376',
        status: 'pending',
        required: true,
        compliance_notes: 'Review with legal before signing',
      },
      {
        id: '10',
        title: 'Certificate of Insurance',
        description: 'Upload COI with Southern Haulers as certificate holder',
        status: 'pending',
        required: true,
      },
      {
        id: '11',
        title: 'W-9 Form',
        description: 'Tax information for 1099 contractors',
        status: 'pending',
        required: true,
      },
      {
        id: '12',
        title: 'Direct Deposit',
        description: 'Banking information for payment',
        status: 'pending',
        required: true,
      },
    ]);

    setLoading(false);
  }, [candidateId]);

  const getStatusColor = (status: ChecklistItem['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-900/30 text-green-400 border-green-800';
      case 'in_progress':
        return 'bg-blue-900/30 text-blue-400 border-blue-800';
      case 'blocked':
        return 'bg-red-900/30 text-red-400 border-red-800';
      default:
        return 'bg-gray-800/30 text-gray-400 border-gray-700';
    }
  };

  const getStatusIcon = (status: ChecklistItem['status']) => {
    switch (status) {
      case 'completed':
        return '✅';
      case 'in_progress':
        return '⏳';
      case 'blocked':
        return '🚫';
      default:
        return '⭕';
    }
  };

  const completedItems = checklist.filter((item) => item.status === 'completed').length;
  const totalItems = checklist.length;
  const progressPercentage = (completedItems / totalItems) * 100;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="card text-center">
          <p className="text-gray-400">Candidate not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Candidate Header */}
      <div className="card mb-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-100 mb-2">
              {candidate.name}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <span>📧 {candidate.email}</span>
              <span>📱 {candidate.phone}</span>
              <span>📅 Applied {new Date(candidate.created_at).toLocaleDateString()}</span>
            </div>
          </div>
          <button
            onClick={() => router.push('/')}
            className="btn-secondary"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-300">
              Onboarding Progress
            </span>
            <span className="text-sm font-medium text-gray-300">
              {completedItems} / {totalItems} ({Math.round(progressPercentage)}%)
            </span>
          </div>
          <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Compliance Score */}
        <div className="mt-4 flex items-center gap-3">
          <span className="text-sm text-gray-400">Compliance Score:</span>
          <div className="flex items-center gap-2">
            <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  candidate.compliance_score >= 80
                    ? 'bg-green-500'
                    : candidate.compliance_score >= 60
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${candidate.compliance_score}%` }}
              />
            </div>
            <span
              className={`text-sm font-semibold ${
                candidate.compliance_score >= 80
                  ? 'text-green-400'
                  : candidate.compliance_score >= 60
                  ? 'text-yellow-400'
                  : 'text-red-400'
              }`}
            >
              {candidate.compliance_score}%
            </span>
          </div>
        </div>
      </div>

      {/* Checklist Items */}
      <div className="space-y-4">
        {checklist.map((item) => (
          <div
            key={item.id}
            className="card hover:border-indigo-800/50 transition-colors"
          >
            <div className="flex items-start gap-4">
              {/* Status Icon */}
              <div className="text-3xl flex-shrink-0 mt-1">
                {getStatusIcon(item.status)}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-100 mb-1">
                      {item.title}
                      {item.required && (
                        <span className="ml-2 text-red-400 text-sm">*</span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                  <span className={`badge ${getStatusColor(item.status)} ml-4`}>
                    {item.status.replace('_', ' ')}
                  </span>
                </div>

                {/* Compliance Notes */}
                {item.compliance_notes && (
                  <div className="mt-3 p-3 bg-blue-900/20 border border-blue-800/50 rounded-lg">
                    <p className="text-sm text-blue-300">
                      ℹ️ {item.compliance_notes}
                    </p>
                  </div>
                )}

                {/* Documents */}
                {item.documents && item.documents.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {item.documents.map((doc, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2 bg-gray-800/50 rounded-lg"
                      >
                        <span className="text-lg">📄</span>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-300">
                            {doc.name}
                          </p>
                          {doc.uploaded_at && (
                            <p className="text-xs text-gray-500">
                              Uploaded {new Date(doc.uploaded_at).toLocaleString()}
                            </p>
                          )}
                        </div>
                        {doc.url && (
                          <a
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-indigo-400 hover:text-indigo-300"
                          >
                            View →
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                {item.status !== 'completed' && (
                  <div className="mt-4 flex gap-3">
                    {item.status === 'pending' && (
                      <button className="btn-primary text-sm">
                        Upload Documents
                      </button>
                    )}
                    {item.status === 'in_progress' && (
                      <button className="btn-secondary text-sm">
                        View Status
                      </button>
                    )}
                    {item.status === 'blocked' && (
                      <button className="btn-secondary text-sm">
                        Resolve Issue
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Footer */}
      <div className="card mt-8 bg-indigo-900/20 border-indigo-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-100 mb-1">
              Ready to Approve?
            </h3>
            <p className="text-sm text-gray-400">
              All required items must be completed before final approval
            </p>
          </div>
          <button
            className="btn-primary"
            disabled={completedItems < totalItems}
          >
            Submit for Approval
          </button>
        </div>
      </div>
    </div>
  );
}
