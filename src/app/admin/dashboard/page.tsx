import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Video, Droplets, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
        <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground font-headline">Admin Console</h1>
            <p className="text-muted-foreground">Welcome, Admin! Manage your application from here.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-medium">Surveillance</CardTitle>
                    <Video className="h-6 w-6 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                        Monitor active drone surveillance and review past footage.
                    </p>
                    <Link href="#">
                        <Button variant="outline">
                            Go to Surveillance <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-medium">Spraying</CardTitle>
                    <Droplets className="h-6 w-6 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                        Manage spraying schedules, assignments, and pesticide inventory.
                    </p>
                    <Link href="#">
                         <Button variant="outline">
                            Go to Spraying <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
