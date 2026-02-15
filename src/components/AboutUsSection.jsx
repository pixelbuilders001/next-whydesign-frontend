"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const AboutUsSection = () => {
  return (
    <section id="about-us" className="relative py-24 md:py-32 bg-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-amber-50 rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-rose-50 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* Visual Section - Overlapping Images */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] max-w-lg mx-auto">
              {/* Main Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative z-20 w-[85%] h-[85%] rounded-3xl overflow-hidden shadow-2xl border-8 border-white"
              >
                <img
                  src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800&fit=crop"
                  alt="Fashion Design Education"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Secondary Overlapping Image */}
              <motion.div
                initial={{ opacity: 0, x: 50, y: 50 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute bottom-0 right-0 z-30 w-[60%] h-[60%] rounded-3xl overflow-hidden shadow-2xl border-8 border-white"
              >
                <img
                  src="https://images.pexels.com/photos/3738088/pexels-photo-3738088.jpeg?auto=compress&cs=tinysrgb&w=600&fit=crop"
                  alt="Creative Workspace"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Decorative Glass Card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                className="absolute -left-6 top-1/4 z-40 bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/50 hidden md:block"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">WD</div>
                  <div>
                    <p className="text-xs font-bold text-gray-900 uppercase tracking-wider">Est. 2020</p>
                    <p className="text-xs text-amber-600 font-medium">Global Community</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 italic font-medium leading-tight">
                  "Empowering the next generation<br />of creative leaders."
                </p>
              </motion.div>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:col-span-6 space-y-8 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] text-amber-600 uppercase bg-amber-50 rounded-full border border-amber-100">
                Our Story
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-light text-gray-900 leading-[1.1]">
                Democratizing
                <span className="block italic text-amber-600 font-normal mt-2">
                  Fashion Design
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-4 text-left"
            >
              <p className="text-lg md:text-xl text-gray-700 font-light leading-relaxed">
                Creative talent exists everywhere, but access shouldn't be a luxury. Why Designers was born from a simple belief: <span className="font-medium text-gray-900">Education should be accessible, modern, and limitless.</span>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 text-black">
                <div className="space-y-2">
                  <h4 className="font-bold text-gray-900 flex items-center">
                    <span className="w-6 h-px bg-amber-500 mr-3" />
                    Traditional Roots
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed pl-9">Mastering the timeless principles of design and craftsmanship.</p>
                </div>
                <div className="space-y-2 text-black">
                  <h4 className="font-bold text-gray-900 flex items-center">
                    <span className="w-6 h-px bg-rose-500 mr-3" />
                    Digital Future
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed pl-9">Leveraging cutting-edge tools to redefine the industry landscape.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex items-center pt-6"
            >
              <Link
                href="/about-us"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full p-4 px-10 font-bold text-white transition-all duration-300 ease-out shadow-2xl"
              >
                <span className="absolute inset-0 h-full w-full bg-gradient-to-br from-amber-500 via-rose-500 to-purple-600"></span>
                <span className="absolute bottom-0 right-0 mb-32 mr-4 block h-64 w-64 origin-bottom-left translate-x-24 rotate-45 transform bg-white opacity-[.15] transition-all duration-700 ease-out group-hover:mb-0 group-hover:mr-0 group-hover:translate-x-0"></span>
                <span className="relative flex items-center">
                  Full Story
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
