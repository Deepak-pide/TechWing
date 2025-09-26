
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { initialTasks, SprayingTask as SprayingTaskType } from './tasks';
import SprayingTask from './SprayingTask';
import { useRouter } from 'next/navigation';

export default function AdminSprayingPage() {
  const [tasks, setTasks] = useState<SprayingTaskType[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    setIsMounted(true);
  }, []);


  useEffect(() => {
    if (!isMounted) return;
    // On component mount, check localStorage for new tasks and add them to the state.
    try {
      const storedTasksString = localStorage.getItem('sprayingTasks') || '[]';
      const storedTasks = JSON.parse(storedTasksString);
      
      const allTasks = [...initialTasks];
      const existingIds = new Set(allTasks.map(t => t.id));

      const newTasksFromStorage = storedTasks.filter((t: SprayingTaskType) => !existingIds.has(t.id));
      
      const tasksWithStatusString = localStorage.getItem('tasksWithStatus');
      const tasksWithStatus = tasksWithStatusString ? JSON.parse(tasksWithStatusString) : {};

      const combinedTasks = [...allTasks, ...newTasksFromStorage].map(task => ({
          ...task,
          status: tasksWithStatus[task.id] || task.status,
      }));

      setTasks(combinedTasks);

    } catch (error) {
      console.error("Could not load tasks from localStorage", error);
       setTasks(initialTasks);
    }
  }, [isMounted]);

  const handleTaskUpdate = (taskId: number, status: 'Accepted' | 'Declined') => {
    const updatedTasks = tasks.map(task => 
        task.id === taskId 
        ? { ...task, status: status }
        : task
    );
    setTasks(updatedTasks);
    
    try {
        const tasksWithStatusString = localStorage.getItem('tasksWithStatus');
        const tasksWithStatus = tasksWithStatusString ? JSON.parse(tasksWithStatusString) : {};
        tasksWithStatus[taskId] = status;
        localStorage.setItem('tasksWithStatus', JSON.stringify(tasksWithStatus));
    } catch(error) {
        console.error("Could not save task status to localStorage", error);
    }
  };

  if (!isMounted) {
      return null; // or a loading spinner
  }

  const newTasks = tasks.filter(t => t.status === 'New');
  const acceptedTasks = tasks.filter(t => t.status === 'Accepted');
  const completedTasks = tasks.filter(t => t.status === 'Completed');
  const declinedTasks = tasks.filter(t => t.status === 'Declined');

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-headline">Spraying Management</h1>
        <p className="text-muted-foreground">Review new spraying requests and monitor ongoing jobs.</p>
      </div>

      <Tabs defaultValue="new">
        <TabsList className="grid w-full grid-cols-4 md:w-[600px]">
          <TabsTrigger value="new">New Requests ({newTasks.length})</TabsTrigger>
          <TabsTrigger value="accepted">Accepted ({acceptedTasks.length})</TabsTrigger>
          <TabsTrigger value="history">History ({completedTasks.length + declinedTasks.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="new">
          <Card>
            <CardHeader>
              <CardTitle>New Spraying Requests</CardTitle>
              <CardDescription>Review and assign new tasks identified from surveillance missions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {newTasks.length > 0 ? (
                newTasks.map(task => (
                  <SprayingTask key={task.id} task={task} onUpdate={handleTaskUpdate} />
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">No new spraying requests.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="accepted">
          <Card>
            <CardHeader>
              <CardTitle>Accepted & Ongoing Jobs</CardTitle>
              <CardDescription>These tasks have been accepted and are either scheduled or in progress.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               {acceptedTasks.length > 0 ? (
                acceptedTasks.map(task => (
                  <SprayingTask key={task.id} task={task} onUpdate={handleTaskUpdate} />
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">No accepted jobs.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Job History</CardTitle>
              <CardDescription>A historical record of all completed and declined spraying operations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[...completedTasks, ...declinedTasks].length > 0 ? (
                [...completedTasks, ...declinedTasks]
                  .sort((a,b) => (a.id > b.id ? -1 : 1))
                  .map(task => (
                    <SprayingTask key={task.id} task={task} onUpdate={() => {}} />
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">No completed or declined jobs found.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
