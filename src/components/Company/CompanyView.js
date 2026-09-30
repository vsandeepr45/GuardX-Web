import React from "react";

import {
  FaBuilding,
  FaPhone,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";

function CompanyView({
  company,

  close,
}) {
  if (!company) return null;

  return (
    <div className="gx-modal">
      <div className="gx-view-modal">
        {/* Header */}

        <div className="gx-view-header">
          <div>
            <h2>
              <FaBuilding />
              &nbsp; Company Details
            </h2>

            <span>Complete Company Information</span>
          </div>

          <button className="gx-close" onClick={close}>
            <FaTimes />
          </button>
        </div>

        {/* Company */}

        <div className="gx-view-section">
          <h3>
            <FaBuilding />
            Company Information
          </h3>

          <div className="gx-view-grid">
            <ViewItem label="Company Code" value={company.company_code} />

            <ViewItem label="Company Name" value={company.company_name} />

            <ViewItem label="Company Type" value={company.company_type} />

            <ViewItem label="GST Number" value={company.gst_number} />

            <ViewItem label="PAN Number" value={company.pan_number} />

            <ViewItem
              label="Registration"
              value={company.registration_number}
            />
          </div>
        </div>

        {/* Contact */}

        <div className="gx-view-section">
          <h3>
            <FaPhone />
            Contact Information
          </h3>

          <div className="gx-view-grid">
            <ViewItem label="Email" value={company.email} />

            <ViewItem label="Phone" value={company.phone} />

            <ViewItem label="Alternate Phone" value={company.alternate_phone} />

            <ViewItem label="Website" value={company.website} />

            <ViewItem label="Contact Person" value={company.contact_person} />

            <ViewItem label="Contact Mobile" value={company.contact_mobile} />
          </div>
        </div>

        {/* Address */}

        <div className="gx-view-section">
          <h3>
            <FaMapMarkerAlt />
            Address Information
          </h3>

          <div className="gx-view-grid">
            <ViewItem label="Address" value={company.address} />

            <ViewItem label="Country" value={company.country} />

            <ViewItem label="State" value={company.state} />

            <ViewItem label="District" value={company.district} />

            <ViewItem label="City" value={company.city} />

            <ViewItem label="Pincode" value={company.pincode} />

            <ViewItem label="Latitude" value={company.latitude} />

            <ViewItem label="Longitude" value={company.longitude} />
          </div>
        </div>

        {/* Additional */}

        <div className="gx-view-section">
          <h3>
            <FaInfoCircle />
            Additional Information
          </h3>

          <div className="gx-view-grid">
            <ViewItem
              label="Status"
              value={company.status ? "🟢 Active" : "🔴 Inactive"}
            />

            <ViewItem label="Remarks" value={company.remarks} />

            <ViewItem label="Created On" value={company.created_at} />

            <ViewItem label="Updated On" value={company.updated_at} />
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

export default CompanyView;
