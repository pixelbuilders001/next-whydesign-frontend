import FAQClient from './FAQClient';
import { faqs } from '../../../data/faq';

export const metadata = {
  title: "Frequently Asked Questions - Why Designers",
  description: "Find answers to common questions about our fashion education programs, study abroad opportunities, and services at Why Designers.",
  keywords: "fashion education FAQ, study abroad questions, why designers FAQ, fashion design courses questions",
  openGraph: {
    title: "Frequently Asked Questions - Why Designers",
    description: "Find answers to common questions about our fashion education programs, study abroad opportunities, and services at Why Designers.",
    images: [
      {
        url: '/faq-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Why Designers FAQ',
      },
    ],
  },
};

export default function FAQPage() {
  return <FAQClient faqs={faqs} />;
}