import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaShieldAlt,
  FaUserCircle,
  FaChevronDown,
  FaChevronRight,
  FaSignOutAlt,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";
import MENU from "../../config/menu";
import { hasPermission } from "../../utils/permissions";

function Sidebar() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [openGroups, setOpenGroups] = useState({
    Dashboard: true,
    "Master Data": true,
    Operations: true,
    Reports: false,
    Administration: false,
  });

  const toggleGroup = (group) => {
    setOpenGroups({
      ...openGroups,

      [group]: !openGroups[group],
    });
  };

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <aside className="gx-sidebar">
      {/* Logo */}

      <div className="gx-logo">
        <FaShieldAlt />

        <div>
          <h2>GuardX</h2>

          <small>Security ERP</small>
        </div>
      </div>

      {/* User */}

      <div className="gx-user">
        <FaUserCircle size={60} />

        <h4>{user?.first_name}</h4>

        <span>{user?.role}</span>
      </div>

      {MENU.map((group) => {
        const visibleMenus = group.items.filter((item) =>
          hasPermission(user, item.permission),
        );

        if (visibleMenus.length === 0) {
          return null;
        }

        return (
          <div key={group.group}>
            {group.group !== "Dashboard" && (
              <button
                className="gx-group"
                onClick={() => toggleGroup(group.group)}
              >
                {group.group}

                {openGroups[group.group] ? (
                  <FaChevronDown />
                ) : (
                  <FaChevronRight />
                )}
              </button>
            )}

            {(group.group === "Dashboard" || openGroups[group.group]) &&
              visibleMenus.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className="gx-menu-item"
                  >
                    <Icon />

                    <span>{item.title}</span>
                  </NavLink>
                );
              })}
          </div>
        );
      })}

      <div className="gx-sidebar-footer">
        <button className="gx-logout" onClick={handleLogout}>
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
