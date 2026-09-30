import React from "react";
import {
    FaEye,
    FaEdit,
    FaExchangeAlt,
    FaTrash
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";
import { hasPermission } from "../../utils/permissions";

function SiteTable({

    loading,
    sites,
    search,
    statusFilter,
    onView,
    onEdit,
    onStatus,
    onDelete

}) {

    const { user } = useAuth();

    const filteredSites = sites.filter(site => {

        const matchSearch =

            site.site_name?.toLowerCase().includes(search.toLowerCase()) ||

            site.site_code?.toLowerCase().includes(search.toLowerCase()) ||

            site.company_name?.toLowerCase().includes(search.toLowerCase()) ||

            site.client_name?.toLowerCase().includes(search.toLowerCase());

        const matchStatus =

            statusFilter === "all" ||

            String(site.status) === statusFilter;

        return matchSearch && matchStatus;

    });

    if (loading) {

        return (

            <div className="gx-loading">

                Loading Sites...

            </div>

        );

    }

    return (

        <div className="gx-table-container">

            <table className="gx-table">

                <thead>

                    <tr>

                        <th>Code</th>

                        <th>Site Name</th>

                        <th>Company</th>

                        <th>Client</th>

                        <th>Project</th>

                        <th>City</th>

                        <th>Status</th>

                        <th width="170">Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        filteredSites.length === 0 ?

                        (

                            <tr>

                                <td

                                    colSpan="8"

                                    style={{

                                        textAlign:"center",

                                        padding:"40px"

                                    }}

                                >

                                    No Site Found

                                </td>

                            </tr>

                        )

                        :

                        filteredSites.map(site=>(

                            <tr key={site.id}>

                                <td>

                                    {site.site_code}

                                </td>

                                <td>

                                    {site.site_name}

                                </td>

                                <td>

                                    {site.company_name}

                                </td>

                                <td>

                                    {site.client_name}

                                </td>

                                <td>

                                    {site.project_name}

                                </td>

                                <td>

                                    {site.city}

                                </td>

                                <td>

                                    {

                                        site.status ?

                                        <span className="badge-success">

                                            Active

                                        </span>

                                        :

                                        <span className="badge-danger">

                                            Inactive

                                        </span>

                                    }

                                </td>

                                <td>

                                    {

                                        hasPermission(user,"site_view") &&

                                        <button

                                            className="btn-icon btn-view"

                                            onClick={()=>onView(site)}

                                        >

                                            <FaEye/>

                                        </button>

                                    }

                                    {

                                        hasPermission(user,"site_edit") &&

                                        <button

                                            className="btn-icon btn-edit"

                                            onClick={()=>onEdit(site)}

                                        >

                                            <FaEdit/>

                                        </button>

                                    }

                                    {

                                        hasPermission(user,"site_edit") &&

                                        <button

                                            className="btn-icon btn-status"

                                            onClick={()=>onStatus(site)}

                                        >

                                            <FaExchangeAlt/>

                                        </button>

                                    }

                                    {

                                        hasPermission(user,"site_delete") &&

                                        <button

                                            className="btn-icon btn-delete"

                                            onClick={()=>onDelete(site)}

                                        >

                                            <FaTrash/>

                                        </button>

                                    }

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default SiteTable;