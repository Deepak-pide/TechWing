import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Cloudy, CloudSunRain, CloudRain } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const forecast = [
  { day: "Monday", temp: "24°C", icon: Sun, description: "Sunny" },
  { day: "Tuesday", temp: "22°C", icon: Cloudy, description: "Partly Cloudy" },
  { day: "Wednesday", temp: "20°C", icon: CloudSunRain, description: "Light Showers" },
  { day: "Thursday", temp: "21°C", icon: Sun, description: "Sunny" },
  { day: "Friday", temp: "19°C", icon: CloudRain, description: "Rain" },
  { day: "Saturday", temp: "23°C", icon: Sun, description: "Sunny" },
  { day: "Sunday", temp: "25°C", icon: Sun, description: "Sunny" },
];

const today = forecast[0];
const nextDays = forecast.slice(1, 5);

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-8">

      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="font-headline">Weather Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center text-center mb-6">
            <h2 className="text-xl font-semibold">{today.day}</h2>
            <today.icon className="h-16 w-16 text-muted-foreground my-2" />
            <p className="font-bold text-4xl">{today.temp}</p>
            <p className="text-muted-foreground">{today.description}</p>
          </div>
          <Separator className="my-4" />
          <div className="flex gap-4 text-center overflow-x-auto pb-2">
            {nextDays.map((day) => {
              const Icon = day.icon;
              return (
                <div key={day.day} className="flex flex-col items-center space-y-1 min-w-[4rem]">
                  <p className="font-medium text-sm">{day.day.substring(0,3)}</p>
                  <Icon className="h-6 w-6 text-muted-foreground" />
                  <p className="font-bold text-md">{day.temp}</p>
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
