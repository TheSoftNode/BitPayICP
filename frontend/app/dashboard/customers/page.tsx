import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Filter, Plus, Search, UserPlus } from "lucide-react";

export default function CustomersPage() {
    // This is sample data that would typically come from a database
    const customers = [
        {
            id: "cust001",
            name: "John Doe",
            email: "john.doe@example.com",
            totalSpent: 1245.80,
            transactions: 8,
            lastTransaction: "2025-03-05T14:30:00",
            status: "active",
        },
        {
            id: "cust002",
            name: "Jane Smith",
            email: "jane.smith@example.com",
            totalSpent: 876.25,
            transactions: 5,
            lastTransaction: "2025-03-08T11:15:00",
            status: "active",
        },
        {
            id: "cust003",
            name: "Robert Johnson",
            email: "robert.johnson@example.com",
            totalSpent: 2451.50,
            transactions: 12,
            lastTransaction: "2025-03-09T09:45:00",
            status: "active",
        },
        {
            id: "cust004",
            name: "Sarah Williams",
            email: "sarah.williams@example.com",
            totalSpent: 532.15,
            transactions: 3,
            lastTransaction: "2025-03-07T16:20:00",
            status: "active",
        },
        {
            id: "cust005",
            name: "Michael Brown",
            email: "michael.brown@example.com",
            totalSpent: 1890.75,
            transactions: 10,
            lastTransaction: "2025-03-10T10:10:00",
            status: "active",
        },
        {
            id: "cust006",
            name: "Emily Davis",
            email: "emily.davis@example.com",
            totalSpent: 325.50,
            transactions: 2,
            lastTransaction: "2025-03-02T15:30:00",
            status: "inactive",
        },
        {
            id: "cust007",
            name: "Alex Johnson",
            email: "alex.johnson@example.com",
            totalSpent: 745.20,
            transactions: 4,
            lastTransaction: "2025-03-06T13:40:00",
            status: "active",
        },
    ];

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                    <Button size="sm" className="bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add Customer
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Customer Management</CardTitle>
                    <CardDescription>
                        View and manage your customers who have made Bitcoin payments.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col space-y-4">
                        <div className="flex flex-col sm:flex-row gap-4 items-end">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="Search customers..." className="pl-8" />
                                </div>
                            </div>
                            <Button variant="outline" size="sm">
                                <Filter className="mr-2 h-4 w-4" />
                                Filter
                            </Button>
                        </div>

                        <div className="rounded-md border">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-muted/50">
                                            <th className="text-left p-3 text-sm font-medium">Customer</th>
                                            <th className="text-left p-3 text-sm font-medium">Email</th>
                                            <th className="text-right p-3 text-sm font-medium">Total Spent</th>
                                            <th className="text-right p-3 text-sm font-medium">Transactions</th>
                                            <th className="text-left p-3 text-sm font-medium">Last Transaction</th>
                                            <th className="text-left p-3 text-sm font-medium">Status</th>
                                            <th className="text-right p-3 text-sm font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customers.map((customer) => (
                                            <tr key={customer.id} className="border-t hover:bg-muted/50">
                                                <td className="p-3 text-sm">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-2">
                                                            <span className="font-medium text-xs">{customer.name.split(' ').map(n => n[0]).join('')}</span>
                                                        </div>
                                                        <div>{customer.name}</div>
                                                    </div>
                                                </td>
                                                <td className="p-3 text-sm">{customer.email}</td>
                                                <td className="p-3 text-sm text-right font-medium">
                                                    ${customer.totalSpent.toFixed(2)}
                                                </td>
                                                <td className="p-3 text-sm text-right">{customer.transactions}</td>
                                                <td className="p-3 text-sm">
                                                    {new Date(customer.lastTransaction).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </td>
                                                <td className="p-3 text-sm">
                                                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${customer.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                                            'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                                                        }`}>
                                                        <span className={`mr-1 h-1.5 w-1.5 rounded-full ${customer.status === 'active' ? 'bg-green-600 dark:bg-green-400' :
                                                                'bg-gray-600 dark:bg-gray-400'
                                                            }`}></span>
                                                        <span className="capitalize">{customer.status}</span>
                                                    </span>
                                                </td>
                                                <td className="p-3 text-sm text-right">
                                                    <Button variant="ghost" size="sm">
                                                        View
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                Showing <span className="font-medium">7</span> of <span className="font-medium">100</span> customers
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