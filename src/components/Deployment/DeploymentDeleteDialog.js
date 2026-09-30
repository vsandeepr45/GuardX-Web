import React from "react";
import { FaTrashAlt } from "react-icons/fa";

function DeploymentDeleteDialog({
    open,
    deployment,
    close,
    confirm
}) {

    if (!open || !deployment) {
        return null;
    }

    return (

        <div className="dp-delete-overlay">

            <div className="dp-delete-box">

                <div className="dp-delete-icon">
                    <FaTrashAlt />
                </div>

                <h2 className="dp-delete-title">
                    Delete Deployment
                </h2>

                <p className="dp-delete-text">

                    Are you sure you want to delete deployment

                    <br /><br />

                    <strong>
                        {deployment.deployment_code}
                    </strong>

                    <br />

                    Employee :

                    <strong>
                        {" "}
                        {deployment.employee_name}
                    </strong>

                </p>

                <p className="dp-delete-warning">

                    This action cannot be undone.

                </p>

                <div className="dp-delete-footer">

                    <button
                        className="dp-btn-cancel"
                        onClick={close}
                    >
                        Cancel
                    </button>

                    <button
                        className="dp-btn-delete"
                        onClick={() => confirm(deployment.id)}
                    >
                        <FaTrashAlt style={{ marginRight: "8px" }} />
                        Delete
                    </button>

                </div>

            </div>

        </div>

    );

}

export default DeploymentDeleteDialog;