import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Code, Globe, CreditCard, Terminal } from "lucide-react";

const IntegrationWidget = () => {
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
        <Card>
            <CardHeader>
                <CardTitle className="text-md font-medium">
                    <span className="flex items-center">
                        <Code className="h-5 w-5 mr-2" />
                        Developer Integration
                    </span>
                </CardTitle>
                <CardDescription>
                    Integrate Bitcoin payments into your website or app
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

                <Tabs defaultValue="button" className="mt-6">
                    <TabsList className="w-full">
                        <TabsTrigger value="button" className="flex-1">
                            <CreditCard className="h-3.5 w-3.5 mr-1.5" />
                            Button
                        </TabsTrigger>
                        <TabsTrigger value="api" className="flex-1">
                            <Terminal className="h-3.5 w-3.5 mr-1.5" />
                            API
                        </TabsTrigger>
                        <TabsTrigger value="hosted" className="flex-1">
                            <Globe className="h-3.5 w-3.5 mr-1.5" />
                            Hosted
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="button" className="mt-3 space-y-4">
                        <p className="text-sm">
                            Add a Bitcoin payment button to your website with just a few lines of code.
                        </p>

                        <div className="flex items-center justify-between mt-3 mb-2">
                            <div className="text-xs font-medium">React Integration</div>
                            <Button variant="ghost" size="sm">
                                <Copy className="h-3.5 w-3.5 mr-1" />
                                Copy
                            </Button>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-md text-slate-100 font-mono text-xs max-h-48 overflow-y-auto">
                            <pre>{reactCode}</pre>
                        </div>

                        <div className="flex items-center justify-between mt-3 mb-2">
                            <div className="text-xs font-medium">HTML/JavaScript Integration</div>
                            <Button variant="ghost" size="sm">
                                <Copy className="h-3.5 w-3.5 mr-1" />
                                Copy
                            </Button>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-md text-slate-100 font-mono text-xs max-h-48 overflow-y-auto">
                            <pre>{htmlCode}</pre>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-muted rounded-lg mt-4">
                            <div>
                                <p className="text-sm font-medium">Preview</p>
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

                    <TabsContent value="api" className="mt-3 space-y-4">
                        <p className="text-sm">
                            Integrate directly with our API for custom payment flows.
                        </p>

                        <div className="flex items-center justify-between mt-3 mb-2">
                            <div className="text-xs font-medium">API Request Example</div>
                            <Button variant="ghost" size="sm">
                                <Copy className="h-3.5 w-3.5 mr-1" />
                                Copy
                            </Button>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-md text-slate-100 font-mono text-xs max-h-48 overflow-y-auto">
                            <pre>{apiCode}</pre>
                        </div>

                        <div className="flex items-center mt-4">
                            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                            <p className="text-sm">API Status: Operational</p>
                        </div>

                        <div className="text-xs text-muted-foreground mt-2">
                            See the complete API documentation for more details on available endpoints and parameters.
                        </div>
                    </TabsContent>

                    <TabsContent value="hosted" className="mt-3 space-y-4">
                        <p className="text-sm">
                            Use our hosted checkout page for a simple integration without any coding.
                        </p>

                        <div className="p-4 border rounded-lg mt-4">
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mr-3">
                                    <Globe className="h-5 w-5 text-orange-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Hosted Checkout URL</p>
                                    <p className="text-xs text-muted-foreground">
                                        Share this with your customers
                                    </p>
                                </div>
                            </div>

                            <div className="bg-muted p-3 rounded-md text-sm break-all">
                                https://checkout.bitpayicp.com/p/{apiKey.substring(4, 12).toLowerCase()}
                            </div>

                            <div className="flex justify-between mt-4">
                                <Button variant="outline" size="sm">
                                    Customize Page
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Copy className="h-3.5 w-3.5 mr-1" />
                                    Copy URL
                                </Button>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
            <CardFooter className="border-t pt-4 flex flex-col sm:flex-row sm:justify-between space-y-2 sm:space-y-0">
                <Button variant="outline" size="sm">
                    Regenerate API Key
                </Button>
                <Button size="sm">
                    View Documentation
                </Button>
            </CardFooter>
        </Card>
    );
};

export default IntegrationWidget;