import LoginForm from "./LoginForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="relative flex flex-1 w-full flex-col items-center justify-center p-4">
       <Image
          src="/farmland.jpg"
          alt="Farmland background"
          fill
          className="object-cover -z-10 brightness-50 blur-sm"
          data-ai-hint="farmland landscape"
        />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
      <p className="text-center text-sm text-white mt-6">
        Don't have an account?{" "}
        <Link href="#" className="font-semibold underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
