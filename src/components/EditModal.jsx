import { useEffect } from "react";
import JobForm from "./JobForm";

export default function EditModal({ job, onSave, onClose }) {
  // Close with the Escape key.
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Edit application</h2>
        <JobForm
          initial={job}
          submitLabel="Save changes"
          onCancel={onClose}
          onSubmit={(data) => onSave(job.rowIndex, data)}
        />
      </div>
    </div>
  );
}
