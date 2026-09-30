import React from "react";

import { FaMapMarkerAlt, FaUserShield } from "react-icons/fa";

import SummaryCard from "./SummaryCard";

export default function ClientDashboardView({ data }) {

    if (data?.error) {

        return (

            <div className="gx-dashboard-section">
                <p>{data.error}</p>
            </div>

        );

    }

    return (

        <div className="gx-dashboard-section">

            <div className="gx-dashboard-title">
                <h3>Your Sites</h3>
            </div>

            <div className="gx-db-summary-grid">

                <SummaryCard
                    title="Sites"
                    value={data?.sites}
                    icon={<FaMapMarkerAlt />}
                    color="orange"
                />

                <SummaryCard
                    title="Guards Deployed"
                    value={data?.guards}
                    icon={<FaUserShield />}
                    color="red"
                />

                {/* incidents / visitors wired to 0 until Help Desk
                    and Visitor modules exist - add cards here once
                    that data is real */}

            </div>

        </div>

    );

}