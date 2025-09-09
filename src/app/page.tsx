import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-foreground font-headline md:text-5xl lg:text-6xl">
            Smarter Farming, Healthier Crops
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            BetaFlight provides cutting-edge analysis and insights to help you manage your farm, detect diseases early, and optimize your yield.
          </p>
          <div className="mt-8 flex justify-center gap-4 lg:justify-start">
            <Link href="/login">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/report">
                <Button size="lg" variant="outline">View Demo Report</Button>
            </Link>
          </div>
        </div>
        <div className="relative aspect-square h-auto w-full max-w-md mx-auto lg:max-w-none">
          <Image
            src="https://images.unsplash.com/photo-1560493676-04071c5f467b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxmYXJtZXJ8ZW58MHx8fHwxNzU4MjY4ODgyfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Farmer in a field"
            fill
            className="rounded-lg object-cover"
            data-ai-hint="farmer field"
          />
        </div>
      </div>
    </div>
  );
}
