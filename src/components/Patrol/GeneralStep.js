import React, { useEffect, useState } from "react";

import {
  FaRoute,
  FaBuilding,
  FaClock,
  FaSyncAlt,
  FaFileAlt,
} from "react-icons/fa";

import { getSiteDropdown } from "../../api/site";

export default function GeneralStep({
  form,

  setForm,

  onChange,
}) {
  const [sites, setSites] = useState([]);

  useEffect(() => {
    loadSites();
  }, []);

  async function loadSites() {
    try {
      const res = await getSiteDropdown();

      setSites(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  }

  function updateField(
    field,

    value,
  ) {
    if (onChange) {
      onChange(
        field,

        value,
      );
    } else {
      setForm({
        ...form,

        [field]: value,
      });
    }
  }
  return (
    <div className="gx-form-step">
      <div className="gx-form-grid">
        <div className="gx-form-group">
          <label>
            <FaRoute />
            Route Code
          </label>

          <input
            type="text"
            value={form.route_code}
            placeholder="RT-001"
            onChange={(e) =>
              updateField(
                "route_code",

                e.target.value,
              )
            }
          />
        </div>

        <div className="gx-form-group">
          <label>
            <FaRoute />
            Route Name
          </label>

          <input
            type="text"
            value={form.route_name}
            placeholder="Night Patrol"
            onChange={(e) =>
              updateField(
                "route_name",

                e.target.value,
              )
            }
          />
        </div>

        <div className="gx-form-group">
          <label>
            <FaBuilding />
            Site
          </label>

          <select
            value={form.site_id}
            onChange={(e) =>
              updateField(
                "site_id",

                e.target.value,
              )
            }
          >
            <option value="">Select Site</option>

            {sites.map((site) => (
              <option key={site.id} value={site.id}>
                {site.site_name}
              </option>
            ))}
          </select>
        </div>

        <div className="gx-form-group">
          <label>
            <FaRoute />
            Route Type
          </label>

          <select
            value={form.route_type}
            onChange={(e) =>
              updateField(
                "route_type",

                e.target.value,
              )
            }
          >
            <option value="">Select Type</option>

            <option value="Internal">Internal</option>

            <option value="External">External</option>

            <option value="Emergency">Emergency</option>
          </select>
        </div>

        {/* ==========================================
                    Estimated Duration
                ========================================== */}

        <div className="gx-form-group">
          <label>
            <FaClock />
            Estimated Duration (Minutes)
          </label>

          <input
            type="number"
            min="1"
            value={form.estimated_duration}
            onChange={(e) =>
              updateField(
                "estimated_duration",

                e.target.value,
              )
            }
          />
        </div>

        {/* ==========================================
                    Frequency
                ========================================== */}

        <div className="gx-form-group">
          <label>
            <FaSyncAlt />
            Patrol Frequency (Minutes)
          </label>

          <input
            type="number"
            min="1"
            value={form.frequency_minutes}
            onChange={(e) =>
              updateField(
                "frequency_minutes",

                e.target.value,
              )
            }
          />
        </div>

        {/* ==========================================
                    Description
                ========================================== */}

        <div className="gx-form-group gx-full-width">
          <label>
            <FaFileAlt />
            Description
          </label>

          <textarea
            rows={5}
            placeholder="Enter patrol route description..."
            value={form.description}
            onChange={(e) =>
              updateField(
                "description",

                e.target.value,
              )
            }
          />
        </div>
      </div>
    </div>
  );
}
