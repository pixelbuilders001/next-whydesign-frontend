import React, { useEffect, useState } from 'react';
// import loader from "../../assets/fade-stagger-circles.svg"
import { Sparkles } from 'lucide-react';

const FashionLoader = ( onFinish  ) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2200);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br via-rose-100 to-amber-100">
      <div className="flex flex-col items-center justify-center">
        {/* Loader Animation */}
     {/* <img
          src={loader}
          alt="Fashion Loader"
          className="w-32 h-32 object-contain drop-shadow-xl animate-fade-in-up"
        /> */}
      </div>
      <style>
        {`
          .animate-spin-slow {
            animation: spin 1.8s linear infinite;
          }
          .animate-spin-reverse {
            animation: spinReverse 2.2s linear infinite;
          }
          @keyframes spin {
            100% { transform: rotate(360deg);}
          }
          @keyframes spinReverse {
            100% { transform: rotate(-360deg);}
          }
          .animate-fade-in-up {
            animation: fadeInUp 1.2s cubic-bezier(.4,0,.2,1) both;
          }
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px);}
            100% { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </div>
  );
};

export default FashionLoader;