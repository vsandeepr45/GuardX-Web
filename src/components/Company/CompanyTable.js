import React, { useState } from "react";

import {
  FaEye,
  FaEdit,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";

import { hasPermission } from "../../utils/permissions";

import { useAuth } from "../../context/AuthContext";

import ConfirmDialog from "../Common/ConfirmDialog";

import { deleteCompany } from "../../api/company";

function CompanyTable({
  companies,
  loading,
  search,
  statusFilter,
  refresh,
  onEdit,
  onView,
  onStatus,
}) {
  const { user } = useAuth();

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedCompany, setSelectedCompany] = useState(null);

  const filteredCompanies = companies.filter((company) => {
    const text = search.toLowerCase();

    const matchSearch =
      company.company_name?.toLowerCase().includes(text) ||
      company.company_code?.toLowerCase().includes(text) ||
      company.company_type?.toLowerCase().includes(text) ||
      company.city?.toLowerCase().includes(text) ||
      company.email?.toLowerCase().includes(text) ||
      company.phone?.toLowerCase().includes(text);

    const matchStatus =
      statusFilter === "all" || String(company.status) === statusFilter;

    return matchSearch && matchStatus;
  });

  const handleDeleteClick = (company) => {
    setSelectedCompany(company);

    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteCompany(selectedCompany.id);

      setDeleteOpen(false);

      setSelectedCompany(null);

      refresh();
    } catch (err) {
      alert(err.response?.data?.message || "Unable to delete company.");
    }
  };

  if (loading) {
    return <div className="table-loader">Loading Companies...</div>;
  }

  if (filteredCompanies.length === 0) {
    return <div className="empty-table">No Companies Found</div>;
  }

  return (
    <>
      <div className="gx-table-container">
        <table className="gx-table">
          <thead>
            <tr>
              <th>Code</th>

              <th>Company</th>

              <th>Type</th>

              <th>Email</th>

              <th>Phone</th>

              <th>City</th>

              <th>Status</th>

              <th width="220">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredCompanies.map((company) => (
              <tr key={company.id}>
                <td>{company.company_code}</td>

                <td>{company.company_name}</td>

                <td>{company.company_type}</td>

                <td>{company.email}</td>

                <td>{company.phone}</td>

                <td>{company.city}</td>

                <td>
                  {company.status ? (
                    <span className="badge-success">Active</span>
                  ) : (
                    <span className="badge-danger">Inactive</span>
                  )}
                </td>

                <td>
                  {hasPermission(user, "company_view") && (
                    <button
                      className="btn-icon btn-view"
                      onClick={() => onView(company)}
                    >
                      <FaEye />
                    </button>
                  )}

                  {hasPermission(user, "company_edit") && (
                    <button
                      className="btn-icon btn-edit"
                      title="Edit"
                      onClick={() => onEdit(company)}
                    >
                      <FaEdit />
                    </button>
                  )}

                  {hasPermission(user, "company_edit") && (
                    <button
                      className="btn-icon btn-status"
                      title="Status"
                      onClick={() => onStatus(company)}
                    >
                      {company.status ? <FaToggleOn /> : <FaToggleOff />}
                    </button>
                  )}

                  {hasPermission(user, "company_delete") && (
                    <button
                      className="btn-icon btn-delete"
                      title="Delete"
                      onClick={() => handleDeleteClick(company)}
                    >
                      <FaTrash />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={deleteOpen}
        title="Delete Company"
        message={`Are you sure you want to delete "${selectedCompany?.company_name}"?`}
        confirmText="Delete"
        confirmClass="btn-danger"
        onCancel={() => {
          setDeleteOpen(false);

          setSelectedCompany(null);
        }}
        onConfirm={handleDelete}
      />
    </>
  );
}

export default CompanyTable;
