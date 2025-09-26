
"use client";

import { initialTasks, type SprayingTask as SprayingTaskType } from '../tasks';
import SprayingControl from './SprayingControl';
import { useEffect, useState } from 'react';

export default function SprayingMissionPage({ params }: { params: { id: string } }) {
  const [task, setTask] = useState<SprayingTaskType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you'd fetch this from a database.
    // For this simulation, we reconstruct the state from initial tasks and localStorage.
    
    // Combine initial tasks with tasks from localStorage
    const storedTasksString = localStorage.getItem('sprayingTasks') || '[]';
    const storedTasks = JSON.parse(storedTasksString);
    
    const allTasksById = new Map<number, SprayingTaskType>();
    
    // Add initial tasks first
    initialTasks.forEach(t => allTasksById.set(t.id, { ...t }));
    
    // Add/overwrite with tasks from storage (for new tasks)
    storedTasks.forEach((t: SprayingTaskType) => allTasksById.set(t.id, { ...t }));

    // Get status updates
    const tasksWithStatusString = localStorage.getItem('tasksWithStatus');
    const tasksWithStatus = tasksWithStatusString ? JSON.parse(tasksWithStatusString) : {};
    
    // Apply status updates
    allTasksById.forEach(t => {
      if (tasksWithStatus[t.id]) {
        t.status = tasksWithStatus[t.id];
      }
    });

    const foundTask = allTasksById.get(parseInt(params.id, 10));
    
    if (foundTask) {
      setTask(foundTask);
    }
    
    setLoading(false);
  }, [params.id]);

  if (loading) {
     return (
      <div className="container mx-auto p-4 md:p-8 text-center">
        <p>Loading task...</p>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="container mx-auto p-4 md:p-8 text-center">
        <h1 className="text-2xl font-bold">Task Not Found</h1>
        <p className="text-muted-foreground">The requested spraying task could not be found.</p>
      </div>
    );
  }

  return <SprayingControl task={task} />;
}
