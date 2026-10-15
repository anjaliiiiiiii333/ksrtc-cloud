"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/frontend-design/lib/utils";

const words = [
    { text: "Kerala", initial: "K" },
    { text: "State", initial: "S" },
    { text: "Road", initial: "R" },
    { text: "Transport", initial: "T" },
    { text: "Corporation", initial: "C" },
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
    const [stage, setStage] = useState<"typing" | "loading" | "morph" | "exit">("typing");
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Stage 1: Typing (handled by animation delay)
        // Stage 2: Loading Bar
        const typingDuration = 2000; // 2s for typing
        const loadingDuration = 2500; // 2.5s for loading bar

        const startLoading = setTimeout(() => {
            setStage("loading");
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setStage("morph");
                        return 100;
                    }
                    return prev + 2; // Increment
                });
            }, loadingDuration / 50);
        }, typingDuration);

        return () => clearTimeout(startLoading);
    }, []);

    useEffect(() => {
        if (stage === "morph") {
            const morphDuration = 2000;
            setTimeout(() => {
                setStage("exit");
                setTimeout(onComplete, 1000); // Wait for exit animation
            }, morphDuration);
        }
    }, [stage, onComplete]);

    return (
        <motion.div
            className={cn(
                "fixed inset-0 z-50 flex flex-col items-center justify-center bg-white text-black",
                stage === "exit" && "pointer-events-none"
            )}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            animate={stage === "exit" ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 overflow-hidden">
                <AnimatePresence mode="popLayout">
                    {words.map((word, wordIndex) => (
                        <motion.div
                            key={word.text}
                            layout
                            className="flex items-center text-3xl md:text-5xl font-bold tracking-tight"
                        >
                            {word.text.split("").map((char, charIndex) => {
                                const isInitial = charIndex === 0;
                                // If morphing, hide non-initials
                                const shouldHide = stage === "morph" && !isInitial;

                                return (
                                    <AnimatePresence key={`${word.text}-${charIndex}`} mode="popLayout">
                                        {!shouldHide && (
                                            <motion.span
                                                layout="position"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0, width: 0, scale: 0 }}
                                                transition={{
                                                    opacity: { delay: wordIndex * 0.2 + charIndex * 0.05 },
                                                    width: { duration: 0.5, ease: "easeInOut" },
                                                    scale: { duration: 0.5 },
                                                    layout: { duration: 0.8, type: "spring", bounce: 0.2 }
                                                }}
                                                className={cn(
                                                    "inline-block",
                                                    isInitial ? "text-red-600 font-extrabold" : "text-black"
                                                )}
                                            >
                                                {char}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                );
                            })}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Loading Bar */}
            <AnimatePresence>
                {stage !== "morph" && stage !== "exit" && (
                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "200px" }}
                        exit={{ opacity: 0, y: 20 }}
                        className="mt-8 h-1 bg-gray-200 rounded-full overflow-hidden"
                    >
                        <motion.div
                            className="h-full bg-red-600"
                            style={{ width: `${progress}%` }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {stage === "morph" && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-4 text-sm text-neutral-400 font-mono"
                    >
                        EST. 1965
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
