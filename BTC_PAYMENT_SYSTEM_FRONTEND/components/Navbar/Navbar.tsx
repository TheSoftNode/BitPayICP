"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import ThemeToggle from "../Themes/ThemeToggle";
import WalletConnectButton from "../Wallet/WalletConnectButton";
import { Menu, X, ChevronDown, Bitcoin, Shield, Zap, BarChart } from "lucide-react";
import {
    IdentityKitProvider,
} from "@nfid/identitykit/react";
import {
    NFIDW,
    Plug,
    InternetIdentity,
    Stoic,
    OISY
} from "@nfid/identitykit";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Handle hydration
    useEffect(() => {
        setMounted(true);
    }, []);

    // Close mobile menu when viewport changes to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleConnectSuccess = () => {
        console.log("Wallet connected successfully");
    };

    const handleConnectFailure = (error: any) => {
        console.error("Wallet connection failed:", error);
    };

    const handleDisconnect = () => {
        console.log("Wallet disconnected");
    };

    if (!mounted) return null;

    const navLinks = [
        { href: "#features", label: "Features", icon: <Shield className="w-4 h-4 mr-2" /> },
        { href: "#how-it-works", label: "How It Works", icon: <Zap className="w-4 h-4 mr-2" /> },
        { href: "#technology", label: "Technology", icon: <Bitcoin className="w-4 h-4 mr-2" /> },
        { href: "#stats", label: "Analytics", icon: <BarChart className="w-4 h-4 mr-2" /> }
    ];

    // Supported wallets in preferred order
    const supportedWallets = [NFIDW, Plug, InternetIdentity, Stoic, OISY];

    return (
        <IdentityKitProvider
            signers={supportedWallets}
            onConnectSuccess={handleConnectSuccess}
            onConnectFailure={handleConnectFailure}
            onDisconnect={handleDisconnect}
        >
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md py-3"
                    : "bg-transparent py-5"
                    }`}
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">

                        <Link href="/" className="flex items-center space-x-2 group">
                            <motion.div
                                className="relative h-8 w-8"
                                whileHover={{ rotate: 12, scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-full transform group-hover:rotate-12 transition-transform duration-300"></div>
                                <div className="absolute inset-1 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center">
                                    <motion.span
                                        className="text-orange-500 font-bold text-xs"
                                        animate={{
                                            scale: [1, 1.1, 1],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            repeatType: "reverse"
                                        }}
                                    >
                                        ₿
                                    </motion.span>
                                </div>
                            </motion.div>
                            <span className="font-bold text-xl bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
                                BitPay<span className="text-black dark:text-white">ICP</span>
                            </span>
                        </Link>

                        {/* Desktop Navigation with animations */}
                        <div className="hidden md:flex items-center space-x-6">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        className="text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors flex items-center py-2"
                                    >
                                        <span className="relative overflow-hidden group">
                                            {link.label}
                                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-600 to-orange-400 group-hover:w-full transition-all duration-300"></span>
                                        </span>
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Link href="/dashboard">
                                    <Button
                                        className="bg-gradient-to-r from-violet-600 to-indigo-400 hover:from-violet-700 hover:to-indigo-500 text-white shadow-md hover:shadow-lg transition-shadow"
                                        size="sm"
                                    >
                                        Dashboard
                                    </Button>
                                </Link>
                            </motion.div>

                            {/* Wallet Connect Button - Desktop Version */}
                            <div className="hidden md:block">
                                <WalletConnectButton isMobile={false} />
                            </div>
                        </div>

                        {/* Theme Toggle and Mobile Menu */}
                        <div className="flex items-center space-x-2">
                            {/* Wallet Connect Button for mobile - Compact Version */}
                            <div className="md:hidden">
                                <WalletConnectButton isMobile={true} />
                            </div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <ThemeToggle />
                            </motion.div>

                            {/* Mobile Menu Button */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 }}
                                className="md:hidden block"
                            >
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                                    aria-label="Menu"
                                    onClick={toggleMobileMenu}
                                >
                                    {isMobileMenuOpen ? (
                                        <X className="w-5 h-5" />
                                    ) : (
                                        <Menu className="w-5 h-5" />
                                    )}
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Dropdown with animation */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-[100] md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Backdrop */}
                        <motion.div
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleMobileMenu}
                        />

                        {/* Menu Content */}
                        <motion.div
                            className="absolute top-0 right-0 h-screen w-4/5 max-w-sm bg-white dark:bg-gray-900 shadow-xl"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        >
                            <div className="overflow-y-auto h-full py-6 px-6">
                                {/* Mobile Header */}
                                <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
                                    <Link href="/" className="flex items-center space-x-2 group">
                                        <motion.div
                                            className="relative h-8 w-8"
                                            whileHover={{ rotate: 12, scale: 1.05 }}
                                            transition={{ type: "spring", stiffness: 400 }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-full transform group-hover:rotate-12 transition-transform duration-300"></div>
                                            <div className="absolute inset-1 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center">
                                                <motion.span
                                                    className="text-orange-500 font-bold text-xs"
                                                    animate={{
                                                        scale: [1, 1.1, 1],
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        repeatType: "reverse"
                                                    }}
                                                >
                                                    ₿
                                                </motion.span>
                                            </div>
                                        </motion.div>
                                        <span className="font-bold text-xl bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
                                            BitPay<span className="text-black dark:text-white">ICP</span>
                                        </span>
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                                        aria-label="Close Menu"
                                        onClick={toggleMobileMenu}
                                    >
                                        <X className="w-5 h-5" />
                                    </Button>
                                </div>

                                {/* Mobile Navigation Links */}
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm flex items-center">
                                            <span className="inline-block w-6 h-0.5 bg-violet-500 mr-2"></span>
                                            Main Navigation
                                        </h3>
                                        <div className="space-y-1 pl-2">
                                            {navLinks.map((link, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                >
                                                    <Link
                                                        href={link.href}
                                                        className="flex items-center py-3 px-4 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-violet-600 dark:hover:text-violet-400 transition-colors group"
                                                        onClick={toggleMobileMenu}
                                                    >
                                                        {link.icon}
                                                        <span>{link.label}</span>
                                                        <motion.div
                                                            className="ml-auto opacity-0 group-hover:opacity-100"
                                                            initial={{ x: -5 }}
                                                            animate={{ x: 0 }}
                                                            transition={{ duration: 0.2 }}
                                                        >
                                                            <ChevronDown className="w-4 h-4 transform -rotate-90" />
                                                        </motion.div>
                                                    </Link>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Secondary Links */}
                                    <div className="space-y-3">
                                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm flex items-center">
                                            <span className="inline-block w-6 h-0.5 bg-violet-500 mr-2"></span>
                                            Resources
                                        </h3>
                                        <div className="space-y-1 pl-2">
                                            {[
                                                { label: "Documentation", href: "/docs" },
                                                { label: "API Reference", href: "/api" },
                                                { label: "Blog", href: "/blog" }
                                            ].map((link, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.4 + index * 0.1 }}
                                                >
                                                    <Link
                                                        href={link.href}
                                                        className="flex items-center py-2 px-4 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-violet-600 dark:hover:text-violet-400 transition-colors text-sm"
                                                        onClick={toggleMobileMenu}
                                                    >
                                                        {link.label}
                                                    </Link>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Wallet Connect in Mobile Menu */}
                                    <motion.div
                                        className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7 }}
                                    >
                                        <div className="mb-4 flex justify-center">
                                            <WalletConnectButton isMobile={false} /> {/* Full-sized in the menu */}
                                        </div>
                                    </motion.div>

                                    {/* Dashboard Button */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.8 }}
                                    >
                                        <Link href="/dashboard" onClick={toggleMobileMenu}>
                                            <Button className="w-full bg-gradient-to-r from-violet-600 to-indigo-400 hover:from-violet-700 hover:to-indigo-500 text-white">
                                                Go to Dashboard
                                            </Button>
                                        </Link>
                                    </motion.div>

                                    {/* Contact Information */}
                                    <motion.div
                                        className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.9 }}
                                    >
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            <p>Have questions? Contact us at:</p>
                                            <p className="mt-1 font-medium text-gray-700 dark:text-gray-300">info@bitpayicp.com</p>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </IdentityKitProvider>
    );
};

export default Navbar;