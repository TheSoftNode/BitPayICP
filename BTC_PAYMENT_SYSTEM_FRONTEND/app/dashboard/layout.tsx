"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Code, Menu, Wallet, X } from "lucide-react";

import {
    Home,
    LineChart,
    CreditCard,
    Settings,
    Users,
    HelpCircle,
    LogOut,
    ArrowLeftRight,
} from "lucide-react";
import ThemeToggle from "@/components/Themes/ThemeToggle";

const menuItems = [
    { icon: <Home className="h-5 w-5" />, label: "Dashboard", href: "/dashboard" },
    { icon: <LineChart className="h-5 w-5" />, label: "Analytics", href: "/dashboard/analytics" },
    { icon: <CreditCard className="h-5 w-5" />, label: "Payments", href: "/dashboard/payments" },
    { icon: <Wallet className="h-5 w-5" />, label: "Wallet", href: "/dashboard/wallet" },
    { icon: <ArrowLeftRight className="h-5 w-5" />, label: "Transactions", href: "/dashboard/transactions" },
    { icon: <Users className="h-5 w-5" />, label: "Customers", href: "/dashboard/customers" },
    { icon: <Settings className="h-5 w-5" />, label: "Settings", href: "/dashboard/settings" },
    { icon: <Code className="h-5 w-5" />, label: "Developer", href: "/dashboard/integration" },
    { icon: <HelpCircle className="h-5 w-5" />, label: "Help", href: "/dashboard/help" },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Handle hydration
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-950">
            {/* Mobile Header */}
            <div className="md:hidden bg-white dark:bg-gray-900 flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-[51]">
                <Link href="/" className="flex items-center space-x-2">
                    <div className="relative h-6 w-6">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-full transform rotate-12"></div>
                        <div className="absolute inset-1 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center">
                            <span className="text-orange-500 font-bold text-xs">₿</span>
                        </div>
                    </div>
                    <span className="font-bold text-lg bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
                        BitPay<span className="text-black dark:text-white">ICP</span>
                    </span>
                </Link>

                <div className="flex items-center space-x-2">
                    <ThemeToggle />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-50 bg-white dark:bg-gray-900 pt-16">
                    <div className="flex flex-col p-4 space-y-2">
                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${pathname === item.href
                                    ? "bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
                                    : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                                    }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        ))}
                        <Separator className="my-2" />
                        <Link
                            href="/"
                            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <LogOut className="h-5 w-5" />
                            <span>Return to Website</span>
                        </Link>
                    </div>
                </div>
            )}

            <div className="md:flex flex-col">
                <aside className="hidden md:block w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-fit sticky top-0">
                    <div className="p-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="relative h-7 w-7">
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-full transform rotate-12"></div>
                                <div className="absolute inset-1 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center">
                                    <span className="text-orange-500 font-bold text-xs">₿</span>
                                </div>
                            </div>
                            <span className="font-bold text-lg bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
                                BitPay<span className="text-black dark:text-white">ICP</span>
                            </span>
                        </Link>
                    </div>

                    <div className="py-6 overflow-y-auto">
                        <nav className="px-2 space-y-1">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${pathname === item.href
                                        ? "bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
                                        : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                                        }`}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                    <span className="font-medium text-sm">MR</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Merchant Name</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">merchant@example.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}