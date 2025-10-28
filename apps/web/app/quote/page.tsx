'use client';

import { useState } from 'react';

export default function QuotePage() {
  const [formData, setFormData] = useState({
    company_name: '',
    contact_name: '',
    email: '',
    phone: '',
    origin_address: '',
    origin_city: '',
    origin_state: 'GA',
    origin_zip: '',
    destination_address: '',
    destination_city: '',
    destination_state: 'GA',
    destination_zip: '',
    container_type: '40ft',
    cargo_type: 'general',
    pickup_date: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/quotes/request', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      // Mock success for demo
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting quote request:', error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 py-12 text-center">
        <div className="p-8 rounded-lg bg-green-900/30 border border-green-800">
          <svg className="w-16 h-16 mx-auto mb-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold mb-2 text-green-400">Quote Request Submitted!</h2>
          <p className="text-gray-300 mb-6">
            Thank you for your request. Our team will review your information and get back to you within 24 hours with a competitive quote.
          </p>
          <p className="text-sm text-gray-400 mb-6">
            Check your email at <strong className="text-white">{formData.email}</strong> for confirmation and updates.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-medium transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2 text-center">Request a Quote</h1>
      <p className="text-gray-400 text-center mb-8">
        Get a competitive quote for your drayage needs. We'll respond within 24 hours.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Contact Information */}
        <div className="p-6 rounded-lg bg-gray-900 border border-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-indigo-400">Contact Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Company Name *</label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Contact Name *</label>
              <input
                type="text"
                name="contact_name"
                value={formData.contact_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Origin */}
        <div className="p-6 rounded-lg bg-gray-900 border border-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-indigo-400">Pickup Location</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Address *</label>
              <input
                type="text"
                name="origin_address"
                value={formData.origin_address}
                onChange={handleChange}
                placeholder="Street address or terminal name"
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">City *</label>
              <input
                type="text"
                name="origin_city"
                value={formData.origin_city}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">State *</label>
              <select
                name="origin_state"
                value={formData.origin_state}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:outline-none"
              >
                <option value="GA">Georgia</option>
                <option value="FL">Florida</option>
                <option value="SC">South Carolina</option>
                <option value="NC">North Carolina</option>
                <option value="AL">Alabama</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">ZIP Code *</label>
              <input
                type="text"
                name="origin_zip"
                value={formData.origin_zip}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Destination */}
        <div className="p-6 rounded-lg bg-gray-900 border border-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-indigo-400">Delivery Location</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Address *</label>
              <input
                type="text"
                name="destination_address"
                value={formData.destination_address}
                onChange={handleChange}
                placeholder="Street address or facility name"
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">City *</label>
              <input
                type="text"
                name="destination_city"
                value={formData.destination_city}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">State *</label>
              <select
                name="destination_state"
                value={formData.destination_state}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:outline-none"
              >
                <option value="GA">Georgia</option>
                <option value="FL">Florida</option>
                <option value="SC">South Carolina</option>
                <option value="NC">North Carolina</option>
                <option value="AL">Alabama</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">ZIP Code *</label>
              <input
                type="text"
                name="destination_zip"
                value={formData.destination_zip}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Shipment Details */}
        <div className="p-6 rounded-lg bg-gray-900 border border-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-indigo-400">Shipment Details</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Container Type *</label>
              <select
                name="container_type"
                value={formData.container_type}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:outline-none"
              >
                <option value="20ft">20ft Standard</option>
                <option value="40ft">40ft Standard</option>
                <option value="40ft-HC">40ft High Cube</option>
                <option value="45ft">45ft High Cube</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Cargo Type *</label>
              <select
                name="cargo_type"
                value={formData.cargo_type}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:outline-none"
              >
                <option value="general">General Cargo</option>
                <option value="hazmat">Hazardous Materials</option>
                <option value="refrigerated">Refrigerated</option>
                <option value="oversized">Oversized</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Desired Pickup Date *</label>
              <input
                type="date"
                name="pickup_date"
                value={formData.pickup_date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Additional Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              placeholder="Any special requirements, handling instructions, or questions..."
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-700 rounded-lg font-medium text-lg transition-colors"
        >
          {loading ? 'Submitting...' : 'Request Quote'}
        </button>
      </form>
    </div>
  );
}
