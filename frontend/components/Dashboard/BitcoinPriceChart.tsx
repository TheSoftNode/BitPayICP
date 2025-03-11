// "use client";

// import { useState } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { TrendingUp, TrendingDown } from "lucide-react";

// const BitcoinPriceChart = () => {
//     const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d" | "90d">("24h");

//     // Sample data - would come from an API in a real app
//     const currentPrice = 39981.25;
//     const priceChange = 1.24;
//     const priceChangeAmount = 489.56;
//     const isPositiveChange = priceChange > 0;

//     return (
//         <Card>
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//                 <div>
//                     <CardTitle className="text-md font-medium">Bitcoin Price</CardTitle>
//                     <CardDescription>Current BTC market price</CardDescription>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                     <Button
//                         variant={timeRange === "24h" ? "default" : "outline"}
//                         size="sm"
//                         onClick={() => setTimeRange("24h")}
//                         className={
//                             timeRange === "24h"
//                                 ? "bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white"
//                                 : ""
//                         }
//                     >
//                         24h
//                     </Button>
//                     <Button
//                         variant={timeRange === "7d" ? "default" : "outline"}
//                         size="sm"
//                         onClick={() => setTimeRange("7d")}
//                         className={
//                             timeRange === "7d"
//                                 ? "bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white"
//                                 : ""
//                         }
//                     >
//                         7d
//                     </Button>
//                     <Button
//                         variant={timeRange === "30d" ? "default" : "outline"}
//                         size="sm"
//                         onClick={() => setTimeRange("30d")}
//                         className={
//                             timeRange === "30d"
//                                 ? "bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white"
//                                 : ""
//                         }
//                     >
//                         30d
//                     </Button>
//                     <Button
//                         variant={timeRange === "90d" ? "default" : "outline"}
//                         size="sm"
//                         onClick={() => setTimeRange("90d")}
//                         className={
//                             timeRange === "90d"
//                                 ? "bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white"
//                                 : ""
//                         }
//                     >
//                         90d
//                     </Button>
//                 </div>
//             </CardHeader>
//             <CardContent>
//                 <div className="flex items-baseline mb-6">
//                     <h3 className="text-3xl font-bold">${currentPrice.toLocaleString()}</h3>
//                     <div className="ml-2 flex items-center">
//                         {isPositiveChange ? (
//                             <TrendingUp className="text-green-500 h-4 w-4 mr-1" />
//                         ) : (
//                             <TrendingDown className="text-red-500 h-4 w-4 mr-1" />
//                         )}
//                         <span
//                             className={`text-sm font-medium ${isPositiveChange ? "text-green-500" : "text-red-500"
//                                 }`}
//                         >
//                             {isPositiveChange ? "+" : ""}
//                             {priceChange}% (${priceChangeAmount})
//                         </span>
//                     </div>
//                 </div>

//                 {/* Placeholder for chart */}
//                 <div className="h-64 relative">
//                     {/* This would be replaced with an actual chart component */}
//                     <div className="absolute inset-0">
//                         <div
//                             className="w-full h-full bg-gradient-to-r from-transparent via-orange-100 dark:via-orange-950/20 to-transparent"
//                             style={{
//                                 maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
//                                 WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
//                             }}
//                         >
//                             <svg viewBox="0 0 100 20" className="w-full h-full">
//                                 {/* Simplified chart line */}
//                                 <path
//                                     d="M0,10 C10,12 20,8 30,9 C40,10 50,7 60,6 C70,5 80,8 90,7 C95,6.5 100,5 100,5"
//                                     fill="none"
//                                     stroke={isPositiveChange ? "#22c55e" : "#ef4444"}
//                                     strokeWidth="0.5"
//                                 />
//                                 {/* Area under the curve */}
//                                 <path
//                                     d="M0,10 C10,12 20,8 30,9 C40,10 50,7 60,6 C70,5 80,8 90,7 C95,6.5 100,5 100,5 V20 H0 Z"
//                                     fill={`url(#${isPositiveChange ? 'gradient-up' : 'gradient-down'})`}
//                                     opacity="0.2"
//                                 />
//                                 {/* Gradients */}
//                                 <defs>
//                                     <linearGradient id="gradient-up" x1="0%" y1="0%" x2="0%" y2="100%">
//                                         <stop offset="0%" stopColor="#22c55e" />
//                                         <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
//                                     </linearGradient>
//                                     <linearGradient id="gradient-down" x1="0%" y1="0%" x2="0%" y2="100%">
//                                         <stop offset="0%" stopColor="#ef4444" />
//                                         <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
//                                     </linearGradient>
//                                 </defs>
//                             </svg>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Chart period markers */}
//                 <div className="flex justify-between mt-2 px-2">
//                     {timeRange === "24h" && (
//                         <>
//                             <span className="text-xs text-muted-foreground">00:00</span>
//                             <span className="text-xs text-muted-foreground">06:00</span>
//                             <span className="text-xs text-muted-foreground">12:00</span>
//                             <span className="text-xs text-muted-foreground">18:00</span>
//                             <span className="text-xs text-muted-foreground">00:00</span>
//                         </>
//                     )}
//                     {timeRange === "7d" && (
//                         <>
//                             <span className="text-xs text-muted-foreground">Mon</span>
//                             <span className="text-xs text-muted-foreground">Tue</span>
//                             <span className="text-xs text-muted-foreground">Wed</span>
//                             <span className="text-xs text-muted-foreground">Thu</span>
//                             <span className="text-xs text-muted-foreground">Fri</span>
//                             <span className="text-xs text-muted-foreground">Sat</span>
//                             <span className="text-xs text-muted-foreground">Sun</span>
//                         </>
//                     )}
//                     {timeRange === "30d" && (
//                         <>
//                             <span className="text-xs text-muted-foreground">Week 1</span>
//                             <span className="text-xs text-muted-foreground">Week 2</span>
//                             <span className="text-xs text-muted-foreground">Week 3</span>
//                             <span className="text-xs text-muted-foreground">Week 4</span>
//                         </>
//                     )}
//                     {timeRange === "90d" && (
//                         <>
//                             <span className="text-xs text-muted-foreground">Jan</span>
//                             <span className="text-xs text-muted-foreground">Feb</span>
//                             <span className="text-xs text-muted-foreground">Mar</span>
//                         </>
//                     )}
//                 </div>

//                 {/* Stats */}
//                 <div className="grid grid-cols-3 gap-4 mt-6">
//                     <div className="text-center">
//                         <p className="text-xs text-muted-foreground mb-1">24h High</p>
//                         <p className="font-medium">${(currentPrice + 800).toLocaleString()}</p>
//                     </div>
//                     <div className="text-center">
//                         <p className="text-xs text-muted-foreground mb-1">24h Low</p>
//                         <p className="font-medium">${(currentPrice - 500).toLocaleString()}</p>
//                     </div>
//                     <div className="text-center">
//                         <p className="text-xs text-muted-foreground mb-1">24h Volume</p>
//                         <p className="font-medium">$24.8B</p>
//                     </div>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// };

// export default BitcoinPriceChart;

"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from "recharts";

const BitcoinPriceChart = () => {
    const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d" | "90d">("24h");
    const [priceData, setPriceData] = useState<any[]>([]);
    const [currentPrice, setCurrentPrice] = useState<number>(0);
    const [priceChange, setPriceChange] = useState<number>(0);
    const [priceChangeAmount, setPriceChangeAmount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchBitcoinData = async () => {
            setIsLoading(true);
            try {
                // Determine the API endpoint based on the selected time range
                let endpoint = '';
                switch (timeRange) {
                    case '24h':
                        endpoint = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1&interval=hourly';
                        break;
                    case '7d':
                        endpoint = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=daily';
                        break;
                    case '30d':
                        endpoint = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily';
                        break;
                    case '90d':
                        endpoint = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=90&interval=daily';
                        break;
                    default:
                        endpoint = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1&interval=hourly';
                }

                const response = await fetch(endpoint);
                const data = await response.json();

                // Format the data for the chart
                const formattedData = data.prices.map((price: number[]) => {
                    const date = new Date(price[0]);
                    return {
                        timestamp: date,
                        price: price[1],
                        // Format the label based on the selected time range
                        label: timeRange === '24h'
                            ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                            : date.toLocaleDateString([], { month: 'short', day: 'numeric' })
                    };
                });

                setPriceData(formattedData);

                // Current price is the latest price in the data
                const latestPrice = formattedData[formattedData.length - 1].price;
                setCurrentPrice(latestPrice);

                // Calculate price change
                const firstPrice = formattedData[0].price;
                const priceDiff = latestPrice - firstPrice;
                const percentChange = (priceDiff / firstPrice) * 100;

                setPriceChange(parseFloat(percentChange.toFixed(2)));
                setPriceChangeAmount(parseFloat(priceDiff.toFixed(2)));
            } catch (error) {
                console.error("Error fetching Bitcoin data:", error);
                // Set some fallback data
                setCurrentPrice(39981.25);
                setPriceChange(1.24);
                setPriceChangeAmount(489.56);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBitcoinData();
    }, [timeRange]);

    const isPositiveChange = priceChange >= 0;

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                    <CardTitle className="text-md font-medium">Bitcoin Price</CardTitle>
                    <CardDescription>Current BTC market price</CardDescription>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Button
                        variant={timeRange === "24h" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTimeRange("24h")}
                        className={
                            timeRange === "24h"
                                ? "bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white"
                                : ""
                        }
                    >
                        24h
                    </Button>
                    <Button
                        variant={timeRange === "7d" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTimeRange("7d")}
                        className={
                            timeRange === "7d"
                                ? "bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white"
                                : ""
                        }
                    >
                        7d
                    </Button>
                    <Button
                        variant={timeRange === "30d" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTimeRange("30d")}
                        className={
                            timeRange === "30d"
                                ? "bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white"
                                : ""
                        }
                    >
                        30d
                    </Button>
                    <Button
                        variant={timeRange === "90d" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTimeRange("90d")}
                        className={
                            timeRange === "90d"
                                ? "bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white"
                                : ""
                        }
                    >
                        90d
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-baseline mb-6">
                    <h3 className="text-3xl font-bold">${currentPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}</h3>
                    <div className="ml-2 flex items-center">
                        {isPositiveChange ? (
                            <TrendingUp className="text-green-500 h-4 w-4 mr-1" />
                        ) : (
                            <TrendingDown className="text-red-500 h-4 w-4 mr-1" />
                        )}
                        <span
                            className={`text-sm font-medium ${isPositiveChange ? "text-green-500" : "text-red-500"}`}
                        >
                            {isPositiveChange ? "+" : ""}
                            {priceChange}% (${Math.abs(priceChangeAmount).toLocaleString(undefined, { maximumFractionDigits: 2 })})
                        </span>
                    </div>
                </div>

                {/* Real Bitcoin price chart */}
                <div className="h-64 w-full">
                    {isLoading ? (
                        <div className="h-full w-full flex items-center justify-center">
                            <p>Loading chart data...</p>
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={priceData}
                                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                            >
                                <defs>
                                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                        <stop
                                            offset="5%"
                                            stopColor={isPositiveChange ? "#22c55e" : "#ef4444"}
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor={isPositiveChange ? "#22c55e" : "#ef4444"}
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#55555522" />
                                <XAxis
                                    dataKey="label"
                                    tick={{ fontSize: 10 }}
                                    tickCount={5}
                                    tickMargin={5}
                                />
                                <YAxis
                                    domain={['auto', 'auto']}
                                    tick={{ fontSize: 10 }}
                                    tickCount={5}
                                    tickFormatter={(value) => `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                                />
                                <Tooltip
                                    formatter={(value) => [`$${Number(value).toLocaleString(undefined, { maximumFractionDigits: 2 })}`, "BTC Price"]}
                                    labelFormatter={(label) => `Time: ${label}`}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="price"
                                    stroke={isPositiveChange ? "#22c55e" : "#ef4444"}
                                    fillOpacity={1}
                                    fill="url(#colorPrice)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">24h High</p>
                        <p className="font-medium">
                            ${priceData.length > 0
                                ? Math.max(...priceData.map(d => d.price)).toLocaleString(undefined, { maximumFractionDigits: 2 })
                                : (currentPrice + 800).toLocaleString()}
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">24h Low</p>
                        <p className="font-medium">
                            ${priceData.length > 0
                                ? Math.min(...priceData.map(d => d.price)).toLocaleString(undefined, { maximumFractionDigits: 2 })
                                : (currentPrice - 500).toLocaleString()}
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">24h Volume</p>
                        <p className="font-medium">$24.8B</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default BitcoinPriceChart;