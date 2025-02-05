"use server";

import { connectDB } from "@/lib/db";
import { Task } from "@/models/Task";

// Get all tasks
export const getTasks = async () => {
  await connectDB();
  return await Task.find().sort({ createdAt: -1 });
};

// Add a new task
export const addTask = async (title: string, description?: string, dueDate?: Date) => {
  await connectDB();
  return await Task.create({ title, description, dueDate });
};

// Update a task
export const updateTask = async (id: string, updatedData: any) => {
  await connectDB();
  return await Task.findByIdAndUpdate(id, updatedData, { new: true });
};

// Delete a task
export const deleteTask = async (id: string) => {
  await connectDB();
  return await Task.findByIdAndDelete(id);
};
