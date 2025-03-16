import ThemeToggle from "@/components/Themes/ThemeToggle";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AnalyticsPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
                <ThemeToggle />
            </div>

            <Tabs defaultValue="trends" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="trends">Payment Trends</TabsTrigger>
                    <TabsTrigger value="conversion">Conversion Rates</TabsTrigger>
                    <TabsTrigger value="geography">Geography</TabsTrigger>
                </TabsList>

                <TabsContent value="trends" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Volume Over Time</CardTitle>
                            <CardDescription>
                                Track your Bitcoin payment volume trends
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="h-80">
                            {/* Placeholder for chart */}
                            <div className="w-full h-full bg-muted/30 rounded-lg flex items-center justify-center">
                                <p className="text-muted-foreground">Bitcoin Payment Volume Chart</p>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Payment Count</CardTitle>
                                <CardDescription>Monthly payment transactions</CardDescription>
                            </CardHeader>
                            <CardContent className="h-60">
                                {/* Placeholder for chart */}
                                <div className="w-full h-full bg-muted/30 rounded-lg flex items-center justify-center">
                                    <p className="text-muted-foreground">Transaction Count Chart</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Average Transaction</CardTitle>
                                <CardDescription>BTC value per transaction</CardDescription>
                            </CardHeader>
                            <CardContent className="h-60">
                                {/* Placeholder for chart */}
                                <div className="w-full h-full bg-muted/30 rounded-lg flex items-center justify-center">
                                    <p className="text-muted-foreground">Average Value Chart</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Settlement Time</CardTitle>
                                <CardDescription>Average confirmation speed</CardDescription>
                            </CardHeader>
                            <CardContent className="h-60">
                                {/* Placeholder for chart */}
                                <div className="w-full h-full bg-muted/30 rounded-lg flex items-center justify-center">
                                    <p className="text-muted-foreground">Settlement Speed Chart</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="conversion" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>ckBTC Conversion Trends</CardTitle>
                            <CardDescription>
                                How merchants are using their Bitcoin payments
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="h-80">
                            {/* Placeholder for chart */}
                            <div className="w-full h-full bg-muted/30 rounded-lg flex items-center justify-center">
                                <p className="text-muted-foreground">Conversion Trends Chart</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="geography" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Geography</CardTitle>
                            <CardDescription>
                                Where your Bitcoin payments are coming from
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="h-80">
                            {/* Placeholder for chart */}
                            <div className="w-full h-full bg-muted/30 rounded-lg flex items-center justify-center">
                                <p className="text-muted-foreground">Geographic Distribution Map</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}