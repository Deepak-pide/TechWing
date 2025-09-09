"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
  {
    name: "Rajesh P.",
    role: "Client",
    quote: "Sprayed my 15-acre cotton field in just 3 hours! Saved 30% on pesticides. Best farming investment after my drip system."
  },
  {
    name: "Laxmi D.",
    role: "Client",
    quote: "Caught leaf disease early in my tomato farm. Quick response, precise spraying. Saved both money and crop!"
  },
  {
    name: "Surinder",
    role: "Client",
    quote: "Perfect for my paddy fields. IFFCO fertilizer spraying super accurate. Just wish booking was quicker in peak season."
  },
  {
    name: "Ahmed",
    role: "Client",
    quote: "Weekly monitoring of my chili farm prevents problems before they start. Reports in local language. Very professional."
  },
  {
    name: "Mukesh",
    role: "Client",
    quote: "Managing vegetables and rice with their help. Drone spotted drainage issues I never knew about. Good support in local language. Fair pricing."
  },
  {
    name: "Sarita",
    role: "Client",
    quote: "Changed my whole farming approach. Their crop monitoring helped me switch to organic methods. Reports help with organic certification too!"
  }
];

export default function Testimonials() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section className="bg-muted/50 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold font-headline mb-4">What Our Clients Say</h2>
        <p className="text-muted-foreground mb-12">Real stories from farmers we've helped.</p>
        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-4xl mx-auto"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="text-left">
                    <CardContent className="p-6">
                      <p className="mb-4 text-foreground/80 italic">"{testimonial.quote}"</p>
                      <div className="text-right">
                        <p className="font-bold text-primary">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}