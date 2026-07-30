"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Map() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

    return (
        <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">
            <div className="absolute inset-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover opacity-60"
                >
                    <source src="/Map-loop.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
                <motion.div
                    style={{ y }}
                    className="text-center"
                >
                    <h2 className="text-5xl md:text-8xl font-bold text-white mb-6">Global Reach</h2>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto px-4">
                        Connecting you to destinations across the world with unparalleled luxury and speed.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
