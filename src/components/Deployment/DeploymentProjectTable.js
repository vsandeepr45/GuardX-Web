import React, { useMemo, useState } from "react";

import {
    FaEye,
    FaEdit,
    FaTrash,
    FaToggleOn,
    FaToggleOff,
    FaHistory,
    FaTimes
} from "react-icons/fa";

import "../../styles/DeploymentProjectTable.css";


function DeploymentProjectTable({
    deployments = [],
    loading,
    onView,
    onEdit,
    onStatus,
    onDelete,
    onHistory
}) {

    const [selectedProject, setSelectedProject] = useState(null);


    // ==========================================================
    // GROUP DEPLOYMENTS BY REQUEST + PROJECT
    // ==========================================================

    const projects = useMemo(() => {

        const grouped = {};

        deployments.forEach((item) => {

            const key =
                `${item.deployment_request_id || "NO_REQUEST"}-${item.project_id || item.project_name || "NO_PROJECT"}`;

            if (!grouped[key]) {

                grouped[key] = {

                    key,

                    deployment_request_id:
                        item.deployment_request_id || null,

                    company_id:
                        item.company_id || null,

                    client_id:
                        item.client_id || null,

                    project_id:
                        item.project_id || null,

                    company_name:
                        item.company_name || "-",

                    client_name:
                        item.client_name || "-",

                    project_name:
                        item.project_name || "-",

                    priority:
                        item.priority,

                    deployments: []

                };

            }

            grouped[key].deployments.push(item);

        });

        return Object.values(grouped);

    }, [deployments]);


    // ==========================================================
    // SITE INFORMATION
    // ==========================================================

    const getSiteInformation = (items) => {

        const siteMap = {};

        items.forEach((item) => {

            const key =
                item.site_id ??
                item.site_name ??
                "unknown";


            if (!siteMap[key]) {

                siteMap[key] = {

                    site_id: item.site_id,

                    site_name:
                        item.site_name || "-",

                    shift_name:
                        item.shift_name || "-",

                    employees: []

                };

            }

            siteMap[key].employees.push(item);

        });


        return Object.values(siteMap);

    };


    // ==========================================================
    // SITE COUNT
    // ==========================================================

    const getSiteCount = (items) => {

        return getSiteInformation(items).length;

    };


    // ==========================================================
    // EMPLOYEE COUNT
    // ==========================================================

    const getEmployeeCount = (items) => {

        const employees = new Set();

        items.forEach((item) => {

            if (
                item.employee_id !== null &&
                item.employee_id !== undefined
            ) {

                employees.add(item.employee_id);

            }
            else if (item.id) {

                employees.add(item.id);

            }

        });

        return employees.size;

    };


    // ==========================================================
    // ACTIVE EMPLOYEE COUNT
    // ==========================================================

    const getActiveEmployeeCount = (items) => {

        return items.filter((item) => {

            return (
                item.status === true ||
                item.status === "Active"
            );

        }).length;

    };


    // ==========================================================
    // CLOSE POPUP
    // ==========================================================

    const closeSitePopup = () => {

        setSelectedProject(null);

    };


    // ==========================================================
    // LOADING
    // ==========================================================

    if (loading) {

        return (

            <div className="gx-table-container">

                <table className="gx-table dp-project-main-table">

                    <thead>

                        <tr>

                            <th>Project</th>
                            <th>Client</th>
                            <th>Sites</th>
                            <th>Deployed Employees</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        <tr>

                            <td
                                colSpan="7"
                                className="dp-empty-cell"
                            >
                                Loading...
                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        );

    }


    // ==========================================================
    // NO DATA
    // ==========================================================

    if (!deployments || deployments.length === 0) {

        return (

            <div className="gx-table-container">

                <table className="gx-table dp-project-main-table">

                    <thead>

                        <tr>

                            <th>Project</th>
                            <th>Client</th>
                            <th>Sites</th>
                            <th>Deployed Employees</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        <tr>

                            <td
                                colSpan="7"
                                className="dp-empty-cell"
                            >
                                No Deployment Found
                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        );

    }


    // ==========================================================
    // MAIN TABLE
    // ==========================================================

    return (

        <>

            <div className="gx-table-container">

                <table className="gx-table dp-project-main-table">

                    <thead>

                        <tr>

                            <th>Project</th>

                            <th>Client</th>

                            <th>Sites</th>

                            <th>Deployed Employees</th>

                            <th>Priority</th>

                            <th>Status</th>

                            <th>Action</th>

                        </tr>

                    </thead>


                    <tbody>

                        {projects.map((project) => {

                            const siteCount =
                                getSiteCount(
                                    project.deployments
                                );


                            const employeeCount =
                                getEmployeeCount(
                                    project.deployments
                                );


                            const activeEmployeeCount =
                                getActiveEmployeeCount(
                                    project.deployments
                                );


                            return (

                                <tr
                                    key={project.key}
                                    className="dp-project-row"
                                >

                                    {/* PROJECT */}

                                    <td>

                                        <strong className="dp-project-name">

                                            {project.project_name}

                                        </strong>

                                    </td>


                                    {/* CLIENT */}

                                    <td>

                                        <span className="dp-client-name">

                                            {project.client_name}

                                        </span>

                                    </td>


                                    {/* SITES */}

                                    <td>

                                        <span className="dp-count-badge">

                                            {siteCount}

                                            {" "}

                                            {
                                                siteCount === 1
                                                    ? "Site"
                                                    : "Sites"
                                            }

                                        </span>

                                    </td>


                                    {/* EMPLOYEES */}

                                    <td>

                                        <span className="dp-count-badge">

                                            {employeeCount}

                                        </span>

                                    </td>


                                    {/* PRIORITY */}

                                    <td>

                                        <span className="dp-priority">

                                            {
                                                project.priority ??
                                                "-"
                                            }

                                        </span>

                                    </td>


                                    {/* STATUS */}

                                    <td>

                                        {activeEmployeeCount > 0 ? (

                                            <span className="gx-badge-active">

                                                Active

                                            </span>

                                        ) : (

                                            <span className="gx-badge-inactive">

                                                Inactive

                                            </span>

                                        )}

                                    </td>


                                    {/* VIEW SITES */}

                                    <td>

                                        <button
                                            type="button"
                                            className="dp-view-project-btn"
                                            onClick={() =>
                                                setSelectedProject(
                                                    project
                                                )
                                            }
                                        >

                                            View Sites

                                        </button>

                                    </td>

                                </tr>

                            );

                        })}

                    </tbody>

                </table>

            </div>


            {/* ==================================================
                SITE POPUP
            ================================================== */}

            {selectedProject && (

                <div
                    className="dp-site-modal-overlay"
                    onClick={closeSitePopup}
                >

                    <div
                        className="dp-site-modal"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        {/* HEADER */}

                        <div className="dp-site-modal-header">

                            <div>

                                <h2>

                                    Deployment Sites

                                </h2>

                                <p>

                                    {
                                        selectedProject.project_name
                                    }

                                </p>

                            </div>


                            <button
                                type="button"
                                className="dp-site-modal-close"
                                onClick={closeSitePopup}
                            >

                                <FaTimes />

                            </button>

                        </div>


                        {/* PROJECT INFO */}

                        <div className="dp-site-modal-info">

                            <div>

                                <span>
                                    Company
                                </span>

                                <strong>
                                    {
                                        selectedProject.company_name
                                    }
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Client
                                </span>

                                <strong>
                                    {
                                        selectedProject.client_name
                                    }
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Project
                                </span>

                                <strong>
                                    {
                                        selectedProject.project_name
                                    }
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Total Employees
                                </span>

                                <strong>
                                    {
                                        getActiveEmployeeCount(
                                            selectedProject.deployments
                                        )
                                    }
                                </strong>

                            </div>

                        </div>


                        {/* SITE TABLE */}

                        <div className="dp-site-table-wrapper">

                            <table className="dp-site-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Site
                                        </th>

                                        <th>
                                            Shift
                                        </th>

                                        <th>
                                            Deployed
                                        </th>

                                        <th>
                                            Employees
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {
                                        getSiteInformation(
                                            selectedProject.deployments
                                        ).map(
                                            (site) => {

                                                const deployed =
                                                    site.employees.filter(
                                                        (employee) =>
                                                            employee.status === true ||
                                                            employee.status === "Active"
                                                    ).length;


                                                return (

                                                    <tr
                                                        key={
                                                            site.site_id ||
                                                            site.site_name
                                                        }
                                                    >

                                                        {/* SITE */}

                                                        <td>

                                                            <strong>

                                                                {
                                                                    site.site_name
                                                                }

                                                            </strong>

                                                        </td>


                                                        {/* SHIFT */}

                                                        <td>

                                                            {
                                                                site.shift_name
                                                            }

                                                        </td>


                                                        {/* DEPLOYED */}

                                                        <td>

                                                            <span className="dp-site-count">

                                                                {deployed}

                                                            </span>

                                                        </td>


                                                        {/* EMPLOYEES */}

                                                        <td>

                                                            <div className="dp-site-employees">

                                                                {
                                                                    site.employees.map(
                                                                        (employee) => (

                                                                            <span
                                                                                key={
                                                                                    employee.id
                                                                                }
                                                                                className="dp-employee-chip"
                                                                            >

                                                                                {
                                                                                    employee.employee_name ||
                                                                                    "-"
                                                                                }

                                                                            </span>

                                                                        )
                                                                    )
                                                                }

                                                            </div>

                                                        </td>


                                                        {/* STATUS */}

                                                        <td>

                                                            {
                                                                deployed > 0
                                                                    ? (

                                                                        <span className="gx-badge-active">

                                                                            Active

                                                                        </span>

                                                                    )
                                                                    : (

                                                                        <span className="gx-badge-inactive">

                                                                            Pending

                                                                        </span>

                                                                    )
                                                            }

                                                        </td>

                                                    </tr>

                                                );

                                            }
                                        )
                                    }

                                </tbody>

                            </table>

                        </div>


                        {/* ==================================================
                            EMPLOYEE DETAILS
                        ================================================== */}

                        <div className="dp-modal-employee-section">

                            <h3>
                                Employee Deployments
                            </h3>


                            <div className="dp-inner-table-wrapper">

                                <table className="gx-table dp-inner-table">

                                    <thead>

                                        <tr>

                                            <th>
                                                Code
                                            </th>

                                            <th>
                                                Employee
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
                                                Status
                                            </th>

                                            <th>
                                                Actions
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {
                                            selectedProject.deployments.map(
                                                (item) => (

                                                    <tr
                                                        key={item.id}
                                                    >

                                                        <td>

                                                            <span className="dp-code">

                                                                {
                                                                    item.deployment_code
                                                                }

                                                            </span>

                                                        </td>


                                                        <td>

                                                            <strong>

                                                                {
                                                                    item.employee_name ||
                                                                    "-"
                                                                }

                                                            </strong>

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

                                                            {item.status ? (

                                                                <span className="gx-badge-active">

                                                                    Active

                                                                </span>

                                                            ) : (

                                                                <span className="gx-badge-inactive">

                                                                    Inactive

                                                                </span>

                                                            )}

                                                        </td>


                                                        <td>

                                                            <div className="dp-action-buttons">

                                                                <button
                                                                    type="button"
                                                                    className="dp-icon-btn dp-view-btn"
                                                                    onClick={() =>
                                                                        onView(
                                                                            item
                                                                        )
                                                                    }
                                                                    title="View"
                                                                >

                                                                    <FaEye />

                                                                </button>


                                                                <button
                                                                    type="button"
                                                                    className="dp-icon-btn dp-edit-btn"
                                                                    onClick={() =>
                                                                        onEdit(
                                                                            item
                                                                        )
                                                                    }
                                                                    title="Edit"
                                                                >

                                                                    <FaEdit />

                                                                </button>


                                                                <button
                                                                    type="button"
                                                                    className="dp-icon-btn dp-status-btn"
                                                                    onClick={() =>
                                                                        onStatus(
                                                                            item
                                                                        )
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
                                                                    type="button"
                                                                    className="dp-icon-btn dp-history-btn"
                                                                    onClick={() =>
                                                                        onHistory(
                                                                            item
                                                                        )
                                                                    }
                                                                    title="History"
                                                                >

                                                                    <FaHistory />

                                                                </button>


                                                                <button
                                                                    type="button"
                                                                    className="dp-icon-btn dp-delete-btn"
                                                                    onClick={() =>
                                                                        onDelete(
                                                                            item
                                                                        )
                                                                    }
                                                                    title="Delete"
                                                                >

                                                                    <FaTrash />

                                                                </button>

                                                            </div>

                                                        </td>

                                                    </tr>

                                                )
                                            )
                                        }

                                    </tbody>

                                </table>

                            </div>

                        </div>


                        {/* FOOTER */}

                        <div className="dp-site-modal-footer">

                            <button
                                type="button"
                                className="dp-modal-close-btn"
                                onClick={closeSitePopup}
                            >

                                Close

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </>

    );

}


export default DeploymentProjectTable;