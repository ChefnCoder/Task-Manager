import { getTasks, addTask } from "./action/tasks";

export default async function Home() {
  const tasks = await getTasks(); // Fetch all tasks

  return (
    <main className="min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold mb-4">Tasks List</h1>
      <ul className="space-y-2">
        {tasks.map((currtask) => (
          <li key={currtask._id} className="bg-gray-200 p-2 rounded">
            {currtask.title} - {currtask.completed ? "✅" : "❌"}
          </li>
        ))}
      </ul>
    </main>
  );
}
