import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Sun, Tractor, Droplets } from "lucide-react";
import Image from "next/image";

const metrics = [
  { title: "Crop Coverage", value: "85%", icon: Leaf, description: "Area under cultivation" },
  { title: "Soil Moisture", value: "62%", icon: Droplets, description: "Optimal levels" },
  { title: "Weather", value: "Sunny, 24°C", icon: Sun, description: "Next 24 hours" },
  { title: "Equipment Status", value: "All Active", icon: Tractor, description: "No issues reported" },
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-headline">Welcome back, Farmer!</h1>
        <p className="text-muted-foreground">Here's an overview of your farm's performance.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium font-headline">{metric.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline">Farm Fields</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="relative aspect-video w-full">
              <Image src="https://picsum.photos/800/450" alt="Farm fields map" fill className="rounded-md object-cover" data-ai-hint="farm fields"/>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">My Crops</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center justify-between">
                <span>Wheat</span>
                <span className="font-medium">150 Acres</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Corn</span>
                <span className="font-medium">100 Acres</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Soybeans</span>
                <span className="font-medium">80 Acres</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Potatoes</span>
                <span className="font-medium">30 Acres</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
