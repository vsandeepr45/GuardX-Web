import React, {
    useEffect,
    useState
} from "react";

import { FaEye } from "react-icons/fa";
import DeploymentTable from "../components/Deployment/DeploymentTable";
import DeploymentForm from "../components/Deployment/DeploymentForm";
import DeploymentView from "../components/Deployment/DeploymentView";
import DeploymentStatusDialog from "../components/Deployment/DeploymentStatusDialog";
import DeploymentDeleteDialog from "../components/Deployment/DeploymentDeleteDialog";
import DashboardLayout from "../layouts/DashboardLayout";
import "../styles/employee.css";
import { getEmployeeDropdown } from "../api/employee";
import { getClientDropdown } from "../api/client";
import { getProjectDropdown } from "../api/project";
import { getSiteDropdown } from "../api/site";
import { getShiftDropdown } from "../api/shift";
import { getCompanyDropdown } from "../api/company";
import DeploymentHistoryDialog from "../components/Deployment/DeploymentHistoryDialog";
import { getDeploymentHistory } from "../api/deploymentHistory";
import DeploymentPendingRequestTable from "../components/Deployment/DeploymentPendingRequestTable";
import SiteManpowerTable from "../components/SiteManpower/SiteManpowerTable";
import SiteManpowerForm from "../components/SiteManpower/SiteManpowerForm";
import SiteManpowerView from "../components/SiteManpower/SiteManpowerView";
import SiteManpowerStatusDialog from "../components/SiteManpower/SiteManpowerStatusDialog";
import SiteManpowerDeleteDialog from "../components/SiteManpower/SiteManpowerDeleteDialog";
import DeploymentRequestSitesModal from "../components/Deployment/DeploymentRequestSitesModal";
import DeploymentProjectTable from "../components/Deployment/DeploymentProjectTable";
import {
    getSiteManpower,
    getSiteManpowerDashboard,
    createSiteManpower,
    updateSiteManpower,
    deleteSiteManpower,
    changeSiteManpowerStatus
} from "../api/siteManpower";
import {
    getDeployments,
    getDeployment,
    createDeployment,
    updateDeployment,
    deleteDeployment,
    changeDeploymentStatus,
    getPendingDeploymentRequests,
    getCurrentDeployment
} from "../api/deployment";
function Deployment() {
    // ==========================================
    // SECURITY GUARD
    // ==========================================
    const [isSecurityGuard, setIsSecurityGuard] = useState(false);
    const [currentDeployment, setCurrentDeployment] = useState(null);
    // ==========================================
    // DEPLOYMENT STATES
    // ==========================================
    const [deployments, setDeployments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formOpen, setFormOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
    const [statusOpen, setStatusOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [clients, setClients] = useState([]);
    const [projects, setProjects] = useState([]);
    const [sites, setSites] = useState([]);
    const [shifts, setShifts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [viewMode, setViewMode] = useState("request");

    // ==========================================
    // FILTER STATES
    // ==========================================
    const [employeeFilter, setEmployeeFilter] = useState("");
    const [companyFilter, setCompanyFilter] = useState("");
    const [clientFilter, setClientFilter] = useState("");
    const [projectFilter, setProjectFilter] = useState("");
    const [siteFilter, setSiteFilter] = useState("");
    const [shiftFilter, setShiftFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    // ==========================================
    // HISTORY / REQUEST STATES
    // ==========================================
    const [historyOpen, setHistoryOpen] = useState(false);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [requestSitesOpen, setRequestSitesOpen] = useState(false);
    const [selectedRequestSites, setSelectedRequestSites] = useState(null);
    // =========================================
    // SITE MANPOWER STATES
    // ==========================================
    const [manpower, setManpower] = useState([]);
    const [manpowerFormOpen, setManpowerFormOpen] = useState(false);
    const [manpowerViewOpen, setManpowerViewOpen] = useState(false);
    const [manpowerStatusOpen, setManpowerStatusOpen] = useState(false);
    const [manpowerDeleteOpen, setManpowerDeleteOpen] = useState(false);
    const [selectedManpower, setSelectedManpower] = useState(null);
    // =========================================
    // HISTORY
    // ==========================================
    const [history, setHistory] = useState([]);
    // ==========================================
    // DEPLOYMENT COUNTS
    // ==========================================
    const totalDeployments = deployments.length;
    const activeDeployments = deployments.filter(
        item => item.status === "Active"
    ).length;
    const inactiveDeployments = deployments.filter(
        item => item.status !== "Active"
    ).length;
    // employees dropdown already contains only AVAILABLE employees
    const availableEmployees = employees.length;
    // Active deployed employees
    const deployedEmployees = new Set(
        deployments
            .filter(
                item =>
                    item.deployment_status === "Active"
            )
            .map(
                item =>
                    item.employee_id
            )
    ).size;
    // ==========================================
    // GET LOGGED IN ROLE
    // ==========================================
    const getLoggedInRoleId = () => {
        try {
            const token =
                localStorage.getItem("token");
            if (!token) {
                return null;
            }
            const payload =
                JSON.parse(
                    atob(
                        token
                            .split(".")[1]
                            .replace(/-/g, "+")
                            .replace(/_/g, "/")
                    )
                );
            return Number(
                payload.role_id ||
                payload.roleId
            );
        }
        catch (error) {

            console.log(
                "Unable to read role from token",
                error
            );
            return null;
        }
    };
    // ==========================================
    // TOTAL GUARDS
    // ==========================================
    const totalEmployees =
        availableEmployees +
        deployedEmployees;
    const morningShift = deployments.filter(
        item =>
            item.shift_name === "Morning Shift"
    ).length;
    const eveningShift = deployments.filter(
        item =>
            item.shift_name === "Evening Shift"
    ).length;
    const nightShift = deployments.filter(
        item =>
            item.shift_name === "Night Shift"
    ).length;
    const permanentDeployments =
        deployments.filter(
            item =>
                item.deployment_type === "Permanent"
        ).length;
    const temporaryDeployments =
        deployments.filter(
            item =>
                item.deployment_type === "Temporary"
        ).length;
    // ==========================================
    // LOAD DATA
    // ==========================================
    const loadData = async () => {
        try {
            const roleId =
                getLoggedInRoleId();
            const securityGuard =
                roleId === 5;
            setIsSecurityGuard(
                securityGuard
            );
            // ==========================================
            // SECURITY GUARD
            // ==========================================
            if (securityGuard) {

                const response =
                    await getCurrentDeployment();
                const guardDeployment =
                    response?.data?.data || null;
                setCurrentDeployment(
                    guardDeployment
                );
                setDeployments(
                    guardDeployment
                        ? [guardDeployment]
                        : []
                );
                return;
            }
            // ==========================================
            // ADMIN / OTHER ROLES
            // ==========================================
            const [
                deploymentRes,
                pendingRes,
                employeeRes,
                companyRes,
                clientRes,
                projectRes,
                siteRes,
                shiftRes,
                manpowerRes
            ] = await Promise.all([
                getDeployments(),
                getPendingDeploymentRequests(),
                getEmployeeDropdown(),
                getCompanyDropdown(),
                getClientDropdown(),
                getProjectDropdown(),
                getSiteDropdown(),
                getShiftDropdown(),
                getSiteManpower()
            ]);
            setDeployments(
                deploymentRes.data.data || []
            );
            setPendingRequests(
                pendingRes.data.data || []
            );
            setEmployees(
                employeeRes.data.data || []
            );
            setCompanies(
                companyRes.data.data || []
            );
            setClients(
                clientRes.data.data || []
            );
            setProjects(
                projectRes.data.data || []
            );
            setSites(
                siteRes.data.data || []
            );
            setShifts(
                shiftRes.data.data || []
            );
            setManpower(
                manpowerRes.data.data || []
            );
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    };
    // ==========================================
    // INITIAL LOAD
    // ==========================================
    useEffect(() => {
        loadData();
    }, []);
    // ==========================================
    // OPEN HISTORY
    // ==========================================
    const openHistory = async (row) => {
        try {
            const res =
                await getDeploymentHistory(
                    row.id
                );
            setHistory(
                res.data.data || []
            );
            setSelected(row);
            setHistoryOpen(true);
        }
        catch (err) {
            console.log(err);
        }
    };


    // ==========================================
    // OPEN ADD
    // ==========================================

    const openAdd = () => {

        setSelected(null);

        setFormOpen(true);

    };
    // ==========================================
    // OPEN EDIT
    // ==========================================
    const openEdit = async (row) => {
        try {
            const res =
                await getDeployment(
                    row.id
                );
            setSelected(
                res.data.data
            );
            setFormOpen(true);
        }
        catch (err) {
            console.log(err)
        }
    };
    // ==========================================
    // OPEN VIEW
    // ==========================================
    const openView = (row) => {
        setSelected(row);
        setViewOpen(true);
    };
    // ==========================================
    // OPEN STATUS
    // ==========================================
    const openStatus = (row) => {
        setSelected(row);
        setStatusOpen(true);
    };
    // ==========================================
    // OPEN DELETE
    // ==========================================
    const openDelete = (row) => {
        setSelected(row);
        setDeleteOpen(true);
    };
    // ==========================================
    // SAVE DEPLOYMENT
    // ==========================================
    const handleSave = async (data) => {
        try {
            if (
                selected &&
                selected.id
            ) {
                await updateDeployment(
                    selected.id,
                    data
                );
            }
            else {
                await createDeployment(
                    data
                );
            }
            setFormOpen(false);
            loadData();
        }
        catch (err) {
            console.log(err);
        }
    };
    // ==========================================
    // FILTER DEPLOYMENTS
    // ==========================================
    const filteredDeployments =
        deployments.filter(
            (deployment) => {
                const search =
                    searchTerm.toLowerCase();
                return (
                    (
                        deployment.deployment_code ||
                        ""
                    )
                        .toLowerCase()
                        .includes(search)
                    ||
                    (
                        deployment.employee_code ||
                        ""
                    )
                        .toLowerCase()
                        .includes(search)
                    ||
                    (
                        deployment.employee_name ||
                        ""
                    )
                        .toLowerCase()
                        .includes(search)
                    ||
                    (
                        deployment.company_name ||
                        ""
                    )
                        .toLowerCase()
                        .includes(search)
                    ||
                    (
                        deployment.client_name ||
                        ""
                    )
                        .toLowerCase()
                        .includes(search)
                    ||


                    (
                        deployment.project_name ||
                        ""
                    )
                        .toLowerCase()
                        .includes(search)
                    ||
                    (
                        deployment.site_name ||
                        ""
                    )
                        .toLowerCase()
                        .includes(search)
                    ||
                    (
                        deployment.shift_name ||
                        ""
                    )
                        .toLowerCase()
                        .includes(search)
                    ||
                    (
                        deployment.duty_position ||
                        ""
                    )
                        .toLowerCase()
                        .includes(search)
                    ||
                    (
                        deployment.deployment_type ||
                        ""
                    )
                        .toLowerCase()
                        .includes(search)
                    ||
                    (
                        deployment.deployment_status ||
                        ""
                    )
                        .toLowerCase()
                        .includes(search)
                );
            }
        );
    // ==========================================
    // DELETE DEPLOYMENT
    // ==========================================
    const handleDelete = async (id) => {
        try {
            await deleteDeployment(id);
            setDeleteOpen(false);
            loadData();
        }
        catch (err) {
            console.log(err);
        }
    };
    // ==========================================
    // CHANGE DEPLOYMENT STATUS
    // ==========================================
    const handleStatus = async (
        id,
        status
    ) => {
        try {
            await changeDeploymentStatus(
                id,
                status
            );
            setStatusOpen(false);
            loadData();
        }
        catch (err) {
            console.log(err);
        }
    };
    // ==========================================
    // ASSIGN REQUEST
    // ==========================================
    const assignRequest = (request) => {
        console.log(
            "================================"
        );
        console.log(
            "ASSIGNING DEPLOYMENT REQUEST SITE"
        );
        console.log(
            request
        );
        console.log(
            "================================"
        );
        setSelected({
            deployment_request_id:
                request.request_id,
            employee_id: "",
            company_id:
                request.company_id || "",
            client_id:
                request.client_id || "",
            project_id:
                request.project_id || "",
            site_id:
                request.site_id || "",
            site_name:
                request.site_name || "",
            duty_shift_id:
                request.shift_id || "",
            duty_position:
                request.required_position || "",
            deployment_type:
                "Permanent",
            priority:
                request.priority || "Medium",
            from_date:
                request.required_from || "",
            to_date:
                request.required_to || "",
            remarks:
                request.remarks || "",
            requested_guards:
                Number(
                    request.required_guards || 0
                ),
            deployed_guards:
                Number(
                    request.assigned_guards || 0
                ),
            remaining_guards:
                Number(
                    request.remaining_guards || 0
                )
        });
        setFormOpen(true);
    };
    // ==========================================
    // OPEN REQUEST SITES
    // ==========================================
    const openRequestSites = (request) => {
        console.log(
            "================================"
        );
        console.log(
            "OPEN DEPLOYMENT REQUEST SITES"
        );
        console.log(
            request
        );
        console.log(
            "================================"
        );
        setSelectedRequestSites(
            request
        );
        setRequestSitesOpen(
            true
        );
    };
    // ==========================================
    // RETURN
    // ==========================================
    return (
        <DashboardLayout
            title="Employee Deployment"
        >
            {/* =====================================================
                SECURITY GUARD ROLE - ROLE ID 5
                ===================================================== */}
            {isSecurityGuard ? (
                <div className="gx-card">
                    <div className="gx-card-header">
                        <div>
                            <h3>
                                Employee Deployments
                            </h3>
                            <p>
                                View your assigned deployment details
                            </p>
                        </div>
                    </div>
                    <DeploymentTable

                        deployments={
                            deployments
                        }
                        loading={
                            loading
                        }
                        onView={
                            openView
                        }
                        isSecurityGuard={
                            true
                        }
                    />
                </div>
            ) : (
                /* =====================================================
                   ADMIN / MANAGER / OTHER ROLES
                   EXISTING DEPLOYMENT PAGE
                   ===================================================== */
                <>
                    {/* ==========================================
                        TOOLBAR
                        ========================================== */}
                    <div className="gx-toolbar">
                        <div>
                            <h2>
                                Employee Deployment
                            </h2>
                            <p>
                                Manage employee deployment and assignments
                            </p>
                        </div>
                        <div className="gx-toolbar-right">
                            <input
                                type="text"
                                className="gx-search"
                                placeholder="Search deployment..."
                                value={searchTerm}
                                onChange={(e) =>
                                    setSearchTerm(
                                        e.target.value
                                    )
                                }
                            />
                            <button
                                className="gx-add-btn"
                                onClick={openAdd}
                            >
                                + Add Deployment
                            </button>
                        </div>
                    </div>
                    {/* ==========================================
                        TABS
                        ========================================== */}
                    <div className="gx-tabs">
                        <button
                            className={
                                viewMode === "request"
                                    ? "gx-tab active"
                                    : "gx-tab"
                            }
                            onClick={() =>
                                setViewMode("request")
                            }
                        >
                            Deployment Request Details
                        </button>
                        <button
                            className={
                                viewMode === "deployment"
                                    ? "gx-tab active"
                                    : "gx-tab"
                            }
                            onClick={() =>
                                setViewMode("deployment")
                            }
                        >
                            Employee Deployment Details
                        </button>
                        <button
                            className={
                                viewMode === "manpower"
                                    ? "gx-tab active"
                                    : "gx-tab"
                            }
                            onClick={() =>
                                setViewMode("manpower")
                            }
                        >
                            Site Manpower
                        </button>
                    </div>
                    {/* ==========================================
                        DEPLOYMENT REQUEST TAB
                        ========================================== */}
                    {viewMode === "request" && (
                        <div className="gx-card">
                            <div className="gx-card-header">
                                <h3>
                                    Pending Deployment Requests
                                </h3>
                                <span className="gx-count">
                                    {
                                        [
                                            ...new Set(
                                                pendingRequests.map(
                                                    item =>
                                                        item.request_id
                                                )
                                            )
                                        ].length
                                    }
                                </span>
                            </div>
                            <DeploymentPendingRequestTable
                                requests={
                                    pendingRequests
                                }
                                onViewSites={
                                    openRequestSites
                                }
                            />
                        </div>
                    )}
                    {/* ==========================================
                        OLD DASHBOARD CARDS
                        ========================================== */}
                    {/*
                    <div className="dp-dashboard-cards">

                        <div className="dp-dashboard-card">

                            <h2>
                                {totalEmployees}
                            </h2>

                            <p>
                                Total Employees
                            </p>

                        </div>


                        <div className="dp-dashboard-card">

                            <h2>
                                {deployedEmployees}
                            </h2>

                            <p>
                                Deployed Employees
                            </p>

                        </div>


                        <div className="dp-dashboard-card">

                            <h2>
                                {availableEmployees}
                            </h2>

                            <p>
                                Available Employees
                            </p>

                        </div>


                        <div className="dp-dashboard-card">

                            <h2>
                                {morningShift}
                            </h2>

                            <p>
                                Morning Shift
                            </p>

                        </div>


                        <div className="dp-dashboard-card">

                            <h2>
                                {eveningShift}
                            </h2>

                            <p>
                                Evening Shift
                            </p>

                        </div>


                        <div className="dp-dashboard-card">

                            <h2>
                                {nightShift}
                            </h2>

                            <p>
                                Night Shift
                            </p>

                        </div>


                        <div className="dp-dashboard-card">

                            <h2>
                                {permanentDeployments}
                            </h2>

                            <p>
                                Permanent
                            </p>

                        </div>


                        <div className="dp-dashboard-card">

                            <h2>
                                {temporaryDeployments}
                            </h2>

                            <p>
                                Temporary
                            </p>

                        </div>

                    </div>
                    */}
                    {/* ==========================================
                        EMPLOYEE DEPLOYMENT TAB
                        ========================================== */}
                    {viewMode === "deployment" && (
                        <>
                            <div className="dp-dashboard-cards">
                                <div className="dp-dashboard-card">
                                    <h2>
                                        {totalDeployments}
                                    </h2>
                                    <p>
                                        Total Deployments
                                    </p>
                                </div>
                                <div className="dp-dashboard-card">
                                    <h2>
                                        {deployedEmployees}
                                    </h2>
                                    <p>
                                        Deployed Employees
                                    </p>
                                </div>
                                <div className="dp-dashboard-card">
                                    <h2>
                                        {availableEmployees}
                                    </h2>
                                    <p>
                                        Available Employees
                                    </p>
                                </div>
                                <div className="dp-dashboard-card">
                                    <h2>
                                        {pendingRequests.length}
                                    </h2>
                                    <p>
                                        Pending Requests
                                    </p>
                                </div>
                            </div>
                            <DeploymentProjectTable
                                deployments={
                                    filteredDeployments
                                }
                                loading={
                                    loading
                                }
                                onView={
                                    openView
                                }
                                onEdit={
                                    openEdit
                                }
                                onStatus={
                                    openStatus
                                }
                                onDelete={
                                    openDelete
                                }
                                onHistory={
                                    openHistory
                                }
                            />
                        </>
                    )}
                    {/* ==========================================
                        SITE MANPOWER TAB
                        ========================================== */}
                    {viewMode === "manpower" && (
                        <>
                            <div className="dp-dashboard-cards">
                                <div className="dp-dashboard-card">
                                    <h2>
                                        {
                                            manpower.length
                                        }
                                    </h2>
                                    <p>
                                        Total Site Records
                                    </p>
                                </div>
                                <div className="dp-dashboard-card">
                                    <h2>
                                        {
                                            manpower.reduce(
                                                (sum, item) =>
                                                    sum +
                                                    Number(
                                                        item.required_guards ||
                                                        0
                                                    ),
                                                0
                                            )
                                        }
                                    </h2>
                                    <p>
                                        Required Guards
                                    </p>
                                </div>
                                <div className="dp-dashboard-card">
                                    <h2>
                                        {
                                            manpower.filter(
                                                item =>
                                                    item.status
                                            ).length
                                        }
                                    </h2>
                                    <p>
                                        Active Records
                                    </p>
                                </div>
                            </div>
                            <SiteManpowerTable
                                manpower={
                                    manpower
                                }
                                loading={
                                    loading
                                }
                                onView={(row) => {
                                    setSelectedManpower(
                                        row
                                    );
                                    setManpowerViewOpen(
                                        true
                                    );
                                }}
                                onEdit={(row) => {
                                    setSelectedManpower(
                                        row
                                    );
                                    setManpowerFormOpen(
                                        true
                                    );
                                }}
                                onStatus={(row) => {
                                    setSelectedManpower(
                                        row
                                    );
                                    setManpowerStatusOpen(
                                        true
                                    );
                                }}
                                onDelete={(row) => {
                                    setSelectedManpower(
                                        row
                                    );
                                    setManpowerDeleteOpen(
                                        true
                                    );
                                }}
                            />
                        </>
                    )}
                </>
            )}
            {/* =====================================================
                EXISTING MODALS
                These are kept unchanged.
                ===================================================== */}
            <DeploymentRequestSitesModal
                open={requestSitesOpen}
                request={selectedRequestSites}
                sites={selectedRequestSites
                        ?
                        pendingRequests.filter(item =>
                                item.request_id ===
                                selectedRequestSites.request_id
                        )
                        :
                        []
                }
                onClose={() => {setRequestSitesOpen(false);
                    setSelectedRequestSites(null);}}
                onAssign={(site) => {
                    setRequestSitesOpen(false);
                    setSelectedRequestSites(null);
                    assignRequest(site);
                }}
            />
            <DeploymentForm
                open={formOpen}
                deployment={selected }
                employees={ employees}
                companies={companies}
                clients={clients}
                projects={projects}
                sites={sites}
                shifts={shifts}

                onClose={() => { setFormOpen(false);
                    setSelected( null ); }}
                onSubmit={
                    handleSave
                }
            />
            <DeploymentView
                open={
                    viewOpen
                }
                deployment={
                    selected
                }
                close={() =>
                    setViewOpen(
                        false
                    )
                }
            />
            <DeploymentStatusDialog
                open={
                    statusOpen
                }
                deployment={
                    selected
                }
                close={() =>
                    setStatusOpen(
                        false
                    )
                }
                confirm={
                    handleStatus
                }
            />
            <DeploymentDeleteDialog
                open={
                    deleteOpen
                }
                deployment={
                    selected
                }
                close={() =>
                    setDeleteOpen(
                        false
                    )
                }
                confirm={
                    handleDelete
                }
            />
            <DeploymentHistoryDialog
                open={
                    historyOpen
                }
                history={
                    history
                }
                deployment={
                    selected
                }
                close={() =>
                    setHistoryOpen(
                        false
                    )
                }
            />
            <SiteManpowerForm
                open={
                    manpowerFormOpen
                }
                mode={
                    selectedManpower
                        ?
                        "edit"
                        :
                        "add"
                }
                manpower={
                    selectedManpower
                }
                refresh={
                    loadData
                }
                close={() => {
                    setManpowerFormOpen(
                        false
                    );
                    setSelectedManpower(
                        null
                    );
                }}
            />
            <SiteManpowerView
                open={
                    manpowerViewOpen
                }
                manpower={
                    selectedManpower
                }
                close={() => {
                    setManpowerViewOpen(
                        false
                    );
                }}
            />
            <SiteManpowerStatusDialog
                open={
                    manpowerStatusOpen
                }
                manpower={
                    selectedManpower
                }
                close={() => {
                    setManpowerStatusOpen(
                        false
                    );
                }}
                confirm={async (status) => {
                    await changeSiteManpowerStatus(
                        selectedManpower.id,
                        status
                    );
                    setManpowerStatusOpen(
                        false
                    );
                    loadData();
                }}
            />
            <SiteManpowerDeleteDialog
                open={
                    manpowerDeleteOpen
                }
                manpower={
                    selectedManpower
                }
                close={() => {
                    setManpowerDeleteOpen(
                        false
                    );
                }}
                confirm={async () => {
                    await deleteSiteManpower(
                        selectedManpower.id
                    );
                    setManpowerDeleteOpen(
                        false
                    );
                    loadData();
                }}
            />
        </DashboardLayout>
    );
}
export default Deployment;