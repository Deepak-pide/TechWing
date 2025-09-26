
"use client";

import { useState, useRef, useEffect } from "react";
import type { MouseEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Layers, Maximize, Upload, X, MapPin, RefreshCw, Send, ScanLine, CheckCircle, AlertTriangle, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

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
  const [surveyState, setSurveyState] = useState<'idle' | 'pinning' | 'locked' | 'surveying' | 'complete'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (surveyState === 'surveying') {
      const timer = setTimeout(() => {
        setSurveyState('complete');
      }, 20000); // Duration of the animation
      return () => clearTimeout(timer);
    }
  }, [surveyState]);


  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMapImage(reader.result as string);
        setPoints([]); 
        setSurveyState('pinning');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleMapClick = (e: MouseEvent<HTMLDivElement>) => {
    if (surveyState !== 'pinning') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPoints([...points, { x, y }]);
  };

  const clearPoints = () => {
    setPoints([]);
  }
  
  const handleRestart = () => {
    setPoints([]);
    setSurveyState('pinning');
  }

  const handleLockArea = () => {
      if (points.length < 3) return;
      setSurveyState('locked');
  }
  
  const handleStartSurvey = () => {
    if (points.length < 3) return;
    setSurveyState('surveying');
    setAnimationKey(prev => prev + 1);
  }

  const handleResetSurvey = () => {
    setMapImage(null);
    setSurveyState('idle');
    setPoints([]);
  }

  const handleScheduleSpraying = () => {
    // In a real app, you'd pass data. Here, we'll just navigate.
    router.push('/admin/spraying');
  };

  const polygonPoints = points.map(p => `${p.x},${p.y}`).join(' ');

  const boundingBox = points.reduce((acc, point) => {
        return {
            minX: Math.min(acc.minX, point.x),
            maxX: Math.max(acc.maxX, point.x),
            minY: Math.min(acc.minY, point.y),
            maxY: Math.max(acc.maxY, point.y),
        };
    }, { minX: 100, maxX: 0, minY: 100, maxY: 0 });

    const getZoomStyle = () => {
        if (surveyState !== 'locked' && surveyState !== 'surveying' && surveyState !== 'complete') return {};
        if (points.length < 3) return {};

        const boxWidth = boundingBox.maxX - boundingBox.minX;
        const boxHeight = boundingBox.maxY - boundingBox.minY;

        if (boxWidth <= 0 || boxHeight <= 0) return {};

        const containerWidth = 100;
        const containerHeight = 100;

        const scaleX = containerWidth / boxWidth;
        const scaleY = containerHeight / boxHeight;
        const scale = Math.min(scaleX, scaleY) * 0.9; // 0.9 for padding

        // Center of the bounding box
        const boxCenterX = boundingBox.minX + boxWidth / 2;
        const boxCenterY = boundingBox.minY + boxHeight / 2;
        
        // Translate to move the box center to the origin, then move it to the container center
        const translateX = (containerWidth / 2) - boxCenterX;
        const translateY = (containerHeight / 2) - boxCenterY;

        return {
            transform: `translate(${translateX}%, ${translateY}%) scale(${scale})`,
            transformOrigin: `${boxCenterX}% ${boxCenterY}%`,
            transition: 'transform 1s ease-in-out, transform-origin 1s ease-in-out'
        };
    };

  return (
    <div className="container mx-auto p-4 md:p-8">
        <style>
        {`
            @keyframes drone-path {
                0% { offset-distance: 0%; }
                100% { offset-distance: 100%; }
            }
            .drone-animation {
                offset-path: path('M ${boundingBox.minX + (boundingBox.maxX-boundingBox.minX)*0.1} ${boundingBox.minY + (boundingBox.maxY-boundingBox.minY)*0.1} L ${boundingBox.maxX - (boundingBox.maxX-boundingBox.minX)*0.1} ${boundingBox.minY + (boundingBox.maxY-boundingBox.minY)*0.1} L ${boundingBox.maxX - (boundingBox.maxX-boundingBox.minX)*0.1} ${boundingBox.minY + (boundingBox.maxY-boundingBox.minY)*0.3} L ${boundingBox.minX + (boundingBox.maxX-boundingBox.minX)*0.1} ${boundingBox.minY + (boundingBox.maxY-boundingBox.minY)*0.3} L ${boundingBox.minX + (boundingBox.maxX-boundingBox.minX)*0.1} ${boundingBox.minY + (boundingBox.maxY-boundingBox.minY)*0.5} L ${boundingBox.maxX - (boundingBox.maxX-boundingBox.minX)*0.1} ${boundingBox.minY + (boundingBox.maxY-boundingBox.minY)*0.5} L ${boundingBox.maxX - (boundingBox.maxX-boundingBox.minX)*0.1} ${boundingBox.minY + (boundingBox.maxY-boundingBox.minY)*0.7} L ${boundingBox.minX + (boundingBox.maxX-boundingBox.minX)*0.1} ${boundingBox.minY + (boundingBox.maxY-boundingBox.minY)*0.7} L ${boundingBox.minX + (boundingBox.maxX-boundingBox.minX)*0.1} ${boundingBox.minY + (boundingBox.maxY-boundingBox.minY)*0.9} L ${boundingBox.maxX - (boundingBox.maxX-boundingBox.minX)*0.1} ${boundingBox.minY + (boundingBox.maxY-boundingBox.minY)*0.9}');
                animation: drone-path 20s linear forwards;
            }
            
            @keyframes heatmap-reveal {
                from { clip-path: inset(0 100% 0 0); }
                to { clip-path: inset(0 0 0 0); }
            }
            .heatmap-animation {
                animation: heatmap-reveal 20s linear forwards;
            }

            @keyframes feed-in {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .feed-in-animation {
                animation: feed-in 0.5s ease-out forwards;
            }
        `}
        </style>
        
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-headline">Live Surveillance</h1>
        <p className="text-muted-foreground">Monitor and manage drone surveillance missions.</p>
      </div>
      
      <AlertDialog open={surveyState === 'complete'}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                Survey Complete
            </AlertDialogTitle>
            <AlertDialogDescription>
                <div className="mt-4">
                    <p>The drone has completed its scan of the designated area. The following threats were detected:</p>
                    <div className="my-4 grid grid-cols-4 gap-2">
                        {pestImages.map((img, index) => (
                            <Image key={index} src={img.src} alt={img.alt} width={64} height={64} className="rounded-md object-cover" data-ai-hint={img.hint} />
                        ))}
                    </div>
                    <div className="p-4 rounded-md bg-destructive/10 border border-destructive/30">
                        <h4 className="font-semibold text-destructive flex items-center gap-2"><AlertTriangle /> High Risk: Powdery Mildew</h4>
                        <p className="text-destructive/80 text-sm mt-1">Affected Area: Approx 1.5 Acres. Immediate action recommended to prevent spread.</p>
                    </div>
                </div>
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel onClick={handleResetSurvey}>Review & Reset</AlertDialogCancel>
            <AlertDialogAction onClick={handleScheduleSpraying}>Schedule Spraying</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                <CardTitle>
                    {surveyState === 'idle' && "Mission Control"}
                    {surveyState === 'pinning' && "Define Survey Area"}
                    {surveyState === 'locked' && "Confirm Survey Area"}
                    {(surveyState === 'surveying' || surveyState === 'complete') && "Survey in Progress..."}
                </CardTitle>
                <CardDescription>
                    {surveyState === 'idle' && "Upload a land image to begin."}
                    {surveyState === 'pinning' && "Click to drop pins and outline the survey zone."}
                    {surveyState === 'locked' && "Area locked. Ready to start surveying."}
                    {(surveyState === 'surveying' || surveyState === 'complete') && "Drone is scanning the selected area."}
                </CardDescription>
                </CardHeader>
                <CardContent>
                <div className={cn("relative aspect-video w-full rounded-lg overflow-hidden border bg-muted/20", surveyState === 'pinning' && 'cursor-crosshair')} onClick={handleMapClick}>
                    <div 
                        className="absolute inset-0"
                        style={getZoomStyle()}
                    >
                        {mapImage ? (
                            <Image
                                src={mapImage}
                                alt="Map of farmland"
                                fill
                                className={cn("object-cover", (surveyState !== 'locked' && surveyState !== 'surveying' && surveyState !== 'complete') && 'brightness-75')}
                            />
                        ) : (
                             <div className="w-full h-full flex items-center justify-center bg-muted">
                                <p className="text-muted-foreground">Upload an image to start</p>
                             </div>
                        )}
                        
                        {(surveyState === 'idle' ) && <div className="absolute inset-0 bg-black/50" />}

                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            {points.length > 2 && (
                                <polygon
                                    points={polygonPoints}
                                    className={cn(
                                        "stroke-primary stroke-2",
                                        surveyState === 'surveying' || surveyState === 'complete' ? "fill-primary/20" : "fill-primary/30"
                                    )}
                                    style={{vectorEffect: "non-scaling-stroke"}}
                                />
                            )}
                            {(surveyState === 'surveying' || surveyState === 'complete') && points.length > 2 && (
                                <g key={animationKey} className={surveyState === 'surveying' ? 'heatmap-animation': ''}>
                                    <foreignObject x={boundingBox.minX} y={boundingBox.minY} width={boundingBox.maxX - boundingBox.minX} height={boundingBox.maxY - boundingBox.minY}>
                                        <div 
                                            className="w-full h-full bg-gradient-to-r from-green-500/70 via-yellow-500/70 to-red-500/70"
                                            style={{ clipPath: `polygon(${points.map(p => `${(p.x - boundingBox.minX) * (100/(boundingBox.maxX - boundingBox.minX))}% ${(p.y - boundingBox.minY) * (100/(boundingBox.maxY - boundingBox.minY))}%`).join(', ')})` }}
                                        />
                                    </foreignObject>
                                </g>
                            )}
                            {surveyState === 'surveying' && points.length > 2 && (
                                <Send key={animationKey} className="drone-animation h-5 w-5 text-white -rotate-45" style={{ motionOffset: ['0%','100%'], vectorEffect: "non-scaling-stroke" }} />
                            )}
                        </svg>
                    </div>
                    
                    {surveyState === 'pinning' && points.map((point, index) => (
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
                    {surveyState === 'idle' && (
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
                        </>
                    )}
                    {surveyState === 'pinning' && (
                        <>
                            <Button variant="destructive" onClick={clearPoints} disabled={points.length === 0}>
                                <X className="mr-2 h-5 w-5" />
                                Clear Pins
                            </Button>
                            <Button size="lg" onClick={handleLockArea} disabled={points.length < 3}>
                                <Lock className="mr-2 h-5 w-5" />
                                Lock Area
                            </Button>
                        </>
                    )}
                    {surveyState === 'locked' && (
                        <>
                             <Button variant="outline" onClick={handleRestart}>
                                <MapPin className="mr-2 h-5 w-5" />
                                Redefine Area
                            </Button>
                             <Button size="lg" onClick={handleStartSurvey}>
                                <ScanLine className="mr-2 h-5 w-5" />
                                Start Surveying
                            </Button>
                        </>
                    )}
                     {(surveyState === 'surveying' || surveyState === 'complete') && (
                        <Button size="lg" variant="outline" disabled>
                            <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                            Surveying...
                        </Button>
                    )}

                </div>
                </CardContent>
            </Card>
        </div>
        <div className={cn("lg:col-span-1", (surveyState !== 'surveying' && surveyState !== 'complete') && "hidden lg:block lg:opacity-0")}>
             <Card className="feed-in-animation">
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

}

    