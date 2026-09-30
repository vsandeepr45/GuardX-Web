import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import PatrolCard from "../../components/EmployeePatrol/PatrolCard";

import { getMyPatrols } from "../../api/patrol";

import "../../styles/employee-patrol.css";

function MyPatrols() {

    const [loading, setLoading] = useState(true);

    const [patrols, setPatrols] = useState([]);

    const loadPatrols = async () => {

        try {

            const response = await getMyPatrols();

            setPatrols(response.data.data || []);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadPatrols();

    }, []);

    return (

        <DashboardLayout title="My Patrols">

            <div className="gx-page-header">

                <div>

                    <h2>My Patrols</h2>

                    <p>
                        View and manage today's assigned patrols.
                    </p>

                </div>

            </div>

            {

                loading ?

                <div className="gx-loading">

                    Loading Patrols...

                </div>

                :

                patrols.length === 0 ?

                <div className="gx-empty-card">

                    No Patrol Assigned.

                </div>

                :

                <div className="gx-patrol-grid">

                    {

                        patrols.map((patrol)=>(

                            <PatrolCard

                                key={patrol.assignment_id}

                                patrol={patrol}

                            />

                        ))

                    }

                </div>

            }

        </DashboardLayout>

    );

}

export default MyPatrols;