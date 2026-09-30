export default function ProfileCompletion({ profile }) {
  let total = 0;
  let completed = 0;

  Object.values(profile).forEach((v) => {
    total++;

    if (v !== null && v !== "") completed++;
  });

  const percent = Math.round((completed / total) * 100);

  return (
    <div className="gx-completion-card">
      <h3>Profile Completion</h3>

      <div className="gx-progress">
        <div
          className="gx-progress-fill"
          style={{
            width: percent + "%",
          }}
        />
      </div>

      <h2>{percent}%</h2>
    </div>
  );
}
