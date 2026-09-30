// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import DashboardLayout from "../../../layouts/DashboardLayout";
// import {
//     FaArrowLeft,
//     FaRoute,
//     FaPlayCircle,
//     FaMapMarkerAlt,
//     FaClock,
//     FaWifi,
//     FaLocationArrow,
//     FaClipboardCheck,
//     FaArrowRight
// } from "react-icons/fa";

// import "../../../styles/ActivePatrol.css";

// export default function ActivePatrol() {

//     const { sessionId } = useParams();

//     const navigate = useNavigate();

//     const [elapsed, setElapsed] = useState("00:00:00");

//     // Temporary data
// const [patrol, setPatrol] = useState(null);

// const [checkpoints, setCheckpoints] = useState([]);

// const [loading, setLoading] = useState(true);

// const [gpsStatus, setGpsStatus] = useState(false);

// const [accuracy, setAccuracy] = useState(null);

// const [network, setNetwork] = useState(navigator.onLine);

//     useEffect(() => {

//         let seconds = 0;

//         const timer = setInterval(() => {

//             seconds++;

//             const h = String(Math.floor(seconds / 3600)).padStart(2, "0");

//             const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");

//             const s = String(seconds % 60).padStart(2, "0");

//             setElapsed(`${h}:${m}:${s}`);

//         }, 1000);

//         return () => clearInterval(timer);

//     }, []);


//     return (

//         <DashboardLayout>

//         <div className="gx-active-page">

//             {/* Header */}

//             <div className="gx-active-header">

//                 <button

//                     className="gx-back-btn"

//                     onClick={() => navigate(-1)}

//                 >

//                     <FaArrowLeft />

//                 </button>

//                 <div>

//                     <h2>{patrol.route_name}</h2>

//                     <span>{patrol.route_code}</span>

//                 </div>

//                 <div className="gx-running">

//                     <FaPlayCircle />

//                     Patrol Running

//                 </div>

//             </div>

//             {/* Dashboard */}

//             <div className="gx-dashboard">

//                 {/* Timer */}

//                 <div className="gx-box">

//                     <FaClock />

//                     <label>Elapsed Time</label>

//                     <h1>{elapsed}</h1>

//                 </div>

//                 {/* Progress */}

//                 <div className="gx-box">

//                     <FaRoute />

//                     <label>Today's Progress</label>

//                     <div className="gx-progress">

//                         <div

//                             className="gx-progress-fill"

//                             style={{

//                                 width: `${patrol.progress}%`

//                             }}

//                         />

//                     </div>

//                     <span>

//                         {patrol.completed}

//                         /

//                         {patrol.total}

//                         Checkpoints

//                     </span>

//                 </div>

//                 {/* GPS */}

//                 <div className="gx-box">

//                     <FaMapMarkerAlt />

//                     <label>GPS Status</label>

//                     <h3>

//                         {

//                             patrol.gps

//                                 ?

//                                 "Connected"

//                                 :

//                                 "Disconnected"

//                         }

//                     </h3>

//                     <span>

//                         Accuracy :

//                         {patrol.accuracy}

//                     </span>

//                 </div>

//                 {/* Network */}

//                 <div className="gx-box">

//                     <FaWifi />

//                     <label>Network</label>

//                     <h3>Online</h3>

//                 </div>

//             </div>

//             {/* Next Checkpoint */}

//             <div className="gx-next-card">

//                 <div className="gx-next-left">

//                     <FaLocationArrow />

//                     <div>

//                         <h3>

//                             {

//                                 patrol.next_checkpoint

//                             }

//                         </h3>

//                         <span>

//                             Distance :

//                             {patrol.distance}

//                         </span>

//                         {

//                             patrol.qr_required &&

//                             <p>

//                                 QR Verification Required

//                             </p>

//                         }

//                     </div>

//                 </div>

//                 <button

//                     className="gx-open-btn"

//                     onClick={() =>

//                         navigate("/employee/checkpoint/5")

//                     }

//                 >

//                     Open Checkpoint

//                     <FaArrowRight />

//                 </button>

//             </div>

//             {/* Timeline */}

//             <div className="gx-timeline">

//                 <h3>

//                     <FaClipboardCheck />

//                     Recent Check-ins

//                 </h3>

//                 <div className="gx-event">

//                     ✔ Parking Gate

//                     <span>09:04 PM</span>

//                 </div>

//                 <div className="gx-event">

//                     ✔ Warehouse

//                     <span>09:11 PM</span>

//                 </div>

//                 <div className="gx-event">

//                     ✔ Generator Room

//                     <span>09:18 PM</span>

//                 </div>

//             </div>

//         </div>
//         </DashboardLayout>

//     );

// }




import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../../../layouts/DashboardLayout";

import {
    FaArrowLeft,
    FaRoute,
    FaPlayCircle,
    FaMapMarkerAlt,
    FaClock,
    FaWifi,
    FaLocationArrow,
    FaClipboardCheck,
    FaArrowRight
} from "react-icons/fa";

import {

    getPatrolSession,

    getSessionCheckpoints

} from "../../../api/patrol";

import "../../../styles/ActivePatrol.css";

export default function ActivePatrol() {

    const navigate = useNavigate();

    const { sessionId } = useParams();

    const [loading,setLoading] = useState(true);

    const [patrol,setPatrol] = useState(null);

    const [checkpoints,setCheckpoints] = useState([]);

    const [elapsed,setElapsed] = useState("00:00:00");

    const [gps,setGps] = useState({

        connected:false,

        accuracy:null

    });

    const [network,setNetwork] = useState(

        navigator.onLine

    );
const loadPatrol = async()=>{

    try{

const [session,cps] = await Promise.all([

    getPatrolSession(sessionId),

    getSessionCheckpoints(sessionId)

]);

setPatrol(session.data.data);

setCheckpoints(cps.data.data);

        setPatrol(session.data.data);

        setCheckpoints(cps.data.data);

    }

catch(err){

    console.error(err);

    setPatrol({});

    setCheckpoints([]);

}

    finally{

        setLoading(false);

    }

};

useEffect(()=>{

    loadPatrol();

},[sessionId]);

useEffect(()=>{

if (!patrol?.start_time) return;

const started = new Date(patrol.start_time);

if (isNaN(started.getTime())) return;

    const timer = setInterval(()=>{

        const diff =

            Math.floor(

                (

                    Date.now()

                    -

                    started.getTime()

                )/1000

            );

        const h =

            String(

                Math.floor(diff/3600)

            ).padStart(2,"0");

        const m =

            String(

                Math.floor(

                    diff%3600/60

                )

            ).padStart(2,"0");

        const s =

            String(

                diff%60

            ).padStart(2,"0");

        setElapsed(

            `${h}:${m}:${s}`

        );

    },1000);

    return ()=>clearInterval(timer);

},[patrol]);

useEffect(()=>{

    if(!navigator.geolocation)

        return;

    const watch =

        navigator.geolocation.watchPosition(

        position=>{

            setGps({

                connected:true,

                accuracy:

                Math.round(

                    position.coords.accuracy

                )

            });

        },

        ()=>{

            setGps({

                connected:false,

                accuracy:null

            });

        }

    );

    return ()=>{

        navigator.geolocation.clearWatch(

            watch

        );

    };

},[]);

useEffect(()=>{

    const online=()=>setNetwork(true);

    const offline=()=>setNetwork(false);

    window.addEventListener(

        "online",

        online

    );

    window.addEventListener(

        "offline",

        offline

    );

    return ()=>{

        window.removeEventListener(

            "online",

            online

        );

        window.removeEventListener(

            "offline",

            offline

        );

    };

},[]);

const completed = patrol?.progress?.completed || 0;

const total = patrol?.progress?.total || 0;

const remaining = patrol?.progress?.remaining || 0;

const progress = patrol?.progress?.percentage || 0;

const nextCheckpoint=

    checkpoints.find(

        x=>x.status!=="Completed"

    );

const timeline = checkpoints.filter(

    cp => cp.status && cp.status === "Completed"

);
const openCheckpoint = () => {

    if (!nextCheckpoint) return;

    navigate(
        `/employee/patrol/${sessionId}/checkpoint/${nextCheckpoint.id}`
    );

};

if(loading){

    return(

        <DashboardLayout>

            <div className="gx-loading">

                Loading Patrol...

            </div>

        </DashboardLayout>

    );

}

return (

<DashboardLayout>

<div className="gx-active-page">

    {/* ================= HEADER ================= */}

    <div className="gx-active-header">

        <button

            className="gx-back-btn"

            onClick={()=>navigate(-1)}

        >

            <FaArrowLeft/>

        </button>

        <div>

            <h2>

                {patrol.route_name}

            </h2>

            <span>

                {patrol.route_code}

            </span>

        </div>

        <div className="gx-running">

            <FaPlayCircle/>

            {patrol.status}

        </div>

    </div>

    {/* ================= DASHBOARD ================= */}

    <div className="gx-dashboard">

        {/* TIMER */}

        <div className="gx-act-box">

            <FaClock/>

            <label>

                Elapsed Time

            </label>

            <h1>

                {elapsed}

            </h1>

        </div>

        {/* PROGRESS */}

        <div className="gx-act-box">

            <FaRoute/>

            <label>

                Patrol Progress

            </label>

            <div className="gx-progress">

                <div

                    className="gx-progress-fill"

                    style={{

                        width:`${progress}%`

                    }}

                />

            </div>

            <span>

                {completed}

                /

                {total}

                Checkpoints

            </span>

        </div>

        {/* GPS */}

        <div className="gx-act-box">

            <FaMapMarkerAlt/>

            <label>

                GPS

            </label>

            <h3>

                {

                    gps.connected

                    ?

                    "Connected"

                    :

                    "Disconnected"

                }

            </h3>

            <span>

                Accuracy :

                {

                    gps.accuracy

                    ?

                    `${gps.accuracy} m`

                    :

                    "-"

                }

            </span>

        </div>

        {/* NETWORK */}

        <div className="gx-act-box">

            <FaWifi/>

            <label>

                Network

            </label>

            <h3>

                {

                    network

                    ?

                    "Online"

                    :

                    "Offline"

                }

            </h3>

        </div>

    </div>

    {/* ================= NEXT CHECKPOINT ================= */}

    {

        nextCheckpoint &&

        <div className="gx-next-card">

            <div className="gx-next-left">

                <FaLocationArrow/>

                <div>

                    <h3>

                        {

                            nextCheckpoint.checkpoint_name

                        }

                    </h3>

                    <span>

                        Sequence :

                        {

                            nextCheckpoint.sequence_no

                        }

                    </span>

                    {

                        nextCheckpoint.mandatory_photo &&

                        <p>

                            📷 Photo Required

                        </p>

                    }

                    {

                        nextCheckpoint.mandatory_remark &&

                        <p>

                            📝 Remarks Required

                        </p>

                    }

                </div>

            </div>

            <button

                className="gx-open-btn"

                onClick={openCheckpoint}

            >

                Open Checkpoint

                <FaArrowRight/>

            </button>

        </div>

    }

    {/* ================= TIMELINE ================= */}

    <div className="gx-timeline">

        <h3>

            <FaClipboardCheck/>

            Recent Check-ins

        </h3>

        {

            timeline.length===0 &&

            <div className="gx-empty">

                No checkpoints completed.

            </div>

        }

        {

            timeline.map(cp=>(

                <div

                    key={cp.id}

                    className="gx-event"

                >

                    <div>

                        ✔ {cp.checkpoint_name}

                    </div>

                    <span>

                        {

                            cp.scan_time

                            ?

                            new Date(

                                cp.scan_time

                            ).toLocaleTimeString()

                            :

                            ""

                        }

                    </span>

                </div>

            ))

        }

    </div>

</div>

</DashboardLayout>

);
}