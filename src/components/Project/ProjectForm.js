import React, { useState, useEffect } from "react";

import {
  FaTimes,
  FaBuilding,
  FaFileContract,
  FaUserTie,
  FaMapMarkerAlt,
  FaInfoCircle,
} from "react-icons/fa";

import {
  createProject,
  updateProject,
  getCompaniesDropdown,
  getClientsDropdown,
} from "../../api/project";

function ProjectForm({
  mode,

  project,

  refresh,

  close,
}) {
  const isEdit = mode === "edit";

  const [companies, setCompanies] = useState([]);

  const [clients, setClients] = useState([]);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    company_id: "",

    client_id: "",

    project_code: "",

    project_name: "",

    project_type: "",

    contract_number: "",

    contract_value: "",

    start_date: "",

    end_date: "",

    project_manager: "",

    manager_mobile: "",

    email: "",

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

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      const response = await getCompaniesDropdown();

      setCompanies(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const loadClients = async (companyId) => {
    if (!companyId) {
      setClients([]);

      return;
    }

    try {
      const response = await getClientsDropdown(companyId);

      setClients(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleCompanyChange = (e) => {
    const value = e.target.value;

    setForm({
      ...form,

      company_id: value,

      client_id: "",
    });

    loadClients(value);
  };
  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    if (isEdit && project) {
      setForm({
        ...project,
      });

      loadClients(project.company_id);
    }
  }, [project]);
  const validate = () => {
    let temp = {};

    if (!form.company_id) temp.company_id = "Required";

    if (!form.client_id) temp.client_id = "Required";

    if (!form.project_code) temp.project_code = "Required";

    if (!form.project_name) temp.project_name = "Required";

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };
  const saveProject = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      if (isEdit) {
        await updateProject(
          project.id,

          form,
        );
      } else {
        await createProject(form);
      }

      refresh();

      close();
    } catch (err) {
      alert(err.response?.data?.message || "Unable to save.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="gx-modal">
      <div className="gx-modal-content gx-company-form">
        <div className="gx-modal-header">
          <div>
            <h2>
              <FaBuilding />
              &nbsp;
              {isEdit ? "Edit Project" : "Add Project"}
            </h2>

            <span>Project Master</span>
          </div>

          <button className="gx-close" onClick={close}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={saveProject}>
          <div className="gx-section-title">
            <FaBuilding />

            <span>Project Information</span>
          </div>

          <div className="gx-grid-2">
            <div>
              <label>Company *</label>

              <select
                name="company_id"
                value={form.company_id}
                onChange={handleCompanyChange}
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
              <label>Client *</label>

              <select
                name="client_id"
                value={form.client_id}
                onChange={handleChange}
              >
                <option value="">Select Client</option>

                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.client_name}
                  </option>
                ))}
              </select>

              <small className="error">{errors.client_id}</small>
            </div>

            <div>
              <label>Project Code *</label>

              <input
                name="project_code"
                value={form.project_code}
                onChange={handleChange}
              />

              <small className="error">{errors.project_code}</small>
            </div>

            <div>
              <label>Project Name *</label>

              <input
                name="project_name"
                value={form.project_name}
                onChange={handleChange}
              />

              <small className="error">{errors.project_name}</small>
            </div>

            <div>
              <label>Project Type</label>

              <input
                name="project_type"
                value={form.project_type}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="gx-section-title">
            <FaFileContract />

            <span>Contract Information</span>
          </div>

          <div className="gx-grid-2">
            <div>
              <label>Contract Number</label>

              <input
                name="contract_number"
                value={form.contract_number}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Contract Value</label>

              <input
                type="number"
                name="contract_value"
                value={form.contract_value}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Start Date</label>

              <input
                type="date"
                name="start_date"
                value={form.start_date}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>End Date</label>

              <input
                type="date"
                name="end_date"
                value={form.end_date}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="gx-section-title">
            <FaUserTie />

            <span>Project Manager</span>
          </div>

          <div className="gx-grid-2">
            <div>
              <label>Project Manager</label>

              <input
                name="project_manager"
                value={form.project_manager}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Manager Mobile</label>

              <input
                name="manager_mobile"
                value={form.manager_mobile}
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
          <div className="gx-section-title">
            <FaMapMarkerAlt />

            <span>Address Information</span>
          </div>

          <div className="gx-grid-2">
            <div className="gx-grid-full">
              <label>Address</label>

              <textarea
                rows="3"
                name="address"
                value={form.address}
                onChange={handleChange}
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
              <label>State</label>

              <input name="state" value={form.state} onChange={handleChange} />
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
              <label>City</label>

              <input name="city" value={form.city} onChange={handleChange} />
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
          <div className="gx-section-title">
            <FaInfoCircle />

            <span>Additional Information</span>
          </div>

          <div>
            <label>Remarks</label>

            <textarea
              rows="4"
              name="remarks"
              value={form.remarks}
              onChange={handleChange}
            />
          </div>
          <div className="gx-modal-footer">
            <button type="button" className="btn-light" onClick={close}>
              Cancel
            </button>

            <button className="btn-primary" disabled={loading}>
              {loading
                ? "Saving..."
                : isEdit
                  ? "Update Project"
                  : "Save Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectForm;
