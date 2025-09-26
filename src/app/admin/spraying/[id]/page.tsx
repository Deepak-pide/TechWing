
import { initialTasks } from '../tasks';
import SprayingControl from './SprayingControl';

export default function SprayingMissionPage({ params }: { params: { id: string } }) {
  // In a real app, you'd fetch this from a database or a global state management solution
  // For now, we'll find it in our initialTasks array and localStorage.
  
  let allTasks = [...initialTasks];
  if (typeof window !== 'undefined') {
    try {
      const storedTasks = JSON.parse(localStorage.getItem('sprayingTasks') || '[]');
      const existingIds = new Set(allTasks.map(t => t.id));
      const newTasks = storedTasks.filter((t: any) => !existingIds.has(t.id));
      allTasks = [...allTasks, ...newTasks];
    } catch (e) {
      console.error("Could not parse tasks from localStorage", e);
    }
  }

  const task = allTasks.find(t => t.id === parseInt(params.id, 10));

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
