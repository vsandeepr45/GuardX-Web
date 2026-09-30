import Chart from "react-apexcharts";
import "../../styles/NewDashboard.css";

export default function DepartmentChart({ data }) {

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

            <h3>Employees by Department</h3>

            <Chart

                type="bar"

                options={options}

                series={[
                    {
                        name: "Employees",
                        data: data.series
                    }
                ]}

                height={320}

            />

        </div>

    );

}