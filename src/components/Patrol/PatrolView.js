import React from "react";

import {
  FaRoute,
  FaMapMarkerAlt,
  FaClock,
  FaCalendarAlt,
} from "react-icons/fa";

export default function PatrolView({
  open,

  data,

  onClose,
}) {
  if (!open || !data) {
    return null;
  }

  return (
    <div className="gx-dialog">
      <div className="gx-dialog-box">
        <div className="gx-dialog-header">
          <h2>Patrol Route Details</h2>
        </div>

        <div className="gx-view-grid">
          <div>
            <label>Route Code</label>

            <p>{data.route_code}</p>
          </div>

          <div>
            <label>Route Name</label>

            <p>{data.route_name}</p>
          </div>

          <div>
            <label>Site</label>

            <p>{data.site_name}</p>
          </div>

          <div>
            <label>Route Type</label>

            <p>{data.route_type}</p>
          </div>

          <div>
            <label>Estimated Duration</label>

            <p>
              <FaClock /> {data.estimated_duration} Minutes
            </p>
          </div>

          <div>
            <label>Frequency</label>

            <p>Every {data.frequency_minutes} Minutes</p>
          </div>

          <div className="gx-full-width">
            <label>Description</label>

            <p>{data.description || "-"}</p>
          </div>
        </div>

        <hr />

        <h3>
          <FaMapMarkerAlt /> Checkpoints
        </h3>

        {data.checkpoints?.length ? (
          <table className="gx-table">
            <thead>
              <tr>
                <th>#</th>

                <th>Name</th>

                <th>Radius</th>

                <th>QR</th>

                <th>NFC</th>
              </tr>
            </thead>

            <tbody>
              {data.checkpoints.map((cp) => (
                <tr key={cp.id}>
                  <td>{cp.sequence_no}</td>

                  <td>{cp.checkpoint_name}</td>

                  <td>{cp.allowed_radius} m</td>

                  <td>{cp.qr_code ? "Yes" : "No"}</td>

                  <td>{cp.nfc_code ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No checkpoints.</p>
        )}

        <hr />

        <h3>
          <FaCalendarAlt /> Patrol Schedule
        </h3>

        {data.schedules?.length ? (
          <table className="gx-table">
            <thead>
              <tr>
                <th>Shift</th>

                <th>Start</th>

                <th>End</th>

                <th>Frequency</th>
              </tr>
            </thead>

            <tbody>
              {data.schedules.map((s, index) => (
                <tr key={index}>
                  <td>{s.shift_name}</td>

                  <td>{s.start_time}</td>

                  <td>{s.end_time}</td>

                  <td>{s.frequency_minutes} Min</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No schedules.</p>
        )}

        <div className="gx-dialog-footer">
          <button className="gx-btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
