import React from "react";

import {
  FaEye,
  FaEdit,
  FaExchangeAlt,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

import { hasPermission } from "../../utils/permissions";

function ShiftTable({
  loading,

  shifts,

  search,

  statusFilter,

  onView,

  onEdit,

  onStatus,

  onDelete,
}) {
  const { user } = useAuth();

  const filteredData = shifts.filter((item) => {
    const matchSearch =
      item.shift_name

        ?.toLowerCase()

        .includes(search.toLowerCase()) ||
      item.shift_code

        ?.toLowerCase()

        .includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "all" || String(item.status) === statusFilter;

    return matchSearch && matchStatus;
  });

  if (loading) {
    return <div className="gx-loading">Loading...</div>;
  }

  return (
    <div className="gx-table-card">
      <table className="gx-table">
        <thead>
          <tr>
            <th>Code</th>

            <th>Shift</th>

            <th>Start</th>

            <th>End</th>

            <th>Hours</th>

            <th>Status</th>

            <th width="220">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan="7" align="center">
                No Shifts Found
              </td>
            </tr>
          ) : (
            filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.shift_code}</td>

                <td>{item.shift_name}</td>

                <td>{item.start_time}</td>

                <td>{item.end_time}</td>

                <td>{item.working_hours}</td>

                <td>
                  {item.status ? (
                    <span className="gx-badge shift active">
                      <FaCheckCircle />
                      Active
                    </span>
                  ) : (
                    <span className="gx-badge inactive ">
                      <FaTimesCircle />
                      Inactive
                    </span>
                  )}
                </td>

                <td>
                  {hasPermission(
                    user,

                    "shift_view",
                  ) && (
                    <button
                      className="btn-icon view"
                      onClick={() => onView(item)}
                    >
                      <FaEye />
                    </button>
                  )}

                  {hasPermission(
                    user,

                    "shift_edit",
                  ) && (
                    <button
                      className="btn-icon edit"
                      onClick={() => onEdit(item)}
                    >
                      <FaEdit />
                    </button>
                  )}

                  {hasPermission(
                    user,

                    "shift_status",
                  ) && (
                    <button
                      className="btn-icon status"
                      onClick={() => onStatus(item)}
                    >
                      <FaExchangeAlt />
                    </button>
                  )}

                  {hasPermission(
                    user,

                    "shift_delete",
                  ) && (
                    <button
                      className="btn-icon delete"
                      onClick={() => onDelete(item)}
                    >
                      <FaTrash />
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ShiftTable;
