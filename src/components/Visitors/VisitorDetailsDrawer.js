import React from "react";

import {
    FaTimes,
    FaUser,
    FaPhone,
    FaBuilding,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaClock,
    FaIdBadge,
    FaBriefcase,
    FaCheckCircle,
    FaSignInAlt,
    FaSignOutAlt,
} from "react-icons/fa";


export default function VisitorDetailsDrawer({
    visitor,
    onClose,
}) {

    if (!visitor) {
        return null;
    }


    // =========================================================
    // HELPERS
    // =========================================================

    const getStatusClass = () => {

        const status =
            String(
                visitor.status ||
                visitor.visit_status ||
                ""
            ).toLowerCase();


        if (
            status === "inside" ||
            status === "checked_in" ||
            status === "approved"
        ) {

            return "inside";

        }


        if (
            status === "pending"
        ) {

            return "pending";

        }


        if (
            status === "completed" ||
            status === "checked_out"
        ) {

            return "completed";

        }


        if (
            status === "rejected" ||
            status === "cancelled"
        ) {

            return "danger";

        }


        return "default";

    };


    const getStatusText = () => {

        return (
            visitor.status ||
            visitor.visit_status ||
            "Unknown"
        );

    };


const formatDate = (value) => {

    if (!value) {
        return "--";
    }

    try {

        const date = new Date(value);

        if (!Number.isNaN(date.getTime())) {

            return date.toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );

        }

        return String(value);

    } catch {

        return String(value);

    }

};


const formatTime = (value) => {

    if (!value) {
        return "--";
    }

    // PostgreSQL TIME often arrives as:
    // 18:49:00
    // or
    // 18:49

    const valueString =
        String(value);


    const timeMatch =
        valueString.match(
            /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/
        );


    if (timeMatch) {

        const hours =
            Number(timeMatch[1]);

        const minutes =
            Number(timeMatch[2]);


        const date =
            new Date();

        date.setHours(
            hours,
            minutes,
            0,
            0
        );


        return date.toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    }


    try {

        const date =
            new Date(value);

        if (
            !Number.isNaN(
                date.getTime()
            )
        ) {

            return date.toLocaleTimeString(
                "en-IN",
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );

        }

    } catch {

        // ignore

    }


    return valueString;

};


    const getInitials = () => {

        const name =
            visitor.visitor_name ||
            visitor.name ||
            "Visitor";

        return name
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map(
                word =>
                    word[0]
                        ?.toUpperCase()
            )
            .join("");

    };


    const photo =
        visitor.visitor_photo ||
        visitor.photo ||
        visitor.profile_image ||
        visitor.employee_photo ||
        null;


    return (

        <>

            {/* =================================================
                BACKDROP
            ================================================= */}

            <div
                className="gx-visitor-drawer-backdrop"
                onClick={onClose}
            />


            {/* =================================================
                DRAWER
            ================================================= */}

            <aside
                className="gx-visitor-drawer"
                onClick={(event) =>
                    event.stopPropagation()
                }
            >

                {/* =================================================
                    DRAWER HEADER
                ================================================= */}

                <div className="gx-visitor-drawer-header">

                    <div>

                        <div className="gx-visitor-drawer-eyebrow">

                            VISITOR PROFILE

                        </div>

                        <h2>
                            Visitor Details
                        </h2>

                    </div>


                    <button
                        type="button"
                        className="gx-visitor-drawer-close"
                        onClick={onClose}
                        aria-label="Close"
                    >

                        <FaTimes />

                    </button>

                </div>


                {/* =================================================
                    PROFILE HERO
                ================================================= */}

                <div className="gx-visitor-profile-hero">

                    <div className="gx-visitor-avatar">

                        {photo ? (

                            <img
                                src={photo}
                                alt={
                                    visitor.visitor_name ||
                                    visitor.name ||
                                    "Visitor"
                                }
                            />

                        ) : (

                            <span>
                                {getInitials()}
                            </span>

                        )}

                    </div>


                    <div className="gx-visitor-profile-info">

                        <h3>

                            {visitor.visitor_name ||
                             visitor.name ||
                             "Unknown Visitor"}

                        </h3>


                        <p>

                            {visitor.visitor_code ||
                             visitor.visit_code ||
                             "Visitor"}

                        </p>


                        <span
                            className={`gx-visitor-status ${getStatusClass()}`}
                        >

                            <span className="gx-status-dot" />

                            {getStatusText()}

                        </span>

                    </div>

                </div>


                {/* =================================================
                    QUICK INFORMATION
                ================================================= */}

                <div className="gx-visitor-quick-grid">


                    <div className="gx-visitor-quick-card">

                        <FaPhone />

                        <span>
                            MOBILE
                        </span>

                        <strong>
                            {visitor.mobile ||
                             visitor.phone ||
                             "--"}
                        </strong>

                    </div>


                    <div className="gx-visitor-quick-card">

                        <FaIdBadge />

                        <span>
                            VISITOR ID
                        </span>

                        <strong>
                            {visitor.visitor_code ||
                             visitor.visit_code ||
                             visitor.id ||
                             "--"}
                        </strong>

                    </div>

                </div>


                {/* =================================================
                    VISITOR INFORMATION
                ================================================= */}

                <section className="gx-visitor-drawer-section">

                    <div className="gx-visitor-section-title">

                        <FaUser />

                        <span>
                            Visitor Information
                        </span>

                    </div>


                    <div className="gx-visitor-detail-grid">


                        <div className="gx-visitor-detail">

                            <span>
                                Full Name
                            </span>

                            <strong>
                                {visitor.visitor_name ||
                                 visitor.name ||
                                 "--"}
                            </strong>

                        </div>


                        <div className="gx-visitor-detail">

                            <span>
                                Company
                            </span>

                            <strong>
                                {visitor.company_name ||
                                 visitor.company ||
                                 "--"}
                            </strong>

                        </div>


                        <div className="gx-visitor-detail">

                            <span>
                                Email
                            </span>

                            <strong>
                                {visitor.email ||
                                 "--"}
                            </strong>

                        </div>


                        <div className="gx-visitor-detail">

                            <span>
                                ID Type
                            </span>

                            <strong>
                                {visitor.id_type ||
                                 "--"}
                            </strong>

                        </div>


                        <div className="gx-visitor-detail">

                            <span>
                                ID Number
                            </span>

                            <strong>
                                {visitor.id_number ||
                                 "--"}
                            </strong>

                        </div>


                        <div className="gx-visitor-detail">

                            <span>
                                Purpose
                            </span>

                            <strong>
                                {visitor.purpose ||
                                 visitor.visit_purpose ||
                                 "--"}
                            </strong>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    VISIT INFORMATION
                ================================================= */}

                <section className="gx-visitor-drawer-section">

                    <div className="gx-visitor-section-title">

                        <FaBriefcase />

                        <span>
                            Visit Information
                        </span>

                    </div>


                    <div className="gx-visitor-detail-grid">


                        <div className="gx-visitor-detail">

                            <span>
                                Site
                            </span>

                            <strong>
                                {visitor.site_name ||
                                 "--"}
                            </strong>

                        </div>


                        <div className="gx-visitor-detail">

                            <span>
                                Host
                            </span>

                            <strong>
                                {visitor.host_name ||
                                 visitor.employee_name ||
                                 "--"}
                            </strong>

                        </div>


                        <div className="gx-visitor-detail">

                            <span>
                                Company
                            </span>

                            <strong>
                                {visitor.client_name ||
                                 visitor.company_name ||
                                 "--"}
                            </strong>

                        </div>


                        <div className="gx-visitor-detail">

                            <span>
                                Visit Date
                            </span>

                            <strong>

                                <FaCalendarAlt />

{formatDate(
    visitor.expected_date
)}

                            </strong>

                        </div>


                        <div className="gx-visitor-detail">

                            <span>
                                Expected In
                            </span>

                            <strong>

                                <FaClock />

{formatTime(
    visitor.expected_arrival_time
)}

                            </strong>

                        </div>


                        <div className="gx-visitor-detail">

                            <span>
                                Expected Out
                            </span>

                            <strong>

                                <FaClock />

{formatTime(
    visitor.expected_departure_time
)}

                            </strong>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    MOVEMENT
                ================================================= */}

                <section className="gx-visitor-movement">

                    <div className="gx-visitor-section-title">

                        <FaMapMarkerAlt />

                        <span>
                            Visit Movement
                        </span>

                    </div>


                    <div className="gx-visitor-timeline">


                        <div className="gx-visitor-timeline-item">

                            <div className="gx-timeline-icon success">

                                <FaSignInAlt />

                            </div>


                            <div>

                                <span>
                                    CHECK-IN
                                </span>

                                <strong>
                                    {formatTime(
                                        visitor.actual_check_in
                                    )}
                                </strong>

                            </div>

                        </div>


                        <div className="gx-visitor-timeline-line" />


                        <div className="gx-visitor-timeline-item">

                            <div className="gx-timeline-icon neutral">

                                <FaSignOutAlt />

                            </div>


                            <div>

                                <span>
                                    CHECK-OUT
                                </span>

                                <strong>
                                    {formatTime(
                                        visitor.actual_check_out
                                    )}
                                </strong>

                            </div>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    FOOTER STATUS
                ================================================= */}

                <div className="gx-visitor-drawer-footer">

                    <div>

                        <FaCheckCircle />

                        <span>
                            Visitor record verified
                        </span>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                    >
                        Close
                    </button>

                </div>

            </aside>

        </>

    );

}