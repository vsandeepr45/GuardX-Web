import React, { useEffect, useState } from "react";

import {
  createClient,
  updateClient,
  getCompaniesDropdown,
} from "../../api/client";

function ClientForm({
  mode,

  client,

  refresh,

  close,
}) {
  const [companies, setCompanies] = useState([]);

  const [saving, setSaving] = useState(false);

  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    company_id: "",

    client_code: "",

    client_name: "",

    client_type: "",

    industry_type: "",

    gst_number: "",

    pan_number: "",

    contact_person: "",

    designation: "",

    email: "",

    mobile: "",

    alternate_mobile: "",

    website: "",

    address: "",

    country: "India",

    state: "",

    district: "",

    city: "",

    pincode: "",

    latitude: "",

    longitude: "",

    remarks: "",
  });

  /*
    =====================================
    Load Companies
    =====================================
    */

  const loadCompanies = async () => {
    try {
      const response = await getCompaniesDropdown();

      setCompanies(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  /*
    =====================================
    Edit Mode
    =====================================
    */

  useEffect(() => {
    loadCompanies();

    if (mode === "edit" && client) {
      setForm({
        company_id: client.company_id || "",

        client_code: client.client_code || "",

        client_name: client.client_name || "",

        client_type: client.client_type || "",

        industry_type: client.industry_type || "",

        gst_number: client.gst_number || "",

        pan_number: client.pan_number || "",

        contact_person: client.contact_person || "",

        designation: client.designation || "",

        email: client.email || "",

        mobile: client.mobile || "",

        alternate_mobile: client.alternate_mobile || "",

        website: client.website || "",

        address: client.address || "",

        country: client.country || "India",

        state: client.state || "",

        district: client.district || "",

        city: client.city || "",

        pincode: client.pincode || "",

        latitude: client.latitude || "",

        longitude: client.longitude || "",

        remarks: client.remarks || "",
      });
    }
  }, [client, mode]);

  /*
    =====================================
    Handle Change
    =====================================
    */

  const handleChange = (e) => {
    const {
      name,

      value,
    } = e.target;

    setForm({
      ...form,

      [name]: value,
    });
  };

  /*
    =====================================
    Validation
    =====================================
    */

  const validate = () => {
    const validation = {};

    if (!form.company_id) validation.company_id = "Company is required";

    if (!form.client_code) validation.client_code = "Client Code is required";

    if (!form.client_name) validation.client_name = "Client Name is required";

    if (!form.contact_person)
      validation.contact_person = "Contact Person is required";

    if (!form.mobile) validation.mobile = "Mobile Number is required";

    if (!form.city) validation.city = "City is required";

    if (!form.state) validation.state = "State is required";

    setErrors(validation);

    return Object.keys(validation).length === 0;
  };

  /*
    =====================================
    Save Client
    =====================================
    */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setSaving(true);

      if (mode === "add") {
        await createClient(form);
      } else {
        await updateClient(
          client.id,

          form,
        );
      }

      refresh();

      close();
    } catch (err) {
      alert(err.response?.data?.message || "Unable to save client.");
    } finally {
      setSaving(false);
    }
  };

  /*
    =====================================
    UI
    =====================================
    */

  return (
    <div className="gx-modal">
      <div className="gx-modal-content gx-company-form">
        {/* Header */}

        <div className="gx-modal-header">
          <h2>{mode === "add" ? "Add Client" : "Edit Client"}</h2>

          <button className="gx-close" onClick={close}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Company Information */}

          <div className="gx-form-section">
            <h3>Company Information</h3>

            <div className="gx-grid-2">
              <div>
                <label>Company *</label>

                <select
                  name="company_id"
                  value={form.company_id}
                  onChange={handleChange}
                >
                  <option value="">Select Company</option>

                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.company_name}
                    </option>
                  ))}
                </select>

                <small className="error">{errors.company_id}</small>
              </div>

              <div>
                <label>Client Code *</label>

                <input
                  name="client_code"
                  value={form.client_code}
                  onChange={handleChange}
                />

                <small className="error">{errors.client_code}</small>
              </div>

              <div>
                <label>Client Name *</label>

                <input
                  name="client_name"
                  value={form.client_name}
                  onChange={handleChange}
                />

                <small className="error">{errors.client_name}</small>
              </div>

              <div>
                <label>Client Type</label>

                <input
                  name="client_type"
                  value={form.client_type}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Industry Type</label>

                <input
                  name="industry_type"
                  value={form.industry_type}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Contact */}

          <div className="gx-form-section">
            <h3>Contact Information</h3>

            <div className="gx-grid-2">
              <div>
                <label>Contact Person *</label>

                <input
                  name="contact_person"
                  value={form.contact_person}
                  onChange={handleChange}
                />

                <small className="error">{errors.contact_person}</small>
              </div>

              <div>
                <label>Designation</label>

                <input
                  name="designation"
                  value={form.designation}
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

              <div>
                <label>Mobile *</label>

                <input
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                />

                <small className="error">{errors.mobile}</small>
              </div>

              <div>
                <label>Alternate Mobile</label>

                <input
                  name="alternate_mobile"
                  value={form.alternate_mobile}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Website</label>

                <input
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Address Information */}

          <div className="gx-form-section">
            <h3>Address Information</h3>

            <div className="gx-grid-2">
              <div className="gx-grid-full">
                <label>Address</label>

                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  rows="3"
                />
              </div>

              <div>
                <label>Country</label>

                <input
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>State *</label>

                <input
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                />

                <small className="error">{errors.state}</small>
              </div>

              <div>
                <label>District</label>

                <input
                  name="district"
                  value={form.district}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>City *</label>

                <input name="city" value={form.city} onChange={handleChange} />

                <small className="error">{errors.city}</small>
              </div>

              <div>
                <label>Pincode</label>

                <input
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Latitude</label>

                <input
                  name="latitude"
                  value={form.latitude}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Longitude</label>

                <input
                  name="longitude"
                  value={form.longitude}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}

          <div className="gx-form-section">
            <h3>Additional Information</h3>

            <div className="gx-grid-2">
              <div>
                <label>GST Number</label>

                <input
                  name="gst_number"
                  value={form.gst_number}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>PAN Number</label>

                <input
                  name="pan_number"
                  value={form.pan_number}
                  onChange={handleChange}
                />
              </div>

              <div className="gx-grid-full">
                <label>Remarks</label>

                <textarea
                  name="remarks"
                  value={form.remarks}
                  onChange={handleChange}
                  rows="4"
                />
              </div>
            </div>
          </div>

          {/* Footer */}

          <div className="gx-modal-footer">
            <button type="button" className="btn-light" onClick={close}>
              Cancel
            </button>

            <button type="submit" className="btn-primary" disabled={saving}>
              {saving
                ? "Saving..."
                : mode === "add"
                  ? "Create Client"
                  : "Update Client"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ClientForm;
