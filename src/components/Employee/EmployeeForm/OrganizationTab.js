import React from "react";

export default function OrganizationTab({
  form,

  handleChange,

  departments,

  designations,

  shifts,

  roles,
}) {
  return (
    <div className="gx-form-section">
      <h3>🏢 Organization Information</h3>

      <div className="gx-grid-3">
        {/* Department */}

        <div>
          <label>Department *</label>

          <select
            name="department_id"
            value={form.department_id}
            onChange={handleChange}
          >
            <option value="">Select Department</option>

            {departments.map((item) => (
              <option key={item.id} value={item.id}>
                {item.department_name}
              </option>
            ))}
          </select>
        </div>

        {/* Designation */}

        <div>
          <label>Designation *</label>

          <select
            name="designation_id"
            value={form.designation_id}
            onChange={handleChange}
          >
            <option value="">Select Designation</option>

            {designations.map((item) => (
              <option key={item.id} value={item.id}>
                {item.designation_name}
              </option>
            ))}
          </select>
        </div>

        {/* Role */}

        <div>
          <label>Role *</label>

          <select name="role_id" value={form.role_id} onChange={handleChange}>
            {roles.map((item) => (
              <option key={item.id} value={item.id}>
                {item.role_name}
              </option>
            ))}
          </select>
        </div>

        {/* Shift */}

        <div>
          <label>Default Shift *</label>

          <select
            name="default_shift_id"
            value={form.default_shift_id}
            onChange={handleChange}
          >
            <option value="">Select Shift</option>

            {shifts.map((item) => (
              <option key={item.id} value={item.id}>
                {item.shift_name}
              </option>
            ))}
          </select>
        </div>

        {/* Joining Date */}

        <div>
          <label>Joining Date *</label>

          <input
            type="date"
            name="joining_date"
            value={form.joining_date}
            onChange={handleChange}
          />
        </div>

        {/* Employee Type */}

        <div>
          <label>Employee Type</label>

          <select
            name="employee_type"
            value={form.employee_type}
            onChange={handleChange}
          >
            <option value="Permanent">Permanent</option>

            <option value="Contract">Contract</option>

            <option value="Temporary">Temporary</option>

            <option value="Trainee">Trainee</option>
          </select>
        </div>

        {/* Employee Status */}

        <div>
          <label>Employee Status</label>

          <select
            name="employee_status"
            value={form.employee_status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>

            <option value="Inactive">Inactive</option>

            <option value="Resigned">Resigned</option>

            <option value="Suspended">Suspended</option>
          </select>
        </div>
      </div>
    </div>
  );
}
