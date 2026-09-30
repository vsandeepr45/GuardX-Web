import React from "react";

function DeploymentPendingRequestTable({
    requests,
    onViewSites
}) {

    if (!requests || requests.length === 0) {

        return (
            <div className="gx-table-container">

                <h3
                    style={{
                        marginBottom: "15px"
                    }}
                >
                    Pending Deployment Requests
                </h3>

                <div
                    style={{
                        padding: "25px",
                        textAlign: "center"
                    }}
                >
                    No Pending Deployment Requests
                </div>

            </div>
        );
    }


    // ==========================================================
    // GROUP SITE ROWS BY REQUEST
    // ==========================================================

    const groupedRequests = {};


    requests.forEach((item) => {

        const requestId =
            item.request_id;


        if (!groupedRequests[requestId]) {

            groupedRequests[requestId] = {

                request_id:
                    requestId,

                company_id:
                    item.company_id,

                company_name:
                    item.company_name,

                client_id:
                    item.client_id,

                client_name:
                    item.client_name,

                project_id:
                    item.project_id,

                project_name:
                    item.project_name,

                priority:
                    item.priority,

                status:
                    item.status,

                request_type:
                    item.request_type,

                required_from:
                    item.required_from,

                required_to:
                    item.required_to,

                required_position:
                    item.required_position,

                sites: []

            };

        }


        groupedRequests[
            requestId
        ].sites.push(item);

    });


    const groupedData =
        Object.values(groupedRequests);


    return (

        <div className="gx-table-container">

            <h3
                style={{
                    marginBottom: "15px"
                }}
            >
                Pending Deployment Requests
            </h3>


            <table className="gx-table">

                <thead>

                    <tr>

                        <th>
                            Request
                        </th>

                        <th>
                            Company
                        </th>

                        <th>
                            Client
                        </th>

                        <th>
                            Project
                        </th>

                        <th>
                            Sites
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

                    {groupedData.map(
                        (request) => {

                            const totalRequired =
                                request.sites.reduce(
                                    (
                                        total,
                                        site
                                    ) =>
                                        total +
                                        Number(
                                            site.required_guards ||
                                            0
                                        ),
                                    0
                                );


                            const totalAssigned =
                                request.sites.reduce(
                                    (
                                        total,
                                        site
                                    ) =>
                                        total +
                                        Number(
                                            site.assigned_guards ||
                                            0
                                        ),
                                    0
                                );


                            const totalRemaining =
                                Math.max(
                                    totalRequired -
                                    totalAssigned,
                                    0
                                );


                            const completed =
                                totalRemaining === 0;


                            const partiallyAssigned =
                                totalAssigned > 0 &&
                                totalRemaining > 0;


                            return (

                                <tr
                                    key={
                                        request.request_id
                                    }
                                >

                                    {/* REQUEST */}

                                    <td>

                                        <strong>
                                            DR{
                                                request.request_id
                                            }
                                        </strong>

                                    </td>


                                    {/* COMPANY */}

                                    <td>
                                        {
                                            request.company_name ||
                                            "-"
                                        }
                                    </td>


                                    {/* CLIENT */}

                                    <td>
                                        {
                                            request.client_name ||
                                            "-"
                                        }
                                    </td>


                                    {/* PROJECT */}

                                    <td>

                                        <strong>
                                            {
                                                request.project_name ||
                                                "-"
                                            }
                                        </strong>

                                    </td>


                                    {/* SITES */}

                                    <td>

                                        <span
                                            style={{
                                                display:
                                                    "inline-flex",
                                                alignItems:
                                                    "center",
                                                justifyContent:
                                                    "center",
                                                minWidth:
                                                    "32px",
                                                padding:
                                                    "5px 10px",
                                                borderRadius:
                                                    "15px",
                                                background:
                                                    "#e8f1ff",
                                                color:
                                                    "#2563eb",
                                                fontWeight:
                                                    "600"
                                            }}
                                        >

                                            {
                                                request.sites.length
                                            }

                                            {" "}

                                            {
                                                request.sites.length ===
                                                1
                                                    ? "Site"
                                                    : "Sites"
                                            }

                                        </span>

                                    </td>


                                    {/* REQUIRED */}

                                    <td>

                                        <strong>
                                            {
                                                totalRequired
                                            }
                                        </strong>

                                    </td>


                                    {/* ASSIGNED */}

                                    <td>
                                        {
                                            totalAssigned
                                        }
                                    </td>


                                    {/* REMAINING */}

                                    <td>

                                        <strong>
                                            {
                                                totalRemaining
                                            }
                                        </strong>

                                    </td>


                                    {/* STATUS */}

                                    <td>

                                        {completed ? (

                                            <span
                                                className="gx-status-active"
                                            >
                                                Completed
                                            </span>

                                        ) : partiallyAssigned ? (

                                            <span
                                                className="gx-status-pending"
                                            >
                                                Partially Assigned
                                            </span>

                                        ) : (

                                            <span
                                                className="gx-status-inactive"
                                            >
                                                Pending
                                            </span>

                                        )}

                                    </td>


                                    {/* ACTION */}

                                    <td>

                                        <button
                                            type="button"
                                            className="gx-edit-btn"
                                            onClick={() =>
                                                onViewSites(
                                                    request
                                                )
                                            }
                                        >
                                            View Sites
                                        </button>

                                    </td>

                                </tr>

                            );

                        }
                    )}

                </tbody>

            </table>

        </div>

    );
}

export default DeploymentPendingRequestTable;