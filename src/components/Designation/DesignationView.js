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

function DesignationView({
  designation,

  close,
}) {
  if (!designation) {
    return null;
  }

  return (
    <div className="gx-modal">
      <div className="gx-company-view">
        {/* ============================
                    HEADER
                ============================ */}

        <div className="gx-status-header">
          <h2>
            <FaUserTie />
            &nbsp; Designation Details
          </h2>
        </div>

        {/* ============================
                    BODY
                ============================ */}

        <div className="gx-view-body">
          {/* ======================
                        ORGANIZATION
                    ====================== */}

          <div className="gx-view-section">
            <h3>Organization Information</h3>

            <div className="gx-view-grid">
              <div className="gx-view-field">
                <label>
                  <FaBuilding />
                  &nbsp; Company
                </label>

                <span>{designation.company_name}</span>
              </div>

              <div className="gx-view-field">
                <label>
                  <FaUsers />
                  &nbsp; Client
                </label>

                <span>{designation.client_name}</span>
              </div>

              <div className="gx-view-field">
                <label>
                  <FaProjectDiagram />
                  &nbsp; Project
                </label>

                <span>{designation.project_name}</span>
              </div>

              <div className="gx-view-field">
                <label>
                  <FaMapMarkerAlt />
                  &nbsp; Site
                </label>

                <span>{designation.site_name}</span>
              </div>
            </div>
          </div>

          {/* ======================
                        DESIGNATION
                    ====================== */}

          <div className="gx-view-section">
            <h3>Designation Information</h3>

            <div className="gx-view-grid">
              <div className="gx-view-field">
                <label>
                  <FaSitemap />
                  &nbsp; Department
                </label>

                <span>{designation.department_name}</span>
              </div>

              <div className="gx-view-field">
                <label>Designation Code</label>

                <span>{designation.designation_code}</span>
              </div>

              <div className="gx-view-field">
                <label>
                  <FaUserTie />
                  &nbsp; Designation Name
                </label>

                <span>{designation.designation_name}</span>
              </div>

              <div className="gx-view-field">
                <label>Status</label>

                <span>
                  {designation.status ? (
                    <>
                      <FaCheckCircle color="green" /> Active
                    </>
                  ) : (
                    <>
                      <FaTimesCircle color="red" /> Inactive
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* ======================
                        DESCRIPTION
                    ====================== */}

          <div className="gx-view-section">
            <h3>
              <FaAlignLeft />
              &nbsp; Description
            </h3>

            <p className="gx-description">
              {designation.description || "No Description"}
            </p>
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

export default DesignationView;
