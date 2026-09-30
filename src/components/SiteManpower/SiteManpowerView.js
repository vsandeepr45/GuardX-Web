import React from "react";

function SiteManpowerView({

    manpower,

    close

}) {

    if (!manpower) return null;

    return (

        <div className="gx-modal">

            <div className="gx-modal-content gx-view-modal">

                <div className="gx-modal-header">

                    <h2>Site Manpower Details</h2>

                    <button
                        className="gx-close-btn"
                        onClick={close}
                    >
                        ×
                    </button>

                </div>

                <div className="gx-view-grid">

                    <div>
                        <label>Company</label>
                        <span>{manpower.company_name}</span>
                    </div>

                    <div>
                        <label>Client</label>
                        <span>{manpower.client_name}</span>
                    </div>

                    <div>
                        <label>Project</label>
                        <span>{manpower.project_name}</span>
                    </div>

                    <div>
                        <label>Site</label>
                        <span>{manpower.site_name}</span>
                    </div>

                    <div>
                        <label>Post</label>
                        <span>{manpower.post_name}</span>
                    </div>

                    <div>
                        <label>Shift</label>
                        <span>{manpower.shift_name}</span>
                    </div>

                    <div>
                        <label>Required Guards</label>
                        <span>{manpower.required_guards}</span>
                    </div>

                    <div>
                        <label>Assigned Guards</label>
                        <span>{manpower.assigned_guards}</span>
                    </div>

                    <div>
                        <label>Minimum Guards</label>
                        <span>{manpower.minimum_guards}</span>
                    </div>

                    <div>
                        <label>Supervisor Required</label>
                        <span>{manpower.supervisor_required}</span>
                    </div>

                    <div>
                        <label>Status</label>

                        <span>

                            {

                                manpower.status

                                    ? "Active"

                                    : "Inactive"

                            }

                        </span>

                    </div>

                    <div>

                        <label>Remarks</label>

                        <span>

                            {

                                manpower.remarks ||

                                "-"

                            }

                        </span>

                    </div>

                </div>

                <div className="gx-modal-footer">

                    <button

                        className="btn-secondary"

                        onClick={close}

                    >

                        Close

                    </button>

                </div>

            </div>

        </div>

    );

}

export default SiteManpowerView;