
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AdminOrdersPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-3xl">Orders</CardTitle>
                <CardDescription>Manage all customer orders from this page.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Order management functionality will be displayed here.</p>
            </CardContent>
        </Card>
    </div>
  );
}
