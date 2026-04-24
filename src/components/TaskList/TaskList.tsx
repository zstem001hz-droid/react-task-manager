import React from 'react';
import type { TaskListProps } from '../../types/index';
import { TaskItem } from '../TaskItem/TaskItem';

// TaskList - renders the full list of tasks
// Receives tasks array and callbacks from App
// Passes callbacks down each TaskItem
export const TaskList: React.FC<TaskListProps> = ({
    tasks,
    onStatusChange,
    onDelete
}) => {

    console.log('TaskList rendered - task count:', tasks.length);

    return (
        <div>
            {/* Conditional rendering - show message if no tasks exist */}
            {tasks.length === 0 && (
        <p style={{ color: '#9ca3af', textAlign: 'center', padding: '2rem' }}>
          No tasks found. Add a task to get started.
        </p>
      )}

      {/* Map over tasks array - key uses stable task.id from data */}
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
