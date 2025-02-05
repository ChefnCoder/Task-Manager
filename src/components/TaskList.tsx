"use client";

import { useState, useEffect } from "react";
import { fetchTasks, createTask, toggleTaskComplete, removeTask, updateTaskDB } from "@/services/taskService";
import { Task } from "@/services/taskTypes";
import { FaCheck, FaTrash, FaPlus, FaEdit, FaSave, FaTimes } from "react-icons/fa"; // Import icons

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", dueDate: "" });
  const [editingTask, setEditingTask] = useState<string | null>(null); // Track task being edited
  const [editValues, setEditValues] = useState({ title: "", description: "", dueDate: "" });

  // Fetch tasks on page load
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await fetchTasks();
    setTasks(data);
  };

  const handleAddTask = async () => {
    if (!newTask.title.trim()) return;
    await createTask(newTask.title, newTask.description, newTask.dueDate);
    setNewTask({ title: "", description: "", dueDate: "" });
    loadTasks();
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    await toggleTaskComplete(id, completed);
    loadTasks();
  };

  const handleDeleteTask = async (id: string) => {
    await removeTask(id);
    loadTasks();
  };

  const startEditing = (task: Task) => {
    setEditingTask(task._id);
    setEditValues({
      title: task.title,
      description: task.description || "",
      dueDate: task.dueDate || "",
    });
  };

  const cancelEditing = () => {
    setEditingTask(null);
    setEditValues({ title: "", description: "", dueDate: "" });
  };

  const handleUpdateTask = async (id: string) => {
    if (!editValues.title.trim()) return;
    await updateTaskDB(id, editValues);
    setEditingTask(null);
    loadTasks();
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">📝 Task Manager</h2>

      {/* Side-by-Side Layout */}
      <div className="flex flex-col md:flex-row justify-between gap-6">
        
        {/* Add Task Form (Left Side) */}
        <div className="w-full md:w-1/2 p-6 border rounded-lg bg-gray-100 shadow-md">
          <h3 className="text-xl font-semibold mb-4">➕ Add New Task</h3>
          <input
            type="text"
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="border p-3 rounded-lg w-full mb-3"
          />
          <input
            type="text"
            placeholder="Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            className="border p-3 rounded-lg w-full mb-3"
          />
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            className="border p-3 rounded-lg w-full mb-3"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white flex items-center justify-center gap-2 px-4 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200 w-full"
          >
            <FaPlus /> Add Task
          </button>
        </div>

        {/* Task List (Right Side) */}
        <div className="w-full md:w-1/2 p-6 border rounded-lg bg-gray-50 shadow-md">
          <h3 className="text-xl font-semibold mb-4">📋 Task List</h3>
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li key={task._id} className="bg-white p-4 rounded-lg shadow-md flex flex-col">
                {editingTask === task._id ? (
                  // Edit Mode UI
                  <div>
                    <input
                      type="text"
                      value={editValues.title}
                      onChange={(e) => setEditValues({ ...editValues, title: e.target.value })}
                      className="border p-2 rounded-lg w-full mb-2"
                    />
                    <input
                      type="text"
                      value={editValues.description}
                      onChange={(e) => setEditValues({ ...editValues, description: e.target.value })}
                      className="border p-2 rounded-lg w-full mb-2"
                    />
                    <input
                      type="date"
                      value={editValues.dueDate}
                      onChange={(e) => setEditValues({ ...editValues, dueDate: e.target.value })}
                      className="border p-2 rounded-lg w-full mb-2"
                    />
                    <div className="flex justify-between">
                      <button
                        onClick={() => handleUpdateTask(task._id)}
                        className="bg-green-500 text-white p-2 rounded-lg flex items-center gap-2 hover:bg-green-600 transition-all duration-200"
                      >
                        <FaSave /> Save
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="bg-gray-500 text-white p-2 rounded-lg flex items-center gap-2 hover:bg-gray-600 transition-all duration-200"
                      >
                        <FaTimes /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode UI
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-lg font-semibold">{task.title}</h4>
                      <p className="text-gray-600">{task.description || "No description provided."}</p>
                      <p className="text-sm text-gray-500">
                        Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No Due Date"}
                      </p>
                    </div>

                    <div className="flex gap-3 items-center">
                      <span className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${task.completed ? "bg-green-500" : "bg-yellow-500"}`}>
                        {task.completed ? "Completed" : "Pending"}
                      </span>

                      <button
                        onClick={() => startEditing(task)}
                        className="p-2 rounded-lg bg-blue-500 text-white shadow-md hover:bg-blue-600 transition-all duration-200"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() => handleToggleComplete(task._id, task.completed)}
                        className={`p-2 rounded-lg text-white shadow-md transition-all duration-200 ${
                          task.completed ? "bg-green-600 hover:bg-green-700" : "bg-yellow-500 hover:bg-yellow-600"
                        }`}
                      >
                        <FaCheck />
                      </button>

                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="p-2 rounded-lg bg-red-500 text-white shadow-md hover:bg-red-600 transition-all duration-200"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
