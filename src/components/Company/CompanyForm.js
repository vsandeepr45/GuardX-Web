import React, { useEffect, useState } from "react";

import { FaTimes, FaSave } from "react-icons/fa";

import { createCompany, updateCompany } from "../../api/company";

function CompanyForm({
  mode = "add",

  company = null,

  close,

  refresh,
}) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    company_code: "",
    company_name: "",
    company_type: "",

    gst_number: "",
    pan_number: "",
    registration_number: "",

    email: "",
    phone: "",
    alternate_phone: "",
    website: "",

    contact_person: "",
    contact_mobile: "",

    address: "",

    country: "",
    state: "",
    district: "",
    city: "",
    pincode: "",

    latitude: "",
    longitude: "",

    remarks: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (mode === "edit" && company) {
      setForm({
        company_code: company.company_code || "",
        company_name: company.company_name || "",
        company_type: company.company_type || "",

        gst_number: company.gst_number || "",
        pan_number: company.pan_number || "",
        registration_number: company.registration_number || "",

        email: company.email || "",
        phone: company.phone || "",
        alternate_phone: company.alternate_phone || "",
        website: company.website || "",

        contact_person: company.contact_person || "",
        contact_mobile: company.contact_mobile || "",

        address: company.address || "",

        country: company.country || "",
        state: company.state || "",
        district: company.district || "",
        city: company.city || "",
        pincode: company.pincode || "",

        latitude: company.latitude || "",
        longitude: company.longitude || "",

        remarks: company.remarks || "",
      });
    }
  }, [mode, company]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (mode === "add") {
        await createCompany(form);
      } else {
        await updateCompany(
          company.id,

          form,
        );
      }

      refresh();

      close();
    } catch (err) {
      alert(err.response?.data?.message || "Unable to save company.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gx-modal">
      <div className="gx-modal-content">
        <div className="gx-modal-header">
          <h2>{mode === "add" ? "Add Company" : "Edit Company"}</h2>

          <button className="close-btn" onClick={close}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="gx-section">
            <h3>Company Information</h3>

            <div className="gx-grid">
              <input
                name="company_code"
                placeholder="Company Code"
                value={form.company_code}
                onChange={handleChange}
                required
              />

              <input
                name="company_name"
                placeholder="Company Name"
                value={form.company_name}
                onChange={handleChange}
                required
              />

              <input
                name="company_type"
                placeholder="Company Type"
                value={form.company_type}
                onChange={handleChange}
              />

              <input
                name="gst_number"
                placeholder="GST Number"
                value={form.gst_number}
                onChange={handleChange}
              />

              <input
                name="pan_number"
                placeholder="PAN Number"
                value={form.pan_number}
                onChange={handleChange}
              />

              <input
                name="registration_number"
                placeholder="Registration Number"
                value={form.registration_number}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="gx-section">
            <h3>Contact Information</h3>

            <div className="gx-grid">
              <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
              />

              <input
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
              />

              <input
                name="alternate_phone"
                placeholder="Alternate Phone"
                value={form.alternate_phone}
                onChange={handleChange}
              />

              <input
                name="website"
                placeholder="Website"
                value={form.website}
                onChange={handleChange}
              />

              <input
                name="contact_person"
                placeholder="Contact Person"
                value={form.contact_person}
                onChange={handleChange}
              />

              <input
                name="contact_mobile"
                placeholder="Contact Mobile"
                value={form.contact_mobile}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="gx-section">
            <h3>Address</h3>

            <div className="gx-grid">
              <textarea
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
              />

              <input
                name="country"
                placeholder="Country"
                value={form.country}
                onChange={handleChange}
              />

              <input
                name="state"
                placeholder="State"
                value={form.state}
                onChange={handleChange}
              />

              <input
                name="district"
                placeholder="District"
                value={form.district}
                onChange={handleChange}
              />

              <input
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
              />

              <input
                name="pincode"
                placeholder="Pincode"
                value={form.pincode}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="gx-section">
            <h3>Location</h3>

            <div className="gx-grid">
              <input
                name="latitude"
                placeholder="Latitude"
                value={form.latitude}
                onChange={handleChange}
              />

              <input
                name="longitude"
                placeholder="Longitude"
                value={form.longitude}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="gx-section">
            <textarea
              name="remarks"
              placeholder="Remarks"
              value={form.remarks}
              onChange={handleChange}
            />
          </div>

          <div className="gx-form-footer">
            <button type="button" className="btn-light" onClick={close}>
              Cancel
            </button>

            <button className="btn-primary" disabled={loading}>
              <FaSave />
              &nbsp;
              {loading
                ? "Saving..."
                : mode === "add"
                  ? "Save Company"
                  : "Update Company"}
            </button>
            {/* <CompanyForm

    mode="add"

    refresh={loadCompanies}

    close={() => setShowForm(false)}

/>

<CompanyForm

    mode="edit"

    company={selectedCompany}

    refresh={loadCompanies}

    close={() => setEditOpen(false)}

/> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CompanyForm;
