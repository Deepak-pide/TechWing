"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Rajesh P.",
    role: "Client",
    quote: "Sprayed my 15-acre cotton field in just 3 hours! Saved 30% on pesticides. Best farming investment after my drip system.",
    avatar: "/placeholder.svg?text=RP",
    initials: "RP",
    imageHint: "smiling farmer"
  },
  {
    name: "Laxmi D.",
    role: "Client",
    quote: "Caught leaf disease early in my tomato farm. Quick response, precise spraying. Saved both money and crop!",
    avatar: "/placeholder.svg?text=LD",
    initials: "LD",
    imageHint: "happy farmer"
  },
  {
    name: "Surinder",
    role: "Client",
    quote: "Perfect for my paddy fields. IFFCO fertilizer spraying super accurate. Just wish booking was quicker in peak season.",
    avatar: "/placeholder.svg?text=S",
    initials: "S",
    imageHint: "farmer man"
  },
  {
    name: "Ahmed",
    role: "Client",
    quote: "Weekly monitoring of my chili farm prevents problems before they start. Reports in local language. Very professional.",
    avatar: "/placeholder.svg?text=A",
    initials: "A",
    imageHint: "farmer portrait"
  },
  {
    name: "Mukesh",
    role: "Client",
    quote: "Managing vegetables and rice with their help. Drone spotted drainage issues I never knew about. Good support in local language. Fair pricing.",
    avatar: "/placeholder.svg?text=M",
    initials: "M",
    imageHint: "agriculture worker"
  },
  {
    name: "Sarita",
    role: "Client",
    quote: "Changed my whole farming approach. Their crop monitoring helped me switch to organic methods. Reports help with organic certification too!",
    avatar: "/placeholder.svg?text=S",
    initials: "S",
    imageHint: "smiling woman"
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
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2">
                <div className="p-1 h-full">
                  <Card className="text-left h-full flex flex-col">
                    <CardContent className="p-6 flex-grow flex flex-col">
                      <div className="flex items-center mb-4">
                        <Avatar className="h-12 w-12 mr-4">
                           <AvatarImage src={`https://picsum.photos/seed/${testimonial.name}/48/48`} data-ai-hint={testimonial.imageHint} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold text-primary">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-foreground/80 italic flex-grow">"{testimonial.quote}"</p>
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
