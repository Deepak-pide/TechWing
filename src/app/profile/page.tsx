"use client";

import ProfileForm from "./ProfileForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePage() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
      return (
          <div className="container mx-auto max-w-2xl p-4 md:p-8">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-4 w-64 mt-2" />
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                         <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <Skeleton className="h-10 w-32" />
                    </CardContent>
                </Card>
          </div>
      )
  }

  return (
    <div className="container mx-auto max-w-2xl p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-headline">
            {isAuthenticated ? "Farmer Profile" : "Access Your Profile"}
          </CardTitle>
          <CardDescription>
            {isAuthenticated
              ? "Manage your personal and farm-related information here."
              : "Please log in to view and manage your profile."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isAuthenticated ? (
            <ProfileForm />
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-8 space-y-4">
                <p>You need to be logged in to see this page.</p>
                <Link href="/login">
                    <Button>Login</Button>
                </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
