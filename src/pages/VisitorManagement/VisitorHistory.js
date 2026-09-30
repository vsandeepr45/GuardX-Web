import React, {
    useCallback,
    useEffect,
    useState
} from "react";

import DashboardLayout
    from "../../layouts/DashboardLayout";
import VisitorDetailsDrawer
    from "../../components/Visitors/VisitorDetailsDrawer";
import {
    getVisitorHistory,
    getVisit
} from "../../api/visitorApi";

import {
    getMyAssignedSites
} from "../../api/site";

import "../../styles/VisitorHistory.css";


export default function VisitorHistory() {

    const [
        history,
        setHistory
    ] = useState([]);

    const [
        sites,
        setSites
    ] = useState([]);

    const [
        loading,
        setLoading
    ] = useState(true);

    const [
        error,
        setError
    ] = useState("");


    // =========================================================
    // FILTERS
    // =========================================================

    const [
        search,
        setSearch
    ] = useState("");

    const [
        status,
        setStatus
    ] = useState("");

    const [
        siteId,
        setSiteId
    ] = useState("");

    const [
        dateFrom,
        setDateFrom
    ] = useState("");

    const [
        dateTo,
        setDateTo
    ] = useState("");


    // =========================================================
    // PAGINATION
    // =========================================================

    const [
        page,
        setPage
    ] = useState(1);

    const [
        pagination,
        setPagination
    ] = useState({
        page: 1,
        limit: 25,
        total: 0,
        pages: 0
    });
    const [
    selectedVisitor,
    setSelectedVisitor
] = useState(null);

const handleView = async (visitor) => {

    try {

        setError("");

        setSelectedVisitor(visitor);

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
    // =========================================================
    // LOAD HISTORY
    // =========================================================

    const loadHistory = useCallback(
        async () => {

            try {

                setLoading(true);

                setError("");


                const response =
                    await getVisitorHistory({

                        search:
                            search.trim() || undefined,

                        status:
                            status || undefined,

                        site_id:
                            siteId || undefined,

                        date_from:
                            dateFrom || undefined,

                        date_to:
                            dateTo || undefined,

                        page,

                        limit: 25

                    });


                if (
                    response.data?.success
                ) {

                    setHistory(
                        response.data.data || []
                    );


                    setPagination(
                        response.data.pagination || {
                            page: 1,
                            limit: 25,
                            total: 0,
                            pages: 0
                        }
                    );

                } else {

                    throw new Error(
                        response.data?.message ||
                        "Unable to load visitor history."
                    );

                }

            } catch (err) {

                console.error(
                    "Visitor history error:",
                    err
                );


                setError(
                    err.response?.data?.message ||
                    err.message ||
                    "Unable to load visitor history."
                );


                setHistory([]);

            } finally {

                setLoading(false);

            }

        },
        [
            search,
            status,
            siteId,
            dateFrom,
            dateTo,
            page
        ]
    );


    // =========================================================
    // LOAD SITES
    // =========================================================

    const loadSites = useCallback(
        async () => {

            try {

                const response =
                    await getMyAssignedSites();


                if (
                    response.data?.success
                ) {

                    setSites(
                        response.data.data || []
                    );

                }

            } catch (err) {

                console.error(
                    "Unable to load sites:",
                    err
                );

                setSites([]);

            }

        },
        []
    );


    // =========================================================
    // INITIAL LOAD
    // =========================================================

    useEffect(() => {

        loadSites();

    }, [
        loadSites
    ]);


    useEffect(() => {

        loadHistory();

    }, [
        loadHistory
    ]);


    // =========================================================
    // APPLY FILTER
    // =========================================================
const handleSearch = () => {
    setPage(1);
};


    // =========================================================
    // CLEAR FILTERS
    // =========================================================

    const handleClear = () => {

        setSearch("");

        setStatus("");

        setSiteId("");

        setDateFrom("");

        setDateTo("");

        setPage(1);

    };


    // =========================================================
    // PAGE
    // =========================================================

    return (

        <DashboardLayout
            title="Visitor History"
        >

            <div className="gx-visitor-history-page">

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="gx-history-header">

                    <div>

                        <div className="gx-history-eyebrow">
                            SECURITY OPERATIONS
                        </div>

                        <h1>
                            Visitor History
                        </h1>

                        <p>
                            Search and review historical
                            visitor activity.
                        </p>

                    </div>

                </div>


                {/* =================================================
                    FILTER PANEL
                ================================================= */}

                <div className="gx-history-filter-panel">

                    <div className="gx-history-filter">

                        <label>
                            Search
                        </label>

                        <input
                            type="text"
                            placeholder="Visitor, code, mobile, company..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            onKeyDown={(e) => {

                                if (
                                    e.key === "Enter"
                                ) {

                                    setPage(1);

                                }

                            }}
                        />

                    </div>


                    <div className="gx-history-filter">

                        <label>
                            Status
                        </label>

                        <select
                            value={status}
                            onChange={(e) => {

                                setStatus(
                                    e.target.value
                                );

                                setPage(1);

                            }}
                        >

                            <option value="">
                                All Statuses
                            </option>

                            <option value="Pending">
                                Pending
                            </option>

                            <option value="Approved">
                                Approved
                            </option>

                            <option value="Rejected">
                                Rejected
                            </option>

                            <option value="Inside">
                                Inside
                            </option>

                            <option value="Completed">
                                Completed
                            </option>

                            <option value="Cancelled">
                                Cancelled
                            </option>

                            <option value="Expired">
                                Expired
                            </option>

                        </select>

                    </div>


                    <div className="gx-history-filter">

                        <label>
                            Site
                        </label>

                        <select
                            value={siteId}
                            onChange={(e) => {

                                setSiteId(
                                    e.target.value
                                );

                                setPage(1);

                            }}
                        >

                            <option value="">
                                All Sites
                            </option>

                            {sites.map(
                                (site) => (

                                    <option
                                        key={site.id}
                                        value={site.id}
                                    >
                                        {
                                            site.site_name
                                        }
                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    <div className="gx-history-filter">

                        <label>
                            From
                        </label>

                        <input
                            type="date"
                            value={dateFrom}
                            onChange={(e) => {

                                setDateFrom(
                                    e.target.value
                                );

                                setPage(1);

                            }}
                        />

                    </div>


                    <div className="gx-history-filter">

                        <label>
                            To
                        </label>

                        <input
                            type="date"
                            value={dateTo}
                            onChange={(e) => {

                                setDateTo(
                                    e.target.value
                                );

                                setPage(1);

                            }}
                        />

                    </div>


                    <div className="gx-history-filter-actions">

<button
    type="button"
    onClick={handleSearch}
>
    Search
</button>


                        <button
                            type="button"
                            onClick={
                                handleClear
                            }
                        >
                            Clear
                        </button>

                    </div>

                </div>


                {/* =================================================
                    ERROR
                ================================================= */}

                {error && (

                    <div className="gx-history-error">
                        {error}
                    </div>

                )}


                {/* =================================================
                    RESULTS
                ================================================= */}

                <div className="gx-history-panel">

                    <div className="gx-history-panel-header">

                        <div>

                            <h2>
                                Visitor Records
                            </h2>

                            <p>
                                {
                                    pagination.total
                                } records found
                            </p>

                        </div>

                    </div>


                    {loading ? (

                        <div className="gx-history-loading">
                            Loading visitor history...
                        </div>

                    ) : history.length === 0 ? (

                        <div className="gx-history-empty">
                            No visitor records found.
                        </div>

                    ) : (

                        <div className="gx-history-table-wrapper">

                            <table className="gx-history-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Visit
                                        </th>

                                        <th>
                                            Visitor
                                        </th>

                                        <th>
                                            Company
                                        </th>

                                        <th>
                                            Site
                                        </th>

                                        <th>
                                            Host
                                        </th>

                                        <th>
                                            Date
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
                                            Approval
                                        </th>

                                        <th>Action</th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {history.map(
                                        (visitor) => (

                                            <tr
                                                key={
                                                    visitor.id
                                                }
                                            >

                                                <td>

                                                    <strong>
                                                        {
                                                            visitor.visit_code
                                                        }
                                                    </strong>

                                                    <small>
                                                        {
                                                            visitor.visitor_code
                                                        }
                                                    </small>

                                                </td>


                                                <td>

                                                    <strong>
                                                        {
                                                            visitor.visitor_name
                                                        }
                                                    </strong>

                                                    <small>
                                                        {
                                                            visitor.mobile ||
                                                            "—"
                                                        }
                                                    </small>

                                                </td>


                                                <td>
                                                    {
                                                        visitor.company_name ||
                                                        visitor.visitor_company ||
                                                        "—"
                                                    }
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
                                                        visitor.expected_date ||
                                                        "—"
                                                    }
                                                </td>


                                                <td>
                                                    {
                                                        visitor.actual_check_in ||
                                                        "—"
                                                    }
                                                </td>


                                                <td>
                                                    {
                                                        visitor.actual_check_out ||
                                                        "—"
                                                    }
                                                </td>


                                                <td>

                                                    <span
                                                        className={
                                                            `gx-history-status gx-status-${String(
                                                                visitor.visit_status || ""
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
                                                            "—"
                                                        }
                                                    </span>

                                                </td>


                                                <td>

                                                    {
                                                        visitor.approval_status ||
                                                        "—"
                                                    }

                                                </td>

                                                <td>
    <button
        type="button"
        className="gx-history-view-btn"
        onClick={() => handleView(visitor)}
    >
        View
    </button>
</td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}


                    {/* =================================================
                        PAGINATION
                    ================================================= */}

                    {pagination.pages > 1 && (

                        <div className="gx-history-pagination">

                            <button
                                type="button"
                                disabled={
                                    page <= 1
                                }
                                onClick={() =>
                                    setPage(
                                        (current) =>
                                            Math.max(
                                                current - 1,
                                                1
                                            )
                                    )
                                }
                            >
                                Previous
                            </button>


                            <span>
                                Page{" "}
                                {pagination.page}
                                {" "}of{" "}
                                {pagination.pages}
                            </span>


                            <button
                                type="button"
                                disabled={
                                    page >=
                                    pagination.pages
                                }
                                onClick={() =>
                                    setPage(
                                        (current) =>
                                            Math.min(
                                                current + 1,
                                                pagination.pages
                                            )
                                    )
                                }
                            >
                                Next
                            </button>

                        </div>

                    )}

                </div>
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