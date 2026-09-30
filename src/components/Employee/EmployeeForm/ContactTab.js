import React from "react";

export default function ContactTab({

    form,

    handleChange

}) {

    return (

        <div className="gx-form-section">

            <h3>📞 Contact Information</h3>

            <div className="gx-grid-3">

                <div>

                    <label>Mobile *</label>

                    <input

                        type="text"

                        name="mobile"

                        value={form.mobile}

                        onChange={handleChange}

                    />

                </div>

                <div>

                    <label>Alternate Mobile</label>

                    <input

                        type="text"

                        name="alternate_mobile"

                        value={form.alternate_mobile}

                        onChange={handleChange}

                    />

                </div>

                <div>

                    <label>Email</label>

                    <input

                        type="email"

                        name="email"

                        value={form.email}

                        onChange={handleChange}

                    />

                </div>

            </div>

            <div className="gx-grid-2">

                <div>

                    <label>Current Address</label>

                    <textarea

                        rows="3"

                        name="current_address"

                        value={form.current_address}

                        onChange={handleChange}

                    />

                </div>

                <div>

                    <label>Permanent Address</label>

                    <textarea

                        rows="3"

                        name="permanent_address"

                        value={form.permanent_address}

                        onChange={handleChange}

                    />

                </div>

            </div>

            <div className="gx-grid-3">

                <div>

                    <label>City</label>

                    <input

                        type="text"

                        name="city"

                        value={form.city}

                        onChange={handleChange}

                    />

                </div>

                <div>

                    <label>State</label>

                    <input

                        type="text"

                        name="state"

                        value={form.state}

                        onChange={handleChange}

                    />

                </div>

                <div>

                    <label>Pincode</label>

                    <input

                        type="text"

                        name="pincode"

                        value={form.pincode}

                        onChange={handleChange}

                    />

                </div>

            </div>

            <hr className="gx-divider"/>

            <h4>Emergency Contact</h4>

            <div className="gx-grid-3">

                <div>

                    <label>Contact Name</label>

                    <input

                        type="text"

                        name="emergency_contact_name"

                        value={form.emergency_contact_name}

                        onChange={handleChange}

                    />

                </div>

                <div>

                    <label>Mobile Number</label>

                    <input

                        type="text"

                        name="emergency_contact_mobile"

                        value={form.emergency_contact_mobile}

                        onChange={handleChange}

                    />

                </div>

                <div>

                    <label>Relationship</label>

                    <input

                        type="text"

                        name="emergency_contact_relation"

                        value={form.emergency_contact_relation}

                        onChange={handleChange}

                    />

                </div>

            </div>

        </div>

    );

}