import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Southern Haulers Admin',
  description: 'Dispatch, operations, and billing management for Southern Haulers TMS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex bg-gray-950 text-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
          <div className="p-6 border-b border-gray-800">
            <h1 className="text-xl font-bold text-indigo-400">Southern Haulers</h1>
            <p className="text-sm text-gray-400">Admin Portal</p>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <a href="/dashboard" className="block px-4 py-2 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white transition-colors">
              Dashboard
            </a>
            <a href="/dispatch" className="block px-4 py-2 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white transition-colors">
              Dispatch Board
            </a>
            <a href="/exceptions" className="block px-4 py-2 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white transition-colors">
              Exception Alerts
            </a>
            <a href="/quotes" className="block px-4 py-2 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white transition-colors">
              Quote Management
            </a>
            <a href="/drivers" className="block px-4 py-2 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white transition-colors">
              Drivers
            </a>
            <a href="/customers" className="block px-4 py-2 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white transition-colors">
              Customers
            </a>
            <a href="/billing" className="block px-4 py-2 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white transition-colors">
              Billing
            </a>
          </nav>
          <div className="p-4 border-t border-gray-800">
            <button className="w-full px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-auto">
          <header className="p-6 border-b border-gray-800 bg-gray-900/50">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Admin Dashboard</h2>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">John Admin</span>
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-medium">
                  JA
                </div>
              </div>
            </div>
          </header>
          <div className="flex-1 p-6">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
