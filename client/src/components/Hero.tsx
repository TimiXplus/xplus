import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { ScrollingTicker } from "./ScrollingTicker";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1600&q=80",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80",
  "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=1600&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80",
];

export function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[700px] flex flex-col bg-background overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentImage}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={HERO_IMAGES[currentImage]}
              alt="Tech"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Layer */}
      <div className="flex-grow flex items-center relative z-10 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.a
                href="https://veriable.xyz"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-emerald-400 mb-8 backdrop-blur-md cursor-pointer hover:bg-white/10 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Created by veri—able Studio 🎯
              </motion.a>

              <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[0.95] mb-8">
                All tech products. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
                  One place.
                </span>
              </h1>

              <p className="text-lg md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-2xl font-light">
                Shop all gadgets related to making your work life easy. <br className="hidden sm:block" />
                We guarantee <span className="text-white font-bold underline decoration-primary decoration-2 underline-offset-4">70% cash back</span> if you find a better price elsewhere.
              </p>

              <div className="flex flex-wrap items-center gap-6 md:gap-10 text-xs md:text-base text-gray-400 font-bold tracking-widest uppercase">
                <div className="flex items-center gap-2 md:gap-3">
                  <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-emerald-500" /> Free Shipping
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-emerald-500" /> 30-Day Returns
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-emerald-500" /> Secure Payment
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Ticker Layer - Forced Utmost Edge-to-Edge */}
      <div className="relative z-20 w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <ScrollingTicker />
      </div>
    </section>
  );
}
