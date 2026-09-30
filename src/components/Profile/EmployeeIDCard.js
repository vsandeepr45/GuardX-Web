import { FaIdBadge, FaShieldAlt, FaQrcode, FaBuilding } from "react-icons/fa";

export default function EmployeeIDCard({ profile }) {
  return (
    <div className="gx-side-card">
      <div className="gx-id-top">
        <FaShieldAlt />

        <h3>GuardX Security</h3>
      </div>

      <div className="gx-id-avatar">
        {profile.employee_photo ? (
          <img src={profile.employee_photo} alt="" />
        ) : (
          <FaIdBadge size={90} />
        )}
      </div>

      <h2>{profile.employee_name}</h2>

      <p>{profile.designation}</p>

      <div className="gx-id-number">{profile.employee_code}</div>

      <div className="gx-id-company">
        <FaBuilding />

        {profile.department}
      </div>

      <div className="gx-qr">
        <FaQrcode size={75} />
      </div>
    </div>
  );
}
