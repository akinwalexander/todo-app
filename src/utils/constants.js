/**
 * constants.js
 * Shared constants and utility functions used across components.
 */

/** Generates a unique task ID using timestamp + random string */
export const generateId = () =>
  `task_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

/** Maps priority level to its display color */
export const PRIORITY_COLORS = {
  high: "#ff4d4d",
  medium: "#ffaa00",
  low: "#44cc88",
};

/** Maps priority level to its display label */
export const PRIORITY_LABELS = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

/** Numeric order for sorting by priority (lower = higher priority) */
export const PRIORITY_ORDER = {
  high: 0,
  medium: 1,
  low: 2,
};

/** localStorage key used to persist tasks */
export const STORAGE_KEY = "todo_tasks";
