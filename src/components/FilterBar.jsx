import { STATUSES } from "../constants";

export default function FilterBar({ search, status, onSearch, onStatus }) {
  return (
    <div className="filters">
      <input
        className="search"
        type="search"
        placeholder="Search company or role..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />
      <select value={status} onChange={(e) => onStatus(e.target.value)}>
        <option value="">All statuses</option>
        {STATUSES.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
    </div>
  );
}
