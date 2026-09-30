import React from "react";

import {
    FaBuilding,
    FaUsers,
    FaProjectDiagram,
    FaMapMarkerAlt,
    FaUserShield,
    FaWalking,
    FaPlay,
    FaCheckCircle,
    FaTimesCircle,
    FaClipboardCheck,
    FaExclamationTriangle,
    FaArrowUp
} from "react-icons/fa";

import "./dashboard.css";

const sections = [

    {
        title: "Masters",
        cards: [

            {
                key: "companies",
                title: "Companies",
                icon: FaBuilding,
                color: "blue"
            },

            {
                key: "clients",
                title: "Clients",
                icon: FaUsers,
                color: "green"
            },

            {
                key: "projects",
                title: "Projects",
                icon: FaProjectDiagram,
                color: "purple"
            },

            {
                key: "sites",
                title: "Sites",
                icon: FaMapMarkerAlt,
                color: "orange"
            },

            {
                key: "employees",
                title: "Employees",
                icon: FaUserShield,
                color: "red"
            }

        ]
    },

    {
        title: "Today's Operations",
        cards: [

            {
                key: "today_patrols",
                title: "Today's Patrols",
                icon: FaWalking,
                color: "cyan"
            },

            {
                key: "running_patrols",
                title: "Running",
                icon: FaPlay,
                color: "yellow"
            },

            {
                key: "completed_patrols",
                title: "Completed",
                icon: FaCheckCircle,
                color: "green"
            },

            {
                key: "missed_patrols",
                title: "Missed",
                icon: FaTimesCircle,
                color: "red"
            },

            {
                key: "attendance_today",
                title: "Attendance",
                icon: FaClipboardCheck,
                color: "blue"
            },

            {
                key: "open_incidents",
                title: "Open Incidents",
                icon: FaExclamationTriangle,
                color: "orange"
            }

        ]
    }

];

export default function SummaryCards({ data }) {

    return (

        <>

            {sections.map((section) => (

                <div key={section.title} className="gx-dashboard-section">

                    <div className="gx-dashboard-title">

                        <h3>{section.title}</h3>

                    </div>

                    <div className="gx-db-summary-grid">

                        {section.cards.map((card) => {

                            const Icon = card.icon;

                            return (

                                <div
                                    key={card.key}
                                    className={`gx-summary-box ${card.color}`}
                                >

                                    <div>

                                        <p>{card.title}</p>

                                        <h2>{data[card.key] || 0}</h2>

                                        <small>

                                            <FaArrowUp />

                                            Updated Today

                                        </small>

                                    </div>

                                    <div className="gx-summary-icon">

                                        <Icon />

                                    </div>

                                </div>

                            );

                        })}

                    </div>

                </div>

            ))}

        </>

    );

}











// import {

//     FaUsers,
//     FaUserCheck,
//     FaMapMarkerAlt,
//     FaBuilding,
//     FaClipboardCheck,
//     FaRoute

// } from "react-icons/fa";

// import SummaryCard from "./SummaryCard";

// import "../../styles/NewDashboard.css";

// export default function SummaryCards({

//     summary

// }) {

//     if (!summary) return null;

//     return (

//         <div className="gx-summary-grid">

//             <SummaryCard

//                 title="Employees"

//                 value={summary.total_employees}

//                 icon={<FaUsers />}

//                 color="#3B82F6"

//             />

//             <SummaryCard

//                 title="Present"

//                 value={summary.present_today}

//                 icon={<FaUserCheck />}

//                 color="#10B981"

//             />

//             <SummaryCard

//                 title="Running Patrols"

//                 value={summary.running_patrols}

//                 icon={<FaRoute />}

//                 color="#F59E0B"

//             />

//             <SummaryCard

//                 title="Sites"

//                 value={summary.total_sites}

//                 icon={<FaMapMarkerAlt />}

//                 color="#6366F1"

//             />

//             <SummaryCard

//                 title="Clients"

//                 value={summary.total_clients}

//                 icon={<FaBuilding />}

//                 color="#EF4444"

//             />

//             <SummaryCard

//                 title="Attendance"

//                 value={summary.attendance_percentage + "%"}

//                 icon={<FaClipboardCheck />}

//                 color="#14B8A6"

//             />

//         </div>

//     );

// }