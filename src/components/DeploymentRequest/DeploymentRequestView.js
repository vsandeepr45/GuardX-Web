import React from "react";

function DeploymentRequestView({

    open,

    request,

    onClose

}) {

    if (!open || !request) {

        return null;

    }

    return (

        <div className="gx-modal">

            <div className="gx-view-modal">

                <div className="gx-view-header">

                    <h2>

                        Deployment Request Details

                    </h2>

                </div>

                <div className="gx-view-body">

                    <div className="gx-view-grid">

                        <div>

                            <strong>Company</strong>

                            <p>{request.company_name}</p>

                        </div>

                        <div>

                            <strong>Client</strong>

                            <p>{request.client_name}</p>

                        </div>

                        <div>

                            <strong>Project</strong>

                            <p>{request.project_name}</p>

                        </div>

                        <div>

                            <strong>Site</strong>

                            <p>{request.site_name}</p>

                        </div>

                        <div>

                            <strong>Shift</strong>

                            <p>{request.shift_name}</p>

                        </div>

                        <div>

                            <strong>Required Guards</strong>

                            <p>{request.requested_guards}</p>

                        </div>

                        <div>

                            <strong>Deployed Guards</strong>

                            <p>{request.deployed_guards}</p>

                        </div>

                        <div>

                            <strong>Priority</strong>

                            <p>{request.priority}</p>

                        </div>

                        <div>

                            <strong>Status</strong>

                            <p>{request.status}</p>

                        </div>

                        <div>

                            <strong>Requested By</strong>

                            <p>{request.requested_by_name || "-"}</p>

                        </div>

                        <div>

                            <strong>Requested Date</strong>

                            <p>

                                {request.requested_at
                                    ? new Date(request.requested_at).toLocaleString()
                                    : "-"}

                            </p>

                        </div>

                        <div
                            style={{
                                gridColumn: "1 / span 2"
                            }}
                        >

                            <strong>Remarks</strong>

                            <p>

                                {request.remarks || "-"}

                            </p>

                        </div>

                    </div>

                </div>

                <div className="gx-view-footer">

<button
    type="button"
    className="gx-cancel-btn"
    onClick={onClose}
>
    Close
</button>

                </div>

            </div>

        </div>

    );

}

export default DeploymentRequestView;