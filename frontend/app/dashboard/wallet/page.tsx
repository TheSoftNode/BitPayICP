"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, QrCode, Send, RefreshCw, History } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import WalletWidget from "@/components/Dashboard/WalletWidget";
import ConversionWidget from "@/components/Dashboard/ConversionWidget";

export default function WalletPage() {
    const router = useRouter();
    const [isConversionOpen, setIsConversionOpen] = useState(false);
    const [sendDialogOpen, setSendDialogOpen] = useState(false);
    const [receiveDialogOpen, setReceiveDialogOpen] = useState(false);
    const [activeTransactionTab, setActiveTransactionTab] = useState("all");

    // Handle successful conversion
    const handleConversion = (fromCurrency: string, toCurrency: string, amount: string) => {
        // In a real app, we would call an API and update the wallet balance
        // For now, we'll just close the modal on mobile
        if (window.innerWidth < 1024) {
            setIsConversionOpen(false);
        }
        console.log(`Converted ${amount} ${fromCurrency} to ${toCurrency}`);
    };

    // Sample transaction data
    const transactionData = {
        all: [
            { id: "tx1", type: "receive", amount: "+0.025 BTC", date: "2025-03-10", address: "bc1q...34jx" },
            { id: "tx2", type: "send", amount: "-0.018 BTC", date: "2025-03-08", address: "bc1q...92df" },
            { id: "tx3", type: "convert", amount: "0.05 BTC → 1992.15 USDC", date: "2025-03-05", address: "-" },
            { id: "tx4", type: "receive", amount: "+0.012 BTC", date: "2025-03-01", address: "bc1q...j8kt" },
            { id: "tx5", type: "send", amount: "-0.004 BTC", date: "2025-02-28", address: "bc1q...h7pz" }
        ],
        sent: [
            { id: "tx2", type: "send", amount: "-0.018 BTC", date: "2025-03-08", address: "bc1q...92df" },
            { id: "tx5", type: "send", amount: "-0.004 BTC", date: "2025-02-28", address: "bc1q...h7pz" }
        ],
        received: [
            { id: "tx1", type: "receive", amount: "+0.025 BTC", date: "2025-03-10", address: "bc1q...34jx" },
            { id: "tx4", type: "receive", amount: "+0.012 BTC", date: "2025-03-01", address: "bc1q...j8kt" }
        ],
        swaps: [
            { id: "tx3", type: "convert", amount: "0.05 BTC → 1992.15 USDC", date: "2025-03-05", address: "-" }
        ]
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-1 space-y-4 p-4 sm:p-6 md:p-8 pt-6">
                {/* Header with back button */}
                <div className="flex items-center gap-4 mb-6">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push("/dashboard")}
                        className="hidden sm:flex"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.push("/dashboard")}
                        className="sm:hidden"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Wallet</h2>
                </div>

                {/* Main content grid */}
                <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 md:gap-6">
                    {/* Wallet Widget Column */}
                    <div className="lg:col-span-4 space-y-4">
                        {/* Wallet Widget */}
                        <WalletWidget
                            onDeposit={() => setReceiveDialogOpen(true)}
                            onSend={() => setSendDialogOpen(true)}
                            onSwap={() => setIsConversionOpen(true)}
                        />

                        {/* Quick Actions Card for smaller screens */}
                        <Card className="lg:hidden overflow-hidden">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-md font-medium">Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    <Button
                                        variant="outline"
                                        className="flex flex-col items-center h-auto py-4"
                                        onClick={() => setSendDialogOpen(true)}
                                    >
                                        <Send className="h-5 w-5 mb-2" />
                                        <span className="text-xs">Send</span>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="flex flex-col items-center h-auto py-4"
                                        onClick={() => setReceiveDialogOpen(true)}
                                    >
                                        <QrCode className="h-5 w-5 mb-2" />
                                        <span className="text-xs">Receive</span>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="flex flex-col items-center h-auto py-4"
                                        onClick={() => setIsConversionOpen(true)}
                                    >
                                        <RefreshCw className="h-5 w-5 mb-2" />
                                        <span className="text-xs">Swap</span>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="flex flex-col items-center h-auto py-4"
                                    >
                                        <History className="h-5 w-5 mb-2" />
                                        <span className="text-xs">History</span>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Transaction History Card */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-md font-medium">Transaction History</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Tabs
                                    defaultValue="all"
                                    value={activeTransactionTab}
                                    onValueChange={setActiveTransactionTab}
                                >
                                    <TabsList className="mb-4 w-full grid grid-cols-4">
                                        <TabsTrigger value="all">All</TabsTrigger>
                                        <TabsTrigger value="sent">Sent</TabsTrigger>
                                        <TabsTrigger value="received">Received</TabsTrigger>
                                        <TabsTrigger value="swaps">Swaps</TabsTrigger>
                                    </TabsList>

                                    {Object.entries(transactionData).map(([tabValue, transactions]) => (
                                        <TabsContent key={tabValue} value={tabValue}>
                                            <div className="space-y-3">
                                                {transactions.map((tx) => (
                                                    <div key={tx.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
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
                                                {transactions.length > 0 ? (
                                                    <Button variant="outline" size="sm" className="w-full mt-2">
                                                        View All Transactions
                                                    </Button>
                                                ) : (
                                                    <div className="p-6 text-center text-muted-foreground">
                                                        <p>No {tabValue} transactions found</p>
                                                    </div>
                                                )}
                                            </div>
                                        </TabsContent>
                                    ))}
                                </Tabs>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Conversion Widget Column - Visible on desktop by default, shown in dialog on mobile */}
                    <div className="hidden lg:block lg:col-span-3">
                        <ConversionWidget onConvert={handleConversion} />
                    </div>
                </div>
            </div>

            {/* Conversion Dialog - Only shown on mobile/tablet when swap is clicked */}
            <Dialog open={isConversionOpen} onOpenChange={setIsConversionOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Convert Assets</DialogTitle>
                    </DialogHeader>
                    <div className="mt-2">
                        <ConversionWidget onConvert={handleConversion} isInDialog={true} />
                    </div>
                </DialogContent>
            </Dialog>

            {/* Send Dialog */}
            <Dialog open={sendDialogOpen} onOpenChange={setSendDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Send Crypto</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Recipient Address</label>
                            <div className="flex space-x-2">
                                <Input type="text" className="flex-1" placeholder="Enter wallet address" />
                                <Button variant="outline" size="icon">
                                    <QrCode className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Asset</label>
                            <select className="w-full px-3 py-2 border rounded-md">
                                <option>Bitcoin (BTC)</option>
                                <option>ckBTC</option>
                                <option>USDC</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label className="text-sm font-medium">Amount</label>
                                <span className="text-xs text-muted-foreground">Balance: 0.345 BTC</span>
                            </div>
                            <div className="flex space-x-2">
                                <Input type="text" className="flex-1" placeholder="0.00" />
                                <Button variant="outline" size="sm">MAX</Button>
                            </div>
                        </div>
                        <div className="pt-4">
                            <Button className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white">
                                Send
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Receive Dialog */}
            <Dialog open={receiveDialogOpen} onOpenChange={setReceiveDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Receive Crypto</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Select Asset</label>
                            <select className="w-full px-3 py-2 border rounded-md">
                                <option>Bitcoin (BTC)</option>
                                <option>ckBTC</option>
                                <option>USDC</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Your Deposit Address</label>
                            <div className="flex items-center justify-center p-6 bg-muted rounded-lg">
                                <div className="bg-white p-2 rounded-lg">
                                    {/* QR Code Placeholder */}
                                    <div className="w-48 h-48 bg-black/90 grid grid-cols-5 grid-rows-5 gap-1 p-3">
                                        <div className="col-span-5 row-span-5 grid grid-cols-5 grid-rows-5 gap-1">
                                            {/* Visual representation of a QR code pattern - would be an actual component in production */}
                                            {Array(25).fill(0).map((_, i) => (
                                                <div key={i} className={`bg-white ${Math.random() > 0.6 ? 'bg-opacity-100' : 'bg-opacity-0'}`}></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 space-y-2">
                                <div className="flex justify-between">
                                    <p className="text-sm font-medium">Address</p>
                                    <Button variant="ghost" size="sm" className="h-6 px-2">
                                        Copy
                                    </Button>
                                </div>
                                <p className="text-xs font-mono bg-muted p-3 rounded-md break-all">
                                    bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3 pt-4">
                            <Button className="flex-1" variant="outline">Generate New</Button>
                            <Button className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white">
                                Share
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}