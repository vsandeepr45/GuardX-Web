import React, {
    useCallback,
    useEffect,
    useState
} from "react";
import { useAuth } from "../../context/AuthContext";
import { hasPermission } from "../../utils/permissions";
import {
    FaUserPlus,
    FaSyncAlt
} from "react-icons/fa";

import DashboardLayout
    from "../../layouts/DashboardLayout";
import VisitorRegistrationModal
    from "../../components/Visitors/VisitorRegistrationModal";
import {
    getVisitorDashboard,
    createVisitor,
    createVisit,
    getVisit,
    updateVisitApproval,
    checkInVisitor,
    checkOutVisitor
} from "../../api/visitorApi";
import {
    getMyAssignedSites
} from "../../api/site";
import {
    getEmployees
} from "../../api/employee";

import VisitorStats
    from "../../components/Visitors/VisitorStats";

import VisitorList
    from "../../components/Visitors/VisitorList";

import "../../styles/VisitorDashboard.css";
import VisitorDetailsDrawer
    from "../../components/Visitors/VisitorDetailsDrawer";
import VisitorTabs
    from "../../components/Visitors/VisitorTabs";

import VisitorFilters
    from "../../components/Visitors/VisitorFilters";
export default function VisitorDashboard() {

    const { user } = useAuth();

    const canApprove =
        hasPermission(
            user,
            "visitor_approve"
        );

    const canCheckIn =
        hasPermission(
            user,
            "visitor_checkin"
        );

    const canCheckOut =
        hasPermission(
            user,
            "visitor_checkout"
        );

    const [
        dashboard,
        setDashboard
    ] = useState(null);

    const [
        loading,
        setLoading
    ] = useState(true);

    const [
        error,
        setError
    ] = useState("");

    const [
        selectedVisitor,
        setSelectedVisitor
    ] = useState(null);
    const [
        registrationOpen,
        setRegistrationOpen
    ] = useState(false);

    const [
        sites,
        setSites
    ] = useState([]);

    const [
        employees,
        setEmployees
    ] = useState([]);

    const [
        activeTab,
        setActiveTab
    ] = useState("all");


    const [
        search,
        setSearch
    ] = useState("");


    const [
        selectedSiteId,
        setSelectedSiteId
    ] = useState("");


    const [
        selectedDate,
        setSelectedDate
    ] = useState("");
    // =========================================================
    // LOAD DASHBOARD
    // =========================================================

const loadDashboard =
    useCallback(async () => {

        try {

            setError("");

            const response =
                await getVisitorDashboard();

            if (
                response.data?.success
            ) {

                setDashboard(
                    response.data.data
                );

            } else {

                throw new Error(
                    response.data?.message ||
                    "Unable to load visitor dashboard."
                );

            }


            // ============================================
            // LOAD ONLY CURRENT USER'S ASSIGNED SITES
            // ============================================

            try {

                const sitesResponse =
                    await getMyAssignedSites();

                if (
                    sitesResponse.data?.success
                ) {

                    setSites(
                        sitesResponse.data.data || []
                    );

                }

            } catch (siteError) {

                console.error(
                    "Assigned sites error:",
                    siteError
                );

                setSites([]);

            }

            try {

                const employeesResponse =
                    await getEmployees();

                if (
                    employeesResponse.data?.success
                ) {

                    setEmployees(
                        employeesResponse.data.data || []
                    );

                }

            } catch (employeeError) {

                console.error(
                    "Unable to load employees:",
                    employeeError
                );

                setEmployees([]);

            }


        } catch (err) {

            console.error(
                "Visitor dashboard error:",
                err
            );

            setError(
                err.response?.data?.message ||
                err.message ||
                "Unable to load visitor dashboard."
            );

        } finally {

            setLoading(false);

        }

    }, []);

    // =========================================================
    // INITIAL LOAD
    // =========================================================

    useEffect(() => {

        loadDashboard();

    }, [loadDashboard]);


    // =========================================================
    // VIEW VISITOR
    // =========================================================

const handleView = async (visitor) => {

    try {

        setError("");

        // -------------------------------------------------
        // Show the existing row immediately
        // -------------------------------------------------

        setSelectedVisitor(visitor);


        // -------------------------------------------------
        // Load COMPLETE visit details
        // -------------------------------------------------

        const response =
            await getVisit(visitor.id);


        if (
            response.data?.success &&
            response.data?.data
        ) {

            setSelectedVisitor(
                response.data.data
            );

        } else {

            throw new Error(
                response.data?.message ||
                "Unable to load visitor details."
            );

        }

    } catch (err) {

        console.error(
            "Visitor details error:",
            err
        );

        setError(
            err.response?.data?.message ||
            err.message ||
            "Unable to load visitor details."
        );

    }

};

const handleCloseDrawer = () => {
    setSelectedVisitor(null);
};

// =========================================================
// APPROVE VISITOR
// =========================================================

const handleApprove = async (visitor) => {

    try {

        setError("");

        const response =
            await updateVisitApproval(
                visitor.id,
                "Approved"
            );

        if (!response.data?.success) {

            throw new Error(
                response.data?.message ||
                "Unable to approve visitor."
            );

        }

        alert("Visitor approved successfully.");

        await loadDashboard();

    } catch (err) {

        console.error(
            "Visitor approval error:",
            err
        );

        setError(
            err.response?.data?.message ||
            err.message ||
            "Unable to approve visitor."
        );

    }

};


// =========================================================
// REJECT VISITOR
// =========================================================

const handleReject = async (visitor) => {

    try {

        setError("");

        const response =
            await updateVisitApproval(
                visitor.id,
                "Rejected"
            );

        if (!response.data?.success) {

            throw new Error(
                response.data?.message ||
                "Unable to reject visitor."
            );

        }

        alert("Visitor rejected.");

        await loadDashboard();

    } catch (err) {

        console.error(
            "Visitor rejection error:",
            err
        );

        setError(
            err.response?.data?.message ||
            err.message ||
            "Unable to reject visitor."
        );

    }

};


// =========================================================
// CHECK IN
// =========================================================

const handleCheckIn = async (visitor) => {

    try {

        setError("");

        if (!navigator.geolocation) {

            throw new Error(
                "Location is not supported by this browser."
            );

        }

        const position =
            await new Promise((resolve, reject) => {

                navigator.geolocation.getCurrentPosition(
                    resolve,
                    reject,
                    {
                        enableHighAccuracy: true,
                        timeout: 15000,
                        maximumAge: 0
                    }
                );

            });

        const {
            latitude,
            longitude,
            accuracy
        } = position.coords;


        const response =
            await checkInVisitor(
                visitor.id,
                {
                    latitude,
                    longitude,
                    accuracy
                }
            );


        if (!response.data?.success) {

            throw new Error(
                response.data?.message ||
                "Unable to check in visitor."
            );

        }


        alert(
            "Visitor checked in successfully."
        );


        await loadDashboard();


    } catch (err) {

        console.error(
            "Visitor check-in error:",
            err
        );

        setError(
            err.response?.data?.message ||
            err.message ||
            "Unable to check in visitor."
        );

    }

};


// =========================================================
// CHECK OUT
// =========================================================

const handleCheckOut = async (visitor) => {

    try {

        setError("");

        if (!navigator.geolocation) {

            throw new Error(
                "Location is not supported by this browser."
            );

        }


        const position =
            await new Promise((resolve, reject) => {

                navigator.geolocation.getCurrentPosition(
                    resolve,
                    reject,
                    {
                        enableHighAccuracy: true,
                        timeout: 15000,
                        maximumAge: 0
                    }
                );

            });


        const {
            latitude,
            longitude,
            accuracy
        } = position.coords;


        const response =
            await checkOutVisitor(
                visitor.id,
                {
                    latitude,
                    longitude,
                    accuracy
                }
            );


        if (!response.data?.success) {

            throw new Error(
                response.data?.message ||
                "Unable to check out visitor."
            );

        }


        alert(
            "Visitor checked out successfully."
        );


        await loadDashboard();


    } catch (err) {

        console.error(
            "Visitor check-out error:",
            err
        );

        setError(
            err.response?.data?.message ||
            err.message ||
            "Unable to check out visitor."
        );

    }

};

const handleRegistrationSubmit = async (form) => {

    try {

        setError("");

        // =====================================================
        // STEP 1 — CREATE VISITOR MASTER
        // =====================================================

        const visitorResponse =
            await createVisitor({

                visitor_name:
                    form.visitor_name,

                mobile:
                    form.mobile,

                email:
                    form.email || null,

                company_name:
                    form.company_name || null,

                id_type:
                    form.id_type || null,

                id_number:
                    form.id_number || null,

            });


        if (!visitorResponse.data?.success) {

            throw new Error(
                visitorResponse.data?.message ||
                "Unable to create visitor."
            );

        }


        const visitor =
            visitorResponse.data?.data;


        if (!visitor?.id) {

            throw new Error(
                "Visitor was created but visitor ID was not returned."
            );

        }


        console.log(
            "Visitor master created:",
            visitor
        );


        // =====================================================
        // STEP 2 — CREATE VISIT
        // =====================================================

        const visitResponse =
            await createVisit({

                visitor_id:
                    visitor.id,

                site_id:
                    Number(form.site_id),

                host_employee_id:
                    form.host_employee_id
                        ? Number(form.host_employee_id)
                        : null,

                purpose:
                    form.purpose,

                expected_date:
                    form.expected_date,

                expected_arrival_time:
                    form.expected_arrival_time,

                expected_departure_time:
                    form.expected_departure_time,

            });


        if (!visitResponse.data?.success) {

            throw new Error(
                visitResponse.data?.message ||
                "Visitor created, but visit could not be created."
            );

        }


        console.log(
            "Visit created:",
            visitResponse.data?.data
        );


        // =====================================================
        // STEP 3 — CLOSE MODAL
        // =====================================================

        setRegistrationOpen(false);


        // =====================================================
        // STEP 4 — REFRESH
        // =====================================================

        await loadDashboard();


        // =====================================================
        // STEP 5 — SUCCESS
        // =====================================================

        alert(
            "Visitor registered successfully."
        );


    } catch (err) {

        console.error(
            "Visitor registration error:",
            err
        );


        throw new Error(

            err.response?.data?.message ||

            err.message ||

            "Unable to register visitor."

        );

    }

};
const filteredVisitors =
    (dashboard?.today || []).filter(
        (visitor) => {

            // =================================================
            // TAB FILTER
            // =================================================

            if (activeTab === "pending") {

                if (
                    visitor.approval_status !==
                    "Pending"
                ) {
                    return false;
                }

            }


if (activeTab === "approved") {

    if (
        visitor.approval_status !== "Approved"
    ) {
        return false;
    }

}


            if (activeTab === "inside") {

                if (
                    visitor.visit_status !==
                    "Inside"
                ) {
                    return false;
                }

            }


            if (activeTab === "completed") {

                if (
                    visitor.visit_status !==
                    "Completed"
                ) {
                    return false;
                }

            }


            if (activeTab === "cancelled") {

                if (
                    visitor.visit_status !==
                    "Cancelled"
                ) {
                    return false;
                }

            }


            if (activeTab === "expired") {

                if (
                    visitor.visit_status !==
                    "Expired"
                ) {
                    return false;
                }

            }


            // =================================================
            // SITE FILTER
            // =================================================

            if (
                selectedSiteId &&
                String(visitor.site_id) !==
                String(selectedSiteId)
            ) {
                return false;
            }


            // =================================================
            // SEARCH
            // =================================================

            if (search.trim()) {

                const value =
                    search
                        .trim()
                        .toLowerCase();


                const searchable = [

                    visitor.visitor_name,

                    visitor.visitor_code,

                    visitor.visit_code,

                    visitor.mobile,

                    visitor.visitor_company,

                    visitor.company_name,

                    visitor.site_name,

                    visitor.host_name,

                    visitor.purpose

                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();


                if (
                    !searchable.includes(value)
                ) {
                    return false;
                }

            }


            // =================================================
            // DATE
            // =================================================

            if (
                selectedDate &&
                visitor.expected_date !==
                selectedDate
            ) {
                return false;
            }


            return true;

        }
    );
// =========================================================
// LOADING
// =========================================================

if (loading) {

    return (

        <DashboardLayout
            title="Visitor Management"
        >

            <div className="gx-visitor-page">

                <div className="gx-visitor-loading">

                    <div className="gx-visitor-loading-spinner" />

                    <div>
                        <strong>
                            Loading Visitor Operations
                        </strong>

                        <span>
                            Preparing live visitor information...
                        </span>
                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}


// =========================================================
// PAGE
// =========================================================

return (

    <DashboardLayout
        title="Visitor Management"
    >

        <div className="gx-visitor-page">


            {/* =================================================
                COMMAND HERO
            ================================================= */}

            <section className="gx-visitor-command">

                <div className="gx-visitor-command-decoration gx-decoration-one" />
                <div className="gx-visitor-command-decoration gx-decoration-two" />

                <div className="gx-visitor-command-content">

                    <div className="gx-visitor-command-left">

                        <div className="gx-visitor-command-label">

                            <span className="gx-command-pulse" />

                            VISITOR OPERATIONS

                        </div>


                        <h1>
                            Visitor Command Center
                        </h1>


                        <p>
                            Manage visitor access, approvals and
                            movement across your assigned security sites.
                        </p>


                        <div className="gx-visitor-command-status">

                            <div className="gx-command-status-item">

                                <span className="gx-command-live-dot" />

                                <div>
                                    <small>
                                        SYSTEM
                                    </small>

                                    <strong>
                                        Live
                                    </strong>
                                </div>

                            </div>


                            <div className="gx-command-divider" />


                            <div className="gx-command-status-item">

                                <div>
                                    <small>
                                        CURRENTLY INSIDE
                                    </small>

                                    <strong>
                                        {
                                            dashboard?.summary?.inside ||
                                            0
                                        } Visitors
                                    </strong>
                                </div>

                            </div>


                            <div className="gx-command-divider" />


                            <div className="gx-command-status-item">

                                <div>
                                    <small>
                                        PENDING APPROVAL
                                    </small>

                                    <strong>
                                        {
                                            dashboard?.summary?.pending ||
                                            0
                                        } Visits
                                    </strong>
                                </div>

                            </div>

                        </div>

                    </div>


                    <div className="gx-visitor-command-actions">

                        <button
                            className="gx-visitor-refresh"
                            onClick={loadDashboard}
                            type="button"
                        >

                            <FaSyncAlt />

                            Refresh

                        </button>


                        <button
                            className="gx-visitor-register"
                            onClick={() =>
                                setRegistrationOpen(true)
                            }
                            type="button"
                        >

                            <span className="gx-register-icon">
                                <FaUserPlus />
                            </span>

                            <span>
                                <small>
                                    NEW ENTRY
                                </small>

                                <strong>
                                    Register Visitor
                                </strong>
                            </span>

                        </button>

                    </div>

                </div>


                {/* =================================================
                    HERO QUICK METRICS
                ================================================= */}

                <div className="gx-command-metrics">

                    <div className="gx-command-metric">

                        <span>
                            TOTAL VISITS
                        </span>

                        <strong>
                            {
                                dashboard?.summary?.total ||
                                0
                            }
                        </strong>

                        <small>
                            All visitor records
                        </small>

                    </div>


                    <div className="gx-command-metric pending">

                        <span>
                            PENDING
                        </span>

                        <strong>
                            {
                                dashboard?.summary?.pending ||
                                0
                            }
                        </strong>

                        <small>
                            Awaiting approval
                        </small>

                    </div>


                    <div className="gx-command-metric approved">

                        <span>
                            APPROVED
                        </span>

                        <strong>
                            {
                                dashboard?.summary?.approved ||
                                0
                            }
                        </strong>

                        <small>
                            Ready for entry
                        </small>

                    </div>


                    <div className="gx-command-metric live">

                        <div className="gx-command-metric-heading">

                            <span>
                                INSIDE
                            </span>

                            <em>
                                <i />
                                LIVE
                            </em>

                        </div>

                        <strong>
                            {
                                dashboard?.summary?.inside ||
                                0
                            }
                        </strong>

                        <small>
                            On site right now
                        </small>

                    </div>


                    <div className="gx-command-metric">

                        <span>
                            COMPLETED
                        </span>

                        <strong>
                            {
                                dashboard?.summary?.completed ||
                                0
                            }
                        </strong>

                        <small>
                            Checked out
                        </small>

                    </div>

                </div>

            </section>


            {/* =================================================
                ERROR
            ================================================= */}

            {error && (

                <div className="gx-visitor-error">

                    <div className="gx-visitor-error-icon">
                        !
                    </div>

                    <div>

                        <strong>
                            Visitor operation failed
                        </strong>

                        <span>
                            {error}
                        </span>

                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            setError("")
                        }
                    >
                        ×
                    </button>

                </div>

            )}


            {/* =================================================
                SECONDARY STATISTICS

                KEEPING EXISTING COMPONENT.
                WE WILL REDESIGN THIS COMPONENT NEXT.
            ================================================= */}
{/* 
            <VisitorStats
                summary={
                    dashboard?.summary
                }
            /> */}


            {/* =================================================
                OPERATIONS WORKSPACE
            ================================================= */}

            <section className="gx-visitor-panel">


                {/* =================================================
                    PANEL HEADER
                ================================================= */}

                <div className="gx-visitor-panel-header">

                    <div className="gx-visitor-panel-heading">

                        <div className="gx-panel-eyebrow">

                            <span />

                            LIVE OPERATIONS

                        </div>


                        <h2>
                            Today's Visitors
                        </h2>


                        <p>
                            Review scheduled visitors, approve access
                            and monitor active site movement.
                        </p>

                    </div>


                    <div className="gx-visitor-panel-summary">

                        <div className="gx-panel-summary-live">

                            <span />

                            <div>

                                <small>
                                    ON SITE NOW
                                </small>

                                <strong>
                                    {
                                        dashboard?.summary?.inside ||
                                        0
                                    }
                                </strong>

                            </div>

                        </div>


                        <div className="gx-panel-summary-divider" />


                        <div className="gx-panel-summary-count">

                            <small>
                                SHOWING
                            </small>

                            <strong>
                                {
                                    filteredVisitors.length
                                }
                            </strong>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    TABS
                ================================================= */}

                <div className="gx-visitor-tabs-section">

                    <VisitorTabs
                        activeTab={activeTab}
                        onChange={setActiveTab}
                        summary={
                            dashboard?.summary
                        }
                    />

                </div>


                {/* =================================================
                    FILTER AREA
                ================================================= */}

                <div className="gx-visitor-filter-section">

                    <div className="gx-filter-section-heading">

                        <div>

                            <span>
                                FIND A VISITOR
                            </span>

                            <strong>
                                Search & Filter
                            </strong>

                        </div>


                        {(
                            search ||
                            selectedSiteId ||
                            selectedDate
                        ) && (

                            <button
                                type="button"
                                className="gx-clear-all-filters"
                                onClick={() => {

                                    setSearch("");

                                    setSelectedSiteId("");

                                    setSelectedDate("");

                                }}
                            >
                                Clear all
                            </button>

                        )}

                    </div>


                    <VisitorFilters

                        search={search}

                        setSearch={setSearch}

                        siteId={
                            selectedSiteId
                        }

                        setSiteId={
                            setSelectedSiteId
                        }

                        date={
                            selectedDate
                        }

                        setDate={
                            setSelectedDate
                        }

                        sites={sites}

                    />

                </div>


                {/* =================================================
                    RESULT BAR
                ================================================= */}

                <div className="gx-visitor-result-bar">

                    <div>

                        <span className="gx-result-indicator" />

                        <strong>
                            {
                                filteredVisitors.length
                            }
                        </strong>

                        <span>
                            visitor{
                                filteredVisitors.length === 1
                                    ? ""
                                    : "s"
                            } found
                        </span>

                    </div>


                    <div className="gx-result-context">

                        {activeTab !== "all" && (

                            <span className="gx-result-filter-chip">

                                Status:

                                <strong>
                                    {activeTab}
                                </strong>

                            </span>

                        )}


                        {selectedSiteId && (

                            <span className="gx-result-filter-chip">
                                Site filtered
                            </span>

                        )}


                        {selectedDate && (

                            <span className="gx-result-filter-chip">
                                {selectedDate}
                            </span>

                        )}

                    </div>

                </div>


                {/* =================================================
                    VISITOR LIST

                    EXISTING FUNCTIONAL COMPONENT.
                ================================================= */}

                <div className="gx-visitor-list-area">

                    <VisitorList

                        visitors={
                            filteredVisitors
                        }

                        onView={
                            handleView
                        }

                        onApprove={
                            handleApprove
                        }

                        onReject={
                            handleReject
                        }

                        onCheckIn={
                            handleCheckIn
                        }

                        onCheckOut={
                            handleCheckOut
                        }

                        canApprove={
                            canApprove
                        }

                        canCheckIn={
                            canCheckIn
                        }

                        canCheckOut={
                            canCheckOut
                        }

                    />

                </div>

            </section>


            {/* =================================================
                DETAILS DRAWER
            ================================================= */}

            <VisitorDetailsDrawer
                visitor={
                    selectedVisitor
                }
                onClose={
                    handleCloseDrawer
                }
            />


            {/* =================================================
                REGISTRATION
            ================================================= */}

            {registrationOpen && (

                <VisitorRegistrationModal

                    onClose={() =>
                        setRegistrationOpen(false)
                    }

                    onSubmit={
                        handleRegistrationSubmit
                    }

                    sites={sites}

                    employees={
                        employees
                    }

                />

            )}

        </div>

    </DashboardLayout>

);
}