import React from "react";

function DeploymentView({
    open,
    deployment,
    close
}) {

    if (!open || !deployment) {
        return null;
    }

    return (

        <div className="gx-modal">

            <div className="gx-view-modal">

                <div className="gx-modal-header">

                    <h2>
                        Deployment Details
                    </h2>

                </div>

                <div className="gx-view-body">

                    <div className="gx-view-row">
                        <strong>Deployment Code :</strong>
                        <span>{deployment.deployment_code}</span>
                    </div>

                    <div className="gx-view-row">
                        <strong>Employee :</strong>
                        <span>{deployment.employee_name}</span>
                    </div>

                    <div className="gx-view-row">
                        <strong>Company :</strong>
                        <span>{deployment.company_name}</span>
                    </div>

                    <div className="gx-view-row">
                        <strong>Client :</strong>
                        <span>{deployment.client_name}</span>
                    </div>

                    <div className="gx-view-row">
                        <strong>Project :</strong>
                        <span>{deployment.project_name}</span>
                    </div>

                    <div className="gx-view-row">
                        <strong>Site :</strong>
                        <span>{deployment.site_name}</span>
                    </div>

                    <div className="gx-view-row">
                        <strong>Supervisor :</strong>
                        <span>{deployment.supervisor_name}</span>
                    </div>

                    <div className="gx-view-row">
                        <strong>Shift :</strong>
                        <span>{deployment.shift_name}</span>
                    </div>

                    <div className="gx-view-row">
                        <strong>Duty Position :</strong>
                        <span>{deployment.duty_position}</span>
                    </div>

                    <div className="gx-view-row">
                        <strong>Deployment Type :</strong>
                        <span>{deployment.deployment_type}</span>
                    </div>

                    <div className="gx-view-row">
                        <strong>Priority :</strong>
                        <span>{deployment.priority}</span>
                    </div>

                    <div className="gx-view-row">
                        <strong>Weekly Off :</strong>
                        <span>{deployment.weekly_off_day}</span>
                    </div>

                    <div className="gx-view-row">
                        <strong>Rotation Pattern :</strong>
                        <span>{deployment.rotation_pattern}</span>
                    </div>

                    <div className="gx-view-row">
                        <strong>From Date :</strong>
                        <span>{deployment.from_date}</span>
                    </div>

                    <div className="gx-view-row">
                        <strong>To Date :</strong>
                        <span>{deployment.to_date || "-"}</span>
                    </div>

                    <div className="gx-view-row">
                        <strong>Deployment Status :</strong>
                        <span>{deployment.deployment_status}</span>
                    </div>

                    <div className="gx-view-row">
                        <strong>Status :</strong>
                        <span>
                            {
                                deployment.status
                                ?
                                "Active"
                                :
                                "Inactive"
                            }
                        </span>
                    </div>

                    <div className="gx-view-row">
                        <strong>Remarks :</strong>
                        <span>{deployment.remarks}</span>
                    </div>

                </div>

                <div className="gx-modal-footer">

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

export default DeploymentView;