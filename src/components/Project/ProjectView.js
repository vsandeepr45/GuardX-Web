import React from "react";

import {
  FaBuilding,
  FaFileContract,
  FaUserTie,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";

function ProjectView({
  project,

  close,
}) {
  if (!project) return null;

  return (
    <div className="gx-modal">
      <div className="gx-view-modal">
        {/* Header */}

        <div className="gx-view-header">
          <div>
            <h2>
              <FaBuilding />
              &nbsp; Project Details
            </h2>

            <span>Complete Project Information</span>
          </div>

          <button className="gx-close" onClick={close}>
            <FaTimes />
          </button>
        </div>

        {/* Project Information */}

        <div className="gx-view-section">
          <h3>
            <FaBuilding />
            &nbsp; Project Information
          </h3>

          <div className="gx-view-grid">
            <ViewItem label="Company" value={project.company_name} />

            <ViewItem label="Client" value={project.client_name} />

            <ViewItem label="Project Code" value={project.project_code} />

            <ViewItem label="Project Name" value={project.project_name} />

            <ViewItem label="Project Type" value={project.project_type} />
          </div>
        </div>

        {/* Contract */}

        <div className="gx-view-section">
          <h3>
            <FaFileContract />
            &nbsp; Contract Information
          </h3>

          <div className="gx-view-grid">
            <ViewItem label="Contract Number" value={project.contract_number} />

            <ViewItem label="Contract Value" value={project.contract_value} />

            <ViewItem label="Start Date" value={project.start_date} />

            <ViewItem label="End Date" value={project.end_date} />
          </div>
        </div>

        {/* Manager */}

        <div className="gx-view-section">
          <h3>
            <FaUserTie />
            &nbsp; Project Manager
          </h3>

          <div className="gx-view-grid">
            <ViewItem label="Project Manager" value={project.project_manager} />

            <ViewItem label="Manager Mobile" value={project.manager_mobile} />

            <ViewItem label="Email" value={project.email} />
          </div>
        </div>

        {/* Address */}

        <div className="gx-view-section">
          <h3>
            <FaMapMarkerAlt />
            &nbsp; Address Information
          </h3>

          <div className="gx-view-grid">
            <ViewItem label="Address" value={project.address} />

            <ViewItem label="Country" value={project.country} />

            <ViewItem label="State" value={project.state} />

            <ViewItem label="District" value={project.district} />

            <ViewItem label="City" value={project.city} />

            <ViewItem label="Pincode" value={project.pincode} />

            <ViewItem label="Latitude" value={project.latitude} />

            <ViewItem label="Longitude" value={project.longitude} />
          </div>
        </div>

        {/* Additional */}

        <div className="gx-view-section">
          <h3>
            <FaInfoCircle />
            &nbsp; Additional Information
          </h3>

          <div className="gx-view-grid">
            <ViewItem
              label="Status"
              value={project.status ? "🟢 Active" : "🔴 Inactive"}
            />

            <ViewItem label="Remarks" value={project.remarks} />

            <ViewItem label="Created On" value={project.created_at} />

            <ViewItem label="Updated On" value={project.updated_at} />
          </div>
        </div>

        <div className="gx-view-footer">
          <button className="btn-primary" onClick={close}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function ViewItem({
  label,

  value,
}) {
  return (
    <div className="gx-view-item">
      <label>{label}</label>

      <p>{value || "-"}</p>
    </div>
  );
}

export default ProjectView;
