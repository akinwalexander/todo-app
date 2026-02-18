/**
 * TaskList component
 *
 * Renders the full list of TaskItem cards, or an empty-state message
 * when no tasks match the current filter.
 *
 * Props:
 *  - tasks            : Array of task objects to render
 *  - onToggle(id)     : Passed down to TaskItem to toggle completion
 *  - onEdit(task)     : Passed down to TaskItem to trigger edit mode
 *  - onDelete(task)   : Passed down to TaskItem to trigger deletion
 */

import TaskItem from "../TaskItem";

function TaskList({ tasks, onToggle, onEdit, onDelete }) {
  // Show a friendly empty state when there are no tasks for the active filter
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">✦</div>
        <p>No tasks here.</p>
        <span>Add one above to get started.</span>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskList;
