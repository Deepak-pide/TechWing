
"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Layers, PlayCircle, Maximize, Upload } from "lucide-react";

export default function AdminSurveillancePage() {
  const [mapImage, setMapImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMapImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-headline">Live Surveillance</h1>
        <p className="text-muted-foreground">Monitor and manage drone surveillance missions.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mission Control</CardTitle>
          <CardDescription>Upload a land image or define an area on the map to begin.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-video w-full rounded-lg overflow-hidden border">
            <Image
              src={mapImage || "https://images.unsplash.com/photo-1599839603058-2d79a29d3c10?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
              alt="Map of farmland"
              fill
              className="object-cover"
              data-ai-hint="map farmland"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-48 h-32 border-4 border-dashed border-primary bg-primary/20 rounded-md animate-pulse">
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-md">Selected Area</span>
                </div>
            </div>
            <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button variant="secondary" size="icon">
                    <Layers className="h-5 w-5" />
                    <span className="sr-only">Map Layers</span>
                </Button>
                 <Button variant="secondary" size="icon">
                    <Maximize className="h-5 w-5" />
                    <span className="sr-only">Select Area</span>
                </Button>
            </div>
          </div>
          <div className="mt-6 flex justify-center gap-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <Button variant="outline" onClick={handleUploadClick}>
                <Upload className="mr-2 h-5 w-5" />
                Upload Image
            </Button>
            <Button size="lg">
              <PlayCircle className="mr-2 h-5 w-5" />
              Start Surveying
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
