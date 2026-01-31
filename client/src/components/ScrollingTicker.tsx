import { motion } from "framer-motion";

const AdvancedThunder = () => (
    <div className="relative w-6 h-6 flex items-center justify-center">
        <div className="absolute inset-0 bg-yellow-400 blur-lg opacity-20 animate-pulse" />
        <svg viewBox="0 0 24 24" className="w-4 h-4 relative z-10 filter drop-shadow-[0_0_3px_rgba(250,204,21,1)]">
            <path
                fill="#fbbf24"
                d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                className="animate-pulse"
            />
        </svg>
    </div>
);

export function ScrollingTicker() {
    const items = Array(20).fill("Black Friday Deals!");

    return (
        <div className="bg-black/95 border-y border-white/5 py-2 overflow-hidden relative group">
            <motion.div
                animate={{ x: [0, -4000] }}
                transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="flex whitespace-nowrap gap-12 items-center justify-start min-w-[200vw]"
            >
                {items.map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                        <AdvancedThunder />
                        <span className="text-xl md:text-2xl font-black text-white/80 tracking-tighter uppercase italic group-hover:text-white transition-all duration-500">
                            {item}
                        </span>
                    </div>
                ))}
                {/* Duplicate for seamless infinite loop */}
                {items.map((item, i) => (
                    <div key={`dup-${i}`} className="flex items-center gap-4">
                        <AdvancedThunder />
                        <span className="text-xl md:text-2xl font-black text-white/80 tracking-tighter uppercase italic group-hover:text-white transition-all duration-500">
                            {item}
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
