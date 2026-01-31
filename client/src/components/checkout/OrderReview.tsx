import { motion } from "framer-motion";
import { ArrowLeft, Loader2, MapPin, CreditCard } from "lucide-react";
import type { ShippingData } from "@/pages/Checkout";

interface OrderReviewProps {
    shippingData: ShippingData;
    onBack: () => void;
    onPlaceOrder: () => void;
    isProcessing: boolean;
}

export function OrderReview({
    shippingData,
    onBack,
    onPlaceOrder,
    isProcessing,
}: OrderReviewProps) {
    return (
        <div className="space-y-6">
            {/* Shipping Summary */}
            <div className="bg-card rounded-2xl border border-white/5 p-6">
                <div className="flex items-center gap-3 mb-4">
                    <MapPin className="w-5 h-5 text-primary" />
                    <h3 className="font-display text-lg font-bold text-white">
                        Shipping Address
                    </h3>
                </div>
                <div className="text-muted-foreground">
                    <p className="text-white font-medium">
                        {shippingData.firstName} {shippingData.lastName}
                    </p>
                    <p>{shippingData.address}</p>
                    <p>
                        {shippingData.city}, {shippingData.state} {shippingData.zipCode}
                    </p>
                    <p>{shippingData.country}</p>
                    <p className="mt-2">{shippingData.email}</p>
                    <p>{shippingData.phone}</p>
                </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-card rounded-2xl border border-white/5 p-6">
                <div className="flex items-center gap-3 mb-4">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <h3 className="font-display text-lg font-bold text-white">
                        Payment Method
                    </h3>
                </div>
                <div className="text-muted-foreground">
                    <p className="text-white font-medium">Flutterwave</p>
                    <p className="text-sm">Secure Payment (Cards, USSD, Bank Transfer)</p>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
                <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="button"
                    onClick={onBack}
                    disabled={isProcessing}
                    className="flex-1 py-4 px-6 rounded-full border border-white/20 text-white font-bold flex items-center justify-center gap-2 hover:bg-white/5 transition-colors disabled:opacity-50"
                >
                    <ArrowLeft className="w-5 h-5" /> Back
                </motion.button>
                <motion.button
                    whileHover={{ scale: isProcessing ? 1 : 1.01 }}
                    whileTap={{ scale: isProcessing ? 1 : 0.99 }}
                    type="button"
                    onClick={onPlaceOrder}
                    disabled={isProcessing}
                    className="flex-1 py-4 px-6 rounded-full bg-green-500 text-white font-bold flex items-center justify-center gap-2 hover:bg-green-600 transition-colors disabled:opacity-80 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                >
                    {isProcessing ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                        </>
                    ) : (
                        "Pay Now"
                    )}
                </motion.button>
            </div>
        </div>
    );
}
