import Image from "next/image";

export default function AboutPage() {
  return (
    <>
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
              <div className="relative col-span-2 row-span-1 rounded-lg overflow-hidden group">
                   <Image
                      src="/dronespray.jpg"
                      alt="Drone spraying a field"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint="drone spraying field"
                    />
              </div>
              <div className="relative col-span-1 row-span-1 rounded-lg overflow-hidden group">
                  <Image
                    src="/dronescanning.jpg"
                    alt="Drone scanning a field"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint="drone scanning field"
                  />
              </div>
               <div className="relative col-span-1 row-span-1 rounded-lg overflow-hidden group">
                  <Image
                    src="/dronescann.jpg"
                    alt="Drone in hand"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint="drone hand"
                  />
              </div>
          </div>
        </div>
      </section>
    </>
  );
}
