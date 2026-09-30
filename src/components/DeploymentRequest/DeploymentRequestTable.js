import React from "react";

function DeploymentRequestTable({

    requests,

    onView,

    onEdit,

    // onStatus,

    onDelete,
    onAssign

}) {

    return (

        <div className="gx-table-container">

            <table className="gx-table">

                <thead>

                    <tr>

                        <th>S.No</th>

                        <th>Company</th>

                        <th>Client</th>

                        <th>Project</th>

                        <th>Site</th>

                        <th>Shift</th>
                        <th>Request Type</th>

                        <th>Required Guards</th>

                        <th>Deployed Guards</th>

                        <th>Priority</th>

                        <th>Status</th>

                        <th>Requested Date</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {requests.length === 0 ? (

                        <tr>

                            <td
                                colSpan="13"
                                style={{ textAlign: "center" }}
                            >

                                No Deployment Requests Found

                            </td>

                        </tr>

                    ) : (

                        requests.map((item, index) => (

                            <tr key={item.id}>

                                <td>{index + 1}</td>

                                <td>{item.company_name}</td>

                                <td>{item.client_name}</td>

                                <td>{item.project_name}</td>

                                <td
                                    style={{
                                        maxWidth: "250px",
                                        whiteSpace: "normal"
                                    }}
                                >

                                    {item.site_names || "-"}

                                </td>

                                <td>{item.shift_name}</td>

                                <td>{item.request_type}</td>

                                <td>

    <span
        className="gx-status-active"
    >

        {item.requested_guards}

    </span>

</td>

                                <td>{item.deployed_guards}</td>

                                <td>{item.priority}</td>

                                <td>

                                    <span
                                        className={
                                            item.status === "Completed"
                                                ? "gx-status-active"
                                                : item.status === "Approved"
                                                ? "gx-status-pending"
                                                : "gx-status-inactive"
                                        }
                                    >

                                        {item.status}

                                    </span>

                                </td>

                                <td>

                                    {item.requested_at
                                        ? new Date(
                                              item.requested_at
                                          ).toLocaleDateString()
                                        : "-"}

                                </td>

                                <td>

                                    <button
                                        className="gx-view-btn"
                                        onClick={() => onView(item)}
                                    >

                                        View

                                    </button>

                                    <button
                                        className="gx-edit-btn"
                                        onClick={() => onEdit(item)}
                                    >

                                        Edit

                                    </button>
{/* 
                                    {(item.status === "Pending" ||
    item.status === "Partially Completed") && (

    <button
        className="gx-save-btn"
        onClick={() => onAssign(item)}
    >
        Assign Guards
    </button>

)} */}

                                    {/* <button
                                        className="gx-status-btn"
                                        onClick={() => onStatus(item)}
                                    >

                                        Status

                                    </button> */}

                                    <button
                                        className="gx-delete-btn"
                                        onClick={() => onDelete(item)}
                                    >

                                        Delete

                                    </button>

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>

    );

}

export default DeploymentRequestTable;