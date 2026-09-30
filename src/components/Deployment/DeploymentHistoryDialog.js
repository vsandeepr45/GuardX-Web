import React from "react";

function DeploymentHistoryDialog({
    open,
    history = [],
    deployment,
    close
}) {

    if (!open) return null;

    return (

        <div className="gx-modal">

            <div className="gx-view-modal">

                <div className="gx-modal-header">

                    <h2>

                        Deployment History

                    </h2>

                </div>

                <div className="gx-view-body">

                    <div
                        className="gx-view-row"
                        style={{
                            marginBottom:20
                        }}
                    >

                        <strong>

                            Deployment :

                        </strong>

                        <span>

                            {deployment?.deployment_code}

                        </span>

                    </div>

                    <table className="gx-table">

                        <thead>

                            <tr>

                                <th>Date</th>

                                <th>Action</th>

                                <th>Status</th>

                                <th>Employee</th>

                                <th>Site</th>

                                <th>Shift</th>

                                <th>Remarks</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                history.length===0 ?

                                <tr>

                                    <td colSpan="7">

                                        No History

                                    </td>

                                </tr>

                                :

                                history.map(item=>(

                                    <tr key={item.id}>

                                        <td>

                                            {item.changed_at}

                                        </td>

                                        <td>

                                            {item.action}

                                        </td>

                                        <td>

                                            {item.deployment_status}

                                        </td>

                                        <td>

                                            {item.employee_name}

                                        </td>

                                        <td>

                                            {item.site_name}

                                        </td>

                                        <td>

                                            {item.shift_name}

                                        </td>

                                        <td>

                                            {item.remarks}

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

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

export default DeploymentHistoryDialog;