import { getTasks, addTask, updateTask, deleteTask } from "../app/action/tasks";
import { Task } from "./taskTypes";

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
export const updateTaskDB = async (id: string, updatedData: Partial<Task>) => {
    return await updateTask(id, updatedData);
  };

// Delete a task
export const removeTask = async (id: string) => {
  return await deleteTask(id);
};
