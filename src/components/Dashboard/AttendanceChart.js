import Chart from "react-apexcharts";
import "../../styles/NewDashboard.css";

export default function AttendanceChart({ data }) {

    if (!data) return null;

    const options = {

        chart: {
            toolbar: {
                show: false
            }
        },

        labels: data.labels,

        legend: {
            position: "bottom"
        },

        dataLabels: {
            enabled: true
        }
    };

    return (

        <div className="gx-dashboard-card">

            <h3>Today's Attendance</h3>

            <Chart

                type="donut"

                options={options}

                series={data.series}

                height={320}

            />

        </div>

    );

}