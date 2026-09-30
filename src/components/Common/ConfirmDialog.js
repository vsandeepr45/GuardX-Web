import React from "react";

import { FaExclamationTriangle } from "react-icons/fa";

function ConfirmDialog({
  open,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmClass = "btn-danger",
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="gx-dialog-overlay">
      <div className="gx-dialog">
        <div className="gx-dialog-icon">
          <FaExclamationTriangle />
        </div>

        <h2>{title}</h2>

        <p>{message}</p>

        <div className="gx-dialog-footer">
          <button className="btn-light" onClick={onCancel}>
            {cancelText}
          </button>

          <button className={confirmClass} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
