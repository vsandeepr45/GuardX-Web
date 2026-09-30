import React, {
    useCallback,
    useEffect,
    useMemo,
    useState
} from "react";

import {
    FaSyncAlt,
    FaEye,
    FaCheck,
    FaTimes,
    FaSearch
} from "react-icons/fa";

import DashboardLayout
    from "../../layouts/DashboardLayout";

import VisitorDetailsDrawer
    from "../../components/Visitors/VisitorDetailsDrawer";

import {
    getSupervisorVisitorDashboard,
    updateVisitApproval
} from "../../api/visitorApi";

import "../../styles/VisitorSupervisorDashboard.css";


export default function VisitorSupervisorDashboard() {

    // =========================================================
    // STATE
    // =========================================================

    const [dashboard, setDashboard] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [refreshing, setRefreshing] =
        useState(false);

    const [error, setError] =
        useState("");

    const [activeTab, setActiveTab] =
        useState("pending");

    const [search, setSearch] =
        useState("");

    const [siteId, setSiteId] =
        useState("");

    const [selectedVisitor, setSelectedVisitor] =
        useState(null);


    // =========================================================
    // LOAD DASHBOARD
    // =========================================================

    const loadDashboard = useCallback(
        async (isRefresh = false) => {

            try {

                setError("");

                if (isRefresh) {
                    setRefreshing(true);
                } else {
                    setLoading(true);
                }

                const response =
                    await getSupervisorVisitorDashboard();

                if (
                    response.data?.success
                ) {

                    setDashboard(
                        response.data.data
                    );

                } else {

                    throw new Error(
                        response.data?.message ||
                        "Unable to load supervisor visitor dashboard."
                    );

                }

            } catch (err) {

                console.error(
                    "Supervisor visitor dashboard error:",
                    err
                );

                setError(
                    err.response?.data?.message ||
                    err.message ||
                    "Unable to load supervisor visitor dashboard."
                );

            } finally {

                setLoading(false);
                setRefreshing(false);

            }

        },
        []
    );


    // =========================================================
    // INITIAL LOAD
    // =========================================================

    useEffect(() => {

        loadDashboard();

    }, [loadDashboard]);


    // =========================================================
    // VISITOR DETAILS
    // =========================================================

    const handleView = (visitor) => {

        setSelectedVisitor(visitor);

    };


    // =========================================================
    // APPROVE
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

            await loadDashboard(true);

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
    // REJECT
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

            await loadDashboard(true);

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
    // FILTER VISITORS
    // =========================================================

    const filteredVisitors = useMemo(() => {

        const visitors =
            dashboard?.visitors || [];

        return visitors.filter(
            (visitor) => {

                // -------------------------------------------------
                // TAB
                // -------------------------------------------------

                if (
                    activeTab === "pending" &&
                    visitor.approval_status !== "Pending"
                ) {
                    return false;
                }


                if (
                    activeTab === "approved" &&
                    !(
                        visitor.approval_status === "Approved" &&
                        visitor.visit_status === "Approved"
                    )
                ) {
                    return false;
                }


                if (
                    activeTab === "inside" &&
                    visitor.visit_status !== "Inside"
                ) {
                    return false;
                }


                if (
                    activeTab === "completed" &&
                    visitor.visit_status !== "Completed"
                ) {
                    return false;
                }


                if (
                    activeTab === "cancelled" &&
                    visitor.visit_status !== "Cancelled"
                ) {
                    return false;
                }


                if (
                    activeTab === "all"
                ) {
                    // no status filtering
                }


                // -------------------------------------------------
                // SITE
                // -------------------------------------------------

                if (
                    siteId &&
                    String(visitor.site_id) !==
                    String(siteId)
                ) {
                    return false;
                }


                // -------------------------------------------------
                // SEARCH
                // -------------------------------------------------

                if (search.trim()) {

                    const query =
                        search.trim().toLowerCase();

                    const searchable = [

                        visitor.visit_code,

                        visitor.visitor_code,

                        visitor.visitor_name,

                        visitor.mobile,

                        visitor.email,

                        visitor.visitor_company,

                        visitor.site_name,

                        visitor.host_name,

                        visitor.purpose

                    ]
                        .filter(Boolean)
                        .join(" ")
                        .toLowerCase();


                    if (
                        !searchable.includes(query)
                    ) {
                        return false;
                    }

                }


                return true;

            }
        );

    }, [
        dashboard,
        activeTab,
        search,
        siteId
    ]);


    // =========================================================
    // TAB COUNTS
    // =========================================================

    const summary =
        dashboard?.summary || {};


    const tabs = [

        {
            key: "pending",
            label: "Pending",
            count: summary.pending || 0
        },

        {
            key: "approved",
            label: "Approved",
            count: summary.approved || 0
        },

        {
            key: "inside",
            label: "Inside",
            count: summary.inside || 0
        },

        {
            key: "completed",
            label: "Completed",
            count: summary.completed || 0
        },

        {
            key: "cancelled",
            label: "Cancelled",
            count: summary.cancelled || 0
        },

        {
            key: "all",
            label: "All",
            count: summary.total || 0
        }

    ];


    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {

        return (

            <DashboardLayout
                title="Visitor Approvals"
            >

                <div className="gx-supervisor-loading">

                    Loading Visitor Approvals...

                </div>

            </DashboardLayout>

        );

    }


    // =========================================================
    // PAGE
    // =========================================================

    return (

        <DashboardLayout
            title="Visitor Approvals"
        >

            <div className="gx-supervisor-visitor-page">

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="gx-supervisor-header">

                    <div>

                        <div className="gx-supervisor-eyebrow">
                            SUPERVISOR OPERATIONS
                        </div>

                        <h1>
                            Visitor Approvals
                        </h1>

                        <p>
                            Review and authorize visitor access
                            for your assigned sites.
                        </p>

                    </div>


                    <button
                        type="button"
                        className="gx-supervisor-refresh"
                        onClick={() =>
                            loadDashboard(true)
                        }
                        disabled={refreshing}
                    >

                        <FaSyncAlt
                            className={
                                refreshing
                                    ? "gx-spin"
                                    : ""
                            }
                        />

                        {refreshing
                            ? "Refreshing..."
                            : "Refresh"}

                    </button>

                </div>


                {/* =================================================
                    ERROR
                ================================================= */}

                {error && (

                    <div className="gx-supervisor-error">
                        {error}
                    </div>

                )}


                {/* =================================================
                    SUMMARY
                ================================================= */}

                <div className="gx-supervisor-summary">

                    <div className="gx-supervisor-stat">

                        <span>
                            Total Visitors
                        </span>

                        <strong>
                            {summary.total || 0}
                        </strong>

                    </div>


                    <div className="gx-supervisor-stat pending">

                        <span>
                            Pending Approval
                        </span>

                        <strong>
                            {summary.pending || 0}
                        </strong>

                    </div>


                    <div className="gx-supervisor-stat">

                        <span>
                            Approved
                        </span>

                        <strong>
                            {summary.approved || 0}
                        </strong>

                    </div>


                    <div className="gx-supervisor-stat">

                        <span>
                            Currently Inside
                        </span>

                        <strong>
                            {summary.inside || 0}
                        </strong>

                    </div>


                    <div className="gx-supervisor-stat">

                        <span>
                            Completed
                        </span>

                        <strong>
                            {summary.completed || 0}
                        </strong>

                    </div>

                </div>


                {/* =================================================
                    MAIN PANEL
                ================================================= */}

                <div className="gx-supervisor-panel">

                    <div className="gx-supervisor-panel-header">

                        <div>

                            <h2>
                                Visitor Operations
                            </h2>

                            <p>
                                Visitors from sites currently
                                assigned to you.
                            </p>

                        </div>

                    </div>


                    {/* =================================================
                        TABS
                    ================================================= */}

                    <div className="gx-supervisor-tabs">

                        {tabs.map((tab) => (

                            <button
                                key={tab.key}
                                type="button"
                                className={
                                    activeTab === tab.key
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    setActiveTab(tab.key)
                                }
                            >

                                <span>
                                    {tab.label}
                                </span>

                                <span className="count">
                                    {tab.count}
                                </span>

                            </button>

                        ))}

                    </div>


                    {/* =================================================
                        FILTERS
                    ================================================= */}

                    <div className="gx-supervisor-filters">

                        <div className="gx-supervisor-search">

                            <FaSearch />

                            <input
                                type="text"
                                placeholder="Search visitor, code, mobile, company..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                            />

                        </div>


                        <select
                            value={siteId}
                            onChange={(e) =>
                                setSiteId(
                                    e.target.value
                                )
                            }
                        >

                            <option value="">
                                All Assigned Sites
                            </option>

                            {(
                                dashboard?.sites ||
                                []
                            ).map((site) => (

                                <option
                                    key={site.site_id}
                                    value={site.site_id}
                                >
                                    {site.site_name}
                                </option>

                            ))}

                        </select>

                    </div>


                    {/* =================================================
                        TABLE
                    ================================================= */}

                    <div className="gx-supervisor-table-wrapper">

                        <table className="gx-supervisor-table">

                            <thead>

                                <tr>

                                    <th>
                                        Visitor
                                    </th>

                                    <th>
                                        Site
                                    </th>

                                    <th>
                                        Host
                                    </th>

                                    <th>
                                        Purpose
                                    </th>

                                    <th>
                                        Expected
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

                                {filteredVisitors.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="7"
                                            className="gx-supervisor-empty"
                                        >

                                            No visitors found.

                                        </td>

                                    </tr>

                                ) : (

                                    filteredVisitors.map(
                                        (visitor) => (

                                            <tr
                                                key={visitor.id}
                                            >

                                                <td>

                                                    <strong>
                                                        {
                                                            visitor.visitor_name
                                                        }
                                                    </strong>

                                                    <small>
                                                        {
                                                            visitor.visit_code
                                                        }
                                                    </small>

                                                </td>


                                                <td>

                                                    {
                                                        visitor.site_name ||
                                                        "—"
                                                    }

                                                </td>


                                                <td>

                                                    {
                                                        visitor.host_name ||
                                                        "—"
                                                    }

                                                </td>


                                                <td>

                                                    {
                                                        visitor.purpose ||
                                                        "General Visit"
                                                    }

                                                </td>


                                                <td>

                                                    {
                                                        visitor.expected_arrival_time ||
                                                        "—"
                                                    }

                                                </td>


                                                <td>

                                                    <span
                                                        className={
                                                            `gx-supervisor-status gx-status-${String(
                                                                visitor.visit_status ||
                                                                visitor.approval_status ||
                                                                ""
                                                            )
                                                                .toLowerCase()
                                                                .replace(
                                                                    /\s+/g,
                                                                    "-"
                                                                )}`
                                                        }
                                                    >
                                                        {
                                                            visitor.visit_status ||
                                                            visitor.approval_status ||
                                                            "Pending"
                                                        }
                                                    </span>

                                                </td>


                                                <td>

                                                    <div className="gx-supervisor-actions">

                                                        <button
                                                            type="button"
                                                            className="view"
                                                            onClick={() =>
                                                                handleView(
                                                                    visitor
                                                                )
                                                            }
                                                        >
                                                            <FaEye />
                                                            View
                                                        </button>


                                                        {visitor.approval_status === "Pending" && (

                                                            <>

                                                                <button
                                                                    type="button"
                                                                    className="approve"
                                                                    onClick={() =>
                                                                        handleApprove(
                                                                            visitor
                                                                        )
                                                                    }
                                                                >
                                                                    <FaCheck />
                                                                    Approve
                                                                </button>


                                                                <button
                                                                    type="button"
                                                                    className="reject"
                                                                    onClick={() =>
                                                                        handleReject(
                                                                            visitor
                                                                        )
                                                                    }
                                                                >
                                                                    <FaTimes />
                                                                    Reject
                                                                </button>

                                                            </>

                                                        )}

                                                    </div>

                                                </td>

                                            </tr>

                                        )
                                    )

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>


                {/* =================================================
                    DETAILS DRAWER
                ================================================= */}

                <VisitorDetailsDrawer
                    visitor={selectedVisitor}
                    onClose={() =>
                        setSelectedVisitor(null)
                    }
                />

            </div>

        </DashboardLayout>

    );

}