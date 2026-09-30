import React from "react";

import {
    FaCopy,
    FaPrint,
    FaCheckCircle,
    FaUser,
    FaLock,
    FaIdBadge
} from "react-icons/fa";

export default function CredentialsDialog({
    data,
    close
}) {

    if (!data) return null;

    const copyCredentials = async () => {

        const text = `
GuardX Employee Login Credentials

Employee Code : ${data.employee_code || "-"}
Username      : ${data.username || "-"}
Password      : ${data.temporary_password || "-"}
`;

        try {

            await navigator.clipboard.writeText(text);

            alert("Credentials copied successfully.");

        } catch (error) {

            console.error(error);

            alert("Unable to copy credentials.");

        }

    };

    const printCredentials = () => {

        window.print();

    };

    return (

        <div className="gx-modal gx-credentials-overlay">

            <div className="gx-modal-content gx-credential">

                {/* =====================================
                    HEADER
                ====================================== */}

                <div className="gx-credential-header">

                    <div className="gx-credential-success-icon">

                        <FaCheckCircle />

                    </div>

                    <div>

                        <h2>
                            Employee Created Successfully
                        </h2>

                        <p>
                            Login credentials have been generated.
                        </p>

                    </div>

                </div>


                {/* =====================================
                    WARNING
                ====================================== */}

                <div className="gx-credential-notice">

                    <strong>
                        Important
                    </strong>

                    <span>
                        Please save these credentials securely.
                        The temporary password should be changed
                        during the employee's first login.
                    </span>

                </div>


                {/* =====================================
                    CREDENTIALS
                ====================================== */}

                <div className="gx-credential-list">

                    <div className="gx-credential-row">

                        <div className="gx-credential-icon">
                            <FaIdBadge />
                        </div>

                        <div className="gx-credential-info">

                            <span>
                                Employee Code
                            </span>

                            <strong>
                                {data.employee_code || "-"}
                            </strong>

                        </div>

                    </div>


                    <div className="gx-credential-row">

                        <div className="gx-credential-icon">
                            <FaUser />
                        </div>

                        <div className="gx-credential-info">

                            <span>
                                Username
                            </span>

                            <strong>
                                {data.username || "-"}
                            </strong>

                        </div>

                    </div>


                    <div className="gx-credential-row password-row">

                        <div className="gx-credential-icon">
                            <FaLock />
                        </div>

                        <div className="gx-credential-info">

                            <span>
                                Temporary Password
                            </span>

                            <strong className="gx-password">
                                {data.temporary_password || "-"}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* =====================================
                    FOOTER
                ====================================== */}

                <div className="gx-credential-actions">

                    <button
                        className="gx-btn-light"
                        onClick={copyCredentials}
                    >

                        <FaCopy />

                        &nbsp;

                        Copy Credentials

                    </button>


                    <button
                        className="gx-btn-light"
                        onClick={printCredentials}
                    >

                        <FaPrint />

                        &nbsp;

                        Print

                    </button>


                    <button
                        className="gx-btn-primary gx-credential-close"
                        onClick={close}
                    >

                        Done

                    </button>

                </div>

            </div>

        </div>

    );

}