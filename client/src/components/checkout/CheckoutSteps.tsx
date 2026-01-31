import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface CheckoutStepsProps {
    steps: string[];
    currentStep: number;
}

export function CheckoutSteps({ steps, currentStep }: CheckoutStepsProps) {
    return (
        <div className="flex items-center justify-center">
            {steps.map((step, index) => (
                <div key={step} className="flex items-center">
                    {/* Step Circle */}
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{
                            scale: index === currentStep ? 1.1 : 1,
                            transition: { duration: 0.2 }
                        }}
                        className={`relative flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm transition-colors ${index < currentStep
                                ? "bg-green-500 text-white"
                                : index === currentStep
                                    ? "bg-primary text-white"
                                    : "bg-white/10 text-muted-foreground"
                            }`}
                    >
                        {index < currentStep ? (
                            <Check className="w-5 h-5" />
                        ) : (
                            index + 1
                        )}
                    </motion.div>

                    {/* Step Label */}
                    <span
                        className={`ml-3 font-medium hidden sm:block ${index <= currentStep ? "text-white" : "text-muted-foreground"
                            }`}
                    >
                        {step}
                    </span>

                    {/* Connector Line */}
                    {index < steps.length - 1 && (
                        <div className="w-12 sm:w-24 h-0.5 mx-4">
                            <motion.div
                                className="h-full bg-primary"
                                initial={{ width: "0%" }}
                                animate={{
                                    width: index < currentStep ? "100%" : "0%",
                                    transition: { duration: 0.3 }
                                }}
                                style={{
                                    background: index < currentStep
                                        ? "linear-gradient(90deg, #22c55e, #22c55e)"
                                        : "rgba(255,255,255,0.1)"
                                }}
                            />
                            <div className="h-full bg-white/10 -mt-0.5" />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
