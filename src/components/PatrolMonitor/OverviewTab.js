export default function OverviewTab({ patrol }) {

    if (!patrol) return null;

    return (

        <div className="gx-overview-tab">

            <h3>Patrol Overview</h3>

            <div className="gx-overview-layout">

                {/* Left */}

                <div className="gx-overview-profile">

                    <img
                        src={
                            patrol.employee_photo ||
                            "/images/default-user.png"
                        }
                        alt={patrol.employee_name}
                    />

                    <div className="gx-battery-card">

                        <label>Battery Level</label>

                        <h3>{patrol.battery_level}%</h3>

                    </div>

                </div>

                {/* Right */}

                <div className="gx-overview-info">

                    <div className="gx-info-card">
                        <label>Employee</label>
                        <p>{patrol.employee_name}</p>
                    </div>

                    <div className="gx-info-card">
                        <label>Employee Code</label>
                        <p>{patrol.employee_code}</p>
                    </div>

                    <div className="gx-info-card">
                        <label>Site</label>
                        <p>{patrol.site_name}</p>
                    </div>

                    <div className="gx-info-card">
                        <label>Route</label>
                        <p>{patrol.route_name}</p>
                    </div>

                    <div className="gx-info-card">
                        <label>Shift</label>
                        <p>{patrol.shift_name}</p>
                    </div>

                    <div className="gx-info-card">
                        <label>Supervisor</label>
                        <p>{patrol.supervisor_name || "--"}</p>
                    </div>

                    <div className="gx-info-card">
                        <label>Status</label>
                        <span className={`gx-status ${patrol.status?.toLowerCase()}`}>
                            {patrol.status}
                        </span>
                    </div>

                    <div className="gx-info-card">
                        <label>Progress</label>
                        <p>{patrol.progress_text}</p>
                    </div>

                </div>

            </div>

        </div>

    );

}