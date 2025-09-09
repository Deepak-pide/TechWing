
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, DollarSign, Droplets } from "lucide-react";
import Image from "next/image";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { month: "January", infection: 35, pesticide: 65 },
  { month: "February", infection: 42, pesticide: 70 },
  { month: "March", infection: 55, pesticide: 80 },
  { month: "April", infection: 40, pesticide: 60 },
  { month: "May", infection: 30, pesticide: 50 },
  { month: "June", infection: 25, pesticide: 45 },
];

const chartConfig = {
  pesticide: {
    label: "Pesticide Usage (%)",
    color: "hsl(var(--chart-1))",
  },
  infection: {
    label: "Infection Rate (%)",
    color: "hsl(var(--chart-2))",
  },
};

export default function ReportPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-headline">Crop Health Report</h1>
        <p className="text-muted-foreground">Detailed analysis for Wheat crop, generated on {new Date().toLocaleDateString()}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Crop Infection Heatmap</CardTitle>
              <CardDescription>Real-time color-coded map showing areas of concern.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video w-full">
                <Image
                  src="https://images.unsplash.com/photo-1524553496250-1a722745ae00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxmYXJtbGFuZHxlbnwwfHx8fDE3NTc0MTI2NjB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Farm field with detections"
                  fill
                  className="rounded-md object-cover"
                  data-ai-hint="farm fields satellite"
                />
                <div className="absolute top-[20%] left-[30%] h-4 w-4 rounded-full bg-red-500 animate-pulse ring-2 ring-white"></div>
                <div className="absolute top-[50%] left-[60%] h-4 w-4 rounded-full bg-red-500 animate-pulse ring-2 ring-white"></div>
                <div className="absolute top-[65%] left-[45%] h-4 w-4 rounded-full bg-red-500 animate-pulse ring-2 ring-white"></div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-1 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Disease Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>High Risk: Powdery Mildew Detected</AlertTitle>
                <AlertDescription>
                  <p className="mb-2">Powdery mildew has been identified in multiple sections of the field. This fungal disease appears as white, powdery spots on leaves and can significantly reduce crop yield if not treated promptly.</p>
                  <h4 className="font-semibold mt-4 mb-2">Recommendations:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Apply a targeted fungicide to affected areas immediately.</li>
                    <li>Increase air circulation by scouting for and removing dense foliage.</li>
                    <li>Monitor crop closely for the next 7-10 days.</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Pesticide Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>
                  <strong>Fungicide A:</strong> Recommended for early-stage infections. Apply at a rate of 1 liter per hectare.
                </li>
                <li>
                  <strong>Fungicide B:</strong> A more potent option for widespread infections. Requires careful handling and adherence to safety protocols.
                </li>
                <li>
                  <strong>Organic Option:</strong> A neem oil-based solution can be effective in less severe cases. Apply every 7-10 days.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Infection Rate vs. Pesticide Usage</CardTitle>
                <CardDescription>Monthly trend analysis of infection rates and pesticide application.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                         <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                            unit="%"
                         />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="infection" fill="var(--color-infection)" radius={4} />
                        <Bar dataKey="pesticide" fill="var(--color-pesticide)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
                <CardDescription>Summary of savings and reductions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 bg-primary/10 text-primary p-3 rounded-full">
                        <DollarSign className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-muted-foreground">Estimated Cost Savings</p>
                        <p className="text-2xl font-bold">$1,250</p>
                    </div>
                </div>
                 <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 bg-accent/20 text-accent p-3 rounded-full">
                        <Droplets className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-muted-foreground">Pesticide Reduction</p>
                        <p className="text-2xl font-bold">15%</p>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
