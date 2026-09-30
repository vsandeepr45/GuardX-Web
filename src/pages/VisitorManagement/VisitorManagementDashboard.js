import React, {
    useCallback,
    useEffect,
    useMemo,
    useState
} from "react";

import DashboardLayout
    from "../../layouts/DashboardLayout";
import {
    useSearchParams
} from "react-router-dom";
import {
    getVisitorDashboard
} from "../../api/visitorApi";

import {
    FaUsers,
    FaClock,
    FaCheckCircle,
    FaSignInAlt,
    FaSignOutAlt,
    FaBan,
    FaHourglassEnd,
    FaSearch,
    FaSyncAlt,
    FaMapMarkerAlt,
    FaUserTie,
    FaEye,
    FaEnvelope,
    FaMobileAlt,
    FaCalendarAlt,
    FaIdBadge,
    FaSpinner,
    FaTimes,
    FaArrowRight
} from "react-icons/fa";

import axios from "axios";

import "../../styles/VisitorManagementDashboard.css";


/* ============================================================
   API
   ============================================================ */

const API =
    "http://127.0.0.1:5001/api";


function getHeaders() {

    return {
        headers: {
            Authorization:
                `Bearer ${localStorage.getItem("token")}`
        }
    };

}


/* ============================================================
   DATE HELPERS
   ============================================================ */

function formatDate(value) {

    if (!value) {
        return "--";
    }

    const date =
        new Date(value);

    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return value;
    }

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


function formatDateTime(value) {

    if (!value) {
        return "--";
    }

    const date =
        new Date(value);

    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return value;
    }

    return date.toLocaleString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }
    );

}


/* ============================================================
   STATUS
   ============================================================ */

function statusClass(
    approvalStatus,
    visitStatus
) {

    if (
        visitStatus === "Inside"
    ) {
        return "status-inside";
    }

    if (
        visitStatus === "Completed"
    ) {
        return "status-completed";
    }

    if (
        visitStatus === "Cancelled"
        ||
        approvalStatus === "Rejected"
    ) {
        return "status-cancelled";
    }

    if (
        visitStatus === "Expired"
    ) {
        return "status-expired";
    }

    if (
        approvalStatus === "Pending"
    ) {
        return "status-pending";
    }

    if (
        approvalStatus === "Approved"
    ) {
        return "status-approved";
    }

    return "status-pending";
}


/* ============================================================
   INITIALS
   ============================================================ */

function getInitials(name) {

    if (!name) {
        return "V";
    }

    const parts =
        String(name)
            .trim()
            .split(/\s+/)
            .filter(Boolean);

    if (parts.length === 1) {

        return parts[0]
            .charAt(0)
            .toUpperCase();

    }

    return (
        parts[0].charAt(0) +
        parts[parts.length - 1].charAt(0)
    ).toUpperCase();
}


/* ============================================================
   MAIN COMPONENT
   ============================================================ */

export default function VisitorManagementDashboard() {

    const [
        summary,
        setSummary
    ] = useState({});


    const [
        visitors,
        setVisitors
    ] = useState([]);


    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        error,
        setError
    ] = useState("");


    const [
        activeTab,
        setActiveTab
    ] = useState("all");


    const [
        search,
        setSearch
    ] = useState("");


    const [
        selectedVisitor,
        setSelectedVisitor
    ] = useState(null);
const [searchParams] = useSearchParams();

const visitId = searchParams.get("visitId");

    /* ========================================================
       LOAD DASHBOARD
       ======================================================== */

    const loadDashboard =
        useCallback(async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await axios.get(
                        `${API}/visitor-management/dashboard`,
                        getHeaders()
                    );


                if (
                    !response.data?.success
                ) {

                    throw new Error(
                        response.data?.message ||
                        "Unable to load visitor management."
                    );

                }


                setSummary(
                    response.data.data?.summary || {}
                );


                setVisitors(
                    response.data.data?.visits || []
                );


            } catch (err) {

                console.error(
                    "Visitor management error:",
                    err
                );


                setError(
                    err.response?.data?.message ||
                    err.message ||
                    "Unable to load visitor management."
                );


            } finally {

                setLoading(false);

            }

        }, []);


    /* ========================================================
       INITIAL LOAD
       ======================================================== */

    useEffect(() => {

        loadDashboard();

    }, [loadDashboard]);

useEffect(() => {

    if (!visitId || !visitors.length) {
        return;
    }

    const targetVisitor = visitors.find(
        visitor =>
            String(visitor.id) === String(visitId)
    );

    if (targetVisitor) {

        setSelectedVisitor(
            targetVisitor
        );

    }

}, [visitId, visitors]);
    /* ========================================================
       FILTER
       ======================================================== */

    const filteredVisitors =
        useMemo(() => {

            let result = [
                ...visitors
            ];


            /* -----------------------------------------------
               TAB FILTER
            ----------------------------------------------- */

            if (
                activeTab === "pending"
            ) {

                result =
                    result.filter(
                        item =>
                            item.approval_status ===
                            "Pending"
                    );

            }


            else if (
                activeTab === "approved"
            ) {

                result =
                    result.filter(
                        item =>
                            item.approval_status ===
                            "Approved" &&
                            item.visit_status ===
                            "Pending"
                    );

            }


            else if (
                activeTab === "inside"
            ) {

                result =
                    result.filter(
                        item =>
                            item.visit_status ===
                            "Inside"
                    );

            }


            else if (
                activeTab === "completed"
            ) {

                result =
                    result.filter(
                        item =>
                            item.visit_status ===
                            "Completed"
                    );

            }


            else if (
                activeTab === "cancelled"
            ) {

                result =
                    result.filter(
                        item =>
                            item.visit_status ===
                                "Cancelled"
                            ||
                            item.approval_status ===
                                "Rejected"
                    );

            }


            else if (
                activeTab === "expired"
            ) {

                result =
                    result.filter(
                        item =>
                            item.visit_status ===
                            "Expired"
                    );

            }


            /* -----------------------------------------------
               SEARCH
            ----------------------------------------------- */

            const query =
                search
                    .trim()
                    .toLowerCase();


            if (query) {

                result =
                    result.filter(
                        item => {

                            const values = [

                                item.visitor_name,

                                item.visitor_code,

                                item.mobile,

                                item.visitor_company,

                                item.company_name,

                                item.site_name,

                                item.host_name,

                                item.visit_code

                            ];


                            return values.some(
                                value =>
                                    String(
                                        value || ""
                                    )
                                    .toLowerCase()
                                    .includes(query)
                            );

                        }
                    );

            }


            return result;

        }, [
            visitors,
            activeTab,
            search
        ]);


    /* ========================================================
       SUMMARY CARDS
       ======================================================== */

    const cards = [

        {
            key: "total",
            title: "Total Visits",
            description: "All visitor records",
            value: summary.total || 0,
            icon: FaUsers,
            tone: "tone-blue"
        },

        {
            key: "today",
            title: "Today",
            description: "Expected today",
            value: summary.today || 0,
            icon: FaClock,
            tone: "tone-amber"
        },

        {
            key: "pending",
            title: "Pending",
            description: "Awaiting approval",
            value: summary.pending || 0,
            icon: FaHourglassEnd,
            tone: "tone-amber"
        },

        {
            key: "approved",
            title: "Approved",
            description: "Ready for check-in",
            value: summary.approved || 0,
            icon: FaCheckCircle,
            tone: "tone-green"
        },

        {
            key: "inside",
            title: "Currently Inside",
            description: "Live site occupancy",
            value: summary.inside || 0,
            icon: FaSignInAlt,
            tone: "tone-live",
            live: true
        },

        {
            key: "completed",
            title: "Completed",
            description: "Visits checked out",
            value: summary.completed || 0,
            icon: FaSignOutAlt,
            tone: "tone-blue"
        },

        {
            key: "cancelled",
            title: "Cancelled",
            description: "Rejected or cancelled",
            value: summary.cancelled || 0,
            icon: FaBan,
            tone: "tone-red"
        },

        {
            key: "expired",
            title: "Expired",
            description: "Visit window expired",
            value: summary.expired || 0,
            icon: FaHourglassEnd,
            tone: "tone-red"
        }

    ];


    /* ========================================================
       TABS
       ======================================================== */

    const tabs = [

        [
            "all",
            "All",
            summary.total || 0
        ],

        [
            "pending",
            "Pending",
            summary.pending || 0
        ],

        [
            "approved",
            "Approved",
            summary.approved || 0
        ],

        [
            "inside",
            "Inside",
            summary.inside || 0
        ],

        [
            "completed",
            "Completed",
            summary.completed || 0
        ],

        [
            "cancelled",
            "Cancelled",
            summary.cancelled || 0
        ],

        [
            "expired",
            "Expired",
            summary.expired || 0
        ]

    ];


    /* ========================================================
       LOADING
       ======================================================== */

    if (loading) {

        return (

            <DashboardLayout
                title="Visitor Management"
            >

                <div className="gx-vm-page">

                    <div className="gx-vm-loading-head">

                        <div className="gx-vm-skeleton gx-vm-skeleton-kicker" />

                        <div className="gx-vm-skeleton gx-vm-skeleton-title" />

                        <div className="gx-vm-skeleton gx-vm-skeleton-subtitle" />

                    </div>


                    <div className="gx-vm-summary">

                        {Array.from({
                            length: 8
                        }).map(
                            (_, index) => (

                                <div
                                    key={index}
                                    className="gx-vm-skeleton gx-vm-skeleton-card"
                                />

                            )
                        )}

                    </div>


                    <div className="gx-vm-skeleton gx-vm-skeleton-panel" />

                </div>

            </DashboardLayout>

        );

    }


    /* ========================================================
       PAGE
       ======================================================== */

    return (

        <DashboardLayout
            title="Visitor Management"
        >

            <div className="gx-vm-page">


                {/* =================================================
                    HERO
                ================================================= */}

                <div className="gx-vm-hero">

                    <div className="gx-vm-hero-copy">

                        <div className="gx-vm-eyebrow">

                            <span className="gx-vm-eyebrow-dot" />

                            SECURITY OPERATIONS

                        </div>


                        <h1>
                            Visitor Management
                        </h1>


                        <p>
                            Monitor visitor activity
                            across all accessible sites.
                        </p>


                        <div className="gx-vm-sync">

                            <span className="gx-vm-sync-dot" />

                            Live visitor operations

                        </div>

                    </div>


                    <div className="gx-vm-hero-actions">

                        <button
                            type="button"
                            className="gx-vm-refresh"
                            onClick={loadDashboard}
                            disabled={loading}
                        >

                            <FaSyncAlt />

                            Refresh

                        </button>

                    </div>

                </div>


                {/* =================================================
                    ERROR
                ================================================= */}

                {error && (

                    <div className="gx-vm-error">

                        <FaBan />

                        <div>

                            <strong>
                                Unable to load visitor data
                            </strong>

                            <span>
                                {error}
                            </span>

                        </div>


                        <button
                            type="button"
                            onClick={loadDashboard}
                        >
                            Retry
                        </button>

                    </div>

                )}


                {/* =================================================
                    SUMMARY
                ================================================= */}

                <div className="gx-vm-summary">

                    {cards.map(
                        card => {

                            const Icon =
                                card.icon;


                            return (

                                <div
                                    key={card.key}
                                    className={
                                        `gx-vm-summary-card ${card.tone}`
                                    }
                                >

                                    <div className="gx-vm-summary-top">

                                        <div className="gx-vm-summary-icon">

                                            <Icon />

                                        </div>


                                        {card.live && (

                                            <div className="gx-vm-live-badge">

                                                <span />

                                                LIVE

                                            </div>

                                        )}

                                    </div>


                                    <div className="gx-vm-summary-value">

                                        {card.value}

                                    </div>


                                    <div className="gx-vm-summary-title">

                                        {card.title}

                                    </div>


                                    <div className="gx-vm-summary-description">

                                        {card.description}

                                    </div>

                                </div>

                            );

                        }
                    )}

                </div>


                {/* =================================================
                    MAIN PANEL
                ================================================= */}

                <div className="gx-vm-panel">


                    {/* =================================================
                        PANEL HEADER
                    ================================================= */}

                    <div className="gx-vm-panel-head">

                        <div>

                            <div className="gx-vm-section-label">

                                VISITOR OPERATIONS

                            </div>


                            <h2>
                                Visitor Activity
                            </h2>


                            <p>
                                Review and monitor visitor movement across accessible sites.
                            </p>

                        </div>


                        <button
                            type="button"
                            className="gx-vm-history-btn"
                            onClick={() =>
                                window.location.href =
                                    "/visitor-management/history"
                            }
                        >

                            View Full History

                            <FaArrowRight />

                        </button>

                    </div>


                    {/* =================================================
                        TABS
                    ================================================= */}

                    <div className="gx-vm-tabs-wrap">

                        <div className="gx-vm-tabs">

                            {tabs.map(
                                tab => (

                                    <button
                                        key={tab[0]}
                                        type="button"
                                        className={
                                            activeTab === tab[0]
                                                ? "gx-vm-tab active"
                                                : "gx-vm-tab"
                                        }
                                        onClick={() =>
                                            setActiveTab(
                                                tab[0]
                                            )
                                        }
                                    >

                                        <span>
                                            {tab[1]}
                                        </span>


                                        <strong>
                                            {tab[2]}
                                        </strong>

                                    </button>

                                )
                            )}

                        </div>

                    </div>


                    {/* =================================================
                        SEARCH / TOOLBAR
                    ================================================= */}

                    <div className="gx-vm-toolbar">

                        <div className="gx-vm-search">

                            <FaSearch />


                            <input
                                type="text"
                                placeholder="Search visitor, code, mobile, company, site or host..."
                                value={search}
                                onChange={e =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                            />


                            {search && (

                                <button
                                    type="button"
                                    className="gx-vm-search-clear"
                                    onClick={() =>
                                        setSearch("")
                                    }
                                    aria-label="Clear search"
                                >

                                    <FaTimes />

                                </button>

                            )}

                        </div>


                        <div className="gx-vm-result-meta">

                            Showing

                            <strong>
                                {
                                    filteredVisitors.length
                                }
                            </strong>

                            of

                            <strong>
                                {
                                    visitors.length
                                }
                            </strong>

                            visits

                        </div>

                    </div>


                    {/* =================================================
                        TABLE
                    ================================================= */}

                    <div className="gx-vm-table-wrapper">

                        <table className="gx-vm-table">

                            <thead>

                                <tr>

                                    <th>
                                        Visitor
                                    </th>

                                    <th>
                                        Visit
                                    </th>

                                    <th>
                                        Site
                                    </th>

                                    <th>
                                        Host
                                    </th>

                                    <th>
                                        Expected
                                    </th>

                                    <th>
                                        Check In
                                    </th>

                                    <th>
                                        Check Out
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
                                            colSpan="9"
                                            className="gx-vm-empty"
                                        >

                                            <div className="gx-vm-empty-icon">

                                                <FaUsers />

                                            </div>


                                            <h3>
                                                No visitors found
                                            </h3>


                                            <p>
                                                There are no visitor records matching the current tab or search criteria.
                                            </p>


                                            {(search ||
                                                activeTab !== "all") && (

                                                <button
                                                    type="button"
                                                    onClick={() => {

                                                        setSearch("");

                                                        setActiveTab(
                                                            "all"
                                                        );

                                                    }}
                                                >
                                                    Clear filters
                                                </button>

                                            )}

                                        </td>

                                    </tr>

                                ) : (

                                    filteredVisitors.map(
                                        visitor => (

                                            <tr
                                                key={
                                                    visitor.id
                                                }
                                            >


                                                {/* VISITOR */}

                                                <td>

                                                    <div className="gx-vm-person">


                                                        {visitor.photo_path ? (

                                                            <img
                                                                className="gx-vm-avatar gx-vm-avatar-photo"
                                                                src={
                                                                    visitor.photo_path
                                                                }
                                                                alt=""
                                                            />

                                                        ) : (

                                                            <div className="gx-vm-avatar">

                                                                {
                                                                    getInitials(
                                                                        visitor.visitor_name
                                                                    )
                                                                }

                                                            </div>

                                                        )}


                                                        <div className="gx-vm-person-info">

                                                            <strong>

                                                                {
                                                                    visitor.visitor_name ||
                                                                    "--"
                                                                }

                                                            </strong>


                                                            <span>

                                                                {
                                                                    visitor.visitor_code ||
                                                                    "No visitor code"
                                                                }

                                                            </span>

                                                        </div>

                                                    </div>

                                                </td>


                                                {/* VISIT */}

                                                <td>

                                                    <div className="gx-vm-cell-main">

                                                        {
                                                            visitor.visit_code ||
                                                            "--"
                                                        }

                                                    </div>


                                                    <div className="gx-vm-cell-sub">

                                                        {
                                                            visitor.purpose ||
                                                            "General Visit"
                                                        }

                                                    </div>

                                                </td>


                                                {/* SITE */}

                                                <td>

                                                    <div className="gx-vm-site">

                                                        <FaMapMarkerAlt />

                                                        <span>

                                                            {
                                                                visitor.site_name ||
                                                                "--"
                                                            }

                                                        </span>

                                                    </div>

                                                </td>


                                                {/* HOST */}

                                                <td>

                                                    <div className="gx-vm-host">

                                                        <span className="gx-vm-host-avatar">

                                                            <FaUserTie />

                                                        </span>


                                                        <span>

                                                            {
                                                                visitor.host_name ||
                                                                "--"
                                                            }

                                                        </span>

                                                    </div>

                                                </td>


                                                {/* EXPECTED */}

                                                <td>

                                                    <div className="gx-vm-cell-main">

                                                        {
                                                            formatDate(
                                                                visitor.expected_date
                                                            )
                                                        }

                                                    </div>


                                                    <div className="gx-vm-cell-sub">

                                                        {
                                                            formatDateTime(
                                                                visitor.expected_arrival_time
                                                            )
                                                        }

                                                    </div>

                                                </td>


                                                {/* CHECK IN */}

                                                <td>

                                                    <div className="gx-vm-movement">

                                                        <span
                                                            className={
                                                                visitor.actual_check_in
                                                                    ? "done"
                                                                    : ""
                                                            }
                                                        >

                                                            {
                                                                visitor.actual_check_in
                                                                    ? "Checked in"
                                                                    : "Not checked in"
                                                            }

                                                        </span>


                                                        <small>

                                                            {
                                                                formatDateTime(
                                                                    visitor.actual_check_in
                                                                )
                                                            }

                                                        </small>

                                                    </div>

                                                </td>


                                                {/* CHECK OUT */}

                                                <td>

                                                    <div className="gx-vm-movement">

                                                        <span
                                                            className={
                                                                visitor.actual_check_out
                                                                    ? "done"
                                                                    : ""
                                                            }
                                                        >

                                                            {
                                                                visitor.actual_check_out
                                                                    ? "Checked out"
                                                                    : "Not checked out"
                                                            }

                                                        </span>


                                                        <small>

                                                            {
                                                                formatDateTime(
                                                                    visitor.actual_check_out
                                                                )
                                                            }

                                                        </small>

                                                    </div>

                                                </td>


                                                {/* STATUS */}

                                                <td>

                                                    <span
                                                        className={
                                                            `gx-vm-status ${
                                                                statusClass(
                                                                    visitor.approval_status,
                                                                    visitor.visit_status
                                                                )
                                                            }`
                                                        }
                                                    >

                                                        <span />

                                                        {
                                                            visitor.visit_status ||
                                                            visitor.approval_status ||
                                                            "Pending"
                                                        }

                                                    </span>

                                                </td>


                                                {/* ACTION */}

                                                <td>

                                                    <button
                                                        type="button"
                                                        className="gx-vm-view"
                                                        onClick={() =>
                                                            setSelectedVisitor(
                                                                visitor
                                                            )
                                                        }
                                                    >

                                                        <FaEye />

                                                        View

                                                    </button>

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

                {selectedVisitor && (

                    <div
                        className="gx-vm-drawer-backdrop"
                        onClick={() =>
                            setSelectedVisitor(null)
                        }
                    >

                        <div
                            className="gx-vm-drawer"
                            onClick={
                                e =>
                                    e.stopPropagation()
                            }
                        >


                            {/* DRAWER HEADER */}

                            <div className="gx-vm-drawer-head">

                                <div>

                                    <span>
                                        VISITOR DETAILS
                                    </span>


                                    <h2>

                                        {
                                            selectedVisitor.visitor_name ||
                                            "--"
                                        }

                                    </h2>


                                    <p>

                                        {
                                            selectedVisitor.visit_code ||
                                            "--"
                                        }

                                    </p>

                                </div>


                                <button
                                    type="button"
                                    className="gx-vm-drawer-close"
                                    onClick={() =>
                                        setSelectedVisitor(null)
                                    }
                                    aria-label="Close visitor details"
                                >

                                    <FaTimes />

                                </button>

                            </div>


                            <div className="gx-vm-drawer-body">


                                {/* PROFILE */}

                                <div className="gx-vm-profile-card">


                                    {selectedVisitor.photo_path ? (

                                        <img
                                            className="gx-vm-avatar gx-vm-avatar-large gx-vm-avatar-photo"
                                            src={
                                                selectedVisitor.photo_path
                                            }
                                            alt=""
                                        />

                                    ) : (

                                        <div className="gx-vm-avatar gx-vm-avatar-large">

                                            {
                                                getInitials(
                                                    selectedVisitor.visitor_name
                                                )
                                            }

                                        </div>

                                    )}


                                    <div className="gx-vm-profile-copy">

                                        <strong>

                                            {
                                                selectedVisitor.visitor_name ||
                                                "--"
                                            }

                                        </strong>


                                        <span>

                                            {
                                                selectedVisitor.visitor_code ||
                                                "No visitor code"
                                            }

                                        </span>

                                    </div>


                                    <span
                                        className={
                                            `gx-vm-status ${
                                                statusClass(
                                                    selectedVisitor.approval_status,
                                                    selectedVisitor.visit_status
                                                )
                                            }`
                                        }
                                    >

                                        <span />

                                        {
                                            selectedVisitor.visit_status ||
                                            selectedVisitor.approval_status ||
                                            "Pending"
                                        }

                                    </span>

                                </div>


                                {/* =================================================
                                    VISIT INFORMATION
                                ================================================= */}

                                <div className="gx-vm-detail-section">

                                    <div className="gx-vm-detail-section-title">

                                        Visit Information

                                    </div>


                                    <div className="gx-vm-detail-grid">


                                        <div className="gx-vm-detail-item">

                                            <span className="gx-vm-detail-icon">

                                                <FaMapMarkerAlt />

                                            </span>


                                            <div>

                                                <span>
                                                    Site
                                                </span>


                                                <strong>

                                                    {
                                                        selectedVisitor.site_name ||
                                                        "--"
                                                    }

                                                </strong>

                                            </div>

                                        </div>


                                        <div className="gx-vm-detail-item">

                                            <span className="gx-vm-detail-icon">

                                                <FaUserTie />

                                            </span>


                                            <div>

                                                <span>
                                                    Host
                                                </span>


                                                <strong>

                                                    {
                                                        selectedVisitor.host_name ||
                                                        "--"
                                                    }

                                                </strong>

                                            </div>

                                        </div>


                                        <div className="gx-vm-detail-item">

                                            <span className="gx-vm-detail-icon">

                                                <FaIdBadge />

                                            </span>


                                            <div>

                                                <span>
                                                    Visit Code
                                                </span>


                                                <strong>

                                                    {
                                                        selectedVisitor.visit_code ||
                                                        "--"
                                                    }

                                                </strong>

                                            </div>

                                        </div>


                                        <div className="gx-vm-detail-item">

                                            <span className="gx-vm-detail-icon">

                                                <FaEye />

                                            </span>


                                            <div>

                                                <span>
                                                    Purpose
                                                </span>


                                                <strong>

                                                    {
                                                        selectedVisitor.purpose ||
                                                        "--"
                                                    }

                                                </strong>

                                            </div>

                                        </div>

                                    </div>

                                </div>


                                {/* =================================================
                                    APPROVAL
                                ================================================= */}

                                <div className="gx-vm-detail-section">

                                    <div className="gx-vm-detail-section-title">

                                        Approval

                                    </div>


                                    <div className="gx-vm-detail-grid">


                                        <div className="gx-vm-detail-item">

                                            <span className="gx-vm-detail-icon">

                                                <FaCheckCircle />

                                            </span>


                                            <div>

                                                <span>
                                                    Approval Status
                                                </span>


                                                <strong>

                                                    {
                                                        selectedVisitor.approval_status ||
                                                        "--"
                                                    }

                                                </strong>

                                            </div>

                                        </div>


                                        <div className="gx-vm-detail-item">

                                            <span className="gx-vm-detail-icon">

                                                <FaUserTie />

                                            </span>


                                            <div>

                                                <span>
                                                    Approved By
                                                </span>


                                                <strong>

                                                    {
                                                        selectedVisitor.approved_by_name ||
                                                        "--"
                                                    }

                                                </strong>

                                            </div>

                                        </div>

                                    </div>

                                </div>


                                {/* =================================================
                                    MOVEMENT
                                ================================================= */}

                                <div className="gx-vm-detail-section">

                                    <div className="gx-vm-detail-section-title">

                                        Movement

                                    </div>


                                    <div className="gx-vm-detail-grid">


                                        <div className="gx-vm-detail-item">

                                            <span className="gx-vm-detail-icon">

                                                <FaCalendarAlt />

                                            </span>


                                            <div>

                                                <span>
                                                    Expected Arrival
                                                </span>


                                                <strong>

                                                    {
                                                        formatDateTime(
                                                            selectedVisitor.expected_arrival_time
                                                        )
                                                    }

                                                </strong>

                                            </div>

                                        </div>


                                        <div className="gx-vm-detail-item">

                                            <span className="gx-vm-detail-icon">

                                                <FaCalendarAlt />

                                            </span>


                                            <div>

                                                <span>
                                                    Expected Departure
                                                </span>


                                                <strong>

                                                    {
                                                        formatDateTime(
                                                            selectedVisitor.expected_departure_time
                                                        )
                                                    }

                                                </strong>

                                            </div>

                                        </div>


                                        <div className="gx-vm-detail-item">

                                            <span className="gx-vm-detail-icon">

                                                <FaSignInAlt />

                                            </span>


                                            <div>

                                                <span>
                                                    Checked In By
                                                </span>


                                                <strong>

                                                    {
                                                        selectedVisitor.checked_in_by_name ||
                                                        "--"
                                                    }

                                                </strong>

                                            </div>

                                        </div>


                                        <div className="gx-vm-detail-item">

                                            <span className="gx-vm-detail-icon">

                                                <FaSignOutAlt />

                                            </span>


                                            <div>

                                                <span>
                                                    Checked Out By
                                                </span>


                                                <strong>

                                                    {
                                                        selectedVisitor.checked_out_by_name ||
                                                        "--"
                                                    }

                                                </strong>

                                            </div>

                                        </div>


                                        <div className="gx-vm-detail-item">

                                            <span className="gx-vm-detail-icon">

                                                <FaSignInAlt />

                                            </span>


                                            <div>

                                                <span>
                                                    Actual Check In
                                                </span>


                                                <strong>

                                                    {
                                                        formatDateTime(
                                                            selectedVisitor.actual_check_in
                                                        )
                                                    }

                                                </strong>

                                            </div>

                                        </div>


                                        <div className="gx-vm-detail-item">

                                            <span className="gx-vm-detail-icon">

                                                <FaSignOutAlt />

                                            </span>


                                            <div>

                                                <span>
                                                    Actual Check Out
                                                </span>


                                                <strong>

                                                    {
                                                        formatDateTime(
                                                            selectedVisitor.actual_check_out
                                                        )
                                                    }

                                                </strong>

                                            </div>

                                        </div>

                                    </div>

                                </div>


                                {/* =================================================
                                    VISITOR CONTACT
                                ================================================= */}

                                <div className="gx-vm-detail-section">

                                    <div className="gx-vm-detail-section-title">

                                        Visitor Contact

                                    </div>


                                    <div className="gx-vm-detail-grid">


                                        <div className="gx-vm-detail-item">

                                            <span className="gx-vm-detail-icon">

                                                <FaMobileAlt />

                                            </span>


                                            <div>

                                                <span>
                                                    Mobile
                                                </span>


                                                <strong>

                                                    {
                                                        selectedVisitor.mobile ||
                                                        "--"
                                                    }

                                                </strong>

                                            </div>

                                        </div>


                                        <div className="gx-vm-detail-item">

                                            <span className="gx-vm-detail-icon">

                                                <FaEnvelope />

                                            </span>


                                            <div>

                                                <span>
                                                    Email
                                                </span>


                                                <strong>

                                                    {
                                                        selectedVisitor.email ||
                                                        "--"
                                                    }

                                                </strong>

                                            </div>

                                        </div>


                                        <div className="gx-vm-detail-item">

                                            <span className="gx-vm-detail-icon">

                                                <FaUserTie />

                                            </span>


                                            <div>

                                                <span>
                                                    Company
                                                </span>


                                                <strong>

                                                    {
                                                        selectedVisitor.visitor_company ||
                                                        "--"
                                                    }

                                                </strong>

                                            </div>

                                        </div>

                                    </div>

                                </div>


                                {/* =================================================
                                    DRAWER FOOTER
                                ================================================= */}

                                <div className="gx-vm-drawer-footer">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setSelectedVisitor(null)
                                        }
                                    >

                                        Close

                                    </button>


                                    <button
                                        type="button"
                                        className="primary"
                                        onClick={() =>
                                            window.location.href =
                                                "/visitor-management/history"
                                        }
                                    >

                                        Open History

                                        <FaArrowRight />

                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </DashboardLayout>

    );

}