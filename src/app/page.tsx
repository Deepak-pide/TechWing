import Image from "next/image";

export default function HomePage() {
  return (
    <div className="relative w-full h-[calc(100vh-150px)]">
      <Image
        src="https://images.unsplash.com/photo-1464977462372-75c7b3c43147?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
