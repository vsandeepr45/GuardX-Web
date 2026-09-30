// import React, { useEffect, useState } from "react";

// import DashboardLayout from "../layouts/DashboardLayout";

// import "../styles/company.css";
// import "../components/Dashboard/dashboard.css";

// import { useAuth } from "../context/AuthContext";

// import { getDashboard } from "../api/dashboard";

// import WelcomeHero from "../components/Dashboard/WelcomeHero";
// import SummaryCards from "../components/Dashboard/SummaryCards";

// import QuickActions from "../components/Dashboard/QuickActions";
// import RecentActivities from "../components/Dashboard/RecentActivities";

// function Dashboard() {
//   const { user } = useAuth();

//   const [dashboard, setDashboard] = useState(null);

//   const [loading, setLoading] = useState(true);

//   const loadDashboard = async () => {
//     try {
//       const response = await getDashboard();

//       setDashboard(response.data.data);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadDashboard();
//   }, []);

//   if (loading || !dashboard) {
//     return (
//       <DashboardLayout title="Dashboard">Loading Dashboard...</DashboardLayout>
//     );
//   }

//   return (
//     <DashboardLayout title="Dashboard">
//       <WelcomeHero user={user} />

//       <SummaryCards data={dashboard || {}} />

//       <QuickActions />

//       <RecentActivities
//         data={
//           dashboard?.recent || {
//             companies: [],

//             clients: [],

//             projects: [],
//           }
//         }
//       />
//     </DashboardLayout>
//   );
// }

// export default Dashboard;



import React, { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import "../styles/company.css";
import "../components/Dashboard/dashboard.css";

import { useAuth } from "../context/AuthContext";

import { getDashboard } from "../api/dashboard";

import WelcomeHero from "../components/Dashboard/WelcomeHero";
import SummaryCards from "../components/Dashboard/SummaryCards";

import QuickActions from "../components/Dashboard/QuickActions";
import RecentActivities from "../components/Dashboard/RecentActivities";

import HRDashboardView from "../components/Dashboard/HRDashboardView";
import SupervisorDashboardView from "../components/Dashboard/SupervisorDashboardView";
import EmployeeDashboardView from "../components/Dashboard/EmployeeDashboardView";
import ClientDashboardView from "../components/Dashboard/ClientDashboardView";

function Dashboard() {
  const { user } = useAuth();

  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      const response = await getDashboard();

      setDashboard(response.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading || !dashboard) {
    return (
      <DashboardLayout title="Dashboard">Loading Dashboard...</DashboardLayout>
    );
  }

  // Which body to render is decided purely by dashboard_code, coming
  // from the logged-in user's role -> dashboard_types mapping on the
  // backend. Nothing here is keyed off role name or role id.

  const renderBody = () => {
    switch (user?.dashboard_code) {
      case "HR":
        return <HRDashboardView data={dashboard} />;

      case "SUPERVISOR":
        return <SupervisorDashboardView data={dashboard} />;

      case "EMPLOYEE":
        return <EmployeeDashboardView data={dashboard} />;

      case "CLIENT":
        return <ClientDashboardView data={dashboard} />;

      case "ADMIN":
      default:
        return (
          <>
            <SummaryCards data={dashboard || {}} />

            <QuickActions />

            <RecentActivities
              data={
                dashboard?.recent || {
                  companies: [],

                  clients: [],

                  projects: [],
                }
              }
            />
          </>
        );
    }
  };

  return (
    <DashboardLayout title="Dashboard">
      <WelcomeHero user={user} />

      {renderBody()}
    </DashboardLayout>
  );
}

export default Dashboard;