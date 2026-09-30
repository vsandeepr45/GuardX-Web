import {
    FaUserCheck,
    FaBuilding,
    FaUserTie,
    FaClock,
    FaCalendarAlt,
    FaFlag
} from "react-icons/fa";

import "../../styles/Profile.css";

export default function EmployeeStats({ profile }) {

    const cards = [

        {
            title: "Status",
            value: profile.employee_status || "-",
            sub: "Current Employee Status",
            icon: <FaUserCheck />,
            color: "green"
        },

        {
            title: "Department",
            value: profile.department || "-",
            sub: "Assigned Department",
            icon: <FaBuilding />,
            color: "blue"
        },

        {
            title: "Designation",
            value: profile.designation || "-",
            sub: "Current Designation",
            icon: <FaUserTie />,
            color: "purple"
        },

        {
            title: "Shift",
            value: profile.shift || "-",
            sub: "Working Shift",
            icon: <FaClock />,
            color: "orange"
        },

        {
            title: "Joining Date",
            value: profile.joining_date || "-",
            sub: "Date of Joining",
            icon: <FaCalendarAlt />,
            color: "cyan"
        },

        {
            title: "Nationality",
            value: profile.nationality || "-",
            sub: "Employee Nationality",
            icon: <FaFlag />,
            color: "red"
        }

    ];

    return (

        <div className="gx-stat-grid">

            {

                cards.map((item, index) => (

                    <div
                        key={index}
                        className={`gx-stat-card ${item.color}`}
                    >

                        <div className="gx-stat-top">

                            <div className="gx-stat-icon">

                                {item.icon}

                            </div>

                            <div className="gx-stat-title">

                                {item.title}

                            </div>

                        </div>

                        <h2>{item.value}</h2>

                        <p>{item.sub}</p>
<span className="gx-stat-badge">

Live

</span>
                    </div>

                ))

            }

        </div>

    );

}