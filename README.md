# ✦ My Tasks — To-Do List App

A clean, feature-rich React To-Do List application with localStorage persistence, filtering, sorting, and priority support.

---

## Features

- **Add tasks** with name, description, priority (High / Medium / Low), and optional due date
- **Form validation** — both name and description are required before submission
- **Edit tasks** — click the ✏️ button to open a pre-filled edit form
- **Delete tasks** — includes a confirmation dialog before removal
- **Mark complete** — toggle the checkbox; completed tasks are visually strikethrough/dimmed
- **Filter** tasks by All / Active / Done
- **Sort** by Newest, Oldest, Priority, Due Date, or Name A–Z
- **Overdue detection** — tasks past their due date are visually highlighted
- **Progress bar** showing overall completion percentage
- **localStorage persistence** — tasks survive page reloads automatically

---

## Running Locally

### Prerequisites
- Node.js ≥ 16
- npm or yarn

### Setup

```bash
# 1. Enter the project folder
cd todo-app

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Then open **http://localhost:5173** in your browser.

### Build for Production

```bash
npm run build
```

---

## Project Structure

```
todo-app/
├── index.html                        # HTML shell
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                      # App entry point
    ├── App.jsx                       # Root component — state management & layout
    │
    ├── components/
    │   ├── TaskForm/
    │   │   ├── TaskForm.jsx          # Add / Edit form with validation
    │   │   └── index.js              # Barrel export
    │   │
    │   ├── TaskList/
    │   │   ├── TaskList.jsx          # Renders filtered task cards or empty state
    │   │   └── index.js
    │   │
    │   ├── TaskItem/
    │   │   ├── TaskItem.jsx          # Individual task card (toggle, edit, delete)
    │   │   └── index.js
    │   │
    │   ├── FilterBar/
    │   │   ├── FilterBar.jsx         # Filter tabs + sort dropdown
    │   │   └── index.js
    │   │
    │   └── ConfirmModal/
    │       ├── ConfirmModal.jsx      # Delete confirmation dialog
    │       └── index.js
    │
    ├── utils/
    │   └── constants.js             # Shared constants (IDs, priority maps, storage key)
    │
    └── styles/
        └── index.css                # Global CSS variables + all component styles
```

---

## Component Responsibilities

| Component | Responsibility |
|---|---|
| `App` | Owns all state, handles CRUD logic, localStorage sync, filter/sort computation |
| `TaskForm` | Add/edit form with controlled inputs and validation |
| `TaskList` | Maps over the filtered task array; shows empty state when empty |
| `TaskItem` | Single task card with priority bar, completion toggle, and action buttons |
| `FilterBar` | Filter tabs (All/Active/Done) + sort select |
| `ConfirmModal` | Modal confirmation before permanent deletion |

---

## Design Decisions

- **Folder-per-component** — each component lives in its own folder with an `index.js` barrel export for clean imports (`import TaskForm from "./components/TaskForm"`).
- **Shared constants** — `PRIORITY_COLORS`, `PRIORITY_LABELS`, `PRIORITY_ORDER`, `generateId`, and `STORAGE_KEY` live in `utils/constants.js` so they can be imported by any component without circular dependencies.
- **Global CSS** — all styles are in `styles/index.css` using CSS custom properties. This keeps component files focused on logic and avoids style duplication.
- **localStorage** is read once on init via the `useState` lazy initializer, and written on every task change via `useEffect`.
