import {
  FaUser,
  FaIdBadge,
  FaBirthdayCake,
  FaTint,
  FaFlag,
  FaVenusMars,
} from "react-icons/fa";

import InfoCard from "./InfoCard";

export default function PersonalInfo({ profile }) {
  const Item = ({ icon, label, value }) => (
    <div className="gx-profile-item">
      <div className="gx-profile-icon">{icon}</div>

      <div className="gx-profile-details">
        <div className="gx-profile-label">{label}</div>

        <div className="gx-profile-value">{value || "--"}</div>
      </div>
    </div>
  );

  return (
    <InfoCard title="Personal Information" icon={<FaUser />}>
      <div className="gx-profile-grid">
        <Item
          icon={<FaUser />}
          label="Employee Name"
          value={profile.employee_name}
        />

        <Item
          icon={<FaIdBadge />}
          label="Employee Code"
          value={profile.employee_code}
        />

        <Item icon={<FaUser />} label="Username" value={profile.username} />

        <Item icon={<FaVenusMars />} label="Gender" value={profile.gender} />

        <Item
          icon={<FaBirthdayCake />}
          label="Date Of Birth"
          value={profile.date_of_birth}
        />

        <Item
          icon={<FaTint />}
          label="Blood Group"
          value={profile.blood_group}
        />

        <Item
          icon={<FaFlag />}
          label="Nationality"
          value={profile.nationality}
        />

        <Item
          icon={<FaUser />}
          label="Marital Status"
          value={profile.marital_status}
        />
      </div>
    </InfoCard>
  );
}
