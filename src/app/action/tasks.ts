"use server";

import { connectDB } from "@/lib/db";
import { Task } from "@/models/Task";

// Get all tasks
export const getTasks = async () => {
    await connectDB();
    const tasks = await Task.find().sort({ createdAt: -1 }).lean(); 
    return tasks.map((task) => ({
      _id: task._id.toString(), 
      title: task.title,
      description: task.description,
      dueDate: task.dueDate?.toISOString(), 
      completed: task.completed,
      createdAt: task.createdAt.toISOString(),
      updatedAt: task.updatedAt.toISOString(),
    }));
  };

// Add a new task (Ensure the response is plain JSON)
export const addTask = async (title: string, description?: string, dueDate?: Date) => {
    await connectDB();
    const task = await Task.create({ title, description, dueDate });
    return {
      _id: task._id.toString(),
      title: task.title,
      description: task.description,
      dueDate: task.dueDate?.toISOString(),
      completed: task.completed,
      createdAt: task.createdAt.toISOString(),
      updatedAt: task.updatedAt.toISOString(),
    };
  };
  
  // Update a task
export const updateTask = async (id: string, updatedData: Partial<Task>) => {
  await connectDB();
  const task = await Task.findByIdAndUpdate(id, updatedData, { new: true }).lean();

  if (!task) {
    throw new Error(`❌ Task with ID ${id} not found`); 
  }

  return {
    _id: task._id.toString(),
    title: task.title,
    description: task.description,
    dueDate: task.dueDate?.toISOString(),
    completed: task.completed,
    createdAt: task.createdAt.toISOString(),
    updatedAt: task.updatedAt.toISOString(),
  };
};

  
  // Delete a task
  export const deleteTask = async (id: string) => {
    await connectDB();
    await Task.findByIdAndDelete(id);
    return { success: true };
  };
  