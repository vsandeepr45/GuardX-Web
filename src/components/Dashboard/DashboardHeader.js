import React from "react";

import {
  FaShieldAlt,
  FaCalendarAlt,
  FaClock,
  FaUserCircle,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

function DashboardHeader() {
  const { user } = useAuth();

  const today = new Date();

  const greeting = () => {
    const hour = today.getHours();

    if (hour < 12) return "Good Morning";

    if (hour < 17) return "Good Afternoon";

    return "Good Evening";
  };

  return (
    <div className="gx-dashboard-header">
      <div>
        <h1>
          {greeting()}, {user?.name}
          👋
        </h1>

        <p>
          Welcome to <strong>GuardX Security ERP</strong>
        </p>
      </div>

      <div className="gx-dashboard-info">
        <div className="gx-info-card">
          <FaCalendarAlt />

          <span>{today.toLocaleDateString()}</span>
        </div>

        <div className="gx-info-card">
          <FaClock />

          <span>{today.toLocaleTimeString()}</span>
        </div>

        <div className="gx-info-card">
          <FaShieldAlt />

          <span>{user?.role_name}</span>
        </div>

        <div className="gx-info-card">
          <FaUserCircle />

          <span>{user?.username}</span>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;




// import "../../styles/NewDashboard.css";

// export default function DashboardHeader() {

//     const today = new Date();

//     return (

//         <div className="gx-dashboard-header">

//             <div>

//                 <h2>Security Operations Dashboard</h2>

//                 <p>
//                     Welcome back! Here's what's happening today.
//                 </p>

//             </div>

//             <div className="gx-dashboard-date">

//                 <h4>
//                     {today.toLocaleDateString("en-IN", {
//                         weekday: "long",
//                         day: "numeric",
//                         month: "long",
//                         year: "numeric"
//                     })}
//                 </h4>

//                 <span>

//                     {today.toLocaleTimeString([], {

//                         hour: "2-digit",

//                         minute: "2-digit"

//                     })}

//                 </span>

//             </div>

//         </div>

//     );

// }