"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const AboutUsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content Section */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-gray-900">
                Discover
                <span className="block bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400 bg-clip-text text-transparent font-bold">
                  Why Designers
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-4"
            >
              <p className="text-lg text-gray-600 leading-relaxed">
                Founded with a passion for democratizing fashion education, Why Designs emerged from the recognition that creative talent exists everywhere, but access to quality design education remains limited.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our mission is to break down barriers and create opportunities for talented individuals worldwide through comprehensive programs that blend traditional design principles with modern digital tools and sustainable practices.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/about-us"
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <span>Learn More About Us</span>
                <ArrowRight
                  className="group-hover:translate-x-1 transition-transform duration-200 ml-3"
                  size={20}
                  aria-hidden="true"
                />
              </Link>
              {/* <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 border-2 border-amber-500 text-amber-600 hover:bg-amber-50 font-semibold rounded-lg transition-all duration-300"
              >
                Contact Us
              </Link> */}
            </motion.div>
          </div>

          {/* Visual Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-amber-100 to-rose-100 rounded-3xl p-2 shadow-xl">
              <div className="relative overflow-hidden rounded-3xl">
                <img
                  src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                  alt="Why Designers Fashion Education"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-rose-400 rounded-full flex items-center justify-center">
                        <span className="text-white text-xl font-bold">WD</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Why Designers</h3>
                      <p className="text-amber-100">Empowering Creative Minds</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
