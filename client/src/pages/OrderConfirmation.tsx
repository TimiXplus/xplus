import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { CheckCircle2, Package, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import Confetti from "@/components/Confetti";

export default function OrderConfirmation() {
    const orderNumber = `XP${Date.now().toString().slice(-8)}`;

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
            <Navbar />
            <Confetti />

            <main className="flex-grow flex items-center justify-center py-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-lg mx-auto px-4 text-center"
                >
                    {/* Success Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8"
                    >
                        <CheckCircle2 className="w-12 h-12 text-green-500" />
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="font-display text-4xl md:text-5xl font-bold text-white mb-4"
                    >
                        Order Confirmed!
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-muted-foreground text-lg mb-8"
                    >
                        Thank you for your purchase. Your order has been placed successfully.
                    </motion.p>

                    {/* Order Number */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-card rounded-2xl border border-white/5 p-6 mb-8"
                    >
                        <div className="flex items-center justify-center gap-3 mb-2">
                            <Package className="w-5 h-5 text-primary" />
                            <span className="text-muted-foreground">Order Number</span>
                        </div>
                        <p className="font-mono text-2xl font-bold text-white">{orderNumber}</p>
                    </motion.div>

                    {/* Info */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-muted-foreground text-sm mb-8"
                    >
                        A confirmation email has been sent to your email address.
                        You can track your order status in your account.
                    </motion.p>

                    {/* Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link
                            href="/products"
                            className="px-8 py-4 rounded-full bg-primary text-white font-bold flex items-center justify-center gap-2 hover:bg-primary/80 transition-colors"
                        >
                            Continue Shopping <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="/"
                            className="px-8 py-4 rounded-full border border-white/20 text-white font-bold flex items-center justify-center hover:bg-white/5 transition-colors"
                        >
                            Back to Home
                        </Link>
                    </motion.div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
