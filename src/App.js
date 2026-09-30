import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Company from "./pages/Company";
import Client from "./pages/Client";
import Project from "./pages/project";
import Site from "./pages/Site";
import Department from "./pages/Department";
import Designation from "./pages/Designation";
import Shift from "./pages/Shift";
import Employee from "./pages/Employee";
import ChangePassword from "./pages/ChangePassword";
import ProtectedRoute from "./routes/ProtectedRoute";
import Profile from "./pages/Settings/Profile";
import Patrol from "./pages/Patrol";
import PatrolAssignment from "./pages/PatrolAssignment";
import MyPatrols from "./pages/Employee/MyPatrols";
import ActivePatrol from "./pages/Employee/ActivePatrol/ActivePatrol";
import CheckpointDetails from "./pages/Employee/ActivePatrol/CheckpointDetails";
import CheckpointSuccess from "./pages/Employee/ActivePatrol/CheckpointSuccess";
import PatrolCompleted from "./pages/Employee/ActivePatrol/PatrolCompleted";
import PatrolDashboard from "./pages/PatrolDashboard/PatrolDashboard";
// import PatrolSummary from "./pages/Employee/PatrolSummary";
import EmployeeMyAttendance from "./pages/EmployeeMyAttendance";
// import MyIncidents from "./pages/Employee/MyIncidents";
import { ThemeProvider } from "./context/ThemeContext";
import Deployment from "./pages/Deployment";
import MarkAttendance from "./pages/MarkAttendance";
import PatrolMonitor from "./pages/PatrolMonitor";
import DeploymentRequest from "./pages/DeploymentRequest";
import VisitorDashboard from "./pages/VisitorManagement/VisitorDashboard";
import HelpDesk from "./pages/HelpDesk";
import VisitorHistory from "./pages/VisitorManagement/VisitorHistory";
import VisitorSupervisorDashboard from "./pages/VisitorManagement/VisitorSupervisorDashboard";
import VisitorManagementDashboard from "./pages/VisitorManagement/VisitorManagementDashboard";
import HelpGuides from "./pages/HelpGuides";
import Settings from "./pages/Settings";
function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ================================
                Company Master
            ================================= */}

        <Route
          path="/company"
          element={
            <ProtectedRoute>
              <Company />
            </ProtectedRoute>
          }
        />

        <Route path="/patrol" element={<Patrol />} />

        <Route
          path="/client"
          element={
            <ProtectedRoute>
              <Client />
            </ProtectedRoute>
          }
        />

        <Route
          path="/project"
          element={
            <ProtectedRoute>
              <Project />
            </ProtectedRoute>
          }
        />

        <Route
          path="/site"
          element={
            <ProtectedRoute>
              <Site />
            </ProtectedRoute>
          }
        />

        <Route
          path="/department"
          element={
            <ProtectedRoute>
              <Department />
            </ProtectedRoute>
          }
        />

        <Route
          path="/designation"
          element={
            <ProtectedRoute>
              <Designation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/shift"
          element={
            <ProtectedRoute>
              <Shift />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee"
          element={
            <ProtectedRoute>
              <Employee />
            </ProtectedRoute>
          }
        />

        <Route
          path="/deployment"
          element={
            <ProtectedRoute>
              <Deployment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mark-attendance"
          element={
            <ProtectedRoute>
              <MarkAttendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patrol-assignment"
          element={
            <ProtectedRoute>
              <PatrolAssignment />
            </ProtectedRoute>
          }
        />
        {/* <Route
    path="/settings/security"
    element={
        <ProtectedRoute>
            <Security />
        </ProtectedRoute>
    }
/>

<Route
    path="/settings/login-history"
    element={
        <ProtectedRoute>
            <LoginHistory />
        </ProtectedRoute>
    }
/> */}
        {/* ==========================================
    Employee Portal
========================================== */}

        <Route
          path="/employee/my-patrols"
          element={
            <ProtectedRoute>
              <MyPatrols />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/patrol/:sessionId"
          element={
            <ProtectedRoute>
              <ActivePatrol />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/attendance"
          element={
            <ProtectedRoute>
              <EmployeeMyAttendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/checkpoint/:checkpointId"
          element={
            <ProtectedRoute>
              <CheckpointDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/patrol/:sessionId/checkpoint/:checkpointId"
          element={<CheckpointDetails />}
        />
        <Route
          path="/employee/checkpoint-success"
          element={
            <ProtectedRoute>
              <CheckpointSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/patrol-completed/:sessionId"
          element={
            <ProtectedRoute>
              <PatrolCompleted />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patrol-dashboard"
          element={
            <ProtectedRoute>
              <PatrolDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patrol-monitor"
          element={
            <ProtectedRoute>
              <PatrolMonitor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/deployment-request"
          element={
            <ProtectedRoute>
              <DeploymentRequest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/visitor-management"
          element={
            <ProtectedRoute>
              <VisitorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/help-desk"
          element={
            <ProtectedRoute>
              <HelpDesk />
            </ProtectedRoute>
          }
        />

<Route
  path="/visitor-management/history"
  element={
    <ProtectedRoute>
      <VisitorHistory />
    </ProtectedRoute>
  }
/>

<Route
    path="/visitor-management/supervisor"
    element={
        <ProtectedRoute>
            <VisitorSupervisorDashboard />
        </ProtectedRoute>
    }
/>
<Route
    path="/visitor-management/admin"
    element={
        <ProtectedRoute>
            <VisitorManagementDashboard />
        </ProtectedRoute>
    }
/>
<Route
  path="/help-guides"
  element={
    <ProtectedRoute>
      <HelpGuides />
    </ProtectedRoute>
  }
/>

<Route
  path="/settings"
  element={
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  }
/>
        {/* <Route
    path="/employee/patrol-summary/:sessionId"
    element={
        <ProtectedRoute>
            <PatrolSummary />
        </ProtectedRoute>
    }
/>

<Route
    path="/employee/attendance"
    element={
        <ProtectedRoute>
            <MyAttendance />
        </ProtectedRoute>
    }
/>

<Route
    path="/employee/incidents"
    element={
        <ProtectedRoute>
            <MyIncidents />
        </ProtectedRoute>
    }
/> */}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
