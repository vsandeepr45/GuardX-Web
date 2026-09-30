import {

    useEffect,
    useState

} from "react";

import {

    useNavigate,
    useParams

} from "react-router-dom";

import {

    FaCheckCircle,
    FaClipboardCheck,
    FaClock,
    FaCamera,
    FaAward,
    FaHome,
    FaArrowLeft,
    FaRoute,
    FaMapMarkerAlt,
    FaUserShield

} from "react-icons/fa";

import DashboardLayout from "../../../layouts/DashboardLayout";

import {

    getCompletedPatrol

} from "../../../api/patrol";

import "../../../styles/PatrolCompleted.css";

export default function PatrolCompleted(){

    const navigate = useNavigate();

    const { sessionId } = useParams();

    const [loading,setLoading] = useState(true);

    const [patrol,setPatrol] = useState(null);

    useEffect(()=>{

        loadPatrol();

    },[]);

    async function loadPatrol(){

        try{

            const res = await getCompletedPatrol(sessionId);

            setPatrol(

                res.data.data

            );

        }

        catch(err){

            console.log(err);

        }

        finally{

            setLoading(false);

        }

    }

    if(loading){

        return(

            <DashboardLayout>

                <div className="gx-loading">

                    Loading Patrol...

                </div>

            </DashboardLayout>

        );

    }

    if(!patrol){

        return(

            <DashboardLayout>

                <div className="gx-empty-page">

                    Patrol Not Found

                </div>

            </DashboardLayout>

        );

    }

    return(

        <DashboardLayout>
<div className="gx-success-actions">

    <button
        className="gx-secondary-btn"
        onClick={() => navigate("/dashboard")}
    >
        <FaHome />
        Dashboard
    </button>

    <button
        className="gx-primary-btn"
        onClick={() => navigate("/employee/my-patrols")}
    >
        <FaArrowLeft />
        My Patrols
    </button>

</div>
            <div className="gx-completed-page">

                {/* HERO */}
                                {/* ===========================================
                    ACTION BUTTONS
                =========================================== */}


                <div className="gx-success-card">

                    <FaCheckCircle

                        className="gx-success-icon"

                    />

                    <h1>

                        Patrol Completed Successfully

                    </h1>

                    <p>

                        Excellent work.

                        Your patrol has been verified successfully.

                    </p>

                </div>

                {/* KPI */}

                <div className="gx-summary-grid">

                    <div className="gx-summary-card">

                        <FaClipboardCheck/>

                        <h2>

                            {patrol.completed}/{patrol.total}

                        </h2>

                        <span>

                            Checkpoints

                        </span>

                    </div>

                    <div className="gx-summary-card">

                        <FaClock/>

                        <h2>

                            {patrol.actual_duration}

                            min

                        </h2>

                        <span>

                            Duration

                        </span>

                    </div>

                    <div className="gx-summary-card">

                        <FaAward/>

                        <h2>

                            {patrol.compliance}%

                        </h2>

                        <span>

                            Compliance

                        </span>

                    </div>

                    <div className="gx-summary-card">

                        <FaCamera/>

                        <h2>

                            {patrol.photos}

                        </h2>

                        <span>

                            Photos

                        </span>

                    </div>

                </div>  

                                <div className="gx-details-card">

                    <h2>

                        Patrol Information

                    </h2>

                    <div className="gx-info-grid">

                        <div>

                            <label>

                                Session Code

                            </label>

                            <strong>

                                {patrol.session_code}

                            </strong>

                        </div>

                        <div>

                            <label>

                                Status

                            </label>

                            <strong>

                                {patrol.status}

                            </strong>

                        </div>

                        <div>

                            <label>

                                Route

                            </label>

                            <strong>

                                {patrol.route_name}

                            </strong>

                        </div>

                        <div>

                            <label>

                                Site

                            </label>

                            <strong>

                                {patrol.site_name}

                            </strong>

                        </div>

                        <div>

                            <label>

                                Employee

                            </label>

                            <strong>

                                {patrol.employee_name}

                            </strong>

                        </div>

                        <div>

                            <label>

                                Supervisor

                            </label>

                            <strong>

                                {

                                    patrol.supervisor_name ||

                                    "-"

                                }

                            </strong>

                        </div>

                    </div>

                </div>

                                {/* ===========================================
                    TIMELINE
                =========================================== */}

                <div className="gx-timeline-card">

                    <h2>

                        Patrol Timeline

                    </h2>

                    {

                        patrol.timeline.length===0 ?

                        (

                            <p>

                                No checkpoint records found.

                            </p>

                        )

                        :

                        (

                            <div className="gx-timeline">

                                {

                                    patrol.timeline.map((item,index)=>(

                                        <div
                                            key={index}
                                            className="gx-timeline-item"
                                        >

                                            <div className="gx-timeline-dot">

                                                <FaCheckCircle/>

                                            </div>

                                            <div className="gx-timeline-content">

                                                <h4>

                                                    {

                                                        item.checkpoint_name

                                                    }

                                                </h4>

                                                <span>

                                                    {

                                                        new Date(

                                                            item.scan_time

                                                        ).toLocaleString()

                                                    }

                                                </span>

                                                <p>

                                                    Status :

                                                    {" "}

                                                    <strong>

                                                        {

                                                            item.status

                                                        }

                                                    </strong>

                                                </p>

                                            </div>

                                        </div>

                                    ))

                                }

                            </div>

                        )

                    }

                </div>

                                {/* ===========================================
                    ACHIEVEMENTS
                =========================================== */}

                <div className="gx-badge-card">

                    <h2>

                        Patrol Achievements

                    </h2>

                    <div className="gx-badges">

                        {

                            patrol.compliance===100 &&

                            <span>

                                🏆 Perfect Patrol

                            </span>

                        }

                        <span>

                            📍 GPS Verified

                        </span>

                        <span>

                            📷 Evidence Uploaded

                        </span>

                        <span>

                            ✔ Patrol Completed

                        </span>

                        {

                            patrol.photos===patrol.completed &&

                            <span>

                                📸 Every Checkpoint Captured

                            </span>

                        }

                    </div>

                </div>

                                {/* ===========================================
                    PERFORMANCE
                =========================================== */}

                <div className="gx-details-card">

                    <h2>

                        Patrol Performance

                    </h2>

                    <div className="gx-summary-grid">

                        <div className="gx-summary-card">

                            <FaClipboardCheck/>

                            <h2>

                                {

                                    patrol.completed

                                }

                            </h2>

                            <span>

                                Completed

                            </span>

                        </div>

                        <div className="gx-summary-card">

                            <FaCamera/>

                            <h2>

                                {

                                    patrol.photos

                                }

                            </h2>

                            <span>

                                Photos

                            </span>

                        </div>

                        <div className="gx-summary-card">

                            <FaAward/>

                            <h2>

                                {

                                    patrol.remarks

                                }

                            </h2>

                            <span>

                                Remarks

                            </span>

                        </div>

                        <div className="gx-summary-card">

                            <FaClock/>

                            <h2>

                                {

                                    patrol.actual_duration

                                }

                            </h2>

                            <span>

                                Minutes

                            </span>

                        </div>

                    </div>

                </div>



            </div>

        </DashboardLayout>

    );

}