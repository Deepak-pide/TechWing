import LoginForm from "./LoginForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
       <Image
          src="/Farmland.jpg"
          alt="Farmland background"
          fill
          className="object-cover -z-10 brightness-50 blur-sm"
          data-ai-hint="farmland landscape"
        />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Login</CardTitle>
          <CardDescription>
            Enter your credentials or use the demo account to explore.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
