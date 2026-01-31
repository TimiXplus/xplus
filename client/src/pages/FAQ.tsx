import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { slideUpVariants } from "@/lib/animation-variants";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const FAQ_ITEMS = [
    {
        question: "How do I track my order?",
        answer: "After shipping, you’ll receive a tracking number via email/SMS. Use it on our partner’s logistics portal to monitor your delivery.",
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept secure payments via debit/credit cards (Visa, Mastercard), bank transfers, and mobile wallets through Flutterwave.",
    },
    {
        question: "Is it safe to pay on xplus.com.ng?",
        answer: "Absolutely! We use SSL encryption and trusted payment gateways. We never store your full card details.",
    },
    {
        question: "My payment failed. What should I do?",
        answer: "Double-check your card details or balance. If issues persist, contact your bank or reach out to us at contact@xplus.com.ng.",
    },
    {
        question: "Where do you deliver?",
        answer: "We ship nationwide across Nigeria. Some remote areas may require extra delivery time—contact us to confirm availability.",
    },
    {
        question: "How long does delivery take?",
        answer: "Most orders arrive within 3–7 business days after processing. Delays due to logistics partners or customs are rare but possible.",
    },
    {
        question: "Do you charge for shipping?",
        answer: "Shipping fees depend on your location and order size. Fees are calculated at checkout.",
    },
    {
        question: "What’s your return policy?",
        answer: "Unopened, unused items can be returned within 14 days of delivery. See our Returns Policy for details.",
    },
    {
        question: "How long do refunds take?",
        answer: "Refunds are processed within 5–10 business days after we receive the returned item.",
    },
    {
        question: "How do I return a product?",
        answer: "Email contact@xplus.com.ng with your order number and reason for return. We’ll guide you through the process.",
    },
    {
        question: "Are your products genuine?",
        answer: "Yes! We source directly from trusted brands and authorized suppliers. All products come with warranties where applicable.",
    },
    {
        question: "Do you offer warranties?",
        answer: "Most electronics and appliances include a manufacturer’s warranty. Check the product description for details.",
    },
    {
        question: "Can I order in bulk?",
        answer: "Yes! Contact contact@xplus.com.ng for bulk pricing and corporate orders.",
    },
    {
        question: "Can I suggest a feature or product?",
        answer: "Yes! We love hearing from you. Share your ideas at timi@xplus.com.ng.",
    },
    {
        question: "I found a bug/error on the site. What should I do?",
        answer: "Thank you for flagging! Email timi@xplus.com.ng with details (e.g., screenshots, steps to reproduce).",
    },
    {
        question: "How can I reach your customer team?",
        answer: "We’re here 24/7! Contact us via:\nEmail: contact@xplus.com.ng\nPhone/WhatsApp: +234 814 465 7589\nSocial Media: xplus.com.ng",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
            <Navbar />

            <main className="flex-grow">
                {/* Hero */}
                <motion.section
                    variants={slideUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="py-12 md:py-16 border-b border-white/5"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Breadcrumbs items={[{ label: "FAQ" }]} />
                        <div className="mt-4 flex flex-col md:flex-row md:items-center gap-6">
                            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                                <HelpCircle className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-2">
                                    Frequently Asked Questions
                                </h1>
                                <p className="text-lg text-muted-foreground max-w-2xl">
                                    Find answers to common questions about orders, shipping, returns, and more.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* FAQ Accordion */}
                <section className="pb-20">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="space-y-4">
                            {FAQ_ITEMS.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-card rounded-2xl border border-white/5 overflow-hidden"
                                >
                                    <button
                                        onClick={() => toggleItem(index)}
                                        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                                    >
                                        <span className="font-medium text-white pr-4">{item.question}</span>
                                        <motion.div
                                            animate={{ rotate: openIndex === index ? 180 : 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="flex-shrink-0"
                                        >
                                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                                        </motion.div>
                                    </button>

                                    <AnimatePresence>
                                        {openIndex === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <div className="px-6 pb-6 text-muted-foreground whitespace-pre-line">
                                                    {item.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>

                        {/* Contact CTA */}
                        <div className="mt-12 text-center">
                            <p className="text-muted-foreground mb-4">
                                Still have questions?
                            </p>
                            <motion.a
                                href="mailto:support@xplus.com"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex px-8 py-4 rounded-full bg-primary text-white font-bold hover:bg-primary/80 transition-colors"
                            >
                                Contact Support
                            </motion.a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
