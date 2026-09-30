import "../../styles/NewDashboard.css";

export default function Activities({ data=[] }) {

    return (

        <div className="gx-dashboard-card">

            <div className="gx-widget-header">

                <h3>Recent Activities</h3>

            </div>

            {

                data.length===0 ?

                <div className="gx-empty">

                    No recent activity

                </div>

                :

                data.map((item,index)=>(

                    <div
                        className="gx-activity"
                        key={index}
                    >

                        <div className="gx-activity-dot"/>

                        <div>

                            <h5>

                                {item.title}

                            </h5>

                            <p>

                                {item.description}

                            </p>

                            <small>

                                {item.date}

                            </small>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}