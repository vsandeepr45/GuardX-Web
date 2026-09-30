import React, { useEffect, useState } from "react";

function DeploymentRequestStatusDialog({

    open,

    request,

    onClose,

    onConfirm

}) {

    const [status, setStatus] = useState("");

    useEffect(() => {

        if (request) {

            setStatus(request.status || "Pending");

        }

    }, [request]);

    if (!open || !request) {

        return null;

    }

    const handleSubmit = (e) => {

        e.preventDefault();

        onConfirm(status);

    };

    return (

        <div className="gx-modal">

            <div className="gx-status-modal">

                <div className="gx-status-header">

                    <h2>

                        Change Deployment Request Status

                    </h2>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="gx-status-body"
                >

                    <div className="gx-form-group">

                        <label>

                            Status

                        </label>

                        <select

                            value={status}

                            onChange={(e) =>
                                setStatus(e.target.value)
                            }

                        >

                            <option value="Pending">

                                Pending

                            </option>

                            <option value="Approved">

                                Approved

                            </option>

                            <option value="Partially Completed">

                                Partially Completed

                            </option>

                            <option value="Completed">

                                Completed

                            </option>

                            <option value="Rejected">

                                Rejected

                            </option>

                        </select>

                    </div>

                    <div className="gx-form-actions">

                        <button
                            type="submit"
                            className="gx-save-btn"
                        >

                            Update Status

                        </button>

                        <button
                            type="button"
                            className="gx-cancel-btn"
                            onClick={onClose}
                        >

                            Cancel

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default DeploymentRequestStatusDialog;