import React from "react";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";

function CompanyStatusDialog({
  company,

  open,

  close,

  confirm,
}) {
  if (!open || !company) return null;

  return (
    <div className="gx-modal">
      <div className="gx-status-modal">
        <div className="gx-status-header">
          <h2>Change Company Status</h2>
        </div>

        <div className="gx-status-body">
          <div className="gx-status-company">
            <strong>{company.company_name}</strong>
          </div>

          <div className="gx-status-current">Current Status</div>

          <div className="gx-status-badge">
            {company.status ? (
              <span className="badge-success">
                <FaToggleOn />
                &nbsp; Active
              </span>
            ) : (
              <span className="badge-danger">
                <FaToggleOff />
                &nbsp; Inactive
              </span>
            )}
          </div>

          <p className="gx-status-text">
            Do you want to change the status to
            <strong>{company.status ? " Inactive" : " Active"}</strong>?
          </p>
        </div>

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

export default CompanyStatusDialog;
