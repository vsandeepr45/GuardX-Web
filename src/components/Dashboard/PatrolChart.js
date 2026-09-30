import Chart from "react-apexcharts";
import "../../styles/NewDashboard.css";

export default function PatrolChart({ data }) {

    if (!data) return null;

    const options = {

        chart: {

            toolbar: {

                show: false

            }

        },

        xaxis: {

            categories: data.labels

        }

    };

    return (

        <div className="gx-dashboard-card">

            <h3>Patrol Status</h3>

            <Chart

                type="bar"

                options={options}

                series={[
                    {
                        name: "Patrols",
                        data: data.series
                    }
                ]}

                height={320}

            />

        </div>

    );

}