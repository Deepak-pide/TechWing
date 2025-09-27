import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
    return (
        <>
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
                             <div className="flex gap-4">
                                <Input type="text" placeholder="Your Location" className="flex-grow" />
                                <Button>Send</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full h-[450px]">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112073.61110033142!2d77.15948305820313!3d28.620265200000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sNew%20Delhi%2C%20Delhi%2C%2C%20India!5e0!3m2!1sen!2sus!4v1700000000000"
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
    )
}
