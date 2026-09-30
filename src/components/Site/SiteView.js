import React from "react";
import {
    FaMapMarkerAlt,
    FaPhone,
    FaInfoCircle,
    FaTimes
} from "react-icons/fa";

function SiteView({ site, close }) {

    if (!site) return null;

    const ViewItem = ({ label, value }) => (
        <div className="gx-view-item">
            <label>{label}</label>
            <p>{value || "-"}</p>
        </div>
    );

    return (

        <div className="gx-modal">

            <div className="gx-view-modal">

                <div className="gx-view-header">

                    <div>

                        <h2>

                            <FaMapMarkerAlt />

                            &nbsp;

                            Site Details

                        </h2>

                        <span>

                            Complete Site Information

                        </span>

                    </div>

                    <button

                        className="gx-close"

                        onClick={close}

                    >

                        <FaTimes />

                    </button>

                </div>


                {/* Basic */}

                <div className="gx-view-section">

                    <h3>

                        📍 Basic Information

                    </h3>

                    <div className="gx-view-grid">

                        <ViewItem label="Company" value={site.company_name} />
                        <ViewItem label="Client" value={site.client_name} />
                        <ViewItem label="Project" value={site.project_name} />
                        <ViewItem label="Site Code" value={site.site_code} />
                        <ViewItem label="Site Name" value={site.site_name} />
                        <ViewItem label="Site Type" value={site.site_type} />

                    </div>

                </div>


                {/* Contact */}

                <div className="gx-view-section">

                    <h3>

                        <FaPhone />

                        &nbsp;

                        Contact Information

                    </h3>

                    <div className="gx-view-grid">

                        <ViewItem label="Manager" value={site.site_manager} />
                        <ViewItem label="Contact Person" value={site.contact_person} />
                        <ViewItem label="Mobile" value={site.mobile} />
                        <ViewItem label="Alternate Mobile" value={site.alternate_mobile} />
                        <ViewItem label="Email" value={site.email} />
                        <ViewItem label="Website" value={site.website} />

                    </div>

                </div>


                {/* Address */}

                <div className="gx-view-section">

                    <h3>

                        📍 Address

                    </h3>

                    <div className="gx-view-grid">

                        <ViewItem label="Address" value={site.address} />
                        <ViewItem label="Country" value={site.country} />
                        <ViewItem label="State" value={site.state} />
                        <ViewItem label="District" value={site.district} />
                        <ViewItem label="City" value={site.city} />
                        <ViewItem label="Pincode" value={site.pincode} />

                    </div>

                </div>


                {/* Operations */}

                <div className="gx-view-section">

                    <h3>

                        ⚙ Operational Details

                    </h3>

                    <div className="gx-view-grid">

                        <ViewItem label="Latitude" value={site.latitude} />
                        <ViewItem label="Longitude" value={site.longitude} />
                        <ViewItem label="Shift" value={site.shift_type} />
                        <ViewItem label="Working Hours" value={site.working_hours} />
                        <ViewItem label="Total Guards" value={site.total_guards} />
                        <ViewItem
                            label="Status"
                            value={site.status ? "🟢 Active" : "🔴 Inactive"}
                        />

                    </div>

                </div>


                {/* Remarks */}

                <div className="gx-view-section">

                    <h3>

                        <FaInfoCircle />

                        &nbsp;

                        Remarks

                    </h3>

                    <ViewItem label="Remarks" value={site.remarks} />

                </div>


                <div className="gx-view-footer">

                    <button

                        className="btn-primary"

                        onClick={close}

                    >

                        Close

                    </button>

                </div>

            </div>

        </div>

    );

}

export default SiteView;