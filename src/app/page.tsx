import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Cloudy, CloudSunRain, CloudRain } from "lucide-react";
import Image from "next/image";

const forecast = [
  { day: "Monday", temp: "24°C", icon: Sun, description: "Sunny" },
  { day: "Tuesday", temp: "22°C", icon: Cloudy, description: "Partly Cloudy" },
  { day: "Wednesday", temp: "20°C", icon: CloudSunRain, description: "Light Showers" },
  { day: "Thursday", temp: "21°C", icon: Sun, description: "Sunny" },
  { day: "Friday", temp: "19°C", icon: CloudRain, description: "Rain" },
  { day: "Saturday", temp: "23°C", icon: Sun, description: "Sunny" },
  { day: "Sunday", temp: "25°C", icon: Sun, description: "Sunny" },
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-headline">Welcome back, Farmer!</h1>
        <p className="text-muted-foreground">Here's an overview of your farm's performance and weather forecast.</p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="font-headline">7-Day Weather Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 text-center">
            {forecast.map((day) => {
              const Icon = day.icon;
              return (
                <div key={day.day} className="flex flex-col items-center space-y-2">
                  <p className="font-medium">{day.day}</p>
                  <Icon className="h-8 w-8 text-muted-foreground" />
                  <p className="font-bold text-lg">{day.temp}</p>
                  <p className="text-xs text-muted-foreground">{day.description}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
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
