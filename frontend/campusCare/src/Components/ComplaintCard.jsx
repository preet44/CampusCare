import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

function ComplaintCard({ complaint }) {
  return (
    <div className="complaint-card">
      <h3>{complaint.title}</h3>

      <p>{complaint.description}</p>

      <p>
        <strong>Category:</strong> {complaint.category}
      </p>

      <p>
  <strong>Status:</strong>{" "}
  <StatusBadge status={complaint.status} />
</p>

      <Link to={`/complaint/${complaint._id}`}>
        View Details
      </Link>
    </div>
  );
}

export default ComplaintCard;