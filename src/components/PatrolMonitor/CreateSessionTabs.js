import { useState } from "react";

import OverviewTab from "./OverviewTab";
import CheckpointTable from "./CheckpointTable";
import AuditTimeline from "./AuditTimeline";
import DeviceTab from "./DeviceTab";
import IncidentTab from "./IncidentTab";

export default function SessionTabs({

    patrol,
    session,
    checkpoints,
    auditLogs

}) {

    const [active,setActive]=useState("overview");

    return(

        <>

            <div className="gx-session-tabs">

                <button
                    className={active==="overview"?"active":""}
                    onClick={()=>setActive("overview")}
                >
                    Overview
                </button>

                <button
                    className={active==="checkpoints"?"active":""}
                    onClick={()=>setActive("checkpoints")}
                >
                    Checkpoints
                </button>

                <button
                    className={active==="timeline"?"active":""}
                    onClick={()=>setActive("timeline")}
                >
                    Timeline
                </button>

                <button
                    className={active==="device"?"active":""}
                    onClick={()=>setActive("device")}
                >
                    Device
                </button>

                <button
                    className={active==="incidents"?"active":""}
                    onClick={()=>setActive("incidents")}
                >
                    Incidents
                </button>

            </div>

            {

                active==="overview" &&

                <OverviewTab

                    patrol={patrol}
                    session={session}

                />

            }

            {

                active==="checkpoints" &&

                <CheckpointTable

                    checkpoints={checkpoints}

                />

            }

            {

                active==="timeline" &&

                <AuditTimeline

                    logs={auditLogs}

                />

            }

            {

                active==="device" &&

                <DeviceTab

                    session={session}

                />

            }

            {

                active==="incidents" &&

                <IncidentTab

                    patrol={patrol}

                />

            }

        </>

    );

}