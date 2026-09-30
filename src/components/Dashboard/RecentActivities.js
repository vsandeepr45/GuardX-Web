import React from "react";

function RecentActivities({ data }) {
  data = data || {};

  const companies = data.companies || [];

  const clients = data.clients || [];

  const projects = data.projects || [];

  return (
    <div className="gx-dashboard-recent">
      {/* Companies */}

      <div className="gx-recent-card">
        <h3>Recent Companies</h3>

        <table>
          <tbody>
            {companies.length > 0 ? (
              companies.map((item, index) => (
                <tr key={index}>
                  <td>{item.company_name}</td>

                  <td>{item.city || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="2"
                  style={{
                    textAlign: "center",

                    color: "#888",
                  }}
                >
                  No Companies Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Clients */}

      <div className="gx-recent-card">
        <h3>Recent Clients</h3>

        <table>
          <tbody>
            {clients.length > 0 ? (
              clients.map((item, index) => (
                <tr key={index}>
                  <td>{item.client_name}</td>

                  <td>{item.city || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="2"
                  style={{
                    textAlign: "center",

                    color: "#888",
                  }}
                >
                  No Clients Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Projects */}

      <div className="gx-recent-card">
        <h3>Recent Projects</h3>

        <table>
          <tbody>
            {projects.length > 0 ? (
              projects.map((item, index) => (
                <tr key={index}>
                  <td>{item.project_name}</td>

                  <td>{item.city || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="2"
                  style={{
                    textAlign: "center",

                    color: "#888",
                  }}
                >
                  No Projects Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentActivities;
