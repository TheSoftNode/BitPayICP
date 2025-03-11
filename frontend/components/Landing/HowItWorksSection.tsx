"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    CreditCard,
    QrCode,
    Bitcoin,
    CheckCircle,
    RefreshCw,
    DollarSign,
    ChevronRight,
    ArrowRight
} from "lucide-react";

const steps = [
    {
        icon: <CreditCard className="h-6 w-6" />,
        title: "User Selects BTC Payment",
        description: "Customer chooses Bitcoin as their preferred payment method at checkout.",
        color: "from-orange-500 to-yellow-400",
    },
    {
        icon: <QrCode className="h-6 w-6" />,
        title: "Generate Bitcoin Address",
        description: "The merchant's system generates a unique Bitcoin payment request with QR code.",
        color: "from-orange-500 to-yellow-400",
    },
    {
        icon: <Bitcoin className="h-6 w-6" />,
        title: "User Sends BTC",
        description: "Customer sends Bitcoin to the provided address using their wallet.",
        color: "from-orange-500 to-yellow-400",
    },
    {
        icon: <RefreshCw className="h-6 w-6" />,
        title: "Convert to ckBTC",
        description: "The system mints ckBTC tokens on ICP once the Bitcoin transaction is detected.",
        color: "from-orange-500 to-yellow-400",
    },
    {
        icon: <CheckCircle className="h-6 w-6" />,
        title: "Instant Settlement",
        description: "Merchant receives ckBTC instantly instead of waiting for traditional BTC confirmations.",
        color: "from-orange-500 to-yellow-400",
    },
    {
        icon: <DollarSign className="h-6 w-6" />,
        title: "Optional Conversion",
        description: "Merchant can hold ckBTC or convert to stablecoins/fiat via integrated exchanges.",
        color: "from-orange-500 to-yellow-400",
    },
];

const HowItWorksSection = () => {
    const [activeStep, setActiveStep] = useState(0);
    // Auto advance steps for demo purposes
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % steps.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="how-it-works" className="py-20 relative bg-gradient-to-br from-indigo-50 via-slate-50 to-blue-50 dark:from-slate-950 dark:via-indigo-950/30 dark:to-slate-900 overflow-hidden">
            {/* Stylish top border curve */}
            <div className="absolute top-0 left-0 right-0 w-full overflow-hidden">
                <svg className="relative block w-full h-[70px] transform rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        className="fill-white dark:fill-gray-950"></path>
                </svg>
            </div>

            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-1/3 -right-20 w-[400px] h-[400px] rounded-full bg-blue-100/20 dark:bg-blue-800/5 blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.3, 0.2],
                        x: [-10, 10, -10],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute -top-20 -left-20 w-[300px] h-[300px] rounded-full bg-indigo-200/20 dark:bg-indigo-800/5 blur-3xl"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{ duration: 6, repeat: Infinity, delay: 2 }}
                />
                <motion.div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-purple-100/10 dark:bg-purple-900/5 blur-3xl"
                    animate={{
                        scale: [1, 0.9, 1],
                        opacity: [0.1, 0.15, 0.1],
                    }}
                    transition={{ duration: 7, repeat: Infinity, delay: 1 }}
                />

                {/* Circuit pattern background */}
                <div className="absolute inset-0 bg-circuit-pattern opacity-5 dark:opacity-10"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section heading with animated highlight */}
                <div className="text-center max-w-3xl mx-auto mb-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-block mb-2"
                    >
                        <div className="px-4 py-1 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-sm font-medium">
                            Simple Process, Powerful Results
                        </div>
                    </motion.div>

                    <motion.h2
                        className="text-3xl font-bold mb-3"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                            How It Works
                        </span>
                    </motion.h2>

                    <motion.p
                        className="text-gray-600 dark:text-gray-400 text-sm md:text-base"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        Our system simplifies Bitcoin payments by leveraging ICP's ckBTC for instant settlements. Here's the process:
                    </motion.p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                    {/* Left side: Steps - More compact with animations */}
                    <div className="w-full lg:w-5/12 space-y-2 relative">
                        {/* Connection line between steps */}
                        <div className="absolute left-5 top-[64px] bottom-8 w-[2px] bg-gradient-to-b from-indigo-300/50 via-blue-400/50 to-purple-400/50 dark:from-indigo-500/30 dark:via-blue-500/30 dark:to-purple-500/30 rounded-full hidden sm:block"></div>

                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className={`p-3 rounded-xl cursor-pointer transition-all duration-200 border backdrop-blur-sm relative ${activeStep === index
                                    ? "bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/30 dark:border-indigo-500/20 shadow-sm"
                                    : "hover:bg-white/40 dark:hover:bg-gray-800/30 border-transparent hover:border-indigo-300/30 dark:hover:border-indigo-700/30"
                                    }`}
                                onClick={() => setActiveStep(index)}
                            >
                                <div className="flex items-center">
                                    <div
                                        className={`w-10 h-10 rounded-full ${activeStep === index
                                            ? "bg-gradient-to-br from-indigo-500 to-purple-500"
                                            : "bg-gradient-to-br from-indigo-400/80 to-purple-400/80 dark:from-indigo-600/80 dark:to-purple-600/80"
                                            } flex items-center justify-center text-white mr-3 flex-shrink-0 relative z-10`}
                                    >
                                        {activeStep === index ? (
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                                className="absolute inset-0 rounded-full border-2 border-indigo-300 dark:border-indigo-700 border-dashed"
                                            ></motion.div>
                                        ) : null}
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-base lg:text-lg mb-0.5 text-gray-900 dark:text-gray-100">{step.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-xs lg:text-sm line-clamp-2">
                                            {step.description}
                                        </p>
                                    </div>
                                    {activeStep === index && (
                                        <ArrowRight className="h-4 w-4 text-indigo-500 dark:text-indigo-400 ml-2 hidden lg:block" />
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right side: Illustration - Enhanced with glass effect */}
                    <div className="w-full lg:w-7/12">
                        <motion.div
                            className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-indigo-100/80 dark:border-indigo-700/30"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Top decorative gradient */}
                            <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 rounded-t-2xl"></div>

                            {/* Animated rings around the illustration */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-20 blur-sm -z-10"></div>
                            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl opacity-10 blur-md -z-10"></div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeStep}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="p-2"
                                >
                                    <div className="mb-4 flex justify-center">
                                        <motion.div
                                            className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 via-blue-500 to-purple-500 flex items-center justify-center text-white"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {steps[activeStep].icon}
                                        </motion.div>
                                    </div>

                                    <h3 className="text-xl font-semibold text-center mb-3 text-gray-900 dark:text-white">
                                        {steps[activeStep].title}
                                    </h3>

                                    {/* Different illustrations based on step - With enhanced styling */}
                                    {activeStep === 0 && (
                                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
                                            <div className="flex items-center space-x-3 mb-3">
                                                <motion.div
                                                    className="w-12 h-6 bg-gray-300/80 dark:bg-gray-700/80 rounded-full"
                                                    animate={{ opacity: [0.7, 1, 0.7] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                ></motion.div>
                                                <motion.div
                                                    className="w-20 h-6 bg-gray-300/80 dark:bg-gray-700/80 rounded-full"
                                                    animate={{ opacity: [0.8, 1, 0.8] }}
                                                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                                                ></motion.div>
                                            </div>
                                            <div className="space-y-3">
                                                <motion.div
                                                    className="h-10 bg-gray-200/80 dark:bg-gray-800/80 rounded-lg"
                                                    initial={{ width: "60%" }}
                                                    animate={{ width: "100%" }}
                                                    transition={{ duration: 0.8 }}
                                                ></motion.div>
                                                <motion.div
                                                    className="h-10 bg-gray-200/80 dark:bg-gray-800/80 rounded-lg"
                                                    initial={{ width: "80%" }}
                                                    animate={{ width: "100%" }}
                                                    transition={{ duration: 0.8, delay: 0.1 }}
                                                ></motion.div>
                                                <div className="flex space-x-2">
                                                    <motion.div
                                                        className="h-10 bg-gray-200/80 dark:bg-gray-800/80 rounded-lg flex-1"
                                                        initial={{ width: "0%" }}
                                                        animate={{ width: "100%" }}
                                                        transition={{ duration: 0.8, delay: 0.2 }}
                                                    ></motion.div>
                                                    <motion.div
                                                        className="h-10 w-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-xs"
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.5, delay: 0.4 }}
                                                    >
                                                        Bitcoin
                                                    </motion.div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeStep === 1 && (
                                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 flex justify-center">
                                            <div className="w-40 h-40 bg-white dark:bg-black p-3 rounded-lg shadow-inner relative">
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg"
                                                    animate={{ opacity: [0, 0.5, 0] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                ></motion.div>
                                                <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-700 rounded-md flex items-center justify-center text-white text-sm relative">
                                                    <div className="grid grid-cols-5 grid-rows-5 gap-1 w-24 h-24">
                                                        {Array.from({ length: 25 }).map((_, i) => (
                                                            <motion.div
                                                                key={i}
                                                                className="bg-white"
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                transition={{ duration: 0.2, delay: 0.01 * i }}
                                                            ></motion.div>
                                                        ))}
                                                    </div>
                                                    {/* Scanning animation */}
                                                    <motion.div
                                                        className="absolute left-0 right-0 h-1 bg-indigo-500/70"
                                                        animate={{ top: ["10%", "90%", "10%"] }}
                                                        transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
                                                    ></motion.div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeStep === 2 && (
                                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
                                            <div className="flex justify-between items-center mb-3">
                                                <div className="flex items-center">
                                                    <motion.div
                                                        className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs"
                                                        whileHover={{ scale: 1.1, rotate: 360 }}
                                                        transition={{ duration: 0.5 }}
                                                    >₿</motion.div>
                                                    <span className="ml-2 font-medium">BTC Wallet</span>
                                                </div>
                                                <div className="text-sm">Balance: 0.045 BTC</div>
                                            </div>
                                            <div className="p-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg mb-3 text-sm font-mono overflow-x-auto border border-indigo-100 dark:border-indigo-900/50">
                                                <motion.span
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 1 }}
                                                >
                                                    3FZbgi29cp7U9D3hXrAdkyzA9uZ32JvY4z
                                                </motion.span>
                                            </div>
                                            <div className="flex justify-between text-sm mb-4">
                                                <span>Amount:</span>
                                                <motion.span
                                                    className="font-medium"
                                                    animate={{ opacity: [0.7, 1, 0.7] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                >0.025 BTC</motion.span>
                                            </div>
                                            <motion.div
                                                className="h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-medium shadow-lg shadow-indigo-500/20 dark:shadow-indigo-800/20"
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                            >
                                                Send Payment
                                            </motion.div>
                                        </div>
                                    )}

                                    {activeStep === 3 && (
                                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
                                            <div className="flex justify-center mb-4">
                                                <div className="w-full max-w-xs">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="flex items-center">
                                                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs">₿</div>
                                                            <span className="ml-1 text-sm">BTC</span>
                                                        </div>
                                                        <motion.div
                                                            animate={{ rotate: 360 }}
                                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                            className="w-6 h-6"
                                                        >
                                                            <RefreshCw className="w-6 h-6 text-indigo-500" />
                                                        </motion.div>
                                                        <div className="flex items-center">
                                                            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">ck</div>
                                                            <span className="ml-1 text-sm">ckBTC</span>
                                                        </div>
                                                    </div>
                                                    <div className="relative w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                        <motion.div
                                                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                                                            initial={{ width: "0%" }}
                                                            animate={{ width: "75%" }}
                                                            transition={{ duration: 2 }}
                                                        ></motion.div>

                                                        {/* Animated particles along the progress bar */}
                                                        <motion.div
                                                            className="absolute top-0 left-0 bottom-0 w-1 bg-white/50"
                                                            animate={{
                                                                left: ["0%", "75%"],
                                                                opacity: [0, 1, 0]
                                                            }}
                                                            transition={{
                                                                duration: 1.5,
                                                                repeat: Infinity,
                                                                repeatDelay: 1
                                                            }}
                                                        ></motion.div>
                                                    </div>
                                                    <div className="text-center mt-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                                                        Minting ckBTC (1:1)
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeStep === 4 && (
                                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
                                            <div className="flex justify-center mb-4">
                                                <motion.div
                                                    className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ duration: 0.5, type: "spring" }}
                                                >
                                                    <motion.div
                                                        animate={{ scale: [1, 1.2, 1] }}
                                                        transition={{ duration: 2, repeat: Infinity }}
                                                    >
                                                        <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
                                                    </motion.div>
                                                </motion.div>
                                            </div>
                                            <div className="text-center mb-4">
                                                <motion.div
                                                    className="text-lg font-semibold text-green-600 dark:text-green-400"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.5, delay: 0.2 }}
                                                >
                                                    Payment Received!
                                                </motion.div>
                                                <motion.div
                                                    className="text-sm text-gray-600 dark:text-gray-400"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.5, delay: 0.3 }}
                                                >
                                                    0.025 ckBTC has been settled to merchant
                                                </motion.div>
                                            </div>
                                            <div className="text-xs text-center text-gray-500 dark:text-gray-400">
                                                Traditional BTC confirmation progress: 1/6
                                                <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mt-1 overflow-hidden relative">
                                                    <motion.div
                                                        className="h-full bg-gray-400/50 dark:bg-gray-600/50 rounded-full"
                                                        initial={{ width: "0%" }}
                                                        animate={{ width: "16.66%" }}
                                                        transition={{ duration: 1 }}
                                                    ></motion.div>
                                                    <motion.div
                                                        className="absolute top-0 bottom-0 left-0 w-1 bg-white/50"
                                                        animate={{
                                                            left: ["0%", "16.66%"],
                                                            opacity: [0, 0.8, 0]
                                                        }}
                                                        transition={{
                                                            duration: 1,
                                                            repeat: Infinity,
                                                            repeatDelay: 1
                                                        }}
                                                    ></motion.div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeStep === 5 && (
                                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
                                            <div className="flex justify-between mb-5">
                                                <motion.div
                                                    className="text-center"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white mb-2 shadow-lg shadow-indigo-500/20">
                                                        <span className="text-xs">ck₿</span>
                                                    </div>
                                                    <div className="text-xs font-medium">Hold ckBTC</div>
                                                </motion.div>
                                                <motion.div
                                                    className="text-center"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.5, delay: 0.1 }}
                                                >
                                                    <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white mb-2 shadow-lg shadow-green-500/20">
                                                        <span className="text-xs">$</span>
                                                    </div>
                                                    <div className="text-xs font-medium">Stablecoins</div>
                                                </motion.div>
                                                <motion.div
                                                    className="text-center"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.5, delay: 0.2 }}
                                                >
                                                    <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-gray-500 to-slate-500 flex items-center justify-center text-white mb-2 shadow-lg shadow-gray-500/20">
                                                        <span className="text-xs">€£¥</span>
                                                    </div>
                                                    <div className="text-xs font-medium">Fiat</div>
                                                </motion.div>
                                            </div>
                                            <div className="space-y-2">
                                                <motion.div
                                                    className="h-10 bg-blue-100/70 dark:bg-blue-900/30 rounded-lg backdrop-blur-sm flex items-center px-3 border border-blue-200 dark:border-blue-800/50"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.5, delay: 0.3 }}
                                                    whileHover={{ x: 3 }}
                                                >
                                                    <span className="text-blue-800 dark:text-blue-300 text-sm">ckBTC &rarr; USDC</span>
                                                    <span className="ml-auto text-sm font-medium">0.025 ckBTC = 997.25 USDC</span>
                                                </motion.div>
                                                <motion.div
                                                    className="h-10 bg-green-100/70 dark:bg-green-900/30 rounded-lg backdrop-blur-sm flex items-center px-3 border border-green-200 dark:border-green-800/50"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.5, delay: 0.4 }}
                                                    whileHover={{ x: 3 }}
                                                >
                                                    <span className="text-green-800 dark:text-green-300 text-sm">ckBTC &rarr; EUR</span>
                                                    <span className="ml-auto text-sm font-medium">0.025 ckBTC = 921.76 EUR</span>
                                                </motion.div>
                                                <motion.div
                                                    className="h-10 bg-orange-100/70 dark:bg-orange-900/30 rounded-lg backdrop-blur-sm flex items-center px-3 border border-orange-200 dark:border-orange-800/50"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.5, delay: 0.5 }}
                                                    whileHover={{ x: 3 }}
                                                >
                                                    <span className="text-orange-800 dark:text-orange-300 text-sm">ckBTC &rarr; BTC</span>
                                                    <span className="ml-auto text-sm font-medium">0.025 ckBTC = 0.025 BTC</span>
                                                </motion.div>
                                            </div>
                                        </div>
                                    )}

                                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-6">
                                        {steps[activeStep].description}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>

                {/* Stylish progress indicators */}
                <div className="flex justify-center mt-8 space-x-2">
                    {steps.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveStep(idx)}
                            className={`w-2 h-2 rounded-full ${activeStep === idx
                                ? "bg-gradient-to-r from-indigo-500 to-purple-500 w-8"
                                : "bg-gray-300 dark:bg-gray-700 hover:bg-indigo-300 dark:hover:bg-indigo-700"
                                } transition-all duration-300`}
                            aria-label={`Go to step ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Stylish bottom border curve */}
            <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0]">
                <svg className="relative block w-full h-[70px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        className="fill-white dark:fill-gray-950"></path>
                </svg>
            </div>

            {/* Style for circuit pattern */}
            <style jsx>{`
        .bg-circuit-pattern {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 304 304' width='304' height='304'%3E%3Cpath fill='%239C92AC' fill-opacity='0.4' d='M44.1 224a5 5 0 1 1 0 2H0v-2h44.1zm160 48a5 5 0 1 1 0 2H82v-2h122.1zm57.8-46a5 5 0 1 1 0-2H304v2h-42.1zm0 16a5 5 0 1 1 0-2H304v2h-42.1zm6.2-114a5 5 0 1 1 0 2h-86.2a5 5 0 1 1 0-2h86.2zm-256-48a5 5 0 1 1 0 2H0v-2h12.1zm185.8 34a5 5 0 1 1 0-2h86.2a5 5 0 1 1 0 2h-86.2zM258 12.1a5 5 0 1 1-2 0V0h2v12.1zm-64 208a5 5 0 1 1-2 0v-54.2a5 5 0 1 1 2 0v54.2zm48-198.2V80h62v2h-64V21.9a5 5 0 1 1 2 0zm16 16V64h46v2h-48V37.9a5 5 0 1 1 2 0zm-128 96V208h16v12.1a5 5 0 1 1-2 0V210h-16v-76.1a5 5 0 1 1 2 0zm-5.9-21.9a5 5 0 1 1 0 2H114v48H85.9a5 5 0 1 1 0-2H112v-48h12.1zm-6.2 130a5 5 0 1 1 0-2H176v-74.1a5 5 0 1 1 2 0V242h-60.1zm-16-64a5 5 0 1 1 0-2H114v48h10.1a5 5 0 1 1 0 2H112v-48h-10.1zM66 284.1a5 5 0 1 1-2 0V274H50v30h-2v-32h18v12.1zM236.1 176a5 5 0 1 1 0 2H226v94h48v32h-2v-30h-48v-98h12.1zm25.8-30a5 5 0 1 1 0-2H274v44.1a5 5 0 1 1-2 0V146h-10.1zm-64 96a5 5 0 1 1 0-2H208v-80h16v-14h-42.1a5 5 0 1 1 0-2H226v18h-16v80h-12.1zm86.2-210a5 5 0 1 1 0 2H272V0h2v32h10.1zM98 101.9V146H53.9a5 5 0 1 1 0-2H96v-42.1a5 5 0 1 1 2 0zM53.9 34a5 5 0 1 1 0-2H80V0h2v34H53.9zm60.1 3.9V66H82v64H69.9a5 5 0 1 1 0-2H80V64h32V37.9a5 5 0 1 1 2 0zM101.9 82a5 5 0 1 1 0-2H128V37.9a5 5 0 1 1 2 0V82h-28.1zm16-64a5 5 0 1 1 0-2H146v44.1a5 5 0 1 1-2 0V18h-26.1zm102.2 270a5 5 0 1 1 0 2H98v14h-2v-16h124.1zM242 149.9V160h16v34h-16v62h48v48h-2v-46h-48v-66h16v-30h-16v-12.1a5 5 0 1 1 2 0zM53.9 18a5 5 0 1 1 0-2H64V2H48V0h18v18H53.9zm112 32a5 5 0 1 1 0-2H192V0h50v2h-48v48h-28.1zm-48-48a5 5 0 0 1-9.8-2h2.07a3 3 0 1 0 5.66 0H178v34h-18V21.9a5 5 0 1 1 2 0V32h14V2h-58.1zm0 96a5 5 0 1 1 0-2H137l32-32h39V21.9a5 5 0 1 1 2 0V66h-40.17l-32 32H117.9zm28.1 90.1a5 5 0 1 1-2 0v-76.51L175.59 80H224V21.9a5 5 0 1 1 2 0V82h-49.59L146 112.41v75.69zm16 32a5 5 0 1 1-2 0v-99.51L184.59 96H300.1a5 5 0 0 1 3.9-3.9v2.07a3 3 0 0 0 0 5.66v2.07a5 5 0 0 1-3.9-3.9H185.41L162 121.41v98.69zm-144-64a5 5 0 1 1-2 0v-3.51l48-48V48h32V0h2v50H66v55.41l-48 48v2.69zM50 53.9v43.51l-48 48V208h26.1a5 5 0 1 1 0 2H0v-65.41l48-48V53.9a5 5 0 1 1 2 0zm-16 16V89.41l-34 34v-2.82l32-32V69.9a5 5 0 1 1 2 0zM12.1 32a5 5 0 1 1 0 2H9.41L0 43.41V40.6L8.59 32h3.51zm265.8 18a5 5 0 1 1 0-2h18.69l7.41-7.41v2.82L297.41 50H277.9zm-16 160a5 5 0 1 1 0-2H288v-71.41l16-16v2.82l-14 14V210h-28.1zm-208 32a5 5 0 1 1 0-2H64v-22.59L40.59 194H21.9a5 5 0 1 1 0-2H41.41L66 216.59V242H53.9zm150.2 14a5 5 0 1 1 0 2H96v-56.6L56.6 162H37.9a5 5 0 1 1 0-2h19.5L98 200.6V256h106.1zm-150.2 2a5 5 0 1 1 0-2H80v-46.59L48.59 178H21.9a5 5 0 1 1 0-2H49.41L82 208.59V258H53.9zM34 39.8v1.61L9.41 66H0v-2h8.59L32 40.59V0h2v39.8zM2 300.1a5 5 0 0 1 3.9 3.9H3.83A3 3 0 0 0 0 302.17V256h18v48h-2v-46H2v42.1zM34 241v63h-2v-62H0v-2h34v1zM17 18H0v-2h16V0h2v18h-1zm273-2h14v2h-16V0h2v16zm-32 273v15h-2v-14h-14v14h-2v-16h18v1zM0 92.1A5.02 5.02 0 0 1 6 97a5 5 0 0 1-6 4.9v-2.07a3 3 0 1 0 0-5.66V92.1zM80 272h2v32h-2v-32zm37.9 32h-2.07a3 3 0 0 0-5.66 0h-2.07a5 5 0 0 1 9.8 0zM5.9 0A5.02 5.02 0 0 1 0 5.9V3.83A3 3 0 0 0 3.83 0H5.9zm294.2 0h2.07A3 3 0 0 0 304 3.83V5.9a5 5 0 0 1-3.9-5.9zm3.9 300.1v2.07a3 3 0 0 0-1.83 1.83h-2.07a5 5 0 0 1 3.9-3.9zM97 100a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-48 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 96a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-144a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM49 36a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM33 68a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 240a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm80-176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm112 176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 180a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 84a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'%3E%3C/path%3E%3C/svg%3E");
        }
      `}</style>
        </section>
    );
};

export default HowItWorksSection;