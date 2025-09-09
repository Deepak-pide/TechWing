import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

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

const plans = [
    {
        name: 'Basic',
        price: '$49',
        priceDetail: '/month/field',
        features: [
            'Basic Crop Health Monitoring',
            'Standard Resolution Imagery',
            'Email Support',
            'Monthly Reports'
        ],
        buttonText: 'Choose Basic',
        variant: 'outline'
    },
    {
        name: 'Pro',
        price: '$99',
        priceDetail: '/month/field',
        features: [
            'Advanced Health & Pest Detection',
            'High-Resolution Imagery',
            'Priority Email & Phone Support',
            'Weekly In-depth Reports',
            'Pesticide Spraying Plan'
        ],
        buttonText: 'Choose Pro',
        variant: 'default'
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        priceDetail: '',
        features: [
            'All Pro Features',
            'Multi-Field Management',
            'API Access & Integrations',
            'Dedicated Account Manager',
            'Custom Feature Development'
        ],
        buttonText: 'Contact Us',
        variant: 'outline'
    }
]

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

       <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-headline">Our Pricing Plans</h2>
          <p className="mt-2 text-muted-foreground">Choose the best plan for your farming needs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card key={plan.name} className={`flex flex-col ${plan.name === 'Pro' ? 'border-primary' : ''}`}>
              <CardHeader>
                <CardTitle className="font-headline">{plan.name}</CardTitle>
                <CardDescription>
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.priceDetail}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={plan.variant as any}>{plan.buttonText}</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
