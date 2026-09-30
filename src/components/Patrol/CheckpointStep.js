import React from "react";

import {
  FaPlus,
  FaTrash,
  FaArrowUp,
  FaArrowDown,
  FaMapMarkerAlt,
  FaCamera,
  FaQrcode,
  FaWifi,
} from "react-icons/fa";

export default function CheckpointStep({
  form,

  setForm,
}) {
  function addCheckpoint() {
    setForm({
      ...form,

      checkpoints: [
        ...form.checkpoints,

        {
          checkpoint_code: "",

          checkpoint_name: "",

          sequence_no: form.checkpoints.length + 1,

          latitude: "",

          longitude: "",

          allowed_radius: 25,

          qr_code: "",

          nfc_code: "",

          mandatory_photo: false,

          mandatory_remark: false,
        },
      ],
    });
  }
  function updateCheckpoint(
    index,

    field,

    value,
  ) {
    const list = [...form.checkpoints];

    list[index][field] = value;

    setForm({
      ...form,

      checkpoints: list,
    });
  }
  function deleteCheckpoint(index) {
    const list = [...form.checkpoints];

    list.splice(index, 1);

    list.forEach((item, i) => {
      item.sequence_no = i + 1;
    });

    setForm({
      ...form,

      checkpoints: list,
    });
  }
  function moveUp(index) {
    if (index === 0) return;

    const list = [...form.checkpoints];

    [list[index - 1], list[index]] = [list[index], list[index - 1]];

    list.forEach((item, i) => {
      item.sequence_no = i + 1;
    });

    setForm({
      ...form,

      checkpoints: list,
    });
  }

  function moveDown(index) {
    if (index === form.checkpoints.length - 1) return;

    const list = [...form.checkpoints];

    [list[index], list[index + 1]] = [list[index + 1], list[index]];

    list.forEach((item, i) => {
      item.sequence_no = i + 1;
    });

    setForm({
      ...form,

      checkpoints: list,
    });
  }

  return (
    <div className="gx-step">
      <div className="gx-step-header">
        <h3>Patrol Checkpoints</h3>

        <button className="gx-btn-primary" onClick={addCheckpoint}>
          <FaPlus />
          &nbsp; Add Checkpoint
        </button>
      </div>

      {form.checkpoints.length === 0 && (
        <div className="gx-empty">No checkpoints added.</div>
      )}

      {form.checkpoints.map((checkpoint, index) => (
        <div key={index} className="gx-checkpoint-card">
          <div className="gx-card-header">
            <h4>
              <FaMapMarkerAlt />
              &nbsp; Checkpoint #{checkpoint.sequence_no}
            </h4>
          </div>

          <div className="gx-form-grid">
            <div className="gx-form-group">
              <label>Checkpoint Code</label>

              <input
                type="text"
                placeholder="CP-001"
                value={checkpoint.checkpoint_code}
                onChange={(e) =>
                  updateCheckpoint(
                    index,

                    "checkpoint_code",

                    e.target.value,
                  )
                }
              />
            </div>

            <div className="gx-form-group">
              <label>Checkpoint Name</label>

              <input
                type="text"
                placeholder="Main Gate"
                value={checkpoint.checkpoint_name}
                onChange={(e) =>
                  updateCheckpoint(
                    index,

                    "checkpoint_name",

                    e.target.value,
                  )
                }
              />
            </div>

            <div className="gx-form-group">
              <label>Latitude</label>

              <input
                type="number"
                step="0.000001"
                value={checkpoint.latitude}
                onChange={(e) =>
                  updateCheckpoint(
                    index,

                    "latitude",

                    e.target.value,
                  )
                }
              />
            </div>

            <div className="gx-form-group">
              <label>Longitude</label>

              <input
                type="number"
                step="0.000001"
                value={checkpoint.longitude}
                onChange={(e) =>
                  updateCheckpoint(
                    index,

                    "longitude",

                    e.target.value,
                  )
                }
              />
            </div>

            <div className="gx-form-group">
              <label>Allowed Radius (Meters)</label>

              <input
                type="number"
                value={checkpoint.allowed_radius}
                onChange={(e) =>
                  updateCheckpoint(
                    index,

                    "allowed_radius",

                    e.target.value,
                  )
                }
              />
            </div>

            <div className="gx-form-group">
              <label>
                <FaQrcode />
                QR Code
              </label>

              <input
                type="text"
                value={checkpoint.qr_code}
                onChange={(e) =>
                  updateCheckpoint(
                    index,

                    "qr_code",

                    e.target.value,
                  )
                }
              />
            </div>

            <div className="gx-form-group">
              <label>
                <FaWifi />
                NFC Code
              </label>

              <input
                type="text"
                value={checkpoint.nfc_code}
                onChange={(e) =>
                  updateCheckpoint(
                    index,

                    "nfc_code",

                    e.target.value,
                  )
                }
              />
            </div>

            <div className="gx-form-group">
              <label>
                <FaCamera />
                Mandatory Photo
              </label>

              <input
                type="checkbox"
                checked={checkpoint.mandatory_photo}
                onChange={(e) =>
                  updateCheckpoint(
                    index,

                    "mandatory_photo",

                    e.target.checked,
                  )
                }
              />
            </div>

            <div className="gx-form-group">
              <label>Mandatory Remark</label>

              <input
                type="checkbox"
                checked={checkpoint.mandatory_remark}
                onChange={(e) =>
                  updateCheckpoint(
                    index,

                    "mandatory_remark",

                    e.target.checked,
                  )
                }
              />
            </div>
          </div>

          <div className="gx-checkpoint-actions">
            <button
              type="button"
              className="gx-btn-light"
              onClick={() => moveUp(index)}
            >
              <FaArrowUp />
            </button>

            <button
              type="button"
              className="gx-btn-light"
              onClick={() => moveDown(index)}
            >
              <FaArrowDown />
            </button>

            <button
              type="button"
              className="gx-btn-danger"
              onClick={() => deleteCheckpoint(index)}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
