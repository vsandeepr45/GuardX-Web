import { useEffect, useState } from "react";

import {
  getAdminPatrolDashboard,
  getRunningPatrols,
  getCompletedPatrols,
} from "../../api/patrol";

import SummaryCards from "../../components/PatrolDashboard/SummaryCards";
import ComplianceCard from "../../components/PatrolDashboard/ComplianceCard";
import RunningPatrolTable from "../../components/PatrolDashboard/RunningPatrolTable";
import RecentCompletedTable from "../../components/PatrolDashboard/RecentCompletedTable";
import QuickActions from "../../components/PatrolDashboard/QuickActions";
import DashboardLayout from "../../layouts/DashboardLayout";
import "../../styles/PatrolDashboard.css";

export default function PatrolDashboard() {
  const [summary, setSummary] = useState({});

  const [running, setRunning] = useState([]);

  const [completed, setCompleted] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const [dashboard, runningPatrols, completedPatrols] = await Promise.all([
        getAdminPatrolDashboard(),

        getRunningPatrols(),

        getCompletedPatrols(),
      ]);

      setSummary(dashboard.data.data);

      setRunning(runningPatrols.data.data);

      setCompleted(completedPatrols.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="gx-loading">Loading...</div>;
  }

  return (
    <DashboardLayout title="Patrol Dashboard">
    <div className="gx-page">
      <div className="gx-page-header">
        <div>
          <h2>Patrol Dashboard</h2>

          <p>Today's Patrol Operations</p>
        </div>
      </div>

      <SummaryCards data={summary} />

      <ComplianceCard value={summary.compliance} />

      <RunningPatrolTable data={running} />

      <RecentCompletedTable data={completed} />

      <QuickActions />
    </div>
    </DashboardLayout>
  );
}
