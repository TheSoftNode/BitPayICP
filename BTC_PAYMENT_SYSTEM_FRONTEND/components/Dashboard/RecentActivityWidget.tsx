import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bitcoin, CreditCard, ExternalLink, RefreshCw, CheckCircle, Clock, XCircle } from "lucide-react";

type ActivityItem = {
    id: string;
    type: "payment" | "conversion" | "refund" | "withdrawal";
    title: string;
    subtitle: string;
    amount: string;
    status: "completed" | "pending" | "failed";
    time: string;
};

const RecentActivityWidget = () => {
    // Sample activity data - would come from an API in a real app
    const activities: ActivityItem[] = [
        {
            id: "act1",
            type: "payment",
            title: "Bitcoin Payment Received",
            subtitle: "From Customer #1248",
            amount: "+0.024 BTC",
            status: "completed",
            time: "10 minutes ago",
        },
        {
            id: "act2",
            type: "conversion",
            title: "Converted to USDC",
            subtitle: "Automatic conversion",
            amount: "956.32 USDC",
            status: "completed",
            time: "25 minutes ago",
        },
        {
            id: "act3",
            type: "payment",
            title: "Bitcoin Payment Received",
            subtitle: "From Customer #1247",
            amount: "+0.015 BTC",
            status: "pending",
            time: "1 hour ago",
        },
        {
            id: "act4",
            type: "refund",
            title: "Refund Issued",
            subtitle: "To Customer #1242",
            amount: "-0.005 BTC",
            status: "completed",
            time: "2 hours ago",
        },
        {
            id: "act5",
            type: "payment",
            title: "Bitcoin Payment Failed",
            subtitle: "From Customer #1240",
            amount: "0.018 BTC",
            status: "failed",
            time: "3 hours ago",
        },
    ];

    // Helper function to get icon for activity type
    const getActivityIcon = (type: ActivityItem["type"], status: ActivityItem["status"]) => {
        switch (type) {
            case "payment":
                return <Bitcoin className="h-5 w-5 text-orange-500" />;
            case "conversion":
                return <RefreshCw className="h-5 w-5 text-blue-500" />;
            case "refund":
                return <CreditCard className="h-5 w-5 text-purple-500" />;
            case "withdrawal":
                return <ExternalLink className="h-5 w-5 text-green-500" />;
            default:
                return <Bitcoin className="h-5 w-5 text-orange-500" />;
        }
    };

    // Helper function to get status indicator
    const getStatusIndicator = (status: ActivityItem["status"]) => {
        switch (status) {
            case "completed":
                return <CheckCircle className="h-4 w-4 text-green-500" />;
            case "pending":
                return <Clock className="h-4 w-4 text-yellow-500" />;
            case "failed":
                return <XCircle className="h-4 w-4 text-red-500" />;
            default:
                return <Clock className="h-4 w-4 text-yellow-500" />;
        }
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                    <CardTitle className="text-md font-medium">Recent Activity</CardTitle>
                    <CardDescription>Latest transactions and conversions</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                    View All
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {activities.map((activity) => (
                        <div
                            key={activity.id}
                            className="flex items-start p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                        >
                            <div className="rounded-full p-2 bg-background border mr-3 flex-shrink-0">
                                {getActivityIcon(activity.type, activity.status)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-medium text-sm leading-none mb-1">{activity.title}</p>
                                        <p className="text-xs text-muted-foreground">{activity.subtitle}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-sm leading-none mb-1">{activity.amount}</p>
                                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                                    </div>
                                </div>
                                <div className="flex items-center mt-2">
                                    {getStatusIndicator(activity.status)}
                                    <span
                                        className={`text-xs ml-1 ${activity.status === "completed"
                                                ? "text-green-500"
                                                : activity.status === "pending"
                                                    ? "text-yellow-500"
                                                    : "text-red-500"
                                            }`}
                                    >
                                        {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default RecentActivityWidget;