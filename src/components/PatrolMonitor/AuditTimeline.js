import {

    FaPlayCircle,
    FaPauseCircle,
    FaCheckCircle,
    FaMapMarkerAlt,
    FaSatelliteDish,
    FaExclamationTriangle,
    FaCamera,
    FaRedoAlt

} from "react-icons/fa";

const ICONS = {

    Started: <FaPlayCircle />,

    Checkpoint: <FaMapMarkerAlt />,

    Pause: <FaPauseCircle />,

    Resume: <FaRedoAlt />,

    "GPS Lost": <FaSatelliteDish />,

    "GPS Restored": <FaSatelliteDish />,

    SOS: <FaExclamationTriangle />,

    Photo: <FaCamera />,

    Completed: <FaCheckCircle />

};

export default function AuditTimeline({

    logs = []

}) {

    return (

        <div className="gx-patrol-monitor-timeline">

            <div className="gx-patrol-monitor-section-header">

                <h3>

                    Activity Timeline

                </h3>

                <span>

                    {logs.length} Events

                </span>

            </div>

            {

                logs.length === 0 ?

                (

                    <div className="gx-patrol-monitor-empty">

                        No activity found.

                    </div>

                )

                :

                logs.map((log,index)=>(

                    <div

                        key={index}

                        className="gx-patrol-monitor-event"

                    >

                        <div

                            className={`

                                gx-patrol-monitor-event-icon

                                gx-${log.color || "primary"}

                            `}

                        >

                            {

                                ICONS[log.event]

                                ||

                                <FaMapMarkerAlt/>

                            }

                        </div>

                        <div

                            className="gx-patrol-monitor-event-body"

                        >

                            <h4>

                                {log.event}

                            </h4>

                            <p>

                                {log.description}

                            </p>

                            <small>

                                {log.event_time}

                            </small>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}