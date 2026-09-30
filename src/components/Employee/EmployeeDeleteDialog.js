import React from "react";
import { FaTrash } from "react-icons/fa";

function EmployeeDeleteDialog({
  employee,

  close,

  confirm,
}) {
  if (!employee) return null;

  return (
    <div className="gx-modal">
      <div className="gx-dialog">
        <h3>
          <FaTrash color="red" />
          &nbsp; Delete Employee
        </h3>

        <p>
          Delete
          {/* <strong> {employee.employee_name}</strong>? */}
          <strong> {employee.employee_name}</strong> ({employee.employee_code})?
        </p>

        <p className="gx-danger">This action cannot be undone.</p>

        <div className="gx-dialog-footer">
          <button className="gx-btn-light" onClick={close}>
            Cancel
          </button>

          <button className="gx-btn-danger" onClick={confirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDeleteDialog;
