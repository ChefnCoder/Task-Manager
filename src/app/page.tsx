import { connectDB } from "@/lib/db";
import { Task } from "@/models/Task";

export default async function Home() {
  await connectDB(); 

  const testTask = await Task.create({
    title: "Test Task",
    description: "This is a sample task",
    dueDate: new Date(),
  });

  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold">Task Created: {testTask.title}</h1>
    </main>
  );
}
