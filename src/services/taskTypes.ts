export interface Task {
    _id: string;
    title: string;
    description?: string;
    dueDate?: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
  }
  