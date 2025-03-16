import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Bitcoin, Download, Filter, Search } from "lucide-react";
import ThemeToggle from "@/components/Themes/ThemeToggle";

export default function TransactionsPage() {
    // This would normally come from your data source
    const transactions = [
        { id: "tx001", date: "2025-03-10T12:30:00", type: "payment", amount: "0.025", status: "completed", customer: "John Doe" },
        { id: "tx002", date: "2025-03-09T14:45:00", type: "payment", amount: "0.012", status: "completed", customer: "Jane Smith" },
        { id: "tx003", date: "2025-03-08T09:15:00", type: "refund", amount: "0.005", status: "completed", customer: "Michael Brown" },
        { id: "tx004", date: "2025-03-07T16:20:00", type: "payment", amount: "0.035", status: "pending", customer: "Sarah Williams" },
        { id: "tx005", date: "2025-03-06T10:10:00", type: "payment", amount: "0.018", status: "completed", customer: "Alex Johnson" },
        { id: "tx006", date: "2025-03-05T11:05:00", type: "withdrawal", amount: "0.075", status: "completed", customer: "You" },
        { id: "tx007", date: "2025-03-04T13:40:00", type: "payment", amount: "0.022", status: "completed", customer: "Robert Miller" },
        { id: "tx008", date: "2025-03-03T15:30:00", type: "payment", amount: "0.009", status: "failed", customer: "Emily Davis" },
    ];

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
                <div className="flex items-center space-x-2">
                    <ThemeToggle />
                    <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                    </Button>
                    <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>
                        View all your Bitcoin payments and conversions on the ICP network.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col space-y-4">
                        <div className="flex flex-col sm:flex-row gap-4 items-end">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="Search transactions..." className="pl-8" />
                                </div>
                            </div>
                            <div className="w-full sm:w-40">
                                <Select defaultValue="all">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Types</SelectItem>
                                        <SelectItem value="payment">Payments</SelectItem>
                                        <SelectItem value="refund">Refunds</SelectItem>
                                        <SelectItem value="withdrawal">Withdrawals</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="w-full sm:w-40">
                                <Select defaultValue="all">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Statuses</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="failed">Failed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="rounded-md border">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-muted/50">
                                            <th className="text-left p-3 text-sm font-medium">Date</th>
                                            <th className="text-left p-3 text-sm font-medium">Transaction ID</th>
                                            <th className="text-left p-3 text-sm font-medium">Type</th>
                                            <th className="text-left p-3 text-sm font-medium">Customer</th>
                                            <th className="text-right p-3 text-sm font-medium">Amount (BTC)</th>
                                            <th className="text-left p-3 text-sm font-medium">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transactions.map((tx) => (
                                            <tr key={tx.id} className="border-t hover:bg-muted/50">
                                                <td className="p-3 text-sm">
                                                    {new Date(tx.date).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </td>
                                                <td className="p-3 text-sm font-mono">{tx.id}</td>
                                                <td className="p-3 text-sm">
                                                    <div className="flex items-center">
                                                        <div className={`w-2 h-2 rounded-full mr-2 ${tx.type === 'payment' ? 'bg-green-500' :
                                                            tx.type === 'refund' ? 'bg-orange-500' : 'bg-blue-500'
                                                            }`}></div>
                                                        <span className="capitalize">{tx.type}</span>
                                                    </div>
                                                </td>
                                                <td className="p-3 text-sm">{tx.customer}</td>
                                                <td className="p-3 text-sm text-right font-medium">
                                                    <div className="flex items-center justify-end">
                                                        <Bitcoin className="h-3 w-3 mr-1 text-orange-500" />
                                                        {tx.amount}
                                                    </div>
                                                </td>
                                                <td className="p-3 text-sm">
                                                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${tx.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                                        tx.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                            'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                                        }`}>
                                                        <span className={`mr-1 h-1.5 w-1.5 rounded-full ${tx.status === 'completed' ? 'bg-green-600 dark:bg-green-400' :
                                                            tx.status === 'pending' ? 'bg-yellow-600 dark:bg-yellow-400' :
                                                                'bg-red-600 dark:bg-red-400'
                                                            }`}></span>
                                                        <span className="capitalize">{tx.status}</span>
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                Showing <span className="font-medium">8</span> of <span className="font-medium">120</span> transactions
                            </p>
                            <div className="flex items-center space-x-2">
                                <Button variant="outline" size="sm" disabled>
                                    Previous
                                </Button>
                                <Button variant="outline" size="sm">
                                    Next
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}