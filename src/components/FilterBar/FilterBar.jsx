/**
 * FilterBar component
 *
 * Displays filter tabs (All / Active / Done) and a sort dropdown.
 * Lets the user narrow down and order the visible task list.
 *
 * Props:
 *  - filter          : Current active filter key ("all" | "active" | "completed")
 *  - setFilter(key)  : Updates the active filter
 *  - sort            : Current sort key ("newest" | "oldest" | "priority" | "dueDate" | "name")
 *  - setSort(key)    : Updates the active sort
 *  - counts          : Object with { all, active, completed } task counts for badge labels
 */

function FilterBar({ filter, setFilter, sort, setSort, counts }) {
  // Filter tab definitions — label includes the count badge
  const filters = [
    { key: "all",       label: `All (${counts.all})`           },
    { key: "active",    label: `Active (${counts.active})`     },
    { key: "completed", label: `Done (${counts.completed})`    },
  ];

  return (
    <div className="filter-bar">
      {/* Filter tabs */}
      <div className="filter-tabs">
        {filters.map((f) => (
          <button
            key={f.key}
            className={`filter-tab ${filter === f.key ? "active" : ""}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Sort dropdown */}
      <select
        className="sort-select"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="priority">Priority</option>
        <option value="dueDate">Due Date</option>
        <option value="name">Name A–Z</option>
      </select>
    </div>
  );
}

export default FilterBar;
