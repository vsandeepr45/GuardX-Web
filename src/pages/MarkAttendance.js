import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/MarkAttendance.css";
import DashboardLayout from "../layouts/DashboardLayout";

const MarkAttendance = () => {
  const [formData, setFormData] = useState({
    employee: "",
    company_id: "",
    client_id: "",
    project_id: "",
    site_id: "",
    shift_id: "",

    attendanceDate: "",
    punchIn: "",
    punchOut: "",
    status: "Present",
    remarks: "",
  });

  const [employees, setEmployees] = useState([]);

  const [attendanceList, setAttendanceList] = useState([]);

  const [filters, setFilters] = useState({
    employee: "",
    attendanceDate: "",
    status: "",
  });

  const [showViewPopup, setShowViewPopup] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleEmployeeChange = async (e) => {
    const employeeId = e.target.value;

    setFormData({
      ...formData,
      employee: employeeId,
    });

    if (!employeeId) return;

    try {
      const res = await axios.get(
        `http://localhost:5001/api/mark-attendance/deployment/${employeeId}`,
      );

      if (res.data.success) {
        setFormData((prev) => ({
          ...prev,
          employee: employeeId,

          deployment_id: res.data.data.deployment_id,

          company_id: res.data.data.company_id,
          client_id: res.data.data.client_id,
          project_id: res.data.data.project_id,
          site_id: res.data.data.site_id,
          shift_id: res.data.data.shift_id,

          company_name: res.data.data.company_name,
          client_name: res.data.data.client_name,
          project_name: res.data.data.project_name,
          site_name: res.data.data.site_name,
          shift_name: res.data.data.shift_name,
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchAttendance();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/mark-attendance/employees",
      );

      if (res.data.success) {
        setEmployees(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchAttendance = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/mark-attendance/list",
        {
          params: {
            employee: filters.employee,
            attendanceDate: filters.attendanceDate,
            status: filters.status,
          },
        },
      );

      if (res.data.success) {
        console.log("Attendance Data:", res.data.data);

        setAttendanceList(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveAttendance = async () => {
    console.log("FORM DATA:", JSON.stringify(formData, null, 2));

    try {
      const res = await axios.post(
        "http://localhost:5001/api/mark-attendance/add",
        formData,
      );
      if (res.data.success) {
        alert("Attendance marked successfully.");

        setFormData({
          employee: "",
          deployment_id: "",

          company_id: "",
          client_id: "",
          project_id: "",
          site_id: "",
          shift_id: "",

          company_name: "",
          client_name: "",
          project_name: "",
          site_name: "",
          shift_name: "",

          attendanceDate: "",
          punchIn: "",
          punchOut: "",
          status: "Present",
          remarks: "",
        });

        fetchEmployees();
        fetchAttendance();
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to save attendance.");
    }
  };

  const updateAttendance = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5001/api/mark-attendance/update/${editId}`,
        formData,
      );

      if (res.data.success) {
        alert("Attendance updated successfully.");

        setIsEditMode(false);
        setEditId(null);

        setFormData({
          employee: "",
          deployment_id: "",

          company_id: "",
          client_id: "",
          project_id: "",
          site_id: "",
          shift_id: "",

          company_name: "",
          client_name: "",
          project_name: "",
          site_name: "",
          shift_name: "",

          attendanceDate: "",
          punchIn: "",
          punchOut: "",
          status: "Present",
          remarks: "",
        });

        fetchAttendance();
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("UPDATE ERROR:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);

        alert(error.response.data.message);
      } else {
        alert(error.message);
      }
    }
  };

  const deleteAttendance = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this attendance record?",
    );

    if (!confirmDelete) return;

    try {
      const res = await axios.delete(
        `http://localhost:5001/api/mark-attendance/delete/${id}`,
      );

      if (res.data.success) {
        alert("Attendance deleted successfully.");

        fetchAttendance();
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete attendance.");
    }
  };

  return (
    <DashboardLayout title="Mark Attendance">
      <div className="mark-attendance-page">
        <div className="page-header">
          <h2>Mark Attendance</h2>
          <p>Manage employee attendance from the admin dashboard.</p>
        </div>

        <div className="attendance-header">
          <button
            className="add-attendance-btn"
            onClick={() => setShowPopup(true)}
          >
            + Add Mark Attendance
          </button>
        </div>

        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h4>Total Employees</h4>
            <h2>120</h2>
          </div>

          <div className="dashboard-card present-card">
            <h4>Present</h4>
            <h2>98</h2>
          </div>

          <div className="dashboard-card absent-card">
            <h4>Absent</h4>
            <h2>15</h2>
          </div>

          <div className="dashboard-card late-card">
            <h4>Late</h4>
            <h2>7</h2>
          </div>
        </div>

        <hr className="divider" />

        <div className="attendance-filters">
          <select
            className="filter-input"
            value={filters.employee}
            onChange={(e) =>
              setFilters({
                ...filters,
                employee: e.target.value,
              })
            }
          >
            <option value="">All Employees</option>

            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.employee_name}
              </option>
            ))}
          </select>

          <input
            type="date"
            className="filter-input"
            value={filters.attendanceDate}
            onChange={(e) =>
              setFilters({
                ...filters,
                attendanceDate: e.target.value,
              })
            }
          />

          <select
            className="filter-input"
            value={filters.status}
            onChange={(e) =>
              setFilters({
                ...filters,
                status: e.target.value,
              })
            }
          >
            <option value="">All Status</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Late">Late</option>
            <option value="Leave">Leave</option>
            <option value="Half Day">Half Day</option>
          </select>

          <div className="filter-actions">
            <button
              type="button"
              className="search-btn"
              onClick={fetchAttendance}
            >
              🔍 Search
            </button>

            <button
              className="clear-btn"
              onClick={() => {
                setFilters({
                  employee: "",
                  attendanceDate: "",
                  status: "",
                });

                setTimeout(() => {
                  fetchAttendance();
                }, 100);
              }}
            >
              ✖ Clear
            </button>
          </div>
        </div>

        <h3 className="table-title">Today's Attendance</h3>

        <table className="attendance-table">
          <thead>
            <tr>
              <th>Employee Code</th>
              <th>Employee Name</th>
              <th>Date</th>
              <th>Punch In</th>
              <th>Punch Out</th>
              <th>Work Hours</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {attendanceList.length > 0 ? (
              attendanceList.map((row) => (
                <tr key={row.id}>
                  <td>{row.employee_code}</td>
                  <td>{row.employee_name}</td>

                  <td>
                    {new Date(row.attendance_date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td>
                    {row.punch_in_time
                      ? new Date(row.punch_in_time).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "-"}
                  </td>

                  <td>
                    {row.punch_out_time
                      ? new Date(row.punch_out_time).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "-"}
                  </td>

                  <td>
                    {row.punch_in_time && row.punch_out_time
                      ? (
                          (new Date(row.punch_out_time) -
                            new Date(row.punch_in_time)) /
                          (1000 * 60 * 60)
                        ).toFixed(2) + " hrs"
                      : "-"}
                  </td>

                  <td>
                    <span
                      className={`status ${row.attendance_status.toLowerCase()}`}
                    >
                      {row.attendance_status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="view-btn"
                      onClick={() => {
                        setSelectedAttendance(row);
                        setShowViewPopup(true);
                      }}
                    >
                      View
                    </button>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setIsEditMode(true);
                        setEditId(row.id);

                        setFormData({
                          employee: row.employee_id,

                          attendanceDate: row.attendance_date
                            ? new Date(row.attendance_date)
                                .toISOString()
                                .split("T")[0]
                            : "",

                          punchIn: row.punch_in_time
                            ? new Date(row.punch_in_time)
                                .toISOString()
                                .substring(11, 16)
                            : "",

                          punchOut: row.punch_out_time
                            ? new Date(row.punch_out_time)
                                .toISOString()
                                .substring(11, 16)
                            : "",

                          status: row.attendance_status,
                          remarks: row.remarks || "",

                          company_name: row.company_name || "",
                          client_name: row.client_name || "",
                          project_name: row.project_name || "",
                          site_name: row.site_name || "",
                          shift_name: row.shift_name || "",

                          company_id: row.company_id,
                          client_id: row.client_id,
                          project_id: row.project_id,
                          site_id: row.site_id,
                          shift_id: row.shift_id,
                        });

                        setShowPopup(true); // ⭐ Ye line missing hai
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteAttendance(row.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No attendance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {showViewPopup && selectedAttendance && (
          <div className="popup-overlay">
            <div className="popup-box">
              <div className="popup-header">
                <h2>Attendance Details</h2>

                <button
                  className="close-btn"
                  onClick={() => setShowViewPopup(false)}
                >
                  ✕
                </button>
              </div>

              <div className="view-details-grid">
                <div className="detail-item">
                  <label>Employee Code</label>
                  <span>{selectedAttendance.employee_code}</span>
                </div>

                <div className="detail-item">
                  <label>Employee Name</label>
                  <span>{selectedAttendance.employee_name}</span>
                </div>

                <div className="detail-item">
                  <label>Company</label>
                  <span>{selectedAttendance.company_name}</span>
                </div>

                <div className="detail-item">
                  <label>Client</label>
                  <span>{selectedAttendance.client_name}</span>
                </div>

                <div className="detail-item">
                  <label>Project</label>
                  <span>{selectedAttendance.project_name}</span>
                </div>

                <div className="detail-item">
                  <label>Site</label>
                  <span>{selectedAttendance.site_name}</span>
                </div>

                <div className="detail-item">
                  <label>Shift</label>
                  <span>{selectedAttendance.shift_name}</span>
                </div>

                <div className="detail-item">
                  <label>Date</label>
                  <span>
                    {new Date(
                      selectedAttendance.attendance_date,
                    ).toLocaleDateString("en-GB")}
                  </span>
                </div>

                <div className="detail-item">
                  <label>Punch In</label>
                  <span>
                    {selectedAttendance.punch_in_time
                      ? new Date(
                          selectedAttendance.punch_in_time,
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "-"}
                  </span>
                </div>

                <div className="detail-item">
                  <label>Punch Out</label>
                  <span>
                    {selectedAttendance.punch_out_time
                      ? new Date(
                          selectedAttendance.punch_out_time,
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "-"}
                  </span>
                </div>

                <div className="detail-item">
                  <label>Status</label>
                  <span>{selectedAttendance.attendance_status}</span>
                </div>

                <div className="detail-item full-width">
                  <label>Remarks</label>
                  <span>{selectedAttendance.remarks || "-"}</span>
                </div>
              </div>

              <div className="popup-footer">
                <button
                  className="close-btn"
                  onClick={() => setShowViewPopup(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-box attendance-popup">
              <div className="popup-header">
                <h2>Mark Attendance</h2>

                <button
                  className="close-btn"
                  onClick={() => setShowPopup(false)}
                >
                  ✕
                </button>
              </div>

              <div className="attendance-card">
                <div className="attendance-form">
                  <div className="form-group">
                    <label>Employee</label>
                    <select
                      value={formData.employee}
                      onChange={handleEmployeeChange}
                    >
                      <option value="">Select Employee</option>

                      {employees.map((emp) => (
                        <option key={emp.id} value={emp.id}>
                          {emp.employee_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Company</label>
                    <input
                      type="text"
                      value={formData.company_name || ""}
                      readOnly
                    />
                  </div>

                  <div className="form-group">
                    <label>Client</label>
                    <input
                      type="text"
                      value={formData.client_name || ""}
                      readOnly
                    />
                  </div>

                  <div className="form-group">
                    <label>Project</label>
                    <input
                      type="text"
                      value={formData.project_name || ""}
                      readOnly
                    />
                  </div>

                  <div className="form-group">
                    <label>Site</label>
                    <input
                      type="text"
                      value={formData.site_name || ""}
                      readOnly
                    />
                  </div>

                  <div className="form-group">
                    <label>Shift</label>
                    <input
                      type="text"
                      value={formData.shift_name || ""}
                      readOnly
                    />
                  </div>

                  <div className="form-group">
                    <label>Attendance Date</label>
                    <input
                      type="date"
                      value={formData.attendanceDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          attendanceDate: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Punch In Time</label>
                    <input
                      type="time"
                      value={formData.punchIn}
                      onChange={(e) =>
                        setFormData({ ...formData, punchIn: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Punch Out Time</label>
                    <input
                      type="time"
                      value={formData.punchOut}
                      onChange={(e) =>
                        setFormData({ ...formData, punchOut: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Attendance Status</label>

                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                    >
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                      <option value="Leave">Leave</option>
                      <option value="Half Day">Half Day</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Remarks</label>
                    <textarea
                      rows="4"
                      value={formData.remarks}
                      onChange={(e) =>
                        setFormData({ ...formData, remarks: e.target.value })
                      }
                    />
                  </div>

                  <div className="button-group">
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => setShowPopup(false)}
                    >
                      ✖ Cancel
                    </button>

                    <button
                      type="button"
                      className="save-btn"
                      onClick={() => {
                        if (isEditMode) {
                          updateAttendance();
                        } else {
                          saveAttendance();
                        }
                      }}
                    >
                      {isEditMode ? "Update Attendance" : "Save Attendance"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
  
};

export default MarkAttendance;
