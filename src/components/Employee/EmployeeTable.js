import React from "react";

import {
  FaEye,
  FaEdit,
  FaTrash,
  FaExchangeAlt,
  FaSpinner,
  FaCamera,
} from "react-icons/fa";

function EmployeeTable({
  loading,

  employees,

  search,

  onView,

  onEdit,

  onStatus,

  onDelete,
  onFace,

  isEmployee
}) {
  const filtered = employees.filter((item) => {
    const keyword = search.toLowerCase();

    return (
      (item.employee_code || "").toLowerCase().includes(keyword) ||
      (item.employee_name || "").toLowerCase().includes(keyword) ||
      (item.mobile || "").toLowerCase().includes(keyword) ||
      (item.email || "").toLowerCase().includes(keyword) ||
      (item.department_name || "").toLowerCase().includes(keyword) ||
      (item.designation_name || "").toLowerCase().includes(keyword)
    );
  });

  if (loading) {
    return (
      <div className="gx-loading">
        <FaSpinner className="gx-spin" />

        <span>Loading Employees...</span>
      </div>
    );
  }

  return (
    <div className="gx-table-container">
      <table className="gx-table">
        <thead>
          <tr>
            <th style={{ width: "70px" }}>Code</th>

            <th>Name</th>

            <th>Department</th>

            <th>Designation</th>

            <th>Shift</th>

            <th>Mobile</th>

            <th>Status</th>

            <th>Face</th>

            <th style={{ width: "220px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan="9" className="gx-empty">
                No Employees Found
              </td>
            </tr>
          ) : (
            filtered.map((row) => (
              <tr key={row.id}>
                <td>{row.employee_code}</td>

                <td>
                  <div className="gx-user">
                    <div className="gx-avatar">
                      {row.employee_photo ? (
                        <img src={row.employee_photo} alt="employee" />
                      ) : (
                        row.employee_name?.charAt(0)?.toUpperCase()
                      )}
                    </div>

                    <div>
                      <strong>{row.employee_name}</strong>

                      <br />

                      <small>{row.email}</small>
                    </div>
                  </div>
                </td>

                <td>{row.department_name}</td>

                <td>{row.designation_name}</td>

                <td>{row.shift_name}</td>

                <td>{row.mobile}</td>

                <td>
                  {row.status ? (
                    <span className="gx-status active">Active</span>
                  ) : (
                    <span className="gx-status inactive">Inactive</span>
                  )}
                </td>

<td>
  {row.face_enrolled && row.face_sample_count === 5 ? (

    <span className="gx-status active">
      Enrolled
      <small style={{ marginLeft: "5px" }}>
        (5/5)
      </small>
    </span>

  ) : row.face_sample_count > 0 ? (

    <span className="gx-status pending">
      Incomplete
      <small style={{ marginLeft: "5px" }}>
        ({row.face_sample_count}/5)
      </small>
    </span>

  ) : (

    <span className="gx-status inactive">
      Not Enrolled
    </span>

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

                    {!isEmployee && (

                      <>

                          <button
                            className="btn-icon face"
                            title={
                              row.face_enrolled
                                ? "Re-enroll Face"
                                : "Enroll Face"
                            }
                            onClick={() => onFace(row)}
                          >
                            <FaCamera />
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

                      </>
                    )}
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

export default EmployeeTable;
