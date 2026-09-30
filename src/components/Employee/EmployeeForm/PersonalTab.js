import React from "react";

export default function PersonalTab({
  form,

  handleChange,

  setForm,
}) {
  return (
    <div className="gx-form-section">
      <h3>👤 Personal Information</h3>

      <div className="gx-grid-3">
        <div>
          <label>Employee Name *</label>

          <input
            type="text"
            name="employee_name"
            value={form.employee_name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Father Name</label>

          <input
            type="text"
            name="father_name"
            value={form.father_name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Mother Name</label>

          <input
            type="text"
            name="mother_name"
            value={form.mother_name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Gender</label>

          <select name="gender" value={form.gender} onChange={handleChange}>
            <option value="Male">Male</option>

            <option value="Female">Female</option>

            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label>Date Of Birth</label>

          <input
            type="date"
            name="date_of_birth"
            value={form.date_of_birth}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Blood Group</label>

          <select
            name="blood_group"
            value={form.blood_group}
            onChange={handleChange}
          >
            <option value="">Select</option>

            <option>A+</option>

            <option>A-</option>

            <option>B+</option>

            <option>B-</option>

            <option>AB+</option>

            <option>AB-</option>

            <option>O+</option>

            <option>O-</option>
          </select>
        </div>

        <div>
          <label>Marital Status</label>

          <select
            name="marital_status"
            value={form.marital_status}
            onChange={handleChange}
          >
            <option>Single</option>

            <option>Married</option>

            <option>Divorced</option>

            <option>Widowed</option>
          </select>
        </div>

        <div>
          <label>Employee Photo</label>

          {/* <input type="file" accept="image/*" /> */}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {

              const file = e.target.files[0];

              if (!file) return;

              setForm(prev=>({

                ...prev,

                employee_photo:file

              }));

            }}
          />
        </div>
      </div>
    </div>
  );
}
