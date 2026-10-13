import { useMemo, useState } from "react";
import FilterBar from "../components/FilterBar";
import JobTable from "../components/JobTable";

export default function Applications({ jobs, onEdit, onDelete }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return jobs
      .filter((j) => !status || j.status === status)
      .filter((j) => !q || `${j.company} ${j.role}`.toLowerCase().includes(q))
      .sort((a, b) => b.dateApplied.localeCompare(a.dateApplied));
  }, [jobs, search, status]);

  return (
    <section className="card">
      <h2>All applications ({visible.length})</h2>
      <FilterBar search={search} status={status} onSearch={setSearch} onStatus={setStatus} />
      <JobTable jobs={visible} onEdit={onEdit} onDelete={onDelete} />
    </section>
  );
}
