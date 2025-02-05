import mongoose, { Schema, model, models } from "mongoose";

// Define the Task schema
const TaskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Export the Task model (prevent redefining if already exists)
export const Task = models.Task || model("Task", TaskSchema);
