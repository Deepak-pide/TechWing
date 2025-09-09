import ProfileForm from "./ProfileForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
  return (
    <div className="container mx-auto max-w-2xl p-4 md:p-0">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Farmer Profile</CardTitle>
          <CardDescription>
            Manage your personal and farm-related information here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm />
        </CardContent>
      </Card>
    </div>
  );
}
