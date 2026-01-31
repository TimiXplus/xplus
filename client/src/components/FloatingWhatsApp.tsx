import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

export function FloatingWhatsApp() {
    return (
        <motion.a
            href="https://wa.me/2348144657589"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 pl-3 pr-4 py-2 rounded-full bg-[#0F0F0F]/90 border border-[#25D366]/20 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all group overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#25D366]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10 p-1.5 bg-[#25D366]/10 rounded-full border border-[#25D366]/20 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all duration-300">
                <FaWhatsapp className="w-4 h-4" />
            </div>

            <div className="relative z-10 flex flex-col">
                <span className="text-[10px] font-bold text-white tracking-tight leading-none">WhatsApp</span>
            </div>

            <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-25deg] group-hover:left-[150%] transition-all duration-700 pointer-events-none" />
        </motion.a>
    );
}
