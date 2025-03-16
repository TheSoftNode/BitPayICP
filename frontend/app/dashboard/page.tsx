"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import TransactionsStatsWidget from "@/components/Dashboard/TransactionsStatsWidget";
import BitcoinPriceChart from "@/components/Dashboard/BitcoinPriceChart";
import RecentActivityWidget from "@/components/Dashboard/RecentActivityWidget";
import ThemeToggle from "@/components/Themes/ThemeToggle";
import { useRouter } from "next/navigation";
import WalletWidgetPreview from "@/components/Dashboard/WalletWidgetPreview";

export default function DashboardPage() {
    const router = useRouter();

    // Navigate to wallet page
    const navigateToWallet = () => {
        router.push("/dashboard/wallet");
    };

    return (
        <div className="flex flex-col min-h-screen w-full">
            <div className="flex-1 space-y-6 p-4 sm:p-6 md:p-8 pt-6 max-w-[1600px] mx-auto w-full">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h2>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <div className="hidden md:flex">
                            <ThemeToggle />
                        </div>
                        <Button variant="outline" size="sm" className="text-xs sm:text-sm flex-grow sm:flex-grow-0">
                            <Download className="mr-1 sm:mr-2 h-4 w-4" />
                            <span className="hidden xs:inline">Download</span> Report
                        </Button>
                        <Button
                            size="sm"
                            className="bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white text-xs sm:text-sm flex-grow sm:flex-grow-0"
                        >
                            <Plus className="mr-1 sm:mr-2 h-4 w-4" />
                            <span className="hidden xs:inline">Create</span> Payment
                        </Button>
                    </div>
                </div>

                {/* Transaction Stats */}
                <div className="w-full">
                    <TransactionsStatsWidget />
                </div>

                {/* Main Widgets - Primary Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {/* Bitcoin Price Chart */}
                    <div className="md:col-span-2 lg:col-span-2">
                        <BitcoinPriceChart />
                    </div>

                    {/* Recent Activity Widget */}
                    <div className="order-1 md:order-none md:row-span-2 md:col-span-1">
                        <RecentActivityWidget />
                    </div>

                    {/* Middle Row Widgets - 2-column subgrid */}
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Wallet Widget Preview */}
                        <div
                            className="cursor-pointer w-full h-full transition-transform hover:scale-[1.01]"
                            onClick={navigateToWallet}
                        >
                            <WalletWidgetPreview />
                        </div>

                        {/* Quick Stats Card */}
                        <div className="w-full h-full">
                            <Card className="h-full">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-md font-medium">Quick Stats</CardTitle>
                                    <CardDescription>Overview of your merchant account</CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col justify-between h-[calc(100%-5rem)]">
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="p-3 bg-muted/50 rounded-lg">
                                                <p className="text-xs text-muted-foreground">Total Sales</p>
                                                <p className="text-lg font-bold">$23,489.25</p>
                                            </div>
                                            <div className="p-3 bg-muted/50 rounded-lg">
                                                <p className="text-xs text-muted-foreground">Customers</p>
                                                <p className="text-lg font-bold">148</p>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                            <div>
                                                <p className="text-sm font-medium">All Systems Operational</p>
                                                <p className="text-xs text-muted-foreground">Uptime: 99.98%</p>
                                            </div>
                                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                        </div>
                                    </div>

                                    <Button
                                        variant="outline"
                                        className="w-full mt-4"
                                        onClick={() => router.push("/dashboard/integration")}
                                    >
                                        Go to Developer Tools
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Analytics Section */}
                <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
                    {/* Payment Volume Chart */}
                    <Card className="col-span-full lg:col-span-4">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg md:text-xl">Payment Volume</CardTitle>
                            <CardDescription className="text-xs md:text-sm">
                                Bitcoin payment volume over time
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="h-64 md:h-80">
                            {/* Placeholder for chart */}
                            <div className="w-full h-full bg-muted/30 rounded-lg flex items-center justify-center">
                                <p className="text-muted-foreground text-sm">Payment Volume Chart</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment Method Distribution */}
                    <Card className="col-span-full lg:col-span-3">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg md:text-xl">Payment Methods</CardTitle>
                            <CardDescription className="text-xs md:text-sm">
                                Distribution by payment type
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="h-64 md:h-80">
                            {/* Placeholder for chart */}
                            <div className="w-full h-full bg-muted/30 rounded-lg flex items-center justify-center">
                                <p className="text-muted-foreground text-sm">Payment Methods Chart</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* System Status Section */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg md:text-xl">System Status</CardTitle>
                        <CardDescription className="text-xs md:text-sm">
                            Current status of the Bitcoin payment infrastructure
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Status Items with consistent height and styling */}
                            {[
                                { name: "Bitcoin Network", status: "Operational" },
                                { name: "ICP Network", status: "Operational" },
                                { name: "ckBTC Minting", status: "Operational" },
                                { name: "API Services", status: "Operational" }
                            ].map((item, index) => (
                                <div key={index} className="flex items-center p-4 bg-green-100 dark:bg-green-900/30 rounded-lg h-full">
                                    <div className="w-3 h-3 rounded-full bg-green-500 mr-3 flex-shrink-0"></div>
                                    <div>
                                        <p className="text-sm font-medium">{item.name}</p>
                                        <p className="text-xs text-muted-foreground">{item.status}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}