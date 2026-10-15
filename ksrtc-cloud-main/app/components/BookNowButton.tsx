"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useSpring, useMotionValue } from "framer-motion";

type Props = {
  href?: string;
  className?: string; // Additional classes
};

export default function BookNowButton({ href = "/book", className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    // Ensure ref.current exists
    if (!ref.current) return;

    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Magnetic pull calculation
    x.set((clientX - centerX) * 0.2);
    y.set((clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      // Ensuring explicit positioning (using 57% to handle the user's intent of 4/7 if custom class fails)
      className={`fixed bottom-8 left-[57%] -translate-x-1/2 z-50 ${className}`}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: springX, y: springY }}
      >
        <Link href={href} className="group relative flex items-center gap-2.5 p-1 bg-white/20 backdrop-blur-2xl border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.12),0_0_20px_rgba(255,255,255,0.15)] rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_8px_40px_rgba(0,0,0,0.15),0_0_30px_rgba(255,255,255,0.2)]">

          {/* Left Pill: Text - REDUCED HEIGHT & WIDTH */}
          <div className="bg-white text-[#1a1a1a] px-8 py-2 rounded-full shadow-sm flex items-center justify-center min-w-[120px]">
            <span className="font-bold lowercase tracking-wide text-s">book the trip</span>
          </div>

          {/* Right Circle: Icon - SMALLER */}
          <div className="bg-white text-[#1a1a1a] w-9 h-9 rounded-full shadow-sm flex items-center justify-center">
            {/* Minimalist Bus Front Icon */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="4" y="3" width="16" height="16" rx="2" />
              <path d="M4 10h16" />
              <path d="M8 15h8" />
              <path d="M6 19v2" />
              <path d="M18 19v2" />
            </svg>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
