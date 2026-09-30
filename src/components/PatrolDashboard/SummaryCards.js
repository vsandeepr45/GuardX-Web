import {
    FaClipboardList,
    FaPlayCircle,
    FaCheckCircle,
    FaTimesCircle
} from "react-icons/fa";

const cards = [

    {
        key: "assigned",
        title: "Assigned",
        icon: <FaClipboardList />,
        color: "#3b82f6"
    },

    {
        key: "running",
        title: "Running",
        icon: <FaPlayCircle />,
        color: "#f59e0b"
    },

    {
        key: "completed",
        title: "Completed",
        icon: <FaCheckCircle />,
        color: "#10b981"
    },

    {
        key: "missed",
        title: "Missed",
        icon: <FaTimesCircle />,
        color: "#ef4444"
    }

];

export default function SummaryCards({ data }) {

    return (

        <div className="gx-summary-grid">

            {

                cards.map(card => (

                    <div
                        key={card.key}
                        className="gx-summary-card"
                        style={{
                            borderTop: `4px solid ${card.color}`
                        }}
                    >

                        <div className="gx-summary-icon">

                            {card.icon}

                        </div>

                        <div>

                            <h4>

                                {card.title}

                            </h4>

                            <h2>

                                {data[card.key] || 0}

                            </h2>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}