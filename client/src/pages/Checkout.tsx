import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { motion, AnimatePresence } from "framer-motion";
import { slideUpVariants } from "@/lib/animation-variants";
import { CheckoutSteps } from "@/components/checkout/CheckoutSteps";
import { ShippingForm } from "@/components/checkout/ShippingForm";
import { PaymentForm } from "@/components/checkout/PaymentForm";
import { OrderReview } from "@/components/checkout/OrderReview";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

export interface ShippingData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

const STEPS = ["Shipping", "Payment", "Review"];

export default function Checkout() {
    const [, setLocation] = useLocation();
    const { items, total, clearCart } = useCart();
    const { user } = useAuth();
    const { convertPrice, currentCurrency } = useCurrency();
    const [currentStep, setCurrentStep] = useState(0);
    const [shippingData, setShippingData] = useState<ShippingData | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // Calculate total in current currency
    const totalAmount = convertPrice(total);

    const config = {
        public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY || "FLWPUBK_TEST-SANDBOX-X",
        tx_ref: Date.now().toString(),
        amount: totalAmount,
        currency: currentCurrency.code,
        payment_options: "card,mobilemoney,ussd",
        customer: {
            email: shippingData?.email || user?.email || "",
            phone_number: shippingData?.phone || "",
            name: shippingData ? `${shippingData.firstName} ${shippingData.lastName}` : user?.name || "",
        },
        customizations: {
            title: "Xplus Commerce",
            description: "Payment for items in cart",
            logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
        },
    };

    const handleFlutterPayment = useFlutterwave(config);

    const handleShippingSubmit = (data: ShippingData) => {
        setShippingData(data);
        setCurrentStep(1);
    };

    const handlePaymentSubmit = () => {
        setCurrentStep(2);
    };

    const handlePlaceOrder = () => {
        if (!shippingData) return;
        setIsProcessing(true);

        handleFlutterPayment({
            callback: (response) => {
                console.log(response);
                closePaymentModal();
                if (response.status === "successful" || response.status === "completed") {
                    // Success logic
                    clearCart();
                    setLocation("/order-confirmation");
                } else {
                    // Handle failure (optional)
                    setIsProcessing(false);
                }
            },
            onClose: () => {
                setIsProcessing(false);
            },
        });
    };

    const goBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
                <Navbar />
                <main className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <ShoppingBag className="w-20 h-20 text-muted-foreground/30 mx-auto mb-6" />
                        <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
                        <p className="text-muted-foreground mb-8">
                            Add some items to your cart before checking out.
                        </p>
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-primary/80 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" /> Browse Products
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

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
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-8">
                        Checkout
                    </h1>

                    {/* Steps Indicator */}
                    <CheckoutSteps steps={STEPS} currentStep={currentStep} />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
                        {/* Form Section */}
                        <div className="lg:col-span-2">
                            <AnimatePresence mode="wait">
                                {currentStep === 0 && (
                                    <motion.div
                                        key="shipping"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <ShippingForm
                                            initialData={shippingData}
                                            userEmail={user?.email}
                                            onSubmit={handleShippingSubmit}
                                        />
                                    </motion.div>
                                )}

                                {currentStep === 1 && (
                                    <motion.div
                                        key="payment"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <PaymentForm
                                            onSubmit={handlePaymentSubmit}
                                            onBack={goBack}
                                        />
                                    </motion.div>
                                )}

                                {currentStep === 2 && shippingData && (
                                    <motion.div
                                        key="review"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <OrderReview
                                            shippingData={shippingData}
                                            onBack={goBack}
                                            onPlaceOrder={handlePlaceOrder}
                                            isProcessing={isProcessing}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="lg:col-span-1">
                            <OrderSummary />
                        </div>
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
