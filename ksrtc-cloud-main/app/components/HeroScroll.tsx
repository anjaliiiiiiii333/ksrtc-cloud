// ... imports
import { useScroll, useTransform, motion, cubicBezier } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useImagePreloader } from "@/hooks/use-image-preloader";
import { cn } from "@/frontend-design/lib/utils";
import { useMotionValueEvent } from "framer-motion";

export default function HeroScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

    // Sequence 1 has 125 frames
    const frameCount = 125;
    const { images, loaded } = useImagePreloader(
        "/sequence-1",
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

    // Text Animations
    // ezgif-frame-070.jpg corresponds to index 69 (0-based indexing)
    const targetFrame = 124; // Extended to end of sequence to decrease speed
    const textAnimationEnd = targetFrame / (frameCount - 1);

    const textScale = useTransform(scrollYProgress, [0, textAnimationEnd], [1, 3.5]);
    const textX = useTransform(scrollYProgress, [0, textAnimationEnd], [0, 1200]); // Move right
    const textY = useTransform(scrollYProgress, [0, textAnimationEnd], [0, -400]); // Move up
    // Fade out existing text: Start fading at frame 65 (0.52), fully invisible by frame 75 (0.6)
    const fadeOutStart = 65 / (frameCount - 1);
    const fadeOutEnd = 75 / (frameCount - 1);
    const textOpacity = useTransform(scrollYProgress, [fadeOutStart, fadeOutEnd], [1, 0]);

    // Text animation for KSRTC description
    // Start appearing from bottom at frame 50, reach final position at frame 80
    const textEntryStart = 50 / (frameCount - 1);
    const textEntryEnd = 80 / (frameCount - 1);

    const textBottom = useTransform(
        scrollYProgress,
        [0, textEntryStart, textEntryEnd, 1],
        ["-25%", "-25%", "10%", "10%"]
    );

    const descriptionText = "Kerala State Road Transport Corporation (KSRTC) connects Kerala with thousands of daily services across cities and rural regions. Trusted by millions, we deliver safe, reliable, and affordable journeys—on time, every time.";
    const [displayText, setDisplayText] = useState("");

    // Typing animation starts AFTER text reaches position (frame 80) and finishes at frame 110
    const typingEnd = 110 / (frameCount - 1);
    const characterCount = useTransform(scrollYProgress, [textEntryEnd, typingEnd], [0, descriptionText.length]);

    useMotionValueEvent(characterCount, "change", (latest) => {
        setDisplayText(descriptionText.slice(0, Math.round(latest)));
    });



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
                {/* Overlay Content */}
                <div className="absolute inset-0 z-10 pointer-events-none">



                    {/* Bottom Right Quadrant - Center */}
                    <motion.div
                        style={{
                            scale: textScale,
                            x: textX,
                            y: textY,
                            opacity: textOpacity, // Fade out existing text
                        }}
                        className="absolute bottom-[15%] right-[10%] text-white text-right flex flex-col items-end"
                    >
                        <h2 className="text-4xl md:text-6xl font-light leading-none tracking-tight mb-4">
                            We are <br /> <span className="font-bold">Destination</span>
                        </h2>

                        {/* Line Container */}
                        <div className="w-full min-w-[280px] flex flex-col items-end mb-4">
                            <div className="h-0.5 bg-white/70 w-full mb-1"></div>

                            <div className="flex w-full justify-between items-start">
                                {/* Left Side: Scroll Down + Arrows */}
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">Scroll Down</span>
                                    <div className="flex flex-col -space-y-2 text-white/80">
                                        <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
                                        <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
                                        <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
                                    </div>
                                </div>

                                {/* Right Side: To Start Journey */}
                                <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/90 leading-none mt-1">
                                    To Start Journey
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Static Text - Left Aligned, Full Width, Bottom Positioned */}
                    <motion.div
                        style={{ bottom: textBottom }}
                        className="absolute left-0 w-full px-8 z-20 pointer-events-none"
                    >
                        <div className="flex flex-col items-start space-y-4 text-left w-full">
                            {/* Typewriter Effect Container */}
                            <div className="relative text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide max-w-[95%] leading-tight min-h-[120px]">
                                {/* Ghost Text (Shadow) */}
                                <p className="absolute top-0 left-0 text-white/20 select-none">
                                    {descriptionText}
                                </p>

                                {/* Typed Text (Fill) */}
                                <p className="relative z-10 text-white/90">
                                    {displayText}
                                    <span className="inline-block w-1 h-[1em] bg-white/90 ml-1 align-middle animate-pulse" />
                                </p>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
