import Image from "next/image";

export default function HomePage() {
  return (
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
  );
}
