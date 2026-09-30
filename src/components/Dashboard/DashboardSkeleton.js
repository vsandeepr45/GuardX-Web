import "../../styles/NewDashboard.css";

export default function DashboardSkeleton() {

    return (

        <div className="gx-dashboard">

            <div className="gx-skeleton-header"></div>

            <div className="gx-summary-grid">

                {[...Array(6)].map((_, index) => (

                    <div
                        key={index}
                        className="gx-skeleton-card"
                    />

                ))}

            </div>

            <div className="gx-chart-grid">

                {[...Array(3)].map((_, index) => (

                    <div
                        key={index}
                        className="gx-skeleton-chart"
                    />

                ))}

            </div>

            <div className="gx-widget-grid">

                {[...Array(2)].map((_, index) => (

                    <div
                        key={index}
                        className="gx-skeleton-widget"
                    />

                ))}

            </div>

        </div>

    );

}