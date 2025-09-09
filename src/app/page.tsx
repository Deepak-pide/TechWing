import Image from "next/image";

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
            <h1 className="text-4xl md:text-6xl font-bold font-headline">Welcome to BetaFlight</h1>
            <p className="mt-4 text-lg md:text-xl">Your partner in modern farming.</p>
          </div>
        </div>
      </div>
      <section className="container mx-auto py-16 px-4 md:px-8 text-center">
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
    </>
  );
}
