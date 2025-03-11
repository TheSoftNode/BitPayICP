"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    CreditCard,
    UserCog,
    Bell,
    ShieldCheck,
    Key,
    Globe,
    Wallet,
    Smartphone
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function SettingsPage() {
    const [apiPublicKey, setApiPublicKey] = useState("pk_BTC01xyzABCDEFGHIJKLMNOPQRSTUV");
    const [apiSecretKey, setApiSecretKey] = useState("sk_BTC01abcdefghijklmnopqrstuvwxyz");

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
            </div>

            <Tabs defaultValue="profile" className="space-y-4">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
                    <TabsTrigger value="profile">
                        <UserCog className="h-4 w-4 mr-2" />
                        Profile
                    </TabsTrigger>
                    <TabsTrigger value="payment">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Payment
                    </TabsTrigger>
                    <TabsTrigger value="notifications">
                        <Bell className="h-4 w-4 mr-2" />
                        Notifications
                    </TabsTrigger>
                    <TabsTrigger value="security">
                        <ShieldCheck className="h-4 w-4 mr-2" />
                        Security
                    </TabsTrigger>
                    <TabsTrigger value="api">
                        <Key className="h-4 w-4 mr-2" />
                        API
                    </TabsTrigger>
                    <TabsTrigger value="integrations">
                        <Globe className="h-4 w-4 mr-2" />
                        Integrations
                    </TabsTrigger>
                    <TabsTrigger value="wallet">
                        <Wallet className="h-4 w-4 mr-2" />
                        Wallet
                    </TabsTrigger>
                </TabsList>

                {/* Profile Settings */}
                <TabsContent value="profile" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>
                                Update your account information.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" defaultValue="Merchant Name" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" defaultValue="merchant@example.com" type="email" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="company">Company Name</Label>
                                    <Input id="company" defaultValue="Example Business" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input id="phone" defaultValue="+1 (555) 123-4567" type="tel" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white">
                                Save Changes
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* Payment Settings */}
                <TabsContent value="payment" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Settings</CardTitle>
                            <CardDescription>
                                Configure how you receive and process Bitcoin payments.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="default-currency">Default Currency</Label>
                                <Select defaultValue="USD">
                                    <SelectTrigger id="default-currency">
                                        <SelectValue placeholder="Select currency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="USD">USD</SelectItem>
                                        <SelectItem value="EUR">EUR</SelectItem>
                                        <SelectItem value="GBP">GBP</SelectItem>
                                        <SelectItem value="BTC">BTC</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="auto-conversion">Auto-Convert Payments</Label>
                                <Select defaultValue="none">
                                    <SelectTrigger id="auto-conversion">
                                        <SelectValue placeholder="Select conversion type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">No auto-conversion</SelectItem>
                                        <SelectItem value="usdc">Convert to USDC</SelectItem>
                                        <SelectItem value="usdt">Convert to USDT</SelectItem>
                                        <SelectItem value="fiat">Convert to Fiat</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="expiration">Payment Expiration</Label>
                                    <p className="text-sm text-muted-foreground">Set how long payment requests remain valid</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        id="expiration"
                                        defaultValue="24"
                                        className="w-16 text-right"
                                    />
                                    <span>hours</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <div className="space-y-0.5">
                                    <Label>Require Payment Confirmation</Label>
                                    <p className="text-sm text-muted-foreground">Wait for blockchain confirmation</p>
                                </div>
                                <Switch defaultChecked={false} />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white">
                                Save Payment Settings
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* API Settings */}
                <TabsContent value="api" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>API Keys</CardTitle>
                            <CardDescription>
                                Manage your API authentication credentials.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Public API Key</Label>
                                <div className="flex space-x-2">
                                    <Input readOnly value={apiPublicKey} />
                                    <Button variant="outline" size="sm">Copy</Button>
                                </div>
                                <p className="text-sm text-muted-foreground">Use this for client-side integrations</p>
                            </div>

                            <div className="space-y-2">
                                <Label>Secret API Key</Label>
                                <div className="flex space-x-2">
                                    <Input
                                        type="password"
                                        readOnly
                                        value={apiSecretKey}
                                    />
                                    <Button variant="outline" size="sm">Show</Button>
                                    <Button variant="outline" size="sm">Copy</Button>
                                </div>
                                <p className="text-sm text-muted-foreground">Keep this confidential. Use for server-side requests only.</p>
                            </div>

                            <div className="pt-4 space-y-2">
                                <Label>API Permissions</Label>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="perm-payment">Payment Processing</Label>
                                        <Switch id="perm-payment" defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="perm-conversion">Currency Conversion</Label>
                                        <Switch id="perm-conversion" defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="perm-customer">Customer Management</Label>
                                        <Switch id="perm-customer" defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="perm-webhook">Webhook Management</Label>
                                        <Switch id="perm-webhook" defaultChecked />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                            <Button variant="outline">Revoke All Keys</Button>
                            <Button className="bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white">
                                Generate New Keys
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* Wallet Settings */}
                <TabsContent value="wallet" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Wallet Settings</CardTitle>
                            <CardDescription>
                                Configure your Bitcoin wallet and withdrawal preferences.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Default Withdrawal Wallet</Label>
                                <div className="p-3 bg-muted rounded-md font-mono text-sm">
                                    bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                                </div>
                                <div className="flex justify-end mt-1">
                                    <Button variant="outline" size="sm">
                                        Update Address
                                    </Button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <div className="space-y-0.5">
                                    <Label>Auto-Withdraw</Label>
                                    <p className="text-sm text-muted-foreground">Automatically withdraw when balance exceeds threshold</p>
                                </div>
                                <Switch defaultChecked={false} />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="withdraw-threshold">Withdrawal Threshold</Label>
                                    <p className="text-sm text-muted-foreground">Minimum balance for auto-withdrawals</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        id="withdraw-threshold"
                                        defaultValue="0.1"
                                        className="w-20 text-right"
                                    />
                                    <span>BTC</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <div className="space-y-0.5">
                                    <Label>Two-Factor for Withdrawals</Label>
                                    <p className="text-sm text-muted-foreground">Require 2FA for all withdrawals</p>
                                </div>
                                <Switch defaultChecked={true} />
                            </div>

                            <div className="pt-2">
                                <Button variant="outline" className="w-full">
                                    <Smartphone className="mr-2 h-4 w-4" />
                                    Set Up Two-Factor Authentication
                                </Button>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white">
                                Save Wallet Settings
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* Placeholder for other tabs */}
                <TabsContent value="notifications">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Settings</CardTitle>
                            <CardDescription>Configure how you receive notifications about payments and system events.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Email Notifications</Label>
                                    <p className="text-sm text-muted-foreground">Receive payment notifications via email</p>
                                </div>
                                <Switch defaultChecked={true} />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Browser Notifications</Label>
                                    <p className="text-sm text-muted-foreground">Show notifications in your browser</p>
                                </div>
                                <Switch defaultChecked={false} />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white">
                                Save Notification Settings
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="security">
                    <Card>
                        <CardHeader>
                            <CardTitle>Security Settings</CardTitle>
                            <CardDescription>Manage your account security preferences.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Two-Factor Authentication</Label>
                                    <p className="text-sm text-muted-foreground">Require 2FA for account login</p>
                                </div>
                                <Switch defaultChecked={false} />
                            </div>

                            <div className="pt-2">
                                <Button variant="outline">Change Password</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="integrations">
                    <Card>
                        <CardHeader>
                            <CardTitle>Integrations</CardTitle>
                            <CardDescription>Connect your Bitcoin payment system with other services.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">No integrations configured yet.</p>
                            <Button className="mt-4 bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white">
                                Add Integration
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}