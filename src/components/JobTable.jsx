import JobRow from "./JobRow";

export default function JobTable({ jobs, onEdit, onDelete }) {
  if (jobs.length === 0) {
    return <p className="empty">No applications found.</p>;
  }

  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Role</th>
            <th>Applied</th>
            <th>Status</th>
            <th>Notes</th>
            <th>Link</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <JobRow key={job.rowIndex} job={job} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
