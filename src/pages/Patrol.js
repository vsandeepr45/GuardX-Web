import React, { useState, useEffect, useCallback } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import "../styles/patrol.css";

import {
  FaPlus,
  FaDownload,
  FaRoute,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
  FaSyncAlt,
} from "react-icons/fa";

import {
  getRoutes,
  getRoute,
  getPatrolDashboard,
  changeRouteStatus,
  deleteRoute,
} from "../api/patrol";

import PatrolTable from "../components/Patrol/PatrolTable";
import PatrolForm from "../components/Patrol/PatrolForm";
import PatrolView from "../components/Patrol/PatrolView";
import PatrolStatusDialog from "../components/Patrol/PatrolStatusDialog";
import PatrolDeleteDialog from "../components/Patrol/PatrolDeleteDialog";

export default function Patrol() {
  // ===========================================
  // STATES
  // ===========================================

  const [routes, setRoutes] = useState([]);

  const [dashboard, setDashboard] = useState({
    total: 0,

    active: 0,

    inactive: 0,
  });

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [selected, setSelected] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const [showView, setShowView] = useState(false);

  const [showStatus, setShowStatus] = useState(false);

  const [showDelete, setShowDelete] = useState(false);

  const [editMode, setEditMode] = useState(false);

  // ===========================================
  // LOAD DASHBOARD
  // ===========================================

  const loadDashboard = useCallback(async () => {
    try {
      const res = await getPatrolDashboard();

      setDashboard(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  // ===========================================
  // LOAD ROUTES
  // ===========================================

  const loadRoutes = useCallback(async () => {
    try {
      setLoading(true);

      const res = await getRoutes();

      setRoutes(res.data.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // ===========================================
  // REFRESH
  // ===========================================

  const refresh = useCallback(() => {
    loadDashboard();

    loadRoutes();
  }, [loadDashboard, loadRoutes]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // ===========================================
  // ADD ROUTE
  // ===========================================

  const addRoute = () => {
    setSelected(null);

    setEditMode(false);

    setShowForm(true);
  };

  // ===========================================
  // EDIT ROUTE
  // ===========================================
const editRoute = async (row) => {
  try {
    const res = await getRoute(row.id);

    console.log("PATROL RESPONSE", res.data.data);

    setSelected(res.data.data);

    setEditMode(true);

    setShowForm(true);
  } catch (err) {
    console.log(err);
  }
};

  // ===========================================
  // VIEW ROUTE
  // ===========================================

  const viewRoute = async (row) => {
    try {
      const res = await getRoute(row.id);

      setSelected(res.data.data);

      setShowView(true);
    } catch (err) {
      console.log(err);
    }
  };

  // ===========================================
  // STATUS
  // ===========================================

  const statusRoute = (row) => {
    setSelected(row);

    setShowStatus(true);
  };

  // ===========================================
  // DELETE
  // ===========================================

  const removeRoute = (row) => {
    setSelected(row);

    setShowDelete(true);
  };

  // ===========================================
  // AFTER SAVE
  // ===========================================

  const afterSave = () => {
    setShowForm(false);

    setSelected(null);

    setEditMode(false);

    refresh();
  };

  return (
    <DashboardLayout title="Patrol Route Master">
      {/* ==========================================
                Header
            ========================================== */}

      <div className="gx-page-header">
        <div>
          <h2>Patrol Route Master</h2>

          <p>Manage Patrol Routes</p>
        </div>

        <div className="gx-header-actions">
          <button className="gx-btn-light" onClick={refresh}>
            <FaSyncAlt />
            &nbsp; Refresh
          </button>

          <button className="gx-btn-light">
            <FaDownload />
            &nbsp; Export
          </button>

          <button className="gx-btn-primary" onClick={addRoute}>
            <FaPlus />
            &nbsp; New Route
          </button>
        </div>
      </div>

      {/* ==========================================
                Dashboard
            ========================================== */}

      <div className="gx-summary">
        <div className="gx-card">
          <FaRoute className="gx-card-icon" />

          <h2>{dashboard.total}</h2>

          <span>Total Routes</span>
        </div>

        <div className="gx-card">
          <FaCheckCircle className="gx-card-icon success" />

          <h2>{dashboard.active}</h2>

          <span>Active Routes</span>
        </div>

        <div className="gx-card">
          <FaTimesCircle className="gx-card-icon danger" />

          <h2>{dashboard.inactive}</h2>

          <span>Inactive Routes</span>
        </div>
      </div>
      {/* ==========================================
                Toolbar
            ========================================== */}

      <div className="gx-toolbar">
        <div className="gx-search">
          <FaSearch />

          <input
            type="text"
            placeholder="Search Route..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>
      {/* ==========================================
                Patrol Table
            ========================================== */}

      <PatrolTable
        loading={loading}
        routes={routes}
        search={search}
        onView={viewRoute}
        onEdit={editRoute}
        onStatus={statusRoute}
        onDelete={removeRoute}
      />

      {/* ==========================================
                PATROL FORM
            ========================================== */}

      <PatrolForm
        open={showForm}
        editMode={editMode}
        data={selected}
        onClose={() => {
          setShowForm(false);

          setSelected(null);

          setEditMode(false);
        }}
        onSaved={afterSave}
      />

      {/* ==========================================
                VIEW ROUTE
            ========================================== */}

      <PatrolView
        open={showView}
        data={selected}
        onClose={() => {
          setShowView(false);

          setSelected(null);
        }}
      />

      {/* ==========================================
                STATUS
            ========================================== */}

      <PatrolStatusDialog
        open={showStatus}
        route={selected}
        onClose={() => {
          setShowStatus(false);

          setSelected(null);
        }}
        onConfirm={async () => {
          try {
            await changeRouteStatus(
              selected.id,

              !selected.status,
            );

            setShowStatus(false);

            refresh();
          } catch (err) {
            console.log(err);
          }
        }}
      />

      {/* ==========================================
                DELETE
            ========================================== */}

      <PatrolDeleteDialog
        open={showDelete}
        route={selected}
        onClose={() => {
          setShowDelete(false);

          setSelected(null);
        }}
        onConfirm={async () => {
          try {
            await deleteRoute(selected.id);

            setShowDelete(false);

            refresh();
          } catch (err) {
            console.log(err);
          }
        }}
      />
    </DashboardLayout>
  );
}
