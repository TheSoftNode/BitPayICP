"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Code, Globe, CreditCard, Terminal, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function IntegrationPage() {
    const router = useRouter();

    // Sample API key - would be fetched from backend in a real app
    const apiKey = "ick_BTC01xyzABCDEFGHIJKLMNOPQRSTUV";

    // Sample checkout code snippets
    const reactCode = `import { BitPayICPButton } from 'bitpay-icp-react';

// In your component
<BitPayICPButton
  apiKey="${apiKey.substring(0, 10)}..."
  amount={25.99}
  currency="USD"
  onSuccess={handleSuccess}
  onError={handleError}
/>`;

    const htmlCode = `<script src="https://cdn.bitpayicp.com/js/v1/checkout.js"></script>

<div id="bitcoin-button"></div>

<script>
  const bitpayCheckout = new BitPayICP.Checkout({
    apiKey: "${apiKey.substring(0, 10)}...",
    amount: 25.99,
    currency: "USD",
    onSuccess: function(data) {
      console.log("Payment successful", data);
    }
  });
  
  bitpayCheckout.mount("#bitcoin-button");
</script>`;

    const apiCode = `curl -X POST "https://api.bitpayicp.com/v1/payments" \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: ${apiKey.substring(0, 10)}..." \\
  -d '{
    "amount": 25.99,
    "currency": "USD",
    "callback_url": "https://yourwebsite.com/callback",
    "redirect_url": "https://yourwebsite.com/thank-you"
  }'`;

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
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Developer Integration</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* API Keys Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg md:text-xl flex items-center">
                                <Code className="h-5 w-5 mr-2" />
                                API Credentials
                            </CardTitle>
                            <CardDescription className="text-xs md:text-sm">
                                Manage your API keys and access credentials
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-col space-y-3">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm font-medium">Your API Key</p>
                                        <p className="text-xs text-muted-foreground">Use this to authenticate API requests</p>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        <Copy className="h-3.5 w-3.5 mr-1" />
                                        Copy
                                    </Button>
                                </div>

                                <div className="p-3 bg-muted rounded-md font-mono text-xs relative">
                                    <div className="absolute inset-0 flex items-center justify-center z-10 bg-muted/80 backdrop-blur-[1px]">
                                        <span className="font-medium text-sm">••••••••••••••••••••••••••••••••</span>
                                        <Button variant="ghost" size="sm" className="absolute right-2">
                                            Show
                                        </Button>
                                    </div>
                                    {apiKey}
                                </div>
                            </div>

                            <div className="pt-4 flex flex-col space-y-2">
                                <div className="flex items-center mt-2">
                                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                                    <p className="text-sm">API Status: Operational</p>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                    <div>
                                        <p className="text-sm font-medium">Rate Limits</p>
                                        <p className="text-xs text-muted-foreground">100 requests/minute</p>
                                    </div>
                                    <Button variant="outline" size="sm">Increase Limits</Button>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                    <div>
                                        <p className="text-sm font-medium">Webhook URL</p>
                                        <p className="text-xs text-muted-foreground">For payment notifications</p>
                                    </div>
                                    <Button variant="outline" size="sm">Configure</Button>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="border-t pt-4 flex justify-between">
                            <Button variant="outline" size="sm">
                                Regenerate API Key
                            </Button>
                            <Button
                                size="sm"
                                className="bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white"
                            >
                                Create Test Key
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Integration Stats Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg md:text-xl">Integration Statistics</CardTitle>
                            <CardDescription className="text-xs md:text-sm">
                                Usage metrics for your integrations
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-muted/40 rounded-lg">
                                    <p className="text-sm text-muted-foreground mb-1">API Calls (30d)</p>
                                    <p className="text-2xl font-bold">4,268</p>
                                    <p className="text-xs text-green-600">+12% from last month</p>
                                </div>
                                <div className="p-4 bg-muted/40 rounded-lg">
                                    <p className="text-sm text-muted-foreground mb-1">Webhook Events</p>
                                    <p className="text-2xl font-bold">1,459</p>
                                    <p className="text-xs text-green-600">+8% from last month</p>
                                </div>
                                <div className="p-4 bg-muted/40 rounded-lg">
                                    <p className="text-sm text-muted-foreground mb-1">Successful Payments</p>
                                    <p className="text-2xl font-bold">349</p>
                                    <p className="text-xs text-green-600">+15% from last month</p>
                                </div>
                                <div className="p-4 bg-muted/40 rounded-lg">
                                    <p className="text-sm text-muted-foreground mb-1">Success Rate</p>
                                    <p className="text-2xl font-bold">98.2%</p>
                                    <p className="text-xs text-green-600">+0.5% from last month</p>
                                </div>
                            </div>

                            <div className="mt-6 p-4 border border-dashed rounded-lg flex items-center justify-center">
                                <p className="text-muted-foreground text-sm">Integration Activity Chart Coming Soon</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Integration Methods Card */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-lg md:text-xl">Integration Methods</CardTitle>
                            <CardDescription className="text-xs md:text-sm">
                                Choose the integration method that best fits your needs
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="button">
                                <TabsList className="w-full">
                                    <TabsTrigger value="button" className="flex-1">
                                        <CreditCard className="h-3.5 w-3.5 mr-1.5" />
                                        Payment Button
                                    </TabsTrigger>
                                    <TabsTrigger value="api" className="flex-1">
                                        <Terminal className="h-3.5 w-3.5 mr-1.5" />
                                        REST API
                                    </TabsTrigger>
                                    <TabsTrigger value="hosted" className="flex-1">
                                        <Globe className="h-3.5 w-3.5 mr-1.5" />
                                        Hosted Checkout
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="button" className="mt-6 space-y-4">
                                    <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg mb-4">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                                            <CreditCard className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-medium">Payment Button</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Add a Bitcoin payment button to your website with just a few lines of code.
                                                Best for e-commerce sites and simple checkout flows.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-sm font-medium">React Integration</h4>
                                                <Button variant="ghost" size="sm">
                                                    <Copy className="h-3.5 w-3.5 mr-1" />
                                                    Copy
                                                </Button>
                                            </div>
                                            <div className="p-3 bg-slate-900 rounded-md text-slate-100 font-mono text-xs max-h-64 overflow-y-auto">
                                                <pre>{reactCode}</pre>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-sm font-medium">HTML/JavaScript Integration</h4>
                                                <Button variant="ghost" size="sm">
                                                    <Copy className="h-3.5 w-3.5 mr-1" />
                                                    Copy
                                                </Button>
                                            </div>
                                            <div className="p-3 bg-slate-900 rounded-md text-slate-100 font-mono text-xs max-h-64 overflow-y-auto">
                                                <pre>{htmlCode}</pre>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center p-4 bg-muted rounded-lg mt-6">
                                        <div>
                                            <p className="text-sm font-medium">Button Preview</p>
                                            <p className="text-xs text-muted-foreground">Click to see it in action</p>
                                        </div>
                                        <Button
                                            size="sm"
                                            className="bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white"
                                        >
                                            Pay with Bitcoin
                                        </Button>
                                    </div>
                                </TabsContent>

                                <TabsContent value="api" className="mt-6 space-y-4">
                                    <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg mb-4">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                            <Terminal className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-medium">REST API</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Integrate directly with our API for custom payment flows and advanced use cases.
                                                Best for applications requiring full control over the payment experience.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-sm font-medium">API Request Example</h4>
                                            <Button variant="ghost" size="sm">
                                                <Copy className="h-3.5 w-3.5 mr-1" />
                                                Copy
                                            </Button>
                                        </div>
                                        <div className="p-3 bg-slate-900 rounded-md text-slate-100 font-mono text-xs max-h-64 overflow-y-auto">
                                            <pre>{apiCode}</pre>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                                        <Card className="bg-muted/30">
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-sm">Create Payment</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-xs text-muted-foreground">
                                                    POST /v1/payments
                                                </p>
                                            </CardContent>
                                        </Card>
                                        <Card className="bg-muted/30">
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-sm">Get Payment Details</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-xs text-muted-foreground">
                                                    GET /v1/payments/{"{id}"}
                                                </p>
                                            </CardContent>
                                        </Card>
                                        <Card className="bg-muted/30">
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-sm">List Payments</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-xs text-muted-foreground">
                                                    GET /v1/payments
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </TabsContent>

                                <TabsContent value="hosted" className="mt-6 space-y-4">
                                    <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg mb-4">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                            <Globe className="h-6 w-6 text-green-600 dark:text-green-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-medium">Hosted Checkout</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Use our hosted checkout page for a simple integration without any coding.
                                                Best for merchants who want a quick setup with minimal technical requirements.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-6 border rounded-lg mt-4">
                                        <div className="flex items-center mb-4">
                                            <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mr-3">
                                                <Globe className="h-5 w-5 text-orange-500" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">Your Hosted Checkout URL</p>
                                                <p className="text-xs text-muted-foreground">
                                                    Share this with your customers or embed it in your website
                                                </p>
                                            </div>
                                        </div>

                                        <div className="bg-muted p-3 rounded-md text-sm break-all">
                                            https://checkout.bitpayicp.com/p/{apiKey.substring(4, 12).toLowerCase()}
                                        </div>

                                        <div className="flex justify-between mt-6">
                                            <Button variant="outline" size="sm">
                                                Customize Page
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <Copy className="h-3.5 w-3.5 mr-1" />
                                                Copy URL
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                                        <h4 className="text-sm font-medium mb-2">Quick Integration</h4>
                                        <p className="text-xs text-muted-foreground mb-3">
                                            Add a link or button to your website that directs customers to your hosted checkout page:
                                        </p>
                                        <div className="bg-slate-900 rounded-md text-slate-100 font-mono text-xs p-3">
                                            {`<a href="https://checkout.bitpayicp.com/p/${apiKey.substring(4, 12).toLowerCase()}" class="payment-button">
  Pay with Bitcoin
</a>`}
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                        <CardFooter className="border-t pt-6 flex flex-col sm:flex-row justify-between gap-4">
                            <div className="flex items-center">
                                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                                <p className="text-sm text-muted-foreground">All systems operational</p>
                            </div>
                            <div className="space-x-3">
                                <Button variant="outline" size="sm">
                                    API Reference
                                </Button>
                                <Button
                                    size="sm"
                                    className="bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white"
                                >
                                    View Documentation
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}