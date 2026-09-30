import React, { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import "../styles/employee.css";

import DeploymentRequestTable from "../components/DeploymentRequest/DeploymentRequestTable";
import DeploymentRequestForm from "../components/DeploymentRequest/DeploymentRequestForm";
import DeploymentRequestView from "../components/DeploymentRequest/DeploymentRequestView";
// import DeploymentRequestStatusDialog from "../components/DeploymentRequest/DeploymentRequestStatusDialog";
import DeploymentRequestDeleteDialog from "../components/DeploymentRequest/DeploymentRequestDeleteDialog";
import AssignGuardsDialog from "../components/DeploymentRequest/AssignGuardsDialog";

import { getCompanyDropdown } from "../api/company";
import { getClientDropdown } from "../api/client";
import { getProjectDropdown } from "../api/project";
import { getSiteDropdown } from "../api/site";
import { getShiftDropdown } from "../api/shift";

import {
  getDeploymentRequests,
  getDeploymentRequest,
  createDeploymentRequest,
  updateDeploymentRequest,
  deleteDeploymentRequest,
  changeDeploymentRequestStatus,
  getDeploymentRequestDashboard,
  assignGuards,
} from "../api/deploymentRequest";

function DeploymentRequest() {
  const [requests, setRequests] = useState([]);

  const [loading, setLoading] = useState(true);

  const [dashboard, setDashboard] = useState({});

  const [formOpen, setFormOpen] = useState(false);

  const [viewOpen, setViewOpen] = useState(false);

  const [statusOpen, setStatusOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);

  const [assignRequest, setAssignRequest] = useState(null);

  const [selected, setSelected] = useState(null);

  const [companies, setCompanies] = useState([]);

  const [clients, setClients] = useState([]);

  const [projects, setProjects] = useState([]);

  const [sites, setSites] = useState([]);

  const [shifts, setShifts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const loadData = async () => {
    try {
      const companyRes = await getCompanyDropdown();
      setCompanies(companyRes.data.data || []);

      const clientRes = await getClientDropdown();
      setClients(clientRes.data.data || []);

      const projectRes = await getProjectDropdown();
      setProjects(projectRes.data.data || []);

      const siteRes = await getSiteDropdown();
      setSites(siteRes.data.data || []);

      const shiftRes = await getShiftDropdown();
      setShifts(shiftRes.data.data || []);

      const dashboardRes = await getDeploymentRequestDashboard();
      setDashboard(dashboardRes.data.data || {});

      const requestRes = await getDeploymentRequests();

      console.log("=================================");
      console.log("Deployment Request Response");
      console.log(requestRes);
      console.log(requestRes.data);
      console.log(requestRes.data.data);
      console.log("Total Rows:", requestRes.data.data?.length);
      console.log("=================================");

      setRequests(requestRes.data.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  // ==========================================
  // OPEN ADD
  // ==========================================

  const openAdd = () => {
    setSelected(null);

    setFormOpen(true);
  };

  // ==========================================
  // OPEN EDIT
  // ==========================================

  const openEdit = async (row) => {
    try {
      const res = await getDeploymentRequest(row.id);

      setSelected(res.data.data);

      setFormOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  // ==========================================
  // OPEN VIEW
  // ==========================================

  const openView = (row) => {
    setSelected(row);

    setViewOpen(true);
  };

  // ==========================================
  // OPEN STATUS
  // ==========================================

  const openStatus = (row) => {
    setSelected(row);

    setStatusOpen(true);
  };

  // ==========================================
  // OPEN DELETE
  // ==========================================

  const openDelete = (row) => {
    setSelected(row);

    setDeleteOpen(true);
  };

  const openAssign = (row) => {
    setAssignRequest(row);

    setAssignOpen(true);
  };

  // ==========================================
  // SAVE
  // ==========================================

  const handleSave = async (data) => {
    try {
      if (selected) {
        await updateDeploymentRequest(
          selected.id,

          data,
        );
      } else {
        await createDeploymentRequest(data);
      }

      setFormOpen(false);

      loadData();
    } catch (err) {
      console.log(err);
    }
  };

  // ==========================================
  // DELETE
  // ==========================================

  const handleDelete = async (id) => {
    try {
      await deleteDeploymentRequest(id);

      setDeleteOpen(false);

      loadData();
    } catch (err) {
      console.log(err);
    }
  };

  // ==========================================
  // STATUS
  // ==========================================

  const handleStatus = async (
    id,

    status,
  ) => {
    try {
      await changeDeploymentRequestStatus(
        id,

        status,
      );

      setStatusOpen(false);

      loadData();
    } catch (err) {
      console.log(err);
    }
  };

  // ==========================================
  // ASSIGN GUARDS
  // ==========================================

  const handleAssign = async (data) => {
    try {
      await assignGuards(
        assignRequest.id,

        data,
      );

      setAssignOpen(false);

      loadData();
    } catch (err) {
      console.log(err);
    }
  };

  // ==========================================
  // SEARCH
  // ==========================================

  const filteredRequests = requests.filter((item) => {
    const search = searchTerm.toLowerCase();

    return (
      (item.company_name || "").toLowerCase().includes(search) ||
      (item.client_name || "").toLowerCase().includes(search) ||
      (item.project_name || "").toLowerCase().includes(search) ||
      (item.site_name || "").toLowerCase().includes(search) ||
      (item.shift_name || "").toLowerCase().includes(search) ||
      (item.priority || "").toLowerCase().includes(search) ||
      (item.status || "").toLowerCase().includes(search)
    );
  });
  return (
    <DashboardLayout title="Deployment Requests">
      {/* ========================= Dashboard ========================= */}

      <div className="dp-page-header">
        <h2>Deployment Requests</h2>

        <button className="dp-add-btn" onClick={openAdd}>
          Add Request
        </button>
      </div>

      <div className="dp-dashboard-cards">
        <div className="dp-dashboard-card">
          <h2>{dashboard.total || 0}</h2>

          <p>Total Requests</p>
        </div>

        <div className="dp-dashboard-card">
          <h2>{dashboard.pending || 0}</h2>

          <p>Pending</p>
        </div>

        <div className="dp-dashboard-card">
          <h2>{dashboard.approved || 0}</h2>

          <p>Approved</p>
        </div>

        <div className="dp-dashboard-card">
          <h2>{dashboard.completed || 0}</h2>

          <p>Completed</p>
        </div>

        <div className="dp-dashboard-card">
          <h2>{dashboard.rejected || 0}</h2>

          <p>Rejected</p>
        </div>
      </div>

      {/* ========================= Search ========================= */}

      <div className="dp-search-box">
        <input
          type="text"
          className="dp-search-input"
          placeholder="Search Company, Client, Project, Site, Shift, Status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* ========================= Table ========================= */}

      <DeploymentRequestTable
        requests={filteredRequests}
        onView={openView}
        onEdit={openEdit}
        onAssign={openAssign}
        // onStatus={openStatus}

        onDelete={openDelete}
      />

      {/* ========================= Form ========================= */}

      <DeploymentRequestForm
        open={formOpen}
        request={selected}
        companies={companies}
        clients={clients}
        projects={projects}
        sites={sites}
        shifts={shifts}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSave}
      />

      {/* ========================= View ========================= */}

      <DeploymentRequestView
        open={viewOpen}
        request={selected}
        onClose={() => setViewOpen(false)}
      />

      {/* ========================= Status ========================= */}

      {/* <DeploymentRequestStatusDialog

                open={statusOpen}

                request={selected}

                close={() =>

                    setStatusOpen(false)

                }

                confirm={handleStatus}

            /> */}

      {/* ========================= Delete ========================= */}

      <DeploymentRequestDeleteDialog
        open={deleteOpen}
        request={selected}
        close={() => setDeleteOpen(false)}
        confirm={handleDelete}
      />

      <AssignGuardsDialog
        open={assignOpen}
        request={assignRequest}
        onClose={() => setAssignOpen(false)}
        onAssign={handleAssign}
      />
    </DashboardLayout>
  );
}

export default DeploymentRequest;
  