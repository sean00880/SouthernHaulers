
import type { Metadata } from "next";
import { Inter, Archivo, Roboto } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import HeaderOne from "@/components/navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const archivo = Archivo({
  weight: '200',
  subsets: ["latin"],
  variable: '--font-archivo',
  display: 'swap',
});
const roboto = Roboto({
  weight: '200',
  subsets: ["latin"],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.southernhaulers.net'),
  title: {
    default: 'Southern Haulers - Container Drayage & Agricultural Hauling Services',
    template: '%s | Southern Haulers',
  },
  description: 'Premier container drayage and agricultural hauling services across the Southeast. Strategic hub with 300+ container capacity, real-time GPS tracking, and direct service to Savannah, Charleston, and Jacksonville ports. TWIC certified, 98.5% on-time delivery.',
  keywords: [
    'container drayage',
    'port drayage',
    'agricultural hauling',
    'container transport',
    'port of savannah',
    'charleston harbor',
    'jaxport',
    'warehousing',
    'transloading',
    'intermodal shipping',
    'southeastern logistics',
    'georgia trucking',
    'south carolina trucking',
    'florida trucking',
    'TWIC certified',
  ],
  authors: [{ name: 'Southern Haulers' }],
  creator: 'Southern Haulers',
  publisher: 'Southern Haulers',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.southernhaulers.net',
    siteName: 'Southern Haulers',
    title: 'Southern Haulers - Container Drayage & Agricultural Hauling',
    description: 'Premier container drayage and agricultural hauling services across the Southeast with 300+ container capacity and real-time tracking.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Southern Haulers - Container Drayage Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Southern Haulers - Container Drayage & Agricultural Hauling',
    description: 'Premier drayage services with 300+ container capacity and real-time tracking.',
    images: ['/images/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  alternates: {
    canonical: 'https://www.southernhaulers.net',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${archivo.variable} ${roboto.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <HeaderOne />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
