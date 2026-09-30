import {
  FaIdCard,
  FaAddressCard,
  FaPassport,
  FaCalendarAlt,
  FaGlobe,
  FaCar,
} from "react-icons/fa";

import InfoCard from "./InfoCard";

export default function DocumentsInfo({ profile }) {
  const Item = ({ icon, label, value }) => (
    <div className="gx-document-item">
      <div className="gx-document-icon">{icon}</div>

      <div className="gx-document-content">
        <div className="gx-document-label">{label}</div>

        <div className="gx-document-value">{value || "--"}</div>
      </div>
    </div>
  );

  return (
    <InfoCard title="Documents Information" icon={<FaIdCard />}>
      <div className="gx-document-grid">
        <Item
          icon={<FaAddressCard />}
          label="Aadhaar Number"
          value={profile.aadhaar_no}
        />

        <Item icon={<FaIdCard />} label="PAN Number" value={profile.pan_no} />

        <Item
          icon={<FaPassport />}
          label="Passport Number"
          value={profile.passport_number}
        />

        <Item
          icon={<FaCalendarAlt />}
          label="Passport Expiry"
          value={profile.passport_expiry}
        />

        <Item
          icon={<FaIdCard />}
          label="QID Number"
          value={profile.qid_number}
        />

        <Item
          icon={<FaCalendarAlt />}
          label="QID Expiry"
          value={profile.qid_expiry}
        />

        <Item
          icon={<FaGlobe />}
          label="Visa Number"
          value={profile.visa_number}
        />

        <Item
          icon={<FaCalendarAlt />}
          label="Visa Expiry"
          value={profile.visa_expiry}
        />

        <Item
          icon={<FaCar />}
          label="Driving License"
          value={profile.driving_license_number}
        />
      </div>
    </InfoCard>
  );
}
