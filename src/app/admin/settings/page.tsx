
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AdminSettingsPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-3xl">Settings</CardTitle>
                <CardDescription>Configure application settings here.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Application settings and options will be available here.</p>
            </CardContent>
        </Card>
    </div>
  );
}
