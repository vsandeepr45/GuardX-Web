import React from "react";

import {
    FaUserShield,
    FaRoute,
    FaCalendarAlt,
    FaClock,
    FaClipboardList,
    FaCheckCircle
} from "react-icons/fa";

export default function PatrolAssignmentView({

    assignment,

    close

}){

    if(!assignment){

        return null;

    }

    const workingDays=[];

    if(assignment.monday) workingDays.push("Mon");
    if(assignment.tuesday) workingDays.push("Tue");
    if(assignment.wednesday) workingDays.push("Wed");
    if(assignment.thursday) workingDays.push("Thu");
    if(assignment.friday) workingDays.push("Fri");
    if(assignment.saturday) workingDays.push("Sat");
    if(assignment.sunday) workingDays.push("Sun");

    return(

        <div className="gx-modal">

            <div className="gx-view-modal">

                {/* Header */}

                <div className="gx-modal-header">

                    <h2>

                        Patrol Assignment Details

                    </h2>

                    <button

                        className="gx-close"

                        onClick={close}

                    >

                        ×

                    </button>

                </div>

                <div className="gx-modal-body">

                    {/* Assignment */}

                    <div className="gx-view-section">

                        <h3>

                            <FaClipboardList />

                            Assignment

                        </h3>

                        <div className="gx-info-grid">

                            <div>

                                <label>

                                    Assignment Code

                                </label>

                                <p>

                                    {assignment.assignment_code}

                                </p>

                            </div>

                            <div>

                                <label>

                                    Status

                                </label>

                                <p>

                                    {

                                        assignment.status ?

                                        <span className="gx-status active">

                                            Active

                                        </span>

                                        :

                                        <span className="gx-status inactive">

                                            Inactive

                                        </span>

                                    }

                                </p>

                            </div>

                        </div>

                    </div>

                    {/* Employee */}

                    <div className="gx-view-section">

                        <h3>

                            <FaUserShield />

                            Employee

                        </h3>

                        <div className="gx-info-grid">

                            <div>

                                <label>

                                    Employee Code

                                </label>

                                <p>

                                    {assignment.employee_code}

                                </p>

                            </div>

                            <div>

                                <label>

                                    Employee Name

                                </label>

                                <p>

                                    {assignment.employee_name}

                                </p>

                            </div>

                            <div>

                                <label>

                                    Supervisor

                                </label>

                                <p>

                                    {

                                        assignment.supervisor_name ||

                                        "-"

                                    }

                                </p>

                            </div>

                        </div>

                    </div>

                    {/* Route */}

                    <div className="gx-view-section">

                        <h3>

                            <FaRoute />

                            Patrol Route

                        </h3>

                        <div className="gx-info-grid">

                            <div>

                                <label>

                                    Route Code

                                </label>

                                <p>

                                    {assignment.route_code}

                                </p>

                            </div>

                            <div>

                                <label>

                                    Route Name

                                </label>

                                <p>

                                    {assignment.route_name}

                                </p>

                            </div>

                        </div>

                    </div>

                    {/* Schedule */}

                    <div className="gx-view-section">

                        <h3>

                            <FaClock />

                            Schedule

                        </h3>

                        <div className="gx-info-grid">

                            <div>

                                <label>

                                    Schedule Code

                                </label>

                                <p>

                                    {assignment.schedule_code}

                                </p>

                            </div>

                            <div>

                                <label>

                                    Schedule Name

                                </label>

                                <p>

                                    {assignment.schedule_name}

                                </p>

                            </div>

                        </div>

                    </div>

                    {/* Dates */}

                    <div className="gx-view-section">

                        <h3>

                            <FaCalendarAlt />

                            Assignment Duration

                        </h3>

                        <div className="gx-info-grid">

                            <div>

                                <label>

                                    Start Date

                                </label>

                                <p>

                                    {assignment.start_date}

                                </p>

                            </div>

                            <div>

                                <label>

                                    End Date

                                </label>

                                <p>

                                    {

                                        assignment.end_date ||

                                        "-"

                                    }

                                </p>

                            </div>

                        </div>

                    </div>

                    {/* Working Days */}

                    <div className="gx-view-section">

                        <h3>

                            <FaCheckCircle />

                            Working Days

                        </h3>

                        <div className="gx-days">

                            {

                                workingDays.length ?

                                workingDays.map(day=>(

                                    <span

                                        key={day}

                                        className="gx-day"

                                    >

                                        {day}

                                    </span>

                                ))

                                :

                                "-"

                            }

                        </div>

                    </div>

                    {/* Remarks */}

                    <div className="gx-view-section">

                        <h3>

                            Remarks

                        </h3>

                        <p>

                            {

                                assignment.remarks ||

                                "No remarks available."

                            }

                        </p>

                    </div>

                </div>

                <div className="gx-modal-footer">

                    <button

                        className="gx-btn-primary"

                        onClick={close}

                    >

                        Close

                    </button>

                </div>

            </div>

        </div>

    );

}