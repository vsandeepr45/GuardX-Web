import React from "react";

function DeploymentRequestDeleteDialog({

    open,

    request,

    close,

    confirm

}) {

    if (!open || !request) {

        return null;

    }

    return (

        <div className="gx-modal">

            <div className="gx-delete-modal">

                <div className="gx-delete-header">

                    <h2>Delete Deployment Request</h2>

                </div>

                <div className="gx-delete-body">

                    <p>

                        Are you sure you want to delete this deployment request?

                    </p>

                    <table className="gx-delete-table">

                        <tbody>

                            <tr>

                                <td><strong>Company</strong></td>

                                <td>{request.company_name}</td>

                            </tr>

                            <tr>

                                <td><strong>Client</strong></td>

                                <td>{request.client_name}</td>

                            </tr>

                            <tr>

                                <td><strong>Project</strong></td>

                                <td>{request.project_name}</td>

                            </tr>

                            <tr>

                                <td><strong>Site</strong></td>

                                <td>{request.site_name}</td>

                            </tr>

                            <tr>

                                <td><strong>Requested Guards</strong></td>

                                <td>{request.requested_guards}</td>

                            </tr>

                        </tbody>

                    </table>

                </div>

                <div className="gx-delete-footer">

                    <button
                        className="gx-delete-btn"
                        onClick={() => confirm(request.id)}
                    >
                        Delete
                    </button>

                    <button
                        className="gx-cancel-btn"
                        onClick={close}
                    >
                        Cancel
                    </button>

                </div>

            </div>

        </div>

    );

}

export default DeploymentRequestDeleteDialog;