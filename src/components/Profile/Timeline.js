import {
  FaUserPlus,
  FaShieldAlt,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

export default function Timeline({ profile }) {
  const items = [
    {
      icon: <FaUserPlus />,
      title: "Joined GuardX",
      value: profile.joining_date || "-",
    },

    {
      icon: <FaShieldAlt />,
      title: "Department",
      value: profile.department || "-",
    },

    {
      icon: <FaCheckCircle />,
      title: "Current Designation",
      value: profile.designation || "-",
    },

    {
      icon: <FaClock />,
      title: "Current Status",
      value: profile.employee_status || "-",
    },
  ];

  return (
    <div className="gx-side-card">
      <h3>Career Timeline</h3>

      <div className="gx-timeline">
        {items.map((item, index) => (
          <div className="gx-timeline-item" key={index}>
            <div className="gx-timeline-icon">{item.icon}</div>

            <div>
              <strong>{item.title}</strong>

              <p>{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
