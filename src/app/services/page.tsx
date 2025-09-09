import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Airplay, Microscope, Leaf } from "lucide-react";

const services = [
  {
    icon: Airplay,
    title: "Precision Drone Spraying",
    description: "Efficient and targeted pesticide and fertilizer application using state-of-the-art drones. Reduce waste and environmental impact while maximizing crop coverage.",
  },
  {
    icon: Leaf,
    title: "Crop Health Analysis",
    description: "Real-time insights into plant conditions, soil moisture, and pest infestations. Our AI-powered analysis helps you detect issues before they become problems.",
  },
  {
    icon: Microscope,
    title: "Disease Detection",
    description: "Early detection of common crop diseases like powdery mildew and rust. Get actionable recommendations to protect your yield and minimize losses.",
  },
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tight text-foreground">What We Do</h1>
        <p className="mt-2 text-lg text-primary font-semibold uppercase tracking-wider">Services We Offer</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <Card key={service.title} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                        <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
