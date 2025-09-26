import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Video, Droplets, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
        <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground font-headline">Admin Console</h1>
            <p className="text-muted-foreground">Welcome, Admin! Manage your application from here.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="relative overflow-hidden group">
                <Image 
                    src="https://elistair.com/wp-content/uploads/2024/07/Different_types_of_security_drone_-_Multi_rotor_drones.jpg"
                    alt="Drone Surveillance"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint="drone surveillance"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
                <div className="relative flex flex-col h-full p-6">
                    <CardHeader className="p-0">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-medium text-primary-foreground">Surveillance</CardTitle>
                            <Video className="h-6 w-6 text-primary-foreground/80" />
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 flex-grow mt-4">
                        <p className="text-sm text-primary-foreground/80 mb-4">
                            Monitor active drone surveillance and review past footage.
                        </p>
                    </CardContent>
                    <div className="mt-auto">
                        <Link href="#">
                            <Button variant="secondary">
                                Go to Surveillance <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </Card>
            <Card className="relative overflow-hidden group">
                <Image 
                    src="https://www.xboom.in/wp-content/uploads/2022/08/Untitled-design-37-3.png"
                    alt="Drone Spraying"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint="drone spraying"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
                 <div className="relative flex flex-col h-full p-6">
                    <CardHeader className="p-0">
                       <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-medium text-primary-foreground">Spraying</CardTitle>
                            <Droplets className="h-6 w-6 text-primary-foreground/80" />
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 flex-grow mt-4">
                        <p className="text-sm text-primary-foreground/80 mb-4">
                            Manage spraying schedules, assignments, and pesticide inventory.
                        </p>
                    </CardContent>
                    <div className="mt-auto">
                        <Link href="#">
                            <Button variant="secondary">
                                Go to Spraying <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </Card>
        </div>
    </div>
  );
}
