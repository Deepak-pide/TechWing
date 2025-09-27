import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
    return (
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
    )
}