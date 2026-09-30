import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function RunningPatrolTable({ data = [] }) {

    const navigate = useNavigate();

    return (

        <div className="gx-table-card">

            <div className="gx-table-header">

                <h3>

                    Live Running Patrols

                </h3>

            </div>

            <table className="gx-table">

                <thead>

                    <tr>

                        <th>Guard</th>

                        <th>Route</th>

                        <th>Site</th>

                        <th>Started</th>

                        <th>Elapsed</th>

                        <th>Status</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        data.length === 0 ?

                        (

                            <tr>

                                <td
                                    colSpan="7"
                                    className="gx-empty"
                                >

                                    No Running Patrols

                                </td>

                            </tr>

                        )

                        :

                        data.map(item => (

                            <tr key={item.id}>

                                <td>

                                    {item.employee_name}

                                </td>

                                <td>

                                    {item.route_name}

                                </td>

                                <td>

                                    {item.site_name}

                                </td>

                                <td>

                                    {item.start_time}

                                </td>

                                <td>

                                    {item.elapsed_minutes} mins

                                </td>

                                <td>

                                    <span className="gx-status running">

                                        ● Running

                                    </span>

                                </td>

                                <td>

                                    <button

                                        className="gx-view-btn"

                                        onClick={() =>
                                            navigate(`/patrol/session/${item.id}`)
                                        }

                                    >

                                        <FaEye />

                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}