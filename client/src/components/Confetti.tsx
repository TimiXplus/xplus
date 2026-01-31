import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfettiPiece {
    id: number;
    x: number;
    delay: number;
    duration: number;
    color: string;
    size: number;
}

const COLORS = ["#0000EE", "#22c55e", "#eab308", "#ec4899", "#8b5cf6", "#06b6d4"];

export default function Confetti() {
    const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        const newPieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            delay: Math.random() * 0.5,
            duration: 2 + Math.random() * 2,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            size: 8 + Math.random() * 8,
        }));
        setPieces(newPieces);

        const timer = setTimeout(() => setIsActive(false), 4000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isActive && (
                <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                    {pieces.map((piece) => (
                        <motion.div
                            key={piece.id}
                            initial={{ y: -20, x: `${piece.x}vw`, opacity: 1, rotate: 0 }}
                            animate={{
                                y: "110vh",
                                rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
                                opacity: [1, 1, 0],
                            }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: piece.duration,
                                delay: piece.delay,
                                ease: "linear",
                            }}
                            style={{
                                position: "absolute",
                                width: piece.size,
                                height: piece.size,
                                backgroundColor: piece.color,
                                borderRadius: Math.random() > 0.5 ? "50%" : "2px",
                            }}
                        />
                    ))}
                </div>
            )}
        </AnimatePresence>
    );
}
