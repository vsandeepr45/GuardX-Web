import React from "react";

export default function EmploymentTab({
  form,

  handleChange,
}) {
  return (
    <div className="gx-form-section">
      <h3>💼 Employment Information</h3>

      <div className="gx-grid-3">
        {/* Nationality */}

        <div>
          <label>Nationality *</label>

          <input
            type="text"
            name="nationality"
            value={form.nationality}
            onChange={handleChange}
            placeholder="Enter Nationality"
          />
        </div>

        {/* Contract Start */}

        <div>
          <label>Contract Start Date</label>

          <input
            type="date"
            name="contract_start_date"
            value={form.contract_start_date || ""}
            onChange={handleChange}
          />
        </div>

        {/* Contract End */}

        <div>
          <label>Contract End Date</label>

          <input
            type="date"
            name="contract_end_date"
            value={form.contract_end_date || ""}
            onChange={handleChange}
          />
        </div>

        {/* Accommodation */}

        <div>
          <label>Accommodation</label>

          <select
            name="accommodation"
            value={form.accommodation || ""}
            onChange={handleChange}
          >
            <option value="">Select</option>

            <option value="Company">Company</option>

            <option value="Self">Self</option>
          </select>
        </div>

        {/* Transportation */}

        <div>
          <label>Transportation</label>

          <select
            name="transportation"
            value={form.transportation || ""}
            onChange={handleChange}
          >
            <option value="">Select</option>

            <option value="Company">Company</option>

            <option value="Self">Self</option>
          </select>
        </div>

        {/* Uniform Size */}

        <div>
          <label>Uniform Size</label>

          <select
            name="uniform_size"
            value={form.uniform_size || ""}
            onChange={handleChange}
          >
            <option value="">Select</option>

            <option>S</option>

            <option>M</option>

            <option>L</option>

            <option>XL</option>

            <option>XXL</option>
          </select>
        </div>

        {/* Shoe Size */}

        <div>
          <label>Shoe Size</label>

          <input
            type="number"
            name="shoe_size"
            value={form.shoe_size || ""}
            onChange={handleChange}
            placeholder="Example: 42"
          />
        </div>

        {/* Salary Type */}

        <div>
          <label>Salary Type</label>

          <select
            name="salary_type"
            value={form.salary_type || ""}
            onChange={handleChange}
          >
            <option value="">Select</option>

            <option value="Monthly">Monthly</option>

            <option value="Daily">Daily</option>

            <option value="Hourly">Hourly</option>
          </select>
        </div>

        {/* Basic Salary */}

        <div>
          <label>Basic Salary</label>

          <input
            type="number"
            name="basic_salary"
            value={form.basic_salary || ""}
            onChange={handleChange}
            placeholder="0.00"
          />
        </div>
      </div>
    </div>
  );
}
