import React from "react";

export default function VisitorStats({
    summary
}) {

    const stats = [

        {
            label: "Today's Visitors",
            value: summary?.total ?? 0,
            icon: "👥",
            className: "blue"
        },

        {
            label: "Pending Approval",
            value: summary?.pending_approval ?? 0,
            icon: "⏳",
            className: "orange"
        },

        {
            label: "Currently Inside",
            value: summary?.inside ?? 0,
            icon: "🟢",
            className: "green"
        },

        {
            label: "Completed",
            value: summary?.completed ?? 0,
            icon: "✓",
            className: "purple"
        }

    ];


    return (

        <div className="gx-visitor-stats">

            {stats.map((item) => (

                <div
                    className={`gx-visitor-stat ${item.className}`}
                    key={item.label}
                >

                    <div className="gx-visitor-stat-icon">
                        {item.icon}
                    </div>

                    <div>

                        <div className="gx-visitor-stat-value">
                            {item.value}
                        </div>

                        <div className="gx-visitor-stat-label">
                            {item.label}
                        </div>

                    </div>

                </div>

            ))}

        </div>

    );
}