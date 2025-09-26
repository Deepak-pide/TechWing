
"use client";

import { useState, useRef, useEffect } from "react";
import type { MouseEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Layers, Maximize, Upload, X, MapPin, RefreshCw, Send, ScanLine } from "lucide-react";
import { cn } from "@/lib/utils";

interface Point {
  x: number;
  y: number;
}

const pestImages = [
    { src: "https://images.unsplash.com/photo-1609134599599-02c0b62a694a?q=80&w=2070&auto=format&fit=crop", alt: "Pest 1", hint: "insect leaf" },
    { src: "https://images.unsplash.com/photo-1596706037345-6d99e719117e?q=80&w=2070&auto=format&fit=crop", alt: "Pest 2", hint: "caterpillar leaf" },
    { src: "https://images.unsplash.com/photo-1526336344929-4b72458872a9?q=80&w=1974&auto=format&fit=crop", alt: "Pest 3", hint: "aphid leaf" },
    { src: "https://images.unsplash.com/photo-1628134787139-e9313430545f?q=80&w=2070&auto=format&fit=crop", alt: "Pest 4", hint: "plant disease" },
];

export default function AdminSurveillancePage() {
  const [mapImage, setMapImage] = useState<string | null>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [isSurveying, setIsSurveying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [animationKey, setAnimationKey] = useState(0);

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
    if (points.length < 3) return;
    setIsSurveying(true);
    setAnimationKey(prev => prev + 1);
  }

  const handleResetSurvey = () => {
    setIsSurveying(false);
    // No need to clear points, user can restart on same area or clear manually
  }

  const polygonPoints = points.map(p => `${p.x},${p.y}`).join(' ');

  const boundingBox = points.reduce((acc, point) => {
        return {
            minX: Math.min(acc.minX, point.x),
            maxX: Math.max(acc.maxX, point.x),
            minY: Math.min(acc.minY, point.y),
            maxY: Math.max(acc.maxY, point.y),
        };
    }, { minX: 100, maxX: 0, minY: 100, maxY: 0 });

  return (
    <div className="container mx-auto p-4 md:p-8">
        <style>
        {`
            @keyframes drone-path {
                0% { offset-distance: 0%; }
                100% { offset-distance: 100%; }
            }
            .drone-animation {
                offset-path: path('M ${boundingBox.minX} ${boundingBox.minY + 5} H ${boundingBox.maxX} V ${boundingBox.minY + 15} H ${boundingBox.minX} V ${boundingBox.minY + 25} H ${boundingBox.maxX} V ${boundingBox.minY + 35} H ${boundingBox.minX} V ${boundingBox.minY + 45} H ${boundingBox.maxX} V ${boundingBox.minY + 55} H ${boundingBox.minX} V ${boundingBox.minY + 65} H ${boundingBox.maxX} V ${boundingBox.minY + 75} H ${boundingBox.minX} V ${boundingBox.minY + 85} H ${boundingBox.maxX}');
                animation: drone-path 20s linear infinite;
            }
            
            @keyframes heatmap-reveal {
                from { clip-path: inset(0 100% 0 0); }
                to { clip-path: inset(0 0 0 0); }
            }
            .heatmap-animation {
                animation: heatmap-reveal 20s linear infinite;
            }
        `}
        </style>
        
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-headline">Live Surveillance</h1>
        <p className="text-muted-foreground">Monitor and manage drone surveillance missions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                <CardTitle>{isSurveying ? "Survey in Progress" : "Mission Control"}</CardTitle>
                <CardDescription>
                    {isSurveying ? "Drone is scanning the selected area." : "Upload a land image, click to drop pins, and define the survey area."}
                </CardDescription>
                </CardHeader>
                <CardContent>
                <div className="relative aspect-video w-full rounded-lg overflow-hidden border bg-muted/20" onClick={handleMapClick}>
                    <Image
                    src={mapImage || "https://images.unsplash.com/photo-1599839603058-2d79a29d3c10?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                    alt="Map of farmland"
                    fill
                    className="object-cover"
                    data-ai-hint="map farmland"
                    />
                    {!isSurveying && <div className="absolute inset-0 bg-black/20" />}
                    
                    {isSurveying && (
                         <div className="absolute inset-0 bg-black/60" />
                    )}

                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        {points.length > 2 && (
                            <polygon
                                points={polygonPoints}
                                className={cn(
                                    "stroke-primary stroke-2",
                                    isSurveying ? "fill-primary/20" : "fill-primary/30"
                                )}
                            />
                        )}
                        {isSurveying && points.length > 2 && (
                             <g key={animationKey} className="heatmap-animation">
                                 <foreignObject x={boundingBox.minX} y={boundingBox.minY} width={boundingBox.maxX - boundingBox.minX} height={boundingBox.maxY - boundingBox.minY}>
                                    <div 
                                        className="w-full h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 opacity-60"
                                        style={{ clipPath: `polygon(${points.map(p => `${p.x - boundingBox.minX} ${p.y - boundingBox.minY}`).join(', ')})` }}
                                     />
                                 </foreignObject>
                             </g>
                        )}
                         {isSurveying && points.length > 2 && (
                              <Send key={animationKey} className="drone-animation h-5 w-5 text-white -rotate-45" style={{ motionOffset: ['0%','100%']}} />
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
                            <span className="sr-only">Fullscreen</span>
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
                        <ScanLine className="mr-2 h-5 w-5" />
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
        <div className="lg:col-span-1">
             <Card>
                <CardHeader>
                    <CardTitle>Threat Detection Feed</CardTitle>
                    <CardDescription>Live images of potential threats.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                         {pestImages.map((img, index) => (
                            <div key={index} className="relative aspect-square rounded-md overflow-hidden group">
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                    data-ai-hint={img.hint}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-2 left-2 text-white text-xs font-semibold">
                                     Threat #{index + 1}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );

    