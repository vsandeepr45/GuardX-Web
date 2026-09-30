export default function ComplianceCard({ value = 0 }) {
  return (
    <div className="gx-compliance-card">
      <div className="gx-compliance-header">
        <h3>Patrol Compliance</h3>

        <span>{value}%</span>
      </div>

      <div className="gx-progress">
        <div
          className="gx-progress-fill"
          style={{
            width: `${value}%`,
          }}
        />
      </div>
    </div>
  );
}
