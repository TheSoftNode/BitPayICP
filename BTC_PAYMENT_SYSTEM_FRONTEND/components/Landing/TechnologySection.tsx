"use client";

import { useState, useEffect, ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronRight,
    Code,
    Shield,
    Database,
    Key,
    Cpu
} from "lucide-react";

interface Technology {
    id: string;
    name: string;
    description: string;
    features: string[];
    icon: ReactNode;
    color: string;
}

const technologies: Technology[] = [
    {
        id: "ckbtc",
        name: "ckBTC",
        description: "A 1:1 Bitcoin-backed token that enables instant, low-fee BTC transactions on ICP without waiting for traditional Bitcoin confirmations.",
        features: [
            "1:1 Bitcoin backing",
            "ICRC1/ICRC2 token standards",
            "Instant transfers on ICP network",
            "Bidirectional conversion to BTC",
            "Low transaction fees"
        ],
        icon: <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12">
            <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z" fill="currentColor" fillOpacity="0.2" />
            <path d="M16.24 10.773c-.126-1.506-1.395-2.017-3.012-2.183V6.996h-1.325V8.552c-.313 0-.635.008-.957.016V6.996H9.622V8.59c-.266.008-1.129-.007-2.304-.007V10s.943-.017.928 0c.45 0 .524.23.575.401v3.588c-.029.129-.148.325-.455.325l-1.034.015v1.447c1.131 0 2.02 0 2.29 0V17.4h1.325v-1.616c.322.008.644.008.957.008V17.4h1.325v-1.624c2.1-.126 3.584-.689 3.724-2.678.123-1.617-.637-2.265-1.876-2.443.799-.247 1.259-.71 1.164.118zM14.98 13.008c0 1.526-2.502 1.408-3.329 1.408v-2.813c.827 0 3.329-.232 3.329 1.405zm-1.021-2.634c0 1.382-2.099 1.279-2.801 1.279V9.097c.702 0 2.801-.208 2.801 1.277z" fill="white" />
        </svg>,
        color: "from-orange-500 to-yellow-400"
    },
    {
        id: "bitcoin-api",
        name: "Bitcoin Integration API",
        description: "Allows ICP canisters to directly interact with the Bitcoin network, providing a secure bridge between blockchains.",
        features: [
            "UTXO management",
            "Block header queries",
            "Transaction signing",
            "Fee estimation",
            "Bitcoin address generation"
        ],
        icon: <Code className="w-12 h-12" />,
        color: "from-blue-500 to-blue-700"
    },
    {
        id: "chain-key",
        name: "Chain Key Cryptography",
        description: "ICP's advanced cryptographic technology that enables secure transaction signing for Bitcoin using Threshold Schnorr signatures.",
        features: [
            "Threshold Schnorr signatures",
            "Trustless transaction verification",
            "Distributed key management",
            "Byzantine fault tolerance",
            "DDoS resistance"
        ],
        icon: <Key className="w-12 h-12" />,
        color: "from-purple-500 to-indigo-600"
    },
    {
        id: "canisters",
        name: "ICP Smart Contracts (Canisters)",
        description: "Powerful smart contracts that run the entire payment system, offering merchants simple APIs for integration.",
        features: [
            "WebAssembly-based execution",
            "HTTP request capabilities",
            "Actor model concurrency",
            "Orthogonal persistence",
            "Cross-canister calls"
        ],
        icon: <Cpu className="w-12 h-12" />,
        color: "from-green-500 to-teal-600"
    }
];

const TechnologySection = () => {
    const [activeTab, setActiveTab] = useState("ckbtc");
    const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Set loaded state after component mounts to enable animations
    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <section id="technology" className="py-24 relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950/30">
            {/* Top border curve */}
            <div className="absolute top-0 left-0 right-0 w-full overflow-hidden">
                <svg className="relative block w-full h-[70px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        className="fill-indigo-50 dark:fill-slate-900"></path>
                </svg>
            </div>

            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute -top-20 right-1/4 w-[300px] h-[300px] rounded-full bg-purple-200/10 dark:bg-purple-800/5 blur-3xl"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.3, 0.2],
                    }}
                    transition={{ duration: 7, repeat: Infinity }}
                />
                <motion.div
                    className="absolute top-1/3 -left-20 w-[400px] h-[400px] rounded-full bg-green-200/10 dark:bg-green-800/5 blur-3xl"
                    animate={{
                        scale: [1, 0.9, 1],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{ duration: 8, repeat: Infinity, delay: 1 }}
                />

                {/* Digital pattern background */}
                <div className="absolute inset-0 bg-digital-pattern opacity-5 dark:opacity-10"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section heading with animated highlight */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-block mb-2"
                    >
                        <div className="px-4 py-1 rounded-full bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 text-sm font-medium">
                            Cutting-Edge Infrastructure
                        </div>
                    </motion.div>

                    <motion.h2
                        className="text-3xl font-bold mb-3"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                            Core Technologies
                        </span>
                    </motion.h2>

                    <motion.p
                        className="text-gray-600 dark:text-gray-400 text-sm md:text-base"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        Our payment system leverages cutting-edge blockchain technologies from both Bitcoin and Internet Computer Protocol.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <Tabs defaultValue="ckbtc" className="w-full" onValueChange={setActiveTab}>
                        <div className="flex justify-center mb-8">
                            <TabsList className="h-full w-full flex flex-col md:flex-row  gap-4 p-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                                {technologies.map((tech, index) => (
                                    <TabsTrigger
                                        key={tech.id}
                                        value={tech.id}
                                        className={`
                      data-[state=active]:bg-gradient-to-r transition-all duration-300
                      relative overflow-hidden
                      ${activeTab === tech.id ? tech.color : 'hover:bg-white/50 dark:hover:bg-gray-700/50'}
                      data-[state=active]:text-white
                    `}
                                    >
                                        {/* Animated background effect on hover */}
                                        <div className={`absolute inset-0 bg-gradient-to-r ${tech.color} opacity-0 hover:opacity-10 transition-opacity duration-300`}></div>
                                        <span className="relative z-10">{tech.name}</span>
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>

                        <div className="relative">
                            <AnimatePresence mode="wait">
                                {technologies.map((tech) => (
                                    <TabsContent key={tech.id} value={tech.id} className="mt-0">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.5 }}
                                            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700"
                                        >
                                            {/* Animated gradient border */}
                                            <div className="relative h-2 overflow-hidden">
                                                <div className={`absolute inset-0 bg-gradient-to-r ${tech.color}`}></div>
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

                                            <div className="p-8 flex flex-col md:flex-row gap-8">
                                                <div className="w-full md:w-2/3">
                                                    <div className="flex items-center mb-4">
                                                        <motion.div
                                                            initial={{ opacity: 0, scale: 0.8 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ duration: 0.5 }}
                                                            className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tech.color} flex items-center justify-center text-white mr-4`}
                                                        >
                                                            {tech.icon}
                                                        </motion.div>
                                                        <motion.h3
                                                            className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent"
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ duration: 0.5, delay: 0.2 }}
                                                        >
                                                            {tech.name}
                                                        </motion.h3>
                                                    </div>

                                                    <motion.p
                                                        className="text-gray-600 dark:text-gray-400 mb-6"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ duration: 0.5, delay: 0.3 }}
                                                    >
                                                        {tech.description}
                                                    </motion.p>

                                                    <motion.h4
                                                        className="font-semibold mb-3 text-gray-900 dark:text-gray-100 relative inline-block"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ duration: 0.5, delay: 0.4 }}
                                                    >
                                                        Key Features:
                                                        <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${tech.color}`}></div>
                                                    </motion.h4>

                                                    <motion.ul
                                                        className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ duration: 0.5, delay: 0.5 }}
                                                    >
                                                        {tech.features.map((feature, idx) => (
                                                            <motion.li
                                                                key={idx}
                                                                className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-200 cursor-pointer"
                                                                onMouseEnter={() => setHoveredFeature(`${tech.id}-${idx}`)}
                                                                onMouseLeave={() => setHoveredFeature(null)}
                                                                whileHover={{ x: 5 }}
                                                            >
                                                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${tech.color}`}></div>
                                                                <span className="text-sm relative">
                                                                    {feature}
                                                                    {hoveredFeature === `${tech.id}-${idx}` && (
                                                                        <motion.div
                                                                            className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gray-300 dark:bg-gray-600"
                                                                            layoutId="featureHighlight"
                                                                            initial={{ width: 0 }}
                                                                            animate={{ width: "100%" }}
                                                                            transition={{ duration: 0.2 }}
                                                                        />
                                                                    )}
                                                                </span>
                                                            </motion.li>
                                                        ))}
                                                    </motion.ul>

                                                    {/* Specialized content based on technology type */}
                                                    <AnimatePresence>
                                                        {tech.id === "ckbtc" && (
                                                            <motion.div
                                                                className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
                                                                initial={{ opacity: 0, y: 20 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0, y: -20 }}
                                                                transition={{ duration: 0.5 }}
                                                            >
                                                                <h4 className="font-semibold mb-3">ckBTC Workflow:</h4>
                                                                <div className="flex items-center justify-between relative">
                                                                    {/* Progress steps */}
                                                                    <div className="text-center z-10">
                                                                        <motion.div
                                                                            className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center text-white mb-2"
                                                                            whileHover={{ scale: 1.1 }}
                                                                            transition={{ duration: 0.2 }}
                                                                        >
                                                                            <span className="text-xs">₿</span>
                                                                        </motion.div>
                                                                        <div className="text-xs">Bitcoin</div>
                                                                    </div>

                                                                    <div className="text-center z-10">
                                                                        <motion.div
                                                                            className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white mb-2"
                                                                            whileHover={{ scale: 1.1 }}
                                                                            transition={{ duration: 0.2 }}
                                                                        >
                                                                            <span className="text-xs">ck₿</span>
                                                                        </motion.div>
                                                                        <div className="text-xs">ckBTC</div>
                                                                    </div>

                                                                    <div className="text-center z-10">
                                                                        <motion.div
                                                                            className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white mb-2"
                                                                            whileHover={{ scale: 1.1 }}
                                                                            transition={{ duration: 0.2 }}
                                                                        >
                                                                            <span className="text-xs">$</span>
                                                                        </motion.div>
                                                                        <div className="text-xs">Merchant</div>
                                                                    </div>

                                                                    {/* Animated connection lines */}
                                                                    <div className="absolute top-6 left-0 right-0 h-0.5 flex items-center justify-center">
                                                                        {/* Bitcoin to ckBTC line */}
                                                                        <div className="w-1/3 relative h-0.5">
                                                                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-blue-500"></div>
                                                                            <motion.div
                                                                                className="absolute top-0 bottom-0 w-4 bg-white/70 dark:bg-white/30 blur-sm"
                                                                                animate={{
                                                                                    left: ["-10%", "100%"],
                                                                                }}
                                                                                transition={{
                                                                                    duration: 2,
                                                                                    repeat: Infinity,
                                                                                    repeatType: "loop"
                                                                                }}
                                                                            />
                                                                        </div>

                                                                        {/* ckBTC to Merchant line */}
                                                                        <div className="w-1/3 relative h-0.5">
                                                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500"></div>
                                                                            <motion.div
                                                                                className="absolute top-0 bottom-0 w-4 bg-white/70 dark:bg-white/30 blur-sm"
                                                                                animate={{
                                                                                    left: ["-10%", "100%"],
                                                                                }}
                                                                                transition={{
                                                                                    duration: 2,
                                                                                    repeat: Infinity,
                                                                                    repeatType: "loop",
                                                                                    delay: 1
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        )}

                                                        {tech.id === "bitcoin-api" && (
                                                            <motion.div
                                                                className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
                                                                initial={{ opacity: 0, y: 20 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0, y: -20 }}
                                                                transition={{ duration: 0.5 }}
                                                            >
                                                                <h4 className="font-semibold mb-3">API Endpoints:</h4>
                                                                <div className="space-y-2 font-mono text-xs">
                                                                    <motion.div
                                                                        className="p-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700"
                                                                        initial={{ opacity: 0, x: -20 }}
                                                                        animate={{ opacity: 1, x: 0 }}
                                                                        transition={{ duration: 0.3 }}
                                                                        whileHover={{ x: 5, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                                                                    >
                                                                        get_utxos(p: GetUtxosRequest) → GetUtxosResponse
                                                                    </motion.div>
                                                                    <motion.div
                                                                        className="p-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700"
                                                                        initial={{ opacity: 0, x: -20 }}
                                                                        animate={{ opacity: 1, x: 0 }}
                                                                        transition={{ duration: 0.3, delay: 0.1 }}
                                                                        whileHover={{ x: 5, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                                                                    >
                                                                        get_balance(p: GetBalanceRequest) → Satoshi
                                                                    </motion.div>
                                                                    <motion.div
                                                                        className="p-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700"
                                                                        initial={{ opacity: 0, x: -20 }}
                                                                        animate={{ opacity: 1, x: 0 }}
                                                                        transition={{ duration: 0.3, delay: 0.2 }}
                                                                        whileHover={{ x: 5, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                                                                    >
                                                                        send_transaction(p: SendTransactionRequest) → SendTransactionResponse
                                                                    </motion.div>
                                                                </div>
                                                            </motion.div>
                                                        )}

                                                        {tech.id === "chain-key" && (
                                                            <motion.div
                                                                className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
                                                                initial={{ opacity: 0, y: 20 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0, y: -20 }}
                                                                transition={{ duration: 0.5 }}
                                                            >
                                                                <h4 className="font-semibold mb-3">Security Architecture:</h4>
                                                                <div className="relative h-36 flex items-center justify-center">
                                                                    {/* Central node */}
                                                                    <motion.div
                                                                        className="relative z-20"
                                                                        animate={{
                                                                            scale: [1, 1.05, 1],
                                                                        }}
                                                                        transition={{ duration: 3, repeat: Infinity }}
                                                                    >
                                                                        <div className="w-16 h-16 bg-purple-500/20 dark:bg-purple-500/30 rounded-full flex items-center justify-center">
                                                                            <div className="w-12 h-12 bg-purple-500/30 dark:bg-purple-500/50 rounded-full flex items-center justify-center">
                                                                                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                                                                                    <Shield className="w-4 h-4 text-white" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </motion.div>

                                                                    {/* Orbiting nodes */}
                                                                    <div className="absolute inset-0">
                                                                        {[...Array(5)].map((_, i) => (
                                                                            <motion.div
                                                                                key={i}
                                                                                className="absolute w-8 h-8"
                                                                                style={{
                                                                                    left: '50%',
                                                                                    top: '50%',
                                                                                    marginLeft: '-16px',
                                                                                    marginTop: '-16px',
                                                                                }}
                                                                                animate={{
                                                                                    rotate: [0, 360],
                                                                                }}
                                                                                transition={{
                                                                                    duration: 15,
                                                                                    repeat: Infinity,
                                                                                    delay: i * 0.5,
                                                                                    ease: "linear"
                                                                                }}
                                                                            >
                                                                                <motion.div
                                                                                    className="relative"
                                                                                    style={{
                                                                                        left: `${Math.cos(i * (2 * Math.PI / 5)) * 60}px`,
                                                                                        top: `${Math.sin(i * (2 * Math.PI / 5)) * 60}px`,
                                                                                    }}
                                                                                >
                                                                                    <motion.div
                                                                                        className="w-6 h-6 bg-purple-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center"
                                                                                        whileHover={{ scale: 1.2 }}
                                                                                    >
                                                                                        <Key className="w-3 h-3 text-white" />
                                                                                    </motion.div>
                                                                                </motion.div>
                                                                            </motion.div>
                                                                        ))}
                                                                    </div>

                                                                    {/* Connection lines */}
                                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                                        <svg className="w-full h-full" viewBox="0 0 200 200">
                                                                            <defs>
                                                                                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                                                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
                                                                                    <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.3" />
                                                                                </linearGradient>
                                                                            </defs>
                                                                            {[...Array(5)].map((_, i) => {
                                                                                const angle = i * (2 * Math.PI / 5);
                                                                                const x = 100 + 60 * Math.cos(angle);
                                                                                const y = 100 + 60 * Math.sin(angle);
                                                                                return (
                                                                                    <motion.line
                                                                                        key={i}
                                                                                        x1="100"
                                                                                        y1="100"
                                                                                        x2={x}
                                                                                        y2={y}
                                                                                        stroke="url(#lineGradient)"
                                                                                        strokeWidth="1.5"
                                                                                        strokeDasharray="3,3"
                                                                                        initial={{ opacity: 0 }}
                                                                                        animate={{ opacity: 1 }}
                                                                                        transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                                                                    />
                                                                                );
                                                                            })}
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        )}

                                                        {tech.id === "canisters" && (
                                                            <motion.div
                                                                className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
                                                                initial={{ opacity: 0, y: 20 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0, y: -20 }}
                                                                transition={{ duration: 0.5 }}
                                                            >
                                                                <h4 className="font-semibold mb-3">Canister Architecture:</h4>
                                                                <div className="flex justify-between py-2">
                                                                    {["API Canister", "Ledger Canister", "BTC Adapter"].map((name, i) => (
                                                                        <motion.div
                                                                            key={name}
                                                                            className="w-28 h-20 bg-green-500/10 dark:bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-lg flex flex-col items-center justify-center shadow-sm"
                                                                            initial={{ opacity: 0, y: 20 }}
                                                                            animate={{ opacity: 1, y: 0 }}
                                                                            transition={{ duration: 0.5, delay: 0.1 * i }}
                                                                            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(34, 197, 94, 0.3)" }}
                                                                        >
                                                                            <Database className="w-5 h-5 text-green-600 dark:text-green-400 mb-1" />
                                                                            <span className="text-xs font-medium text-center px-2">{name}</span>
                                                                        </motion.div>
                                                                    ))}
                                                                </div>
                                                                <motion.div
                                                                    className="mt-4 h-12 relative overflow-hidden rounded-lg border border-green-500/20"
                                                                    initial={{ opacity: 0 }}
                                                                    animate={{ opacity: 1 }}
                                                                    transition={{ duration: 0.5, delay: 0.4 }}>
                                                                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-teal-500/5"></div>
                                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                                        <code className="text-xs font-mono text-green-700 dark:text-green-400">ICP Canister Communication Protocol</code>
                                                                    </div>
                                                                    <motion.div
                                                                        className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-green-500/10 to-transparent"
                                                                        animate={{
                                                                            x: ['-100%', '500%'],
                                                                        }}
                                                                        transition={{
                                                                            duration: 3,
                                                                            repeat: Infinity,
                                                                            ease: "linear"
                                                                        }}
                                                                    />
                                                                </motion.div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>

                                                <div className="w-full md:w-1/3 flex items-center justify-center">
                                                    <motion.div
                                                        className={`relative w-52 h-52 rounded-full bg-gradient-to-br ${tech.color} p-10 flex items-center justify-center`}
                                                        initial={{ opacity: 0, rotate: 15 }}
                                                        animate={{
                                                            opacity: 1,
                                                            rotate: 0,
                                                            boxShadow: [
                                                                `0 0 20px 0 rgba(0,0,0,0.1)`,
                                                                `0 0 60px 0 rgba(0,0,0,0.2)`,
                                                                `0 0 20px 0 rgba(0,0,0,0.1)`
                                                            ]
                                                        }}
                                                        transition={{ duration: 0.8 }}
                                                    >
                                                        {/* Tech logo with animated background */}
                                                        <div className="absolute inset-3 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                                                            <motion.div
                                                                className="text-white text-6xl font-bold relative z-10 flex items-center justify-center"
                                                                animate={{
                                                                    scale: [1, 1.05, 1],
                                                                }}
                                                                transition={{ duration: 4, repeat: Infinity }}
                                                            >
                                                                {tech.id === "ckbtc" && <span className="text-white text-5xl font-bold">ck₿</span>}
                                                                {tech.id === "bitcoin-api" && <span className="text-white text-3xl font-bold">API</span>}
                                                                {tech.id === "chain-key" && <span className="text-white text-5xl">🔑</span>}
                                                                {tech.id === "canisters" && <span className="text-white text-4xl font-bold">{ }</span>}
                                                            </motion.div>

                                                            {/* Background pattern animation */}
                                                            <motion.div
                                                                className="absolute inset-0 opacity-10"
                                                                animate={{
                                                                    backgroundPosition: ['0% 0%', '100% 100%']
                                                                }}
                                                                transition={{ duration: 20, repeat: Infinity, repeatType: "mirror" }}
                                                                style={{
                                                                    backgroundSize: '10px 10px',
                                                                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)'
                                                                }}
                                                            />
                                                        </div>

                                                        {/* Animated outer ring */}
                                                        <motion.div
                                                            className="absolute -inset-2 rounded-full border-2 border-white/20"
                                                            animate={{ rotate: 360 }}
                                                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                                        >
                                                            {/* Decorative knobs on the ring */}
                                                            {[...Array(8)].map((_, i) => (
                                                                <motion.div
                                                                    key={i}
                                                                    className="absolute w-2 h-2 bg-white rounded-full"
                                                                    style={{
                                                                        left: '50%',
                                                                        top: `${i % 2 === 0 ? '-3px' : 'calc(100% - 3px)'}`,
                                                                        transform: `translateX(-50%) rotate(${i * 45}deg) translateY(${i % 2 === 0 ? '-' : ''}calc(50% - 5px)) rotate(${-i * 45}deg)`,
                                                                    }}
                                                                />
                                                            ))}
                                                        </motion.div>
                                                    </motion.div>
                                                </div>
                                            </div>

                                            {/* Bottom action button */}
                                            <div className="px-8 pb-8 flex justify-end">
                                                <motion.button
                                                    className={`text-sm flex items-center px-5 py-2 rounded-full bg-gradient-to-r ${tech.color} text-white font-medium shadow-lg ${tech.id === 'ckbtc' ? 'shadow-orange-500/20' : tech.id === 'bitcoin-api' ? 'shadow-blue-500/20' : tech.id === 'chain-key' ? 'shadow-purple-500/20' : 'shadow-green-500/20'}`}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    Learn more about {tech.name}
                                                    <ChevronRight className="h-4 w-4 ml-1" />
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    </TabsContent>
                                ))}
                            </AnimatePresence>
                        </div>
                    </Tabs>
                </motion.div>

                {/* Circle progress indicators */}
                <div className="flex justify-center mt-8 space-x-2">
                    {technologies.map((tech) => (
                        <button
                            key={tech.id}
                            onClick={() => setActiveTab(tech.id)}
                            className={`w-2 h-2 rounded-full ${activeTab === tech.id
                                ? `bg-gradient-to-r ${tech.color} w-8`
                                : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
                                } transition-all duration-300`}
                            aria-label={`Go to ${tech.name}`}
                        />
                    ))}
                </div>
            </div>


            {/* Style for digital pattern */}
            <style jsx>{`
        .bg-digital-pattern {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M0 0h20L0 20z'/%3E%3Cpath d='M20 0v20H0z' fill-opacity='.2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>
        </section>
    );
};

export default TechnologySection;