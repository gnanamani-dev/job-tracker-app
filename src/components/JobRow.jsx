import StatusBadge from "./StatusBadge";
import { prettyDate } from "../utils/date";
export default function JobRow({ job, onEdit, onDelete }) {
  return (
    <tr>
      <td className="strong">{job.company}</td>
      <td>{job.role}</td>
<td className="nowrap">{prettyDate(job.dateApplied)}</td>
      <td>
        <StatusBadge status={job.status} />
      </td>
      <td className="notes">{job.notes}</td>
      <td>
        {job.link && (
          <a href={job.link} target="_blank" rel="noreferrer">
            Open
          </a>
        )}
      </td>
      <td className="actions">
        <button className="btn btn-small" onClick={() => onEdit(job)}>
          Edit
        </button>
        <button className="btn btn-small btn-danger" onClick={() => onDelete(job)}>
          Delete
        </button>
      </td>
    </tr>
  );
}
