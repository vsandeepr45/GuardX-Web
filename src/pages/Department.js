import React, { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import "../styles/company.css";

import {
  FaPlus,
  FaSearch,
  FaDownload,
  FaSitemap,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import {
  getDepartments,
  getDepartment,
  getDepartmentDashboard,
  changeDepartmentStatus,
  deleteDepartment,
} from "../api/department";

import { exportExcel, exportCSV, exportPDF, printTable } from "../utils/export";

import DepartmentTable from "../components/Department/DepartmentTable";
import DepartmentForm from "../components/Department/DepartmentForm";
import DepartmentView from "../components/Department/DepartmentView";
import DepartmentStatusDialog from "../components/Department/DepartmentStatusDialog";
import DepartmentDeleteDialog from "../components/Department/DepartmentDeleteDialog";

import { useAuth } from "../context/AuthContext";

import { hasPermission } from "../utils/permissions";

function Department() {
  const { user } = useAuth();

  const [departments, setDepartments] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

  const [showForm, setShowForm] = useState(false);

  const [editForm, setEditForm] = useState(false);

  const [viewOpen, setViewOpen] = useState(false);

  const [statusOpen, setStatusOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const [stats, setStats] = useState({
    total: 0,

    active: 0,

    inactive: 0,
  });

  /*
    ===========================================
    DASHBOARD
    ===========================================
    */

  const loadDashboard = async () => {
    try {
      const response = await getDepartmentDashboard();

      setStats(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  /*
    ===========================================
    DEPARTMENTS
    ===========================================
    */

  const loadDepartments = async () => {
    try {
      setLoading(true);

      const response = await getDepartments();

      setDepartments(response.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const refreshPage = () => {
    loadDepartments();

    loadDashboard();
  };

  useEffect(() => {
    refreshPage();
  }, []);

  /*
    ===========================================
    EXPORT
    ===========================================
    */

  const exportData = departments

    .filter((item) => {
      const matchSearch =
        item.department_name

          ?.toLowerCase()

          .includes(search.toLowerCase()) ||
        item.department_code

          ?.toLowerCase()

          .includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "all" || String(item.status) === statusFilter;

      return matchSearch && matchStatus;
    })

    .map((item) => ({
      Code: item.department_code,

      Department: item.department_name,

      Company: item.company_name,

      Client: item.client_name,

      Project: item.project_name,

      Site: item.site_name,

      Head: item.department_head,

      Status: item.status ? "Active" : "Inactive",
    }));

  return (
    <DashboardLayout title="Department Master">
      {/* ===============================
                PAGE HEADER
            =============================== */}

      <div className="page-header">
        <div>
          <h2>Department Management</h2>

          <p>Manage all Departments</p>
        </div>

        {hasPermission(
          user,

          "department_add",
        ) && (
          <button
            className="btn-primary"
            onClick={() => {
              setShowForm(true);
            }}
          >
            <FaPlus />
            &nbsp; Add Department
          </button>
        )}
      </div>

      {/* ===============================
                TOOLBAR
            =============================== */}

      <div className="toolbar">
        <div className="search-box">
          <FaSearch />

          <input
            placeholder="Search Department..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>

        <div className="toolbar-buttons">
          <select
            className="form-control"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
            }}
          >
            <option value="all">All</option>

            <option value="true">Active</option>

            <option value="false">Inactive</option>
          </select>

          <div className="export-menu">
            <button className="btn-light">
              <FaDownload />
              &nbsp; Export
            </button>

            <div className="export-dropdown">
              <button
                onClick={() => {
                  exportExcel(
                    exportData,

                    "Departments",
                  );
                }}
              >
                Excel
              </button>

              <button
                onClick={() => {
                  exportCSV(
                    exportData,

                    "Departments",
                  );
                }}
              >
                CSV
              </button>

              <button
                onClick={() => {
                  exportPDF(
                    exportData,

                    "Departments",
                  );
                }}
              >
                PDF
              </button>

              <button
                onClick={() => {
                  printTable(exportData);
                }}
              >
                Print
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===============================
                SUMMARY CARDS
            =============================== */}

      <div className="gx-company-summary">
        <div className="gx-summary-card total">
          <div>
            <h2>{stats.total}</h2>

            <span>Total Departments</span>
          </div>

          <FaSitemap className="gx-summary-icon" />
        </div>

        <div className="gx-summary-card active">
          <div>
            <h2>{stats.active}</h2>

            <span>Active Departments</span>
          </div>

          <FaCheckCircle className="gx-summary-icon" />
        </div>

        <div className="gx-summary-card inactive">
          <div>
            <h2>{stats.inactive}</h2>

            <span>Inactive Departments</span>
          </div>

          <FaTimesCircle className="gx-summary-icon" />
        </div>
      </div>

      {/* ===============================
                TABLE
            =============================== */}

      <DepartmentTable
        loading={loading}
        departments={departments}
        search={search}
        statusFilter={statusFilter}
        refresh={refreshPage}
        onView={async (department) => {
          try {
            const response = await getDepartment(department.id);

            setSelectedDepartment(response.data.data);

            setViewOpen(true);
          } catch (err) {
            console.log(err);
          }
        }}
        onEdit={async (department) => {
          try {
            const response = await getDepartment(department.id);

            setSelectedDepartment(response.data.data);

            setEditForm(true);
          } catch (err) {
            console.log(err);
          }
        }}
        onStatus={(department) => {
          setSelectedDepartment(department);

          setStatusOpen(true);
        }}
        onDelete={(department) => {
          setSelectedDepartment(department);

          setDeleteOpen(true);
        }}
      />

      {/* ==========================================
                ADD DEPARTMENT
            ========================================== */}

      {showForm && (
        <DepartmentForm
          mode="add"
          refresh={refreshPage}
          close={() => {
            setShowForm(false);
          }}
        />
      )}

      {/* ==========================================
                EDIT DEPARTMENT
            ========================================== */}

      {editForm && (
        <DepartmentForm
          mode="edit"
          department={selectedDepartment}
          refresh={refreshPage}
          close={() => {
            setEditForm(false);

            setSelectedDepartment(null);
          }}
        />
      )}

      {/* ==========================================
                VIEW DEPARTMENT
            ========================================== */}

      {viewOpen && (
        <DepartmentView
          department={selectedDepartment}
          close={() => {
            setViewOpen(false);

            setSelectedDepartment(null);
          }}
        />
      )}

      {/* ==========================================
                STATUS
            ========================================== */}

      {statusOpen && (
        <DepartmentStatusDialog
          open={statusOpen}
          department={selectedDepartment}
          close={() => {
            setStatusOpen(false);

            setSelectedDepartment(null);
          }}
          confirm={async () => {
            try {
              await changeDepartmentStatus(
                selectedDepartment.id,

                !selectedDepartment.status,
              );

              refreshPage();
            } catch (err) {
              console.log(err);
            } finally {
              setStatusOpen(false);

              setSelectedDepartment(null);
            }
          }}
        />
      )}

      {/* ==========================================
                DELETE
            ========================================== */}

      {deleteOpen && (
        <DepartmentDeleteDialog
          open={deleteOpen}
          department={selectedDepartment}
          close={() => {
            setDeleteOpen(false);

            setSelectedDepartment(null);
          }}
          confirm={async () => {
            try {
              await deleteDepartment(selectedDepartment.id);

              refreshPage();
            } catch (err) {
              console.log(err);
            } finally {
              setDeleteOpen(false);

              setSelectedDepartment(null);
            }
          }}
        />
      )}
    </DashboardLayout>
  );
}

export default Department;
