import Link from "next/link";
import { Globe, ArrowRight, Sparkles, Zap } from "lucide-react";

export default function WebsiteDesignCTA() {
  return (
    <section className="py-8 bg-gradient-to-br from-stone-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/services/website-design"
          className="group block relative overflow-hidden bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative px-6 py-6 sm:px-8 sm:py-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Left Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Sparkles className="w-4 h-4 text-white" />
                    <span className="text-xs font-semibold text-white">New Service</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Globe className="w-4 h-4 text-white" />
                    <span className="text-xs font-semibold text-white">Partnered with PixelBuilders</span>
                  </div>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Need a Professional Website?
                </h3>
                <p className="text-white/90 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0">
                  Get a stunning, high-performance website that drives results. Modern design, SEO optimized, and mobile-first.
                </p>
              </div>

              {/* Right CTA */}
              <div className="flex-shrink-0">
                <div className="flex items-center gap-4">
                  {/* Quick Stats */}
                  <div className="hidden sm:flex items-center gap-4 text-white/90 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-white text-lg">150+</div>
                      <div className="text-xs">Projects</div>
                    </div>
                    <div className="w-px h-10 bg-white/30"></div>
                    <div className="text-center">
                      <div className="font-bold text-white text-lg">98%</div>
                      <div className="text-xs">Satisfaction</div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold flex items-center gap-2 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <span>Explore Now</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-2 right-2 opacity-20 group-hover:opacity-30 transition-opacity">
              <Zap className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* Pulse effect on hover */}
          <div className="absolute inset-0 rounded-2xl ring-2 ring-white/0 group-hover:ring-white/30 transition-all duration-300"></div>
        </Link>
      </div>
    </section>
  );
}