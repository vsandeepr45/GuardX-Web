import { useNavigate } from "react-router-dom";

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="gx-quick-card">
      <h3>Quick Actions</h3>

      <div className="gx-quick-grid">
        <button onClick={() => navigate("/patrol/assignments")}>
          Patrol Assignments
        </button>

        <button onClick={() => navigate("/patrol/routes")}>
          Patrol Routes
        </button>

        <button onClick={() => navigate("/patrol/checkpoints")}>
          Checkpoints
        </button>

        <button onClick={() => navigate("/patrol/schedules")}>Schedules</button>
      </div>
    </div>
  );
}
