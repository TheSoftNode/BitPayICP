"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const HeroSection = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeParticle, setActiveParticle] = useState(0);

    // Set loaded state after component mounts to enable animations
    useEffect(() => {
        setIsLoaded(true);

        // Cycle through particles for dynamic background effect
        const intervalId = setInterval(() => {
            setActiveParticle((prev) => (prev + 1) % 5);
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);

    // Bitcoin price ticker animation (simulated)
    const [btcPrice, setBtcPrice] = useState(39870);
    useEffect(() => {
        const priceInterval = setInterval(() => {
            const fluctuation = Math.random() * 200 - 100;
            setBtcPrice(prev => Math.round(prev + fluctuation));
        }, 3000);

        return () => clearInterval(priceInterval);
    }, []);

    // Animated background particle props
    const particles = [
        { id: 1, size: "w-96 h-96", position: "absolute -top-32 -right-24", color: "bg-orange-500/10", delay: 0 },
        { id: 2, size: "w-80 h-80", position: "absolute top-1/4 -left-20", color: "bg-yellow-400/10", delay: 0.1 },
        { id: 3, size: "w-72 h-72", position: "absolute bottom-20 right-1/4", color: "bg-blue-500/10", delay: 0.2 },
        { id: 4, size: "w-64 h-64", position: "absolute top-1/2 right-10", color: "bg-purple-500/10", delay: 0.3 },
        { id: 5, size: "w-48 h-48", position: "absolute -bottom-10 left-1/3", color: "bg-green-500/10", delay: 0.4 },
    ];

    return (
        <section className="relative pt-32 pb-32 overflow-hidden min-h-screen flex items-center">
            {/* Stylish bottom border with waves/curves */}
            <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-10">
                <svg className="relative block w-full h-[70px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                        className="fill-white dark:fill-gray-950"></path>
                </svg>
                {/* <div className="absolute bottom-0 left-0 right-0 h-[6px] bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 z-20"></div> */}
            </div>

            {/* Animated decorative elements for the wave */}
            <motion.div
                className="absolute bottom-10 left-1/4 w-4 h-4 rounded-full bg-orange-500/30 z-10"
                animate={{
                    y: [0, -15, 0],
                    opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            />
            <motion.div
                className="absolute bottom-8 right-1/3 w-3 h-3 rounded-full bg-yellow-400/30 z-10"
                animate={{
                    y: [0, -10, 0],
                    opacity: [0.2, 0.5, 0.2]
                }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.5
                }}
            />
            <motion.div
                className="absolute bottom-12 right-1/4 w-5 h-5 rounded-full bg-blue-500/20 z-10"
                animate={{
                    y: [0, -20, 0],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 1
                }}
            />
            {/* Enhanced Animated Background Elements */}
            <div className="absolute inset-0 z-0">
                {particles.map((particle, index) => (
                    <motion.div
                        key={particle.id}
                        className={`${particle.position} ${particle.size} ${particle.color} rounded-full blur-3xl`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: activeParticle === index ? 0.9 : 0.5,
                            scale: activeParticle === index ? 1.1 : 1,
                            x: [0, 10, -10, 0],
                            y: [0, -10, 10, 0]
                        }}
                        transition={{
                            duration: 8,
                            delay: particle.delay,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    />
                ))}

                {/* Animated grid background */}
                <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>

                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-orange-500/5 dark:from-transparent dark:via-gray-900/10 dark:to-orange-900/5"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pb-16">
                    {/* Enhanced Text Content with Animated Elements */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -50 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        {/* Bitcoin ticker */}
                        <motion.div
                            className="inline-flex items-center mb-4 bg-black/5 dark:bg-white/5 backdrop-blur-sm rounded-full px-4 py-1.5"
                            animate={{ y: [0, -2, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <div className="flex items-center">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center text-white font-bold text-xs mr-2">₿</div>
                                <span className="text-sm font-medium">
                                    BTC: <motion.span
                                        key={btcPrice}
                                        initial={{ opacity: 0.5, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-orange-500 dark:text-orange-400"
                                    >
                                        ${btcPrice.toLocaleString()}
                                    </motion.span>
                                </span>
                                <motion.div
                                    className={`ml-2 w-2 h-2 rounded-full ${btcPrice % 200 > 100 ? 'bg-green-500' : 'bg-red-500'}`}
                                    animate={{ scale: [1, 1.5, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            </div>
                        </motion.div>

                        <motion.h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                        >
                            <motion.span
                                className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent inline-block"
                                animate={{
                                    backgroundPosition: ['0% center', '100% center', '0% center'],
                                }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            >
                                Bitcoin Payments
                            </motion.span>{" "}
                            <br />
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                            >
                                Reimagined on{" "}
                                <motion.span
                                    className="text-blue-600 dark:text-blue-400 relative"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    ICP
                                    <motion.div
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 0.5, delay: 1 }}
                                    />
                                </motion.span>
                            </motion.span>
                        </motion.h1>

                        <motion.p
                            className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                        >
                            Experience near-instant, low-fee Bitcoin transactions with our
                            decentralized payment system built on Internet Computer Protocol.
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1 }}
                        >
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white relative overflow-hidden group"
                            >
                                <motion.span
                                    className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 duration-300"
                                    animate={{
                                        x: ['-100%', '100%'],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        repeatDelay: 1
                                    }}
                                />
                                Get Started
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-2 hover:bg-orange-500/5 hover:border-orange-500/50 transition-all duration-300"
                            >
                                Learn More
                            </Button>
                        </motion.div>

                        <motion.div
                            className="mt-12 flex items-center space-x-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 1.2 }}
                        >
                            <motion.div
                                className="flex -space-x-2"
                                initial={{ x: -20 }}
                                animate={{ x: 0 }}
                                transition={{ duration: 0.5, delay: 1.4 }}
                            >
                                {[1, 2, 3, 4].map((i) => (
                                    <motion.div
                                        key={i}
                                        className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
                                        initial={{ scale: 0, x: -10 * i }}
                                        animate={{ scale: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: 1.3 + (i * 0.1) }}
                                        whileHover={{ y: -3, zIndex: 10 }}
                                    >
                                        <span className="text-xs font-medium">M{i}</span>
                                    </motion.div>
                                ))}
                            </motion.div>
                            <motion.p
                                className="text-sm text-gray-600 dark:text-gray-400"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 1.6 }}
                            >
                                Trusted by{" "}
                                <motion.span
                                    className="font-semibold"
                                    animate={{
                                        color: ['#f97316', '#fbbf24', '#f97316'],
                                    }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                >
                                    200+
                                </motion.span>{" "}
                                merchants
                            </motion.p>
                        </motion.div>
                    </motion.div>

                    {/* Enhanced Visual/Illustration with More Animations */}
                    <motion.div
                        className="relative"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                    >
                        {/* Animated floating circles decoration */}
                        <motion.div
                            className="absolute -right-4 -top-4 w-20 h-20 bg-gradient-to-br from-orange-300/20 to-yellow-300/20 rounded-full z-0"
                            animate={{
                                y: [0, -15, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        />
                        <motion.div
                            className="absolute -left-4 bottom-1/3 w-12 h-12 bg-gradient-to-br from-blue-300/20 to-indigo-300/20 rounded-full z-0"
                            animate={{
                                y: [0, 10, 0],
                                scale: [1, 0.9, 1]
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                repeatType: "reverse",
                                delay: 0.5
                            }}
                        />

                        <div className="relative z-10">
                            <motion.div
                                className="w-full h-96 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 relative"
                                animate={{
                                    y: isHovered ? -5 : 0,
                                    scale: isHovered ? 1.01 : 1,
                                    transition: { duration: 0.2 }
                                }}
                                whileHover={{ boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                            >
                                {/* Animated gradient border */}
                                <motion.div
                                    className="absolute inset-0 z-0 border-2 border-transparent rounded-2xl"
                                    style={{
                                        background: "linear-gradient(90deg, rgba(249,115,22,0) 0%, rgba(249,115,22,0.3) 50%, rgba(234,179,8,0) 100%)",
                                        backgroundSize: "200% 100%",
                                        maskImage: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                        maskComposite: "exclude",
                                        WebkitMaskComposite: "xor",
                                        padding: "1px"
                                    }}
                                    animate={{
                                        backgroundPosition: ["0% center", "200% center"]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
                                />

                                <div className="bg-gradient-to-r from-orange-500 to-yellow-400 h-3" />
                                <div className="p-6">
                                    <div className="flex items-center mb-6">
                                        <motion.div
                                            className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center text-white font-bold"
                                            whileHover={{ rotate: 360, scale: 1.1 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            ₿
                                        </motion.div>
                                        <div className="ml-3">
                                            <div className="text-sm text-gray-500 dark:text-gray-400">Payment Request</div>
                                            <div className="font-semibold">0.025 BTC</div>
                                        </div>
                                        <div className="ml-auto">
                                            <motion.span
                                                className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium rounded-full"
                                                whileHover={{ scale: 1.05 }}
                                                animate={{ y: [0, -2, 0] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                            >
                                                Instant
                                            </motion.span>
                                        </div>
                                    </div>

                                    <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg flex justify-center mb-6 relative overflow-hidden">
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0"
                                            animate={{ opacity: [0, 0.5, 0] }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                        />
                                        <div className="w-32 h-32 bg-white dark:bg-black p-2 rounded-lg relative">
                                            <motion.div
                                                className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-700 rounded flex items-center justify-center text-white"
                                                initial={{ backgroundPosition: "0% 0%" }}
                                                animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
                                                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                                            >
                                                {/* Animated QR Code */}
                                                <div className="relative w-20 h-20">
                                                    <motion.div
                                                        className="absolute inset-0 grid grid-cols-5 grid-rows-5 gap-1"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ duration: 0.5, delay: 0.2 }}
                                                    >
                                                        {Array.from({ length: 25 }).map((_, i) => (
                                                            <motion.div
                                                                key={i}
                                                                className="bg-white"
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                transition={{ duration: 0.2, delay: 0.05 * i }}
                                                            />
                                                        ))}
                                                    </motion.div>
                                                    <motion.div
                                                        className="absolute inset-2 border-2 border-white"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ duration: 0.3, delay: 0.7 }}
                                                    />
                                                </div>
                                            </motion.div>

                                            {/* Scanning animation */}
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/30 to-transparent"
                                                style={{ height: "4px" }}
                                                animate={{ top: ["0%", "100%", "0%"] }}
                                                transition={{ duration: 2.5, repeat: Infinity }}
                                            />
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        <motion.div
                                            className="space-y-3"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.5, staggerChildren: 0.1 }}
                                        >
                                            <motion.div
                                                className="flex justify-between text-sm"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <span className="text-gray-500 dark:text-gray-400">Network Fee:</span>
                                                <span>0.00001 BTC</span>
                                            </motion.div>
                                            <motion.div
                                                className="flex justify-between text-sm"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3, delay: 0.1 }}
                                            >
                                                <span className="text-gray-500 dark:text-gray-400">Confirmations:</span>
                                                <motion.span
                                                    className="font-medium text-green-600 dark:text-green-400"
                                                    animate={{ opacity: [0.7, 1, 0.7] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                >
                                                    Instant via ckBTC
                                                </motion.span>
                                            </motion.div>
                                            <motion.div
                                                className="flex justify-between text-sm"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3, delay: 0.2 }}
                                            >
                                                <span className="text-gray-500 dark:text-gray-400">Status:</span>
                                                <motion.span
                                                    className="font-medium text-blue-600 dark:text-blue-400 flex items-center"
                                                >
                                                    <motion.span
                                                        className="inline-block w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-1"
                                                        animate={{ scale: [1, 1.5, 1] }}
                                                        transition={{ duration: 2, repeat: Infinity }}
                                                    />
                                                    Ready to Pay
                                                </motion.span>
                                            </motion.div>
                                        </motion.div>
                                    </AnimatePresence>

                                    <Button className="w-full mt-6 bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white relative overflow-hidden group">
                                        <motion.span
                                            className="absolute inset-0 bg-white/10"
                                            initial={{ x: "-100%", opacity: 0 }}
                                            animate={{ x: "100%", opacity: 0.3 }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                                repeatDelay: 1
                                            }}
                                        />
                                        Complete Payment
                                    </Button>
                                </div>
                            </motion.div>
                        </div>

                        {/* Enhanced decorative elements */}
                        <motion.div
                            className="absolute -bottom-6 -right-6 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-xl"
                            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
                            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                        />
                        <motion.div
                            className="absolute -top-6 -left-6 w-48 h-48 bg-orange-500/5 dark:bg-orange-500/10 rounded-full blur-xl"
                            animate={{ scale: [1, 0.9, 1], opacity: [0.5, 0.8, 0.5] }}
                            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 1 }}
                        />

                        {/* Animated bitcoin icon floating */}
                        <motion.div
                            className="absolute -bottom-3 right-20 w-12 h-12 opacity-20"
                            animate={{
                                y: [0, -15, 0],
                                rotate: [0, 10, 0],
                                opacity: [0.2, 0.3, 0.2]
                            }}
                            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                        >
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.998 0C5.366 0 0 5.366 0 11.998C0 18.63 5.366 24 11.998 24C18.63 24 24 18.63 24 11.998C24 5.366 18.63 0 11.998 0Z" fill="currentColor" />
                                <path d="M16.24 10.773C16.115 9.267 14.846 8.756 13.229 8.59V6.996H11.904V8.552C11.591 8.552 11.269 8.56 10.947 8.568V6.996H9.622V8.59C9.356 8.598 8.493 8.583 7.318 8.583V10C7.318 10 8.261 9.983 8.246 10C8.696 10 8.77 10.23 8.821 10.401V13.989C8.792 14.118 8.673 14.314 8.366 14.314L7.332 14.329V15.776C8.463 15.776 9.352 15.776 9.622 15.776V17.4H10.947V15.784C11.269 15.792 11.591 15.792 11.904 15.792V17.4H13.229V15.776C15.33 15.65 16.812 15.087 16.953 13.098C17.076 11.481 16.316 10.833 15.077 10.655C15.876 10.408 16.336 9.945 16.24 10.773ZM14.98 13.008C14.98 14.534 12.478 14.416 11.651 14.416V11.603C12.478 11.603 14.98 11.371 14.98 13.008ZM13.959 10.374C13.959 11.756 11.86 11.653 11.158 11.653V9.097C11.86 9.097 13.959 8.889 13.959 10.374Z" fill="white" />
                            </svg>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Background animated binary data flow - web3 touch */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10 dark:opacity-15 z-0">
                <motion.div
                    className="absolute -inset-1/4"
                    animate={{ y: [0, -1000] }}
                    transition={{
                        duration: 60,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    {Array.from({ length: 30 }).map((_, i) => (
                        <div key={i} className="relative" style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.5 + 0.5
                        }}>
                            {Math.random() > 0.5 ? '0' : '1'}
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Style tag for the background grid pattern */}
            <style jsx>{`
                .bg-grid-pattern {
                    background-image: 
                        linear-gradient(to right, rgba(100, 100, 100, 0.1) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(100, 100, 100, 0.1) 1px, transparent 1px);
                    background-size: 20px 20px;
                }
            `}</style>
        </section>
    );
};

export default HeroSection;