import React from "react";

import {
    FaUserShield,
    FaClipboardCheck,
    FaWalking,
    FaPlay,
    FaCheckCircle,
    FaTimesCircle,
    FaExclamationTriangle,
    FaChartLine
} from "react-icons/fa";

import SummaryCard from "./SummaryCard";

export default function SupervisorDashboardView({ data }) {

    const patrol = data?.patrol || {};

    const attendancePct =
        data?.employees
            ? Math.round(
                  ((data?.attendance_today || 0) / data.employees) * 100
              )
            : 0;

    return (

        <>

            <div className="gx-dashboard-section">

                <div className="gx-dashboard-title">
                    <h3>Team Overview</h3>
                </div>

                <div className="gx-db-summary-grid">

                    <SummaryCard
                        title="Employees"
                        value={data?.employees}
                        icon={<FaUserShield />}
                        color="red"
                    />

                    <SummaryCard
                        title="Attendance Today"
                        value={data?.attendance_today}
                        icon={<FaClipboardCheck />}
                        color="blue"
                    />

                    <SummaryCard
                        title="Attendance %"
                        value={`${attendancePct}%`}
                        icon={<FaChartLine />}
                        color="teal"
                    />

                    <SummaryCard
                        title="Open Incidents"
                        value={data?.open_incidents}
                        icon={<FaExclamationTriangle />}
                        color="orange"
                    />

                </div>

            </div>

            <div className="gx-dashboard-section">

                <div className="gx-dashboard-title">
                    <h3>Today's Patrols</h3>
                </div>

                <div className="gx-db-summary-grid">

                    <SummaryCard
                        title="Assigned"
                        value={patrol?.assigned_patrols}
                        icon={<FaWalking />}
                        color="cyan"
                    />

                    <SummaryCard
                        title="Running"
                        value={patrol?.running_patrols}
                        icon={<FaPlay />}
                        color="yellow"
                    />

                    <SummaryCard
                        title="Completed"
                        value={patrol?.completed_patrols}
                        icon={<FaCheckCircle />}
                        color="green"
                    />

                    <SummaryCard
                        title="Missed"
                        value={patrol?.missed_patrols}
                        icon={<FaTimesCircle />}
                        color="red"
                    />

                    <SummaryCard
                        title="Compliance"
                        value={
                            patrol?.compliance != null
                                ? `${patrol.compliance}%`
                                : "0%"
                        }
                        icon={<FaChartLine />}
                        color="purple"
                    />

                </div>

            </div>

        </>

    );

}