'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: 'meta_lead_ads' | 'direct' | 'referral';
  status: 'new' | 'contacted' | 'scheduled' | 'interviewed' | 'documents_pending' | 'approved' | 'rejected';
  created_at: string;
  last_contact?: string;
  scheduled_interview?: string;
  compliance_score?: number;
}

export default function RecruitingDashboard() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    scheduled: 0,
    approved: 0,
  });

  useEffect(() => {
    // TODO: Replace with actual API call
    // const fetchCandidates = async () => {
    //   const { data } = await supabase
    //     .from('candidates')
    //     .select('*')
    //     .order('created_at', { ascending: false });
    //   setCandidates(data || []);
    // };

    // Mock data for demo
    const mockCandidates: Candidate[] = [
      {
        id: '1',
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: '+1 (555) 123-4567',
        source: 'meta_lead_ads',
        status: 'scheduled',
        created_at: '2024-01-15T10:30:00Z',
        last_contact: '2024-01-15T14:20:00Z',
        scheduled_interview: '2024-01-18T10:00:00Z',
        compliance_score: 85,
      },
      {
        id: '2',
        name: 'Maria Garcia',
        email: 'maria.g@example.com',
        phone: '+1 (555) 234-5678',
        source: 'direct',
        status: 'documents_pending',
        created_at: '2024-01-14T09:15:00Z',
        last_contact: '2024-01-16T11:45:00Z',
        compliance_score: 72,
      },
      {
        id: '3',
        name: 'David Johnson',
        email: 'djohnson@example.com',
        phone: '+1 (555) 345-6789',
        source: 'referral',
        status: 'new',
        created_at: '2024-01-16T16:20:00Z',
      },
    ];

    setCandidates(mockCandidates);
    setStats({
      total: mockCandidates.length,
      new: mockCandidates.filter((c) => c.status === 'new').length,
      scheduled: mockCandidates.filter((c) => c.status === 'scheduled').length,
      approved: mockCandidates.filter((c) => c.status === 'approved').length,
    });
    setLoading(false);
  }, []);

  const getStatusBadge = (status: Candidate['status']) => {
    const badges = {
      new: 'badge badge-info',
      contacted: 'badge badge-info',
      scheduled: 'badge badge-warning',
      interviewed: 'badge badge-warning',
      documents_pending: 'badge badge-warning',
      approved: 'badge badge-success',
      rejected: 'badge badge-danger',
    };
    return badges[status];
  };

  const getStatusLabel = (status: Candidate['status']) => {
    return status
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getSourceIcon = (source: Candidate['source']) => {
    const icons = {
      meta_lead_ads: '📱',
      direct: '🌐',
      referral: '👥',
    };
    return icons[source];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Total Candidates</p>
              <p className="text-3xl font-bold text-gray-100">{stats.total}</p>
            </div>
            <div className="text-4xl">👥</div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">New Leads</p>
              <p className="text-3xl font-bold text-blue-400">{stats.new}</p>
            </div>
            <div className="text-4xl">🆕</div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Scheduled</p>
              <p className="text-3xl font-bold text-yellow-400">{stats.scheduled}</p>
            </div>
            <div className="text-4xl">📅</div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Approved</p>
              <p className="text-3xl font-bold text-green-400">{stats.approved}</p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </div>
      </div>

      {/* Candidates Table */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-100">Recent Candidates</h2>
          <button className="btn-primary">
            Add Candidate
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                  Candidate
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                  Contact
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                  Source
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                  Compliance
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
                <tr
                  key={candidate.id}
                  className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-100">{candidate.name}</p>
                      <p className="text-sm text-gray-400">
                        Applied {new Date(candidate.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-sm text-gray-300">{candidate.email}</p>
                      <p className="text-sm text-gray-400">{candidate.phone}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{getSourceIcon(candidate.source)}</span>
                      <span className="text-sm text-gray-300">
                        {candidate.source.replace('_', ' ')}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={getStatusBadge(candidate.status)}>
                      {getStatusLabel(candidate.status)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {candidate.compliance_score ? (
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
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
                        <span className="text-sm text-gray-400">
                          {candidate.compliance_score}%
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">N/A</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <Link
                      href={`/onboarding/${candidate.id}`}
                      className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      View Details →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {candidates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No candidates found</p>
          </div>
        )}
      </div>
    </div>
  );
}
