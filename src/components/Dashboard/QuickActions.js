import React from "react";

import { useNavigate } from "react-router-dom";

import {
  FaBuilding,
  FaUsers,
  FaProjectDiagram,
  FaMapMarkerAlt,
  FaUserShield,
  FaUserPlus,
  FaExclamationTriangle,
  FaClipboardCheck,
  FaTicketAlt,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";
import { hasPermission } from "../../utils/permissions";

function QuickActions() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const actions = [
    {
      permission: "company_add",
      title: "Add Company",
      icon: <FaBuilding />,
      color: "blue",
      route: "/company",
    },

    {
      permission: "client_add",
      title: "Add Client",
      icon: <FaUsers />,
      color: "green",
      route: "/client",
    },

    {
      permission: "project_add",
      title: "Add Project",
      icon: <FaProjectDiagram />,
      color: "orange",
      route: "/project",
    },

    {
      permission: "site_add",
      title: "Add Site",
      icon: <FaMapMarkerAlt />,
      color: "red",
      route: "/site",
    },

    {
      permission: "employee_add",
      title: "Add Employee",
      icon: <FaUserShield />,
      color: "purple",
      route: "/employee",
    },

    {
      permission: "visitor_add",
      title: "Add Visitor",
      icon: <FaUserPlus />,
      color: "teal",
      route: "/visitor-management",
    },

    {
      permission: "incident_add",
      title: "Report Incident",
      icon: <FaExclamationTriangle />,
      color: "danger",
      route: "/incident",
    },

    {
      permission: "attendance_mark",
      title: "Mark Attendance",
      icon: <FaClipboardCheck />,
      color: "success",
      route: "/mark-attendance",
    },

    {
      permission: "helpdesk_view",
      title: "View Help Desk",
      icon: <FaTicketAlt />,
      color: "purple",
      route: "/help-desk",
    },
  ];

  return (
    <div className="gx-quick-actions">
      <h2>Quick Actions</h2>

      <div className="gx-action-grid">
        {actions

          .filter((action) =>
            hasPermission(
              user,

              action.permission,
            ),
          )

          .map((action) => (
            <div
              key={action.title}
              className={`gx-action-card ${action.color}`}
              onClick={() => navigate(action.route)}
            >
              <div className="gx-action-icon">{action.icon}</div>

              <h4>{action.title}</h4>
            </div>
          ))}
      </div>
    </div>
  );
}

export default QuickActions;





// import "../../styles/NewDashboard.css";

// export default function QuickActions({

//     actions=[]

// }){

//     return(

//         <div className="gx-dashboard-card">

//             <div className="gx-widget-header">

//                 <h3>

//                     Quick Actions

//                 </h3>

//             </div>

//             <div className="gx-action-grid">

//                 {

//                     actions.map((item,index)=>(

//                         <button

//                             key={index}

//                             className="gx-action-btn"

//                             onClick={()=>window.location.href=item.route}

//                         >

//                             <div>

//                                 {item.icon}

//                             </div>

//                             <span>

//                                 {item.title}

//                             </span>

//                         </button>

//                     ))

//                 }

//             </div>

//         </div>

//     )

// }