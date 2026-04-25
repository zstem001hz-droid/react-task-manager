// TaskStatus - union type constraining status to three valid values only
export type TaskStatus = "pending" | "in-progress" | "completed";

// Task - defines the shape of every task object in the application
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: "low" | "medium" | "high";
  dueDate: string;
}

// TaskListProps - props for the TaskList component
// Receives the full array and callbacks for status change an deletion
export interface TaskListProps {
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
}

// TaskItemProps - props for the TaskItem component
// onFilterChange reports the selected filters up to the parent
export interface TaskItemProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
}

// TaskFilterProps - props for the TaskFilter component
// onFilterChange reports the selected filters up to the parent
export interface TaskFilterProps {
  onFilterChange: (filters: {
    status?: TaskStatus;
    priority?: "low" | "medium" | "high";
  }) => void;
}

// TaskFormProps - props for the TaskForm component
// onAddTask callback passes new task up to App
export interface TaskFormProps {
  onAddTask: (task: Task) => void;
}
