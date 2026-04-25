import { useState } from "react";
import type { Task, TaskStatus } from "./types/index";
import { TaskList } from "./components/TaskList/TaskList";
import { TaskFilter } from "./components/TaskFilter/TaskFilter";

// Sample task data - `fetched` app data in a real-world app would come from an API
// Each task match the Task interface
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Deploy production hotfix",
    description: "Critical bug affecting user login on mobile devices",
    status: "in-progress",
    priority: "high",
    dueDate: "2026-04-29",
  },
  {
    id: "2",
    title: "Code review: payment module",
    description: "Review PR #247 for new Stripe integration",
    status: "in-progress",
    priority: "high",
    dueDate: "2026-04-26",
  },
  {
    id: "3",
    title: "Update API documentation",
    description: "Document new endpoints added in v2.3 release",
    status: "pending",
    priority: "medium",
    dueDate: "2026-08-22",
  },
  {
    id: "4",
    title: "Refactor authentication service",
    description: "Move from JWT to session-based auth per security review",
    status: "pending",
    priority: "low",
    dueDate: "2024-12-31",
  },
  {
    id: "5",
    title: "Set up staging environment",
    description: "Configure Docker containers for QA testing",
    status: "completed",
    priority: "low",
    dueDate: "2026-04-24",
  },
];

// Filter state shape - both optional, undefined means show all
interface FilterState {
  status?: TaskStatus;
  priority?: "low" | "medium" | "high";
}

// App - root component, owns all state
// Defines callbacks and passes them down to child components
function App() {
  // tasks state - the source of truth for all task data
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // filters state - tracks active filter selections from TaskFilter
  const [filters, setFilters] = useState<FilterState>({});

  console.log("App rendered - tasks:", tasks.length, "filters:", filters);

  // handleStatusChange - updates a single task's status immutably
  // .map() finds matching task and returns updated version
  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    console.log(
      "handleStatusChange - taskId:",
      taskId,
      "newStatus:",
      newStatus,
    );
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
  };

  // handleDelete - removes a task from the array immutably
  // uses .filter() to return new array without the deleted task
  const handleDelete = (taskId: string) => {
    console.log("handleDelete - taskId:", taskId);
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  // handleFilterChange - updates filter state when user changes dropdowns
  const handleFilterChange = (newFilters: FilterState) => {
    console.log("handleFilterChange - newFilters:", newFilters);
    setFilters(newFilters);
  };

  // Filter tasks before passing to TaskList
  // If filter value is undefined, it is skipped and becomes (show all)
  const filteredTasks = tasks
    .filter((task) => (filters.status ? task.status === filters.status : true))
    .filter((task) =>
      filters.priority ? task.priority === filters.priority : true,
    );

  console.log("filteredTasks count:", filteredTasks.length);

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "1.5rem" }}>Task Manager</h1>

      {/* TaskFilter - receives callback to report filter changes */}
      <TaskFilter onFilterChange={handleFilterChange} />

      {/* TaskList - receives filtered tasks and callbacks */}
      <TaskList
        tasks={filteredTasks}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
