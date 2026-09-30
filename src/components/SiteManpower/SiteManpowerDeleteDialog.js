import React from "react";

function SiteManpowerDeleteDialog({

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

                    Delete Site Manpower

                </h2>

                <p>

                    Are you sure you want to delete this record?

                </p>

                <div className="gx-modal-actions">

                    <button

                        className="btn-secondary"

                        onClick={close}

                    >

                        Cancel

                    </button>

                    <button

                        className="btn-danger"

                        onClick={confirm}

                    >

                        Delete

                    </button>

                </div>

            </div>

        </div>

    );

}

export default SiteManpowerDeleteDialog;