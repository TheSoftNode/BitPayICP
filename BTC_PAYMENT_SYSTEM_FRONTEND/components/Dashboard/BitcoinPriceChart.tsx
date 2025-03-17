// "use client";

// import { useState, useEffect } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { TrendingUp, TrendingDown } from "lucide-react";
// import {
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     ResponsiveContainer,
//     AreaChart,
//     Area
// } from "recharts";

// const BitcoinPriceChart = () => {
//     const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d" | "90d">("24h");
//     const [priceData, setPriceData] = useState<any[]>([]);
//     const [currentPrice, setCurrentPrice] = useState<number>(0);
//     const [priceChange, setPriceChange] = useState<number>(0);
//     const [priceChangeAmount, setPriceChangeAmount] = useState<number>(0);
//     const [isLoading, setIsLoading] = useState<boolean>(true);

//     useEffect(() => {
//         const fetchBitcoinData = async () => {
//             setIsLoading(true);
//             try {
//                 // Determine the API endpoint based on the selected time range
//                 let endpoint = '';
//                 switch (timeRange) {
//                     case '24h':
//                         endpoint = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1&interval=hourly';
//                         break;
//                     case '7d':
//                         endpoint = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=daily';
//                         break;
//                     case '30d':
//                         endpoint = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily';
//                         break;
//                     case '90d':
//                         endpoint = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=90&interval=daily';
//                         break;
//                     default:
//                         endpoint = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1&interval=hourly';
//                 }

//                 const response = await fetch(endpoint);
//                 const data = await response.json();

//                 // Format the data for the chart
//                 const formattedData = data.prices.map((price: number[]) => {
//                     const date = new Date(price[0]);
//                     return {
//                         timestamp: date,
//                         price: price[1],
//                         // Format the label based on the selected time range
//                         label: timeRange === '24h'
//                             ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//                             : date.toLocaleDateString([], { month: 'short', day: 'numeric' })
//                     };
//                 });

//                 setPriceData(formattedData);

//                 // Current price is the latest price in the data
//                 const latestPrice = formattedData[formattedData.length - 1].price;
//                 setCurrentPrice(latestPrice);

//                 // Calculate price change
//                 const firstPrice = formattedData[0].price;
//                 const priceDiff = latestPrice - firstPrice;
//                 const percentChange = (priceDiff / firstPrice) * 100;

//                 setPriceChange(parseFloat(percentChange.toFixed(2)));
//                 setPriceChangeAmount(parseFloat(priceDiff.toFixed(2)));
//             } catch (error) {
//                 console.error("Error fetching Bitcoin data:", error);
//                 // Set some fallback data
//                 setCurrentPrice(39981.25);
//                 setPriceChange(1.24);
//                 setPriceChangeAmount(489.56);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchBitcoinData();
//     }, [timeRange]);

//     const isPositiveChange = priceChange >= 0;

//     return (
//         <Card>
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//                 <div>
//                     <CardTitle className="text-md font-medium">Bitcoin Price</CardTitle>
//                     <CardDescription>Current BTC market price</CardDescription>
//                 </div>
//                 <div className="flex flex-wrap items-center gap-2">
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
//                     <h3 className="text-3xl font-bold">${currentPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}</h3>
//                     <div className="ml-2 flex items-center">
//                         {isPositiveChange ? (
//                             <TrendingUp className="text-green-500 h-4 w-4 mr-1" />
//                         ) : (
//                             <TrendingDown className="text-red-500 h-4 w-4 mr-1" />
//                         )}
//                         <span
//                             className={`text-sm font-medium ${isPositiveChange ? "text-green-500" : "text-red-500"}`}
//                         >
//                             {isPositiveChange ? "+" : ""}
//                             {priceChange}% (${Math.abs(priceChangeAmount).toLocaleString(undefined, { maximumFractionDigits: 2 })})
//                         </span>
//                     </div>
//                 </div>

//                 {/* Real Bitcoin price chart */}
//                 <div className="h-64 w-full">
//                     {isLoading ? (
//                         <div className="h-full w-full flex items-center justify-center">
//                             <p>Loading chart data...</p>
//                         </div>
//                     ) : (
//                         <ResponsiveContainer width="100%" height="100%">
//                             <AreaChart
//                                 data={priceData}
//                                 margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
//                             >
//                                 <defs>
//                                     <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
//                                         <stop
//                                             offset="5%"
//                                             stopColor={isPositiveChange ? "#22c55e" : "#ef4444"}
//                                             stopOpacity={0.8}
//                                         />
//                                         <stop
//                                             offset="95%"
//                                             stopColor={isPositiveChange ? "#22c55e" : "#ef4444"}
//                                             stopOpacity={0}
//                                         />
//                                     </linearGradient>
//                                 </defs>
//                                 <CartesianGrid strokeDasharray="3 3" stroke="#55555522" />
//                                 <XAxis
//                                     dataKey="label"
//                                     tick={{ fontSize: 10 }}
//                                     tickCount={5}
//                                     tickMargin={5}
//                                 />
//                                 <YAxis
//                                     domain={['auto', 'auto']}
//                                     tick={{ fontSize: 10 }}
//                                     tickCount={5}
//                                     tickFormatter={(value) => `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
//                                 />
//                                 <Tooltip
//                                     formatter={(value) => [`$${Number(value).toLocaleString(undefined, { maximumFractionDigits: 2 })}`, "BTC Price"]}
//                                     labelFormatter={(label) => `Time: ${label}`}
//                                 />
//                                 <Area
//                                     type="monotone"
//                                     dataKey="price"
//                                     stroke={isPositiveChange ? "#22c55e" : "#ef4444"}
//                                     fillOpacity={1}
//                                     fill="url(#colorPrice)"
//                                 />
//                             </AreaChart>
//                         </ResponsiveContainer>
//                     )}
//                 </div>

//                 {/* Stats */}
//                 <div className="grid grid-cols-3 gap-4 mt-6">
//                     <div className="text-center">
//                         <p className="text-xs text-muted-foreground mb-1">24h High</p>
//                         <p className="font-medium">
//                             ${priceData.length > 0
//                                 ? Math.max(...priceData.map(d => d.price)).toLocaleString(undefined, { maximumFractionDigits: 2 })
//                                 : (currentPrice + 800).toLocaleString()}
//                         </p>
//                     </div>
//                     <div className="text-center">
//                         <p className="text-xs text-muted-foreground mb-1">24h Low</p>
//                         <p className="font-medium">
//                             ${priceData.length > 0
//                                 ? Math.min(...priceData.map(d => d.price)).toLocaleString(undefined, { maximumFractionDigits: 2 })
//                                 : (currentPrice - 500).toLocaleString()}
//                         </p>
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
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    TooltipProps
} from "recharts";
import MarketDataService, { FormattedPriceData } from "./MarketDataService";

type TimeRange = "24h" | "7d" | "30d" | "90d";

interface MarketStats {
    high: number;
    low: number;
    volume: number;
}

const BitcoinPriceChart = () => {
    const [timeRange, setTimeRange] = useState<TimeRange>("24h");
    const [priceData, setPriceData] = useState<FormattedPriceData[]>([]);
    const [currentPrice, setCurrentPrice] = useState<number>(0);
    const [priceChange, setPriceChange] = useState<number>(0);
    const [priceChangeAmount, setPriceChangeAmount] = useState<number>(0);
    const [marketStats, setMarketStats] = useState<MarketStats>({
        high: 0,
        low: 0,
        volume: 0
    });
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

    const fetchBitcoinData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Determine the API interval based on the selected time range
            let interval: string | undefined;
            switch (timeRange) {
                case '24h':
                    interval = 'hourly';
                    break;
                default:
                    interval = 'daily';
            }

            // Get historical price data
            const data = await MarketDataService.getPriceData(
                'bitcoin',
                'usd',
                timeRangeToDays(timeRange),
                interval
            );

            // Format data for chart display
            const formattedData = MarketDataService.formatPriceData(data, timeRange);
            setPriceData(formattedData);

            // Calculate high and low
            const prices = formattedData.map(d => d.price);
            const high = Math.max(...prices);
            const low = Math.min(...prices);

            // Current price is the latest price in the data
            const latestPrice = formattedData[formattedData.length - 1].price;
            setCurrentPrice(latestPrice);

            // Calculate price change
            const firstPrice = formattedData[0].price;
            const priceDiff = latestPrice - firstPrice;
            const percentChange = (priceDiff / firstPrice) * 100;

            setPriceChange(parseFloat(percentChange.toFixed(2)));
            setPriceChangeAmount(parseFloat(priceDiff.toFixed(2)));

            // Get additional market data
            const marketData = await MarketDataService.getCoinMarketData('bitcoin', 'usd');
            setMarketStats({
                high: high,
                low: low,
                volume: marketData.market_data?.total_volume?.usd || 0
            });

            // Update last updated timestamp
            setLastUpdated(new Date());
        } catch (error) {
            console.error("Error fetching Bitcoin data:", error);
            setError("Failed to load Bitcoin data. Please try again later.");

            // Set fallback data
            setCurrentPrice(39981.25);
            setPriceChange(1.24);
            setPriceChangeAmount(489.56);
            setMarketStats({
                high: 40500,
                low: 39000,
                volume: 24800000000 // $24.8B
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Convert time range to days for API
    const timeRangeToDays = (range: TimeRange): number => {
        switch (range) {
            case '24h': return 1;
            case '7d': return 7;
            case '30d': return 30;
            case '90d': return 90;
            default: return 1;
        }
    };

    // Initial data fetch and on timeRange change
    useEffect(() => {
        fetchBitcoinData();

        // Refresh data every 2 minutes
        const intervalId = setInterval(() => {
            fetchBitcoinData();
        }, 120000);

        return () => clearInterval(intervalId);
    }, [timeRange]);

    const isPositiveChange = priceChange >= 0;

    // Format volume with appropriate suffix
    const formatVolume = (volume: number): string => {
        if (volume >= 1e9) {
            return `$${(volume / 1e9).toFixed(1)}B`;
        } else if (volume >= 1e6) {
            return `$${(volume / 1e6).toFixed(1)}M`;
        } else {
            return `$${volume.toLocaleString()}`;
        }
    };

    // Custom tooltip formatter for the chart
    const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-md shadow-md">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
                    <p className="text-sm font-semibold">
                        Price: ${payload[0].value?.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                    <CardTitle className="text-md font-medium flex items-center gap-2">
                        Bitcoin Price
                        <button
                            onClick={fetchBitcoinData}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            title="Refresh data"
                        >
                            <RefreshCw className="h-4 w-4" />
                        </button>
                    </CardTitle>
                    <CardDescription>
                        Last updated: {lastUpdated.toLocaleTimeString()}
                    </CardDescription>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    {(['24h', '7d', '30d', '90d'] as TimeRange[]).map((range) => (
                        <Button
                            key={range}
                            variant={timeRange === range ? "default" : "outline"}
                            size="sm"
                            onClick={() => setTimeRange(range)}
                            className={
                                timeRange === range
                                    ? "bg-gradient-to-r from-violet-600 to-indigo-400 hover:from-violet-700 hover:to-indigo-500 text-white"
                                    : ""
                            }
                        >
                            {range}
                        </Button>
                    ))}
                </div>
            </CardHeader>
            <CardContent>
                {error ? (
                    <div className="text-center py-4 text-red-500">
                        <p>{error}</p>
                        <Button onClick={fetchBitcoinData} className="mt-2">
                            Try Again
                        </Button>
                    </div>
                ) : (
                    <>
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

                        {/* Bitcoin price chart */}
                        <div className="h-64 w-full">
                            {isLoading ? (
                                <div className="h-full w-full flex items-center justify-center">
                                    <div className="animate-pulse flex flex-col items-center">
                                        <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full mb-2"></div>
                                        <p className="text-gray-500 dark:text-gray-400">Loading chart data...</p>
                                    </div>
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
                                                    stopColor={isPositiveChange ? "#8b5cf6" : "#ef4444"}
                                                    stopOpacity={0.8}
                                                />
                                                <stop
                                                    offset="95%"
                                                    stopColor={isPositiveChange ? "#8b5cf6" : "#ef4444"}
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
                                        <Tooltip content={<CustomTooltip />} />
                                        <Area
                                            type="monotone"
                                            dataKey="price"
                                            stroke={isPositiveChange ? "#8b5cf6" : "#ef4444"}
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
                                <p className="text-xs text-muted-foreground mb-1">{timeRange} High</p>
                                <p className="font-medium">
                                    ${marketStats.high.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-xs text-muted-foreground mb-1">{timeRange} Low</p>
                                <p className="font-medium">
                                    ${marketStats.low.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-xs text-muted-foreground mb-1">24h Volume</p>
                                <p className="font-medium">{formatVolume(marketStats.volume)}</p>
                            </div>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default BitcoinPriceChart;