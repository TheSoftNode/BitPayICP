"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bitcoin, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

type StatsData = {
    title: string;
    value: string;
    change: number;
    icon: React.ReactNode;
};

const TransactionsStatsWidget = () => {
    const [timeframe, setTimeframe] = useState<"day" | "week" | "month">("day");
    const [stats, setStats] = useState<StatsData[]>([
        {
            title: "Total Volume",
            value: "$1,248.32",
            change: 18.4,
            icon: <Bitcoin className="h-4 w-4 text-orange-500" />,
        },
        {
            title: "Transactions",
            value: "24",
            change: 12.5,
            icon: <TrendingUp className="h-4 w-4 text-blue-500" />,
        },
        {
            title: "Average Size",
            value: "0.018 BTC",
            change: -3.2,
            icon: <Bitcoin className="h-4 w-4 text-orange-500" />,
        },
        {
            title: "Unique Customers",
            value: "16",
            change: 8.7,
            icon: <TrendingUp className="h-4 w-4 text-blue-500" />,
        },
    ]);

    // Simulate data updates when timeframe changes
    useEffect(() => {
        // This would be replaced with actual API calls
        if (timeframe === "day") {
            setStats([
                {
                    title: "Total Volume",
                    value: "$1,248.32",
                    change: 18.4,
                    icon: <Bitcoin className="h-4 w-4 text-orange-500" />,
                },
                {
                    title: "Transactions",
                    value: "24",
                    change: 12.5,
                    icon: <TrendingUp className="h-4 w-4 text-blue-500" />,
                },
                {
                    title: "Average Size",
                    value: "0.018 BTC",
                    change: -3.2,
                    icon: <Bitcoin className="h-4 w-4 text-orange-500" />,
                },
                {
                    title: "Unique Customers",
                    value: "16",
                    change: 8.7,
                    icon: <TrendingUp className="h-4 w-4 text-blue-500" />,
                },
            ]);
        } else if (timeframe === "week") {
            setStats([
                {
                    title: "Total Volume",
                    value: "$8,724.65",
                    change: 12.3,
                    icon: <Bitcoin className="h-4 w-4 text-orange-500" />,
                },
                {
                    title: "Transactions",
                    value: "142",
                    change: 9.8,
                    icon: <TrendingUp className="h-4 w-4 text-blue-500" />,
                },
                {
                    title: "Average Size",
                    value: "0.021 BTC",
                    change: 2.4,
                    icon: <Bitcoin className="h-4 w-4 text-orange-500" />,
                },
                {
                    title: "Unique Customers",
                    value: "67",
                    change: 15.2,
                    icon: <TrendingUp className="h-4 w-4 text-blue-500" />,
                },
            ]);
        } else {
            setStats([
                {
                    title: "Total Volume",
                    value: "$45,231.89",
                    change: 20.1,
                    icon: <Bitcoin className="h-4 w-4 text-orange-500" />,
                },
                {
                    title: "Transactions",
                    value: "573",
                    change: 16.7,
                    icon: <TrendingUp className="h-4 w-4 text-blue-500" />,
                },
                {
                    title: "Average Size",
                    value: "0.026 BTC",
                    change: 3.5,
                    icon: <Bitcoin className="h-4 w-4 text-orange-500" />,
                },
                {
                    title: "Unique Customers",
                    value: "214",
                    change: 22.3,
                    icon: <TrendingUp className="h-4 w-4 text-blue-500" />,
                },
            ]);
        }
    }, [timeframe]);

    return (
        <Card className="w-full overflow-hidden">
            <CardHeader className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 pb-2 px-4 md:px-6">
                <CardTitle className="text-md font-medium">Transaction Stats</CardTitle>
                <div className="flex flex-wrap items-center gap-2">
                    <Button
                        variant={timeframe === "day" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTimeframe("day")}
                        className={
                            timeframe === "day"
                                ? "bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white text-xs sm:text-sm flex-1 sm:flex-initial"
                                : "text-xs sm:text-sm flex-1 sm:flex-initial"
                        }
                    >
                        Day
                    </Button>
                    <Button
                        variant={timeframe === "week" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTimeframe("week")}
                        className={
                            timeframe === "week"
                                ? "bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white text-xs sm:text-sm flex-1 sm:flex-initial"
                                : "text-xs sm:text-sm flex-1 sm:flex-initial"
                        }
                    >
                        Week
                    </Button>
                    <Button
                        variant={timeframe === "month" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTimeframe("month")}
                        className={
                            timeframe === "month"
                                ? "bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white text-xs sm:text-sm flex-1 sm:flex-initial"
                                : "text-xs sm:text-sm flex-1 sm:flex-initial"
                        }
                    >
                        Month
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="px-4 md:px-6 pb-6">
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="p-3 sm:p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
                        >
                            <div className="flex justify-between items-start mb-1 sm:mb-2">
                                <p className="text-xs sm:text-sm text-muted-foreground">{stat.title}</p>
                                <div className="rounded-full p-1">{stat.icon}</div>
                            </div>
                            <p className="text-lg sm:text-xl md:text-2xl font-bold truncate">{stat.value}</p>
                            <div className="flex items-center mt-1">
                                {stat.change >= 0 ? (
                                    <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-1" />
                                ) : (
                                    <ArrowDownRight className="h-3 w-3 sm:h-4 sm:w-4 text-red-500 mr-1" />
                                )}
                                <p
                                    className={`text-xs ${stat.change >= 0 ? "text-green-500" : "text-red-500"
                                        }`}
                                >
                                    {stat.change >= 0 ? "+" : ""}
                                    {stat.change}%
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default TransactionsStatsWidget;