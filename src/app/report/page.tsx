import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import Image from "next/image";

export default function ReportPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-headline">Crop Health Report</h1>
        <p className="text-muted-foreground">Detailed analysis for Wheat crop, generated on {new Date().toLocaleDateString()}</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="col-span-1">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Field Analysis</CardTitle>
              <CardDescription>Satellite imagery showing areas of concern.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video w-full">
                <Image
                  src="https://images.unsplash.com/photo-1524553496250-1a722745ae00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxmYXJtbGFuZHxlbnwwfHx8fDE3NTc0MTI2NjB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Farm field with detections"
                  fill
                  className="rounded-md object-cover"
                  data-ai-hint="farm fields satellite"
                />
                <div className="absolute top-[20%] left-[30%] h-4 w-4 rounded-full bg-red-500 animate-pulse ring-2 ring-white"></div>
                <div className="absolute top-[50%] left-[60%] h-4 w-4 rounded-full bg-red-500 animate-pulse ring-2 ring-white"></div>
                <div className="absolute top-[65%] left-[45%] h-4 w-4 rounded-full bg-red-500 animate-pulse ring-2 ring-white"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Disease Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>High Risk: Powdery Mildew Detected</AlertTitle>
                <AlertDescription>
                  <p className="mb-2">Powdery mildew has been identified in multiple sections of the field. This fungal disease appears as white, powdery spots on leaves and can significantly reduce crop yield if not treated promptly.</p>
                  <h4 className="font-semibold mt-4 mb-2">Recommendations:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Apply a targeted fungicide to affected areas immediately.</li>
                    <li>Increase air circulation by scouting for and removing dense foliage.</li>
                    <li>Monitor crop closely for the next 7-10 days.</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Pesticide Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>
                  <strong>Fungicide A:</strong> Recommended for early-stage infections. Apply at a rate of 1 liter per hectare.
                </li>
                <li>
                  <strong>Fungicide B:</strong> A more potent option for widespread infections. Requires careful handling and adherence to safety protocols.
                </li>
                <li>
                  <strong>Organic Option:</strong> A neem oil-based solution can be effective in less severe cases. Apply every 7-10 days.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
