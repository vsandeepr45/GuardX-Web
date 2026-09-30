import React from "react";

import {
  FaBuilding,
  FaPhone,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";

function ClientView({
  client,

  close,
}) {
  if (!client) return null;

  return (
    <div className="gx-modal">
      <div className="gx-view-modal">
        {/* Header */}

        <div className="gx-view-header">
          <div>
            <h2>
              <FaBuilding />
              &nbsp; Client Details
            </h2>

            <span>Complete Client Information</span>
          </div>

          <button className="gx-close" onClick={close}>
            <FaTimes />
          </button>
        </div>

        {/* Client Information */}

        <div className="gx-view-section">
          <h3>
            <FaBuilding />
            Client Information
          </h3>

          <div className="gx-view-grid">
            <ViewItem label="Company" value={client.company_name} />

            <ViewItem label="Client Code" value={client.client_code} />

            <ViewItem label="Client Name" value={client.client_name} />

            <ViewItem label="Client Type" value={client.client_type} />

            <ViewItem label="Industry" value={client.industry_type} />
          </div>
        </div>

        {/* Contact */}

        <div className="gx-view-section">
          <h3>
            <FaPhone />
            Contact Information
          </h3>

          <div className="gx-view-grid">
            <ViewItem label="Contact Person" value={client.contact_person} />

            <ViewItem label="Designation" value={client.designation} />

            <ViewItem label="Email" value={client.email} />

            <ViewItem label="Mobile" value={client.mobile} />

            <ViewItem
              label="Alternate Mobile"
              value={client.alternate_mobile}
            />

            <ViewItem label="Website" value={client.website} />
          </div>
        </div>

        {/* Address */}

        <div className="gx-view-section">
          <h3>
            <FaMapMarkerAlt />
            Address Information
          </h3>

          <div className="gx-view-grid">
            <ViewItem label="Address" value={client.address} />

            <ViewItem label="Country" value={client.country} />

            <ViewItem label="State" value={client.state} />

            <ViewItem label="District" value={client.district} />

            <ViewItem label="City" value={client.city} />

            <ViewItem label="Pincode" value={client.pincode} />

            <ViewItem label="Latitude" value={client.latitude} />

            <ViewItem label="Longitude" value={client.longitude} />
          </div>
        </div>

        {/* Additional */}

        <div className="gx-view-section">
          <h3>
            <FaInfoCircle />
            Additional Information
          </h3>

          <div className="gx-view-grid">
            <ViewItem label="GST Number" value={client.gst_number} />

            <ViewItem label="PAN Number" value={client.pan_number} />

            <ViewItem
              label="Status"
              value={client.status ? "🟢 Active" : "🔴 Inactive"}
            />

            <ViewItem label="Remarks" value={client.remarks} />

            <ViewItem label="Created On" value={client.created_at} />

            <ViewItem label="Updated On" value={client.updated_at} />
          </div>
        </div>

        {/* Footer */}

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

export default ClientView;
