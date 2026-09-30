import React from "react";

export default function PatrolStatusDialog({
  open,

  route,

  onClose,

  onConfirm,
}) {
  if (!open || !route) {
    return null;
  }

  return (
    <div className="gx-dialog">
      <div className="gx-confirm-dialog">
        <h2>Change Status</h2>

        <p>
          Are you sure you want to
          {route.status ? " deactivate " : " activate "}
          this patrol route?
        </p>

        <div className="gx-dialog-footer">
          <button className="gx-btn-light" onClick={onClose}>
            Cancel
          </button>

          <button className="gx-btn-primary" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
