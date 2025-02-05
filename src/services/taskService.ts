import { getTasks, addTask, updateTask, deleteTask } from "../app/action/tasks";
import { Task } from "./taskTypes";
import { Types } from "mongoose"; 

// Fetch tasks
export const fetchTasks = async (): Promise<Task[]> => {
  return await getTasks();
};

// Add a task
export const createTask = async (title: string, description?: string, dueDate?: string) => {
  return await addTask(title, description, dueDate ? new Date(dueDate) : undefined);
};

// Update a task (toggle complete)
export const toggleTaskComplete = async (id: string, completed: boolean) => {
  return await updateTask(id, { completed: !completed });
};
interface TaskType {
  _id: Types.ObjectId;
  title: string;
  description?: string;
  dueDate?: Date;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export const updateTaskDB = async (id: string, updatedData: Partial<TaskType>) => {
    return await updateTask(id, updatedData);
  };

// Delete a task
export const removeTask = async (id: string) => {
  return await deleteTask(id);
};
