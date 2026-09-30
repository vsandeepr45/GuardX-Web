import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function RecentCompletedTable({ data = [] }) {

    const navigate = useNavigate();

    return (

        <div className="gx-table-card">

            <div className="gx-table-header">

                <h3>

                    Recently Completed Patrols

                </h3>

            </div>

            <table className="gx-table">

                <thead>

                    <tr>

                        <th>Guard</th>

                        <th>Route</th>

                        <th>Site</th>

                        <th>Completed</th>

                        <th>Duration</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        data.length === 0 ?

                        (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="gx-empty"
                                >

                                    No Completed Patrols

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

                                    {item.end_time}

                                </td>

                                <td>

                                    {item.duration} mins

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