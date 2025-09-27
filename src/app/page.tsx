



import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Testimonials from "./Testimonials";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";

const services = [
  {
    image: "/drone-survilience.jpg",
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
    image: "/dronescan.jpg",
    imageHint: "drone spraying field",
    title: "SPRAYING SERVICE",
    description: "Offering drone-based spraying services for precise application of fertilizers, pesticides, and herbicides, reducing chemical usage and environmental impact.",
  },
];


export default function HomePage() {
  return (
    <>
      <div className="relative w-full h-[calc(100vh-150px)]">
        <Image
          src="/image.jpg"
          alt="Techwing Drone"
          fill
          className="object-cover"
          data-ai-hint="drone technology"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold font-headline">Welcome to TechWing</h1>
            <p className="mt-4 text-lg md:text-xl">Your partner in modern farming.</p>
          </div>
        </div>
      </div>
      <section id="about" className="container mx-auto py-16 px-4 md:px-8 scroll-mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h2 className="text-3xl font-bold font-headline mb-4">About Us</h2>
            <h3 className="text-xl font-semibold text-primary mb-6">SMART DRONE SOLUTIONS</h3>
            <p className="text-muted-foreground leading-relaxed">
              Our precision drone spraying services ensure efficient pesticide and fertilizer application, reducing waste and maximizing crop yield. We also provide crop health analysis, offering real-time insights into plant conditions, soil moisture, and pest infestations. With our smart agricultural solutions, farmers can boost productivity, cut costs, and embrace sustainable farming practices. Join us in transforming agriculture with innovation and precision!
            </p>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[400px]">
              <div className="relative col-span-2 row-span-1 rounded-lg overflow-hidden">
                   <Image
                      src="/dronespray.jpg"
                      alt="Drone spraying a field"
                      fill
                      className="object-cover"
                      data-ai-hint="drone spraying field"
                    />
              </div>
              <div className="relative col-span-1 row-span-1 rounded-lg overflow-hidden">
                  <Image
                    src="/dronescanning.jpg"
                    alt="Drone scanning a field"
                    fill
                    className="object-cover"
                    data-ai-hint="drone scanning field"
                  />
              </div>
               <div className="relative col-span-1 row-span-1 rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1588825838533-3b6391a9957a?q=80&w=1974&auto=format&fit=crop"
                    alt="Drone in hand"
                    fill
                    className="object-cover"
                    data-ai-hint="drone hand"
                  />
              </div>
          </div>
        </div>
      </section>
      <section id="services" className="py-16 bg-muted/50 scroll-mt-20">
        <div className="container mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-headline">What We Offer</h2>
                <p className="text-primary font-semibold uppercase tracking-wider">Services</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                {services.map((service, index) => (
                    <div key={service.title} className={cn("flex flex-col items-center text-center", index === 1 && "md:-translate-y-4 z-10")}>
                      <Card className={cn("flex flex-col w-full", index === 1 && "shadow-xl")}>
                        <CardHeader className="p-0">
                            <div className="relative aspect-video w-full">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover rounded-t-lg"
                                    data-ai-hint={service.imageHint}
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow p-6">
                            <h3 className="text-xl font-bold font-headline mb-2">{service.title}</h3>
                            <p className="text-muted-foreground">{service.description}</p>
                        </CardContent>
                      </Card>
                      <div className="mt-4">
                        <Link href="/services">
                            <Button variant={'default'} className="bg-black hover:bg-black/80">Read More</Button>
                        </Link>
                      </div>
                    </div>
                ))}
            </div>
        </div>
      </section>
       <section className="relative py-24 text-white">
          <Image
            src="/background2.jpg"
            alt="Farm background"
            fill
            className="object-cover"
            data-ai-hint="farm sunset"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative container mx-auto text-center">
            <h2 className="text-3xl font-bold font-headline mb-12">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <div className="w-48 h-48 rounded-full bg-accent flex justify-center items-center text-accent-foreground shadow-lg">
                    <h3 className="text-5xl font-bold">300+</h3>
                </div>
                <p className="mt-4 text-lg">Regular Customers</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-48 h-48 rounded-full bg-accent flex justify-center items-center text-accent-foreground shadow-lg">
                    <h3 className="text-5xl font-bold">30+</h3>
                </div>
                 <p className="mt-4 text-lg">Professional Engineering</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-48 h-48 rounded-full bg-accent flex justify-center items-center text-accent-foreground shadow-lg">
                    <h3 className="text-5xl font-bold">300+</h3>
                </div>
                <p className="mt-4 text-lg">Points of Sale Goods</p>
              </div>
            </div>
          </div>
      </section>
      <div id="testimonials" className="scroll-mt-20">
        <Testimonials />
      </div>
      <section id="contact" className="py-16 scroll-mt-20">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-headline">Our Contact</h2>
            <p className="text-primary font-semibold">Request A Call Back</p>
          </div>
          <div className="max-w-xl mx-auto">
            <div className="space-y-4">
                <Input type="text" placeholder="Your Name" />
                <Input type="tel" placeholder="Phone Number" />
                <Textarea placeholder="Message" rows={5} />
                <Input type="text" placeholder="Your Location" />
                <Button className="w-full">Send</Button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full h-[450px]">
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112073.61110033142!2d77.15948305820313!3d28.620265200000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sNew%20Delhi%2C%20Delhi%2C%20India!5e0!3m2!1sen!2sus!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map of New Delhi"
        ></iframe>
      </section>
    </>
  );
}
