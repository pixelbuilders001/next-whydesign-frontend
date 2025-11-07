import WebsiteDesignPage from "./WebsiteDesign";

export const metadata = {
  title: "Professional Website Design & Development Services | Whydesigners",
  description: "Transform your digital presence with stunning, high-performance websites. Custom web design, responsive development, and modern UI/UX solutions that drive business growth.",
  keywords: "website design, web development, UI/UX design, responsive websites, custom web development, e-commerce websites, React development, Next.js development",
  authors: [{ name: "Whydesigners" }],
  creator: "Whydesigners",
  publisher: "Whydesigners",
  robots: "index, follow",
  openGraph: {
    title: "Professional Website Design & Development Services | Whydesigners",
    description: "Transform your digital presence with stunning, high-performance websites that drive real business results.",
    url: "https://whydesigners.com/services/website-design",
    siteName: "Whydesigners",
    images: [
      {
        url: "/og-website-design.jpg",
        width: 1200,
        height: 630,
        alt: "Whydesigners - Professional Website Design Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Website Design & Development Services | Whydesigners",
    description: "Transform your digital presence with stunning, high-performance websites.",
    creator: "@whydesigners",
    images: ["/og-website-design.jpg"],
  },
  // Remove viewport, themeColor, manifest, and icons from here as they should be in layout
  alternates: {
    canonical: "https://whydesigners.com/services/website-design",
  },
  category: "web design",
};

export default function WebsiteDesign() {
  return <WebsiteDesignPage />;
}