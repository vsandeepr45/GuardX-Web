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

function DesignationTable({
  loading,

  designations,

  search,

  statusFilter,

  onView,

  onEdit,

  onStatus,

  onDelete,
}) {
  const { user } = useAuth();

  const filteredData = designations.filter((item) => {
    const matchSearch =
      item.designation_name

        ?.toLowerCase()

        .includes(search.toLowerCase()) ||
      item.designation_code

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

            <th>Designation</th>

            <th>Department</th>

            <th>Site</th>

            <th>Status</th>

            <th width="220">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan="6" align="center">
                No Designations Found
              </td>
            </tr>
          ) : (
            filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.designation_code}</td>

                <td>{item.designation_name}</td>

                <td>{item.department_name}</td>

                <td>{item.site_name}</td>

                <td>
                  {item.status ? (
                    <span className="gx-badge active">
                      <FaCheckCircle />
                      Active
                    </span>
                  ) : (
                    <span className="gx-badge inactive">
                      <FaTimesCircle />
                      Inactive
                    </span>
                  )}
                </td>

                <td>
                  {hasPermission(
                    user,

                    "designation_view",
                  ) && (
                    <button
                      className="btn-icon view"
                      onClick={() => {
                        onView(item);
                      }}
                    >
                      <FaEye />
                    </button>
                  )}

                  {hasPermission(
                    user,

                    "designation_edit",
                  ) && (
                    <button
                      className="btn-icon edit"
                      onClick={() => {
                        onEdit(item);
                      }}
                    >
                      <FaEdit />
                    </button>
                  )}

                  {hasPermission(
                    user,

                    "designation_status",
                  ) && (
                    <button
                      className="btn-icon status"
                      onClick={() => {
                        onStatus(item);
                      }}
                    >
                      <FaExchangeAlt />
                    </button>
                  )}

                  {hasPermission(
                    user,

                    "designation_delete",
                  ) && (
                    <button
                      className="btn-icon delete"
                      onClick={() => {
                        onDelete(item);
                      }}
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

export default DesignationTable;
