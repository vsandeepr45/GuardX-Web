import React from "react";

import { FaCheckCircle, FaTimesCircle, FaExchangeAlt } from "react-icons/fa";

function DesignationStatusDialog({
  open,

  designation,

  close,

  confirm,
}) {
  if (!open || !designation) {
    return null;
  }

  return (
    <div className="gx-modal">
      <div className="gx-status-modal">
        {/* ==========================
                    HEADER
                ========================== */}

        <div className="gx-status-header">
          <h2>
            <FaExchangeAlt />
            &nbsp; Change Designation Status
          </h2>
        </div>

        {/* ==========================
                    BODY
                ========================== */}

        <div className="gx-status-body">
          {designation.status ? (
            <FaTimesCircle
              style={{
                fontSize: 60,

                color: "#ef4444",

                marginBottom: 20,
              }}
            />
          ) : (
            <FaCheckCircle
              style={{
                fontSize: 60,

                color: "#22c55e",

                marginBottom: 20,
              }}
            />
          )}

          <h3>
            {designation.status
              ? "Deactivate Designation?"
              : "Activate Designation?"}
          </h3>

          <p className="gx-status-message">
            Designation
            <br />
            <strong>{designation.designation_name}</strong>
          </p>

          <p
            style={{
              marginTop: 15,

              color: "#64748b",
            }}
          >
            {designation.status
              ? "This designation will become Inactive."
              : "This designation will become Active."}
          </p>
        </div>

        {/* ==========================
                    FOOTER
                ========================== */}

        <div className="gx-status-footer">
          <button className="btn-light" onClick={close}>
            Cancel
          </button>

          <button className="btn-primary" onClick={confirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default DesignationStatusDialog;
