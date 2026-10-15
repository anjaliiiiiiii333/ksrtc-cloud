"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import HeroScroll from "./components/HeroScroll";
import BusMorph from "./components/BusMorph";
import Map from "./components/Map";

import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import BookNowButton from "./components/BookNowButton";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="w-full bg-black min-h-screen">
      <Navbar />
      <BookNowButton />

      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>


      <HeroScroll />
      <BusMorph />
      <Map />
    </main>
  );
}
