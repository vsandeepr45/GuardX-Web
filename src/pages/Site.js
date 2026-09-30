import React, { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import "../styles/company.css";

import {
  FaPlus,
  FaSearch,
  FaDownload,
  FaBuilding,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import {
  getSites,
  getSite,
  getSiteDashboard,
  changeSiteStatus,
  deleteSite,
} from "../api/site";

import { exportExcel, exportCSV, exportPDF, printTable } from "../utils/export";
import SiteDeleteDialog from "../components/Site/SiteDeleteDialog";
import SiteTable from "../components/Site/SiteTable";
import SiteForm from "../components/Site/SiteForm";
import SiteView from "../components/Site/SiteView";
import SiteStatusDialog from "../components/Site/SiteStatusDialog";

import { useAuth } from "../context/AuthContext";

import { hasPermission } from "../utils/permissions";

function Site() {
  const { user } = useAuth();

  const [sites, setSites] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

  const [showForm, setShowForm] = useState(false);

  const [editForm, setEditForm] = useState(false);

  const [viewOpen, setViewOpen] = useState(false);

  const [statusOpen, setStatusOpen] = useState(false);

  const [selectedSite, setSelectedSite] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [stats, setStats] = useState({
    total: 0,

    active: 0,

    inactive: 0,
  });

  /*
    ====================================
    Dashboard
    ====================================
    */

  const loadDashboard = async () => {
    try {
      const response = await getSiteDashboard();

      setStats(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  /*
    ====================================
    Site List
    ====================================
    */

  const loadSites = async () => {
    try {
      setLoading(true);

      const response = await getSites();

      setSites(response.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const refreshPage = () => {
    loadSites();

    loadDashboard();
  };

  useEffect(() => {
    refreshPage();
  }, []);
const handleDelete = async () => {

    try {

        await deleteSite(selectedSite.id);

        refreshPage();

    } catch (err) {

        console.log(err);

        alert(
            err.response?.data?.message ||
            "Unable to delete site."
        );

    } finally {

        setDeleteOpen(false);

        setSelectedSite(null);

    }

};
  /*
    ====================================
    Export
    ====================================
    */

  const exportData = sites

    .filter((site) => {
      const matchSearch =
        site.site_name

          ?.toLowerCase()

          .includes(search.toLowerCase()) ||
        site.site_code

          ?.toLowerCase()

          .includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "all" || String(site.status) === statusFilter;

      return matchSearch && matchStatus;
    })

    .map((site) => ({
      "Site Code": site.site_code,

      "Site Name": site.site_name,

      Company: site.company_name,

      Client: site.client_name,

      Project: site.project_name,

      City: site.city,

      Mobile: site.mobile,

      Status: site.status ? "Active" : "Inactive",
    }));

  return (
    <DashboardLayout title="Site Master">
      <div className="page-header">
        <div>
          <h2>Site Management</h2>

          <p>Manage Security Sites</p>
        </div>

        {hasPermission(user, "site_add") && (
          <button className="btn-primary" onClick={() => setShowForm(true)}>
            <FaPlus />
            &nbsp; Add Site
          </button>
        )}
      </div>

      <div className="toolbar">
        <div className="search-box">
          <FaSearch />

          <input
            placeholder="Search Site..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="toolbar-buttons">
          <select
            className="form-control"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
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
              <button onClick={() => exportExcel(exportData, "Sites")}>
                Excel
              </button>

              <button onClick={() => exportCSV(exportData, "Sites")}>
                CSV
              </button>

              <button onClick={() => exportPDF(exportData, "Sites")}>
                PDF
              </button>

              <button onClick={() => printTable(exportData)}>Print</button>
            </div>
          </div>
        </div>
      </div>

      <div className="gx-company-summary">
        <div className="gx-summary-card total">
          <div>
            <h2>{stats.total}</h2>

            <span>Total Sites</span>
          </div>

          <FaBuilding className="gx-summary-icon" />
        </div>

        <div className="gx-summary-card active">
          <div>
            <h2>{stats.active}</h2>

            <span>Active Sites</span>
          </div>

          <FaCheckCircle className="gx-summary-icon" />
        </div>

        <div className="gx-summary-card inactive">
          <div>
            <h2>{stats.inactive}</h2>

            <span>Inactive Sites</span>
          </div>

          <FaTimesCircle className="gx-summary-icon" />
        </div>
      </div>
      <SiteTable
        loading={loading}
        sites={sites}
        search={search}
        statusFilter={statusFilter}
        onView={async (site) => {
          try {
            const response = await getSite(site.id);

            setSelectedSite(response.data.data);

            setViewOpen(true);
          } catch (err) {
            console.log(err);
          }
        }}
        onEdit={async (site) => {
          try {
            const response = await getSite(site.id);

            setSelectedSite(response.data.data);

            setEditForm(true);
          } catch (err) {
            console.log(err);
          }
        }}
        onStatus={(site) => {
          setSelectedSite(site);

          setStatusOpen(true);
        }}
        onDelete={(site)=>{

            setSelectedSite(site);

            setDeleteOpen(true);

        }}
      />


      {showForm && (
        <SiteForm
          mode="add"
          refresh={refreshPage}
          close={() => {
            setShowForm(false);
          }}
        />
      )}

      {editForm && (
        <SiteForm
          mode="edit"
          site={selectedSite}
          refresh={refreshPage}
          close={() => {
            setEditForm(false);

            setSelectedSite(null);
          }}
        />
      )}

      {viewOpen && (
        <SiteView
          site={selectedSite}
          close={() => {
            setViewOpen(false);

            setSelectedSite(null);
          }}
        />
      )}

      {statusOpen && (
        <SiteStatusDialog
          open={statusOpen}
          site={selectedSite}
          close={() => {
            setStatusOpen(false);

            setSelectedSite(null);
          }}
          confirm={async () => {
            try {
              await changeSiteStatus(
                selectedSite.id,

                !selectedSite.status,
              );

              refreshPage();
            } catch (err) {
              console.log(err);
            } finally {
              setStatusOpen(false);

              setSelectedSite(null);
            }
          }}
        />
      )}

      {
    deleteOpen &&

    <SiteDeleteDialog

        open={deleteOpen}

        site={selectedSite}

        close={() => {

            setDeleteOpen(false);

            setSelectedSite(null);

        }}

        confirm={handleDelete}

    />
}

      {/* {

                viewOpen &&

                <SiteView

                    site={selectedSite}

                    close={()=>{

                        setViewOpen(false);

                        setSelectedSite(null);

                    }}

                />

            }

            {

                statusOpen &&

                <SiteStatusDialog

                    open={statusOpen}

                    site={selectedSite}

                    close={()=>{

                        setStatusOpen(false);

                        setSelectedSite(null);

                    }}

                    confirm={async()=>{

                        try{

                            await changeSiteStatus(

                                selectedSite.id,

                                !selectedSite.status

                            );

                            refreshPage();

                        }

                        catch(err){

                            console.log(err);

                        }

                        finally{

                            setStatusOpen(false);

                            setSelectedSite(null);

                        }

                    }}

                />

            } */}
    </DashboardLayout>
  );
}

export default Site;
