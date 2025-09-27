
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Testimonials from "./Testimonials";

export default function HomePage() {
  return (
    <>
      <div className="relative w-full h-[calc(100vh-150px)]">
        <Image
          src="/Farmland.jpg"
          alt="Farmland"
          fill
          className="object-cover"
          data-ai-hint="farmland landscape"
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
      <section id="about" className="container mx-auto py-16 px-4 md:px-8 text-center scroll-mt-20">
        <h2 className="text-3xl font-bold font-headline mb-4">About Us</h2>
        <h3 className="text-xl font-semibold text-primary mb-6">SMART DRONE SOLUTIONS</h3>
        <p className="max-w-3xl mx-auto text-muted-foreground leading-relaxed">
          Our precision drone spraying services ensure efficient pesticide and fertilizer application, reducing waste and maximizing crop yield. We also provide crop health analysis, offering real-time insights into plant conditions, soil moisture, and pest infestations. With our smart agricultural solutions, farmers can boost productivity, cut costs, and embrace sustainable farming practices. Join us in transforming agriculture with innovation and precision!
        </p>
      </section>
      <section className="container mx-auto pb-16 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative aspect-video">
            <Image
              src="/dronespray.jpg"
              alt="Drone spraying a field"
              fill
              className="object-cover rounded-lg"
              data-ai-hint="drone spraying field"
            />
          </div>
          <div className="relative aspect-video">
            <Image
              src="/dronescanning.jpg"
              alt="Drone scanning a field"
              fill
              className="object-cover rounded-lg"
              data-ai-hint="drone scanning field"
            />
          </div>
        </div>
      </section>
       <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold font-headline mb-10">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <h3 className="text-5xl font-bold text-primary">300+</h3>
              <p className="mt-2 text-lg text-muted-foreground">Regular Customers</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-5xl font-bold text-primary">30+</h3>
              <p className="mt-2 text-lg text-muted-foreground">Professional Engineering</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-5xl font-bold text-primary">300+</h3>
              <p className="mt-2 text-lg text-muted-foreground">Points of Sale Goods</p>
            </div>
          </div>
        </div>
      </section>
      <div id="testimonials" className="scroll-mt-20">
        <Testimonials />
      </div>
      <section id="contact" className="py-16 scroll-mt-20">
        <div className="container mx-auto max-w-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-headline">Our Contact</h2>
            <p className="text-primary font-semibold">Request A Call Back</p>
          </div>
          <div className="space-y-4">
            <Input type="text" placeholder="Your Name" />
            <Input type="tel" placeholder="Phone Number" />
            <Textarea placeholder="Message" rows={5} />
            <Button className="w-full">Send</Button>
          </div>
        </div>
      </section>
    </>
  );
}
