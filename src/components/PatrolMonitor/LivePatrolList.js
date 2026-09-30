import { useMemo, useState } from "react";

import {

    FaSearch,

    FaBatteryThreeQuarters,

    FaMapMarkerAlt,

    FaRoute

} from "react-icons/fa";

export default function LivePatrolList({

    patrols,

    selectedPatrol,

    onSelect,

    loading

}) {

const [search, setSearch] = useState("");

// Safety check
const patrolList = Array.isArray(patrols) ? patrols : [];

const filteredPatrols = useMemo(() => {

    const keyword = search.toLowerCase();

    return patrolList.filter(item => {

        return (

            item.employee_name?.toLowerCase().includes(keyword) ||

            item.route_name?.toLowerCase().includes(keyword) ||

            item.site_name?.toLowerCase().includes(keyword)

        );

    });

}, [patrolList, search]);

    return(

        <>

            {/* Search */}

            {/* <div className="gx-patrol-monitor-search">

                <FaSearch/>

                <input

                    type="text"

                    placeholder="Search patrol..."

                    value={search}

                    onChange={(e)=>setSearch(e.target.value)}

                />

            </div> */}

            {/* List */}

            <div className="gx-patrol-monitor-live-list">

                {

                    loading ?

                    (

                        <div className="gx-patrol-monitor-empty">

                            Loading Patrols...

                        </div>

                    )

                    :

                    filteredPatrols.length===0 ?

                    (

                        <div className="gx-patrol-monitor-empty">

                            No Patrols Found

                        </div>

                    )

                    :

                    filteredPatrols.map(patrol=>(

                        <div

                            key={patrol.assignment_id}

                            onClick={()=>onSelect(patrol)}

                            className={`

                                gx-patrol-monitor-live-card

                                ${selectedPatrol?.assignment_id === patrol.assignment_id ? "active" : ""}

                            `}

                        >

                            {/* Header */}

<div className="gx-patrol-monitor-live-header">

    <img
        src={patrol.employee_photo || "/images/default-user.png"}
        alt="employee"
    />

    <div className="gx-patrol-monitor-live-info">

        <h4>{patrol.employee_name}</h4>

        <small>{patrol.employee_code}</small>

    </div>

    <div className="gx-live-progress">

        {patrol.progress || 0}%

    </div>

</div>
                            {/* Route */}

                            <div className="gx-patrol-monitor-live-row">

                                <FaRoute/>

                                <span>

                                    {patrol.route_name}

                                </span>

                            </div>

                            {/* Site */}

                            <div className="gx-patrol-monitor-live-row">

                                <FaMapMarkerAlt/>

                                <span>

                                    {patrol.site_name}

                                </span>

                            </div>

                            {/* Progress */}

                            <div className="gx-patrol-monitor-progress">

                                <div

                                    className="gx-patrol-monitor-progress-bar"

                                >

                                    <div

                                        className="gx-patrol-monitor-progress-fill"

                                        style={{

                                            width:`${patrol.progress || 0}%`

                                        }}

                                    />

                                </div>

                                <small>

                                    {

                                        patrol.progress_text ||

                                        "0/0"

                                    }

                                </small>

                            </div>

                            {/* Footer */}

                            <div className="gx-patrol-monitor-live-footer">

                                <span

                                    className={`

                                        gx-patrol-status

                                        ${patrol.status?.toLowerCase()}

                                    `}

                                >

                                    {patrol.status}

                                </span>

                                <span>

                                    <FaBatteryThreeQuarters/>

                                    {" "}

                                    {patrol.battery_level}%

                                </span>

                            </div>

                        </div>

                    ))

                }

            </div>

        </>

    );

}