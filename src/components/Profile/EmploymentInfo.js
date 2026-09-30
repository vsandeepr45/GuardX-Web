import {
  FaBriefcase,
  FaBuilding,
  FaUserTie,
  FaClock,
  FaUserShield,
  FaCalendarAlt,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";

import InfoCard from "./InfoCard";

export default function EmploymentInfo({ profile }) {
  const Item = ({ icon, label, value }) => (
    <div className="gx-employment-item">
      <div className="gx-employment-icon">{icon}</div>

      <div className="gx-employment-content">
        <div className="gx-employment-label">{label}</div>

        <div className="gx-employment-value">{value || "--"}</div>
      </div>
    </div>
  );

  return (
    <InfoCard title="Employment Information" icon={<FaBriefcase />}>
      <div className="gx-employment-grid">
        <Item
          icon={<FaBuilding />}
          label="Department"
          value={profile.department}
        />

        <Item
          icon={<FaUserTie />}
          label="Designation"
          value={profile.designation}
        />

        <Item icon={<FaClock />} label="Shift" value={profile.shift} />

        <Item icon={<FaUserShield />} label="Role" value={profile.role} />

        <Item
          icon={<FaCalendarAlt />}
          label="Joining Date"
          value={profile.joining_date}
        />

        <Item
          icon={<FaUsers />}
          label="Employee Type"
          value={profile.employee_type}
        />

        <Item
          icon={<FaCheckCircle />}
          label="Employee Status"
          value={profile.employee_status}
        />

        <Item
          icon={<FaBuilding />}
          label="Nationality"
          value={profile.nationality}
        />
      </div>
    </InfoCard>
  );
}
