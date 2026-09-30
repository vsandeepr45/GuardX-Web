import React, { useState, useEffect } from "react";
import "../../styles/department.css";
import { createDepartment, updateDepartment } from "../../api/department";

import { getCompanyDropdown } from "../../api/company";

import { getClientDropdown } from "../../api/client";

import { getProjectDropdown } from "../../api/project";

import { getSiteDropdown } from "../../api/site";

function DepartmentForm({
  mode,

  department,

  refresh,

  close,
}) {
  const [saving, setSaving] = useState(false);

  const [companies, setCompanies] = useState([]);

  const [clients, setClients] = useState([]);

  const [projects, setProjects] = useState([]);

  const [sites, setSites] = useState([]);

  const [form, setForm] = useState({
    company_id: "",

    client_id: "",

    project_id: "",

    site_id: "",

    department_code: "",

    department_name: "",

    department_head: "",

    description: "",

    status: true,
  });

  /*
    ==================================
    INPUT
    ==================================
    */

  const change = (e) => {
    const {
      name,

      value,

      type,

      checked,
    } = e.target;

    setForm({
      ...form,

      [name]: type === "checkbox" ? checked : value,
    });
  };

  /*
==================================
LOAD COMPANIES
==================================
*/

  const loadCompanies = async () => {
    try {
      const response = await getCompanyDropdown();

      setCompanies(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  /*
==================================
LOAD CLIENTS
==================================
*/

  const loadClients = async (companyId) => {
    try {
      const response = await getClientDropdown(companyId);

      setClients(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  /*
==================================
LOAD PROJECTS
==================================
*/

  const loadProjects = async (clientId) => {
    try {
      const response = await getProjectDropdown(clientId);

      setProjects(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  /*
==================================
LOAD SITES
==================================
*/

  const loadSites = async (projectId) => {
    try {
      const response = await getSiteDropdown(projectId);

      setSites(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  /*
==================================
LOAD
==================================
*/

  useEffect(() => {
    loadCompanies();
  }, []);

  useEffect(() => {
    if (mode === "edit" && department) {
      setForm({
        ...department,
      });
    }
  }, [department]);

  /*
==================================
RETURN
==================================
*/

  return (
    <div className="gx-modal">
      <div className="gx-company-form">
        {/* =====================================
                HEADER
            ===================================== */}

        <div className="gx-status-header">
          <h2>{mode === "add" ? "Add Department" : "Edit Department"}</h2>
        </div>

        <div className="gx-status-body">
          {/* =====================================
                    ORGANIZATION
                ===================================== */}

          <div className="gx-form-section">
            <h3>🏢 Organization Details</h3>

            <div className="gx-grid-2">
              {/* Company */}

              <div>
                <label>Company</label>

                <select
                  name="company_id"
                  value={form.company_id}
                  onChange={async (e) => {
                    change(e);

                    await loadClients(e.target.value);
                  }}
                >
                  <option value="">Select Company</option>

                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.company_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Client */}

              <div>
                <label>Client</label>

                <select
                  name="client_id"
                  value={form.client_id}
                  onChange={async (e) => {
                    change(e);

                    await loadProjects(e.target.value);
                  }}
                >
                  <option value="">Select Client</option>

                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.client_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Project */}

              <div>
                <label>Project</label>

                <select
                  name="project_id"
                  value={form.project_id}
                  onChange={async (e) => {
                    change(e);

                    await loadSites(e.target.value);
                  }}
                >
                  <option value="">Select Project</option>

                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.project_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Site */}

              <div>
                <label>Site</label>

                <select name="site_id" value={form.site_id} onChange={change}>
                  <option value="">Select Site</option>

                  {sites.map((site) => (
                    <option key={site.id} value={site.id}>
                      {site.site_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* =====================================
                    DEPARTMENT DETAILS
                ===================================== */}

          <div className="gx-form-section">
            <h3>🏢 Department Details</h3>

            <div className="gx-grid-2">
              {/* Department Code */}

              <div>
                <label>Department Code</label>

                <input
                  type="text"
                  name="department_code"
                  placeholder="DEP001"
                  value={form.department_code}
                  onChange={change}
                />
              </div>

              {/* Department Name */}

              <div>
                <label>Department Name</label>

                <input
                  type="text"
                  name="department_name"
                  placeholder="Security"
                  value={form.department_name}
                  onChange={change}
                />
              </div>

              {/* Department Head */}

              <div>
                <label>Department Head</label>

                <input
                  type="text"
                  name="department_head"
                  placeholder="Department Head"
                  value={form.department_head}
                  onChange={change}
                />
              </div>

              {/* Status */}

              <div>
                <label>Status</label>

                <select
                  name="status"
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

          {/* =====================================
                    DESCRIPTION
                ===================================== */}

          <div className="gx-form-section">
            <h3>📝 Description</h3>

            <textarea
              name="description"
              rows="5"
              placeholder="Department Description..."
              value={form.description}
              onChange={change}
            />
          </div>

          {/* =====================================
                    FOOTER
                ===================================== */}

          <div className="gx-status-footer">
            <button className="btn-light" onClick={close}>
              Cancel
            </button>

            <button
              className="btn-primary"
              disabled={saving}
              onClick={async () => {
                try {
                  setSaving(true);

                  if (mode === "add") {
                    await createDepartment(form);
                  } else {
                    await updateDepartment(
                      department.id,

                      form,
                    );
                  }

                  refresh();

                  close();
                } catch (err) {
                  console.log(err);

                  alert(
                    err.response?.data?.message || "Unable to save Department.",
                  );
                } finally {
                  setSaving(false);
                }
              }}
            >
              {saving
                ? "Saving..."
                : mode === "add"
                  ? "Save Department"
                  : "Update Department"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DepartmentForm;
