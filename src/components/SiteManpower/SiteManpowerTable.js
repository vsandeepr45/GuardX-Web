import React from "react";

import {
    FaEye,
    FaEdit,
    FaToggleOn,
    FaToggleOff,
    FaTrash
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

import { hasPermission } from "../../utils/permissions";

function SiteManpowerTable({

    loading,

    manpower,

    search,

    statusFilter,

    onView,

    onEdit,

    onStatus,

    onDelete

}) {

    const { user } = useAuth();

const searchValue = (search || "").toLowerCase();

const filtered = (manpower || []).filter(item => {

    const matchSearch =

        (item.company_name || "").toLowerCase().includes(searchValue) ||

        (item.client_name || "").toLowerCase().includes(searchValue) ||

        (item.project_name || "").toLowerCase().includes(searchValue) ||

        (item.site_name || "").toLowerCase().includes(searchValue) ||

        (item.post_name || "").toLowerCase().includes(searchValue) ||

        (item.shift_name || "").toLowerCase().includes(searchValue);

    const matchStatus =

        !statusFilter ||

        statusFilter === "all" ||

        String(item.status) === String(statusFilter);

    return matchSearch && matchStatus;

});

    if (loading) {

        return (

            <div className="table-loading">

                Loading...

            </div>

        );

    }

    return (

        <table className="gx-table">

            <thead>

                <tr>

                    <th>Company</th>

                    <th>Client</th>

                    <th>Project</th>

                    <th>Site</th>

                    <th>Post</th>

                    <th>Shift</th>

                    <th>Required</th>

                    <th>Assigned</th>

                    <th>Vacancy</th>

                    <th>Status</th>

                    <th width="170">Action</th>

                </tr>

            </thead>

            <tbody>

                {

                    filtered.length === 0 && (

                        <tr>

                            <td colSpan="11">

                                No Records Found

                            </td>

                        </tr>

                    )

                }

                {

                    filtered.map(item => {

                        const vacancy =

                            item.required_guards -

                            item.assigned_guards;

                        return (

                            <tr key={item.id}>

                                <td>{item.company_name}</td>

                                <td>{item.client_name}</td>

                                <td>{item.project_name}</td>

                                <td>{item.site_name}</td>

                                <td>{item.post_name}</td>

                                <td>{item.shift_name}</td>

                                <td>{item.required_guards}</td>

                                <td>{item.assigned_guards}</td>

                                <td>

                                    <span

                                        style={{

                                            color:

                                                vacancy > 0

                                                    ? "red"

                                                    : "green",

                                            fontWeight: 600

                                        }}

                                    >

                                        {vacancy}

                                    </span>

                                </td>

                                <td>

                                    {

                                        item.status

                                            ? "Active"

                                            : "Inactive"

                                    }

                                </td>

                                <td>

                                    {

                                        hasPermission(user,"site_manpower_view") &&

                                        <button

                                            className="icon-btn"

                                            onClick={() => onView(item)}

                                        >

                                            <FaEye />

                                        </button>

                                    }

                                    {

                                        hasPermission(user,"site_manpower_edit") &&

                                        <button

                                            className="icon-btn"

                                            onClick={() => onEdit(item)}

                                        >

                                            <FaEdit />

                                        </button>

                                    }

                                    {

                                        hasPermission(user,"site_manpower_status") &&

                                        <button

                                            className="icon-btn"

                                            onClick={() => onStatus(item)}

                                        >

                                            {

                                                item.status

                                                    ?

                                                    <FaToggleOn />

                                                    :

                                                    <FaToggleOff />

                                            }

                                        </button>

                                    }

                                    {

                                        hasPermission(user,"site_manpower_delete") &&

                                        <button

                                            className="icon-btn"

                                            onClick={() => onDelete(item)}

                                        >

                                            <FaTrash />

                                        </button>

                                    }

                                </td>

                            </tr>

                        );

                    })

                }

            </tbody>

        </table>

    );

}

export default SiteManpowerTable;