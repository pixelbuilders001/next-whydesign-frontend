
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ToastProvider } from "@/components/Toast";
import NoInternetBanner from "@/components/NoInternetBanner";
import ModernLoader from "@/components/ModernLoader";
import { Suspense } from "react";
import Providers from "@/components/Providers";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Why Designers - Fashion Education & Study Abroad",
  description: "Transform your passion into a profession with world-class fashion education, study abroad opportunities, and personalized career guidance at Why Designers.",
  keywords: "fashion design, study abroad, fashion education, NIFT, fashion courses, design school, PWA, progressive web app",
  authors: [{ name: "Why Designers" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Why Designers",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "Why Designers - Fashion Education & Study Abroad",
    description: "Transform your passion into a profession with world-class fashion education, study abroad opportunities, and personalized career guidance.",
    type: "website",
    siteName: "Why Designers",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Designers - Fashion Education & Study Abroad",
    description: "Transform your passion into a profession with world-class fashion education, study abroad opportunities, and personalized career guidance.",
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo.png" />
        <link rel="mask-icon" href="/logo.png" color="#d97706" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Why Designers" />
        <meta name="application-name" content="Why Designers" />
        <meta name="msapplication-TileColor" content="#d97706" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white text-gray-900`}
      >
      
        {/* <ErrorBoundary> */}
          <ToastProvider>
            {/* <Suspense fallback={<ModernLoader onFinish={() => {}} />}> */}
              <NoInternetBanner />
              <div className="relative">
              <Providers 
              
              >{children}</Providers>
                {/* Dark Mode Toggle - Fixed Position */}
              
              </div>
            {/* </Suspense> */}
          </ToastProvider>
        {/* </ErrorBoundary> */}

        {/* PWA Install Prompt */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              let deferredPrompt;
              window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                deferredPrompt = e;
                // Show install button or banner
                console.log('PWA install prompt available');
              });
              
              window.addEventListener('appinstalled', (evt) => {
                console.log('PWA was installed');
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
