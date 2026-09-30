import React from "react";

import { FaEye, FaEdit, FaExchangeAlt, FaTrash } from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";
import { hasPermission } from "../../utils/permissions";

function DepartmentTable({
  loading,

  departments,

  search,

  statusFilter,

  onView,

  onEdit,

  onStatus,

  onDelete,
}) {
  const { user } = useAuth();

  const filteredDepartments = departments.filter((department) => {
    const matchSearch =
      department.department_name

        ?.toLowerCase()

        .includes(search.toLowerCase()) ||
      department.department_code

        ?.toLowerCase()

        .includes(search.toLowerCase()) ||
      department.site_name

        ?.toLowerCase()

        .includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "all" || String(department.status) === statusFilter;

    return matchSearch && matchStatus;
  });

  if (loading) {
    return <div className="gx-loading">Loading Departments...</div>;
  }

  return (
    <div className="gx-table-container">
      <table className="gx-table">
        <thead>
          <tr>
            <th>Code</th>

            <th>Department</th>

            <th>Site</th>

            <th>Department Head</th>

            <th>Status</th>

            <th width="170">Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredDepartments.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                style={{
                  textAlign: "center",

                  padding: "40px",
                }}
              >
                No Departments Found
              </td>
            </tr>
          ) : (
            filteredDepartments.map((department) => (
              <tr key={department.id}>
                <td>{department.department_code}</td>

                <td>{department.department_name}</td>

                <td>{department.site_name}</td>

                <td>{department.department_head || "-"}</td>

                <td>
                  {department.status ? (
                    <span className="badge-success">Active</span>
                  ) : (
                    <span className="badge-danger">Inactive</span>
                  )}
                </td>

                <td>
                  {hasPermission(
                    user,

                    "department_view",
                  ) && (
                    <button
                      className="btn-icon btn-view"
                      onClick={() => {
                        onView(department);
                      }}
                    >
                      <FaEye />
                    </button>
                  )}

                  {hasPermission(
                    user,

                    "department_edit",
                  ) && (
                    <button
                      className="btn-icon btn-edit"
                      onClick={() => {
                        onEdit(department);
                      }}
                    >
                      <FaEdit />
                    </button>
                  )}

                  {hasPermission(
                    user,

                    "department_edit",
                  ) && (
                    <button
                      className="btn-icon btn-status"
                      onClick={() => {
                        onStatus(department);
                      }}
                    >
                      <FaExchangeAlt />
                    </button>
                  )}

                  {hasPermission(
                    user,

                    "department_delete",
                  ) && (
                    <button
                      className="btn-icon btn-delete"
                      onClick={() => {
                        onDelete(department);
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

export default DepartmentTable;
