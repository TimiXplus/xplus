import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { slideUpVariants, staggerContainerVariants, staggerItemVariants } from "@/lib/animation-variants";
import { Link, useLocation } from "wouter";
import { User, Package, LogOut, Clock, ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useEffect } from "react";

// Mock order history
const MOCK_ORDERS = [
    {
        id: "XP12345678",
        date: "Jan 25, 2026",
        status: "Delivered",
        total: 156.99,
        items: 3,
    },
    {
        id: "XP12345621",
        date: "Jan 18, 2026",
        status: "Shipped",
        total: 89.99,
        items: 1,
    },
    {
        id: "XP12345589",
        date: "Jan 10, 2026",
        status: "Delivered",
        total: 245.50,
        items: 4,
    },
];

export default function Profile() {
    const [, setLocation] = useLocation();
    const { user, isAuthenticated, logout } = useAuth();
    const { formatPrice } = useCurrency();

    useEffect(() => {
        if (!isAuthenticated) {
            setLocation("/login");
        }
    }, [isAuthenticated, setLocation]);

    const handleLogout = () => {
        logout();
        setLocation("/");
    };

    if (!isAuthenticated || !user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
            <Navbar />

            <main className="flex-grow">
                <motion.div
                    variants={slideUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
                >
                    <Breadcrumbs items={[{ label: "My Account" }]} />
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
                        <div>
                            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-2">
                                My Account
                            </h1>
                            <p className="text-muted-foreground">
                                Welcome back, {user.name}!
                            </p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-colors"
                        >
                            <LogOut className="w-4 h-4" /> Sign Out
                        </motion.button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Profile Info */}
                        <div className="lg:col-span-1">
                            <div className="bg-card rounded-2xl border border-white/5 p-6">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                                        <User className="w-8 h-8 text-primary" />
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-white text-lg">{user.name}</h2>
                                        <p className="text-muted-foreground text-sm">{user.email}</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Link
                                        href="/products"
                                        className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group"
                                    >
                                        <span className="text-muted-foreground group-hover:text-white transition-colors">
                                            Browse Products
                                        </span>
                                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                    </Link>
                                    <Link
                                        href="/cart"
                                        className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group"
                                    >
                                        <span className="text-muted-foreground group-hover:text-white transition-colors">
                                            My Cart
                                        </span>
                                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Order History */}
                        <div className="lg:col-span-2">
                            <div className="bg-card rounded-2xl border border-white/5 p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <Package className="w-5 h-5 text-primary" />
                                    <h2 className="font-display text-xl font-bold text-white">
                                        Order History
                                    </h2>
                                </div>

                                <motion.div
                                    variants={staggerContainerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="space-y-4"
                                >
                                    {MOCK_ORDERS.map((order) => (
                                        <motion.div
                                            key={order.id}
                                            variants={staggerItemVariants}
                                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                                        >
                                            <div>
                                                <p className="font-mono text-white font-medium">
                                                    #{order.id}
                                                </p>
                                                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                                    <Clock className="w-3 h-3" />
                                                    {order.date}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <div className="text-right">
                                                    <p className="text-white font-medium">
                                                        {formatPrice(order.total)}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {order.items} item{order.items > 1 ? "s" : ""}
                                                    </p>
                                                </div>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === "Delivered"
                                                        ? "bg-green-500/20 text-green-500"
                                                        : "bg-yellow-500/20 text-yellow-500"
                                                        }`}
                                                >
                                                    {order.status}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>

                                <p className="mt-6 text-center text-sm text-muted-foreground">
                                    Showing recent orders (demo data)
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
