import React from "react";

import { FaCheckCircle, FaTimesCircle, FaExchangeAlt } from "react-icons/fa";

function DepartmentStatusDialog({
  open,

  department,

  close,

  confirm,
}) {
  if (!open || !department) {
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
            &nbsp; Change Department Status
          </h2>
        </div>

        {/* ==========================
                    BODY
                ========================== */}

        <div className="gx-status-body">
          {department.status ? (
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
            {department.status
              ? "Deactivate Department?"
              : "Activate Department?"}
          </h3>

          <p className="gx-status-message">
            Department
            <br />
            <strong>{department.department_name}</strong>
          </p>

          <p
            style={{
              marginTop: 15,

              color: "#64748b",
            }}
          >
            {department.status
              ? "This department will become Inactive."
              : "This department will become Active."}
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

export default DepartmentStatusDialog;
