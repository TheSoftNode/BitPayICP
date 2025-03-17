"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Copy, ExternalLink, EyeOff, Eye, Bitcoin, Plus, RefreshCw } from "lucide-react";

type WalletProps = {
    // Optional callback functions for external control
    onDeposit?: () => void;
    onSend?: () => void;
    onSwap?: () => void;
};

type WalletBalance = {
    token: string;
    symbol: string;
    balance: number;
    value: number;
    icon: React.ReactNode;
};

const WalletWidget = ({ onDeposit, onSend, onSwap }: WalletProps) => {
    const [isBalanceHidden, setIsBalanceHidden] = useState(false);

    // Sample wallet balances - would come from an API in a real app
    const walletBalances: WalletBalance[] = [
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
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-blue-500"
                >
                    <path
                        d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z"
                        fill="currentColor"
                        fillOpacity="0.2"
                    />
                    <path
                        d="M15.5 11.5a3.5 3.5 0 1 0-7 0 3.5 3.5 0 0 0 7 0z"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <path
                        d="M7 10.5h2M15 10.5h2M7 13.5h2M15 13.5h2"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
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

    // Sample recent transactions - would come from an API in a real app
    const recentTransactions = [
        {
            id: "tx1",
            type: "receive",
            amount: "+0.025 BTC",
            date: "2025-03-10",
            address: "bc1q...34jx",
        },
        {
            id: "tx2",
            type: "send",
            amount: "-0.018 BTC",
            date: "2025-03-08",
            address: "bc1q...92df",
        },
        {
            id: "tx3",
            type: "convert",
            amount: "0.05 BTC → 1992.15 USDC",
            date: "2025-03-05",
            address: "-",
        },
    ];

    return (
        <Card className="h-fit w-full">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-md font-medium">ICP Wallet</CardTitle>
                        <CardDescription>Manage your crypto assets</CardDescription>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsBalanceHidden(!isBalanceHidden)}
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

                    {/* Wallet Assets */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <h4 className="text-sm font-medium">Your Assets</h4>
                            <Button variant="link" size="sm" className="h-auto p-0 text-primary">
                                View All <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                        </div>

                        <div className="space-y-2">
                            {walletBalances.map((wallet) => (
                                <div key={wallet.symbol} className="flex items-center p-3 bg-muted/50 rounded-lg">
                                    <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center mr-3">
                                        {wallet.icon}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">{wallet.token}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {isBalanceHidden ? "•••••" : wallet.balance} {wallet.symbol}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium">
                                            {isBalanceHidden ? "••••••" : formatCurrency(wallet.value)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-3 gap-2">
                        <Button
                            variant="outline"
                            className="flex flex-col items-center justify-center h-auto py-3"
                            onClick={onDeposit}
                        >
                            <Plus className="h-4 w-4 mb-1" />
                            <span className="text-xs">Deposit</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="flex flex-col items-center justify-center h-auto py-3"
                            onClick={onSend}
                        >
                            <ExternalLink className="h-4 w-4 mb-1" />
                            <span className="text-xs">Send</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="flex flex-col items-center justify-center h-auto py-3"
                            onClick={onSwap}
                        >
                            <RefreshCw className="h-4 w-4 mb-1" />
                            <span className="text-xs">Swap</span>
                        </Button>
                    </div>

                    {/* Tabs for additional wallet features */}
                    <Tabs defaultValue="transactions" className="mt-4">
                        <TabsList className="w-full">
                            <TabsTrigger value="transactions" className="flex-1">Transactions</TabsTrigger>
                            <TabsTrigger value="addresses" className="flex-1">Addresses</TabsTrigger>
                        </TabsList>
                        <TabsContent value="transactions" className="mt-2 space-y-3">
                            {recentTransactions.map((tx) => (
                                <div key={tx.id} className="flex items-center justify-between p-2">
                                    <div>
                                        <p className="text-sm font-medium">{tx.amount}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {new Date(tx.date).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-mono text-muted-foreground">{tx.address}</p>
                                        <p className="text-xs text-muted-foreground capitalize">{tx.type}</p>
                                    </div>
                                </div>
                            ))}
                            <Button variant="link" size="sm" className="w-full mt-2">
                                View All Transactions
                            </Button>
                        </TabsContent>
                        <TabsContent value="addresses" className="mt-2">
                            <div className="p-3 bg-muted/50 rounded-lg mb-3">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm font-medium">Deposit Address (ckBTC)</p>
                                    <Button variant="ghost" size="icon" className="h-6 w-6">
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>
                                <p className="text-xs font-mono bg-background p-2 rounded-md break-all">
                                    bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                                </p>
                            </div>
                            <Button variant="outline" size="sm" className="w-full">
                                Generate New Address
                            </Button>
                        </TabsContent>
                    </Tabs>
                </div>
            </CardContent>
        </Card>
    );
};

export default WalletWidget;