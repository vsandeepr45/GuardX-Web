import "../../styles/NewDashboard.css";

export default function SummaryCard({

    title,
    value,
    icon,
    color

}) {

    return (

        <div
            className="gx-summary-card"
            style={{ "--accent": color }}
        >

            <div className="gx-summary-accent" />

            <div className="gx-summary-icon">

                {icon}

            </div>

            <div className="gx-summary-content">

                <h5>

                    {title}

                </h5>

                <h2>

                    {value ?? 0}

                </h2>

            </div>

        </div>

    );

}