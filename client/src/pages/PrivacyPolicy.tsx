import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { motion } from "framer-motion";
import { slideUpVariants } from "@/lib/animation-variants";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
            <Navbar />

            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                    <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
                </div>

                <motion.div
                    variants={slideUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
                >
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-muted-foreground mb-8">Effective Date: 21st of February, 2025</p>

                    <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
                        <p>
                            Welcome to Xplus (“we,” “us,” or “our”). Your privacy is important to us. This Privacy Policy explains how we collect, use, share, and protect your personal information when you use our website xplus.com.ng (the “Site”) to purchase phone accessories, home appliances, tech gadgets, or other services. By using our Site, you agree to the terms of this policy.
                        </p>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">1. The Information We Collect</h2>
                            <p className="mb-4">We collect the following types of information:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>
                                    <strong className="text-white">Personal Information You Provide:</strong> Name, email address, phone number, and shipping/billing address. Payment details (securely processed via Flutterwave). Account credentials and communications.
                                </li>
                                <li>
                                    <strong className="text-white">Automatically Collected Information:</strong> Device and browser data (IP, OS), usage data, and cookies.
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Process orders, deliver products, and manage returns/refunds.</li>
                                <li>Communicate with you (e.g., order updates, promotions).</li>
                                <li>Improve our Site, products, and services.</li>
                                <li>Prevent fraud and ensure security.</li>
                                <li>Comply with legal obligations under Nigerian law.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">3. Sharing Your Information</h2>
                            <p>We may share your data with:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong className="text-white">Service Providers:</strong> Payment processors, delivery partners, and IT support.</li>
                                <li><strong className="text-white">Legal Authorities:</strong> When required by law.</li>
                                <li><strong className="text-white">Business Transfers:</strong> In mergers or acquisitions.</li>
                            </ul>
                            <p className="mt-2">We do not sell your personal information to third parties.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">4. Cookies and Tracking Technology</h2>
                            <p>We use cookies to remember preferences, analyze traffic (Google Analytics), and deliver targeted ads. You can manage cookies through browser settings.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">5. Data Security</h2>
                            <p>We use SSL encryption and secure gateways. However, no platform is 100% secure. Notify us at <span className="text-primary">xplus@fastmail.com</span> if you suspect issues.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights</h2>
                            <p>Under applicable laws (e.g., NDPR), you may access, correct, delete data, or opt-out of marketing. Contact us at <span className="text-primary">xplus@fastmail.com</span>.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">7. Data Retention</h2>
                            <p>We retain data only as long as necessary for fulfilling orders or legal obligations.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">8. Children's Privacy</h2>
                            <p>Our Site is not intended for users under 18. We do not knowingly collect data from minors.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">9. Third-Party Links</h2>
                            <p>We are not responsible for privacy practices of external sites we link to.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">10. Updates to This Policy</h2>
                            <p>Changes will be posted on this page with a revised "Effective Date".</p>
                        </section>

                        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 mt-8">
                            <h2 className="text-2xl font-bold text-white mb-4">11. Contact Us</h2>
                            <p className="mb-2">For questions or requests about this policy, reach us at:</p>
                            <p><strong className="text-white">Email:</strong> xplus@fastmail.com</p>
                            <p><strong className="text-white">Address:</strong> Kilometer 25, Idi-Iroko Road, Ota</p>
                        </section>
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
