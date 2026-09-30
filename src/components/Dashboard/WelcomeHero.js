import React from "react";

import { FaBell, FaCalendarAlt, FaShieldAlt } from "react-icons/fa";

import "./dashboard.css";

function WelcomeHero({ user }) {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
  }

  const today = new Date().toLocaleDateString(
    "en-IN",

    {
      weekday: "long",

      day: "numeric",

      month: "long",

      year: "numeric",
    },
  );

  return (
    <div className="gx-hero">
      <div>
        <h1>
          {greeting}, {user?.first_name || "Admin"}
          👋
        </h1>

        <p>
          Welcome to
          <strong> GuardX Security ERP</strong>
        </p>
      </div>

      <div className="gx-hero-right">
        <div className="gx-date-card">
          <FaCalendarAlt />

          <span>{today}</span>
        </div>

        <button className="gx-notification">
          <FaBell />

          <span>3</span>
        </button>

        <div className="gx-user-role">
          <FaShieldAlt />

          {user?.role}
        </div>
      </div>
    </div>
  );
}

export default WelcomeHero;
