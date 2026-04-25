import React, { useState } from "react";
import type { TaskFormProps } from "../../types/index";

// Form data shape - matches required Task fields minus id and status
// id is generated on submit, status always starts as 'pending'
interface FormData {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  dueDate: string;
}

// TaskForm - controlled form component to add new tasks
// Reports new tasks to App via onAddTask callback
export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  // Single state object for all form fields
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });

  // isOpen controls whether the form is visible
  // starts hidden, toggles on button click - conditional rendering
  const [isOpen, setIsOpen] = useState(false);

  console.log("TaskForm rendered - isOpen:", isOpen);

  // Handler for all text/select inputs
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    console.log("TaskForm handleChange - field:", name, "value:", value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handleSubmit - prevents default, builds new task, calls parent callback
  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validation - title and dueDate required
    if (!formData.title.trim() || !formData.dueDate) {
      alert("Please provide a title and due date");
      return;
    }

    // Date.now() generates unique id, status always starts as pending
    const newTask = {
      id: Date.now().toString(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      status: "pending" as const,
      dueDate: formData.dueDate,
    };

    console.log("TaskForm handleSubmit - newTask:", newTask);

    onAddTask(newTask);

    // Reset and close form
    setFormData({
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
    });
    setIsOpen(false);
  };

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      {/* Toggle button - shows/hides form using boolean state */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          backgroundColor: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "6px",
          padding: "8px 16px",
          cursor: "pointer",
          marginBottom: "1rem",
          fontWeight: "bold",
        }}
      >
        {isOpen ? "Cancel" : "+ Add New Task"}
      </button>

      {/* Form - only renders when isOpen is true */}
      {isOpen && (
        <form
          onSubmit={handleSubmit}
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "1.5rem",
            backgroundColor: "#f9fafb",
          }}
        >
          <h3 style={{ marginTop: 0 }}>New Task</h3>

          {/* Title input */}
          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="title"
              style={{
                display: "block",
                fontSize: "13px",
                marginBottom: "4px",
              }}
            >
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Task title"
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #d1d5db",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Description textarea */}
          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="description"
              style={{
                display: "block",
                fontSize: "13px",
                marginBottom: "4px",
              }}
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Task description"
              rows={3}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #d1d5db",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Priority select */}
          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="priority"
              style={{
                display: "block",
                fontSize: "13px",
                marginBottom: "4px",
              }}
            >
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #d1d5db",
              }}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Due date input */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="dueDate"
              style={{
                display: "block",
                fontSize: "13px",
                marginBottom: "4px",
              }}
            >
              Due Date *
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #d1d5db",
              }}
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            style={{
              backgroundColor: "#22c55e",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "8px 20px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Add Task
          </button>
        </form>
      )}
    </div>
  );
};
