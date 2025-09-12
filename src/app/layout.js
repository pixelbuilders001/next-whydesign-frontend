
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ToastProvider } from "@/components/Toast";
import NoInternetBanner from "@/components/NoInternetBanner";
import ModernLoader from "@/components/ModernLoader";
import { Suspense } from "react";

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
  keywords: "fashion design, study abroad, fashion education, NIFT, fashion courses, design school",
  authors: [{ name: "Why Designers" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "#d97706",
  manifest: "/manifest.json",
  openGraph: {
    title: "Why Designers - Fashion Education & Study Abroad",
    description: "Transform your passion into a profession with world-class fashion education, study abroad opportunities, and personalized career guidance.",
    type: "website",
    siteName: "Why Designers",
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Designers - Fashion Education & Study Abroad",
    description: "Transform your passion into a profession with world-class fashion education, study abroad opportunities, and personalized career guidance.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Why Designers" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white text-gray-900`}
      >
        {/* <ErrorBoundary> */}
          <ToastProvider>
            {/* <Suspense fallback={<ModernLoader onFinish={() => {}} />}> */}
              <NoInternetBanner />
              <div className="relative">
                {children}
                {/* Dark Mode Toggle - Fixed Position */}
              
              </div>
            {/* </Suspense> */}
          </ToastProvider>
        {/* </ErrorBoundary> */}

        {/* PWA Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
