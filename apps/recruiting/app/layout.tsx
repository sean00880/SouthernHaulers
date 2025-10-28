import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Southern Haulers Recruiting',
  description: 'AI-powered recruiting and onboarding platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-950 text-gray-100">
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-sm">
                    SH
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold text-gray-100">
                      Recruiting Portal
                    </h1>
                    <p className="text-xs text-gray-400">
                      AI-Powered Hiring Engine
                    </p>
                  </div>
                </div>

                {/* User Menu */}
                <div className="flex items-center gap-4">
                  <button className="text-sm text-gray-400 hover:text-gray-300 transition-colors">
                    Settings
                  </button>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-semibold">
                    HR
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>

          {/* Footer */}
          <footer className="border-t border-gray-800 bg-gray-900/30 py-4">
            <div className="container mx-auto px-4">
              <p className="text-xs text-gray-500 text-center">
                © {new Date().getFullYear()} Southern Haulers. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
