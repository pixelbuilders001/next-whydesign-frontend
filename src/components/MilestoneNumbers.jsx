"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MilestoneNumbers = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById("milestone-section");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  // Animated number counter function
  const AnimatedNumber = ({ value, duration = 2000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      let startTime = null;
      const animateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * value));
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        }
      };

      requestAnimationFrame(animateCount);
    }, [isVisible, value, duration]);

    return (
      <motion.span
        initial={{ scale: 0.5, opacity: 0 }}
        animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
        transition={{ duration: 0.5, delay: isVisible ? 0.2 : 0 }}
        className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-amber-500 to-rose-500 bg-clip-text text-transparent"
      >
        {count}+
      </motion.span>
    );
  };

  const milestones = [
    {
      number: 100,
      label: "Happy Students",
    //   description: "Students who achieved their dreams with us",
    },
    {
      number: 50,
      label: "Expert Mentors",
    //   description: "Industry professionals guiding your journey",
    },
    {
      number: 25,
      label: "Partner Universities",
    //   description: "Top institutions worldwide accepting our students",
    },
    {
      number: 95,
      label: "Success Rate",
    //   description: "Percentage of students placed in top companies",
    },
  ];

  return (
    <section
      id="milestone-section"
      className="py-20 bg-gradient-to-b from-stone-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-gray-900 mb-4"
          >
            Our
            <span className="block bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400 bg-clip-text text-transparent font-bold">
              Achievements
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Numbers that reflect our commitment to excellence in fashion education
          </motion.p>
        </div> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="flex flex-col items-center text-center"
              >
                <AnimatedNumber value={milestone.number} />
                <h3 className="text-2xl sm:text-sm font-semibold text-gray-900 mt-4 mb-2">
                  {milestone.label}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {milestone.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MilestoneNumbers;
