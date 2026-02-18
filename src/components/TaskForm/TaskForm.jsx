/**
 * TaskForm component
 *
 * Renders a modal form for creating a new task or editing an existing one.
 * Performs validation to ensure both name and description are filled before
 * allowing submission.
 *
 * Props:
 *  - onSubmit(data)     : Called with { name, description, priority, dueDate }
 *  - onCancel()         : Called when the user dismisses the form
 *  - initialValues      : Optional task object — when provided the form is in "edit" mode
 */

import { useState, useEffect, useRef } from "react";

function TaskForm({ onSubmit, onCancel, initialValues }) {
  const isEditing = !!initialValues;

  // Pre-populate fields when editing, otherwise start empty
  const [name, setName] = useState(initialValues?.name || "");
  const [description, setDescription] = useState(initialValues?.description || "");
  const [priority, setPriority] = useState(initialValues?.priority || "medium");
  const [dueDate, setDueDate] = useState(initialValues?.dueDate || "");
  const [errors, setErrors] = useState({});

  // Reference used to auto-focus the name input on mount
  const nameRef = useRef(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  /**
   * Validates that name and description are non-empty.
   * Populates the errors state and returns true if valid.
   */
  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Task name is required.";
    if (!description.trim()) newErrors.description = "Description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** Prevents submission if validation fails; otherwise calls onSubmit */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ name: name.trim(), description: description.trim(), priority, dueDate });
  };

  return (
    <div
      className="form-overlay"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <form className="task-form" onSubmit={handleSubmit} noValidate>
        <h2 className="form-title">{isEditing ? "Edit Task" : "New Task"}</h2>

        {/* Task Name field */}
        <div className="field">
          <label htmlFor="task-name">Task Name</label>
          <input
            id="task-name"
            ref={nameRef}
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((prev) => ({ ...prev, name: "" }));
            }}
            placeholder="What needs to be done?"
            className={errors.name ? "input-error" : ""}
          />
          {errors.name && <span className="error-msg">{errors.name}</span>}
        </div>

        {/* Description field */}
        <div className="field">
          <label htmlFor="task-desc">Description</label>
          <textarea
            id="task-desc"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setErrors((prev) => ({ ...prev, description: "" }));
            }}
            placeholder="Add details..."
            rows={3}
            className={errors.description ? "input-error" : ""}
          />
          {errors.description && <span className="error-msg">{errors.description}</span>}
        </div>

        {/* Priority + Due Date row */}
        <div className="field-row">
          <div className="field">
            <label htmlFor="task-priority">Priority</label>
            <select
              id="task-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="high">🔴 High</option>
              <option value="medium">🟡 Medium</option>
              <option value="low">🟢 Low</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="task-due">Due Date</label>
            <input
              id="task-due"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>

        {/* Form actions */}
        <div className="form-actions">
          <button type="button" className="btn-ghost" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            {isEditing ? "Save Changes" : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
