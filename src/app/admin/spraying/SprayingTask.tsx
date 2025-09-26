import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Calendar, Map, Check, X, MoreVertical, Trash2 } from 'lucide-react';
import type { SprayingTask } from './tasks';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface SprayingTaskProps {
  task: SprayingTask;
  onUpdate: (taskId: number, status: 'Accepted' | 'Declined') => void;
  onDelete: (taskId: number) => void;
}

const statusConfig = {
    New: { color: 'bg-blue-500', text: 'New Request' },
    Accepted: { color: 'bg-green-500', text: 'Accepted' },
    Declined: { color: 'bg-red-500', text: 'Declined' },
    Completed: { color: 'bg-gray-500', text: 'Completed' },
}

export default function SprayingTask({ task, onUpdate, onDelete }: SprayingTaskProps) {
  const { id, farm, area, threat, status, date, mapImage, polygon } = task;
  const router = useRouter();

  const handleAccept = () => {
    onUpdate(id, 'Accepted');
    router.push(`/admin/spraying/${id}`);
  }
  
  const polygonPoints = polygon?.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <Card className="overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="md:col-span-1 relative min-h-[150px] md:h-full">
            <Image 
                src={mapImage}
                alt={`Map for ${farm}`}
                fill
                className="object-cover"
            />
            {polygon && polygonPoints && (
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polygon
                  points={polygonPoints}
                  className="fill-accent/40 stroke-accent stroke-2"
                  style={{ vectorEffect: 'non-scaling-stroke' }}
                />
              </svg>
            )}
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
             <h3 className="absolute bottom-2 left-3 text-lg font-bold text-white">{farm}</h3>
        </div>
        <div className="md:col-span-2">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-lg font-headline flex items-center gap-2">
                           <AlertTriangle className="h-5 w-5 text-destructive" />
                           High Risk: {threat}
                        </CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge className={cn("text-white border-0", statusConfig[status].color)}>
                            {statusConfig[status].text}
                        </Badge>
                        <AlertDialog>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                <AlertDialogTrigger asChild>
                                    <DropdownMenuItem className="text-destructive">
                                        <Trash2 className="mr-2" /> Delete
                                    </DropdownMenuItem>
                                </AlertDialogTrigger>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete this spraying mission.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => onDelete(id)}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
                <div className="flex items-center text-sm text-muted-foreground gap-4">
                     <span className="flex items-center gap-2">
                        <Map className="h-4 w-4" />
                        {area}
                     </span>
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Detected: {date}
                     </span>
                </div>
                <p>A new spraying task has been generated based on the latest surveillance data. Please review the details and take action.</p>
            </CardContent>
            {status === 'New' && (
                <CardFooter className="justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => onUpdate(id, 'Declined')}>
                        <X className="mr-2" /> Decline
                    </Button>
                    <Button size="sm" onClick={handleAccept}>
                       <Check className="mr-2" /> Accept & Schedule
                    </Button>
                </CardFooter>
            )}
            {status === 'Accepted' && (
                 <CardFooter className="justify-end gap-2">
                    <Button size="sm" onClick={() => router.push(`/admin/spraying/${id}`)}>
                       View Mission
                    </Button>
                </CardFooter>
            )}
        </div>
      </div>
    </Card>
  );
}
