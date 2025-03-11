"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownUp, Bitcoin, Info } from "lucide-react";
import { Switch } from "@/components/ui/switch";

type ConversionWidgetProps = {
    // Optional callback for when conversion is executed
    onConvert?: (fromCurrency: string, toCurrency: string, amount: string) => void;
    // Optional flag for if this is rendered in a dialog
    isInDialog?: boolean;
};

const ConversionWidget = ({ onConvert, isInDialog = false }: ConversionWidgetProps) => {
    const [fromAmount, setFromAmount] = useState("");
    const [fromCurrency, setFromCurrency] = useState("ckBTC");
    const [toCurrency, setToCurrency] = useState("USDC");
    const [isAutoConvert, setIsAutoConvert] = useState(false);

    // Exchange rates (sample data)
    const exchangeRates = {
        "ckBTC-USDC": 39890.32,
        "ckBTC-USDT": 39880.15,
        "USDC-ckBTC": 1 / 39890.32,
        "USDT-ckBTC": 1 / 39880.15,
        "USDC-USDT": 0.9998,
        "USDT-USDC": 1.0002,
    };

    // Calculate conversion rate
    const getRate = () => {
        const key = `${fromCurrency}-${toCurrency}`;
        return exchangeRates[key as keyof typeof exchangeRates] || 0;
    };

    // Calculate converted amount
    const getConvertedAmount = () => {
        if (!fromAmount) return "0";
        const amount = parseFloat(fromAmount);
        if (isNaN(amount)) return "0";
        const rate = getRate();
        return (amount * rate).toFixed(
            toCurrency === "ckBTC" ? 8 : 2
        );
    };

    // Swap currencies
    const handleSwap = () => {
        const temp = fromCurrency;
        setFromCurrency(toCurrency);
        setToCurrency(temp);
    };

    // Handle conversion button click
    const handleConvert = () => {
        if (onConvert) {
            onConvert(fromCurrency, toCurrency, fromAmount);
        }
        // In a real app, we would call an API here
        console.log(`Converting ${fromAmount} ${fromCurrency} to ${getConvertedAmount()} ${toCurrency}`);
    };

    return (
        <Card className={isInDialog ? 'border-0 shadow-none' : ''}>
            <CardHeader className={isInDialog ? 'px-0 pt-0' : ''}>
                {!isInDialog && (
                    <>
                        <CardTitle className="text-md font-medium">Convert Assets</CardTitle>
                        <CardDescription>
                            Easily swap between ckBTC and stablecoins
                        </CardDescription>
                    </>
                )}
            </CardHeader>
            <CardContent className={isInDialog ? 'px-0' : ''}>
                <div className="space-y-4">
                    {/* From Currency */}
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <label className="text-sm text-muted-foreground">From</label>
                            <span className="text-xs text-muted-foreground">
                                Balance: {fromCurrency === "ckBTC" ? "0.345" : "4,850.25"}
                            </span>
                        </div>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                            <div className="relative flex-1">
                                <Input
                                    value={fromAmount}
                                    onChange={(e) => setFromAmount(e.target.value)}
                                    placeholder="0.00"
                                    className="pr-16"
                                    type="number"
                                    step={fromCurrency === "ckBTC" ? "0.00000001" : "0.01"}
                                />
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 text-xs"
                                    onClick={() =>
                                        setFromAmount(fromCurrency === "ckBTC" ? "0.345" : "4850.25")
                                    }
                                >
                                    MAX
                                </Button>
                            </div>
                            <Select value={fromCurrency} onValueChange={setFromCurrency}>
                                <SelectTrigger className="w-full sm:w-28">
                                    <SelectValue placeholder="ckBTC" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ckBTC">
                                        <div className="flex items-center">
                                            <Bitcoin className="h-4 w-4 mr-2 text-orange-500" />
                                            ckBTC
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="USDC">
                                        <div className="flex items-center">
                                            <div className="w-4 h-4 mr-2 rounded-full bg-blue-500/20 flex items-center justify-center">
                                                <span className="text-blue-500 text-xs">$</span>
                                            </div>
                                            USDC
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="USDT">
                                        <div className="flex items-center">
                                            <div className="w-4 h-4 mr-2 rounded-full bg-green-500/20 flex items-center justify-center">
                                                <span className="text-green-500 text-xs">$</span>
                                            </div>
                                            USDT
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Swap Button */}
                    <div className="flex justify-center">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleSwap}
                            className="h-8 w-8 rounded-full bg-muted"
                        >
                            <ArrowDownUp className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* To Currency */}
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <label className="text-sm text-muted-foreground">To (Estimated)</label>
                            <span className="text-xs text-muted-foreground">
                                Rate: 1 {fromCurrency} = {getRate().toFixed(toCurrency === "ckBTC" ? 8 : 2)} {toCurrency}
                            </span>
                        </div>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                            <Input
                                value={getConvertedAmount()}
                                readOnly
                                className="flex-1 bg-muted"
                            />
                            <Select value={toCurrency} onValueChange={setToCurrency}>
                                <SelectTrigger className="w-full sm:w-28">
                                    <SelectValue placeholder="USDC" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ckBTC">
                                        <div className="flex items-center">
                                            <Bitcoin className="h-4 w-4 mr-2 text-orange-500" />
                                            ckBTC
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="USDC">
                                        <div className="flex items-center">
                                            <div className="w-4 h-4 mr-2 rounded-full bg-blue-500/20 flex items-center justify-center">
                                                <span className="text-blue-500 text-xs">$</span>
                                            </div>
                                            USDC
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="USDT">
                                        <div className="flex items-center">
                                            <div className="w-4 h-4 mr-2 rounded-full bg-green-500/20 flex items-center justify-center">
                                                <span className="text-green-500 text-xs">$</span>
                                            </div>
                                            USDT
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Auto-convert setting */}
                    <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-2">
                            <label htmlFor="auto-convert" className="text-sm">Auto-convert new payments</label>
                            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                        </div>
                        <Switch
                            id="auto-convert"
                            checked={isAutoConvert}
                            onCheckedChange={setIsAutoConvert}
                        />
                    </div>

                    {/* Fee info */}
                    <div className="p-3 bg-muted rounded-lg mt-4">
                        <div className="flex justify-between items-center text-xs sm:text-sm">
                            <span>Conversion Fee</span>
                            <span className="font-medium">0.10%</span>
                        </div>
                        <div className="flex justify-between items-center text-xs sm:text-sm">
                            <span>Network Fee</span>
                            <span className="font-medium">~0.000005 BTC</span>
                        </div>
                    </div>

                    {/* Action Button */}
                    <Button
                        className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white"
                        disabled={!fromAmount || parseFloat(fromAmount) <= 0}
                        onClick={handleConvert}
                    >
                        Convert {fromCurrency} to {toCurrency}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default ConversionWidget;