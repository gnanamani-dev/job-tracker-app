import { useState } from "react";
import { STATUSES, EMPTY_JOB, ROLES } from "../constants";
// Reused for both adding a new job and editing an existing one.
export default function JobForm({ initial, onSubmit, onCancel, submitLabel = "Save" }) {
  const [form, setForm] = useState(initial ?? EMPTY_JOB);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSubmit(form);
      if (!initial) setForm({ ...EMPTY_JOB });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        Company *
        <input name="company" value={form.company} onChange={handleChange} required />
      </label>
      <label>
        Role *
<input
  name="role"
  list="role-options"
  placeholder="Select or type a role"
  value={form.role}
  onChange={handleChange}
  required
/>
<datalist id="role-options">
  {ROLES.map((r) => (
    <option key={r} value={r} />
  ))}
</datalist>      </label>
      <label>
        Date applied
        <input name="dateApplied" type="date" value={form.dateApplied} onChange={handleChange} />
      </label>
      <label>
        Status
        <select name="status" value={form.status} onChange={handleChange}>
          {STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>
      <label className="full">
        Job link
        <input name="link" type="url" placeholder="https://" value={form.link} onChange={handleChange} />
      </label>
      <label className="full">
        Notes
        <textarea name="notes" rows="3" value={form.notes} onChange={handleChange} />
      </label>
      <div className="form-actions full">
        {onCancel && (
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
