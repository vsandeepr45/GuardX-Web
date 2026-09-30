import React from "react";
import { FaExchangeAlt } from "react-icons/fa";

function EmployeeStatusDialog({
  employee,

  close,

  confirm,
}) {
  if (!employee) return null;

  return (
    <div className="gx-modal">
      <div className="gx-dialog">
        <h3>
          <FaExchangeAlt />
          &nbsp; Change Status
        </h3>

        <p>
          Change status of
          <strong> {employee.employee_name}</strong>?
        </p>

        <div className="gx-dialog-footer">
          <button className="gx-btn-light" onClick={close}>
            Cancel
          </button>

          <button className="gx-btn-primary" onClick={confirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeStatusDialog;
