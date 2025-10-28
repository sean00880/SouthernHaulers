export default function ClientPortal() {
  return (
    <div className="w-full max-w-4xl mx-auto py-20 px-4">
      <h1 className="text-3xl md:text-5xl font-bold mb-6">Client Portal</h1>
      <p className="text-gray-300 text-lg mb-8">
        This is a placeholder for the client dashboard. Here shippers can view and manage their shipments,
        quotes, invoices and analytics in real-time. Future iterations will pull live data from our backend
        and PortPro integration.
      </p>
      <p className="text-gray-400">
        To get started with the live system, please contact our support team or check back once the
        platform has been fully deployed.
      </p>
    </div>
  );
}