import React from "react";

import {
    FaUsers,
    FaHourglassHalf,
    FaCheckCircle,
    FaSignInAlt,
    FaSignOutAlt,
    FaBan,
    FaClock
} from "react-icons/fa";


export default function VisitorTabs({
    activeTab,
    onChange,
    summary = {}
}) {

    const tabs = [
        {
            key: "all",
            label: "All Visitors",
            shortLabel: "All",
            count: Number(summary.total || 0),
            icon: FaUsers,
            tone: "blue"
        },
        {
            key: "pending",
            label: "Pending Approval",
            shortLabel: "Pending",
            count: Number(
                summary.pending ??
                summary.pending_approval ??
                0
            ),
            icon: FaHourglassHalf,
            tone: "amber"
        },
        {
            key: "approved",
            label: "Approved",
            shortLabel: "Approved",
            count: Number(summary.approved || 0),
            icon: FaCheckCircle,
            tone: "green"
        },
        {
            key: "inside",
            label: "Currently Inside",
            shortLabel: "Inside",
            count: Number(summary.inside || 0),
            icon: FaSignInAlt,
            tone: "cyan"
        },
        {
            key: "completed",
            label: "Completed Visits",
            shortLabel: "Completed",
            count: Number(summary.completed || 0),
            icon: FaSignOutAlt,
            tone: "slate"
        },
        {
            key: "cancelled",
            label: "Cancelled",
            shortLabel: "Cancelled",
            count: Number(summary.cancelled || 0),
            icon: FaBan,
            tone: "red"
        },
        {
            key: "expired",
            label: "Expired",
            shortLabel: "Expired",
            count: Number(summary.expired || 0),
            icon: FaClock,
            tone: "purple"
        }
    ];


    return (
        <div
            className="gx-visitor-tabs"
            role="tablist"
            aria-label="Visitor status filters"
        >

            <div className="gx-visitor-tabs-track">

                {tabs.map((tab) => {

                    const Icon = tab.icon;
                    const isActive =
                        activeTab === tab.key;

                    return (
                        <button
                            key={tab.key}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            className={[
                                "gx-visitor-tab",
                                `gx-tab-${tab.tone}`,
                                isActive
                                    ? "active"
                                    : ""
                            ].join(" ")}
                            onClick={() =>
                                onChange(tab.key)
                            }
                        >

                            <span className="gx-visitor-tab-icon">
                                <Icon />
                            </span>


                            <span className="gx-visitor-tab-label">

                                <span className="gx-tab-label-full">
                                    {tab.label}
                                </span>

                                <span className="gx-tab-label-short">
                                    {tab.shortLabel}
                                </span>

                            </span>


                            <span
                                className={
                                    "gx-visitor-tab-count" +
                                    (tab.count > 0
                                        ? " has-value"
                                        : "")
                                }
                            >
                                {tab.count}
                            </span>


                            {isActive && (
                                <span className="gx-visitor-tab-active-line" />
                            )}

                        </button>
                    );

                })}

            </div>

        </div>
    );
}