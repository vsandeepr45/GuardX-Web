import React, { useState, useEffect } from "react";

import { FaSave, FaTimes, FaClock, FaAlignLeft } from "react-icons/fa";

import { createShift, updateShift } from "../../api/shift";

function ShiftForm({
  edit = false,

  shift,

  close,

  refresh,
}) {
  const [form, setForm] = useState({
    shift_code: "",

    shift_name: "",

    start_time: "",

    end_time: "",

    grace_time: 15,

    working_hours: 8,

    break_time: 30,

    description: "",

    status: true,
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (edit && shift) {
      setForm({
        ...shift,
      });
    }
  }, [edit, shift]);

  return (
    <div className="gx-modal">
      <div className="gx-company-form">
        <div className="gx-status-header">
          <h2>
            <FaClock />
            &nbsp;
            {edit ? "Edit Shift" : "Add Shift"}
          </h2>
        </div>

        <div className="gx-status-body">
          <div className="gx-form-section">
            <h3>Shift Details</h3>

            <div className="gx-grid-2">
              <div>
                <label>Shift Code</label>

                <input
                  value={form.shift_code}
                  onChange={(e) => {
                    setForm({
                      ...form,

                      shift_code: e.target.value,
                    });
                  }}
                />
              </div>

              <div>
                <label>Shift Name</label>

                <input
                  value={form.shift_name}
                  onChange={(e) => {
                    setForm({
                      ...form,

                      shift_name: e.target.value,
                    });
                  }}
                />
              </div>

              <div>
                <label>Start Time</label>

                <input
                  type="time"
                  value={form.start_time}
                  onChange={(e) => {
                    setForm({
                      ...form,

                      start_time: e.target.value,
                    });
                  }}
                />
              </div>

              <div>
                <label>End Time</label>

                <input
                  type="time"
                  value={form.end_time}
                  onChange={(e) => {
                    setForm({
                      ...form,

                      end_time: e.target.value,
                    });
                  }}
                />
              </div>

              <div>
                <label>Grace Time (Minutes)</label>

                <input
                  type="number"
                  value={form.grace_time}
                  onChange={(e) => {
                    setForm({
                      ...form,

                      grace_time: e.target.value,
                    });
                  }}
                />
              </div>

              <div>
                <label>Working Hours</label>

                <input
                  type="number"
                  step="0.5"
                  value={form.working_hours}
                  onChange={(e) => {
                    setForm({
                      ...form,

                      working_hours: e.target.value,
                    });
                  }}
                />
              </div>

              <div>
                <label>Break Time (Minutes)</label>

                <input
                  type="number"
                  value={form.break_time}
                  onChange={(e) => {
                    setForm({
                      ...form,

                      break_time: e.target.value,
                    });
                  }}
                />
              </div>

              <div>
                <label>Status</label>

                <select
                  value={String(form.status)}
                  onChange={(e) => {
                    setForm({
                      ...form,

                      status: e.target.value === "true",
                    });
                  }}
                >
                  <option value="true">Active</option>

                  <option value="false">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <div className="gx-form-section">
            <label>
              <FaAlignLeft />
              &nbsp; Description
            </label>

            <textarea
              rows="4"
              value={form.description}
              onChange={(e) => {
                setForm({
                  ...form,

                  description: e.target.value,
                });
              }}
            />
          </div>
        </div>

        <div className="gx-status-footer">
          <button className="btn-light" onClick={close}>
            <FaTimes />
            &nbsp; Cancel
          </button>

          <button
            className="btn-primary"
            disabled={saving}
            onClick={async () => {
              try {
                if (
                  !form.shift_code ||
                  !form.shift_name ||
                  !form.start_time ||
                  !form.end_time
                ) {
                  alert("Please fill all mandatory fields.");

                  return;
                }

                setSaving(true);

                if (edit) {
                  await updateShift(
                    shift.id,

                    form,
                  );
                } else {
                  await createShift(form);
                }

                refresh();
              } catch (err) {
                console.log(err);

                alert(err?.response?.data?.message || "Unable to save shift.");
              } finally {
                setSaving(false);
              }
            }}
          >
            <FaSave />
            &nbsp;
            {saving ? "Saving..." : edit ? "Update Shift" : "Save Shift"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShiftForm;
