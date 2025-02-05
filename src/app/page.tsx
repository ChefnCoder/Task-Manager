import { connectDB } from "@/lib/db";

export default async function Home() {
  await connectDB(); // Ensure DB is connected on the server side

  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold">Task Manager</h1>
    </main>
  );
}
