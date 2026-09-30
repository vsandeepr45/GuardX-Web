import { useNavigate } from "react-router-dom";

import {
    FaMapMarkerAlt,
    FaClock,
    FaRoute,
    FaPlay,
    FaArrowRight,
    FaCheckCircle,
    FaUserShield,
    FaFlag,
    FaClipboardCheck
} from "react-icons/fa";
import { startPatrol as startPatrolApi } from "../../api/patrol";
import {
    resumePatrol
} from "../../api/patrol";
function PatrolCard({ patrol }) {

    const navigate = useNavigate();

    const status = patrol.status;

    const progress = patrol.progress || 0;

    const completed = patrol.completed || 0;

    const total = patrol.total || 0;

    const remaining = total - completed;

const startPatrol = async () => {

    try {

        // Check if employee already has a running patrol
        const resume = await resumePatrol();

        if (

            resume.data.success &&

            resume.data.data &&

            resume.data.data.session

        ) {

            navigate(

                `/employee/patrol/${resume.data.data.session.id}`

            );

            return;

        }

        // No running patrol -> start a new patrol
        const response = await startPatrolApi(

            patrol.assignment_id

        );

        navigate(

            `/employee/patrol/${response.data.data.session_id}`

        );

    }

    catch (err) {

        console.log(err.response?.data);

    }

};
const continuePatrol = () => {

    navigate(

        `/employee/patrol/${patrol.session_id}`

    );

};
    const statusClass = {

        Assigned: "assigned",

        "In Progress": "progress",

        Completed: "completed",

        Missed: "missed"

    };
const buttonConfig = {

    Assigned: {

        text: "START PATROL",

        icon: <FaPlay/>,

        className: "gx-btn-start",

        onClick: startPatrol

    },

    "In Progress": {

        text: "CONTINUE PATROL",

        icon: <FaArrowRight/>,

        className: "gx-btn-progress",

        onClick: continuePatrol

    },

Completed: {

    text: "VIEW SUMMARY",

    icon: <FaCheckCircle />,

    className: "gx-btn-completed",

    onClick: () =>
        navigate(
            `/employee/patrol-completed/${patrol.session_id}`
        )

},

    Missed: {

        text: "MISSED",

        icon: <FaClock/>,

        className: "gx-btn-missed",

        onClick: null

    }

};
const action = buttonConfig[status];
    return (

        <div className="gx-patrol-card">

            {/* ================= HEADER ================= */}

            <div className="gx-patrol-header">

                <div>

                    <div className="gx-route-title">

                        <FaRoute />

                        <span>{patrol.route_name}</span>

                    </div>

                    <small>{patrol.route_code}</small>

                </div>

                <div className={`gx-status ${statusClass[status] || "assigned"}`}>

                    {status}

                </div>

            </div>

            {/* ================= DETAILS ================= */}

            <div className="gx-patrol-section">

                <div className="gx-info">

                    <FaMapMarkerAlt />

                    <div>

                        <label>Site</label>

                        <span>{patrol.site_name}</span>

                    </div>

                </div>

                <div className="gx-info">

                    <FaUserShield />

                    <div>

                        <label>Supervisor</label>

                        <span>{patrol.supervisor_name || "-"}</span>

                    </div>

                </div>

                <div className="gx-info">

                    <FaClock />

                    <div>

                        <label>Shift</label>

                        <span>{patrol.start_time}</span>

                    </div>

                </div>

                <div className="gx-info">

                    <FaFlag />

                    <div>

                        <label>Duration</label>

                        <span>{patrol.expected_duration} Minutes</span>

                    </div>

                </div>

            </div>

            {/* ================= PROGRESS ================= */}

            <div className="gx-progress-section">

                <div className="gx-progress-header">

                    <span>Patrol Progress</span>

                    <strong>{progress}%</strong>

                </div>

                <div className="gx-progress">

                    <div

                        className="gx-progress-fill"

                        style={{

                            width: `${progress}%`

                        }}

                    />

                </div>

                <div className="gx-progress-stats">

                    <div>

                        <strong>{completed}</strong>

                        <small>Completed</small>

                    </div>

                    <div>

                        <strong>{remaining}</strong>

                        <small>Remaining</small>

                    </div>

                    <div>

                        <strong>{total}</strong>

                        <small>Checkpoints</small>

                    </div>

                </div>

            </div>

            {/* ================= NEXT CHECKPOINT ================= */}

            <div className="gx-next-checkpoint">

                <FaClipboardCheck />

                <div>

                    <label>Next Checkpoint</label>

                    <span>

                        {

                            patrol.next_checkpoint ||

                            "Ready to Start"

                        }

                    </span>

                </div>

            </div>

            {/* ================= BUTTON ================= */}

<div className="gx-patrol-footer">

    {

        action &&

        <button

            className={action.className}

            onClick={action.onClick}

            disabled={!action.onClick}

        >

            {action.icon}

            {action.text}

        </button>

    }

</div>

        </div>

    );

}

export default PatrolCard;