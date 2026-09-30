import React, { useState } from "react";

export default function PatrolAssignmentStatusDialog({

    assignment,

    close,

    confirm

}){

    const [loading,setLoading]=useState(false);

    async function handleConfirm(){

        try{

            setLoading(true);

            await confirm();

        }

        finally{

            setLoading(false);

        }

    }

    return(

        <div className="gx-modal-overlay">

            <div className="gx-modal gx-modal-sm">

                <div className="gx-modal-header">

                    <h2>

                        Change Status

                    </h2>

                </div>

                <div className="gx-modal-body">

                    <p>

                        Are you sure you want to

                        {

                            assignment?.status

                            ?

                            " deactivate "

                            :

                            " activate "

                        }

                        this patrol assignment?

                    </p>

                    <div className="gx-info-box">

                        <strong>

                            {assignment?.assignment_code}

                        </strong>

                        <br/>

                        {assignment?.employee_name}

                    </div>

                </div>

                <div className="gx-modal-footer">

                    <button

                        className="gx-btn-light"

                        onClick={close}

                        disabled={loading}

                    >

                        Cancel

                    </button>

                    <button

                        className="gx-btn-warning"

                        onClick={handleConfirm}

                        disabled={loading}

                    >

                        {

                            loading

                            ?

                            "Updating..."

                            :

                            assignment?.status

                            ?

                            "Deactivate"

                            :

                            "Activate"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

}