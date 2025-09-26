
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-3xl">Admin Dashboard</CardTitle>
                <CardDescription>Welcome, Admin! Manage your application from here.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>This is the central hub for administrative tasks. You can add more tools and widgets here as needed.</p>
            </CardContent>
        </Card>
    </div>
  );
}
