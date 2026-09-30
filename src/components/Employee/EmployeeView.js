import React,{useState,useEffect} from "react";

import axios from "axios";

import {
  FaUserCircle,
  FaUserTie,
  FaPhone,
  FaBuilding,
  FaBriefcase,
  FaIdCard,
  FaMapMarkerAlt,
  FaEnvelope,
  FaTint,
  FaCalendarAlt,
  FaTimes,
} from "react-icons/fa";

function EmployeeView({
  employee,

  close,
}) {

  const [photo,setPhoto]=useState("");

  useEffect(()=>{

      if(!employee) return;

      axios
      .get(
          `http://127.0.0.1:5001/api/employee/photo/${employee.id}`,
          {
              headers:{
                  Authorization:`Bearer ${localStorage.getItem("token")}`
              },
              responseType:"blob"
          }
      )
      .then((res)=>{

          if(res.status===204) return;

          setPhoto(URL.createObjectURL(res.data));

      })
      .catch(()=>{

          setPhoto("");

      });

  },[employee]);

  if (!employee) {
    return null;
  }

  return (
    <div className="gx-modal">
      <div className="gx-employee-view">
        <div className="gx-profile-header">

          <div className="gx-profile-photo">

            {photo ? (
                <img src={photo} alt="employee" />
            ) : (
                <FaUserCircle size={120} color="#ccc" />
            )}
        
            {/* {employee.employee_photo ? (
              <img src={employee.employee_photo} alt="employee" />
            ) : (
              <FaUserCircle />
            )} */}
          </div>

          <div>
              
            <h2 style={{ fontSize:"34px", fontWeight:"700", marginBottom:"10px" }}>{employee.employee_name}</h2>

            <p style={{ fontSize:"18px", opacity:.9 }}>{employee.employee_code}</p>

            <span className={employee.status ? "gx-active" : "gx-inactive"}
              style={{ marginTop:"15px", display:"inline-block" }}
            >
              {/* {employee.employee_status || "Active"} */}
              {employee.status ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        <div className="gx-view-section">
          <h3>
            <FaUserTie />
            Personal Information
          </h3>

          <div className="gx-view-grid">
            <div>
              <label>Father Name</label>

              <span>{employee.father_name || "-"}</span>
            </div>

            <div>
              <label>Mother Name</label>

              <span>{employee.mother_name || "-"}</span>
            </div>

            <div>
              <label>Gender</label>

              <span>{employee.gender || "-"}</span>
            </div>

            <div>
              <label>DOB</label>

              <span>{employee.date_of_birth || "-"}</span>
            </div>

            <div>
              <label>Blood Group</label>

              <span>{employee.blood_group || "-"}</span>
            </div>

            <div>
              <label>Marital Status</label>

              <span>{employee.marital_status || "-"}</span>
            </div>
          </div>
        </div>

        <div className="gx-view-section">
          <h3>
            <FaPhone />
            Contact
          </h3>

          <div className="gx-view-grid">
            <div>
              <label>Mobile</label>

              <span>{employee.mobile || "-"}</span>
            </div>

            <div>
              <label>Alternate Mobile</label>

              <span>{employee.alternate_mobile || "-"}</span>
            </div>

            <div>
              <label>Email</label>

              <span>{employee.email || "-"}</span>
            </div>

            <div>
              <label>City</label>

              <span>{employee.city || "-"}</span>
            </div>

            <div>
              <label>State</label>

              <span>{employee.state || "-"}</span>
            </div>

            <div>
              <label>Pincode</label>

              <span>{employee.pincode || "-"}</span>
            </div>
          </div>
        </div>

        <div className="gx-view-section">
          <h3>
            <FaBuilding />
            Organization
          </h3>

          <div className="gx-view-grid">
            <div>
              <label>Department</label>

              <span>{employee.department_name || "-"}</span>
            </div>

            <div>
              <label>Designation</label>

              <span>{employee.designation_name || "-"}</span>
            </div>

            <div>
              <label>Default Shift</label>

              <span>{employee.shift_name || "-"}</span>
            </div>

            <div>
              <label>Joining Date</label>

              <span>{employee.joining_date || "-"}</span>
            </div>

            <div>
              <label>Employee Type</label>

              <span>{employee.employee_type || "-"}</span>
            </div>
          </div>
        </div>

        <div className="gx-view-section">
          <h3>
            <FaIdCard />
            Identity
          </h3>

          <div className="gx-view-grid">
            <div>
              <label>Biometric ID</label>

              <span>{employee.biometric_id || "-"}</span>
            </div>

            <div>
              <label>Aadhaar</label>

              <span>{employee.aadhaar_no || "-"}</span>
            </div>

            <div>
              <label>PAN</label>

              <span>{employee.pan_no || "-"}</span>
            </div>

            <div>
              <label>Emergency Contact</label>

              <span>{employee.emergency_contact_name || "-"}</span>
            </div>

            <div>
              <label>Emergency Mobile</label>

              <span>{employee.emergency_contact_mobile || "-"}</span>
            </div>
          </div>
        </div>

        <div className="gx-view-footer">
          <button className="gx-btn-primary" onClick={close}>
            <FaTimes />
            &nbsp; Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeView;
