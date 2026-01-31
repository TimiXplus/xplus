import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { useProducts } from "@/hooks/use-products";
import { useCurrency } from "@/contexts/CurrencyContext";
import { overlayVariants, modalVariants, staggerContainerVariants, staggerItemVariants } from "@/lib/animation-variants";

// This component manages its own state since we need it to be simpler
export function SearchModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const { data: products, isLoading } = useProducts({ search: query });

    const filteredProducts = query.length >= 2 ? products : [];

    // Listen for keyboard shortcut (Cmd/Ctrl + K)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen(true);
            }
            if (e.key === "Escape") {
                setIsOpen(false);
                setQuery("");
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const close = () => {
        setIsOpen(false);
        setQuery("");
    };

    const { formatPrice } = useCurrency();

    // Expose open function globally for Navbar
    useEffect(() => {
        (window as any).openSearchModal = () => setIsOpen(true);
        return () => {
            delete (window as any).openSearchModal;
        };
    }, []);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                        onClick={close}
                    />

                    {/* Modal */}
                    <motion.div
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed top-[10%] left-1/2 -translate-x-1/2 w-full max-w-2xl bg-background border border-white/10 rounded-2xl z-50 overflow-hidden shadow-2xl"
                    >
                        {/* Search Input */}
                        <div className="flex items-center gap-4 p-4 border-b border-white/10">
                            <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search products..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="flex-1 bg-transparent text-white text-lg placeholder-muted-foreground focus:outline-none"
                            />
                            {isLoading && <Loader2 className="w-5 h-5 text-primary animate-spin" />}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={close}
                                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                            >
                                <X className="w-5 h-5 text-muted-foreground" />
                            </motion.button>
                        </div>

                        {/* Results */}
                        <div className="max-h-[60vh] overflow-y-auto p-4">
                            {query.length < 2 ? (
                                <div className="text-center py-8 text-muted-foreground">
                                    <p>Type at least 2 characters to search</p>
                                    <p className="text-sm mt-2 opacity-60">
                                        Pro tip: Press <kbd className="px-2 py-1 bg-white/10 rounded text-xs">Esc</kbd> to close
                                    </p>
                                </div>
                            ) : filteredProducts && filteredProducts.length > 0 ? (
                                <motion.div
                                    variants={staggerContainerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="space-y-2"
                                >
                                    {filteredProducts.map((product) => (
                                        <motion.div key={product.id} variants={staggerItemVariants}>
                                            <Link
                                                href={`/product/${product.id}`}
                                                onClick={close}
                                                className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                                            >
                                                <div className="w-14 h-14 bg-[#1A1A1A] rounded-lg overflow-hidden flex-shrink-0">
                                                    <img
                                                        src={product.imageUrl}
                                                        alt={product.name}
                                                        className="w-full h-full object-contain mix-blend-screen"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold text-white group-hover:text-primary transition-colors truncate">
                                                        {product.name}
                                                    </h4>
                                                    <p className="text-sm text-muted-foreground">{product.category}</p>
                                                </div>
                                                <span className="text-primary font-bold">
                                                    {formatPrice(product.price)}
                                                </span>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    <p>No products found for "{query}"</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
