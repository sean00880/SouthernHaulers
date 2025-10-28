'use client';

import { useState } from 'react';

interface Quote {
  id: string;
  quote_number: string;
  company_name: string;
  contact_name: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected' | 'converted';
  origin: string;
  destination: string;
  container_type: string;
  base_rate: number;
  accessorials: number;
  total: number;
  created_at: string;
  approval_required: boolean;
}

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([
    {
      id: '1',
      quote_number: 'Q-2025-015',
      company_name: 'ABC Logistics',
      contact_name: 'John Smith',
      email: 'john@abclogistics.com',
      status: 'pending',
      origin: 'Port of Savannah, GA',
      destination: 'Atlanta Distribution Center, GA',
      container_type: '40ft',
      base_rate: 750,
      accessorials: 100,
      total: 850,
      created_at: '2025-10-23T14:30:00Z',
      approval_required: false,
    },
    {
      id: '2',
      quote_number: 'Q-2025-014',
      company_name: 'XYZ Shipping',
      contact_name: 'Sarah Johnson',
      email: 'sarah@xyzshipping.com',
      status: 'approved',
      origin: 'Charleston, SC',
      destination: 'Charlotte, NC',
      container_type: '40ft-HC',
      base_rate: 1100,
      accessorials: 100,
      total: 1200,
      created_at: '2025-10-22T10:15:00Z',
      approval_required: true,
    },
    {
      id: '3',
      quote_number: 'Q-2025-013',
      company_name: 'Global Trade Co',
      contact_name: 'Mike Williams',
      email: 'mike@globaltrade.com',
      status: 'converted',
      origin: 'Port of Savannah, GA',
      destination: 'Jacksonville, FL',
      container_type: '20ft',
      base_rate: 550,
      accessorials: 100,
      total: 650,
      created_at: '2025-10-21T09:00:00Z',
      approval_required: false,
    },
  ]);

  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'converted'>('all');

  const getStatusColor = (status: Quote['status']) => {
    switch (status) {
      case 'approved':
        return 'text-green-400 bg-green-900/30 border-green-800';
      case 'pending':
        return 'text-yellow-400 bg-yellow-900/30 border-yellow-800';
      case 'rejected':
        return 'text-red-400 bg-red-900/30 border-red-800';
      case 'converted':
        return 'text-blue-400 bg-blue-900/30 border-blue-800';
      default:
        return 'text-gray-400 bg-gray-900/30 border-gray-800';
    }
  };

  const handleApprove = (quoteId: string) => {
    setQuotes(
      quotes.map((q) =>
        q.id === quoteId ? { ...q, status: 'approved' as const } : q
      )
    );
    setShowDetailModal(false);
    setSelectedQuote(null);
  };

  const handleReject = (quoteId: string) => {
    setQuotes(
      quotes.map((q) =>
        q.id === quoteId ? { ...q, status: 'rejected' as const } : q
      )
    );
    setShowDetailModal(false);
    setSelectedQuote(null);
  };

  const handleConvert = (quoteId: string) => {
    setQuotes(
      quotes.map((q) =>
        q.id === quoteId ? { ...q, status: 'converted' as const } : q
      )
    );
    setShowDetailModal(false);
    setSelectedQuote(null);
    // TODO: Navigate to create shipment with pre-filled data
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredQuotes = filter === 'all' ? quotes : quotes.filter((q) => q.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quote Management</h1>
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-indigo-500 focus:outline-none"
          >
            <option value="all">All Quotes</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="converted">Converted</option>
          </select>
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors">
            + New Quote
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-gray-900 border border-gray-800">
          <p className="text-sm text-gray-400 mb-1">Total Quotes</p>
          <p className="text-2xl font-bold">{quotes.length}</p>
        </div>
        <div className="p-4 rounded-lg bg-gray-900 border border-gray-800">
          <p className="text-sm text-gray-400 mb-1">Pending</p>
          <p className="text-2xl font-bold text-yellow-400">
            {quotes.filter((q) => q.status === 'pending').length}
          </p>
        </div>
        <div className="p-4 rounded-lg bg-gray-900 border border-gray-800">
          <p className="text-sm text-gray-400 mb-1">Approved</p>
          <p className="text-2xl font-bold text-green-400">
            {quotes.filter((q) => q.status === 'approved').length}
          </p>
        </div>
        <div className="p-4 rounded-lg bg-gray-900 border border-gray-800">
          <p className="text-sm text-gray-400 mb-1">Converted</p>
          <p className="text-2xl font-bold text-blue-400">
            {quotes.filter((q) => q.status === 'converted').length}
          </p>
        </div>
      </div>

      {/* Quotes Table */}
      <div className="p-6 rounded-lg bg-gray-900 border border-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-3 px-4 font-medium text-gray-400">Quote #</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Company</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Route</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Container</th>
                <th className="text-right py-3 px-4 font-medium text-gray-400">Total</th>
                <th className="text-center py-3 px-4 font-medium text-gray-400">Status</th>
                <th className="text-right py-3 px-4 font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuotes.map((quote) => (
                <tr key={quote.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="py-3 px-4 font-medium">{quote.quote_number}</td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium">{quote.company_name}</p>
                      <p className="text-sm text-gray-400">{quote.contact_name}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-sm">{quote.origin}</p>
                    <p className="text-sm text-gray-400">→ {quote.destination}</p>
                  </td>
                  <td className="py-3 px-4">{quote.container_type}</td>
                  <td className="py-3 px-4 text-right font-medium">{formatCurrency(quote.total)}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(quote.status)}`}>
                      {quote.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedQuote(quote);
                        setShowDetailModal(true);
                      }}
                      className="px-3 py-1 text-sm bg-gray-800 hover:bg-gray-700 rounded transition-colors"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredQuotes.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p>No quotes found</p>
            </div>
          )}
        </div>
      </div>

      {/* Quote Detail Modal */}
      {showDetailModal && selectedQuote && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{selectedQuote.quote_number}</h2>
              <span className={`px-3 py-1 text-sm rounded-full border ${getStatusColor(selectedQuote.status)}`}>
                {selectedQuote.status.toUpperCase()}
              </span>
            </div>

            <div className="space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-indigo-400">Customer Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Company</p>
                    <p className="font-medium">{selectedQuote.company_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Contact</p>
                    <p className="font-medium">{selectedQuote.contact_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="font-medium">{selectedQuote.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Created</p>
                    <p className="font-medium">{formatDate(selectedQuote.created_at)}</p>
                  </div>
                </div>
              </div>

              {/* Route Info */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-indigo-400">Route Details</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <p>{selectedQuote.origin}</p>
                  </div>
                  <div className="ml-6 h-8 w-0.5 bg-gray-700"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <p>{selectedQuote.destination}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-400">Container Type</p>
                  <p className="font-medium">{selectedQuote.container_type}</p>
                </div>
              </div>

              {/* Pricing */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-indigo-400">Pricing Breakdown</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Base Rate</span>
                    <span className="font-medium">{formatCurrency(selectedQuote.base_rate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Accessorials</span>
                    <span className="font-medium">{formatCurrency(selectedQuote.accessorials)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-800">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-bold text-indigo-400">{formatCurrency(selectedQuote.total)}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-800">
                {selectedQuote.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleApprove(selectedQuote.id)}
                      className="flex-1 py-2 bg-green-600 hover:bg-green-500 rounded-lg transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(selectedQuote.id)}
                      className="flex-1 py-2 bg-red-600 hover:bg-red-500 rounded-lg transition-colors"
                    >
                      Reject
                    </button>
                  </>
                )}
                {selectedQuote.status === 'approved' && (
                  <button
                    onClick={() => handleConvert(selectedQuote.id)}
                    className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
                  >
                    Convert to Shipment
                  </button>
                )}
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    setSelectedQuote(null);
                  }}
                  className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
