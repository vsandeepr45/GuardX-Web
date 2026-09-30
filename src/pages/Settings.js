import React, { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import { hasPermission } from "../utils/permissions";
import { useTheme } from "../context/ThemeContext";

import {
  HiOutlineCog6Tooth,
  HiOutlineUser,
  HiOutlineShieldCheck,
  HiOutlineBell,
  HiOutlinePaintBrush,
  HiOutlineMapPin,
  HiOutlineLockClosed,
  HiOutlineBookOpen,
  HiOutlineInformationCircle,
  HiOutlineChevronRight,
  HiOutlineCheckCircle,
  HiOutlineEye,
  HiOutlineDevicePhoneMobile,
  HiOutlineCamera,
} from "react-icons/hi2";

import "../styles/Settings.css";

const SETTINGS_ITEMS = [
  {
    id: "general",
    label: "General",
    icon: HiOutlineCog6Tooth,
  },
  {
    id: "profile",
    label: "My Profile",
    icon: HiOutlineUser,
  },
  {
    id: "security",
    label: "Security",
    icon: HiOutlineShieldCheck,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: HiOutlineBell,
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: HiOutlinePaintBrush,
  },
  {
    id: "attendance",
    label: "Attendance",
    icon: HiOutlineMapPin,
  },
  {
    id: "face-privacy",
    label: "Face & Privacy",
    icon: HiOutlineLockClosed,
  },
  {
    id: "help",
    label: "Help & Guides",
    icon: HiOutlineBookOpen,
  },
  {
    id: "about",
    label: "About GuardX",
    icon: HiOutlineInformationCircle,
  },
];

const DEFAULT_NOTIFICATIONS = {
  attendance: true,
  helpdesk: true,
  incidents: true,
  system: true,
};

const Settings = () => {
  const { user } = useAuth();

  const [activeSection, setActiveSection] = useState("general");

  const [notifications, setNotifications] = useState(
    DEFAULT_NOTIFICATIONS
  );

 const { theme, changeTheme } = useTheme();

  const [density, setDensity] = useState("comfortable");

  useEffect(() => {
    try {
      const savedNotifications = localStorage.getItem(
        "guardx_notification_preferences"
      );



      const savedDensity =
        localStorage.getItem("guardx_density");

      if (savedNotifications) {
        setNotifications({
          ...DEFAULT_NOTIFICATIONS,
          ...JSON.parse(savedNotifications),
        });
      }



      if (savedDensity) {
        setDensity(savedDensity);
      }
    } catch (error) {
      console.warn(
        "Unable to load GuardX settings:",
        error
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "guardx_notification_preferences",
      JSON.stringify(notifications)
    );
  }, [notifications]);



  useEffect(() => {
    localStorage.setItem(
      "guardx_density",
      density
    );
  }, [density]);

  const roleName =
    user?.role_name ||
    user?.role ||
    user?.roleName ||
    "User";

  const employeeName = useMemo(() => {
    const name =
      user?.employee_name ||
      user?.name ||
      [
        user?.first_name,
        user?.last_name,
      ]
        .filter(Boolean)
        .join(" ");

    return name || "GuardX User";
  }, [user]);

  const employeeCode =
    user?.employee_code ||
    user?.employeeCode ||
    "—";

  const email =
    user?.email || "—";

  const mobile =
    user?.mobile ||
    user?.phone ||
    "—";

  const canViewAttendance =
    !user ||
    hasPermission(
      user,
      "attendance_view"
    );

  const canViewFace =
    !user ||
    hasPermission(
      user,
      "face_view"
    );

  const scrollToSection = (id) => {
    setActiveSection(id);

    requestAnimationFrame(() => {
      const element =
        document.getElementById(
          `settings-${id}`
        );

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  };

  const toggleNotification = (key) => {
    setNotifications((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const openHelpGuides = () => {
    window.location.href =
      "/help-guides";
  };

  return (
    <DashboardLayout title="Settings">
      <div
        className={`settings-page settings-density-${density}`}
      >
        {/* HEADER */}

        <div className="settings-header">
          <div className="settings-breadcrumb">
            <span>Administration</span>

            <HiOutlineChevronRight
              size={14}
            />

            <strong>Settings</strong>
          </div>

          <div className="settings-title-row">
            <div className="settings-title-icon">
              <HiOutlineCog6Tooth />
            </div>

            <div>
              <h1>Settings</h1>

              <p>
                Manage your GuardX account,
                preferences and security settings.
              </p>
            </div>
          </div>
        </div>

        <div className="settings-layout">

          {/* SIDEBAR */}

          <aside className="settings-sidebar">

            <div className="settings-sidebar-heading">
              Settings Menu
            </div>

            <nav className="settings-nav">

              {SETTINGS_ITEMS.map((item) => {
                const Icon = item.icon;

                const active =
                  activeSection === item.id;

                return (
                  <button
                    type="button"
                    key={item.id}
                    className={`settings-nav-item ${
                      active
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      scrollToSection(
                        item.id
                      )
                    }
                  >
                    <Icon size={19} />

                    <span>
                      {item.label}
                    </span>

                    <HiOutlineChevronRight
                      className="settings-nav-arrow"
                      size={15}
                    />
                  </button>
                );
              })}

            </nav>

            <div className="settings-sidebar-footer">

              <div className="settings-sidebar-footer-icon">
                <HiOutlineShieldCheck />
              </div>

              <div>
                <strong>
                  GuardX Protected
                </strong>

                <span>
                  Your account is secured.
                </span>
              </div>

            </div>

          </aside>

          {/* CONTENT */}

          <main className="settings-content">

            {/* GENERAL */}

            <section
              id="settings-general"
              className="settings-section"
            >
              <SectionHeader
                icon={
                  <HiOutlineCog6Tooth />
                }
                title="General"
                description="Basic GuardX application information and regional preferences."
              />

              <div className="settings-card-grid">

                <InfoCard
                  title="Application"
                  description="Current GuardX application information."
                >
                  <SettingRow
                    label="Application Name"
                    description="Enterprise security and workforce management platform."
                    value="GuardX Security ERP"
                  />

                  <SettingRow
                    label="Version"
                    description="Current application release."
                    value="1.0.0"
                  />

                  <SettingRow
                    label="Environment"
                    description="Current deployment environment."
                    value="Development"
                    badge
                  />
                </InfoCard>

                <InfoCard
                  title="Regional Preferences"
                  description="Regional settings used by the application."
                >
                  <SettingRow
                    label="Language"
                    description="Interface language."
                    value="English"
                    control
                  />

                  <SettingRow
                    label="Time Zone"
                    description="Time zone used for attendance and timestamps."
                    value="Asia/Kolkata"
                    control
                  />
                </InfoCard>

              </div>
            </section>

            {/* PROFILE */}

            <section
              id="settings-profile"
              className="settings-section"
            >
              <SectionHeader
                icon={
                  <HiOutlineUser />
                }
                title="My Profile"
                description="View your GuardX identity and account information."
              />

              <div className="profile-settings-card">

                <div className="profile-avatar">
                  {employeeName
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div className="profile-main">

                  <span className="profile-label">
                    Employee
                  </span>

                  <h2>
                    {employeeName}
                  </h2>

                  <p>
                    {roleName}
                  </p>

                </div>

                <span className="profile-status">

                  <HiOutlineCheckCircle
                    size={16}
                  />

                  Active Account

                </span>

                <div className="profile-details">

                  <ProfileDetail
                    label="Employee Code"
                    value={employeeCode}
                  />

                  <ProfileDetail
                    label="Email"
                    value={email}
                  />

                  <ProfileDetail
                    label="Mobile"
                    value={mobile}
                  />

                  <ProfileDetail
                    label="Role"
                    value={roleName}
                  />

                </div>

              </div>

              <div className="settings-note">

                <HiOutlineInformationCircle
                  size={19}
                />

                <div>

                  <strong>
                    Profile information
                  </strong>

                  <p>
                    Profile details are managed
                    from your GuardX employee
                    account. Editing can be
                    connected to the existing
                    profile API later.
                  </p>

                </div>

              </div>
            </section>

            {/* SECURITY */}

            <section
              id="settings-security"
              className="settings-section"
            >
              <SectionHeader
                icon={
                  <HiOutlineShieldCheck />
                }
                title="Security"
                description="Protect your GuardX account and review account security."
              />

              <div className="security-card">

                <SecurityRow
                  icon={
                    <HiOutlineLockClosed />
                  }
                  title="Password"
                  description="Change your GuardX account password."
                  action="Change Password"
                />

                <SecurityRow
                  icon={
                    <HiOutlineShieldCheck />
                  }
                  title="Two-Factor Authentication"
                  description="Add an additional verification step to protect your account."
                  action="Coming Soon"
                />

                <SecurityRow
                  icon={
                    <HiOutlineDevicePhoneMobile />
                  }
                  title="Active Sessions"
                  description="Review devices that are currently signed in."
                  action="View Sessions"
                />

                <SecurityRow
                  icon={
                    <HiOutlineEye />
                  }
                  title="Login Security"
                  description="Review recent authentication activity."
                  action="View Activity"
                />

              </div>
            </section>

            {/* NOTIFICATIONS */}

            <section
              id="settings-notifications"
              className="settings-section"
            >
              <SectionHeader
                icon={
                  <HiOutlineBell />
                }
                title="Notifications"
                description="Choose which GuardX notifications you want to receive."
              />

              <div className="settings-card settings-list-card">

                <NotificationRow
                  title="Attendance Notifications"
                  description="Attendance, punch and verification related updates."
                  enabled={
                    notifications.attendance
                  }
                  onChange={() =>
                    toggleNotification(
                      "attendance"
                    )
                  }
                />

                <NotificationRow
                  title="Help Desk Updates"
                  description="Ticket assignment, comments and status updates."
                  enabled={
                    notifications.helpdesk
                  }
                  onChange={() =>
                    toggleNotification(
                      "helpdesk"
                    )
                  }
                />

                <NotificationRow
                  title="Incident Notifications"
                  description="Important incident and operational alerts."
                  enabled={
                    notifications.incidents
                  }
                  onChange={() =>
                    toggleNotification(
                      "incidents"
                    )
                  }
                />

                <NotificationRow
                  title="System Notifications"
                  description="Important GuardX system announcements and notices."
                  enabled={
                    notifications.system
                  }
                  onChange={() =>
                    toggleNotification(
                      "system"
                    )
                  }
                />

              </div>

              <div className="settings-note">

                <HiOutlineInformationCircle
                  size={19}
                />

                <div>

                  <strong>
                    Preference saved locally
                  </strong>

                  <p>
                    These controls currently
                    save on this browser. They
                    can be connected to the
                    GuardX notification API later.
                  </p>

                </div>

              </div>
            </section>

            {/* APPEARANCE */}

            <section
              id="settings-appearance"
              className="settings-section"
            >
              <SectionHeader
                icon={
                  <HiOutlinePaintBrush />
                }
                title="Appearance"
                description="Customize the visual preference for your GuardX workspace."
              />

              <div className="settings-card appearance-card">

                <div className="appearance-label">

                  <strong>
                    Theme
                  </strong>

                  <span>
                    Choose how GuardX
                    should appear.
                  </span>

                </div>

                <div className="theme-options">

                  {[
    [
        "light",
        "Light",
        "Use the standard GuardX theme.",
    ],
    [
        "dark",
        "Dark",
        "Use a darker workspace.",
    ],
].map(
                    ([
                      id,
                      title,
                      description,
                    ]) => (
                      <button
                        type="button"
                        key={id}
className={`theme-option ${
  theme === id
    ? "selected"
    : ""
}`}
                        onClick={() =>
changeTheme(id)
                        }
                      >

                        <span
                          className={`theme-preview ${id}`}
                        >
                          <span />
                          <span />
                          <span />
                        </span>

                        <span className="theme-option-copy">

                          <strong>
                            {title}
                          </strong>

                          <small>
                            {description}
                          </small>

                        </span>

                        <span className="theme-radio">
{theme === id
  ? "✓"
  : ""}
                        </span>

                      </button>
                    )
                  )}

                </div>

                <div className="appearance-divider" />

                <div className="density-row">

                  <div>

                    <strong>
                      Interface Density
                    </strong>

                    <span>
                      Control spacing inside
                      the settings page.
                    </span>

                  </div>

                  <div className="density-buttons">

                    <button
                      type="button"
                      className={
                        density ===
                        "comfortable"
                          ? "selected"
                          : ""
                      }
                      onClick={() =>
                        setDensity(
                          "comfortable"
                        )
                      }
                    >
                      Comfortable
                    </button>

                    <button
                      type="button"
                      className={
                        density ===
                        "compact"
                          ? "selected"
                          : ""
                      }
                      onClick={() =>
                        setDensity(
                          "compact"
                        )
                      }
                    >
                      Compact
                    </button>

                  </div>

                </div>

              </div>
            </section>

            {/* ATTENDANCE */}

            {canViewAttendance && (
              <section
                id="settings-attendance"
                className="settings-section"
              >

                <SectionHeader
                  icon={
                    <HiOutlineMapPin />
                  }
                  title="Attendance"
                  description="Review the attendance policies applied to your account."
                />

                <div className="policy-banner">

                  <div className="policy-banner-icon">
                    <HiOutlineShieldCheck />
                  </div>

                  <div>

                    <strong>
                      Attendance policy is organization managed
                    </strong>

                    <p>
                      These controls are shown
                      for information. Policy
                      changes should be managed
                      by authorized administrators.
                    </p>

                  </div>

                </div>

                <div className="policy-grid">

                  <PolicyCard
                    icon={
                      <HiOutlineCamera />
                    }
                    title="Selfie Verification"
                    description="A selfie is required when marking attendance."
                    enabled
                  />

                  <PolicyCard
                    icon={
                      <HiOutlineMapPin />
                    }
                    title="GPS Verification"
                    description="Live location is required for attendance."
                    enabled
                  />

                  <PolicyCard
                    icon={
                      <HiOutlineShieldCheck />
                    }
                    title="Face Verification"
                    description="The captured face must match the enrolled profile."
                    enabled
                  />

                  <PolicyCard
                    icon={
                      <HiOutlineDevicePhoneMobile />
                    }
                    title="Location Accuracy"
                    description="Attendance uses the live GPS accuracy reported by the device."
                    value="Policy controlled"
                  />

                </div>

              </section>
            )}

            {/* FACE & PRIVACY */}

            {canViewFace && (
              <section
                id="settings-face-privacy"
                className="settings-section"
              >

                <SectionHeader
                  icon={
                    <HiOutlineLockClosed />
                  }
                  title="Face & Privacy"
                  description="Understand how face verification is used for attendance."
                />

                <div className="privacy-card">

                  <div className="privacy-status">

                    <div className="privacy-status-icon">
                      <HiOutlineShieldCheck />
                    </div>

                    <div>

                      <span>
                        Face Verification
                      </span>

                      <strong>
                        Protected Attendance Feature
                      </strong>

                    </div>

                  </div>

                  <div className="privacy-grid">

                    <PrivacyItem
                      title="Purpose"
                      text="Used to verify that the employee marking attendance matches the enrolled face profile."
                    />

                    <PrivacyItem
                      title="Data Exposure"
                      text="Face similarity scores and biometric templates are not displayed in the employee interface."
                    />

                    <PrivacyItem
                      title="Liveness"
                      text="Anti-spoofing/liveness verification is not yet enabled in the current implementation."
                    />

                    <PrivacyItem
                      title="Access"
                      text="Face enrollment and administrative controls should remain restricted to authorized users."
                    />

                  </div>

                </div>

              </section>
            )}

            {/* HELP */}

            <section
              id="settings-help"
              className="settings-section"
            >

              <SectionHeader
                icon={
                  <HiOutlineBookOpen />
                }
                title="Help & Guides"
                description="Find instructions and troubleshooting information for GuardX."
              />

              <div className="help-settings-card">

                <div className="help-settings-icon">
                  <HiOutlineBookOpen />
                </div>

                <div className="help-settings-copy">

                  <h3>
                    Need help using GuardX?
                  </h3>

                  <p>
                    Browse attendance, GPS,
                    selfie verification, patrol,
                    incidents, deployments and
                    Help Desk guides.
                  </p>

                </div>

                <button
                  type="button"
                  className="settings-primary-button"
                  onClick={
                    openHelpGuides
                  }
                >
                  Open Help & Guides

                  <HiOutlineChevronRight
                    size={18}
                  />
                </button>

              </div>

            </section>

            {/* ABOUT */}

            <section
              id="settings-about"
              className="settings-section"
            >

              <SectionHeader
                icon={
                  <HiOutlineInformationCircle />
                }
                title="About GuardX"
                description="Application information and legal resources."
              />

              <div className="about-card">

                <div className="about-brand">

                  <div className="about-logo">
                    <HiOutlineShieldCheck />
                  </div>

                  <div>

                    <h2>
                      GuardX Security ERP
                    </h2>

                    <p>
                      Enterprise Security &
                      Workforce Management
                    </p>

                  </div>

                </div>

                <div className="about-version">

                  <span>
                    Version
                  </span>

                  <strong>
                    1.0.0
                  </strong>

                </div>

                <div className="about-links">

                  <button
                    type="button"
                    disabled
                  >
                    Privacy Policy

                    <HiOutlineChevronRight
                      size={16}
                    />
                  </button>

                  <button
                    type="button"
                    disabled
                  >
                    Terms & Conditions

                    <HiOutlineChevronRight
                      size={16}
                    />
                  </button>

                  <button
                    type="button"
                    disabled
                  >
                    System Information

                    <HiOutlineChevronRight
                      size={16}
                    />
                  </button>

                </div>

                <div className="about-footer">

                  <span>
                    © 2026 GuardX Security ERP
                  </span>

                  <span>
                    Built for secure workforce operations.
                  </span>

                </div>

              </div>

            </section>

            <div className="settings-page-footer">

              <HiOutlineShieldCheck
                size={18}
              />

              <span>
                GuardX Security ERP • Secure workforce operations
              </span>

            </div>

          </main>
        </div>
      </div>
    </DashboardLayout>
  );
};

/* =========================================================
   Reusable Components
   ========================================================= */

function SectionHeader({
  icon,
  title,
  description,
}) {
  return (
    <div className="settings-section-header">

      <div className="settings-section-icon">
        {icon}
      </div>

      <div>

        <h2>
          {title}
        </h2>

        <p>
          {description}
        </p>

      </div>

    </div>
  );
}

function InfoCard({
  title,
  description,
  children,
}) {
  return (
    <div className="settings-card info-card">

      <div className="settings-card-header">

        <h3>
          {title}
        </h3>

        <p>
          {description}
        </p>

      </div>

      {children}

    </div>
  );
}

function SettingRow({
  label,
  description,
  value,
  badge,
  control,
}) {
  return (
    <div className="setting-row">

      <div>

        <strong>
          {label}
        </strong>

        <span>
          {description}
        </span>

      </div>

      {control ? (
        <div className="setting-static-select">

          {value}

          <HiOutlineChevronRight
            size={15}
          />

        </div>
      ) : badge ? (
        <span className="setting-badge">
          {value}
        </span>
      ) : (
        <span className="setting-value">
          {value}
        </span>
      )}

    </div>
  );
}

function ProfileDetail({
  label,
  value,
}) {
  return (
    <div className="profile-detail">

      <span>
        {label}
      </span>

      <strong>
        {value}
      </strong>

    </div>
  );
}

function SecurityRow({
  icon,
  title,
  description,
  action,
}) {
  return (
    <div className="security-row">

      <div className="security-row-icon">
        {icon}
      </div>

      <div className="security-row-copy">

        <strong>
          {title}
        </strong>

        <span>
          {description}
        </span>

      </div>

      <button
        type="button"
        className="settings-outline-button"
        disabled
      >
        {action}

        <HiOutlineChevronRight
          size={15}
        />
      </button>

    </div>
  );
}

function NotificationRow({
  title,
  description,
  enabled,
  onChange,
}) {
  return (
    <div className="notification-row">

      <div>

        <strong>
          {title}
        </strong>

        <span>
          {description}
        </span>

      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        className={`settings-switch ${
          enabled ? "on" : ""
        }`}
        onClick={onChange}
      >
        <span />
      </button>

    </div>
  );
}

function PolicyCard({
  icon,
  title,
  description,
  enabled,
  value,
}) {
  return (
    <div className="policy-card">

      <div className="policy-card-icon">
        {icon}
      </div>

      <div className="policy-card-copy">

        <strong>
          {title}
        </strong>

        <span>
          {description}
        </span>

      </div>

      {enabled ? (
        <span className="policy-enabled">

          <HiOutlineCheckCircle
            size={15}
          />

          Enabled

        </span>
      ) : (
        <span className="policy-controlled">
          {value}
        </span>
      )}

    </div>
  );
}

function PrivacyItem({
  title,
  text,
}) {
  return (
    <div className="privacy-item">

      <span className="privacy-check">

        <HiOutlineCheckCircle
          size={16}
        />

      </span>

      <div>

        <strong>
          {title}
        </strong>

        <p>
          {text}
        </p>

      </div>

    </div>
  );
}

export default Settings;