import React, { useMemo } from "react";

import {
    FaShieldAlt,
    FaClock,
    FaWalking,
    FaCheckCircle,
    FaMapMarkerAlt,
    FaFingerprint,
    FaArrowRight,
    FaBuilding,
    FaUsers,
    FaHeadset
} from "react-icons/fa";

import "./EmployeeDashboardView.css";


/* ============================================================
   HELPERS
============================================================ */

const number = (value) => Number(value || 0);


const formatTime = (value) => {

    if (!value) return "--:--";

    const parsed = new Date(value);

    if (Number.isNaN(parsed.getTime())) {
        return "--:--";
    }

    return parsed.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
};


const statusTone = (status) => {

    switch (
        String(status || "").toLowerCase()
    ) {

        case "present":
            return "success";

        case "late":
            return "warning";

        case "absent":
            return "danger";

        default:
            return "neutral";
    }
};


/* ============================================================
   SECTION HEADER
============================================================ */

function SectionHeader({
    eyebrow,
    title,
    meta
}) {

    return (

        <div className="gxd-section-header">

            <div>

                <span className="gxd-eyebrow">
                    {eyebrow}
                </span>

                <h2>
                    {title}
                </h2>

            </div>

            {meta ? (

                <span className="gxd-section-meta">
                    {meta}
                </span>

            ) : null}

        </div>
    );
}


/* ============================================================
   METRIC
============================================================ */

function Metric({
    icon,
    label,
    value,
    note,
    tone = "blue"
}) {

    return (

        <div
            className={`gxd-metric gxd-metric-${tone}`}
        >

            <div className="gxd-metric-icon">
                {icon}
            </div>

            <div className="gxd-metric-copy">

                <span>
                    {label}
                </span>

                <strong>
                    {value}
                </strong>

                <small>
                    {note}
                </small>

            </div>

        </div>
    );
}




/* ============================================================
   PATROL RING - LIVE ANIMATED
============================================================ */

function PatrolRing({ patrol }) {

    const total = number(patrol?.total);
    const completed = number(patrol?.completed);
    const running = number(patrol?.running);
    const missed = number(patrol?.missed);

    const completion =
        total > 0
            ? Math.round((completed / total) * 100)
            : 0;

    const radius = 48;

    const circumference =
        2 * Math.PI * radius;

    const completedLength =
        circumference * (completed / Math.max(total, 1));

    const runningLength =
        circumference * (running / Math.max(total, 1));

    const missedLength =
        circumference * (missed / Math.max(total, 1));

    return (
        <div className="gxd-panel gxd-patrol-panel">

            <SectionHeader
                eyebrow="PATROL CONTROL"
                title="Today's Patrol Mix"
                meta={`${total} total`}
            />

            <div className="gxd-patrol-content">

                <div className="gxd-ai-ring-wrap">

                    {/* Rotating AI energy layer */}

                    <div className="gxd-ai-ring-orbit">
                        <span />
                    </div>


                    <svg
                        className="gxd-patrol-ring-svg"
                        viewBox="0 0 120 120"
                    >

                        {/* Background */}

                        <circle
                            className="gxd-ring-track"
                            cx="60"
                            cy="60"
                            r={radius}
                        />


                        {/* Completed */}

                        {completed > 0 && (
                            <circle
                                className="gxd-ring-segment gxd-ring-completed"
                                cx="60"
                                cy="60"
                                r={radius}
                                strokeDasharray={`${completedLength} ${circumference}`}
                                strokeDashoffset="0"
                            />
                        )}


                        {/* Running */}

                        {running > 0 && (
                            <circle
                                className="gxd-ring-segment gxd-ring-running"
                                cx="60"
                                cy="60"
                                r={radius}
                                strokeDasharray={`${runningLength} ${circumference}`}
                                strokeDashoffset={
                                    -completedLength
                                }
                            />
                        )}


                        {/* Missed */}

                        {missed > 0 && (
                            <circle
                                className="gxd-ring-segment gxd-ring-missed"
                                cx="60"
                                cy="60"
                                r={radius}
                                strokeDasharray={`${missedLength} ${circumference}`}
                                strokeDashoffset={
                                    -(
                                        completedLength +
                                        runningLength
                                    )
                                }
                            />
                        )}

                    </svg>


                    {/* AI center */}

                    <div className="gxd-ai-ring-center">

                        <div className="gxd-ai-core">
                            <span />
                        </div>

                        <strong>
                            {completion}%
                        </strong>

                        <small>
                            LIVE
                        </small>

                    </div>

                </div>


                <div className="gxd-legend">

                    <div>
                        <span className="gxd-legend-dot completed" />
                        <span>Completed</span>
                        <strong>{completed}</strong>
                    </div>

                    <div>
                        <span className="gxd-legend-dot running" />
                        <span>In progress</span>
                        <strong>{running}</strong>
                    </div>

                    <div>
                        <span className="gxd-legend-dot missed" />
                        <span>Missed</span>
                        <strong>{missed}</strong>
                    </div>

                </div>

            </div>

        </div>
    );
}




/* ============================================================
   ACTIVITY CHART - LIVE ANIMATED
============================================================ */

function ActivityChart({ trends }) {

    const chart = useMemo(() => {

        const rows =
            Array.isArray(trends)
                ? trends
                : [];

        const maxValue = Math.max(
            1,
            ...rows.map(
                item =>
                    number(item?.patrols)
            )
        );

        const width = 760;
        const height = 250;

        const left = 38;
        const right = 18;
        const top = 20;
        const bottom = 38;

        const usableWidth =
            width - left - right;

        const usableHeight =
            height - top - bottom;

        const step =
            rows.length > 1
                ? usableWidth /
                  (rows.length - 1)
                : usableWidth;

        const points = rows.map(
            (item, index) => {

                const x =
                    left +
                    index * step;

                const value =
                    number(item?.patrols);

                const completed =
                    number(item?.completed);

                const y =
                    top +
                    usableHeight -
                    (
                        value /
                        maxValue
                    ) *
                    usableHeight;

                return {
                    x,
                    y,
                    value,
                    completed,
                    label:
                        item?.day ||
                        item?.label ||
                        ""
                };
            }
        );

        return {
            width,
            height,
            points,
            maxValue
        };

    }, [trends]);


    const pointsString =
        chart.points
            .map(
                point =>
                    `${point.x},${point.y}`
            )
            .join(" ");


    return (

        <div className="gxd-panel gxd-activity-panel">

            <SectionHeader
                eyebrow="LIVE ACTIVITY"
                title="7-Day Patrol Activity"
                meta="AI operations view"
            />


            <div className="gxd-chart-live-status">

                <span className="gxd-live-pulse" />

                LIVE ACTIVITY MONITOR

            </div>


            <div className="gxd-chart-legend">

                <span>
                    <i className="chart-key patrol" />
                    Patrols
                </span>

                <span>
                    <i className="chart-key completed" />
                    Completed
                </span>

            </div>


            {chart.points.length === 0 ? (

                <div className="gxd-empty-chart">
                    No activity data available yet.
                </div>

            ) : (

                <div className="gxd-chart">

                    <svg
                        className="gxd-activity-svg"
                        viewBox={`0 0 ${chart.width} ${chart.height}`}
                        preserveAspectRatio="none"
                    >

                        {/* Grid */}

                        {[0, 1, 2, 3].map(
                            line => {

                                const y =
                                    20 +
                                    (
                                        (
                                            250 -
                                            20 -
                                            38
                                        ) / 3
                                    ) *
                                    line;

                                return (
                                    <line
                                        key={line}
                                        x1="38"
                                        x2="742"
                                        y1={y}
                                        y2={y}
                                        className="chart-grid"
                                    />
                                );
                            }
                        )}


                        {/* Bars */}

                        {chart.points.map(
                            (point, index) => {

                                const barHeight =
                                    (
                                        point.value /
                                        chart.maxValue
                                    ) *
                                    172;

                                const barY =
                                    212 -
                                    barHeight;

                                return (

                                    <g
                                        key={`bar-${index}`}
                                        className="gxd-ai-bar-group"
                                        style={{
                                            animationDelay:
                                                `${index * 120}ms`
                                        }}
                                    >

                                        {/* Glow */}

                                        <rect
                                            x={
                                                point.x - 15
                                            }
                                            y={barY}
                                            width="30"
                                            height={barHeight}
                                            rx="8"
                                            className="gxd-ai-bar-glow"
                                        />


                                        {/* Actual bar */}

                                        <rect
                                            x={
                                                point.x - 11
                                            }
                                            y={barY}
                                            width="22"
                                            height={barHeight}
                                            rx="7"
                                            className="chart-bar"
                                        />

                                    </g>
                                );
                            }
                        )}


                        {/* Main line */}

                        <polyline
                            points={pointsString}
                            fill="none"
                            className="chart-line"
                        />


                        {/* Moving scanner */}

                        <circle
                            className="gxd-chart-scanner"
                            r="6"
                        >
                            <animateMotion
                                dur="5s"
                                repeatCount="indefinite"
                                path={
                                    pointsString
                                        ? `M ${pointsString.replace(
                                            / /g,
                                            " L "
                                        )}`
                                        : ""
                                }
                            />
                        </circle>


                        {/* Data points */}

                        {chart.points.map(
                            (point, index) => (

                                <g
                                    key={`point-${index}`}
                                >

                                    <circle
                                        cx={point.x}
                                        cy={point.y}
                                        r="10"
                                        className="gxd-point-glow"
                                    />

                                    <circle
                                        cx={point.x}
                                        cy={point.y}
                                        r="4"
                                        className="chart-point"
                                    />

                                </g>

                            )
                        )}

                    </svg>


                    <div className="gxd-chart-labels">

                        {chart.points.map(
                            (point, index) => (

                                <span key={index}>
                                    {point.label}
                                </span>

                            )
                        )}

                    </div>

                </div>

            )}

        </div>
    );
}


/* ============================================================
   DUTY TIMELINE
============================================================ */

function DutyTimeline({
    attendance
}) {

    const status =
        attendance?.attendance_status ||
        "Not Marked";


    const tone =
        statusTone(status);


    return (

        <div className="gxd-panel gxd-timeline-panel">

            <SectionHeader
                eyebrow="DUTY TIMELINE"
                title="Today's Duty"
                meta={status}
            />


            <div className="gxd-timeline">

                <div className="gxd-timeline-line" />


                <div className="gxd-event">

                    <div className="gxd-event-marker start">
                        <span>↗</span>
                    </div>


                    <div className="gxd-event-copy">

                        <strong>
                            Duty start
                        </strong>

                        <span>

                            {attendance?.punch_in_time
                                ? formatTime(
                                    attendance.punch_in_time
                                )
                                : "Not recorded"}

                        </span>

                    </div>


                    <span className="gxd-event-state success">

                        {attendance?.punch_in_time
                            ? "Verified"
                            : "Pending"}

                    </span>

                </div>


                <div className="gxd-event">

                    <div className="gxd-event-marker location">
                        <FaMapMarkerAlt />
                    </div>


                    <div className="gxd-event-copy">

                        <strong>
                            Location verification
                        </strong>

                        <span>
                            GPS verification required for attendance
                        </span>

                    </div>


                    <span className="gxd-event-state success">
                        Enabled
                    </span>

                </div>


                <div className="gxd-event">

                    <div className="gxd-event-marker face">
                        <FaFingerprint />
                    </div>


                    <div className="gxd-event-copy">

                        <strong>
                            Identity verification
                        </strong>

                        <span>
                            Selfie + face verification
                        </span>

                    </div>


                    <span className="gxd-event-state success">
                        Enabled
                    </span>

                </div>


                <div className="gxd-event">

                    <div className="gxd-event-marker end">
                        <span>↘</span>
                    </div>


                    <div className="gxd-event-copy">

                        <strong>
                            Duty end
                        </strong>

                        <span>

                            {attendance?.punch_out_time
                                ? formatTime(
                                    attendance.punch_out_time
                                )
                                : "Not recorded"}

                        </span>

                    </div>


                    <span
                        className={`gxd-event-state ${tone}`}
                    >

                        {attendance?.punch_out_time
                            ? "Completed"
                            : "Open"}

                    </span>

                </div>

            </div>

        </div>
    );
}


/* ============================================================
   DEPLOYMENT PANEL
============================================================ */

function DeploymentPanel({
    deployment
}) {

    if (!deployment) {

        return (

            <div className="gxd-panel">

                <SectionHeader
                    eyebrow="DEPLOYMENT"
                    title="Current Deployment"
                    meta="No active deployment"
                />

                <div className="gxd-empty-state">
                    <FaBuilding />

                    <strong>
                        No active deployment
                    </strong>

                    <span>
                        Your current site assignment will appear here.
                    </span>
                </div>

            </div>
        );
    }


    return (

        <div className="gxd-panel gxd-deployment-panel">

            <SectionHeader
                eyebrow="DEPLOYMENT"
                title="Current Deployment"
                meta={
                    deployment?.deployment_code ||
                    "Active assignment"
                }
            />


            <div className="gxd-deployment-card">

                <div className="gxd-deployment-main">

                    <div className="gxd-feature-icon deployment">
                        <FaBuilding />
                    </div>


                    <div>

                        <strong>
                            {deployment?.site_name ||
                                "Assigned site"}
                        </strong>

                        <span>
                            {deployment?.project_name ||
                                "Project not available"}
                        </span>

                    </div>

                </div>


                <div className="gxd-deployment-grid">

                    <div>

                        <small>
                            Company
                        </small>

                        <strong>
                            {deployment?.company_name ||
                                "--"}
                        </strong>

                    </div>


                    <div>

                        <small>
                            Client
                        </small>

                        <strong>
                            {deployment?.client_name ||
                                "--"}
                        </strong>

                    </div>


                    <div>

                        <small>
                            Shift
                        </small>

                        <strong>
                            {deployment?.shift_name ||
                                "--"}
                        </strong>

                    </div>


                    <div>

                        <small>
                            Supervisor
                        </small>

                        <strong>
                            {deployment?.supervisor_name ||
                                "--"}
                        </strong>

                    </div>

                </div>

            </div>

        </div>
    );
}


/* ============================================================
   VISITOR PANEL
============================================================ */

function VisitorPanel({
    visitors
}) {

    const total =
        number(visitors?.total);

    const inside =
        number(visitors?.inside);

    const completed =
        number(visitors?.completed);


    return (

        <div className="gxd-panel gxd-visitor-panel">

            <SectionHeader
                eyebrow="VISITOR CONTROL"
                title="Today's Visitor Activity"
                meta={`${total} total`}
            />


            <div className="gxd-visitor-hero">

                <div className="gxd-feature-icon visitor">
                    <FaUsers />
                </div>


                <div>

                    <strong>
                        {inside}
                    </strong>

                    <span>
                        currently inside
                    </span>

                </div>

            </div>


            <div className="gxd-visitor-stats">

                <div>

                    <span>
                        Total visitors
                    </span>

                    <strong>
                        {total}
                    </strong>

                </div>


                <div>

                    <span>
                        Inside
                    </span>

                    <strong>
                        {inside}
                    </strong>

                </div>


                <div>

                    <span>
                        Completed
                    </span>

                    <strong>
                        {completed}
                    </strong>

                </div>

            </div>


            {!total && (

                <div className="gxd-small-empty">
                    No visitor activity for today.
                </div>

            )}

        </div>
    );
}


/* ============================================================
   HELP DESK PANEL
============================================================ */

function HelpdeskPanel({
    helpdesk
}) {

    const total =
        number(helpdesk?.total);

    const open =
        number(helpdesk?.open);

    const resolved =
        number(helpdesk?.resolved);

    const urgent =
        number(helpdesk?.urgent);


    return (

        <div className="gxd-panel gxd-helpdesk-panel">

            <SectionHeader
                eyebrow="HELP DESK"
                title="My Support Tickets"
                meta={`${total} total`}
            />


            <div className="gxd-helpdesk-main">

                <div className="gxd-feature-icon helpdesk">
                    <FaHeadset />
                </div>


                <div>

                    <strong>

                        {open
                            ? `${open} ticket${
                                open === 1
                                    ? ""
                                    : "s"
                            } open`
                            : "No open tickets"}

                    </strong>


                    <span>

                        {urgent
                            ? `${urgent} urgent ticket${
                                urgent === 1
                                    ? ""
                                    : "s"
                            } need attention`
                            : `${resolved} resolved`}

                    </span>

                </div>

            </div>


            <div className="gxd-helpdesk-stats">

                <div>

                    <span>
                        Open
                    </span>

                    <strong>
                        {open}
                    </strong>

                </div>


                <div>

                    <span>
                        Resolved
                    </span>

                    <strong>
                        {resolved}
                    </strong>

                </div>


                <div>

                    <span>
                        Urgent
                    </span>

                    <strong>
                        {urgent}
                    </strong>

                </div>

            </div>

        </div>
    );
}


/* ============================================================
   OPERATIONS PANEL
============================================================ */

function OperationsPanel({
    deployment,
    visitors,
    helpdesk
}) {

    const deploymentActive =
        String(
            deployment?.deployment_status || ""
        ).toLowerCase() === "active";


    const visitorTotal =
        number(visitors?.total);

    const visitorInside =
        number(visitors?.inside);

    const helpdeskOpen =
        number(helpdesk?.open);

    const helpdeskUrgent =
        number(helpdesk?.urgent);


    const rows = [

        {
            icon: <FaBuilding />,
            label: "Current deployment",

            detail:
                deployment?.site_name
                    ? `${deployment.site_name}${
                        deployment?.shift_name
                            ? ` • ${deployment.shift_name}`
                            : ""
                    }`
                    : "No active deployment",

            state:
                deploymentActive
                    ? "Active"
                    : "None",

            tone:
                deploymentActive
                    ? "success"
                    : "neutral"
        },


        {
            icon: <FaUsers />,
            label: "Visitor activity",

            detail:
                visitorTotal
                    ? `${visitorInside} currently inside • ${visitorTotal} today`
                    : "No visitor activity today",

            state:
                visitorTotal
                    ? "Active"
                    : "Clear",

            tone:
                visitorTotal
                    ? "warning"
                    : "success"
        },


        {
            icon: <FaHeadset />,
            label: "Help Desk",

            detail:
                helpdeskOpen
                    ? `${helpdeskOpen} open${
                        helpdeskUrgent
                            ? ` • ${helpdeskUrgent} urgent`
                            : ""
                    }`
                    : "No open tickets",

            state:
                helpdeskOpen
                    ? "Open"
                    : "Clear",

            tone:
                helpdeskOpen
                    ? "warning"
                    : "success"
        }

    ];


    return (

        <div className="gxd-panel gxd-operations-panel">

            <SectionHeader
                eyebrow="OPERATIONS"
                title="My Operations"
                meta="Current state"
            />


            <div className="gxd-operations-list">

                {rows.map(
                    row => (

                        <div
                            className="gxd-operation-row"
                            key={row.label}
                        >

                            <div className="gxd-operation-icon">
                                {row.icon}
                            </div>


                            <div className="gxd-operation-copy">

                                <strong>
                                    {row.label}
                                </strong>

                                <span>
                                    {row.detail}
                                </span>

                            </div>


                            <span
                                className={`gxd-event-state ${row.tone}`}
                            >
                                {row.state}
                            </span>

                        </div>

                    )
                )}

            </div>

        </div>
    );
}


/* ============================================================
   EMPLOYEE DASHBOARD
============================================================ */

export default function EmployeeDashboardView({
    data = {}
}) {

    const attendance =
        data?.attendance || {};


    const patrol =
        data?.patrol || {};


    const deployment =
        data?.deployment || null;


    const visitors =
        data?.visitors || {};


    const helpdesk =
        data?.helpdesk || {};


    const trends =
        Array.isArray(data?.trends)
            ? data.trends
            : [];


    const patrolTotal =
        number(patrol?.total);


    const completed =
        number(patrol?.completed);


    const patrolRate =
        patrolTotal > 0
            ? Math.round(
                (
                    completed /
                    patrolTotal
                ) * 100
            )
            : 0;


    const dutyStatus =
        attendance?.attendance_status ||
        "Not Marked";


    return (

        <div className="gxd-dashboard">


            {/* =================================================
                COMMAND HEADER
            ================================================= */}

            <section className="gxd-command-header">

                <div className="gxd-command-copy">

                    <div className="gxd-command-icon">
                        <FaShieldAlt />
                    </div>


                    <div>

                        <span className="gxd-eyebrow">
                            GUARD COMMAND
                        </span>


                        <h1>
                            Your shift at a glance
                        </h1>


                        <p>
                            Attendance, patrol execution,
                            deployment and daily operations
                            in one view.
                        </p>

                    </div>

                </div>


                <div className="gxd-command-state">

                    <span className="gxd-live-dot" />


                    <div>

                        <strong>
                            {dutyStatus}
                        </strong>

                        <small>
                            Current duty status
                        </small>

                    </div>

                </div>

            </section>


            {/* =================================================
                KPI STRIP
            ================================================= */}

            <section className="gxd-metrics">


                <Metric
                    icon={<FaShieldAlt />}
                    label="Duty status"
                    value={dutyStatus}
                    note={
                        attendance?.punch_in_time
                            ? `Started ${formatTime(
                                attendance.punch_in_time
                            )}`
                            : "Awaiting punch in"
                    }
                    tone="blue"
                />


                <Metric
                    icon={<FaWalking />}
                    label="Patrol completion"
                    value={`${patrolRate}%`}
                    note={
                        patrolTotal
                            ? `${completed}/${patrolTotal} completed`
                            : "No patrols today"
                    }
                    tone="green"
                />


                <Metric
                    icon={<FaBuilding />}
                    label="Deployment"
                    value={
                        deployment?.site_name ||
                        "Not assigned"
                    }
                    note={
                        deployment?.shift_name ||
                        "No active shift"
                    }
                    tone="purple"
                />


                <Metric
                    icon={<FaUsers />}
                    label="Visitors"
                    value={
                        number(
                            visitors?.total
                        )
                    }
                    note={
                        number(
                            visitors?.inside
                        )
                            ? `${number(
                                visitors.inside
                            )} currently inside`
                            : "No visitors inside"
                    }
                    tone="blue"
                />


                <Metric
                    icon={<FaHeadset />}
                    label="Help Desk"
                    value={
                        number(
                            helpdesk?.open
                        )
                    }
                    note={
                        number(
                            helpdesk?.urgent
                        )
                            ? `${number(
                                helpdesk.urgent
                            )} urgent`
                            : "Open tickets"
                    }
                    tone="green"
                />


                <Metric
                    icon={<FaClock />}
                    label="Punch out"
                    value={
                        formatTime(
                            attendance?.punch_out_time
                        )
                    }
                    note={
                        attendance?.punch_out_time
                            ? "Duty completed"
                            : "Shift still open"
                    }
                    tone="purple"
                />

            </section>


            {/* =================================================
                ANALYTICS
            ================================================= */}

            <section className="gxd-main-grid">

                <ActivityChart
                    trends={trends}
                />


                <PatrolRing
                    patrol={patrol}
                />

            </section>


            {/* =================================================
                DEPLOYMENT + VISITORS
            ================================================= */}

            <section className="gxd-main-grid">

                <DeploymentPanel
                    deployment={deployment}
                />


                <VisitorPanel
                    visitors={visitors}
                />

            </section>


            {/* =================================================
                HELP DESK + OPERATIONS
            ================================================= */}

            <section className="gxd-main-grid">

                <HelpdeskPanel
                    helpdesk={helpdesk}
                />


                <OperationsPanel
                    deployment={deployment}
                    visitors={visitors}
                    helpdesk={helpdesk}
                />

            </section>


            {/* =================================================
                DUTY TIMELINE
            ================================================= */}

            <section className="gxd-bottom-grid">

                <DutyTimeline
                    attendance={attendance}
                />


                <div className="gxd-panel">

                    <SectionHeader
                        eyebrow="SHIFT STATUS"
                        title="Today's Attendance"
                        meta={dutyStatus}
                    />


                    <div className="gxd-helpdesk-main">

                        <div className="gxd-feature-icon attendance">
                            <FaClock />
                        </div>


                        <div>

                            <strong>

                                {attendance?.punch_in_time
                                    ? `Started at ${formatTime(
                                        attendance.punch_in_time
                                    )}`
                                    : "Attendance not marked"}

                            </strong>


                            <span>

                                {attendance?.punch_out_time
                                    ? `Finished at ${formatTime(
                                        attendance.punch_out_time
                                    )}`
                                    : "Duty is currently open"}

                            </span>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}