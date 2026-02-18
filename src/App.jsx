/**
 * App component (Root)
 *
 * The top-level component that owns all application state:
 *  - tasks          : Array of task objects, persisted to localStorage
 *  - showForm       : Controls visibility of the Add Task form
 *  - editingTask    : The task currently being edited (null if none)
 *  - confirmTask    : The task pending deletion confirmation (null if none)
 *  - filter         : Active filter ("all" | "active" | "completed")
 *  - sort           : Active sort order
 *
 * Responsibilities:
 *  - Load tasks from localStorage on initial render
 *  - Save tasks to localStorage whenever the task list changes
 *  - Provide CRUD handlers to child components
 *  - Compute filtered + sorted task list passed to TaskList
 */

import { useState, useEffect } from "react";

import TaskForm      from "./components/TaskForm";
import TaskList      from "./components/TaskList";
import FilterBar     from "./components/FilterBar";
import ConfirmModal  from "./components/ConfirmModal";
import { generateId, PRIORITY_ORDER, STORAGE_KEY } from "./utils/constants";
import "./styles/index.css";

export default function App() {
  // ── State ──────────────────────────────────────────────────────────────────

  /** Load tasks from localStorage on first render; fall back to empty array */
  const [tasks, setTasks] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [showForm,    setShowForm]    = useState(false);
  const [editingTask, setEditingTask] = useState(null); // task being edited
  const [confirmTask, setConfirmTask] = useState(null); // task pending deletion
  const [filter,      setFilter]      = useState("all");
  const [sort,        setSort]        = useState("newest");

  // ── Persistence ────────────────────────────────────────────────────────────

  /** Sync tasks array to localStorage whenever it changes */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // ── CRUD handlers ──────────────────────────────────────────────────────────

  /** Adds a new task to the top of the list and closes the form */
  const handleAdd = ({ name, description, priority, dueDate }) => {
    const newTask = {
      id: generateId(),
      name,
      description,
      priority,
      dueDate,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
    setShowForm(false);
  };

  /** Saves updated fields back to the task being edited */
  const handleEdit = ({ name, description, priority, dueDate }) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === editingTask.id ? { ...t, name, description, priority, dueDate } : t
      )
    );
    setEditingTask(null);
  };

  /** Flips the completed flag of the task with the given id */
  const handleToggle = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  /** Removes the task stored in confirmTask after the user confirms */
  const handleDeleteConfirmed = () => {
    setTasks((prev) => prev.filter((t) => t.id !== confirmTask.id));
    setConfirmTask(null);
  };

  // ── Derived data ───────────────────────────────────────────────────────────

  /** Filter then sort the tasks array for display */
  const filteredAndSorted = tasks
    .filter((t) => {
      if (filter === "active")    return !t.completed;
      if (filter === "completed") return  t.completed;
      return true;
    })
    .sort((a, b) => {
      if (sort === "newest")   return b.createdAt - a.createdAt;
      if (sort === "oldest")   return a.createdAt - b.createdAt;
      if (sort === "priority") return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
      if (sort === "dueDate") {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      if (sort === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  /** Task count summary used by the header stats and FilterBar badges */
  const counts = {
    all:       tasks.length,
    active:    tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) =>  t.completed).length,
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="app">
      {/* ── Header ── */}
      <header className="app-header">
        <div className="header-text">
          <h1>My Tasks</h1>
          <p>Stay focused. Ship it.</p>
        </div>

        <div className="stats">
          <div className="stat">
            <div className="stat-num">{counts.active}</div>
            <div className="stat-label">Active</div>
          </div>
          <div className="stat">
            <div className="stat-num">{counts.completed}</div>
            <div className="stat-label">Done</div>
          </div>
        </div>
      </header>

      {/* ── Progress bar (only shown when there are tasks) ── */}
      {tasks.length > 0 && (
        <div className="progress-section">
          <div className="progress-label">
            <span>Progress</span>
            <span>{Math.round((counts.completed / counts.all) * 100)}%</span>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${(counts.completed / counts.all) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* ── Add Task button ── */}
      <button className="add-btn" onClick={() => setShowForm(true)}>
        + New Task
      </button>

      {/* ── Filter & Sort bar (only shown when there are tasks) ── */}
      {tasks.length > 0 && (
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          sort={sort}
          setSort={setSort}
          counts={counts}
        />
      )}

      {/* ── Task list ── */}
      <TaskList
        tasks={filteredAndSorted}
        onToggle={handleToggle}
        onEdit={(task) => setEditingTask(task)}
        onDelete={(task) => setConfirmTask(task)}
      />

      {/* ── Add task modal ── */}
      {showForm && (
        <TaskForm
          onSubmit={handleAdd}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* ── Edit task modal ── */}
      {editingTask && (
        <TaskForm
          initialValues={editingTask}
          onSubmit={handleEdit}
          onCancel={() => setEditingTask(null)}
        />
      )}

      {/* ── Delete confirmation modal ── */}
      {confirmTask && (
        <ConfirmModal
          taskName={confirmTask.name}
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setConfirmTask(null)}
        />
      )}
    </div>
  );
}
