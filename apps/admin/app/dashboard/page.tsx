'use client';

import { useState, useEffect } from 'react';

interface ExceptionAlert {
  id: string;
  shipment_number: string;
  type: 'tmf_exceeded' | 'per_diem_risk' | 'driver_delay' | 'missed_appointment';
  severity: 'critical' | 'high' | 'medium' | 'low';
  message: string;
  estimated_cost_impact: number;
  created_at: string;
}

interface DashboardStats {
  active_shipments: number;
  available_drivers: number;
  pending_quotes: number;
  exceptions_today: number;
  revenue_mtd: number;
  on_time_percentage: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    active_shipments: 0,
    available_drivers: 0,
    pending_quotes: 0,
    exceptions_today: 0,
    revenue_mtd: 0,
    on_time_percentage: 0,
  });

  const [exceptions, setExceptions] = useState<ExceptionAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API calls
    // Mock data for demo
    setTimeout(() => {
      setStats({
        active_shipments: 47,
        available_drivers: 12,
        pending_quotes: 8,
        exceptions_today: 3,
        revenue_mtd: 487250,
        on_time_percentage: 94.2,
      });

      setExceptions([
        {
          id: '1',
          shipment_number: 'SH-2025-045',
          type: 'tmf_exceeded',
          severity: 'critical',
          message: 'TMF charges accruing: 2 days past last free day',
          estimated_cost_impact: 150,
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          shipment_number: 'SH-2025-042',
          type: 'driver_delay',
          severity: 'high',
          message: 'Driver delayed 90 minutes, appointment at risk',
          estimated_cost_impact: 0,
          created_at: new Date().toISOString(),
        },
        {
          id: '3',
          shipment_number: 'SH-2025-038',
          type: 'per_diem_risk',
          severity: 'medium',
          message: 'Approaching per diem charges in 24 hours',
          estimated_cost_impact: 75,
          created_at: new Date().toISOString(),
        },
      ]);

      setLoading(false);
    }, 500);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-400 bg-red-900/30 border-red-800';
      case 'high':
        return 'text-orange-400 bg-orange-900/30 border-orange-800';
      case 'medium':
        return 'text-yellow-400 bg-yellow-900/30 border-yellow-800';
      case 'low':
        return 'text-blue-400 bg-blue-900/30 border-blue-800';
      default:
        return 'text-gray-400 bg-gray-900/30 border-gray-800';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="p-4 rounded-lg bg-gray-900 border border-gray-800">
          <p className="text-sm text-gray-400 mb-1">Active Shipments</p>
          <p className="text-2xl font-bold">{stats.active_shipments}</p>
        </div>
        <div className="p-4 rounded-lg bg-gray-900 border border-gray-800">
          <p className="text-sm text-gray-400 mb-1">Available Drivers</p>
          <p className="text-2xl font-bold">{stats.available_drivers}</p>
        </div>
        <div className="p-4 rounded-lg bg-gray-900 border border-gray-800">
          <p className="text-sm text-gray-400 mb-1">Pending Quotes</p>
          <p className="text-2xl font-bold">{stats.pending_quotes}</p>
        </div>
        <div className="p-4 rounded-lg bg-gray-900 border border-gray-800">
          <p className="text-sm text-gray-400 mb-1">Exceptions Today</p>
          <p className="text-2xl font-bold text-orange-400">{stats.exceptions_today}</p>
        </div>
        <div className="p-4 rounded-lg bg-gray-900 border border-gray-800">
          <p className="text-sm text-gray-400 mb-1">Revenue (MTD)</p>
          <p className="text-2xl font-bold text-green-400">{formatCurrency(stats.revenue_mtd)}</p>
        </div>
        <div className="p-4 rounded-lg bg-gray-900 border border-gray-800">
          <p className="text-sm text-gray-400 mb-1">On-Time %</p>
          <p className="text-2xl font-bold text-indigo-400">{stats.on_time_percentage}%</p>
        </div>
      </div>

      {/* Exception Alerts */}
      <div className="p-6 rounded-lg bg-gray-900 border border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-indigo-400">Active Exceptions</h2>
          <a href="/exceptions" className="text-sm text-indigo-400 hover:text-indigo-300">
            View All →
          </a>
        </div>

        {exceptions.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>No active exceptions</p>
          </div>
        ) : (
          <div className="space-y-3">
            {exceptions.map((exception) => (
              <div
                key={exception.id}
                className={`p-4 rounded-lg border ${getSeverityColor(exception.severity)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{exception.shipment_number}</span>
                      <span className="px-2 py-0.5 text-xs rounded-full bg-gray-800">
                        {exception.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm mb-2">{exception.message}</p>
                    {exception.estimated_cost_impact > 0 && (
                      <p className="text-xs text-gray-400">
                        Estimated Cost Impact: <span className="font-medium">{formatCurrency(exception.estimated_cost_impact)}</span>
                      </p>
                    )}
                  </div>
                  <button className="px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-lg bg-gray-900 border border-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-indigo-400">Recent Shipments</h2>
          <div className="space-y-3">
            {[
              { number: 'SH-2025-047', status: 'In Transit', driver: 'Mike Johnson' },
              { number: 'SH-2025-046', status: 'At Terminal', driver: 'Sarah Williams' },
              { number: 'SH-2025-045', status: 'Delivered', driver: 'John Doe' },
            ].map((shipment) => (
              <div key={shipment.number} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
                <div>
                  <p className="font-medium">{shipment.number}</p>
                  <p className="text-sm text-gray-400">{shipment.driver}</p>
                </div>
                <span className="px-3 py-1 text-xs rounded-full bg-blue-900/30 text-blue-400">
                  {shipment.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-lg bg-gray-900 border border-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-indigo-400">Pending Quotes</h2>
          <div className="space-y-3">
            {[
              { company: 'ABC Logistics', route: 'Savannah → Atlanta', amount: 850 },
              { company: 'XYZ Shipping', route: 'Charleston → Charlotte', amount: 1200 },
              { company: 'Global Trade Co', route: 'Savannah → Jacksonville', amount: 650 },
            ].map((quote, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
                <div>
                  <p className="font-medium">{quote.company}</p>
                  <p className="text-sm text-gray-400">{quote.route}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(quote.amount)}</p>
                  <button className="text-xs text-indigo-400 hover:text-indigo-300">
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
