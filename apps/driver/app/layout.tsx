import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Southern Haulers Driver',
  description: 'Mobile driver app for Southern Haulers TMS',
  manifest: '/manifest.json',
  themeColor: '#4f46e5',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'SH Driver',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="min-h-screen bg-gray-950 text-gray-100 overflow-x-hidden">
        <div className="safe-area-inset">
          {children}
        </div>
      </body>
    </html>
  );
}
