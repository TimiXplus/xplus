import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { motion } from "framer-motion";
import { slideUpVariants, staggerContainerVariants, staggerItemVariants } from "@/lib/animation-variants";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function Cart() {
    const { items, removeItem, updateQuantity, subtotal, shipping, total, clearCart } = useCart();
    const { formatPrice } = useCurrency();

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
            <Navbar />

            <main className="flex-grow">
                <motion.div
                    variants={slideUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
                >
                    <Breadcrumbs items={[{ label: "Shopping Cart" }]} />
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-8">
                        Shopping Cart
                    </h1>

                    {items.length === 0 ? (
                        <div className="text-center py-20">
                            <ShoppingBag className="w-20 h-20 text-muted-foreground/30 mx-auto mb-6" />
                            <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
                            <p className="text-muted-foreground mb-8">
                                Looks like you haven't added any items to your cart yet.
                            </p>
                            <Link
                                href="/products"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-primary/80 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" /> Continue Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Cart Items */}
                            <div className="lg:col-span-2">
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
                                            className="flex gap-6 p-6 bg-card rounded-2xl border border-white/5"
                                        >
                                            {/* Image */}
                                            <Link
                                                href={`/product/${item.product.id}`}
                                                className="w-28 h-28 bg-[#1A1A1A] rounded-xl overflow-hidden flex-shrink-0"
                                            >
                                                <img
                                                    src={item.product.imageUrl}
                                                    alt={item.product.name}
                                                    className="w-full h-full object-contain mix-blend-screen hover:scale-110 transition-transform"
                                                />
                                            </Link>

                                            {/* Details */}
                                            <div className="flex-1 min-w-0">
                                                <Link href={`/product/${item.product.id}`}>
                                                    <h3 className="font-semibold text-lg text-white hover:text-primary transition-colors">
                                                        {item.product.name}
                                                    </h3>
                                                </Link>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    {item.product.category}
                                                </p>
                                                <p className="text-primary font-bold text-xl mt-2">
                                                    {formatPrice(Number(item.product.price))}
                                                </p>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center gap-4 mt-4">
                                                    <div className="flex items-center gap-2 bg-white/5 rounded-full p-1">
                                                        <motion.button
                                                            whileTap={{ scale: 0.9 }}
                                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </motion.button>
                                                        <span className="w-10 text-center font-bold">{item.quantity}</span>
                                                        <motion.button
                                                            whileTap={{ scale: 0.9 }}
                                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </motion.button>
                                                    </div>

                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => removeItem(item.product.id)}
                                                        className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </motion.button>
                                                </div>
                                            </div>

                                            {/* Line Total */}
                                            <div className="text-right hidden sm:block">
                                                <p className="text-sm text-muted-foreground">Total</p>
                                                <p className="text-xl font-bold text-white">
                                                    {formatPrice(Number(item.product.price) * item.quantity)}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>

                                {/* Clear Cart */}
                                <div className="mt-6 flex justify-between items-center">
                                    <Link
                                        href="/products"
                                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
                                    >
                                        <ArrowLeft className="w-4 h-4" /> Continue Shopping
                                    </Link>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={clearCart}
                                        className="text-red-500 hover:text-red-400 transition-colors"
                                    >
                                        Clear Cart
                                    </motion.button>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <div className="bg-card rounded-2xl border border-white/5 p-6 sticky top-24">
                                    <h2 className="font-display text-xl font-bold text-white mb-6">
                                        Order Summary
                                    </h2>

                                    <div className="space-y-4 mb-6">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Subtotal</span>
                                            <span className="text-white font-medium">{formatPrice(subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Shipping</span>
                                            <span className="text-white font-medium">
                                                {shipping === 0 ? (
                                                    <span className="text-green-500">Free</span>
                                                ) : (
                                                    formatPrice(shipping)
                                                )}
                                            </span>
                                        </div>
                                        {shipping > 0 && (
                                            <p className="text-xs text-muted-foreground">
                                                Add {formatPrice(50 - subtotal)} more for free shipping
                                            </p>
                                        )}
                                        <div className="border-t border-white/10 pt-4">
                                            <div className="flex justify-between text-lg">
                                                <span className="font-bold text-white">Total</span>
                                                <span className="font-bold text-primary">{formatPrice(total)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <Link
                                        href="/checkout"
                                        className="w-full py-4 px-6 rounded-full bg-primary text-white font-bold flex items-center justify-center gap-2 hover:bg-primary/80 transition-colors shadow-[0_0_20px_rgba(0,0,238,0.2)]"
                                    >
                                        Proceed to Checkout <ArrowRight className="w-5 h-5" />
                                    </Link>

                                    <div className="mt-6 text-center text-sm text-muted-foreground">
                                        <p>🔒 Secure checkout</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
