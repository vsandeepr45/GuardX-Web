import {

    FaWalking,
    FaCheckCircle,
    FaClock,
    FaExclamationTriangle,
    FaRoute,
    FaMapMarkerAlt

} from "react-icons/fa";

export default function PatrolSummaryCards({ dashboard }) {
const summary = dashboard?.summary || {};

const cards = [

    {
        title:"Running Patrols",
        value:summary.running || 0,
        icon:<FaWalking/>,
        color:"running"
    },

    {
        title:"Completed",
        value:summary.completed || 0,
        icon:<FaCheckCircle/>,
        color:"completed"
    },

    {
        title:"Pending",
        value:summary.pending || 0,
        icon:<FaClock/>,
        color:"pending"
    },

    {
        title:"Late",
        value:summary.late || 0,
        icon:<FaExclamationTriangle/>,
        color:"alert"
    },

    {
        title:"Missed",
        value:summary.missed || 0,
        icon:<FaExclamationTriangle/>,
        color:"alert"
    },

    {
        title:"Compliance",
        value:`${summary.compliance || 0}%`,
        icon:<FaRoute/>,
        color:"route"
    }

];
    return (

        <div className="gx-patrol-monitor-summary-grid">

            {

                cards.map((card,index)=>(

                    <div

                        key={index}

                        className={`gx-patrol-monitor-summary-card gx-${card.color}`}

                    >

                        <div className="gx-patrol-monitor-summary-icon">

                            {card.icon}

                        </div>

                        <div>

                            <h3>

                                {card.value}

                            </h3>

                            <span>

                                {card.title}

                            </span>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}