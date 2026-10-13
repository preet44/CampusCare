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
/*Purpose: Displays the complaint's status as a Bootstrap badge with a different style for each status.

status → receives the current complaint status as a prop.
badgeClass → maps each status to a Bootstrap CSS class.
Pending → warning badge.
In Progress → info badge.
Resolved → success badge.
Rejected → danger badge.
badgeClass[status] → finds the CSS class according to the status.
|| "bg-secondary" → uses a default grey badge if the status is unknown.
<span> → displays the status badge.
export default → allows the component to be reused anywhere.*/

