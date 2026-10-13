import { STATUSES } from "../constants";

export default function StatsBar({ jobs }) {
  const count = (s) => jobs.filter((j) => j.status === s).length;

  return (
    <div className="stats">
      <div className="stat-card">
        <span className="stat-value">{jobs.length}</span>
        <span className="stat-label">Total applied</span>
      </div>
      {STATUSES.filter((s) => s !== "Applied").map((s) => (
        <div key={s} className={`stat-card stat-${s.toLowerCase()}`}>
          <span className="stat-value">{count(s)}</span>
          <span className="stat-label">{s}</span>
        </div>
      ))}
    </div>
  );
}
