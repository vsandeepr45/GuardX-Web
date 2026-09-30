import React, { useState, useRef, useEffect } from "react";

import {
  FaBars,
  FaEnvelope,
  FaSearch,
  FaMoon,
  FaUserCircle,
  FaUser,
  FaLock,
  FaHistory,
  FaCog,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { getUser, logout } from "../../utils/auth";
import NotificationBell from "./NotificationBell";
import "../../styles/dashboard.css";
import { useTheme } from "../../context/ThemeContext";

import { FaSun } from "react-icons/fa";
function Header({ toggleSidebar }) {
  const navigate = useNavigate();

  const user = getUser();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);
  const { theme, toggleTheme } = useTheme();
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
  }

  useEffect(() => {
    function handleClick(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <header className="gx-header">
      {/* LEFT */}

      <div className="gx-header-left">
        <button className="gx-menu-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>

        <div>
          <h2>
            {greeting}, {user?.first_name || "User"} 👋
          </h2>

          <span>
            {new Date().toLocaleDateString(
              "en-US",

              {
                weekday: "long",

                day: "numeric",

                month: "long",

                year: "numeric",
              },
            )}
          </span>
        </div>
      </div>

      {/* CENTER */}

      <div className="gx-header-center">
        <div className="gx-search-box">
          <FaSearch />

          <input placeholder="Search employees, incidents, visitors..." />
        </div>
      </div>

      {/* RIGHT */}

      <div className="gx-header-right">
        <button className="gx-icon-btn" onClick={toggleTheme}>
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>

        <button className="gx-icon-btn">
          <FaEnvelope />

          <span className="hh-badge">2</span>
        </button>

        <NotificationBell />

        {/* <button className="gx-icon-btn">
          <FaBell />

          <span className="hh-badge">5</span>
        </button> */}

        <div className="gx-profile" ref={dropdownRef}>
          <div className="gx-profile-box" onClick={() => setOpen(!open)}>
            <FaUserCircle size={40} />

            <div>
              <strong>
                {user?.first_name} {user?.last_name}
              </strong>

              <small>{user?.role}</small>
            </div>

            <FaChevronDown />
          </div>

          {open && (
            <div className="gx-dropdown">
              <div className="gx-dropdown-header">
                <FaUserCircle size={55} />

                <h4>
                  {user?.first_name} {user?.last_name}
                </h4>

                <span>{user?.employee_code}</span>
              </div>

              <div
                className="gx-dropdown-item"
                onClick={() => navigate("/settings/profile")}
              >
                <FaUser />
                My Profile
              </div>

              <div
                className="gx-dropdown-item"
                onClick={() => navigate("/settings/security")}
              >
                <FaLock />
                Security
              </div>

              <div
                className="gx-dropdown-item"
                onClick={() => navigate("/settings/login-history")}
              >
                <FaHistory />
                Login History
              </div>

              <div
                className="gx-dropdown-item"
                onClick={() => navigate("/settings")}
              >
                <FaCog />
                Settings
              </div>

              <div
                className="gx-dropdown-item gx-logout"
                onClick={handleLogout}
              >
                <FaSignOutAlt />
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
