import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HelpCircle, Book, MessagesSquare, FileQuestion, ExternalLink, FileText, Mail, AlertCircle } from "lucide-react";
import ThemeToggle from "@/components/Themes/ThemeToggle";

export default function HelpPage() {
    // Sample FAQs
    const faqs = [
        {
            question: "How do Bitcoin payments work on ICP?",
            answer: "Our platform uses the Internet Computer Protocol (ICP) to process Bitcoin payments through ckBTC, a 1:1 Bitcoin-backed token. When a customer makes a payment, the Bitcoin is sent to a network-controlled address, and an equivalent amount of ckBTC is minted on ICP. This provides near-instant settlements without waiting for traditional Bitcoin confirmations."
        },
        {
            question: "What fees are associated with Bitcoin payments?",
            answer: "There are two types of fees: a small platform fee (0.5% per transaction) and the standard Bitcoin network fee. The Bitcoin network fee varies based on network congestion, but our system optimizes this for you. The platform fee is deducted automatically from each transaction."
        },
        {
            question: "How do I withdraw my Bitcoin?",
            answer: "Navigate to the Wallet section of your dashboard, select the amount you wish to withdraw, and provide your Bitcoin address. You can withdraw as ckBTC (instant) or request conversion back to regular BTC (which may take 1-2 hours for network confirmations)."
        },
        {
            question: "Is there a minimum or maximum transaction amount?",
            answer: "The minimum transaction amount is 0.0001 BTC to ensure that transaction fees don't consume a disproportionate amount of the payment. There is no maximum limit for verified merchants."
        },
        {
            question: "How secure is the platform?",
            answer: "Our platform uses ICP's Chain Key cryptography with threshold signatures for securing Bitcoin transactions. All customer data is encrypted, and our system undergoes regular security audits. We also offer two-factor authentication for account security."
        },
        {
            question: "Can I integrate Bitcoin payments with my existing website or app?",
            answer: "Yes, we provide several integration options including API access, payment buttons, hosted checkout pages, and plugins for popular platforms like Shopify, WooCommerce, and more. Check the Integration section in your dashboard."
        },
    ];

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Help & Support</h2>
                <div className="hidden md:flex">
                    <ThemeToggle />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Documentation</CardTitle>
                        <Book className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-muted-foreground">
                            Comprehensive guides and API reference for developers
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Support Chat</CardTitle>
                        <MessagesSquare className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-muted-foreground">
                            Live chat with our support team
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Knowledge Base</CardTitle>
                        <FileQuestion className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-muted-foreground">
                            Articles and tutorials to help you get started
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Community</CardTitle>
                        <ExternalLink className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-muted-foreground">
                            Join our Discord and GitHub community
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="faq" className="space-y-4">
                <TabsList className="flex h-full flex-wrap gap-2">
                    <TabsTrigger value="faq">
                        <HelpCircle className="h-4 w-4 mr-2" />
                        FAQ
                    </TabsTrigger>
                    <TabsTrigger value="contact">
                        <Mail className="h-4 w-4 mr-2" />
                        Contact Support
                    </TabsTrigger>
                    <TabsTrigger value="guides">
                        <FileText className="h-4 w-4 mr-2" />
                        Getting Started
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="faq" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Frequently Asked Questions</CardTitle>
                            <CardDescription>Common questions about our Bitcoin payment system on ICP.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="space-y-2 pb-4 border-b last:border-b-0 last:pb-0"
                                >
                                    <h3 className="font-medium">{faq.question}</h3>
                                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                View All FAQs
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="contact" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Support</CardTitle>
                            <CardDescription>Get help from our support team.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Input id="subject" placeholder="What can we help you with?" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="issue-type">Issue Type</Label>
                                <select id="issue-type" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                                    <option value="payment">Payment Issues</option>
                                    <option value="account">Account Access</option>
                                    <option value="integration">Integration Help</option>
                                    <option value="wallet">Wallet & Withdrawals</option>
                                    <option value="other">Other Issues</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <textarea
                                    id="message"
                                    placeholder="Describe your issue in detail..."
                                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="attachment">Attachments (Optional)</Label>
                                <Input id="attachment" type="file" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white">
                                Submit Support Request
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="guides" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Getting Started Guides</CardTitle>
                            <CardDescription>Learn how to use our Bitcoin payment platform.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                                            <FileText className="h-5 w-5 text-orange-500" />
                                        </div>
                                        <h3 className="font-medium">Setting Up Your Account</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Learn how to configure your merchant account for optimal performance.
                                    </p>
                                </div>

                                <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                                            <FileText className="h-5 w-5 text-orange-500" />
                                        </div>
                                        <h3 className="font-medium">Creating Payment Requests</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        How to generate Bitcoin payment requests and QR codes.
                                    </p>
                                </div>

                                <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                                            <FileText className="h-5 w-5 text-orange-500" />
                                        </div>
                                        <h3 className="font-medium">Website Integration</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Step-by-step guide to adding Bitcoin payments to your website.
                                    </p>
                                </div>

                                <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                                            <FileText className="h-5 w-5 text-orange-500" />
                                        </div>
                                        <h3 className="font-medium">Managing Your Bitcoin Wallet</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        How to receive, store, and withdraw your Bitcoin payments.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                View All Guides
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                            <CardTitle className="text-md font-medium">Need Additional Help?</CardTitle>
                            <AlertCircle className="h-4 w-4 text-orange-500 ml-2" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Our support team is available 24/7 to assist you with any questions or issues. Contact us via live chat or email for prompt assistance.
                            </p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}