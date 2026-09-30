import React from "react";

import {
  FaBuilding,
  FaUsers,
  FaProjectDiagram,
  FaMapMarkerAlt,
  FaSitemap,
  FaUserTie,
  FaAlignLeft,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import "../../styles/view.css";
function DepartmentView({
  department,

  close,
}) {
  if (!department) return null;

  return (
    <div className="gx-modal">
      <div className="gx-company-view">
        {/* ============================
                    HEADER
                ============================ */}

        <div className="gx-status-header">
          <h2>Department Details</h2>
        </div>

        {/* ============================
                    BODY
                ============================ */}

        <div className="gx-view-body">
          <div className="gx-view-grid">
            <div className="gx-view-field">
              <FaBuilding />

              <div>
                <label>Company</label>

                <span>{department.company_name}</span>
              </div>
            </div>

            <div className="gx-view-field">
              <FaUsers />

              <div>
                <label>Client</label>

                <span>{department.client_name}</span>
              </div>
            </div>

            <div className="gx-view-field">
              <FaProjectDiagram />

              <div>
                <label>Project</label>

                <span>{department.project_name}</span>
              </div>
            </div>

            <div className="gx-view-field">
              <FaMapMarkerAlt />

              <div>
                <label>Site</label>

                <span>{department.site_name}</span>
              </div>
            </div>

            <div className="gx-view-field">
              <FaSitemap />

              <div>
                <label>Department Code</label>

                <span>{department.department_code}</span>
              </div>
            </div>

            <div className="gx-view-field">
              <FaSitemap />

              <div>
                <label>Department Name</label>

                <span>{department.department_name}</span>
              </div>
            </div>

            <div className="gx-view-field">
              <FaUserTie />

              <div>
                <label>Department Head</label>

                <span>{department.department_head || "-"}</span>
              </div>
            </div>

            <div className="gx-view-field">
              {department.status ? (
                <FaCheckCircle color="green" />
              ) : (
                <FaTimesCircle color="red" />
              )}

              <div>
                <label>Status</label>

                <span>{department.status ? "Active" : "Inactive"}</span>
              </div>
            </div>
          </div>

          <div className="gx-view-description">
            <label>
              <FaAlignLeft />
              &nbsp; Description
            </label>

            <p>{department.description || "No Description"}</p>
          </div>
        </div>

        {/* ============================
                    FOOTER
                ============================ */}

        <div className="gx-status-footer">
          <button className="btn-primary" onClick={close}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default DepartmentView;
