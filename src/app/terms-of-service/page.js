import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: "Terms of Service - Why Designers | Legal Agreement",
  description: "Read Why Designers' Terms of Service to understand the rules and guidelines for using our platform, courses, and services. Learn about user responsibilities and platform policies.",
  keywords: "terms of service, user agreement, legal terms, platform rules, service terms, Why Designers terms",
  authors: [{ name: "Why Designers" }],
  openGraph: {
    title: "Terms of Service - Why Designers | Legal Agreement",
    description: "Read Why Designers' Terms of Service to understand the rules and guidelines for using our platform, courses, and services.",
    type: "website",
    url: "https://whydesigners.com/terms-of-service",
    siteName: "Why Designers",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service - Why Designers",
    description: "Read Why Designers' Terms of Service to understand the rules and guidelines for using our platform.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      <Header />
      <main className="pt-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Back Link */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium"
            >
              <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>

          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600">
              Last updated: January 15, 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900">
            <h2>Acceptance of Terms</h2>
            <p>By accessing and using why designers, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>

            <h2>Use License</h2>
            <p>Permission is granted to temporarily download one copy of the materials on why designers for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul>
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to decompile or reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>

            <h2>User Accounts</h2>
            <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.</p>

            <h2>Course Enrollment and Payment</h2>
            <p>All fees are quoted in USD and are subject to change without notice. Payment is due at the time of enrollment. Refunds may be available under certain circumstances as outlined in our refund policy.</p>

            <h2>Intellectual Property</h2>
            <p>The service and its original content, features, and functionality are and will remain the exclusive property of why designers and its licensors. The service is protected by copyright, trademark, and other laws.</p>

            <h2>Prohibited Uses</h2>
            <p>You may not use our service:</p>
            <ul>
              <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
            </ul>

            <h2>Termination</h2>
            <p>We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.</p>

            <h2>Contact Information</h2>
            <p>If you have any questions about these Terms of Service, please contact us at:</p>
            <p>Email: info@whydesigners.com<br />
    </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}