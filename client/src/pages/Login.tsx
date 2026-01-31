import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { slideUpVariants } from "@/lib/animation-variants";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "wouter";
import { Loader2, Mail, Lock, LogIn } from "lucide-react";

interface LoginFormData {
    email: string;
    password: string;
}

export default function Login() {
    const [, setLocation] = useLocation();
    const { login, isLoading } = useAuth();
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    const onSubmit = async (data: LoginFormData) => {
        setError(null);
        const result = await login(data.email, data.password);

        if (result.success) {
            setLocation("/");
        } else {
            setError(result.error || "Login failed");
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
            <Navbar />

            <main className="flex-grow flex items-center justify-center py-20 px-4">
                <motion.div
                    variants={slideUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full max-w-md"
                >
                    <div className="text-center mb-8">
                        <h1 className="font-display text-4xl font-bold text-white mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-muted-foreground">
                            Sign in to your Xplus account
                        </p>
                    </div>

                    <div className="bg-card rounded-2xl border border-white/5 p-8">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Error Message */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-500 text-sm"
                                >
                                    {error}
                                </motion.div>
                            )}

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <input
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address",
                                            },
                                        })}
                                        type="email"
                                        className={`w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border ${errors.email ? "border-red-500" : "border-white/10"
                                            } text-white placeholder-muted-foreground focus:border-primary focus:outline-none transition-colors`}
                                        placeholder="you@example.com"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <input
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 6,
                                                message: "Password must be at least 6 characters",
                                            },
                                        })}
                                        type="password"
                                        className={`w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border ${errors.password ? "border-red-500" : "border-white/10"
                                            } text-white placeholder-muted-foreground focus:border-primary focus:outline-none transition-colors`}
                                        placeholder="••••••••"
                                    />
                                </div>
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                                )}
                            </div>

                            {/* Submit */}
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 px-6 rounded-full bg-primary text-white font-bold flex items-center justify-center gap-2 hover:bg-primary/80 transition-colors disabled:opacity-80"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" /> Signing In...
                                    </>
                                ) : (
                                    <>
                                        <LogIn className="w-5 h-5" /> Sign In
                                    </>
                                )}
                            </motion.button>
                        </form>



                        {/* Register Link */}
                        <p className="mt-6 text-center text-muted-foreground">
                            Don't have an account?{" "}
                            <Link href="/register" className="text-primary hover:underline">
                                Create one
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
