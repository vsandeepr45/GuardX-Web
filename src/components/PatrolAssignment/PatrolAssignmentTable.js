import React from "react";

import {
  FaEye,
  FaEdit,
  FaTrash,
  FaExchangeAlt,
  FaSpinner,
} from "react-icons/fa";

function PatrolAssignmentTable({
  loading,

  assignments,

  search,

  onView,

  onEdit,

  onStatus,

  onDelete,
}) {
  const filtered = assignments.filter((item) => {
    const keyword = search.toLowerCase();

    return (
      (item.assignment_code || "").toLowerCase().includes(keyword) ||
      (item.employee_code || "").toLowerCase().includes(keyword) ||
      (item.employee_name || "").toLowerCase().includes(keyword) ||
      (item.route_code || "").toLowerCase().includes(keyword) ||
      (item.route_name || "").toLowerCase().includes(keyword) ||
      (item.schedule_code || "").toLowerCase().includes(keyword) ||
      (item.schedule_name || "").toLowerCase().includes(keyword) ||
      (item.supervisor_name || "").toLowerCase().includes(keyword)
    );
  });

  if (loading) {
    return (
      <div className="gx-loading">
        <FaSpinner className="gx-spin" />

        <span>Loading Patrol Assignments...</span>
      </div>
    );
  }

  return (
    <div className="gx-table-container">
      <table className="gx-table">
        <thead>
          <tr>
            <th style={{ width: "90px" }}>Code</th>

            <th>Employee</th>

            <th>Route</th>

            <th>Schedule</th>

            <th>Supervisor</th>

            <th>Start Date</th>

            <th>End Date</th>

            <th>Status</th>

            <th style={{ width: "180px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan="9" className="gx-empty">
                No Patrol Assignments Found
              </td>
            </tr>
          ) : (
            filtered.map((row) => (
              <tr key={row.id}>
                <td>{row.assignment_code}</td>

                <td>
                  <div className="gx-user">
                    <div className="gx-avatar">
                      {row.employee_name

                        ?.charAt(0)

                        ?.toUpperCase()}
                    </div>

                    <div>
                      <strong>{row.employee_name}</strong>

                      <br />

                      <small>{row.employee_code}</small>
                    </div>
                  </div>
                </td>

                <td>
                  <strong>{row.route_code}</strong>

                  <br />

                  <small>{row.route_name}</small>
                </td>

                <td>
                  <strong>{row.schedule_code}</strong>

                  <br />

                  <small>{row.schedule_name}</small>
                </td>

                <td>{row.supervisor_name || "-"}</td>

                <td>{row.start_date}</td>

                <td>{row.end_date || "-"}</td>

                <td>
                  {row.status ? (
                    <span className="gx-status active">Active</span>
                  ) : (
                    <span className="gx-status inactive">Inactive</span>
                  )}
                </td>

                <td>
                  <div className="gx-actions">
                    <button
                      className="btn-icon view"
                      title="View"
                      onClick={() => onView(row)}
                    >
                      <FaEye />
                    </button>

                    <button
                      className="btn-icon edit"
                      title="Edit"
                      onClick={() => onEdit(row)}
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="btn-icon status"
                      title="Change Status"
                      onClick={() => onStatus(row)}
                    >
                      <FaExchangeAlt />
                    </button>

                    <button
                      className="btn-icon delete"
                      title="Delete"
                      onClick={() => onDelete(row)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PatrolAssignmentTable;
