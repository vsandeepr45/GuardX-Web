import React from "react";
import "../../styles/DeploymentRequestSitesModal.css";

function DeploymentRequestSitesModal({
    open,
    request,
    sites,
    onClose,
    onAssign
}) {

    if (!open || !request) {
        return null;
    }


    return (

<div className="drs-modal-overlay">

<div className="drs-modal">

                {/* ==================================================
                    HEADER
                ================================================== */}

<div className="drs-modal-header">

    <div className="drs-header-left">

        <div className="drs-header-icon">
            👥
        </div>

        <div>

            <h2 className="drs-header-title">
                Deployment Request DR{request.request_id}
            </h2>

            <div className="drs-header-subtitle">
                Select a site to assign security guards
            </div>

        </div>

    </div>

    <button
        type="button"
        className="drs-close-btn"
        onClick={onClose}
    >
        ✕
    </button>

</div>


                {/* ==================================================
                    REQUEST INFORMATION
                ================================================== */}

<div className="drs-request-info">

    <div className="drs-info-grid">

        <div className="drs-info-card">

            <span className="drs-info-label">
                Company
            </span>

            <span className="drs-info-value">
                {request.company_name || "-"}
            </span>

        </div>


        <div className="drs-info-card">

            <span className="drs-info-label">
                Client
            </span>

            <span className="drs-info-value">
                {request.client_name || "-"}
            </span>

        </div>


        <div className="drs-info-card">

            <span className="drs-info-label">
                Project
            </span>

            <span className="drs-info-value">
                {request.project_name || "-"}
            </span>

        </div>


        <div className="drs-info-card">

            <span className="drs-info-label">
                Request Type
            </span>

            <span className="drs-info-value">
                {request.request_type || "-"}
            </span>

        </div>

    </div>

</div>


                {/* ==================================================
                    SITE LIST
                ================================================== */}

<div className="drs-modal-body">

<div className="drs-section-header">

         <h3 className="drs-section-title">
            Requested Sites
        </h3>


        <span className="drs-site-count">
            {sites.length}
            {" "}
            {sites.length === 1 ? "Site" : "Sites"}
        </span>

                    </div>


<div className="drs-table-card">

<table className="drs-table">

                            <thead>

                                <tr>

                                    <th>
                                        Site
                                    </th>

                                    <th>
                                        Shift
                                    </th>

                                    <th>
                                        Required
                                    </th>

                                    <th>
                                        Assigned
                                    </th>

                                    <th>
                                        Remaining
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {sites.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="7"
                                            style={{
                                                textAlign:
                                                    "center",
                                                padding:
                                                    "25px"
                                            }}
                                        >
                                            No Sites Found
                                        </td>

                                    </tr>

                                ) : (

                                    sites.map((site) => {

                                        const required =
                                            Number(
                                                site.required_guards ||
                                                0
                                            );


                                        const assigned =
                                            Number(
                                                site.assigned_guards ||
                                                0
                                            );


                                        const remaining =
                                            Math.max(
                                                Number(
                                                    site.remaining_guards ??
                                                    (
                                                        required -
                                                        assigned
                                                    )
                                                ),
                                                0
                                            );


                                        const completed =
                                            remaining <= 0;


                                        const partiallyAssigned =
                                            assigned > 0 &&
                                            remaining > 0;


                                        return (

                                            <tr
                                                key={
                                                    `${site.request_id}-${site.site_id}`
                                                }
                                            >

                                                {/* SITE */}

 <td>

    <div className="drs-site-name">

        <span className="drs-site-icon">
            📍
        </span>

        <strong>
            {site.site_name || "-"}
        </strong>

    </div>

</td>


                                                {/* SHIFT */}
<td>

    <span className="drs-shift">

        <span className="drs-shift-dot"></span>

        {site.shift_name || "-"}

    </span>

</td>


                                                {/* REQUIRED */}

<td>

    <span className="drs-number drs-required">
        {required}
    </span>

</td>


                                                {/* ASSIGNED */}

<td>

    <span className="drs-number drs-assigned">
        {assigned}
    </span>

</td>


                                                {/* REMAINING */}

<td>

    <span
        className={
            `drs-number drs-remaining ${
                completed ? "completed" : ""
            }`
        }
    >
        {remaining}
    </span>

</td>


                                                {/* STATUS */}

<td>

    {completed ? (

        <span className="drs-status drs-status-completed">

            <span className="drs-status-dot"></span>

            Completed

        </span>

    ) : partiallyAssigned ? (

        <span className="drs-status drs-status-partial">

            <span className="drs-status-dot"></span>

            Partially Assigned

        </span>

    ) : (

        <span className="drs-status drs-status-pending">

            <span className="drs-status-dot"></span>

            Pending

        </span>

    )}

</td>


                                                {/* ACTION */}

                                                <td>

                                                    {completed ? (

<button
    type="button"
    className="drs-completed-btn"
    disabled
>
    Completed
</button>

                                                    ) : (

                                                        <button
                                                            type="button"
                                                            className="drs-assign-btn"
                                                            onClick={() =>
                                                                onAssign(
                                                                    {
                                                                        ...site,

                                                                        deployment_request_id:
                                                                            site.request_id,

                                                                        site_id:
                                                                            site.site_id,

                                                                        duty_shift_id:
                                                                            site.shift_id,

                                                                        required_guards:
                                                                            required,

                                                                        assigned_guards:
                                                                            assigned,

                                                                        remaining_guards:
                                                                            remaining
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            Assign Guards
                                                        </button>

                                                    )}

                                                </td>

                                            </tr>

                                        );

                                    })

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>


                {/* ==================================================
                    FOOTER
                ================================================== */}
<div className="drs-modal-footer">

                    <button
                        type="button"
                        className="drs-close-footer-btn"
                        onClick={onClose}
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>

    );
}

export default DeploymentRequestSitesModal;