import React from "react";

import {
  FaEye,
  FaEdit,
  FaTrash,
  FaPowerOff,
  FaRoute,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

import "../../styles/PatrolTable.css";

export default function PatrolTable({
  loading,

  routes,

  search,

  onView,

  onEdit,

  onStatus,

  onDelete,
}) {
  const filteredRoutes = routes.filter((route) => {
    const keyword = search.toLowerCase();

    return (
      route.route_code?.toLowerCase().includes(keyword) ||
      route.route_name?.toLowerCase().includes(keyword) ||
      route.site_name?.toLowerCase().includes(keyword) ||
      route.route_type?.toLowerCase().includes(keyword)
    );
  });

  if (loading) {
    return <div className="gx-table-loading">Loading patrol routes...</div>;
  }

  if (filteredRoutes.length === 0) {
    return (
      <div className="gx-empty">
        <FaRoute className="gx-empty-icon" />

        <h3>No Patrol Routes Found</h3>

        <p>Create your first patrol route to begin.</p>
      </div>
    );
  }

  return (
    <div className="gx-table-wrapper">
      <table className="gx-table">
        <thead>
          <tr>
            <th>Route Code</th>

            <th>Route Name</th>

            <th>Site</th>

            <th>Type</th>

            <th>Duration</th>

            <th>Frequency</th>

            <th>Status</th>

            <th width="220">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredRoutes.map((route) => (
            <tr key={route.id}>
              <td>
                <span className="gx-badge">{route.route_code}</span>
              </td>

              <td>
                <div className="gx-route-name">
                  <FaRoute />

                  <span>{route.route_name}</span>
                </div>
              </td>

              <td>
                <div className="gx-site">
                  <FaMapMarkerAlt />

                  {route.site_name}
                </div>
              </td>

              <td>
                <span className="gx-chip">{route.route_type}</span>
              </td>

              <td>
                <FaClock /> {route.estimated_duration} mins
              </td>

              <td>Every {route.frequency_minutes} mins</td>

              <td>
                {route.status ? (
                  <span className="gx-status active">Active</span>
                ) : (
                  <span className="gx-status inactive">Inactive</span>
                )}
              </td>
              <td>
                <div className="gx-actions">
                  <button className="view" onClick={() => onView(route)}>
                    <FaEye />
                  </button>

                  <button className="edit" onClick={() => onEdit(route)}>
                    <FaEdit />
                  </button>

                  <button className="status" onClick={() => onStatus(route)}>
                    <FaPowerOff />
                  </button>

                  <button className="delete" onClick={() => onDelete(route)}>
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
