import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";

const services = [
  {
    image: "/precision-agriculture.jpg",
    imageHint: "precision agriculture drone",
    title: "PRECISION AGRICULTURE",
    description: "Utilize drones equipped with advanced sensors to collect data on crop health, soil conditions, and irrigation needs with precision and efficiency.",
  },
  {
    image: "/crop-monitoring.jpg",
    imageHint: "crop monitoring drone",
    title: "CROP MONITORING",
    description: "Monitor crop growth stages, detect pests, diseases, and other issues early on, allowing for targeted interventions and improved yields.",
  },
  {
    image: "/spraying-service.jpg",
    imageHint: "drone spraying field",
    title: "SPRAYING SERVICE",
    description: "Offering drone-based spraying services for precise application of fertilizers, pesticides, and herbicides, reducing chemical usage and environmental impact.",
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
        {services.map((service) => (
            <Card key={service.title} className="flex flex-col">
              <CardHeader className="p-0">
                <div className="relative aspect-video w-full">
                    <Image
                        src={`https://picsum.photos/600/400?random=${Math.random()}`}
                        alt={service.title}
                        fill
                        className="object-cover rounded-t-lg"
                        data-ai-hint={service.imageHint}
                    />
                </div>
              </CardHeader>
              <CardContent className="flex-grow pt-6">
                <h3 className="text-xl font-bold font-headline mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
