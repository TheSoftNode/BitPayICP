"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bitcoin, ChevronRight, ExternalLink, Eye, EyeOff, RefreshCw } from "lucide-react";

const WalletWidgetPreview = () => {
    const [isBalanceHidden, setIsBalanceHidden] = useState(false);

    // Sample wallet balances - would come from an API in a real app
    const walletBalances = [
        {
            token: "Bitcoin (ICP ckBTC)",
            symbol: "ckBTC",
            balance: 0.345,
            value: 13793.53,
            icon: <Bitcoin className="h-5 w-5 text-orange-500" />,
        },
        {
            token: "USD Coin",
            symbol: "USDC",
            balance: 4850.25,
            value: 4850.25,
            icon: (
                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <span className="text-blue-500 text-xs">$</span>
                </div>
            ),
        },
    ];

    const totalBalance = walletBalances.reduce((sum, wallet) => sum + wallet.value, 0);

    // Helper function to format currency
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(value);
    };

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-md font-medium">ICP Wallet</CardTitle>
                        <CardDescription>Manage your crypto assets</CardDescription>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsBalanceHidden(!isBalanceHidden);
                        }}
                    >
                        {isBalanceHidden ? (
                            <Eye className="h-4 w-4" />
                        ) : (
                            <EyeOff className="h-4 w-4" />
                        )}
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col space-y-4">
                    {/* Total Balance */}
                    <div className="p-4 bg-gradient-to-r from-orange-500/10 to-yellow-400/10 dark:from-orange-950/30 dark:to-yellow-900/30 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Total Balance</p>
                        <h3 className="text-3xl font-bold">
                            {isBalanceHidden ? "••••••" : formatCurrency(totalBalance)}
                        </h3>
                    </div>

                    {/* Quick Assets Preview */}
                    <div className="space-y-2">
                        {walletBalances.slice(0, 2).map((wallet) => (
                            <div key={wallet.symbol} className="flex items-center p-3 bg-muted/50 rounded-lg">
                                <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center mr-3">
                                    {wallet.icon}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">{wallet.token}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {isBalanceHidden ? "•••••" : wallet.balance} {wallet.symbol}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 flex items-center justify-center h-9"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                            <span className="text-xs">Send</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 flex items-center justify-center h-9"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                            <span className="text-xs">Swap</span>
                        </Button>
                        <Button
                            size="sm"
                            className="bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white"
                        >
                            <span className="text-xs">Manage</span>
                            <ChevronRight className="h-3.5 w-3.5 ml-1" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default WalletWidgetPreview;