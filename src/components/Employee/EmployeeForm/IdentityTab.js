import React from "react";

export default function IdentityTab({
  form,

  handleChange,
}) {
  return (
    <div className="gx-form-section">
      <h3>🆔 Identity Information</h3>

      <div className="gx-grid-3">
        {/* Nationality */}

        <div>
          <label>Nationality *</label>

          <input
            type="text"
            name="nationality"
            value={form.nationality}
            onChange={handleChange}
          />
        </div>

        {/* QID */}

        <div>
          <label>QID Number *</label>

          <input
            type="text"
            name="qid_number"
            value={form.qid_number}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>QID Expiry *</label>

          <input
            type="date"
            name="qid_expiry"
            value={form.qid_expiry}
            onChange={handleChange}
          />
        </div>

        {/* Passport */}

        <div>
          <label>Passport Number *</label>

          <input
            type="text"
            name="passport_number"
            value={form.passport_number}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Passport Expiry *</label>

          <input
            type="date"
            name="passport_expiry"
            value={form.passport_expiry}
            onChange={handleChange}
          />
        </div>

        {/* Visa */}

        <div>
          <label>Visa Number</label>

          <input
            type="text"
            name="visa_number"
            value={form.visa_number}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Visa Expiry</label>

          <input
            type="date"
            name="visa_expiry"
            value={form.visa_expiry}
            onChange={handleChange}
          />
        </div>

        {/* Driving License */}

        <div>
          <label>Driving License Number</label>

          <input
            type="text"
            name="driving_license_number"
            value={form.driving_license_number}
            onChange={handleChange}
          />
        </div>

        {/* Biometric */}

        <div>
          <label>Biometric ID</label>

          <input
            type="text"
            name="biometric_id"
            value={form.biometric_id}
            onChange={handleChange}
          />
        </div>
      </div>

      <hr className="gx-divider" />

      <h4>Additional Information</h4>

      <div className="gx-grid-2">
        <div>
          <label>Aadhaar Number (Optional)</label>

          <input
            type="text"
            name="aadhaar_no"
            value={form.aadhaar_no}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>PAN Number (Optional)</label>

          <input
            type="text"
            name="pan_no"
            value={form.pan_no}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
