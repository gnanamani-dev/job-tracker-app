import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header";
import EditModal from "./components/EditModal";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import AddJob from "./pages/AddJob";
import useTheme from "./hooks/useTheme";
import { getJobs, addJob, updateJob, deleteJob } from "./services/sheetsApi";

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [view, setView] = useState("dashboard");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null);

  const load = useCallback(async () => {
    try {
      setError("");
      setJobs(await getJobs());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Updates and deletes reload the Sheet; adds use the row number returned by the backend.
  const handleAdd = async (job) => {
    try {
      setError("");
      const result = await addJob(job);
      if (Number.isInteger(result.rowIndex)) {
        setJobs((current) => [...current, { ...job, rowIndex: result.rowIndex }]);
      } else {
        // Keep compatibility with an Apps Script deployment that predates rowIndex responses.
        await load();
      }
      setView("applications");
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const handleSave = async (rowIndex, job) => {
    try {
      await updateJob(rowIndex, job);
      setEditing(null);
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (job) => {
    if (!window.confirm(`Delete ${job.company} - ${job.role}?`)) return;
    try {
      await deleteJob(job.rowIndex);
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Header view={view} onChange={setView} theme={theme} onToggleTheme={toggleTheme} />
      <main className="container">
        {error && (
          <div className="error">
            {error}
            <button onClick={() => setError("")}>x</button>
          </div>
        )}

        {loading ? (
          <p className="empty">Loading from Google Sheets...</p>
        ) : (
          <>
            {view === "dashboard" && (
              <Dashboard jobs={jobs} onViewAll={() => setView("applications")} />
            )}
            {view === "applications" && (
              <Applications jobs={jobs} onEdit={setEditing} onDelete={handleDelete} />
            )}
            {view === "add" && <AddJob onAdd={handleAdd} />}
          </>
        )}
      </main>

      {editing && (
        <EditModal job={editing} onSave={handleSave} onClose={() => setEditing(null)} />
      )}
    </>
  );
}
