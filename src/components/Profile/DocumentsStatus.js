import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function DocumentsStatus({ profile }) {
  const docs = [
    {
      label: "Aadhaar",
      value: profile.aadhaar_no,
    },

    {
      label: "PAN",
      value: profile.pan_no,
    },

    {
      label: "Passport",
      value: profile.passport_number,
    },

    {
      label: "QID",
      value: profile.qid_number,
    },

    {
      label: "Driving License",
      value: profile.driving_license_number,
    },
  ];

  return (
    <div className="gx-side-card">
      <h3>Documents</h3>

      {docs.map((doc, index) => (
        <div className="gx-doc-row" key={index}>
          <span>{doc.label}</span>

          {doc.value ? (
            <FaCheckCircle className="gx-green-icon" />
          ) : (
            <FaTimesCircle className="gx-red-icon" />
          )}
        </div>
      ))}
    </div>
  );
}
