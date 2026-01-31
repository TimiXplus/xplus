import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ShippingData } from "@/pages/Checkout";

interface ShippingFormProps {
    initialData: ShippingData | null;
    userEmail?: string;
    onSubmit: (data: ShippingData) => void;
}

export function ShippingForm({ initialData, userEmail, onSubmit }: ShippingFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ShippingData>({
        defaultValues: initialData || {
            firstName: "",
            lastName: "",
            email: userEmail || "",
            phone: "",
            address: "",
            city: "",
            state: "",
            zipCode: "",
            country: "Nigeria",
        },
    });

    return (
        <div className="bg-card rounded-2xl border border-white/5 p-6 md:p-8">
            <h2 className="font-display text-2xl font-bold text-white mb-6">
                Shipping Information
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                            First Name *
                        </label>
                        <input
                            {...register("firstName", { required: "First name is required" })}
                            className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${errors.firstName ? "border-red-500" : "border-white/10"
                                } text-white placeholder-muted-foreground focus:border-primary focus:outline-none transition-colors`}
                            placeholder="John"
                        />
                        {errors.firstName && (
                            <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                            Last Name *
                        </label>
                        <input
                            {...register("lastName", { required: "Last name is required" })}
                            className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${errors.lastName ? "border-red-500" : "border-white/10"
                                } text-white placeholder-muted-foreground focus:border-primary focus:outline-none transition-colors`}
                            placeholder="Doe"
                        />
                        {errors.lastName && (
                            <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>
                        )}
                    </div>
                </div>

                {/* Contact Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                            Email *
                        </label>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address",
                                },
                            })}
                            type="email"
                            className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${errors.email ? "border-red-500" : "border-white/10"
                                } text-white placeholder-muted-foreground focus:border-primary focus:outline-none transition-colors`}
                            placeholder="john@example.com"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                            Phone *
                        </label>
                        <input
                            {...register("phone", { required: "Phone is required" })}
                            type="tel"
                            className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${errors.phone ? "border-red-500" : "border-white/10"
                                } text-white placeholder-muted-foreground focus:border-primary focus:outline-none transition-colors`}
                            placeholder="+1 (555) 123-4567"
                        />
                        {errors.phone && (
                            <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                        )}
                    </div>
                </div>

                {/* Address */}
                <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Street Address *
                    </label>
                    <input
                        {...register("address", { required: "Address is required" })}
                        className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${errors.address ? "border-red-500" : "border-white/10"
                            } text-white placeholder-muted-foreground focus:border-primary focus:outline-none transition-colors`}
                        placeholder="123 Main Street, Apt 4B"
                    />
                    {errors.address && (
                        <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>
                    )}
                </div>

                {/* City, State, Zip Row */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                            City *
                        </label>
                        <input
                            {...register("city", { required: "City is required" })}
                            className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${errors.city ? "border-red-500" : "border-white/10"
                                } text-white placeholder-muted-foreground focus:border-primary focus:outline-none transition-colors`}
                            placeholder="New York"
                        />
                        {errors.city && (
                            <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                            State *
                        </label>
                        <input
                            {...register("state", { required: "State is required" })}
                            className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${errors.state ? "border-red-500" : "border-white/10"
                                } text-white placeholder-muted-foreground focus:border-primary focus:outline-none transition-colors`}
                            placeholder="NY"
                        />
                        {errors.state && (
                            <p className="mt-1 text-sm text-red-500">{errors.state.message}</p>
                        )}
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                            Zip Code *
                        </label>
                        <input
                            {...register("zipCode", { required: "Zip code is required" })}
                            className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${errors.zipCode ? "border-red-500" : "border-white/10"
                                } text-white placeholder-muted-foreground focus:border-primary focus:outline-none transition-colors`}
                            placeholder="10001"
                        />
                        {errors.zipCode && (
                            <p className="mt-1 text-sm text-red-500">{errors.zipCode.message}</p>
                        )}
                    </div>
                </div>

                {/* Country */}
                <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Country *
                    </label>
                    <select
                        {...register("country", { required: "Country is required" })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary focus:outline-none transition-colors cursor-pointer"
                    >
                        <option value="Nigeria" className="bg-background">Nigeria</option>
                        <option value="United States" className="bg-background">United States</option>
                        <option value="Canada" className="bg-background">Canada</option>
                        <option value="United Kingdom" className="bg-background">United Kingdom</option>
                        <option value="Australia" className="bg-background">Australia</option>
                        <option value="Germany" className="bg-background">Germany</option>
                        <option value="France" className="bg-background">France</option>
                    </select>
                </div>

                {/* Submit */}
                <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    className="w-full py-4 px-6 rounded-full bg-primary text-white font-bold flex items-center justify-center gap-2 hover:bg-primary/80 transition-colors"
                >
                    Continue to Payment <ArrowRight className="w-5 h-5" />
                </motion.button>
            </form>
        </div>
    );
}
