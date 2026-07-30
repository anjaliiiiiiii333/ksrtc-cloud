"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const navItems = [
    "About Us",
    "Directory",
    "RTI Info",
    "Employee Zone",
    "General Info",
    "More",
];

export default function Navbar() {
    const { scrollY } = useScroll();

    // Animation transforms
    const top = useTransform(scrollY, [0, 300], ["calc(50% - 80px)", "2rem"]);
    const y = useTransform(scrollY, [0, 300], ["-400%", "0%"]);
    const fontSize = useTransform(scrollY, [0, 300], ["8rem", "1.5rem"]);
    const fontWeight = useTransform(scrollY, [0, 300], [700, 600]);
    const letterSpacing = useTransform(scrollY, [0, 300], ["-0.05em", "0.05em"]);

    return (
        <>
            <motion.h1
                style={{
                    top,
                    y,
                    x: "-50%",
                    fontSize,
                    fontWeight,
                    letterSpacing
                }}
                className="fixed left-1/2 z-50 text-white leading-none whitespace-nowrap pointer-events-none"
            >
                KSRTC
            </motion.h1 >

            <nav className="fixed top-8 left-0 w-full px-10 z-50 flex justify-between items-center text-white">
                <div className="flex gap-8 items-center">
                    {navItems.map((item, index) => (
                        <NavItem key={index} text={item} />
                    ))}
                </div>

                <div className="flex gap-6 font-bold text-sm tracking-wide">
                    <span>info@ksrtc.in</span>
                    <span>+91 999 999 9999</span>
                </div>
            </nav>
        </>
    );
}

const NavItem = ({ text }: { text: string }) => {
    return (
        <motion.div
            className="relative cursor-pointer overflow-hidden font-bold text-sm tracking-wide"
            initial="initial"
            whileHover="hovered"
        >
            <div className="flex">
                {text.split("").map((char, i) => (
                    <motion.span
                        key={i}
                        variants={{
                            initial: { y: 0 },
                            hovered: {
                                y: [0, -3, 0],
                                transition: {
                                    duration: 0.3,
                                    ease: "easeInOut",
                                    delay: i * 0.03, // Stagger effect
                                },
                            },
                        }}
                        className="inline-block"
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </div>
        </motion.div>
    );
};
