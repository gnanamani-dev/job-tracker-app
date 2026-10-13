import StatsBar from "../components/StatsBar";
import StatusBadge from "../components/StatusBadge";
import { STATUSES } from "../constants";
import { prettyDate } from "../utils/date";
export default function Dashboard({ jobs, onViewAll }) {
  const recent = [...jobs]
    .sort((a, b) => b.dateApplied.localeCompare(a.dateApplied))
    .slice(0, 5);

  return (
    <>
      <StatsBar jobs={jobs} />

      <section className="card">
        <h2>Pipeline</h2>
        {jobs.length === 0 ? (
          <p className="empty">Nothing yet. Add your first application.</p>
        ) : (
          STATUSES.map((s) => {
            const n = jobs.filter((j) => j.status === s).length;
            const pct = Math.round((n / jobs.length) * 100);
            return (
              <div key={s} className="bar-row">
                <span className="bar-label">{s}</span>
                <div className="bar-track">
                  <div className={`bar-fill bar-${s.toLowerCase()}`} style={{ width: `${pct}%` }} />
                </div>
                <span className="bar-count">{n}</span>
              </div>
            );
          })
        )}
      </section>

      <section className="card">
        <div className="card-head">
          <h2>Recent applications</h2>
          <button className="btn btn-ghost btn-small" onClick={onViewAll}>
            View all
          </button>
        </div>
        {recent.map((j) => (
          <div key={j.rowIndex} className="recent-row">
            <div>
              <div className="strong">{j.company}</div>
              <div className="muted">{j.role}</div>
            </div>
            <div className="recent-right">
<span className="muted">{prettyDate(j.dateApplied)}</span>
              <StatusBadge status={j.status} />
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
