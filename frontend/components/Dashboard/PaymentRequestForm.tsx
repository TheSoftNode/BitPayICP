"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { CreditCard, QrCode, Clock, ExternalLink } from "lucide-react";

const PaymentRequestForm = () => {
    const [amount, setAmount] = useState("");
    const [currency, setCurrency] = useState("USD");
    const [description, setDescription] = useState("");
    const [isExpiration, setIsExpiration] = useState(false);
    const [expirationHours, setExpirationHours] = useState("24");
    const [isAutoConvert, setIsAutoConvert] = useState(false);
    const [convertTo, setConvertTo] = useState("USDC");
    const [isGenerating, setIsGenerating] = useState(false);
    const [isGenerated, setIsGenerated] = useState(false);

    const handleGenerateRequest = () => {
        setIsGenerating(true);
        // Simulate API call
        setTimeout(() => {
            setIsGenerating(false);
            setIsGenerated(true);
        }, 1500);
    };

    return (
        <div className="grid md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Create Payment Request</CardTitle>
                    <CardDescription>
                        Generate a Bitcoin payment request for your customer.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <div className="flex space-x-2">
                            <Input
                                id="amount"
                                placeholder="0.00"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="flex-1"
                            />
                            <Select
                                value={currency}
                                onValueChange={(value) => setCurrency(value)}
                            >
                                <SelectTrigger className="w-24">
                                    <SelectValue placeholder="Currency" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="USD">USD</SelectItem>
                                    <SelectItem value="EUR">EUR</SelectItem>
                                    <SelectItem value="GBP">GBP</SelectItem>
                                    <SelectItem value="BTC">BTC</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description (Optional)</Label>
                        <Textarea
                            id="description"
                            placeholder="Payment for services..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="expiration">Expiration Time</Label>
                            <Switch
                                id="expiration"
                                checked={isExpiration}
                                onCheckedChange={setIsExpiration}
                            />
                        </div>
                        {isExpiration && (
                            <div className="flex items-center space-x-2">
                                <Input
                                    id="expirationHours"
                                    value={expirationHours}
                                    onChange={(e) => setExpirationHours(e.target.value)}
                                    className="w-20"
                                />
                                <span className="text-sm text-gray-500">hours</span>
                                <Clock className="h-4 w-4 text-gray-500" />
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="autoConvert">Auto-Convert to Stablecoin/Fiat</Label>
                            <Switch
                                id="autoConvert"
                                checked={isAutoConvert}
                                onCheckedChange={setIsAutoConvert}
                            />
                        </div>
                        {isAutoConvert && (
                            <Select
                                value={convertTo}
                                onValueChange={(value) => setConvertTo(value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Convert to" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="USDC">USDC</SelectItem>
                                    <SelectItem value="USDT">USDT</SelectItem>
                                    <SelectItem value="USD">USD (Fiat)</SelectItem>
                                    <SelectItem value="EUR">EUR (Fiat)</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        onClick={handleGenerateRequest}
                        disabled={!amount || isGenerating}
                        className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white"
                    >
                        {isGenerating ? (
                            <>
                                <svg
                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Generating...
                            </>
                        ) : (
                            "Generate Payment Request"
                        )}
                    </Button>
                </CardFooter>
            </Card>

            <Card className={`${isGenerated ? "" : "opacity-50"}`}>
                <CardHeader>
                    <CardTitle>Payment Request</CardTitle>
                    <CardDescription>
                        Share this with your customer to receive payment.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {isGenerated ? (
                        <>
                            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg flex flex-col items-center justify-center">
                                <div className="w-48 h-48 bg-white dark:bg-black p-3 rounded-lg mb-4">
                                    <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-700 rounded flex items-center justify-center text-white text-sm">
                                        <QrCode className="h-16 w-16" />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm text-gray-500 mb-1">Bitcoin Address</p>
                                    <p className="font-mono text-xs p-2 bg-white dark:bg-gray-900 rounded break-all select-all">
                                        bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-500">Amount:</span>
                                    <span className="font-medium">
                                        {amount} {currency} (≈ 0.025 BTC)
                                    </span>
                                </div>
                                {description && (
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-500">Description:</span>
                                        <span>{description}</span>
                                    </div>
                                )}
                                {isExpiration && (
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-500">Expires in:</span>
                                        <span>{expirationHours} hours</span>
                                    </div>
                                )}
                                {isAutoConvert && (
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-500">Auto-convert to:</span>
                                        <span>{convertTo}</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-500">Status:</span>
                                    <span className="text-orange-500 font-medium">Awaiting Payment</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="h-64 flex flex-col items-center justify-center text-gray-400">
                            <CreditCard className="h-12 w-12 mb-2" />
                            <p className="text-center">
                                Your payment request will appear here once generated.
                            </p>
                        </div>
                    )}
                </CardContent>
                {isGenerated && (
                    <CardFooter className="flex flex-col space-y-2">
                        <Button className="w-full" variant="outline">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Share Link
                        </Button>
                        <Button variant="outline" className="w-full">
                            Copy Address
                        </Button>
                    </CardFooter>
                )}
            </Card>
        </div>
    );
};

export default PaymentRequestForm;