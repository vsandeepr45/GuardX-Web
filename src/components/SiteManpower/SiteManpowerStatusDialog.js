import React from "react";

function SiteManpowerStatusDialog({

    open,

    manpower,

    close,

    confirm

}) {

    if (!open || !manpower) return null;

    return (

        <div className="gx-modal">

            <div className="gx-modal-content gx-delete-modal">

                <h2>

                    Change Status

                </h2>

                <p>

                    Are you sure you want to

                    {

                        manpower.status

                            ? " Deactivate "

                            : " Activate "

                    }

                    this Site Manpower?

                </p>

                <div className="gx-modal-actions">

                    <button

                        className="btn-secondary"

                        onClick={close}

                    >

                        Cancel

                    </button>

                    <button

                        className="btn-primary"

                        onClick={confirm}

                    >

                        Confirm

                    </button>

                </div>

            </div>

        </div>

    );

}

export default SiteManpowerStatusDialog;