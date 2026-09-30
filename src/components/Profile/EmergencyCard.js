import { FaPhone, FaUserFriends } from "react-icons/fa";

export default function EmergencyCard({ profile }) {
  return (
    <div className="gx-side-card">
      <h3>Emergency Contact</h3>

      <div className="gx-emergency">
        <FaUserFriends />

        <div>
          <strong>{profile.emergency_contact_name || "-"}</strong>

          <p>{profile.emergency_contact_relation || "-"}</p>
        </div>
      </div>

      <div className="gx-emergency-phone">
        <FaPhone />

        {profile.emergency_contact_mobile || "-"}
      </div>
    </div>
  );
}
