import React from "react";

import {

    FaClock,
    FaCheckCircle,
    FaTimesCircle,
    FaAlignLeft,
    FaHourglassHalf

} from "react-icons/fa";

function ShiftView({

    shift,

    close

}){

    if(!shift){

        return null;

    }

    return(

        <div className="gx-modal">

            <div className="gx-company-view">

                <div className="gx-status-header">

                    <h2>

                        <FaClock/>

                        &nbsp;

                        Shift Details

                    </h2>

                </div>

                <div className="gx-view-body">

                    <div className="gx-view-grid">

                        <div className="gx-view-item">

                            <FaClock/>

                            <div>

                                <label>

                                    Shift Code

                                </label>

                                <span>

                                    {shift.shift_code}

                                </span>

                            </div>

                        </div>

                        <div className="gx-view-item">

                            <FaClock/>

                            <div>

                                <label>

                                    Shift Name

                                </label>

                                <span>

                                    {shift.shift_name}

                                </span>

                            </div>

                        </div>

                        <div className="gx-view-item">

                            <FaHourglassHalf/>

                            <div>

                                <label>

                                    Start Time

                                </label>

                                <span>

                                    {shift.start_time}

                                </span>

                            </div>

                        </div>

                        <div className="gx-view-item">

                            <FaHourglassHalf/>

                            <div>

                                <label>

                                    End Time

                                </label>

                                <span>

                                    {shift.end_time}

                                </span>

                            </div>

                        </div>

                        <div className="gx-view-item">

                            <FaClock/>

                            <div>

                                <label>

                                    Working Hours

                                </label>

                                <span>

                                    {shift.working_hours}

                                </span>

                            </div>

                        </div>

                        <div className="gx-view-item">

                            <FaClock/>

                            <div>

                                <label>

                                    Grace Time

                                </label>

                                <span>

                                    {shift.grace_time} Minutes

                                </span>

                            </div>

                        </div>

                        <div className="gx-view-item">

                            <FaClock/>

                            <div>

                                <label>

                                    Break Time

                                </label>

                                <span>

                                    {shift.break_time} Minutes

                                </span>

                            </div>

                        </div>

                        <div className="gx-view-item">

                            {

                                shift.status

                                ?

                                <FaCheckCircle color="green"/>

                                :

                                <FaTimesCircle color="red"/>

                            }

                            <div>

                                <label>

                                    Status

                                </label>

                                <span>

                                    {

                                        shift.status

                                        ?

                                        "Active"

                                        :

                                        "Inactive"

                                    }

                                </span>

                            </div>

                        </div>

                    </div>

                    <div className="gx-view-description">

                        <label>

                            <FaAlignLeft/>

                            &nbsp;

                            Description

                        </label>

                        <p>

                            {

                                shift.description

                                ||

                                "No Description"

                            }

                        </p>

                    </div>

                </div>

                <div className="gx-status-footer">

                    <button

                        className="btn-primary"

                        onClick={close}

                    >

                        Close

                    </button>

                </div>

            </div>

        </div>

    );

}

export default ShiftView;