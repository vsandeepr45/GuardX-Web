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

import { deleteProject } from "../../api/project";

function ProjectTable({
  projects,
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

  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = projects.filter((project) => {
    const matchSearch =
      project.project_name?.toLowerCase().includes(search.toLowerCase()) ||
      project.project_code?.toLowerCase().includes(search.toLowerCase()) ||
      project.client_name?.toLowerCase().includes(search.toLowerCase()) ||
      project.company_name?.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "all" || String(project.status) === statusFilter;

    return matchSearch && matchStatus;
  });

  const handleDeleteClick = (project) => {
    setSelectedProject(project);

    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteProject(selectedProject.id);

      refresh();
    } catch (err) {
      alert(err.response?.data?.message || "Unable to delete project.");
    } finally {
      setDeleteOpen(false);

      setSelectedProject(null);
    }
  };

  if (loading) {
    return <div className="table-loader">Loading Projects...</div>;
  }

  if (filteredProjects.length === 0) {
    return <div className="empty-table">No Projects Found</div>;
  }

  return (
    <>
      <div className="gx-table-container">
        <table className="gx-table">
          <thead>
            <tr>
              <th>Code</th>

              <th>Project</th>

              <th>Company</th>

              <th>Client</th>

              <th>Manager</th>

              <th>City</th>

              <th>Start Date</th>

              <th>Status</th>

              <th width="220">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredProjects.map((project) => (
              <tr key={project.id}>
                <td>{project.project_code}</td>

                <td>{project.project_name}</td>

                <td>{project.company_name}</td>

                <td>{project.client_name}</td>

                <td>{project.project_manager}</td>

                <td>{project.city}</td>

                <td>{project.start_date}</td>

                <td>
                  {project.status ? (
                    <span className="badge-success">Active</span>
                  ) : (
                    <span className="badge-danger">Inactive</span>
                  )}
                </td>

                <td>
                  {hasPermission(user, "project_view") && (
                    <button
                      className="btn-icon btn-view"
                      title="View"
                      onClick={() => onView(project)}
                    >
                      <FaEye />
                    </button>
                  )}

                  {hasPermission(user, "project_edit") && (
                    <button
                      className="btn-icon btn-edit"
                      title="Edit"
                      onClick={() => onEdit(project)}
                    >
                      <FaEdit />
                    </button>
                  )}

                  {hasPermission(user, "project_edit") && (
                    <button
                      className="btn-icon btn-status"
                      title="Change Status"
                      onClick={() => onStatus(project)}
                    >
                      {project.status ? <FaToggleOn /> : <FaToggleOff />}
                    </button>
                  )}

                  {hasPermission(user, "project_delete") && (
                    <button
                      className="btn-icon btn-delete"
                      title="Delete"
                      onClick={() => handleDeleteClick(project)}
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
        title="Delete Project"
        message={`Are you sure you want to delete "${selectedProject?.project_name}" ?`}
        confirmText="Delete"
        confirmClass="btn-danger"
        onCancel={() => {
          setDeleteOpen(false);

          setSelectedProject(null);
        }}
        onConfirm={handleDelete}
      />
    </>
  );
}

export default ProjectTable;
