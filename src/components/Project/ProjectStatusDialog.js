import React from "react";

function ProjectStatusDialog({
  open,

  project,

  close,

  confirm,
}) {
  if (!open) return null;

  return (
    <div className="gx-modal">
      <div className="gx-confirm-dialog">
        <h2>Change Project Status</h2>

        <p>
          Are you sure you want to
          {project?.status ? " deactivate " : " activate "}
          <b>{project?.project_name}</b>?
        </p>

        <div className="gx-confirm-footer">
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

export default ProjectStatusDialog;
