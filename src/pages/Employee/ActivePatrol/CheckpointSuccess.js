import { useLocation, useNavigate } from "react-router-dom";

import {

    FaCheckCircle,

    FaArrowRight,

    FaRoute,

    FaMapMarkerAlt,

    FaClipboardCheck

} from "react-icons/fa";

import DashboardLayout from "../../../layouts/DashboardLayout";

import "../../../styles/CheckpointSuccess.css";

export default function CheckpointSuccess(){

    const navigate=useNavigate();

    const {state}=useLocation();

    if(!state){

        navigate("/employee/my-patrols");

        return null;

    }

    return(

        <DashboardLayout>

            <div className="gx-success-page">

                <div className="gx-success-card">

                    <div className="gx-success-icon">

                        <FaCheckCircle/>

                    </div>

                    <h1>

                        Checkpoint Verified

                    </h1>

                    <p>

                        Your checkpoint has been verified successfully.

                    </p>

                    <div className="gx-success-grid">

                        <div>

                            <label>

                                Checkpoint

                            </label>

                            <strong>

                                {state.checkpoint}

                            </strong>

                        </div>

                        <div>

                            <label>

                                Route

                            </label>

                            <strong>

                                {state.route}

                            </strong>

                        </div>

                        <div>

                            <label>

                                Status

                            </label>

                            <strong>

                                Verified

                            </strong>

                        </div>

                    </div>

                    {

                        !state.completed &&

                        <div className="gx-next-card">

                            <FaMapMarkerAlt/>

                            <div>

                                <span>

                                    Next Checkpoint

                                </span>

                                <h3>

                                    {

                                        state.next_checkpoint ||

                                        "Loading..."

                                    }

                                </h3>

                            </div>

                        </div>

                    }

                    <div className="gx-success-actions">

                        {

                            state.completed ?

                            (

                                <button

                                    className="gx-primary-btn"

                                    onClick={()=>navigate(
                                        `/employee/patrol-completed/${state.session_id}`
                                    )}

                                >

                                    Finish Patrol

                                </button>

                            )

                            :

                            (

                                <button

                                    className="gx-primary-btn"

                                    onClick={()=>navigate(

                                        `/employee/patrol/${state.session_id}`

                                    )}

                                >

                                    <FaArrowRight/>

                                    Continue Patrol

                                </button>

                            )

                        }

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}