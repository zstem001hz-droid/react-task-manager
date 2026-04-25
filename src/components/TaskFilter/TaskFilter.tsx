import React, { useState } from "react";
import type { TaskFilterProps, TaskStatus } from "../../types/index";

// TaskFilter - renders status and priority filter dropdowns
// Owns local state for selected filter values
// Reports filter changes up to App via onFilterChange callback
export const TaskFilter: React.FC<TaskFilterProps> = ({ onFilterChange }) => {
  // Local state for filter selections
  const [statusFilter, setStatusFilter] = useState<TaskStatus | undefined>(
    undefined,
  );
  const [priorityFilter, setPriorityFilter] = useState<
    "low" | "medium" | "high" | undefined
  >(undefined);

  console.log(
    "TaskFilter rendered - status:",
    statusFilter,
    "priority:",
    priorityFilter,
  );

  // handleStatusChange - updates local state and notifies parent
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    // undefined when 'all' selected - tells App not to filter by status
    const newStatus = value === "all" ? undefined : (value as TaskStatus);
    setStatusFilter(newStatus);
    onFilterChange({ status: newStatus, priority: priorityFilter });
  };

  // handlePriorityChange - same pattern as status
  const handlePriorityChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = event.target.value;
    const newPriority =
      value === "all" ? undefined : (value as "low" | "medium" | "high");
    setPriorityFilter(newPriority);
    onFilterChange({ status: statusFilter, priority: newPriority });
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        marginBottom: "1.5rem",
        padding: "1rem",
        backgroundColor: "#f9fafb",
        borderRadius: "8px",
        border: "1px solid #e5e7eb",
      }}
    >
      {/* Status filter */}
      <div>
        <label
          style={{
            fontSize: "13px",
            color: "#6b7280",
            display: "block",
            marginBottom: "4px",
          }}
        >
          Status
        </label>
        <select
          value={statusFilter ?? "all"}
          onChange={handleStatusChange}
          style={{
            padding: "6px 10px",
            borderRadius: "4px",
            border: "1px solid #d1d5db",
          }}
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Priority filter */}
      <div>
        <label
          style={{
            fontSize: "13px",
            color: "#6b7280",
            display: "block",
            marginBottom: "4px",
          }}
        >
          Priority
        </label>
        <select
          value={priorityFilter ?? "all"}
          onChange={handlePriorityChange}
          style={{
            padding: "6px 10px",
            borderRadius: "4px",
            border: "1px solid #d1d5db",
          }}
        >
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </div>
  );
};
