import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { drawerVariants, overlayVariants, staggerContainerVariants, staggerItemVariants } from "@/lib/animation-variants";

export function CartDrawer() {
    const { isCartOpen, closeCart, items, removeItem, updateQuantity, subtotal, itemCount } = useCart();
    const { formatPrice } = useCurrency();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        onClick={closeCart}
                    />

                    {/* Drawer */}
                    <motion.div
                        variants={drawerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background border-l border-white/10 z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="w-5 h-5 text-primary" />
                                <h2 className="font-display text-xl font-bold text-white">
                                    Your Cart ({itemCount})
                                </h2>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={closeCart}
                                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                            >
                                <X className="w-5 h-5 text-muted-foreground" />
                            </motion.button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
                                    <p className="text-muted-foreground mb-4">Your cart is empty</p>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={closeCart}
                                        className="px-6 py-3 bg-primary text-white rounded-full font-semibold"
                                    >
                                        Start Shopping
                                    </motion.button>
                                </div>
                            ) : (
                                <motion.div
                                    variants={staggerContainerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="space-y-4"
                                >
                                    {items.map((item) => (
                                        <motion.div
                                            key={item.product.id}
                                            variants={staggerItemVariants}
                                            layout
                                            className="flex gap-4 p-4 bg-card rounded-2xl border border-white/5"
                                        >
                                            {/* Image */}
                                            <div className="w-20 h-20 bg-[#1A1A1A] rounded-xl overflow-hidden flex-shrink-0">
                                                <img
                                                    src={item.product.imageUrl}
                                                    alt={item.product.name}
                                                    className="w-full h-full object-contain mix-blend-screen"
                                                />
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-white truncate">
                                                    {item.product.name}
                                                </h3>
                                                <p className="text-primary font-bold mt-1">
                                                    {formatPrice(Number(item.product.price))}
                                                </p>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center gap-2 mt-3">
                                                    <motion.button
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                        className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </motion.button>
                                                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                                                    <motion.button
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                        className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </motion.button>
                                                </div>
                                            </div>

                                            {/* Remove */}
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => removeItem(item.product.id)}
                                                className="p-1.5 text-muted-foreground hover:text-red-500 transition-colors self-start"
                                            >
                                                <X className="w-4 h-4" />
                                            </motion.button>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-white/10 space-y-4">
                                <div className="flex justify-between text-lg">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span className="font-bold text-white">{formatPrice(subtotal)}</span>
                                </div>

                                <div className="flex gap-3">
                                    <Link
                                        href="/cart"
                                        onClick={closeCart}
                                        className="flex-1 py-3 px-6 rounded-full border border-white/20 text-white font-semibold text-center hover:bg-white/5 transition-colors"
                                    >
                                        View Cart
                                    </Link>
                                    <Link
                                        href="/checkout"
                                        onClick={closeCart}
                                        className="flex-1 py-3 px-6 rounded-full bg-primary text-white font-semibold text-center flex items-center justify-center gap-2 hover:bg-primary/80 transition-colors"
                                    >
                                        Checkout <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
