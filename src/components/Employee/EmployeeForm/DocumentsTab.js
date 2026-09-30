import React from "react";

const DOCUMENTS = [
  // {
  //   key: "employee_photo",
  //   title: "Employee Photo",
  //   accept: "image/*",
  // },

  {
    key: "qid_copy",
    title: "QID Copy",
    accept: ".pdf,.jpg,.jpeg,.png",
  },

  {
    key: "passport_copy",
    title: "Passport Copy",
    accept: ".pdf,.jpg,.jpeg,.png",
  },

  {
    key: "visa_copy",
    title: "Visa Copy",
    accept: ".pdf,.jpg,.jpeg,.png",
  },

  {
    key: "driving_license_copy",
    title: "Driving License",
    accept: ".pdf,.jpg,.jpeg,.png",
  },

  {
    key: "police_clearance",
    title: "Police Clearance",
    accept: ".pdf,.jpg,.jpeg,.png",
  },

  {
    key: "resume",
    title: "Resume",
    accept: ".pdf,.doc,.docx",
  },

  {
    key: "medical_certificate",
    title: "Medical Certificate",
    accept: ".pdf,.jpg,.jpeg,.png",
  },
];

export default function DocumentsTab({
  form,

  setForm,
}) {
  const uploadFile = (e, key) => {
    const file = e.target.files[0];

    if (!file) return;

    setForm((prev) => ({
      ...prev,

      [key]: file,
    }));
  };

  return (
    <div className="gx-form-section">
      <h3>📂 Employee Documents</h3>

      <p>Upload all mandatory employee documents.</p>

      <div className="gx-document-grid">
        {DOCUMENTS.map((doc) => (
          <div key={doc.key} className="gx-document-card">
            <h4>{doc.title}</h4>

            <input
              type="file"
              accept={doc.accept}
              onChange={(e) => uploadFile(e, doc.key)}
            />

            {form[doc.key] && <small>✔ {form[doc.key].name}</small>}
          </div>
        ))}
      </div>
    </div>
  );
}
