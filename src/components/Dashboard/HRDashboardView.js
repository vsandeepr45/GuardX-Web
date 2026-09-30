import React from "react";

import { FaUserShield, FaClipboardCheck } from "react-icons/fa";

import SummaryCard from "./SummaryCard";

export default function HRDashboardView({ data }) {

    return (

        <div className="gx-dashboard-section">

            <div className="gx-dashboard-title">
                <h3>HR Overview</h3>
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

            </div>

        </div>

    );

}