/**
 * TaskItem component
 *
 * Renders a single task card including:
 *  - A colour-coded priority accent bar on the left
 *  - A checkbox to toggle completion
 *  - Task name, description, priority badge, and optional due date
 *  - Edit and delete action buttons (visible on hover)
 *
 * Props:
 *  - task       : Task object { id, name, description, priority, dueDate, completed, createdAt }
 *  - onToggle(id)     : Called to toggle the task's completed status
 *  - onEdit(task)     : Called to open the edit form pre-filled with this task
 *  - onDelete(task)   : Called to open the delete confirmation modal
 */

import { PRIORITY_COLORS, PRIORITY_LABELS } from "../../utils/constants";

function TaskItem({ task, onToggle, onEdit, onDelete }) {
  // A task is overdue when it has a due date, is not yet completed, and the date has passed
  const isOverdue =
    task.dueDate && !task.completed && new Date(task.dueDate) < new Date();

  return (
    <div
      className={`task-item ${task.completed ? "completed" : ""} ${
        isOverdue ? "overdue" : ""
      }`}
    >
      {/* Left accent bar coloured by priority */}
      <div
        className="priority-bar"
        style={{ background: PRIORITY_COLORS[task.priority] }}
      />

      <div className="task-content">
        {/* Completion toggle checkbox */}
        <button
          className={`check-btn ${task.completed ? "checked" : ""}`}
          onClick={() => onToggle(task.id)}
          aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
        >
          {task.completed && "✓"}
        </button>

        <div className="task-text">
          <h3 className="task-name">{task.name}</h3>
          <p className="task-desc">{task.description}</p>

          {/* Meta: priority badge + due date */}
          <div className="task-meta">
            <span
              className="priority-badge"
              style={{
                color: PRIORITY_COLORS[task.priority],
                borderColor: PRIORITY_COLORS[task.priority],
              }}
            >
              {PRIORITY_LABELS[task.priority]}
            </span>

            {task.dueDate && (
              <span className={`due-date ${isOverdue ? "overdue-text" : ""}`}>
                {isOverdue ? "⚠ Overdue · " : "📅 "}
                {new Date(task.dueDate + "T00:00:00").toLocaleDateString(
                  "en-US",
                  { month: "short", day: "numeric", year: "numeric" }
                )}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action buttons — visible on hover via CSS */}
      <div className="task-actions">
        <button
          className="action-btn edit-btn"
          onClick={() => onEdit(task)}
          aria-label="Edit task"
        >
          ✏️
        </button>
        <button
          className="action-btn delete-btn"
          onClick={() => onDelete(task)}
          aria-label="Delete task"
        >
          🗑
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
