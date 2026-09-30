import "../../styles/PatrolMonitor.css";
import {

    getPatrolDashboard,

    getLivePatrols,

    getPatrolSession,

    getPatrolCheckpoints,

    getPatrolAuditLogs

} from "../../api/patrolMonitorApi";
import { useEffect, useState } from "react";
import PatrolSummaryCards from "./PatrolSummaryCards";
import PatrolFilters from "./PatrolFilters";
import LivePatrolList from "./LivePatrolList";
// import SessionDetails from "./SessionDetails";
// import CheckpointTable from "./CheckpointTable";
// import AuditTimeline from "./AuditTimeline";
import CreateSessionTabs from "./CreateSessionTabs";
export default function PatrolMonitorPage() {
const [dashboard,setDashboard]=useState({});

const [filters,setFilters]=useState({});

const [livePatrols,setLivePatrols]=useState([]);

const [selectedPatrol,setSelectedPatrol]=useState(null);

const [session,setSession]=useState(null);

const [checkpoints,setCheckpoints]=useState([]);

const [auditLogs,setAuditLogs]=useState([]);

const [loading,setLoading]=useState(false);

useEffect(()=>{

    loadDashboard();

},[]);
useEffect(()=>{

    const interval=setInterval(()=>{

        loadPatrols();

    },30000);

    return ()=>clearInterval(interval);

},[filters]);
async function loadDashboard() {

    try {

const response = await getPatrolDashboard();

console.log("Dashboard Response:", response.data);

setDashboard(response.data);

    } catch (err) {

        console.error(err);

    }

}
useEffect(()=>{

    loadPatrols();

},[filters]);

async function loadPatrols() {

    setLoading(true);

    try {

const response = await getLivePatrols(filters);

setLivePatrols(response.data || []);

if(selectedPatrol){

    const updated = response.data.find(

        p => p.session_id === selectedPatrol.session_id

    );

    if(updated){

        setSelectedPatrol(updated);

    }

}else if(response.data.length){

    selectPatrol(response.data[0]);

}

    } catch (err) {

        console.error(err);

    } finally {

        setLoading(false);

    }

}

async function selectPatrol(patrol){

    setSelectedPatrol(patrol);

    if(!patrol.session_id){

        setSession(null);

        setCheckpoints([]);

        setAuditLogs([]);

        return;

    }

    try{

        const sessionRes = await getPatrolSession(
            patrol.session_id
        );

        setSession(sessionRes.data);

        const checkpointRes =
            await getPatrolCheckpoints(
                patrol.session_id
            );

        setCheckpoints(
            checkpointRes.data || []
        );

        const auditRes =
            await getPatrolAuditLogs(
                patrol.session_id
            );

        setAuditLogs(
            auditRes.data || []
        );

    }catch(err){

        console.error(err);

    }

}
    return (

        <div className="gx-patrol-monitor-page">

            {/* Header */}

            <div className="gx-patrol-monitor-header">

                <div>

                    <h2>Patrol Operations Center</h2>

                    <p>

                        Monitor all active patrols, checkpoints and incidents in real time.

                    </p>

                </div>

            </div>

            {/* Summary */}

<div className="gx-patrol-monitor-summary">

    <PatrolSummaryCards

        dashboard={dashboard}

    />

</div>

            {/* Filters */}

<div className="gx-patrol-monitor-filters">

    <PatrolFilters

        filters={filters}

        setFilters={setFilters}

        dashboard={dashboard}

    />

</div>

            {/* Main Layout */}

            <div className="gx-patrol-monitor-layout">

<LivePatrolList

    patrols={livePatrols}

    selectedPatrol={selectedPatrol}

    onSelect={selectPatrol}

    loading={loading}

/>

                <div className="gx-patrol-monitor-content">

<CreateSessionTabs
    patrol={selectedPatrol}
    session={session}
    checkpoints={checkpoints}
    auditLogs={auditLogs}
/>

                </div>

            </div>

        </div>

    );

}