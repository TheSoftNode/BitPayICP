"use client";

import { useState, useEffect, ReactNode } from "react";
import { motion } from "framer-motion";
import {
    Zap,
    Shield,
    RefreshCw,
    DollarSign,
    Globe,
    Lock,
    ChevronRight
} from "lucide-react";

interface Feature {
    icon: ReactNode;
    title: string;
    description: string;
    gradient: string;
    shadowColor: string;
    highlightColor: string;
}

const features: Feature[] = [
    {
        icon: <Zap className="h-6 w-6" />,
        title: "Instant Settlements",
        description: "Experience near-instant Bitcoin payments with ckBTC on ICP, eliminating long confirmation times.",
        gradient: "from-orange-500 to-yellow-400",
        shadowColor: "orange-500/20",
        highlightColor: "orange-500"
    },
    {
        icon: <Shield className="h-6 w-6" />,
        title: "Fully Decentralized",
        description: "Leverage ICP's blockchain technology for true decentralization without compromising on security.",
        gradient: "from-blue-500 to-indigo-500",
        shadowColor: "blue-500/20",
        highlightColor: "blue-500"
    },
    {
        icon: <RefreshCw className="h-6 w-6" />,
        title: "Bitcoin Integration",
        description: "Direct interaction with the Bitcoin network through ICP's Bitcoin Integration API.",
        gradient: "from-green-500 to-emerald-500",
        shadowColor: "green-500/20",
        highlightColor: "green-500"
    },
    {
        icon: <DollarSign className="h-6 w-6" />,
        title: "Low Transaction Fees",
        description: "Save on transaction costs with ICP's efficient blockchain architecture.",
        gradient: "from-purple-500 to-pink-500",
        shadowColor: "purple-500/20",
        highlightColor: "purple-500"
    },
    {
        icon: <Globe className="h-6 w-6" />,
        title: "Global Payments",
        description: "Accept payments from anywhere in the world without regional restrictions.",
        gradient: "from-cyan-500 to-teal-500",
        shadowColor: "cyan-500/20",
        highlightColor: "cyan-500"
    },
    {
        icon: <Lock className="h-6 w-6" />,
        title: "Chain Key Cryptography",
        description: "Secure transactions using ICP's advanced Threshold Schnorr signatures technology.",
        gradient: "from-red-500 to-orange-500",
        shadowColor: "red-500/20",
        highlightColor: "red-500"
    },
];

interface FeatureCardProps {
    feature: Feature;
    index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Card with gradient border effect */}
            <div className="relative rounded-xl overflow-hidden p-[1px] h-full">
                {/* Animated gradient border */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-30 rounded-xl -z-10 group-hover:opacity-70 transition-opacity duration-300`} />

                {/* Bottom corner decorative element */}
                <div className={`absolute bottom-0 right-0 w-20 h-20 -z-10 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-tl ${feature.gradient} rounded-tl-[40px]`} />

                {/* Main card content */}
                <div className="bg-white dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 h-full flex flex-col relative group-hover:translate-y-[-2px] transition-all duration-300 overflow-hidden">
                    {/* Top decorative line */}
                    <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${feature.gradient}`} />

                    {/* Background decoration */}
                    <div className="absolute -right-12 -bottom-12 w-40 h-40 bg-gradient-to-br from-transparent to-gray-100 dark:to-gray-700/20 rounded-tl-[80px] -z-10" />

                    {/* Feature icon with animated gradient */}
                    <div className="relative mb-5">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white relative z-10`}>
                            <motion.div
                                animate={{ rotate: isHovered ? 360 : 0 }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                            >
                                {feature.icon}
                            </motion.div>
                        </div>
                        <motion.div
                            className={`absolute -inset-1 bg-gradient-to-r ${feature.gradient} rounded-full opacity-30 blur-sm -z-10`}
                            animate={{ scale: isHovered ? 1.2 : 1 }}
                            transition={{ duration: 0.4 }}
                        />
                    </div>

                    {/* Content with slight animations */}
                    <motion.h3
                        className="text-xl font-semibold mb-2"
                        animate={{ x: isHovered ? 3 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {feature.title}
                    </motion.h3>

                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow">
                        {feature.description}
                    </p>

                    {/* Learn more link that appears on hover */}
                    <motion.div
                        className={`text-${feature.highlightColor} text-sm font-medium flex items-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                        animate={{ y: isHovered ? 0 : 5 }}
                        transition={{ duration: 0.2 }}
                    >
                        Learn more <ChevronRight className="h-4 w-4 ml-1" />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};


const FeaturesSection = () => {
    const [activeFeature, setActiveFeature] = useState(null);

    return (
        <section id="features" className="py-16 relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 overflow-hidden">
            {/* Decorative shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-32 -left-24 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute top-[60%] right-1/3 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            {/* Top wave border */}
            <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-[0]">
                <svg className="relative block w-full h-[30px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M1200 120L0 16.48V0h1200v120z" className="fill-white dark:fill-gray-950"></path>
                </svg>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section heading with animated elements */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-block mb-2"
                    >
                        <div className="px-4 py-1 rounded-full bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 text-sm font-medium">
                            Blockchain-Powered Features
                        </div>
                    </motion.div>

                    <motion.h2
                        className="text-3xl font-bold mb-3"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
                            Powerful Features
                        </span>
                    </motion.h2>

                    <motion.p
                        className="text-gray-600 dark:text-gray-400 text-sm md:text-base"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        Our Bitcoin payment system on ICP combines the best of both blockchains to provide a superior payment experience.
                    </motion.p>
                </div>

                {/* Features grid with hexagon pattern background */}
                <div className="relative">
                    <div className="absolute inset-0 bg-hex-pattern opacity-5 dark:opacity-10"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative">
                        {features.map((feature, index) => (
                            <FeatureCard
                                key={index}
                                feature={feature}
                                index={index}
                            />
                        ))}
                    </div>
                </div>

                {/* Section footer with CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="flex justify-center mt-12"
                >
                    <a
                        href="#how-it-works"
                        className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-medium text-sm hover:shadow-lg hover:shadow-orange-500/20 transition-shadow duration-300"
                    >
                        See How It Works
                        <ChevronRight className="h-4 w-4 ml-2" />
                    </a>
                </motion.div>
            </div>

            {/* Bottom wave border */}
            <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] rotate-180">
                <svg className="relative block w-full h-[30px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M1200 120L0 16.48V0h1200v120z" className="fill-white dark:fill-gray-950"></path>
                </svg>
            </div>

            {/* Style for hexagon pattern */}
            <style jsx>{`
        .bg-hex-pattern {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>
        </section>
    );
};

export default FeaturesSection;