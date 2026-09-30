// import React from "react";

// import { FaPlus, FaTrash, FaClock } from "react-icons/fa";

// export default function ScheduleStep({
//   form,

//   setForm,
// }) {
//   function addSchedule() {
//     setForm({
//       ...form,

//       schedules: [
//         ...form.schedules,

//         {
//           shift_name: "",

//           start_time: "",

//           end_time: "",

//           frequency_minutes: 60,

//           active: true,
//         },
//       ],
//     });
//   }

//   function updateSchedule(
//     index,

//     field,

//     value,
//   ) {
//     const list = [...form.schedules];

//     list[index][field] = value;

//     setForm({
//       ...form,

//       schedules: list,
//     });
//   }

//   function deleteSchedule(index) {
//     const list = [...form.schedules];

//     list.splice(index, 1);

//     setForm({
//       ...form,

//       schedules: list,
//     });
//   }

//   return (
//     <div className="gx-step">
//       <div className="gx-step-header">
//         <h3>Patrol Schedule</h3>

//         <button className="gx-btn-primary" type="button" onClick={addSchedule}>
//           <FaPlus />
//           &nbsp; Add Schedule
//         </button>
//       </div>

//       {form.schedules.length === 0 && (
//         <div className="gx-empty">No patrol schedules added.</div>
//       )}

//       {form.schedules.map((schedule, index) => (
//         <div key={index} className="gx-checkpoint-card">
//           <div className="gx-form-grid">
//             <div className="gx-form-group">
//               <label>Shift Name</label>

//               <input
//                 type="text"
//                 placeholder="Morning Patrol"
//                 value={schedule.shift_name}
//                 onChange={(e) =>
//                   updateSchedule(
//                     index,

//                     "shift_name",

//                     e.target.value,
//                   )
//                 }
//               />
//             </div>

//             <div className="gx-form-group">
//               <label>
//                 <FaClock />
//                 Start Time
//               </label>

//               <input
//                 type="time"
//                 value={schedule.start_time}
//                 onChange={(e) =>
//                   updateSchedule(
//                     index,

//                     "start_time",

//                     e.target.value,
//                   )
//                 }
//               />
//             </div>

//             <div className="gx-form-group">
//               <label>End Time</label>

//               <input
//                 type="time"
//                 value={schedule.end_time}
//                 onChange={(e) =>
//                   updateSchedule(
//                     index,

//                     "end_time",

//                     e.target.value,
//                   )
//                 }
//               />
//             </div>

//             <div className="gx-form-group">
//               <label>Frequency (Minutes)</label>

//               <input
//                 type="number"
//                 min="1"
//                 value={schedule.frequency_minutes}
//                 onChange={(e) =>
//                   updateSchedule(
//                     index,

//                     "frequency_minutes",

//                     e.target.value,
//                   )
//                 }
//               />
//             </div>

//             <div className="gx-form-group">
//               <label>Active</label>

//               <input
//                 type="checkbox"
//                 checked={schedule.active}
//                 onChange={(e) =>
//                   updateSchedule(
//                     index,

//                     "active",

//                     e.target.checked,
//                   )
//                 }
//               />
//             </div>
//           </div>

//           <div className="gx-checkpoint-actions">
//             <button
//               type="button"
//               className="gx-btn-danger"
//               onClick={() => deleteSchedule(index)}
//             >
//               <FaTrash />
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";

import { FaPlus, FaTrash, FaClock } from "react-icons/fa";

import { getShiftDropdown } from "../../api/shift";

export default function ScheduleStep({
  form,

  setForm,
}) {
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    loadShifts();
  }, []);

  async function loadShifts() {
    try {
      const res = await getShiftDropdown();

      setShifts(res.data.data || []);
    } catch (err) {
      console.error("Failed to load shifts", err);
    }
  }

  function generateScheduleCode() {
    const routeCode = form.route_code || "ROUTE";

    const next = String(form.schedules.length + 1).padStart(2, "0");

    return `${routeCode}-SCH${next}`;
  }

  function addSchedule() {
    setForm({
      ...form,

      schedules: [
        ...form.schedules,

        {
          schedule_code: generateScheduleCode(),

          shift_id: "",

          start_time: "",

          expected_duration: 60,

          grace_minutes: 10,

          priority: "Normal",

          status: true,
        },
      ],
    });
  }

  function updateSchedule(
    index,

    field,

    value,
  ) {
    const schedules = [...form.schedules];

    schedules[index][field] = value;

    setForm({
      ...form,

      schedules,
    });
  }

  function deleteSchedule(index) {
    const schedules = [...form.schedules];

    schedules.splice(index, 1);

    setForm({
      ...form,

      schedules,
    });
  }

  // =====================================================
  // PART 2 STARTS FROM RETURN()
  // =====================================================

  return (
    <div className="gx-step">
      <div className="gx-step-header">
        <h3>Patrol Schedules</h3>

        <button type="button" className="gx-btn-primary" onClick={addSchedule}>
          <FaPlus />
          &nbsp;Add Schedule
        </button>
      </div>

      {form.schedules.length === 0 && (
        <div className="gx-empty">No patrol schedules added.</div>
      )}

      {form.schedules.map((schedule, index) => (
        <div key={index} className="gx-checkpoint-card">
          <div className="gx-step-header">
            <h4>Schedule #{index + 1}</h4>

            <button
              type="button"
              className="gx-btn-danger"
              onClick={() => deleteSchedule(index)}
            >
              <FaTrash />
            </button>
          </div>

          <div className="gx-form-grid">
            {/* Schedule Code */}

            <div className="gx-form-group">
              <label>Schedule Code</label>

              <input type="text" value={schedule.schedule_code} readOnly />
            </div>

            {/* Shift */}

            <div className="gx-form-group">
              <label>Shift</label>

              <select
                value={schedule.shift_id}
                onChange={(e) =>
                  updateSchedule(index, "shift_id", Number(e.target.value))
                }
              >
                <option value="">Select Shift</option>

                {shifts.map((shift) => (
                  <option key={shift.id} value={shift.id}>
                    {shift.shift_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Start Time */}

            <div className="gx-form-group">
              <label>
                <FaClock />
                &nbsp;Start Time
              </label>

              <input
                type="time"
                value={schedule.start_time}
                onChange={(e) =>
                  updateSchedule(index, "start_time", e.target.value)
                }
              />
            </div>

            {/* Expected Duration */}

            <div className="gx-form-group">
              <label>Expected Duration (Minutes)</label>

              <input
                type="number"
                min="1"
                value={schedule.expected_duration}
                onChange={(e) =>
                  updateSchedule(
                    index,
                    "expected_duration",
                    Number(e.target.value),
                  )
                }
              />
            </div>

            {/* Grace Minutes */}

            <div className="gx-form-group">
              <label>Grace Minutes</label>

              <input
                type="number"
                min="0"
                value={schedule.grace_minutes}
                onChange={(e) =>
                  updateSchedule(index, "grace_minutes", Number(e.target.value))
                }
              />
            </div>

            {/* Priority */}

            <div className="gx-form-group">
              <label>Priority</label>

              <select
                value={schedule.priority}
                onChange={(e) =>
                  updateSchedule(index, "priority", e.target.value)
                }
              >
                <option value="Low">Low</option>

                <option value="Normal">Normal</option>

                <option value="High">High</option>

                <option value="Critical">Critical</option>
              </select>
            </div>

            {/* Status */}

            <div className="gx-form-group">
              <label>Active</label>

              <input
                type="checkbox"
                checked={schedule.status}
                onChange={(e) =>
                  updateSchedule(index, "status", e.target.checked)
                }
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
