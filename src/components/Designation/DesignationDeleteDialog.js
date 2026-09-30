import React from "react";

import { FaTrashAlt, FaExclamationTriangle } from "react-icons/fa";

function DesignationDeleteDialog({
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

        <div
          className="gx-status-header"
          style={{
            background: "#dc2626",
          }}
        >
          <h2>
            <FaTrashAlt />
            &nbsp; Delete Designation
          </h2>
        </div>

        {/* ==========================
                    BODY
                ========================== */}

        <div className="gx-status-body">
          <FaExclamationTriangle
            style={{
              fontSize: 60,

              color: "#dc2626",

              marginBottom: 20,
            }}
          />

          <h3>Delete Designation?</h3>

          <p className="gx-status-message">
            Are you sure you want to delete
            <br />
            <strong>{designation.designation_name}</strong>?
          </p>

          <p
            style={{
              marginTop: 20,

              color: "#dc2626",

              fontWeight: 600,
            }}
          >
            This action cannot be undone.
          </p>
        </div>

        {/* ==========================
                    FOOTER
                ========================== */}

        <div className="gx-status-footer">
          <button className="btn-light" onClick={close}>
            Cancel
          </button>

          <button
            className="btn-primary"
            style={{
              background: "#dc2626",
            }}
            onClick={confirm}
          >
            Delete Designation
          </button>
        </div>
      </div>
    </div>
  );
}

export default DesignationDeleteDialog;
