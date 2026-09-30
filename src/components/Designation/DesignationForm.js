import React, { useState, useEffect } from "react";

import {
  FaSave,
  FaTimes,
  FaUserTie,
  FaBuilding,
  FaUsers,
  FaProjectDiagram,
  FaMapMarkerAlt,
  FaSitemap,
  FaAlignLeft,
} from "react-icons/fa";

import { createDesignation, updateDesignation } from "../../api/designation";

import { getCompanyDropdown } from "../../api/company";

import { getClientDropdown } from "../../api/client";

import { getProjectDropdown } from "../../api/project";

import { getSiteDropdown } from "../../api/site";

import { departmentDropdown } from "../../api/department";

function DesignationForm({
  edit = false,

  designation,

  close,

  refresh,
}) {
  const [form, setForm] = useState({
    company_id: "",

    client_id: "",

    project_id: "",

    site_id: "",

    department_id: "",

    designation_code: "",

    designation_name: "",

    description: "",

    status: true,
  });

  const [companies, setCompanies] = useState([]);

  const [clients, setClients] = useState([]);

  const [projects, setProjects] = useState([]);

  const [sites, setSites] = useState([]);

  const [departments, setDepartments] = useState([]);

  const [saving, setSaving] = useState(false);

  const loadCompanies = async () => {
    try {
      const response = await getCompanyDropdown();

      setCompanies(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadClients = async () => {
    try {
      const response = await getClientDropdown();

      setClients(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadProjects = async () => {
    try {
      const response = await getProjectDropdown();

      setProjects(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadSites = async () => {
    try {
      const response = await getSiteDropdown();

      setSites(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadDepartments = async () => {
    try {
      const response = await departmentDropdown();

      setDepartments(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadCompanies();

    loadClients();

    loadProjects();

    loadSites();

    loadDepartments();
  }, []);

  useEffect(() => {
    if (edit && designation) {
      setForm({
        ...designation,
      });
    }
  }, [edit, designation]);

  return (
    <div className="gx-modal">
      <div className="gx-company-form">
        {/* ==========================
                HEADER
            ========================== */}

        <div className="gx-status-header">
          <h2>
            <FaUserTie />
            &nbsp;
            {edit ? "Edit Designation" : "Add Designation"}
          </h2>
        </div>

        {/* ==========================
                BODY
            ========================== */}

        <div className="gx-status-body">
          {/* ======================
                    ORGANIZATION
                ====================== */}

          <div className="gx-form-section">
            <h3>Organization Details</h3>

            <div className="gx-grid-2">
              <div>
                <label>
                  <FaBuilding />
                  Company
                </label>

                <select
                  value={form.company_id}
                  onChange={(e) => {
                    setForm({
                      ...form,

                      company_id: e.target.value,
                    });
                  }}
                >
                  <option>Select Company</option>

                  {companies.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.company_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>
                  <FaUsers />
                  Client
                </label>

                <select
                  value={form.client_id}
                  onChange={(e) => {
                    setForm({
                      ...form,

                      client_id: e.target.value,
                    });
                  }}
                >
                  <option>Select Client</option>

                  {clients.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.client_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>
                  <FaProjectDiagram />
                  Project
                </label>

                <select
                  value={form.project_id}
                  onChange={(e) => {
                    setForm({
                      ...form,

                      project_id: e.target.value,
                    });
                  }}
                >
                  <option>Select Project</option>

                  {projects.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.project_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>
                  <FaMapMarkerAlt />
                  Site
                </label>

                <select
                  value={form.site_id}
                  onChange={(e) => {
                    setForm({
                      ...form,

                      site_id: e.target.value,
                    });
                  }}
                >
                  <option>Select Site</option>

                  {sites.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.site_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* ======================
                    DESIGNATION
                ====================== */}

          <div className="gx-form-section">
            <h3>Designation Information</h3>

            <div className="gx-grid-2">
              <div>
                <label>
                  <FaSitemap />
                  Department
                </label>

                <select
                  value={form.department_id}
                  onChange={(e) => {
                    setForm({
                      ...form,

                      department_id: e.target.value,
                    });
                  }}
                >
                  <option>Select Department</option>

                  {departments.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.department_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>Designation Code</label>

                <input
                  value={form.designation_code}
                  onChange={(e) => {
                    setForm({
                      ...form,

                      designation_code: e.target.value,
                    });
                  }}
                />
              </div>

              <div>
                <label>Designation Name</label>

                <input
                  value={form.designation_name}
                  onChange={(e) => {
                    setForm({
                      ...form,

                      designation_name: e.target.value,
                    });
                  }}
                />
              </div>

              <div>
                <label>Status</label>

                <select
                  value={String(form.status)}
                  onChange={(e) => {
                    setForm({
                      ...form,

                      status: e.target.value === "true",
                    });
                  }}
                >
                  <option value="true">Active</option>

                  <option value="false">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* ======================
                    DESCRIPTION
                ====================== */}

          <div className="gx-form-section">
            <label>
              <FaAlignLeft />
              Description
            </label>

            <textarea
              rows="5"
              value={form.description}
              onChange={(e) => {
                setForm({
                  ...form,

                  description: e.target.value,
                });
              }}
            />
          </div>
        </div>

        {/* ==========================
                FOOTER
            ========================== */}

        <div className="gx-status-footer">
          <button className="btn-light" onClick={close} disabled={saving}>
            <FaTimes />
            &nbsp; Cancel
          </button>

          <button
            className="btn-primary"
            disabled={saving}
            onClick={async () => {
              try {
                if (
                  !form.company_id ||
                  !form.client_id ||
                  !form.project_id ||
                  !form.site_id ||
                  !form.department_id ||
                  !form.designation_code ||
                  !form.designation_name
                ) {
                  alert("Please fill all required fields.");

                  return;
                }

                setSaving(true);

                if (edit) {
                  await updateDesignation(
                    designation.id,

                    form,
                  );
                } else {
                  await createDesignation(form);
                }

                refresh();
              } catch (err) {
                console.log(err);

                alert(
                  err?.response?.data?.message || "Unable to save designation.",
                );
              } finally {
                setSaving(false);
              }
            }}
          >
            <FaSave />
            &nbsp;
            {saving
              ? "Saving..."
              : edit
                ? "Update Designation"
                : "Save Designation"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DesignationForm;
