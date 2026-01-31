import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { useCurrency, type CurrencyCode } from "@/contexts/CurrencyContext";

const CURRENCIES: { code: CurrencyCode; label: string; flag: string }[] = [
    { code: "NGN", label: "Naira", flag: "🇳🇬" },
    { code: "USD", label: "USD", flag: "🇺🇸" },
    { code: "EUR", label: "Euro", flag: "🇪🇺" },
    { code: "GBP", label: "Pound", flag: "🇬🇧" },
];

export function CurrencySelector() {
    const { currentCurrency, setCurrency } = useCurrency();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium text-white"
            >
                <span className="text-base">{CURRENCIES.find(c => c.code === currentCurrency.code)?.flag}</span>
                <span>{currentCurrency.code}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-32 bg-[#1A1A1A] border border-white/10 rounded-xl overflow-hidden shadow-xl z-50"
                    >
                        {CURRENCIES.map((currency) => (
                            <button
                                key={currency.code}
                                onClick={() => {
                                    setCurrency(currency.code);
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-white/5 transition-colors ${currentCurrency.code === currency.code ? "text-primary bg-primary/10" : "text-gray-300"
                                    }`}
                            >
                                <span className="text-base">{currency.flag}</span>
                                <span>{currency.code}</span>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
