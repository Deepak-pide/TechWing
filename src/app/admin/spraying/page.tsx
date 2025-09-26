
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { initialTasks, SprayingTask as SprayingTaskType } from './tasks';
import SprayingTask from './SprayingTask';

export default function AdminSprayingPage() {
  const [tasks, setTasks] = useState<SprayingTaskType[]>(initialTasks);

  const handleTaskUpdate = (taskId: number, status: 'Accepted' | 'Declined') => {
    setTasks(tasks.map(task => 
        task.id === taskId 
        ? { ...task, status: status }
        : task
    ));
    // In a real app, you would likely remove the task from the 'New' list
  };

  const newTasks = tasks.filter(t => t.status === 'New');
  const acceptedTasks = tasks.filter(t => t.status === 'Accepted');
  const completedTasks = tasks.filter(t => t.status === 'Completed');

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-headline">Spraying Management</h1>
        <p className="text-muted-foreground">Review new spraying requests and monitor ongoing jobs.</p>
      </div>

      <Tabs defaultValue="new">
        <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
          <TabsTrigger value="new">New Requests ({newTasks.length})</TabsTrigger>
          <TabsTrigger value="accepted">Accepted ({acceptedTasks.length})</TabsTrigger>
          <TabsTrigger value="completed">History ({completedTasks.length})</TabsTrigger>
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
                  <SprayingTask key={task.id} task={task} onUpdate={() => {}} />
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">No accepted jobs.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Jobs</CardTitle>
              <CardDescription>A historical record of all completed spraying operations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {completedTasks.length > 0 ? (
                completedTasks.map(task => (
                  <SprayingTask key={task.id} task={task} onUpdate={() => {}} />
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">No completed jobs found.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
