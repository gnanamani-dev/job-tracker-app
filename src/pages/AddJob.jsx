import JobForm from "../components/JobForm";

export default function AddJob({ onAdd }) {
  return (
    <section className="card narrow">
      <h2>Add a new application</h2>
      <JobForm submitLabel="Add application" onSubmit={onAdd} />
    </section>
  );
}
