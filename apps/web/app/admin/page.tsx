export default function AdminPortal() {
  return (
    <div className="w-full max-w-4xl mx-auto py-20 px-4">
      <h1 className="text-3xl md:text-5xl font-bold mb-6">Admin Dashboard</h1>
      <p className="text-gray-300 text-lg mb-8">
        Welcome to the Southern Haulers admin dashboard. This space will provide dispatchers and
        operations staff with a real-time board to manage loads, appointments, drivers, exceptions and
        billing. The current version is a placeholder until data integrations are complete.
      </p>
      <p className="text-gray-400">
        Additional functionality will include role-based access controls, analytics, and agentic
        workflows to automate repetitive tasks.
      </p>
    </div>
  );
}