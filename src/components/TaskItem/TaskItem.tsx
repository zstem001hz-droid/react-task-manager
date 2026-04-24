import React from "react";
import type { TaskItemProps, TaskStatus } from "../../types/index";

// TaskItem - displays a single task with status controls and delete button
// Pure display component - owns no state, all data comes via props
// Communicates back to parent via onStatusChange and onDelete callbacks
export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onStatusChange,
  onDelete,
}) => {
  console.log("TaskItem rendered - task:", task.title);

  // Maps priority values to colors - conditional styling
  const priorityColors: Record<string, string> = {
    low: "#22c55e",
    medium: "#f59e0b",
    high: "#ef4444",
  };

  // Maps status values to background colors
  const statusColors: Record<string, string> = {
    pending: "#f3f4f6",
    "in-progress": "#dbeafe",
    completed: "#dcfce7",
  };

  // handleStatusChange - called when user selects a new status
  // casts event.target.value to TaaskStatus type then calls parent callback
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value as TaskStatus;
    console.log("Status changed - TaskId:", task.id, "newStatus:", newStatus);
    onStatusChange(task.id, newStatus);
  };

  // handleDelete - calls parent callback with this task's id
  const handleDelete = () => {
    console.log("Delete clicked - taskID:", task.id);
    onDelete(task.id);
  };

  return (
    <div
      style={{
        border: "1px sollid #e5e7eb",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "0.75rem",
        backgroundColor: statusColor[task.status],
      }}
    >
      {/* Task header - title and priority badge */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: 0 }}>{task.title}</h3>
        {/* Priority badge - color changes based on priority value */}
        <span
          style={{
            backgroundColor: priorityColors[task.priority],
            color: "white",
            padding: "2px 8px",
            borderRadius: "4px",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          {task.priority}
        </span>
      </div>

      {/* Task description */}
      <p style={{ color: "#6b7280", marginTop: "0.5rem" }}>
        {task.description}
      </p>

      {/* Due date */}
      <p style={{ fontSize: "12px", color: "#9ca3af" }}>
        Due: {new Date(task.dueDate).toLocaleDateString()}
      </p>

      {/* Controls row - status selector and delete button */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          marginTop: "0.75rem",
          alignItems: "center",
        }}
      >
        {/* Controlled select - value driven by task.status from props */}
        <select
          value={task.status}
          onChange={handleStatusChange}
          style={{
            padding: "4px 8px",
            borderRadius: "4px",
            border: "1px solid #d1d5db",
          }}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        {/* Delete button - calls onDelete with this task's id */}
        <button
          onClick={handleDelete}
          style={{
            backgroundColor: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "4px 12px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
