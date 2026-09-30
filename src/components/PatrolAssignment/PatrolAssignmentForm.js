import React, { useState, useEffect } from "react";

import {
  createPatrolAssignment,
  updatePatrolAssignment,
} from "../../api/patrolAssignment";

import { getEmployeeDropdown } from "../../api/employee";

import { getRouteDropdown } from "../../api/patrol";

import {
    
    getScheduleDropdown
} from "../../api/patrol";
// import { getEmployeeDropdown } from "../../api/employee";

export default function PatrolAssignmentForm({
  edit,

  assignment,

  close,

  refresh,
}) {
  const [saving, setSaving] = useState(false);

  const [employees, setEmployees] = useState([]);

  const [routes, setRoutes] = useState([]);
const [schedules, setSchedules] = useState([]);


//   const [supervisors, setSupervisors] = useState([]);

  const [form, setForm] = useState({
    employee_id: "",

    route_id: "",

    schedule_id: "",



    start_date: "",

    end_date: "",

    sunday: false,

    monday: true,

    tuesday: true,

    wednesday: true,

    thursday: true,

    friday: true,

    saturday: true,

    remarks: "",
  });

  useEffect(() => {
    loadDropdowns();
  }, []);

  async function loadDropdowns() {
    try {
const [emp, route, schedule] = await Promise.all([
    getEmployeeDropdown(),
    getRouteDropdown(),
    getScheduleDropdown()
]);

setEmployees(emp.data.data || []);
setRoutes(route.data.data || []);
setSchedules(schedule.data.data || []);


    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if (edit && assignment) {
      setForm({
        employee_id: assignment.employee_id || "",

        route_id: assignment.route_id || "",

        schedule_id: assignment.schedule_id || "",



        start_date: assignment.start_date || "",

        end_date: assignment.end_date || "",

        sunday: assignment.sunday,

        monday: assignment.monday,

        tuesday: assignment.tuesday,

        wednesday: assignment.wednesday,

        thursday: assignment.thursday,

        friday: assignment.friday,

        saturday: assignment.saturday,

        remarks: assignment.remarks || "",
      });
    }
  }, [edit, assignment]);
  function handleChange(e) {
    const {
      name,

      value,

      type,

      checked,
    } = e.target;

    setForm({
      ...form,

      [name]: type === "checkbox" ? checked : value,
    });
  }
  async function save() {
    try {
      setSaving(true);

      if (edit) {
        await updatePatrolAssignment(
          assignment.id,

          form,
        );
      } else {
        await createPatrolAssignment(form);
      }

      refresh();
    } catch (err) {
      alert(err.response?.data?.message || "Unable to save assignment.");
    } finally {
      setSaving(false);
    }
  }

return (
 
    <div className="gx-dialog">
      <div className="gx-dialog-box patrol-form">
        {/* ==============================
                    Header
        ============================== */}

        <div className="gx-dialog-header">
          <h2>{edit ? "Edit Patrol Assignment" : "New Patrol Assignment"}</h2>

          <button className="gx-close" onClick={close}>
            ×
          </button>
        </div>

        {/* ==============================
                    Body
        ============================== */}

        <div className="gx-step-content">
          {/* ==============================
                        Employee Information
          ============================== */}

          <div className="gx-form-section">
            <h3>👮 Employee Information</h3>

            <div className="gx-form-grid">
              <div className="gx-form-group">
                <label>Employee</label>

                <select
                  name="employee_id"
                  value={form.employee_id}
                  onChange={handleChange}
                >
                  <option value="">Select Employee</option>

                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.employee_code} - {emp.employee_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* <div className="gx-form-group">
                <label>Supervisor</label>

                <select
                  name="supervisor_id"
                  value={form.supervisor_id}
                  onChange={handleChange}
                >
                  <option value="">Select Supervisor</option>

                  {supervisors.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.employee_name}
                    </option>
                  ))}
                </select>
              </div> */}
            </div>
          </div>

          {/* ==============================
                        Patrol Details
          ============================== */}

          <div className="gx-form-section">
            <h3>🛣 Patrol Details</h3>

            <div className="gx-form-grid">
              <div className="gx-form-group">
                <label>Route</label>

                <select
                  name="route_id"
                  value={form.route_id}
                  onChange={handleChange}
                >
                  <option value="">Select Route</option>

                  {routes.map((route) => (
                    <option key={route.id} value={route.id}>
                      {route.route_code} - {route.route_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="gx-form-group">
                <label>Schedule</label>

                <select
                  name="schedule_id"
                  value={form.schedule_id}
                  onChange={handleChange}
                >
                  <option value="">Select Schedule</option>

                  {schedules.map((schedule) => (
                    <option key={schedule.id} value={schedule.id}>
                      {schedule.schedule_code} - {schedule.schedule_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* ==============================
                        Assignment Duration
          ============================== */}

          <div className="gx-form-section">
            <h3>📅 Assignment Duration</h3>

            <div className="gx-form-grid">
              <div className="gx-form-group">
                <label>Start Date</label>

                <input
                  type="date"
                  name="start_date"
                  value={form.start_date}
                  onChange={handleChange}
                />
              </div>

              <div className="gx-form-group">
                <label>End Date</label>

                <input
                  type="date"
                  name="end_date"
                  value={form.end_date}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* ==============================
                        Working Days
          ============================== */}

          <div className="gx-form-section">
            <h3>📆 Working Days</h3>

            <div className="gx-checkbox-grid">
              <label>
                <input
                  type="checkbox"
                  name="monday"
                  checked={form.monday}
                  onChange={handleChange}
                />
                Monday
              </label>

              <label>
                <input
                  type="checkbox"
                  name="tuesday"
                  checked={form.tuesday}
                  onChange={handleChange}
                />
                Tuesday
              </label>

              <label>
                <input
                  type="checkbox"
                  name="wednesday"
                  checked={form.wednesday}
                  onChange={handleChange}
                />
                Wednesday
              </label>

              <label>
                <input
                  type="checkbox"
                  name="thursday"
                  checked={form.thursday}
                  onChange={handleChange}
                />
                Thursday
              </label>

              <label>
                <input
                  type="checkbox"
                  name="friday"
                  checked={form.friday}
                  onChange={handleChange}
                />
                Friday
              </label>

              <label>
                <input
                  type="checkbox"
                  name="saturday"
                  checked={form.saturday}
                  onChange={handleChange}
                />
                Saturday
              </label>

              <label>
                <input
                  type="checkbox"
                  name="sunday"
                  checked={form.sunday}
                  onChange={handleChange}
                />
                Sunday
              </label>
            </div>
          </div>

          {/* ==============================
                        Remarks
          ============================== */}

          <div className="gx-form-section">
            <h3>📝 Additional Information</h3>

            <div className="gx-form-group">
              <label>Remarks</label>

              <textarea
                name="remarks"
                rows={4}
                placeholder="Enter remarks..."
                value={form.remarks}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* ==============================
                    Footer
        ============================== */}

        <div className="gx-dialog-footer">
          <button
            type="button"
            className="gx-btn-light"
            onClick={close}
            disabled={saving}
          >
            Cancel
          </button>

          <button
            type="button"
            className="gx-btn-primary"
            onClick={save}
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : edit
              ? "Update Assignment"
              : "Create Assignment"}
          </button>
        </div>
      </div>
    </div>
  )
}
