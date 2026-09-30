import React from "react";

import SummaryCards from "./SummaryCards";
import QuickActions from "./QuickActions";
import RecentActivities from "./RecentActivities";

export default function AdminDashboardView({ data }) {

    return (

        <>

            <div className="gx-dashboard-section">

                <div className="gx-dashboard-title">
                    <h3>Company Overview</h3>
                </div>

                <SummaryCards data={data || {}} />

            </div>

            <div className="gx-dashboard-section">

                <div className="gx-dashboard-title">
                    <h3>Quick Actions</h3>
                </div>

                <QuickActions />

            </div>

            <div className="gx-dashboard-section">

                <div className="gx-dashboard-title">
                    <h3>Recent Activity</h3>
                </div>

                <RecentActivities
                    data={
                        data?.recent || {
                            companies: [],
                            clients: [],
                            projects: [],
                        }
                    }
                />

            </div>

        </>

    );

}