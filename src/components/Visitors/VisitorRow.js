import React from "react";

function formatTime(value) {

    if (!value) {
        return "--";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}


function getStatusClass(status) {

    switch (status) {

        case "Inside":
            return "inside";

        case "Approved":
            return "approved";

        case "Completed":
            return "completed";

        case "Cancelled":
            return "cancelled";

        case "Expired":
            return "expired";

        case "Rejected":
            return "cancelled";

        default:
            return "pending";
    }

}


export default function VisitorRow({

    visitor,

    onView,

    onApprove,

    onReject,

    onCheckIn,

    onCheckOut,

    canApprove = false,

    canCheckIn = false,

    canCheckOut = false

}) {

    const isPending =
        visitor.approval_status === "Pending";

    const isApproved =
        visitor.approval_status === "Approved";

    const isInside =
        visitor.visit_status === "Inside";

    const isCompleted =
        visitor.visit_status === "Completed";


    return (

        <div className="gx-visitor-row">

            {/* =====================================================
                VISITOR
            ===================================================== */}

            <div className="gx-visitor-person">

                <div className="gx-visitor-avatar">

                    {visitor.photo_path ? (

                        <img
                            src={visitor.photo_path}
                            alt={visitor.visitor_name}
                        />

                    ) : (

                        <span>
                            {visitor.visitor_name
                                ?.charAt(0)
                                ?.toUpperCase() || "V"}
                        </span>

                    )}

                </div>


                <div>

                    <div className="gx-visitor-name">
                        {visitor.visitor_name}
                    </div>

                    <div className="gx-visitor-code">
                        {visitor.visitor_code}
                    </div>

                </div>

            </div>


            {/* =====================================================
                COMPANY / PURPOSE
            ===================================================== */}

            <div className="gx-visitor-company">

                <strong>
                    {visitor.visitor_company || "--"}
                </strong>

                <span>
                    {visitor.purpose || "General Visit"}
                </span>

            </div>


            {/* =====================================================
                SITE / HOST
            ===================================================== */}

            <div className="gx-visitor-site">

                <strong>
                    {visitor.site_name || "--"}
                </strong>

                <span>
                    Host: {visitor.host_name || "--"}
                </span>

            </div>


            {/* =====================================================
                EXPECTED TIME
            ===================================================== */}

            <div className="gx-visitor-time">

                <strong>
                    {formatTime(
                        visitor.expected_arrival_time
                    )}
                </strong>

                <span>
                    {visitor.expected_departure_time
                        ? formatTime(
                            visitor.expected_departure_time
                        )
                        : "--"}
                </span>

            </div>


            {/* =====================================================
                STATUS
            ===================================================== */}

            <div>

                <span
                    className={`gx-visitor-status ${getStatusClass(
                        visitor.visit_status
                    )}`}
                >

                    {visitor.visit_status ||
                        visitor.approval_status ||
                        "Pending"}

                </span>

            </div>


            {/* =====================================================
                ACTIONS
            ===================================================== */}

{/* =====================================================
    ACTIONS
===================================================== */}

<div className="gx-visitor-actions">

    {/* VIEW */}

    <button
        type="button"
        className="gx-visitor-view-btn"
        onClick={() => onView(visitor)}
    >
        View
    </button>


    {/* =================================================
        SUPERVISOR APPROVAL
    ================================================= */}

{/* =====================================================
    APPROVAL
===================================================== */}

{canApprove &&
    visitor.approval_status === "Pending" && (

    <>

        <button
            type="button"
            className="gx-visitor-approve-btn"
            onClick={() =>
                onApprove(visitor)
            }
        >
            Approve
        </button>


        <button
            type="button"
            className="gx-visitor-reject-btn"
            onClick={() =>
                onReject(visitor)
            }
        >
            Reject
        </button>

    </>

)}


    {/* =================================================
        GUARD CHECK-IN
    ================================================= */}

{canCheckIn &&
    visitor.approval_status === "Approved" &&
    visitor.visit_status === "Approved" && (

    <button
        type="button"
        className="gx-visitor-checkin-btn"
        onClick={() =>
            onCheckIn(visitor)
        }
    >
        Check In
    </button>

)}


    {/* =================================================
        GUARD CHECK-OUT
    ================================================= */}

{canCheckOut &&
    visitor.visit_status === "Inside" && (

    <button
        type="button"
        className="gx-visitor-checkout-btn"
        onClick={() =>
            onCheckOut(visitor)
        }
    >
        Check Out
    </button>

)}

</div>
        </div>

    );

}