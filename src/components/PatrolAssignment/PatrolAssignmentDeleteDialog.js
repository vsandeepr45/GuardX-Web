import React,{useState} from "react";

export default function PatrolAssignmentDeleteDialog({

    assignment,

    close,

    confirm

}){

    const [loading,setLoading]=useState(false);

    async function handleDelete(){

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

                        Delete Assignment

                    </h2>

                </div>

                <div className="gx-modal-body">

                    <p>

                        This action cannot be undone.

                    </p>

                    <p>

                        Do you really want to delete

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

                        disabled={loading}

                        onClick={close}

                    >

                        Cancel

                    </button>

                    <button

                        className="gx-btn-danger"

                        disabled={loading}

                        onClick={handleDelete}

                    >

                        {

                            loading

                            ?

                            "Deleting..."

                            :

                            "Delete"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

}