
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const plans = [
    {
        name: 'BASIC PACKAGE',
        price: '5,000-7,000',
        image: '/basic.jpg',
        imageHint: 'drone over farm field',
        features: [
            '~ 6-8 acre of pesticide spraying',
            '~ Monthly field surveillance',
            '~ Basic crop health report'
        ],
        buttonText: 'Choose Basic',
        variant: 'outline'
    },
    {
        name: 'ADVANCED PACKAGE',
        price: '10,000-15,000',
        image: '/advanced.jpg',
        imageHint: 'drone spraying crops',
        features: [
            '~ 12-18 acre of pesticide spraying',
            '~ Bi-weekly field surveillance & disease detection',
            '~ Priority report delivery'
        ],
        buttonText: 'Choose Advanced',
        variant: 'default'
    },
    {
        name: 'PREMIUM PACKAGE',
        price: '20,000-30,000',
        image: '/premium.jpg',
        imageHint: 'high tech drone in air',
        features: [
            '~ 25+ acre of pesticide spraying',
            '~ Weekly surveillance & disease detection',
            '~ Real-time field monitoring'
        ],
        buttonText: 'Choose Premium',
        variant: 'outline'
    }
]

export default function ServicesPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tight text-foreground">Our Pricing Plans</h1>
        <p className="mt-2 text-lg text-muted-foreground">Choose the best plan for your farming needs.</p>
      </div>
      
      <section className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card key={plan.name} className={`flex flex-col ${plan.name === 'ADVANCED PACKAGE' ? 'border-primary' : ''}`}>
              <CardHeader className="p-0">
                  <div className="relative aspect-video w-full">
                      <Image
                        src={plan.image}
                        alt={plan.name}
                        fill
                        className="object-cover"
                        data-ai-hint={plan.imageHint}
                      />
                  </div>
              </CardHeader>
              <div className="p-6 flex flex-col flex-grow">
                <CardTitle className="font-headline">{plan.name}</CardTitle>
                <CardDescription className="mt-2">
                  <span className="text-3xl font-bold text-foreground">
                    <span className="font-sans font-normal">₹</span>{plan.price}
                  </span>
                </CardDescription>
                <CardContent className="flex-grow space-y-4 p-0 mt-6">
                    <ul className="space-y-3">
                    {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                        <span className="text-primary mt-1">~</span>
                        <span className="text-muted-foreground">{feature.substring(2)}</span>
                        </li>
                    ))}
                    </ul>
                </CardContent>
                <CardFooter className="p-0 mt-6">
                    <Button className="w-full" variant={plan.variant as any}>{plan.buttonText}</Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
