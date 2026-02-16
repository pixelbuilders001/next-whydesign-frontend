"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';

const SuccessModal = ({ isOpen, onClose, title = "Booking Confirmed!", message }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-stone-900/40 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-white rounded-[2.5rem] shadow-2xl max-w-md w-full overflow-hidden relative"
                    >
                        {/* Decorative Background */}
                        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-amber-100/50 to-rose-100/50 -z-10" />

                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 rounded-full hover:bg-stone-100 transition-colors text-stone-400 hover:text-stone-600"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-8 pt-12 text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20,
                                    delay: 0.1
                                }}
                                className="w-20 h-20 bg-gradient-to-br from-amber-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-200"
                            >
                                <CheckCircle className="text-white" size={40} strokeWidth={2.5} />
                            </motion.div>

                            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-4 px-4">
                                {title}
                            </h3>

                            <p className="text-gray-600 leading-relaxed mb-8 px-2">
                                {message || "Session booked successfully! We will send you the meeting link very soon in your email"}
                            </p>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={onClose}
                                className="w-full bg-stone-900 text-white font-bold py-4 rounded-2xl hover:bg-stone-800 transition-all shadow-xl shadow-stone-200"
                            >
                                Got it, Thank you!
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SuccessModal;
