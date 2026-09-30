import {
    FaExclamationTriangle,
    FaInfoCircle,
    FaCheckCircle
} from "react-icons/fa";

import "../../styles/NewDashboard.css";

const icons = {
    danger: <FaExclamationTriangle />,
    warning: <FaExclamationTriangle />,
    success: <FaCheckCircle />,
    info: <FaInfoCircle />
};

export default function Notifications({ data = [] }) {

    return (

        <div className="gx-dashboard-card">

            <div className="gx-widget-header">

                <h3>Notifications</h3>

                <span>{data.length}</span>

            </div>

            {
                data.length === 0 ?

                    <div className="gx-empty">

                        No notifications

                    </div>

                :

                data.map((item,index)=>(

                    <div
                        key={index}
                        className={`gx-notification ${item.type}`}
                    >

                        <div className="gx-notification-icon">

                            {icons[item.type]}

                        </div>

                        <div>

                            <h5>{item.title}</h5>

                            <p>{item.message}</p>

                        </div>

                    </div>

                ))
            }

        </div>

    );

}