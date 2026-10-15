"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useImagePreloader } from "@/hooks/use-image-preloader";
import { cn } from "@/frontend-design/lib/utils";

export default function BusMorph() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

    // Sequence 2 has 200 frames
    const frameCount = 200;
    const { images, loaded } = useImagePreloader(
        "/sequence-2",
        "ezgif-frame-",
        frameCount,
        "jpg"
    );

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const currentIndex = useTransform(
        scrollYProgress,
        [0, 1],
        [0, frameCount - 1]
    );

    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            setContext(ctx);
        }
    }, []);

    const renderFrame = (index: number) => {
        if (!context || !loaded || !images[index]) return;

        // Clear canvas
        context.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);

        // Draw image to cover canvas while maintaining aspect ratio
        const img = images[index];
        const canvas = canvasRef.current!;

        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);

        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;

        context.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            centerShift_x,
            centerShift_y,
            img.width * ratio,
            img.height * ratio
        );
    };

    useEffect(() => {
        const unsubscribe = currentIndex.on("change", (latest) => {
            renderFrame(Math.round(latest));
        });

        // Initial render
        if (loaded && images.length > 0) {
            // Resize canvas to window size
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
            }
            renderFrame(0);
        }

        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                renderFrame(Math.round(currentIndex.get()));
            }
        }

        window.addEventListener("resize", handleResize);

        return () => {
            unsubscribe();
            window.removeEventListener("resize", handleResize);
        }
    }, [currentIndex, loaded, context, images]);

    return (
        <div ref={containerRef} className="h-[400vh] relative bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-cover"
                />

                {/* Overlay Content */}
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="text-4xl md:text-8xl font-bold text-white tracking-tighter"
                    >
                        Unmatched Comfort
                    </motion.h2>
                </div>
            </div>
        </div>
    );
}
