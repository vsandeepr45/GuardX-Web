import React from "react";

import {
  FaRoute,
  FaMapMarkerAlt,
  FaClock,
  FaCheckCircle,
  FaCalendarAlt,
} from "react-icons/fa";

export default function ReviewStep({ form }) {
  return (
    <div className="gx-review">
      {/* ==========================================
                ROUTE INFORMATION
            ========================================== */}

      <div className="gx-review-card">
        <h3>
          <FaRoute />
          &nbsp; Route Information
        </h3>

        <div className="gx-review-grid">
          <div>
            <label>Route Code</label>

            <p>{form.route_code || "-"}</p>
          </div>

          <div>
            <label>Route Name</label>

            <p>{form.route_name || "-"}</p>
          </div>

          <div>
            <label>Route Type</label>

            <p>{form.route_type || "-"}</p>
          </div>

          <div>
            <label>Site</label>

            <p>{form.site_name || form.site || form.site_id || "-"}</p>
          </div>

          <div>
            <label>Estimated Duration</label>

            <p>{form.estimated_duration} Minutes</p>
          </div>

          <div>
            <label>Frequency</label>

            <p>Every {form.frequency_minutes} Minutes</p>
          </div>
        </div>
      </div>

      {/* ==========================================
                CHECKPOINT SUMMARY
            ========================================== */}

      <div className="gx-review-card">
        <h3>
          <FaMapMarkerAlt />
          &nbsp; Checkpoints
        </h3>

        <h1>{form.checkpoints.length}</h1>

        <span>Total Checkpoints</span>
      </div>

      {/* ==========================================
                SCHEDULE SUMMARY
            ========================================== */}

      <div className="gx-review-card">
        <h3>
          <FaCalendarAlt />
          &nbsp; Patrol Schedule
        </h3>

        <h1>{form.schedules.length}</h1>

        <span>Total Schedules</span>
      </div>

      {/* ==========================================
                DESCRIPTION
            ========================================== */}

      <div className="gx-review-card">
        <h3>Description</h3>

        <p>{form.description || "No description added."}</p>
      </div>

      {/* ==========================================
                READY
            ========================================== */}

      <div className="gx-review-success">
        <FaCheckCircle />

        <div>
          <h3>Ready to Save</h3>

          <p>
            Review all information above. Click
            <strong> Create Route </strong>
            to save this patrol route.
          </p>
        </div>
      </div>
    </div>
  );
}
