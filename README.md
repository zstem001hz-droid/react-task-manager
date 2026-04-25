# React Task Manager - Lists, Keys, and Conditionals
**Author:** Zac White

## Overview
A task management application built with React and TypeScript.
Demonstrates dynamic list rendering, conditional rendering, 
filtering, and component composition.

## Features
- ✅ Add new tasks with title, description, priority and due date
- 🔍 Filter tasks by status and priority
- 🔄 Update task status in real time
- 🗑️ Delete tasks from the list
- 🎨 Color-coded priority badges and status backgrounds
- 📱 Responsive single-page application

## Tech Stack
- [React 19](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Vite 8](https://vitejs.dev/) — Build tool and dev server

## Components

### TaskForm
Controlled form component for creating new tasks. Toggles open
and closed via a button. Uses a single state object to manage
all form fields. Validates required fields before submission and
passes the new task up to `App` via the `onAddTask` callback.

**Example:**
```tsx
<TaskForm onAddTask={(newTask) => setTasks(prev => [...prev, newTask])} />
```

### TaskFilter
Renders status and priority filter dropdowns. Manages its own
local filter state and reports changes up to `App` via the
`onFilterChange` callback. When "All" is selected, that filter
is cleared and all tasks are shown.

**Example:**
```tsx
<TaskFilter onFilterChange={(filters) => setFilters(filters)} />
```

### TaskList
Renders a dynamic list of tasks using `.map()` with `task.id`
as the stable unique key. Handles the empty state when no tasks
match the active filters. Passes status change and delete
callbacks down to each `TaskItem`.

**Example:**
```tsx
<TaskList
  tasks={filteredTasks}
  onStatusChange={handleStatusChange}
  onDelete={handleDelete}
/>
```

### TaskItem
Displays an individual task card with title, description,
priority badge, due date, and status selector. Background color
changes conditionally based on current status. Communicates
status changes and deletion back to the parent via callbacks.

**Example:**
```tsx
<TaskItem
  task={task}
  onStatusChange={handleStatusChange}
  onDelete={handleDelete}
/>
```

## Getting Started
```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

**Using the app:**
- Click **+ Add New Task** to open the task form
- Fill in the title, description, priority, and due date
- Click **Add Task** to add it to the list
- Use the **Status** and **Priority** dropdowns to filter tasks
- Change a task's status using the dropdown on each task card
- Click **Delete** to remove a task

## References

### React — Core Concepts
- [Rendering Lists](https://react.dev/learn/rendering-lists) — `.map()` and the `key` prop
- [Keeping Components Pure](https://react.dev/learn/keeping-components-pure) — immutable state updates
- [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components) — lifting state up and the callback pattern
- [Conditional Rendering](https://react.dev/learn/conditional-rendering) — `&&` operator and ternary patterns
- [useState Hook](https://react.dev/reference/react/useState) — state management reference

### React — Forms
- [Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state) — controlled components
- [Controlled vs Uncontrolled Components](https://react.dev/learn/sharing-state-between-components) — value + onChange pattern
- [Web Dev Simplified — React Forms Tutorial](https://www.youtube.com/watch?v=SdzMBWT2CDQ) — practical video walkthrough

### TypeScript
- [TypeScript Handbook — Interfaces](https://www.typescriptlang.org/docs/handbook/2/objects.html) — prop typing
- [TypeScript Handbook — Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types) — `'pending' | 'in-progress' | 'completed'`
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/) — `React.FC`, event types, `as const`
- [Literal Types and as const](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types) — `status: 'pending' as const`

### JavaScript
- [Date.now() — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now) — generating unique task IDs on creation
- [Computed Property Names — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#computed_property_names) — `[name]: value` pattern used in generic `handleChange`

### Video Resources
- [Jack Herrington — React Hook Patterns](https://www.youtube.com/watch?v=0yzoAbrjV6k) — boolean toggle pattern with useState
- [Web Dev Simplified — React in 30 Minutes](https://www.youtube.com/watch?v=Rh3tobg7hEo) — comprehensive React fundamentals review

### Tools
- [Vite Documentation](https://vitejs.dev/guide/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vitest Documentation](https://vitest.dev/guide/)

## Reflections

**How did you ensure unique keys for your list items?**
Each `<TaskItem>` was given a `key` prop set to `task.id` — a stable, unique identifier from the data model. No two tasks share the same ID, and the ID never changes between renders, giving React a consistent identity for each list item. This matters because React doesn't rebuild the entire DOM on re-render — it performs a reconciliation process, comparing the previous list against the new one. The `key` is what allows React to match "this item before" with "this item now," updating only what changed rather than re-rendering the entire list.

**What considerations did you make when implementing the filtering functionality?**
The filtering logic lives in `App.tsx`, not inside `TaskFilter`. When a user selects a filter option, `TaskFilter` calls `onFilterChange` with the selected values, passing them up to `App` via the callback pattern. `App` then applies `.filter()` to the tasks array before passing the result to `TaskList`. This separation of concerns was intentional — `TaskFilter` only reports what the user selected, while `App` decides what to do with that information. If a filter value is `undefined` (meaning "All"), that filter is skipped entirely and all tasks pass through.

**How did you handle state updates for task status changes?**
When a user changes a task's status via the dropdown, `TaskItem` calls `onStatusChange` with the task's ID and the new status. This triggers `handleStatusChange` in `App`, which uses `.map()` to create a new array — finding the matching task by ID and returning an updated copy with the new status, leaving all other tasks unchanged. Because state is updated immutably, React detects the change and re-renders. If filters are active, the updated task is immediately re-evaluated against them — a task changed to "Completed" disappears from an "In Progress" filter view instantly.

**What challenges did you face when implementing conditional rendering?**
The most practical application of conditional rendering was the task form toggle — using `isOpen` boolean state with the `&&` operator to show or hide the form without mounting/unmounting the entire component tree unnecessarily. A second instance was the empty state message in `TaskList` — when the filtered array is empty, a fallback message renders instead of a blank screen. A subtle challenge was understanding that returning an empty filtered array to `TaskList` doesn't cause an error — React simply renders nothing for an empty `.map()` result, which is valid and expected behavior.

## AI Collaboration
[Claude.ai](https://claude.ai) assisted in this project by explaining React 
concepts in detail, and helping debug TypeScript errors including the `verbatimModuleSyntax` import type requirement and deprecated `React.FormEvent` type.