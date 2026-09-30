import {
    FaUser,
    FaPhone,
    FaUsers
} from "react-icons/fa";

import InfoCard from "./InfoCard";

export default function EmergencyInfo({

    profile,

    handleChange,

    editMode

}) {

    const Item = ({

        icon,

        label,

        value,

        name,

        type="text"

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

        <InfoCard
            title="Emergency Contact"
            icon={<FaPhone />}
        >

            <div className="gx-contact-grid">

                <Item

                    icon={<FaUser />}

                    label="Contact Name"

                    name="emergency_contact_name"

                    value={profile.emergency_contact_name}

                />

                <Item

                    icon={<FaPhone />}

                    label="Mobile Number"

                    name="emergency_contact_mobile"

                    value={profile.emergency_contact_mobile}

                />

                <Item

                    icon={<FaUsers />}

                    label="Relationship"

                    name="emergency_contact_relation"

                    value={profile.emergency_contact_relation}

                />

            </div>

        </InfoCard>

    );

}