"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, Check, Bitcoin } from "lucide-react";
import { motion } from "framer-motion";

const CTASection = () => {
    const [isHovered, setIsHovered] = useState(false);

    // Define animations for the CTA card
    const cardVariants = {
        initial: { opacity: 0.9, y: 10 },
        hover: {
            opacity: 1,
            y: 0,
            boxShadow: "0 20px 30px -10px rgba(249, 115, 22, 0.15)",
            transition: { duration: 0.3 }
        }
    };

    // Animate list items in sequence
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const listItem = {
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0 }
    };

    return (
        <section className="py-16 relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
            {/* Enhanced Background Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.div
                    className="absolute -top-32 -right-32 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"
                    animate={{
                        opacity: [0.1, 0.15, 0.1],
                        scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute -bottom-64 -left-32 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"
                    animate={{
                        opacity: [0.1, 0.2, 0.1],
                        scale: [1, 0.98, 1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent" />

                {/* Subtle grid pattern */}
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    className="max-w-4xl mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700/50"
                    initial="initial"
                    whileHover="hover"
                    variants={cardVariants}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                >
                    {/* Animated gradient border */}
                    <div className="relative h-2 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-400"></div>
                        <motion.div
                            className="absolute inset-0 bg-white/30 dark:bg-white/10"
                            animate={{
                                x: ['-100%', '100%'],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "mirror"
                            }}
                        />
                    </div>

                    <div className="p-6 md:p-8">
                        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
                            <div className="w-full md:w-3/5">
                                <motion.h2
                                    className="text-2xl md:text-3xl font-bold mb-3"
                                    animate={{
                                        scale: isHovered ? 1.02 : 1
                                    }}
                                    transition={{ duration: 0.5 }}
                                >
                                    Ready to Accept{" "}
                                    <span className="relative">
                                        <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
                                            Bitcoin Payments?
                                        </span>
                                        <motion.div
                                            className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-orange-500/40 to-yellow-400/40 rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: isHovered ? "100%" : "0%" }}
                                            transition={{ duration: 0.4 }}
                                        />
                                    </span>
                                </motion.h2>

                                <motion.p
                                    className="text-gray-600 dark:text-gray-400 mb-5 text-sm md:text-base"
                                    animate={{
                                        opacity: isHovered ? 1 : 0.9
                                    }}
                                >
                                    Start accepting Bitcoin payments with near-instant settlements through our ICP-powered payment system. No more waiting for confirmations or dealing with high fees.
                                </motion.p>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                                        <Button
                                            size="lg"
                                            className="bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white relative overflow-hidden group w-full sm:w-auto"
                                        >
                                            <motion.span
                                                className="absolute inset-0 bg-white/20"
                                                initial={{ x: "-100%", opacity: 0 }}
                                                animate={{ x: isHovered ? "100%" : "-100%", opacity: 0.3 }}
                                                transition={{ duration: 1 }}
                                            />
                                            Get Started
                                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </motion.div>

                                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="border-2 w-full sm:w-auto hover:border-orange-500/50 hover:bg-orange-500/5 transition-colors"
                                        >
                                            Contact Sales
                                            <ExternalLink className="ml-2 h-4 w-4" />
                                        </Button>
                                    </motion.div>
                                </div>
                            </div>

                            <div className="w-full md:w-2/5">
                                <motion.div
                                    className="rounded-lg bg-gray-50/80 dark:bg-gray-900/80 p-5 border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm"
                                    whileHover={{ y: -5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="flex items-center mb-3">
                                        <motion.div
                                            className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-orange-500/20"
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.8 }}
                                        >
                                            <Bitcoin className="h-5 w-5" />
                                        </motion.div>
                                        <div className="ml-3">
                                            <div className="font-semibold">Bitcoin + ICP</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">The future of payments</div>
                                        </div>
                                    </div>

                                    <motion.div
                                        className="space-y-2"
                                        variants={container}
                                        initial="hidden"
                                        animate="show"
                                    >
                                        {[
                                            "Instant settlements",
                                            "Low transaction fees",
                                            "No chargebacks",
                                            "Global payments",
                                            "Fully decentralized"
                                        ].map((benefit, index) => (
                                            <motion.div
                                                key={index}
                                                className="flex items-center gap-2 group"
                                                variants={listItem}
                                                whileHover={{ x: 3 }}
                                            >
                                                <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center flex-shrink-0">
                                                    <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                                                </div>
                                                <span className="text-sm group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
                                                    {benefit}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </motion.div>

                                    <motion.div
                                        className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700/50 text-center text-xs text-gray-500 dark:text-gray-400"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.8 }}
                                    >
                                        Join 200+ merchants already using BitPayICP
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Style for grid pattern */}
            <style jsx>{`
                .bg-grid-pattern {
                    background-image: linear-gradient(to right, rgba(200, 200, 200, 0.1) 1px, transparent 1px),
                                    linear-gradient(to bottom, rgba(200, 200, 200, 0.1) 1px, transparent 1px);
                    background-size: 24px 24px;
                }
            `}</style>
        </section>
    );
};

export default CTASection;