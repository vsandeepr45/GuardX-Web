export default function StatusBadge({ status }) {
  const cls = status === "Active" ? "gx-status-active" : "gx-status-inactive";

  return <span className={`gx-status-pill ${cls}`}>{status}</span>;
}
