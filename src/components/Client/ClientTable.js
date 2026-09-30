import React, { useState } from "react";

import {
  FaEye,
  FaEdit,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";

import { deleteClient } from "../../api/client";

import { hasPermission } from "../../utils/permissions";

import { useAuth } from "../../context/AuthContext";

import ConfirmDialog from "../Common/ConfirmDialog";

function ClientTable({
  clients,

  loading,

  search,

  statusFilter,

  refresh,

  onView,

  onEdit,

  onStatus,
}) {
  const { user } = useAuth();

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedClient, setSelectedClient] = useState(null);

  const filteredClients = clients.filter((client) => {
    const matchSearch =
      client.client_name?.toLowerCase().includes(search.toLowerCase()) ||
      client.client_code?.toLowerCase().includes(search.toLowerCase()) ||
      client.company_name?.toLowerCase().includes(search.toLowerCase()) ||
      client.city?.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "all" || String(client.status) === statusFilter;

    return matchSearch && matchStatus;
  });

  const handleDeleteClick = (client) => {
    setSelectedClient(client);

    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteClient(selectedClient.id);

      setDeleteOpen(false);

      setSelectedClient(null);

      refresh();
    } catch (err) {
      alert(err.response?.data?.message || "Unable to delete client.");
    }
  };

  if (loading) {
    return <div className="table-loader">Loading Clients...</div>;
  }

  if (filteredClients.length === 0) {
    return <div className="empty-table">No Clients Found</div>;
  }

  return (
    <>
      <div className="gx-table-container">
        <table className="gx-table">
          <thead>
            <tr>
              <th>Code</th>

              <th>Client</th>

              <th>Company</th>

              <th>Contact</th>

              <th>Mobile</th>

              <th>City</th>

              <th>Status</th>

              <th width="220">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredClients.map((client) => (
              <tr key={client.id}>
                <td>{client.client_code}</td>

                <td>{client.client_name}</td>

                <td>{client.company_name}</td>

                <td>{client.contact_person}</td>

                <td>{client.mobile}</td>

                <td>{client.city}</td>

                <td>
                  {client.status ? (
                    <span className="badge-success">Active</span>
                  ) : (
                    <span className="badge-danger">Inactive</span>
                  )}
                </td>

                <td>
                  {hasPermission(user, "client_view") && (
                    <button
                      className="btn-icon btn-view"
                      onClick={() => onView(client)}
                    >
                      <FaEye />
                    </button>
                  )}

                  {hasPermission(user, "client_edit") && (
                    <button
                      className="btn-icon btn-edit"
                      onClick={() => onEdit(client)}
                    >
                      <FaEdit />
                    </button>
                  )}

                  {hasPermission(user, "client_edit") && (
                    <button
                      className="btn-icon btn-status"
                      onClick={() => onStatus(client)}
                    >
                      {client.status ? <FaToggleOn /> : <FaToggleOff />}
                    </button>
                  )}

                  {hasPermission(user, "client_delete") && (
                    <button
                      className="btn-icon btn-delete"
                      onClick={() => handleDeleteClick(client)}
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
        title="Delete Client"
        message={`Are you sure you want to delete "${selectedClient?.client_name}"?`}
        confirmText="Delete"
        confirmClass="btn-danger"
        onCancel={() => {
          setDeleteOpen(false);

          setSelectedClient(null);
        }}
        onConfirm={handleDelete}
      />
    </>
  );
}

export default ClientTable;
