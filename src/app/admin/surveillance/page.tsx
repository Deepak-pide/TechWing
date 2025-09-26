
"use client";

import { useState, useRef } from "react";
import type { MouseEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Layers, PlayCircle, Maximize, Upload, X, MapPin, RefreshCw } from "lucide-react";

interface Point {
  x: number;
  y: number;
}

export default function AdminSurveillancePage() {
  const [mapImage, setMapImage] = useState<string | null>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [isSurveying, setIsSurveying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMapImage(reader.result as string);
        setPoints([]); 
        setIsSurveying(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleMapClick = (e: MouseEvent<HTMLDivElement>) => {
    if (isSurveying) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPoints([...points, { x, y }]);
  };

  const clearPoints = () => {
    setPoints([]);
  }
  
  const handleStartSurvey = () => {
    if (points.length < 3) return; // Need at least 3 points for a polygon
    setIsSurveying(true);
  }

  const handleResetSurvey = () => {
    setIsSurveying(false);
  }

  const polygonPoints = points.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-headline">Live Surveillance</h1>
        <p className="text-muted-foreground">Monitor and manage drone surveillance missions.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mission Control</CardTitle>
          <CardDescription>
            {isSurveying ? "Surveying the selected area." : "Upload a land image, click to drop pins, and define the survey area."}
            </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-video w-full rounded-lg overflow-hidden border bg-muted/20" onClick={handleMapClick}>
            <Image
              src={mapImage || "https://images.unsplash.com/photo-1599839603058-2d79a29d3c10?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
              alt="Map of farmland"
              fill
              className="object-cover"
              style={{ opacity: isSurveying ? 0.1 : 1 }}
              data-ai-hint="map farmland"
            />
             {!mapImage && !isSurveying && <div className="absolute inset-0 bg-black/20" />}
            
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {points.length > 2 && (
                 <polygon
                    points={polygonPoints}
                    className="fill-primary/30 stroke-primary stroke-2"
                 />
              )}
            </svg>
            
            {!isSurveying && points.map((point, index) => (
              <MapPin 
                key={index}
                className="absolute h-6 w-6 text-red-500 -translate-x-1/2 -translate-y-full"
                style={{ left: `${point.x}%`, top: `${point.y}%`, fill: 'white' }}
              />
            ))}
            
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
            {!isSurveying ? (
              <>
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
                {points.length > 0 && (
                     <Button variant="destructive" onClick={clearPoints}>
                        <X className="mr-2 h-5 w-5" />
                        Clear Pins
                    </Button>
                )}
                <Button size="lg" onClick={handleStartSurvey} disabled={points.length < 3}>
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Start Surveying
                </Button>
              </>
            ) : (
                <Button size="lg" variant="outline" onClick={handleResetSurvey}>
                    <RefreshCw className="mr-2 h-5 w-5" />
                    Reset Survey
                </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
