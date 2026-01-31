import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { slideUpVariants, staggerContainerVariants, staggerItemVariants } from "@/lib/animation-variants";
import { Users, Zap, Shield, Award } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const VALUES = [
    { icon: Award, title: "Curated Quality", description: "Every product is handpicked for durability, functionality, and style. We partner with trusted brands and rigorously test items." },
    { icon: Zap, title: "Unbeatable Convenience", description: "Shop 24/7, enjoy seamless checkout, and get lightning-fast delivery across Nigeria." },
    { icon: Users, title: "Customer First", description: "Your satisfaction drives us. Our dedicated support team is here to ensure you love every purchase." },
    { icon: Shield, title: "Tech for All", description: "From budget-friendly essentials to premium upgrades, we cater to every lifestyle and budget." },
];

export default function About() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
            <Navbar />

            <main className="flex-grow">
                {/* Hero */}
                <motion.section
                    variants={slideUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="py-12 md:py-16 border-b border-white/5 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Breadcrumbs items={[{ label: "About" }]} />

                        <div className="mt-4">
                            <span className="text-primary font-medium tracking-wide uppercase text-sm mb-4 block">
                                Kilometer 25, Idi-Iroko Road, Ota
                            </span>
                            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                                Your Go-To Destination for <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-300">
                                    Tech & Innovation.
                                </span>
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-3xl mb-8 leading-relaxed">
                                At Xplus, we believe technology should empower your life, not complicate it.
                                Founded in 2020, we’re a Nigerian-based e-commerce platform dedicated to bringing
                                you the latest phone accessories, home appliances, and cutting-edge tech gadgets — all at your fingertips.
                            </p>
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-3xl">
                                <h2 className="text-2xl font-bold text-white mb-4">Who We Are</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Xplus started with a simple idea: to make premium tech accessible, affordable, and effortless for everyone.
                                    Whether you’re upgrading your smartphone setup, outfitting your home with smart appliances, or hunting for
                                    the perfect gadget, we’re here to simplify your journey. We’re more than a store — we’re tech enthusiasts,
                                    problem solvers, and your trusted partners in navigating the fast-paced world of innovation.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Values */}
                <section className="py-20 border-t border-white/5">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="font-display text-3xl font-bold text-white text-center mb-12">
                            Our Values
                        </h2>

                        <motion.div
                            variants={staggerContainerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            {VALUES.map((value) => (
                                <motion.div
                                    key={value.title}
                                    variants={staggerItemVariants}
                                    className="bg-card rounded-2xl border border-white/5 p-6 text-center hover:border-primary/30 transition-colors"
                                >
                                    <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <value.icon className="w-7 h-7 text-primary" />
                                    </div>
                                    <h3 className="font-bold text-white mb-2">{value.title}</h3>
                                    <p className="text-sm text-muted-foreground">{value.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Mission */}
                <section className="py-20 border-t border-white/5 bg-white/[0.02]">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="font-display text-3xl font-bold text-white mb-8">Our Mission</h2>
                        <p className="text-xl text-muted-foreground mb-12">
                            To revolutionize how Nigerians experience technology by providing:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="p-6 bg-card rounded-2xl border border-white/5">
                                <h3 className="font-bold text-white mb-2">Innovation Made Simple</h3>
                                <p className="text-sm text-muted-foreground">Demystifying tech with user-friendly products/guides.</p>
                            </div>
                            <div className="p-6 bg-card rounded-2xl border border-white/5">
                                <h3 className="font-bold text-white mb-2">Reliable Solutions</h3>
                                <p className="text-sm text-muted-foreground">Helping you stay connected, efficient, and entertained.</p>
                            </div>
                            <div className="p-6 bg-card rounded-2xl border border-white/5">
                                <h3 className="font-bold text-white mb-2">Community Driven</h3>
                                <p className="text-sm text-muted-foreground">Listening to your needs to grow and improve together.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Join Family / Contact */}
                <section className="py-20 border-t border-white/5">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="font-display text-3xl font-bold text-white mb-6">Join the Xplus Family</h2>
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                            We’re proud to serve hundreds of happy customers nationwide — and we’re just getting started.
                            Explore our catalog today and discover how tech can elevate your everyday life.
                        </p>

                        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-8 max-w-2xl mx-auto">
                            <p className="text-white font-medium mb-4">
                                Got questions or feedback? We’d love to hear from you!
                            </p>
                            <p className="text-primary font-bold text-lg mb-2">contact@xplus.com.ng</p>
                            <p className="text-muted-foreground text-sm">Kilometer 25, Idi-Iroko Road, Ota</p>
                        </div>

                        <p className="mt-12 text-2xl font-display font-bold text-white">
                            Xplus: Tech Simplified. Life Enhanced.
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
