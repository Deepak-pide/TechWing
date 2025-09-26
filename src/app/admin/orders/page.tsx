
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const orders = [
    {
        id: 'ORD001',
        customer: 'Rajesh P.',
        service: 'Pesticide Spraying',
        date: '2024-07-20',
        status: 'Completed',
    },
    {
        id: 'ORD002',
        customer: 'Laxmi D.',
        service: 'Crop Health Analysis',
        date: '2024-07-22',
        status: 'Pending',
    }
];

const statusStyles: { [key: string]: string } = {
    Completed: "bg-green-500 text-white",
    Pending: "bg-yellow-500 text-white",
    Cancelled: "bg-red-500 text-white"
}


export default function AdminOrdersPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-3xl">Orders</CardTitle>
                <CardDescription>Manage all customer orders from this page.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Service</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="font-medium">{order.id}</TableCell>
                                <TableCell>{order.customer}</TableCell>
                                <TableCell>{order.service}</TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell>
                                    <Badge className={cn("border-0", statusStyles[order.status])}>
                                        {order.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
