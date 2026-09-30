import "../../styles/Profile.css";

export default function InfoCard({ title, icon, children, action }) {
  return (
    <div className="gx-info-card">
      <div className="gx-info-header">
        <div className="gx-info-title">
          <span className="gx-info-icon">{icon}</span>

          <h3>{title}</h3>
        </div>

        {action}
      </div>

      <div className="gx-info-body">{children}</div>
    </div>
  );
}
