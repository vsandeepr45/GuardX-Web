import {
  FaUserCircle,
  FaCamera,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaIdBadge,
} from "react-icons/fa";

import StatusBadge from "./StatusBadge";

export default function ProfileHero({
  profile,

  fileInputRef,

  handlePhotoUpload,
}) {
  return (
    <div className="gx-profile-hero-v2">
      <div className="gx-hero-overlay"></div>

      <div className="gx-profile-left">
        <div className="gx-profile-photo">
          <img
            src={
              profile.employee_photo
                ? profile.employee_photo
                : profile.gender?.toLowerCase() === "female"
                  ? "/assets/avatars/female.png"
                  : "/assets/avatars/male.png"
            }
            alt={profile.employee_name}
            className="gx-photo"
          />
          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={handlePhotoUpload}
          />
          <button
            className="gx-photo-btn"
            onClick={() => fileInputRef.current.click()}
          >
            <FaCamera />
          </button>
        </div>
      </div>

      <div className="gx-profile-center">
        <h1>{profile.employee_name}</h1>

        <h4>{profile.designation}</h4>

        <div className="gx-chip-row">
          <span className="gx-chip">
            <FaShieldAlt />

            {profile.department}
          </span>

          <span className="gx-chip">
            <FaIdBadge />

            {profile.employee_code}
          </span>

          <StatusBadge status={profile.employee_status} />
        </div>

        <div className="gx-hero-details">
          <div>
            <FaCalendarAlt />
            Joined
            <strong>{profile.joining_date}</strong>
          </div>

          <div>
            <FaMapMarkerAlt />

            {profile.city}
          </div>
        </div>
      </div>

      <div className="gx-profile-right">
        <div className="gx-id-card">
          <h3>GuardX</h3>

          <span>Employee ID</span>

          <h2>{profile.employee_code}</h2>

          <div className="gx-id-role">{profile.role}</div>

          <div className="gx-id-footer">Active Employee</div>
        </div>
      </div>
    </div>
  );
}
