import React from "react";

function SiteStatusDialog({

    open,

    site,

    close,

    confirm

}) {

    if (!open || !site) return null;

    return (

        <div className="gx-modal">

            <div className="gx-status-modal">

                <div className="gx-status-header">

                    <h2>

                        Change Site Status

                    </h2>

                </div>

                <div className="gx-status-body">

                    <h3>

                        {site.site_name}

                    </h3>

                    <div className="gx-status-change">

                        <div className="gx-status-box">

                            <span>

                                Current

                            </span>

                            <div className={site.status ? "status-active" : "status-inactive"}>

                                {site.status ? "Active" : "Inactive"}

                            </div>

                        </div>

                        <div className="gx-status-arrow">

                            →

                        </div>

                        <div className="gx-status-box">

                            <span>

                                New

                            </span>

                            <div className={!site.status ? "status-active" : "status-inactive"}>

                                {!site.status ? "Active" : "Inactive"}

                            </div>

                        </div>

                    </div>

                    <p className="gx-status-message">

                        Do you want to update the Site status?

                    </p>

                </div>

                <div className="gx-status-footer">

                    <button

                        className="btn-light"

                        onClick={close}

                    >

                        Cancel

                    </button>

                    <button

                        className="btn-primary"

                        onClick={confirm}

                    >

                        Update Status

                    </button>

                </div>

            </div>

        </div>

    );

}

export default SiteStatusDialog;