import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, CreditCard } from "lucide-react";

interface PaymentFormProps {
    onSubmit: () => void;
    onBack: () => void;
}

export function PaymentForm({ onSubmit, onBack }: PaymentFormProps) {
    return (
        <div className="bg-card rounded-2xl border border-white/5 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
                <CreditCard className="w-6 h-6 text-primary" />
                <h2 className="font-display text-2xl font-bold text-white">
                    Payment Method
                </h2>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 text-center">
                <img
                    src="https://flutterwave.com/images/logo-colored.svg"
                    alt="Flutterwave"
                    className="h-8 mx-auto mb-4"
                />
                <p className="text-white font-medium mb-2">Pay securely with Flutterwave</p>
                <p className="text-sm text-muted-foreground">
                    You will be redirected to complete your payment securely.
                    Supports Cards, Bank Transfers, USSD, and more.
                </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
                <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="button"
                    onClick={onBack}
                    className="flex-1 py-4 px-6 rounded-full border border-white/20 text-white font-bold flex items-center justify-center gap-2 hover:bg-white/5 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" /> Back
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="button"
                    onClick={onSubmit}
                    className="flex-1 py-4 px-6 rounded-full bg-primary text-white font-bold flex items-center justify-center gap-2 hover:bg-primary/80 transition-colors"
                >
                    Review Order <ArrowRight className="w-5 h-5" />
                </motion.button>
            </div>
        </div>
    );
}
