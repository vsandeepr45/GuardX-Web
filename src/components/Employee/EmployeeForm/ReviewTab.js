import React from "react";

export default function ReviewTab({
  form,

  departments,

  designations,

  shifts,

  roles,

  saveEmployee,

  saving,
}) {
  const getDepartment = () => {
    const item = departments.find(
      (x) => Number(x.id) === Number(form.department_id),
    );

    return item ? item.department_name : "-";
  };

  const getDesignation = () => {
    const item = designations.find(
      (x) => Number(x.id) === Number(form.designation_id),
    );

    return item ? item.designation_name : "-";
  };

  const getShift = () => {
    const item = shifts.find(
      (x) => Number(x.id) === Number(form.default_shift_id),
    );

    return item ? item.shift_name : "-";
  };

  const getRole = () => {
    const item = roles.find((x) => Number(x.id) === Number(form.role_id));

    return item ? item.role_name : "-";
  };

  return (
    <div className="gx-form-section">
      <h3>✔ Review Employee Information</h3>

      <div className="gx-review-grid">
        <div className="gx-review-card">
          <h4>Personal</h4>

          <p>
            <strong>Name :</strong> {form.employee_name}
          </p>

          <p>
            <strong>Father :</strong> {form.father_name}
          </p>

          <p>
            <strong>Mother :</strong> {form.mother_name}
          </p>

          <p>
            <strong>Gender :</strong> {form.gender}
          </p>

          <p>
            <strong>DOB :</strong> {form.date_of_birth}
          </p>

          <p>
            <strong>Blood Group :</strong> {form.blood_group}
          </p>
        </div>

        <div className="gx-review-card">
          <h4>Contact</h4>

          <p>
            <strong>Mobile :</strong> {form.mobile}
          </p>

          <p>
            <strong>Email :</strong> {form.email}
          </p>

          <p>
            <strong>City :</strong> {form.city}
          </p>

          <p>
            <strong>State :</strong> {form.state}
          </p>

          <p>
            <strong>Emergency :</strong> {form.emergency_contact_name}
          </p>
        </div>

        <div className="gx-review-card">
          <h4>Organization</h4>

          <p>
            <strong>Department :</strong> {getDepartment()}
          </p>

          <p>
            <strong>Designation :</strong> {getDesignation()}
          </p>

          <p>
            <strong>Role :</strong> {getRole()}
          </p>

          <p>
            <strong>Shift :</strong> {getShift()}
          </p>

          <p>
            <strong>Joining :</strong> {form.joining_date}
          </p>
        </div>

        <div className="gx-review-card">
          <h4>Identity</h4>

          <p>
            <strong>Nationality :</strong> {form.nationality}
          </p>

          <p>
            <strong>QID :</strong> {form.qid_number}
          </p>

          <p>
            <strong>Passport :</strong> {form.passport_number}
          </p>

          <p>
            <strong>Visa :</strong> {form.visa_number}
          </p>

          <p>
            <strong>Driving License :</strong> {form.driving_license_number}
          </p>
        </div>
      </div>

      {/* <div className="gx-review-action">
        <button
          className="gx-btn-primary"
          disabled={saving}
          onClick={saveEmployee}
        >
          {saving ? "Creating Employee..." : "Create Employee"}
        </button>
      </div> */}
    </div>
  );
}
