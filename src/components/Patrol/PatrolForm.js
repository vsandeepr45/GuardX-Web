import React, { useState, useEffect } from "react";

import {
  FaRoute,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";

import { createRoute, updateRoute } from "../../api/patrol";

import GeneralStep from "./GeneralStep";
import CheckpointStep from "./CheckpointStep";
import ScheduleStep from "./ScheduleStep";
import ReviewStep from "./ReviewStep";

import "../../styles/PatrolForm.css";

export default function PatrolForm({
  open,

  editMode,

  data,

  onClose,

  onSaved,
}) {
  const [step, setStep] = useState(1);

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    route_code: "",

    route_name: "",

    site_id: "",

    route_type: "",

    estimated_duration: 30,

    frequency_minutes: 60,

    description: "",

    checkpoints: [],

    schedules: [],
  });
  useEffect(() => {
    if (editMode && data) {
      setForm({
        ...data,

        checkpoints: data.checkpoints || [],

        schedules: data.schedules || [],
      });
    }
  }, [editMode, data]);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,

      [field]: value,
    }));
  };

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const saveRoute = async () => {
    try {
      setSaving(true);

      if (editMode) {
        await updateRoute(
          data.id,

          form,
        );
      } else {
        await createRoute(form);
      }

      onSaved();
    } catch (err) {
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    open && (
      <div className="gx-dialog">
        <div className="gx-dialog-box patrol-form">
          <div className="gx-dialog-header">
            <h2>{editMode ? "Edit Patrol Route" : "Create Patrol Route"}</h2>
          </div>

          <div className="gx-stepper">
            <div
              className={step >= 1 ? "active" : "inactive"}
              onClick={() => setStep(1)}
            >
              <FaRoute />

              <span>General</span>
            </div>

            <div
              className={step >= 2 ? "active" : "inactive"}
              onClick={() => setStep(2)}
            >
              <FaMapMarkerAlt />

              <span>Checkpoints</span>
            </div>

            <div
              className={step >= 3 ? "active" : "inactive"}
              onClick={() => setStep(3)}
            >
              <FaCalendarAlt />

              <span>Schedule</span>
            </div>

            <div
              className={step >= 4 ? "active" : "inactive"}
              onClick={() => setStep(4)}
            >
              <FaCheckCircle />

              <span>Review</span>
            </div>
          </div>

          {/* ==========================================
                    STEP CONTENT
                ========================================== */}

          <div className="gx-step-content">
            {step === 1 && (
              <GeneralStep
                form={form}
                setForm={setForm}
                onChange={handleChange}
              />
            )}

            {step === 2 && <CheckpointStep form={form} setForm={setForm} />}

            {step === 3 && <ScheduleStep form={form} setForm={setForm} />}

            {step === 4 && <ReviewStep form={form} />}
          </div>

          {/* ==========================================
                    FOOTER
                ========================================== */}

          <div className="gx-dialog-footer">
            <button className="gx-btn-light" onClick={onClose}>
              Cancel
            </button>

            {step > 1 && (
              <button className="gx-btn-light" onClick={prevStep}>
                Previous
              </button>
            )}

            {step < 4 ? (
              <button className="gx-btn-primary" onClick={nextStep}>
                Next
              </button>
            ) : (
              <button
                className="gx-btn-primary"
                disabled={saving}
                onClick={saveRoute}
              >
                {saving
                  ? "Saving..."
                  : editMode
                    ? "Update Route"
                    : "Create Route"}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
}
