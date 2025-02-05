"use server";

import { connectDB } from "@/lib/db";
import { Task } from "@/models/Task";
import { Types } from "mongoose"; 

export const getTasks = async () => {
  await connectDB();

  const tasks = await Task.find().sort({ createdAt: -1 }).lean();

  return tasks.map((task) => ({
    _id: (task._id as Types.ObjectId).toString(), 
    title: task.title ?? "", 
    description: task.description ?? "",
    dueDate: task.dueDate ? new Date(task.dueDate).toISOString() : undefined,
    completed: task.completed ?? false, 
    createdAt: new Date(task.createdAt).toISOString(), 
    updatedAt: new Date(task.updatedAt).toISOString(),
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
  
// ✅ Define an Interface for the Task Schema
interface TaskType {
  _id: Types.ObjectId;
  title: string;
  description?: string;
  dueDate?: Date;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ✅ Use `Partial<TaskType>` Instead of `Partial<Task>`
export const updateTask = async (id: string, updatedData: Partial<TaskType>) => {
  await connectDB();

  // ✅ Validate MongoDB ObjectId
  if (!Types.ObjectId.isValid(id)) {
    throw new Error(`❌ Invalid Task ID: ${id}`);
  }

  const task = await Task.findByIdAndUpdate(id, updatedData, { new: true });

  if (!task) {
    throw new Error(`❌ Task with ID ${id} not found`);
  }

  return {
    _id: task._id.toString(),
    title: task.title ?? "",
    description: task.description ?? "",
    dueDate: task.dueDate ? new Date(task.dueDate).toISOString() : undefined,
    completed: task.completed ?? false,
    createdAt: new Date(task.createdAt).toISOString(),
    updatedAt: new Date(task.updatedAt).toISOString(),
  };
};

  
  // Delete a task
  export const deleteTask = async (id: string) => {
    await connectDB();
    await Task.findByIdAndDelete(id);
    return { success: true };
  };
  