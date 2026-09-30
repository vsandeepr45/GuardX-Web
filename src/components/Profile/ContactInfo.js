import {
  FaPhone,
  FaEnvelope,
  FaMobileAlt,
  FaMapMarkerAlt,
  FaCity,
  FaGlobeAsia,
  FaMailBulk,
  FaHome,
} from "react-icons/fa";

import InfoCard from "./InfoCard";

export default function ContactInfo({

    profile,

    handleChange,

    editMode

}) {
const Item = ({
    icon,
    label,
    value,
    name,
    editMode,
    handleChange,
    type = "text"
}) => (

    <div className="gx-contact-item">

        <div className="gx-contact-icon">

            {icon}

        </div>

        <div className="gx-contact-content">

            <div className="gx-contact-label">

                {label}

            </div>

            {

                editMode ?

                <input

                    className="gx-profile-input"

                    type={type}

                    name={name}

                    value={value || ""}

                    onChange={handleChange}

                />

                :

                <div className="gx-contact-value">

                    {value || "--"}

                </div>

            }

        </div>

    </div>

);

  return (
    <InfoCard title="Contact Information" icon={<FaPhone />}>
      <div className="gx-contact-grid">
<Item

    icon={<FaEnvelope />}

    label="Email Address"

    name="email"

    value={profile.email}

    type="email"

    editMode={editMode}

    handleChange={handleChange}

/>

<Item

    icon={<FaMobileAlt />}

    label="Mobile Number"

    name="mobile"

    value={profile.mobile}

    editMode={editMode}

    handleChange={handleChange}

/>

<Item

    icon={<FaPhone />}

    label="Alternate Mobile"

    name="alternate_mobile"

    value={profile.alternate_mobile}

    editMode={editMode}

    handleChange={handleChange}

/>

       <Item

          icon={<FaCity />}

          label="City"

          name="city"

          value={profile.city}

          editMode={editMode}

          handleChange={handleChange}

        />

        <Item

    icon={<FaGlobeAsia />}

    label="State"

    name="state"

    value={profile.state}

    editMode={editMode}

    handleChange={handleChange}

/>

        <Item

    icon={<FaMailBulk />}

    label="Pincode"

    name="pincode"

    value={profile.pincode}

    editMode={editMode}

    handleChange={handleChange}

/>

        <div className="gx-contact-full">
          <div className="gx-contact-address">
            <div className="gx-contact-address-head">
              <FaHome />

              <span>Current Address</span>
            </div>

            {

editMode ?

<textarea

    className="gx-profile-textarea"

    rows={3}

    name="current_address"

    value={profile.current_address || ""}

    onChange={handleChange}

/>

:

<p>{profile.current_address || "--"}</p>

}
          </div>
        </div>

        <div className="gx-contact-full">
          <div className="gx-contact-address">
            <div className="gx-contact-address-head">
              <FaHome />

              <span>Permanent Address</span>
            </div>

            <p>{profile.permanent_address || "--"}</p>
          </div>
        </div>
      </div>
    </InfoCard>
  );
}
