import React from "react";

import { FaToggleOn, FaToggleOff, FaExchangeAlt } from "react-icons/fa";

function ClientStatusDialog({
  open,

  client,

  close,

  confirm,
}) {
  if (!open || !client) return null;

  return (
    <div className="gx-modal">
      <div className="gx-status-modal">
        {/* Header */}

        <div className="gx-status-header">
          <h2>Change Client Status</h2>
        </div>

        {/* Body */}

        <div className="gx-status-body">
          <h3>{client.client_name}</h3>

          <p>
            Company :<strong>{client.company_name}</strong>
          </p>

          <div className="gx-status-change">
            <div className="gx-status-box">
              <span>Current</span>

              {client.status ? (
                <div className="status-active">
                  <FaToggleOn />
                  Active
                </div>
              ) : (
                <div className="status-inactive">
                  <FaToggleOff />
                  Inactive
                </div>
              )}
            </div>

            <div className="gx-status-arrow">
              <FaExchangeAlt />
            </div>

            <div className="gx-status-box">
              <span>New</span>

              {client.status ? (
                <div className="status-inactive">
                  <FaToggleOff />
                  Inactive
                </div>
              ) : (
                <div className="status-active">
                  <FaToggleOn />
                  Active
                </div>
              )}
            </div>
          </div>

          <p className="gx-status-message">
            Are you sure you want to change the status of this client?
          </p>
        </div>

        {/* Footer */}

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

export default ClientStatusDialog;
