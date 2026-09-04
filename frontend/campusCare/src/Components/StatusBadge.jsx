function StatusBadge({ status }) {
  const badgeClass = {
    Pending: "bg-warning text-dark",
    "In Progress": "bg-info text-dark",
    Resolved: "bg-success",
    Rejected: "bg-danger",
  };

  return (
    <span className={`badge ${badgeClass[status] || "bg-secondary"}`}>
      {status}
    </span>
  );
}

export default StatusBadge;