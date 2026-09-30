import {
  FaTachometerAlt,
  FaBuilding,
  FaUsers,
  FaMapMarkerAlt,
  FaProjectDiagram,
  FaClipboardCheck,
  FaRoute,
  FaExclamationTriangle,
  FaChartBar,
  FaCog,
  FaSitemap,
  FaUserTie,
  FaClock,
  FaUserShield,
  FaUserCheck,
  FaClipboardList,
  FaQuestionCircle,
} from "react-icons/fa";
import { FaChartLine, FaMapMarkedAlt } from "react-icons/fa";
import { FaWalking } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
const MENU = [
  {
    group: "Dashboard",

    items: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: FaTachometerAlt,
        permission: "dashboard_view",
      },
    ],
  },

  {
    group: "Master Data",

    items: [
      {
        title: "Company",
        path: "/company",
        icon: FaBuilding,
        permission: "company_view",
      },

      {
        title: "Client",
        path: "/client",
        icon: FaBuilding,
        permission: "client_view",
      },

      {
        title: "Project",
        path: "/project",
        icon: FaProjectDiagram,
        permission: "project_view",
      },

      {
        title: "Site",
        path: "/site",
        icon: FaMapMarkerAlt,
        permission: "site_view",
      },
      {
        title: "Department",
        path: "/department",
        icon: FaSitemap,
        permission: "department_view",
      },

      {
        title: "Designation",
        path: "/designation",
        icon: FaUserTie,
        permission: "designation_view",
      },

      {
        title: "Shift",
        path: "/shift",
        icon: FaClock,
        permission: "shift_view",
      },

      {
        title: "Employee",
        path: "/employee",
        icon: FaUsers,
        permission: "employee_view",
      },

      {
        title: "Deployment Request",
        path: "/deployment-request",
        icon: FaClipboardList,
        permission: "deployment_request_view",
      },

      {
        title: "Deployment",
        path: "/deployment",
        icon: FaUserShield,
        permission: "deployment_view",
      },

      {
        title: "Mark Attendance",
        path: "/mark-attendance",
        icon: FaUserCheck,
        permission: "attendance_view",
      },

      {
        title: "Patrol",
        path: "/patrol",
        icon: FaRoute,
        permission: "patrol_view",
      },
      {
        title: "Patrol Assignment",
        path: "/patrol-assignment",
        icon: FaRoute,
        permission: "patrol_assignment_view",
      },
    ],
  },

  {
    group: "Patrol Management",

    items: [
      {
        title: "Patrol Dashboard",
        path: "/patrol-dashboard",
        icon: FaChartLine,
        permission: "patrol_dashboard_view",
      },

      {
        title: "Patrol Monitor",
        path: "/patrol-monitor",
        icon: FaMapMarkedAlt,
        permission: "patrol_monitor_view",
      },
    ],
  },
  {
    group: "Employee Portal",

    items: [
      {
        title: "My Patrols",
        path: "/employee/my-patrols",
        icon: FaWalking,
        permission: "my_patrol_view",
      },

      {
        title: "My Attendance",
        path: "/employee/attendance",
        icon: FaClipboardCheck,
        permission: "my_attendance_view",
      },

      {
        title: "My Incidents",
        path: "/employee/incidents",
        icon: FaExclamationTriangle,
        permission: "my_incident_view",
      },
      //       {
      //   title: "Visitor Management",
      //   path: "/visitor-management",
      //   icon: FaUsers,
      //   permission: "visitor_view",
      // },
      //         {
      //     title: "Visitor History",
      //     path: "/visitor-management/history",
      //     icon: FaClipboardList,
      //     permission: "visitor_view",
      // },
      // {
      //   title: "Help Desk",
      //   path: "/help-desk",
      //   icon: FaQuestionCircle,
      //   permission: "helpdesk_view",
      // },
      {
  title: "Help & Guides",
  path: "/help-guides",
  icon: FaQuestionCircle,
  permission: "helpdesk_view",
},
    ],
  },
  {
    group: "Visitor Management",

    items: [
      {
        title: "Visitor Management",
        path: "/visitor-management",
        icon: FaUsers,
        permission: "visitor_view",
      },

      {
        title: "Visitor History",
        path: "/visitor-management/history",
        icon: FaClipboardList,
        permission: "visitor_view",
      },
      {
        title: "Visitor Approvals",
        path: "/visitor-management/supervisor",
        icon: FaUserCheck,
        permission: "visitor_approve",
      },
    ],
  },
  {
    group: "Operations",

    items: [
      {
        title: "Attendance",
        path: "/attendance",
        icon: FaClipboardCheck,
        permission: "attendance_view",
      },

      {
        title: "Incidents",
        path: "/incident",
        icon: FaExclamationTriangle,
        permission: "incident_view",
      },
      {
        title: "Visitor Management",
        path: "/visitor-management/admin",
        icon: FaUsers,
        permission: "visitor_management_view",
      },
    ],
  },

  {
    group: "Reports",

    items: [
      {
        title: "Reports",
        path: "/reports",
        icon: FaChartBar,
        permission: "report_view",
      },
    ],
  },

  {
    group: "Administration",

    items: [
      {
        title: "Settings",
        path: "/settings",
        icon: FaCog,
        permission: "settings_view",
      },
      {
        title: "Help Desk",
        path: "/help-desk",
        icon: FaQuestionCircle,
        permission: "helpdesk_view",
      },
    ],
  },
];

export default MENU;
