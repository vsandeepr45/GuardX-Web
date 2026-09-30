import React from "react";

import {
  FaBuilding,
  FaUsers,
  FaProjectDiagram,
  FaMapMarkedAlt,
  FaUserShield,
  FaClipboardCheck,
  FaExclamationTriangle,
  FaUserFriends,
} from "react-icons/fa";
import {
    FaRoute,
    FaPlayCircle,
    FaCheckCircle,
    FaTimesCircle
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { hasPermission } from "../../utils/permissions";

function DashboardCards({ data }) {
  const { user } = useAuth();

  data = data || {};

  const cards = [
    {
      permission: "company_view",
      title: "Companies",
      value: data.companies || 0,
      color: "primary",
      icon: <FaBuilding />,
      route: "/company",
    },

    {
      permission: "client_view",
      title: "Clients",
      value: data.clients || 0,
      color: "success",
      icon: <FaUsers />,
      route: "/client",
    },

    {
      permission: "project_view",
      title: "Projects",
      value: data.projects || 0,
      color: "warning",
      icon: <FaProjectDiagram />,
      route: "/project",
    },

    {
      permission: "site_view",
      title: "Sites",
      value: data.sites || 0,
      color: "danger",
      icon: <FaMapMarkedAlt />,
      route: "/site",
    },

    {
      permission: "employee_view",
      title: "Employees",
      value: data.employees || 0,
      color: "purple",
      icon: <FaUserShield />,
      route: "/employee",
    },

    {
    permission: "patrol_view",
    title: "Today's Patrols",
    value: data.today_patrols || 0,
    color: "blue",
    icon: <FaRoute />,
    route: "/patrol-assignment",
},

{
    permission: "patrol_view",
    title: "Running Patrols",
    value: data.running_patrols || 0,
    color: "warning",
    icon: <FaPlayCircle />,
    route: "/employee-patrol",
},

{
    permission: "patrol_view",
    title: "Completed Patrols",
    value: data.completed_patrols || 0,
    color: "green",
    icon: <FaCheckCircle />,
    route: "/employee-patrol",
},

{
    permission: "patrol_view",
    title: "Missed Patrols",
    value: data.missed_patrols || 0,
    color: "red",
    icon: <FaTimesCircle />,
    route: "/employee-patrol",
},

    {
      permission: "attendance_view",
      title: "Today's Attendance",
      value: data.attendance_today || 0,
      color: "green",
      icon: <FaClipboardCheck />,
      route: "/attendance",
    },

    {
      permission: "incident_view",
      title: "Open Incidents",
      value: data.open_incidents || 0,
      color: "red",
      icon: <FaExclamationTriangle />,
      route: "/incident",
    },

    {
      permission: "visitor_view",
      title: "Visitors Today",
      value: data.visitors_today || 0,
      color: "orange",
      icon: <FaUserFriends />,
      route: "/visitor",
    },
  ];

  return (
    <div className="gx-dashboard-cards">
      {cards

        .filter((card) =>
          hasPermission(
            user,

            card.permission,
          ),
        )

        .map((card) => (
          <div key={card.title} className={`gx-dashboard-card ${card.color}`}>
            <div className="gx-card-icon">{card.icon}</div>

            <div className="gx-card-content">
              <h2>{card.value}</h2>

              <p>{card.title}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default DashboardCards;
