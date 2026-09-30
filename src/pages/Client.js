import React, {
    useEffect,
    useState
} from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import "../styles/company.css";

import {
    FaPlus,
    FaSearch,
    FaDownload,
    FaBuilding,
    FaCheckCircle,
    FaTimesCircle
} from "react-icons/fa";

import {
    getClients,
    getClient,
    getClientDashboard,
    changeClientStatus
} from "../api/client";

import {
    exportExcel,
    exportCSV,
    exportPDF,
    printTable
} from "../utils/export";

import ClientTable from "../components/Client/ClientTable";
import ClientForm from "../components/Client/ClientForm";
import ClientView from "../components/Client/ClientView";
import ClientStatusDialog from "../components/Client/ClientStatusDialog";

import { useAuth } from "../context/AuthContext";
import { hasPermission } from "../utils/permissions";

function Client() {

    const { user } = useAuth();

    const [clients, setClients] = useState([]);

    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("all");

    const [showForm, setShowForm] = useState(false);

    const [editForm, setEditForm] = useState(false);

    const [viewOpen, setViewOpen] = useState(false);

    const [statusOpen, setStatusOpen] = useState(false);

    const [selectedClient, setSelectedClient] = useState(null);

    const [stats, setStats] = useState({

        total: 0,

        active: 0,

        inactive: 0

    });

    /*
    ======================================
    Dashboard
    ======================================
    */

    const loadDashboard = async () => {

        try {

            const response = await getClientDashboard();

            setStats(response.data.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    /*
    ======================================
    Client List
    ======================================
    */

    const loadClients = async () => {

        try {

            setLoading(true);

            const response = await getClients();

            setClients(response.data.data);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    const refreshPage = () => {

        loadClients();

        loadDashboard();

    };

    useEffect(() => {

        refreshPage();

    }, []);

    /*
    ======================================
    Export
    ======================================
    */

    const exportData = clients

        .filter(client => {

            const matchSearch =

                client.client_name
                    ?.toLowerCase()
                    .includes(search.toLowerCase())

                ||

                client.client_code
                    ?.toLowerCase()
                    .includes(search.toLowerCase())

                ||

                client.company_name
                    ?.toLowerCase()
                    .includes(search.toLowerCase());

            const matchStatus =

                statusFilter === "all"

                ||

                String(client.status) === statusFilter;

            return matchSearch && matchStatus;

        })

        .map(client => ({

            "Client Code": client.client_code,

            "Client Name": client.client_name,

            Company: client.company_name,

            Contact: client.contact_person,

            Mobile: client.mobile,

            City: client.city,

            Status: client.status

                ?

                "Active"

                :

                "Inactive"

        }));

    return (

        <DashboardLayout title="Client Master">

            {/* Header */}

            <div className="page-header">

                <div>

                    <h2>

                        Client Management

                    </h2>

                    <p>

                        Manage Client Master Data

                    </p>

                </div>

                {

                    hasPermission(user, "client_add") &&

                    <button

                        className="btn-primary"

                        onClick={() =>

                            setShowForm(true)

                        }

                    >

                        <FaPlus />

                        &nbsp;

                        Add Client

                    </button>

                }

            </div>

            {/* Toolbar */}

            <div className="toolbar">

                <div className="search-box">

                    <FaSearch />

                    <input

                        type="text"

                        placeholder="Search Client..."

                        value={search}

                        onChange={(e) =>

                            setSearch(e.target.value)

                        }

                    />

                </div>

                <div className="toolbar-buttons">

                    <select

                        className="form-control"

                        value={statusFilter}

                        onChange={(e) =>

                            setStatusFilter(e.target.value)

                        }

                    >

                        <option value="all">

                            All

                        </option>

                        <option value="true">

                            Active

                        </option>

                        <option value="false">

                            Inactive

                        </option>

                    </select>

                    <div className="export-menu">

                        <button className="btn-light">

                            <FaDownload />

                            &nbsp;

                            Export

                        </button>

                        <div className="export-dropdown">

                            <button

                                onClick={() =>

                                    exportExcel(

                                        exportData,

                                        "Clients"

                                    )

                                }

                            >

                                Excel

                            </button>

                            <button

                                onClick={() =>

                                    exportCSV(

                                        exportData,

                                        "Clients"

                                    )

                                }

                            >

                                CSV

                            </button>

                            <button

                                onClick={() =>

                                    exportPDF(

                                        exportData,

                                        "Clients"

                                    )

                                }

                            >

                                PDF

                            </button>

                            <button

                                onClick={() =>

                                    printTable(

                                        exportData

                                    )

                                }

                            >

                                Print

                            </button>

                        </div>

                    </div>

                </div>

            </div>

            {/* Summary */}

            <div className="gx-company-summary">

                <div className="gx-summary-card total">

                    <div>

                        <h2>

                            {stats.total}

                        </h2>

                        <span>

                            Total Clients

                        </span>

                    </div>

                    <div className="gx-summary-icon">

                        <FaBuilding />

                    </div>

                </div>

                <div className="gx-summary-card active">

                    <div>

                        <h2>

                            {stats.active}

                        </h2>

                        <span>

                            Active Clients

                        </span>

                    </div>

                    <div className="gx-summary-icon">

                        <FaCheckCircle />

                    </div>

                </div>

                <div className="gx-summary-card inactive">

                    <div>

                        <h2>

                            {stats.inactive}

                        </h2>

                        <span>

                            Inactive Clients

                        </span>

                    </div>

                    <div className="gx-summary-icon">

                        <FaTimesCircle />

                    </div>

                </div>

            </div>

            {/* Table */}

            <ClientTable

                loading={loading}

                clients={clients}

                search={search}

                statusFilter={statusFilter}

                refresh={refreshPage}

                onView={async (client) => {

                    const response = await getClient(client.id);

                    setSelectedClient(response.data.data);

                    setViewOpen(true);

                }}

                onEdit={async (client) => {

                    const response = await getClient(client.id);

                    setSelectedClient(response.data.data);

                    setEditForm(true);

                }}

                onStatus={(client) => {

                    setSelectedClient(client);

                    setStatusOpen(true);

                }}

            />

            {/* Add */}

            {

                showForm &&

                <ClientForm

                    mode="add"

                    refresh={refreshPage}

                    close={() =>

                        setShowForm(false)

                    }

                />

            }

            {/* Edit */}

            {

                editForm &&

                <ClientForm

                    mode="edit"

                    client={selectedClient}

                    refresh={refreshPage}

                    close={() => {

                        setEditForm(false);

                        setSelectedClient(null);

                    }}

                />

            }

            {/* View */}

            {

                viewOpen &&

                <ClientView

                    client={selectedClient}

                    close={() => {

                        setViewOpen(false);

                        setSelectedClient(null);

                    }}

                />

            }

            {/* Status */}

            {

                statusOpen &&

                <ClientStatusDialog

                    open={statusOpen}

                    client={selectedClient}

                    close={() => {

                        setStatusOpen(false);

                        setSelectedClient(null);

                    }}

                    confirm={async () => {

                        await changeClientStatus(

                            selectedClient.id,

                            !selectedClient.status

                        );

                        refreshPage();

                        setStatusOpen(false);

                        setSelectedClient(null);

                    }}

                />

            }

        </DashboardLayout>

    );

}

export default Client;