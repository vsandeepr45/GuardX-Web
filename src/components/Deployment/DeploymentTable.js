// import React from "react";
// import {
//     FaEye,
//     FaEdit,
//     FaTrash,
//     FaToggleOn,
//     FaToggleOff,
//     FaHistory
// } from "react-icons/fa";



// function DeploymentTable({
//     deployments = [],
//     loading,
//     onView,
//     onEdit,
//     onStatus,
//     onDelete,
//     onHistory
// }) {

//     return (

//         <div className="gx-table-container">

//             <table className="gx-table">

//                 <thead>

//                     <tr>

//                         <th>Code</th>

//                         <th>Employee</th>

//                         <th>Client</th>

//                         <th>Project</th>

//                         <th>Site</th>

//                         <th>Position</th>

//                         <th>Shift</th>

//                         <th>Type</th>

//                         <th>Priority</th>

//                         <th>Status</th>

//                         <th>Actions</th>

//                     </tr>

//                 </thead>

//                 <tbody>

//                     {
//                         loading
//                             ?
//                             <tr>

//                                 <td colSpan="11">
//                                     Loading...
//                                 </td>

//                             </tr>
//                             :
//                             deployments?.length === 0
//                                 ?
//                                 <tr>

//                                     <td colSpan="11">
//                                         No Deployment Found
//                                     </td>

//                                 </tr>
//                                 :
//                                 deployments?.map(item => (

//                                     <tr key={item.id}>

//                                         <td>
//                                             {item.deployment_code}
//                                         </td>

//                                         <td>
//                                             {item.employee_name}
//                                         </td>

//                                         <td>
//                                             {item.client_name}
//                                         </td>

//                                         <td>
//                                             {item.project_name}
//                                         </td>

//                                         <td>
//                                             {item.site_name}
//                                         </td>

//                                         <td>
//                                             {item.duty_position}
//                                         </td>

//                                         <td>
//                                             {item.shift_name}
//                                         </td>

//                                         <td>
//                                             {item.deployment_type}
//                                         </td>

//                                         <td>
//                                             {item.priority}
//                                         </td>

//                                         <td>

//                                             {
//                                                 item.status
//                                                     ?
//                                                     <span className="gx-badge-active">
//                                                         Active
//                                                     </span>
//                                                     :
//                                                     <span className="gx-badge-inactive">
//                                                         Inactive
//                                                     </span>
//                                             }

//                                         </td>

//                                         <td className="dp-action-buttons">

//                                             <button
//                                                 className="dp-icon-btn dp-view-btn"
//                                                 onClick={() => onView(item)}
//                                                 title="View"
//                                             >
//                                                 <FaEye />
//                                             </button>

//                                             <button
//                                                 className="dp-icon-btn dp-edit-btn"
//                                                 onClick={() => onEdit(item)}
//                                                 title="Edit"
//                                             >
//                                                 <FaEdit />
//                                             </button>

//                                             <button
//                                                 className="dp-icon-btn dp-status-btn"
//                                                 onClick={() => onStatus(item)}
//                                                 title="Change Status"
//                                             >
//                                                 {item.status ? <FaToggleOn /> : <FaToggleOff />}
//                                             </button>

//                                             <button
//                                                 className="dp-icon-btn dp-history-btn"
//                                                 onClick={() => onHistory(item)}
//                                                 title="History"
//                                             >
//                                                 <FaHistory />
//                                             </button>

//                                             <button
//                                                 className="dp-icon-btn dp-delete-btn"
//                                                 onClick={() => onDelete(item)}
//                                                 title="Delete"
//                                             >
//                                                 <FaTrash />
//                                             </button>

//                                         </td>

//                                     </tr>

//                                 ))
//                     }

//                 </tbody>

//             </table>

//         </div>

//     );

// }

// export default DeploymentTable;


import React from "react";

import {
    FaEye,
    FaEdit,
    FaTrash,
    FaToggleOn,
    FaToggleOff,
    FaHistory
} from "react-icons/fa";



function DeploymentTable({
    deployments = [],
    loading,
    onView,
    onEdit,
    onStatus,
    onDelete,
    onHistory,
    isSecurityGuard = false
}) {

    return (

        <div className="gx-table-container">

            <table className="gx-table">

                <thead>

                    <tr>

                        <th>
                            Code
                        </th>

                        <th>
                            Employee
                        </th>


                        {isSecurityGuard ? (

                            <>

                                <th>
                                    Site
                                </th>

                                <th>
                                    Position
                                </th>

                                <th>
                                    Shift
                                </th>

                                <th>
                                    Type
                                </th>

                            </>

                        ) : (

                            <>

                                <th>
                                    Client
                                </th>

                                <th>
                                    Project
                                </th>

                                <th>
                                    Site
                                </th>

                                <th>
                                    Position
                                </th>

                                <th>
                                    Shift
                                </th>

                                <th>
                                    Type
                                </th>

                                <th>
                                    Priority
                                </th>

                            </>

                        )}


                        <th>
                            Status
                        </th>

                        <th>
                            Actions
                        </th>

                    </tr>

                </thead>


                <tbody>

                    {
                        loading

                            ?

                            (
                                <tr>

                                    <td
                                        colSpan={
                                            isSecurityGuard
                                                ? "8"
                                                : "11"
                                        }
                                    >
                                        Loading...
                                    </td>

                                </tr>
                            )

                            :

                            deployments?.length === 0

                                ?

                                (
                                    <tr>

                                        <td
                                            colSpan={
                                                isSecurityGuard
                                                    ? "8"
                                                    : "11"
                                            }
                                        >
                                            No Deployment Found
                                        </td>

                                    </tr>
                                )

                                :

                                deployments?.map(
                                    item => (

                                        <tr
                                            key={
                                                item.id
                                            }
                                        >

                                            <td>

                                                {
                                                    item.deployment_code ||
                                                    "-"
                                                }

                                            </td>


                                            <td>

                                                {
                                                    item.employee_name ||
                                                    "-"
                                                }

                                            </td>


                                            {isSecurityGuard ? (

                                                <>

                                                    <td>

                                                        {
                                                            item.site_name ||
                                                            "-"
                                                        }

                                                    </td>


                                                    <td>

                                                        {
                                                            item.duty_position ||
                                                            "-"
                                                        }

                                                    </td>


                                                    <td>

                                                        {
                                                            item.shift_name ||
                                                            "-"
                                                        }

                                                    </td>


                                                    <td>

                                                        {
                                                            item.deployment_type ||
                                                            "-"
                                                        }

                                                    </td>

                                                </>

                                            ) : (

                                                <>

                                                    <td>

                                                        {
                                                            item.client_name ||
                                                            "-"
                                                        }

                                                    </td>


                                                    <td>

                                                        {
                                                            item.project_name ||
                                                            "-"
                                                        }

                                                    </td>


                                                    <td>

                                                        {
                                                            item.site_name ||
                                                            "-"
                                                        }

                                                    </td>


                                                    <td>

                                                        {
                                                            item.duty_position ||
                                                            "-"
                                                        }

                                                    </td>


                                                    <td>

                                                        {
                                                            item.shift_name ||
                                                            "-"
                                                        }

                                                    </td>


                                                    <td>

                                                        {
                                                            item.deployment_type ||
                                                            "-"
                                                        }

                                                    </td>


                                                    <td>

                                                        {
                                                            item.priority ||
                                                            "-"
                                                        }

                                                    </td>

                                                </>

                                            )}


                                            <td>

                                                {
                                                    item.status === true ||
                                                    item.status === "Active" ||
                                                    item.deployment_status === "Active"

                                                    ?

                                                    (
                                                        <span
                                                            className="gx-badge-active"
                                                        >
                                                            Active
                                                        </span>
                                                    )

                                                    :

                                                    (
                                                        <span
                                                            className="gx-badge-inactive"
                                                        >
                                                            Inactive
                                                        </span>
                                                    )
                                                }

                                            </td>


                                            <td className="dp-action-buttons">

                                                {/* ==========================================
                                                    SECURITY GUARD
                                                    ONLY VIEW BUTTON
                                                    ========================================== */}

                                                {isSecurityGuard ? (

                                                    <button

                                                        type="button"

                                                        className="dp-icon-btn dp-view-btn"

                                                        onClick={() =>
                                                            onView(item)
                                                        }

                                                        title="View"

                                                    >

                                                        <FaEye />

                                                    </button>

                                                ) : (

                                                    /* ==========================================
                                                       ADMIN / OTHER ROLES
                                                       EXISTING ACTIONS
                                                       ========================================== */

                                                    <>

                                                        <button

                                                            className="dp-icon-btn dp-view-btn"

                                                            onClick={() =>
                                                                onView(item)
                                                            }

                                                            title="View"

                                                        >

                                                            <FaEye />

                                                        </button>


                                                        <button

                                                            className="dp-icon-btn dp-edit-btn"

                                                            onClick={() =>
                                                                onEdit(item)
                                                            }

                                                            title="Edit"

                                                        >

                                                            <FaEdit />

                                                        </button>


                                                        <button

                                                            className="dp-icon-btn dp-status-btn"

                                                            onClick={() =>
                                                                onStatus(item)
                                                            }

                                                            title="Change Status"

                                                        >

                                                            {
                                                                item.status

                                                                    ?

                                                                    <FaToggleOn />

                                                                    :

                                                                    <FaToggleOff />
                                                            }

                                                        </button>


                                                        <button

                                                            className="dp-icon-btn dp-history-btn"

                                                            onClick={() =>
                                                                onHistory(item)
                                                            }

                                                            title="History"

                                                        >

                                                            <FaHistory />

                                                        </button>


                                                        <button

                                                            className="dp-icon-btn dp-delete-btn"

                                                            onClick={() =>
                                                                onDelete(item)
                                                            }

                                                            title="Delete"

                                                        >

                                                            <FaTrash />

                                                        </button>

                                                    </>

                                                )}

                                            </td>

                                        </tr>

                                    )
                                )
                    }

                </tbody>

            </table>

        </div>

    );

}

export default DeploymentTable;