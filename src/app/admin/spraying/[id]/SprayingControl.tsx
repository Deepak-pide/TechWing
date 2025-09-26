
"use client";

import { useState } from 'react';
import type { SprayingTask } from '../tasks';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BatteryFull, Droplet, Satellite, Wifi } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';

export default function SprayingControl({ task }: { task: SprayingTask }) {
    const [status, setStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'filling' | 'ready' | 'spraying'>('disconnected');
    const router = useRouter();

    const handleConnect = () => {
        setStatus('connecting');
        setTimeout(() => setStatus('connected'), 2000);
    }

    const handleFillTank = () => {
        setStatus('filling');
        setTimeout(() => setStatus('ready'), 4000);
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
             <div className="flex items-center gap-4 mb-8">
                <Button variant="outline" size="icon" onClick={() => router.push('/admin/spraying')}>
                    <ArrowLeft />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground font-headline">Spraying Mission: {task.farm}</h1>
                    <p className="text-muted-foreground">Control and monitor the automated spraying process.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Mission Map</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <div className="relative aspect-video w-full rounded-lg overflow-hidden border bg-muted/20">
                                <Image
                                    src={task.mapImage}
                                    alt={`Map for ${task.farm}`}
                                    fill
                                    className="object-cover"
                                />
                                 <div className="absolute inset-0 bg-black/30" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Drone Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {status === 'disconnected' && (
                                <Button className="w-full" onClick={handleConnect}>
                                    <Satellite className="mr-2" /> Connect to Drone
                                </Button>
                            )}
                             {status === 'connecting' && (
                                <Button className="w-full" disabled>
                                    <Wifi className="mr-2 animate-pulse" /> Connecting...
                                </Button>
                            )}
                             {(status === 'connected' || status === 'filling' || status === 'ready') && (
                                <div>
                                    <div className="flex justify-between items-center text-sm mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                                        <span className="font-medium text-green-400">Drone Connected</span>
                                        <div className="flex items-center gap-4 text-muted-foreground">
                                            <span className="flex items-center gap-1"><Wifi size={16} className="text-green-400"/> Strong</span>
                                            <span className="flex items-center gap-1"><BatteryFull size={16} className="text-green-400"/> 98%</span>
                                        </div>
                                    </div>

                                    {status === 'connected' && (
                                        <Button className="w-full" onClick={handleFillTank}>
                                            <Droplet className="mr-2"/> Start Filling Tank (1/2)
                                        </Button>
                                    )}

                                    {status === 'filling' && (
                                         <div className="text-center">
                                            <p className="mb-2 text-muted-foreground">Filling tank with pesticide...</p>
                                            <Progress value={50} className="w-full" />
                                         </div>
                                    )}

                                     {status === 'ready' && (
                                        <Button className="w-full" variant="default" size="lg">
                                            Start Spraying
                                        </Button>
                                    )}
                                </div>
                            )}

                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Mission Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                           <div className="flex justify-between">
                                <span className="text-muted-foreground">Farm:</span>
                                <span>{task.farm}</span>
                           </div>
                           <div className="flex justify-between">
                                <span className="text-muted-foreground">Area:</span>
                                <span>{task.area}</span>
                           </div>
                           <div className="flex justify-between">
                                <span className="text-muted-foreground">Threat:</span>
                                <span className="font-medium text-destructive">{task.threat}</span>
                           </div>
                             <div className="flex justify-between">
                                <span className="text-muted-foreground">Tank Fills Required:</span>
                                <span>2</span>
                           </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
