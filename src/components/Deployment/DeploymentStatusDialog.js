import React from "react";
import "../../styles/DeploymentForm.css";

function DeploymentStatusDialog({
    open,
    deployment,
    close,
    confirm
}) {

    if (!open || !deployment) {
        return null;
    }

    return (

        <div className="ds-modal">

            <div className="ds-dialog">

                <div className="ds-header">

                    <h2>
                        Change Deployment Status
                    </h2>

                </div>

                <div className="ds-body">

                    <p>
                        Are you sure you want to
                        {
                            deployment.status
                                ? " deactivate "
                                : " activate "
                        }
                        this deployment?
                    </p>

                    <div className="ds-row">
                        <strong>Deployment Code :</strong>
                        <span>{deployment.deployment_code}</span>
                    </div>

                    <div className="ds-row">
                        <strong>Employee :</strong>
                        <span>{deployment.employee_name}</span>
                    </div>

                    <div className="ds-row">
                        <strong>Client :</strong>
                        <span>{deployment.client_name}</span>
                    </div>

                    <div className="ds-row">
                        <strong>Project :</strong>
                        <span>{deployment.project_name}</span>
                    </div>

                    <div className="ds-row">
                        <strong>Site :</strong>
                        <span>{deployment.site_name}</span>
                    </div>

                    <div className="ds-row">
                        <strong>Shift :</strong>
                        <span>{deployment.shift_name}</span>
                    </div>

                    <div className="ds-row">
                        <strong>Position :</strong>
                        <span>{deployment.duty_position}</span>
                    </div>

                    <div className="ds-row">
                        <strong>Current Status :</strong>
                        <span>
                            {
                                deployment.status
                                    ? "Active"
                                    : "Inactive"
                            }
                        </span>
                    </div>

                </div>

                <div className="ds-footer">

                    <button
                        className="ds-btn-cancel"
                        onClick={close}
                    >
                        Cancel
                    </button>

                    <button
                        className="ds-btn-confirm"
                        onClick={() =>
                            confirm(
                                deployment.id,
                                !deployment.status
                            )
                        }
                    >
                        Confirm
                    </button>

                </div>

            </div>

        </div>

    );

}

export default DeploymentStatusDialog;