import {

    FaUserShield,
    FaRoute,
    FaMapMarkerAlt,
    FaClock,
    FaBatteryThreeQuarters,
    FaMobileAlt,
    FaUserTie,
    FaClipboardCheck

} from "react-icons/fa";

export default function SessionDetails({ session }) {

    if (!session) {

        return (

            <div className="gx-patrol-monitor-empty">

                Select a patrol to view details.

            </div>

        );

    }

    const {

        employee,

        session: patrol,

        assignment,

        route,

        statistics

    } = session;

    return (

        <div className="gx-patrol-monitor-session">

            {/* ==============================
                HEADER
            ============================== */}

            <div className="gx-patrol-monitor-session-header">

                <img

                    src={

                        employee.photo ||

                        "/images/default-user.png"

                    }

                    alt={employee.name}

                />

                <div>

                    <h3>{employee.name}</h3>

                    <p>{employee.code}</p>

                    <small>{employee.mobile}</small>

                </div>

                <span

                    className={`

                        gx-patrol-status

                        ${patrol.status.toLowerCase()}

                    `}

                >

                    {patrol.status}

                </span>

            </div>

            {/* ==============================
                INFORMATION GRID
            ============================== */}

            <div className="gx-patrol-monitor-info-grid">

                <InfoCard

                    icon={<FaRoute />}

                    label="Route"

                    value={route.route_name}

                />

                <InfoCard

                    icon={<FaMapMarkerAlt />}

                    label="Site"

                    value={route.site_name}

                />

                <InfoCard

                    icon={<FaClock />}

                    label="Shift"

                    value={route.shift_name}

                />

                <InfoCard

                    icon={<FaUserTie />}

                    label="Supervisor"

                    value={route.supervisor_name}

                />

                <InfoCard

                    icon={<FaClipboardCheck />}

                    label="Assignment"

                    value={assignment.assignment_code}

                />

                <InfoCard

                    icon={<FaMobileAlt />}

                    label="Device"

                    value={patrol.device_name}

                />

                <InfoCard

                    icon={<FaBatteryThreeQuarters />}

                    label="Battery"

                    value={`${patrol.battery_level}%`}

                />

                <InfoCard

                    icon={<FaUserShield />}

                    label="Progress"

                    value={statistics.progress_text}

                />

            </div>

            {/* ==============================
                PROGRESS
            ============================== */}

            <div className="gx-patrol-monitor-session-progress">

                <div className="gx-patrol-monitor-progress-bar">

                    <div

                        className="gx-patrol-monitor-progress-fill"

                        style={{

                            width:`${statistics.progress}%`

                        }}

                    />

                </div>

                <div className="gx-patrol-monitor-progress-footer">

                    <span>

                        {statistics.completed_checkpoints}

                        {" "}Completed

                    </span>

                    <span>

                        {statistics.pending_checkpoints}

                        {" "}Pending

                    </span>

                    <span>

                        {statistics.progress}%

                    </span>

                </div>

            </div>

        </div>

    );

}

function InfoCard({

    icon,

    label,

    value

}){

    return(

        <div className="gx-patrol-monitor-info-card">

            <div className="gx-patrol-monitor-info-icon">

                {icon}

            </div>

            <div>

                <label>{label}</label>

                <strong>{value || "-"}</strong>

            </div>

        </div>

    );

}