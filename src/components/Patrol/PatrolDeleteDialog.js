import React from "react";

export default function PatrolDeleteDialog({
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
        <h2>Delete Patrol Route</h2>

        <p>
          Are you sure you want to delete
          <strong> {route.route_name}</strong>?
        </p>

        <p>This action cannot be undone.</p>

        <div className="gx-dialog-footer">
          <button className="gx-btn-light" onClick={onClose}>
            Cancel
          </button>

          <button className="gx-btn-danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
