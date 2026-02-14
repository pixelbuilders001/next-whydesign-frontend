import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ProgrammeLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-stone-50 to-white">
      <Header />
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
