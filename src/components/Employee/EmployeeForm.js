// import React, { useState, useEffect } from "react";

// import {
//   FaSave,
//   FaTimes,
//   FaUserTie,
//   FaPhone,
//   FaBuilding,
//   FaBriefcase,
//   FaIdCard,
//   FaCamera,
//   FaUserCircle,
// } from "react-icons/fa";

// import { createEmployee, updateEmployee } from "../../api/employee";

// import { departmentDropdown } from "../../api/department";

// import { getDesignationDropdown } from "../../api/designation";

// import { getShiftDropdown } from "../../api/shift";

// function EmployeeForm({
//   edit = false,

//   employee,

//   close,

//   refresh,
// }) {
//   const [saving, setSaving] = useState(false);

//   const [departments, setDepartments] = useState([]);

//   const [designations, setDesignations] = useState([]);

//   const [shifts, setShifts] = useState([]);

//   const [form, setForm] = useState({
//     employee_name: "",

//     father_name: "",

//     mother_name: "",

//     gender: "Male",

//     date_of_birth: "",

//     blood_group: "",

//     marital_status: "Single",

//     mobile: "",

//     alternate_mobile: "",

//     email: "",

//     current_address: "",

//     permanent_address: "",

//     city: "",

//     state: "",

//     pincode: "",

//     department_id: "",

//     designation_id: "",

//     default_shift_id: "",

//     joining_date: "",

//     employee_type: "Permanent",

//     employee_status: "Active",

//     employee_photo: "",

//     biometric_id: "",

//     qr_code: "",

//     remarks: "",

//     status: true,
//   });

//   const loadDropdowns = async () => {
//     try {
//       const [d, dg, s] = await Promise.all([
//         departmentDropdown(),

//         getDesignationDropdown(),

//         getShiftDropdown(),
//       ]);

//       setDepartments(d.data.data);

//       setDesignations(dg.data.data);

//       setShifts(s.data.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     loadDropdowns();
//   }, []);

//   useEffect(() => {
//     if (edit && employee) {
//       setForm({
//         ...employee,
//       });
//     }
//   }, [edit, employee]);

//   const inputChanged = (e) => {
//     const {
//       name,

//       value,
//     } = e.target;

//     setForm({
//       ...form,

//       [name]: value,
//     });
//   };

//   const validate = () => {
//     if (!form.employee_name) {
//       alert("Employee Name Required");

//       return false;
//     }

//     if (!form.department_id) {
//       alert("Department Required");

//       return false;
//     }

//     if (!form.designation_id) {
//       alert("Designation Required");

//       return false;
//     }

//     if (!form.joining_date) {
//       alert("Joining Date Required");

//       return false;
//     }

//     return true;
//   };

//   const saveEmployee = async () => {
//     if (!validate()) {
//       return;
//     }

//     try {
//       setSaving(true);

//       if (edit) {
//         await updateEmployee(
//           employee.id,

//           form,
//         );
//       } else {
//         await createEmployee(form);
//       }

//       refresh();
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="gx-modal">
//       <div className="gx-employee-form">
//         <div className="gx-form-header">
//           <div className="gx-photo-box">
//             {form.employee_photo ? (
//               <img src={form.employee_photo} alt="employee" />
//             ) : (
//               <FaUserCircle />
//             )}
//           </div>

//           <div>
//             <h2>{edit ? "Edit Employee" : "Add Employee"}</h2>

//             <p>
//               Employee Code
//               <strong>AUTO GENERATED</strong>
//             </p>
//           </div>

//           <div>
//             <span className="gx-status active">{form.employee_status}</span>
//           </div>
//         </div>

//         {/* ==========================================
//     PERSONAL INFORMATION
// ========================================== */}

//         <div className="gx-form-section">
//           <h3>
//             <FaUserTie />
//             &nbsp; Personal Information
//           </h3>

//           <div className="gx-grid-3">
//             <div>
//               <label>Employee Name *</label>

//               <input
//                 type="text"
//                 name="employee_name"
//                 value={form.employee_name}
//                 onChange={inputChanged}
//               />
//             </div>

//             <div>
//               <label>Father Name</label>

//               <input
//                 type="text"
//                 name="father_name"
//                 value={form.father_name}
//                 onChange={inputChanged}
//               />
//             </div>

//             <div>
//               <label>Mother Name</label>

//               <input
//                 type="text"
//                 name="mother_name"
//                 value={form.mother_name}
//                 onChange={inputChanged}
//               />
//             </div>

//             <div>
//               <label>Gender</label>

//               <select name="gender" value={form.gender} onChange={inputChanged}>
//                 <option value="Male">Male</option>

//                 <option value="Female">Female</option>

//                 <option value="Other">Other</option>
//               </select>
//             </div>

//             <div>
//               <label>Date Of Birth</label>

//               <input
//                 type="date"
//                 name="date_of_birth"
//                 value={form.date_of_birth}
//                 onChange={inputChanged}
//               />
//             </div>

//             <div>
//               <label>Blood Group</label>

//               <select
//                 name="blood_group"
//                 value={form.blood_group}
//                 onChange={inputChanged}
//               >
//                 <option value="">Select</option>

//                 <option>A+</option>
//                 <option>A-</option>
//                 <option>B+</option>
//                 <option>B-</option>
//                 <option>AB+</option>
//                 <option>AB-</option>
//                 <option>O+</option>
//                 <option>O-</option>
//               </select>
//             </div>

//             <div>
//               <label>Marital Status</label>

//               <select
//                 name="marital_status"
//                 value={form.marital_status}
//                 onChange={inputChanged}
//               >
//                 <option>Single</option>

//                 <option>Married</option>

//                 <option>Divorced</option>

//                 <option>Widowed</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* ==========================================
//     CONTACT INFORMATION
// ========================================== */}

//         <div className="gx-form-section">
//           <h3>
//             <FaPhone />
//             &nbsp; Contact Information
//           </h3>

//           <div className="gx-grid-3">
//             <div>
//               <label>Mobile *</label>

//               <input
//                 type="text"
//                 name="mobile"
//                 value={form.mobile}
//                 onChange={inputChanged}
//               />
//             </div>

//             <div>
//               <label>Alternate Mobile</label>

//               <input
//                 type="text"
//                 name="alternate_mobile"
//                 value={form.alternate_mobile}
//                 onChange={inputChanged}
//               />
//             </div>

//             <div>
//               <label>Email</label>

//               <input
//                 type="email"
//                 name="email"
//                 value={form.email}
//                 onChange={inputChanged}
//               />
//             </div>

//             <div>
//               <label>City</label>

//               <input
//                 type="text"
//                 name="city"
//                 value={form.city}
//                 onChange={inputChanged}
//               />
//             </div>

//             <div>
//               <label>State</label>

//               <input
//                 type="text"
//                 name="state"
//                 value={form.state}
//                 onChange={inputChanged}
//               />
//             </div>

//             <div>
//               <label>Pincode</label>

//               <input
//                 type="text"
//                 name="pincode"
//                 value={form.pincode}
//                 onChange={inputChanged}
//               />
//             </div>
//           </div>

//           <div>
//             <label>Current Address</label>

//             <textarea
//               rows="3"
//               name="current_address"
//               value={form.current_address}
//               onChange={inputChanged}
//             />
//           </div>

//           <div>
//             <label>Permanent Address</label>

//             <textarea
//               rows="3"
//               name="permanent_address"
//               value={form.permanent_address}
//               onChange={inputChanged}
//             />
//           </div>
//         </div>

//         {/* ==========================================
//     ORGANIZATION
// ========================================== */}

//         <div className="gx-form-section">
//           <h3>
//             <FaBuilding />
//             &nbsp; Organization
//           </h3>

//           <div className="gx-grid-3">
//             <div>
//               <label>Department *</label>

//               <select
//                 name="department_id"
//                 value={form.department_id}
//                 onChange={inputChanged}
//               >
//                 <option value="">Select Department</option>

//                 {departments.map((item) => (
//                   <option key={item.id} value={item.id}>
//                     {item.department_name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label>Designation *</label>

//               <select
//                 name="designation_id"
//                 value={form.designation_id}
//                 onChange={inputChanged}
//               >
//                 <option value="">Select Designation</option>

//                 {designations.map((item) => (
//                   <option key={item.id} value={item.id}>
//                     {item.designation_name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label>Default Shift</label>

//               <select
//                 name="default_shift_id"
//                 value={form.default_shift_id}
//                 onChange={inputChanged}
//               >
//                 <option value="">Select Shift</option>

//                 {shifts.map((item) => (
//                   <option key={item.id} value={item.id}>
//                     {item.shift_name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* ==========================================
//     EMPLOYMENT INFORMATION
// ========================================== */}

//         <div className="gx-form-section">
//           <h3>
//             <FaBriefcase />
//             &nbsp; Employment Information
//           </h3>

//           <div className="gx-grid-3">
//             <div>
//               <label>Joining Date *</label>

//               <input
//                 type="date"
//                 name="joining_date"
//                 value={form.joining_date}
//                 onChange={inputChanged}
//               />
//             </div>

//             <div>
//               <label>Employee Type</label>

//               <select
//                 name="employee_type"
//                 value={form.employee_type}
//                 onChange={inputChanged}
//               >
//                 <option>Permanent</option>

//                 <option>Contract</option>

//                 <option>Temporary</option>

//                 <option>Trainee</option>
//               </select>
//             </div>

//             <div>
//               <label>Status</label>

//               <select
//                 name="employee_status"
//                 value={form.employee_status}
//                 onChange={inputChanged}
//               >
//                 <option>Active</option>

//                 <option>Inactive</option>

//                 <option>Resigned</option>

//                 <option>Suspended</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* ==========================================
//     IDENTITY INFORMATION
// ========================================== */}

//         <div className="gx-form-section">
//           <h3>
//             <FaIdCard />
//             &nbsp; Identity Information
//           </h3>

//           <div className="gx-grid-3">
//             <div>
//               <label>Biometric ID</label>

//               <input
//                 type="text"
//                 name="biometric_id"
//                 value={form.biometric_id}
//                 onChange={inputChanged}
//               />
//             </div>

//             <div>
//               <label>Aadhaar Number</label>

//               <input
//                 type="text"
//                 name="aadhaar_no"
//                 value={form.aadhaar_no || ""}
//                 onChange={inputChanged}
//               />
//             </div>

//             <div>
//               <label>PAN Number</label>

//               <input
//                 type="text"
//                 name="pan_no"
//                 value={form.pan_no || ""}
//                 onChange={inputChanged}
//               />
//             </div>

//             <div>
//               <label>Emergency Contact Name</label>

//               <input
//                 type="text"
//                 name="emergency_contact_name"
//                 value={form.emergency_contact_name || ""}
//                 onChange={inputChanged}
//               />
//             </div>

//             <div>
//               <label>Emergency Contact Mobile</label>

//               <input
//                 type="text"
//                 name="emergency_contact_mobile"
//                 value={form.emergency_contact_mobile || ""}
//                 onChange={inputChanged}
//               />
//             </div>
//           </div>

//           <div>
//             <label>Remarks</label>

//             <textarea
//               rows="4"
//               name="remarks"
//               value={form.remarks}
//               onChange={inputChanged}
//             />
//           </div>
//         </div>

//         {/* ==========================================
//     DOCUMENTS
// ========================================== */}

//         <div className="gx-form-section">
//           <h3>📂 Documents</h3>

//           <div className="gx-grid-2">
//             <div>
//               <label>Employee Photo</label>

//               <input type="file" />
//             </div>

//             <div>
//               <label>Identity Documents</label>

//               <input type="file" multiple />
//             </div>
//           </div>

//           <p className="gx-note">
//             Photo, Aadhaar, PAN, Police Verification and other documents can be
//             uploaded here.
//           </p>
//         </div>

//         <div className="gx-form-footer">
//           <button className="gx-btn-light" onClick={close}>
//             <FaTimes />
//             &nbsp; Cancel
//           </button>

//           <button
//             className="gx-btn-primary"
//             disabled={saving}
//             onClick={saveEmployee}
//           >
//             <FaSave />
//             &nbsp;
//             {saving ? "Saving..." : edit ? "Update Employee" : "Save Employee"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EmployeeForm;

import React, { useState, useEffect } from "react";

import {
  FaArrowLeft,
  FaArrowRight,
  FaSave,
  FaTimes,
  FaUser,
  FaPhone,
  FaBuilding,
  FaBriefcase,
  FaIdCard,
  FaFolderOpen,
  FaClipboardCheck,
  FaCamera,
} from "react-icons/fa";

import { createEmployee, updateEmployee } from "../../api/employee";

import { departmentDropdown } from "../../api/department";
import { getDesignationDropdown } from "../../api/designation";
import { getShiftDropdown } from "../../api/shift";
import PersonalTab from "./EmployeeForm/PersonalTab";
import ContactTab from "./EmployeeForm/ContactTab";
import OrganizationTab from "./EmployeeForm/OrganizationTab";
import EmploymentTab from "./EmployeeForm/EmploymentTab";
import IdentityTab from "./EmployeeForm/IdentityTab";
import DocumentsTab from "./EmployeeForm/DocumentsTab";
import ReviewTab from "./EmployeeForm/ReviewTab";
import FaceEnrollmentTab from "./EmployeeForm/FaceEnrollmentTab";
import { getRoleDropdown } from "../../api/role";
const STEPS = [
  {
    id: 1,
    title: "Personal",
    icon: <FaUser />,
  },

  {
    id: 2,
    title: "Contact",
    icon: <FaPhone />,
  },

  {
    id: 3,
    title: "Organization",
    icon: <FaBuilding />,
  },

  {
    id: 4,
    title: "Employment",
    icon: <FaBriefcase />,
  },

  {
    id: 5,
    title: "Identity",
    icon: <FaIdCard />,
  },

  {
    id: 6,
    title: "Documents",
    icon: <FaFolderOpen />,
  },

  {
    id: 7,
    title: "Review",
    icon: <FaClipboardCheck />,
  },
  {
    id: 8,
    title: "Face",
    icon: <FaCamera />,
  },
];

export default function EmployeeForm({
  edit = false,

  employee,

  close,

  refresh,
}) {
  const [step, setStep] = useState(1);

  const [createdEmployeeId, setCreatedEmployeeId] = useState(null);
  const [createdCredentials, setCreatedCredentials] = useState(null);

  const [saving, setSaving] = useState(false);

  const [departments, setDepartments] = useState([]);

  const [designations, setDesignations] = useState([]);

  const [shifts, setShifts] = useState([]);

  const [roles, setRoles] = useState([]);

  const [form, setForm] = useState({
    employee_name: "",

    father_name: "",

    mother_name: "",

    gender: "Male",

    date_of_birth: "",

    blood_group: "",

    marital_status: "Single",

    mobile: "",

    alternate_mobile: "",

    email: "",

    current_address: "",

    permanent_address: "",

    city: "",

    state: "",

    pincode: "",

    emergency_contact_name: "",

    emergency_contact_mobile: "",

    emergency_contact_relation: "",

    department_id: "",

    designation_id: "",

    role_id: 6,

    default_shift_id: "",

    joining_date: "",

    employee_type: "Permanent",

    employee_status: "Active",

    nationality: "",

    qid_number: "",

    qid_expiry: "",

    passport_number: "",

    passport_expiry: "",

    visa_number: "",

    visa_expiry: "",

    driving_license_number: "",

    biometric_id: "",

    aadhaar_no: "",

    pan_no: "",

    remarks: "",

    status: true,
  });

  useEffect(() => {
    loadDropdowns();
  }, []);

  useEffect(() => {
    if (edit && employee) {
      setForm({
        ...form,

        ...employee,
      });
    }
  }, [edit, employee]);

  // ==========================================
  // Load Dropdowns
  // ==========================================

  const loadDropdowns = async () => {
    try {
      const [departmentRes, designationRes, shiftRes, roleRes] =
        await Promise.all([
          departmentDropdown(),

          getDesignationDropdown(),

          getShiftDropdown(),

          getRoleDropdown(),
        ]);

      setDepartments(departmentRes.data.data || []);

      setDesignations(designationRes.data.data || []);

      setShifts(shiftRes.data.data || []);

      setRoles(roleRes.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // ==========================================
  // Handle Input Change
  // ==========================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,

      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ==========================================
  // Next Step
  // ==========================================

const nextStep = () => {

    if (step >= 7) {
        return;
    }

    setStep(step + 1);
};

  // ==========================================
  // Previous Step
  // ==========================================

  const previousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // ==========================================
  // Validation
  // ==========================================

const validate = () => {

    if (!form.employee_name?.trim()) {
        alert("Employee Name is required.");
        return false;
    }

    if (!form.mobile?.trim()) {
        alert("Mobile Number is required.");
        return false;
    }

    if (!form.department_id) {
        alert("Department is required.");
        return false;
    }

    if (!form.designation_id) {
        alert("Designation is required.");
        return false;
    }

    if (!form.role_id) {
        alert("Role is required.");
        return false;
    }

    if (!form.default_shift_id) {
        alert("Default Shift is required.");
        return false;
    }

    if (!form.joining_date) {
        alert("Joining Date is required.");
        return false;
    }

    if (!form.nationality?.trim()) {
        alert("Nationality is required.");
        return false;
    }

    if (!form.qid_number?.trim()) {
        alert("QID Number is required.");
        return false;
    }

    if (!form.qid_expiry) {
        alert("QID Expiry is required.");
        return false;
    }

    if (!form.passport_number?.trim()) {
        alert("Passport Number is required.");
        return false;
    }

    if (!form.passport_expiry) {
        alert("Passport Expiry is required.");
        return false;
    }

    return true;
};

  // ==========================================
  // Save Employee
  // ==========================================

const saveEmployee = async () => {

    if (!validate()) {
        return;
    }

    try {

        setSaving(true);

        // ==========================================
        // EDIT EMPLOYEE
        // ==========================================

        if (edit) {

            const response = await updateEmployee(
                employee.id,
                form
            );

            // IMPORTANT:
            // Do NOT send update response as credentials.
            // Just tell parent that update is complete.
            refresh();

            return;
        }

        // ==========================================
        // CREATE EMPLOYEE
        // ==========================================

        const response = await createEmployee(form);

        const createdEmployee =
            response?.data?.data;

        const employeeId =
            createdEmployee?.employee_id ||
            createdEmployee?.id;

        if (!employeeId) {

            console.error(
                "Employee ID missing from create response:",
                response
            );

            alert(
                "Employee created, but Employee ID was not returned."
            );

            return;
        }

        // ------------------------------------------
        // SAVE credentials in local state
        // ------------------------------------------

        setCreatedEmployeeId(employeeId);

        setCreatedCredentials({
            employee_id:
                createdEmployee.employee_id,

            user_id:
                createdEmployee.user_id,

            employee_code:
                createdEmployee.employee_code,

            username:
                createdEmployee.username,

            temporary_password:
                createdEmployee.temporary_password,

            must_change_password:
                createdEmployee.must_change_password
        });

        // ------------------------------------------
        // Move to Face Enrollment
        // ------------------------------------------

        setStep(8);

    } catch (err) {

        console.log(err);

        alert(
            err?.response?.data?.message ||
            "Unable to save employee."
        );

    } finally {

        setSaving(false);

    }

};

  return (
    <div className="gx-modal">
      <div className="gx-modal-content gx-employee-form">
        <div className="gx-modal-header">
          <h2>{edit ? "Edit Employee" : "Add Employee"}</h2>

          <button className="gx-close" onClick={close}>
            <FaTimes />
          </button>
        </div>

        <div className="gx-form-body">
          <div className="gx-step-menu">
            {STEPS.map((item) => (
              <div
                key={item.id}
                className={step === item.id ? "gx-step active" : "gx-step"}
onClick={() => {

    // Face step cannot be opened
    // until employee has actually been created.

    if (item.id === 8 && !createdEmployeeId) {
        return;
    }

    // After employee creation,
    // don't allow going back to employee details.

    if (createdEmployeeId && item.id !== 8) {
        return;
    }

    setStep(item.id);

}}
              >
                <span>{item.icon}</span>

                <label>{item.title}</label>
              </div>
            ))}
          </div>

          <div className="gx-step-content">
            {step === 1 && (
              // <PersonalTab form={form} handleChange={handleChange} />
              <PersonalTab form={form} handleChange={handleChange} setForm={setForm} />
            )}

            {step === 2 && (
              <ContactTab form={form} handleChange={handleChange} />
            )}

            {step === 3 && (
              <OrganizationTab
                form={form}
                handleChange={handleChange}
                departments={departments}
                designations={designations}
                shifts={shifts}
                roles={roles}
              />
            )}

            {step === 4 && (
              <EmploymentTab form={form} handleChange={handleChange} />
            )}

            {step === 5 && (
              <IdentityTab form={form} handleChange={handleChange} />
            )}

            {step === 6 && <DocumentsTab form={form} setForm={setForm} />}

            {step === 7 && (
              <ReviewTab
                form={form}
                departments={departments}
                designations={designations}
                shifts={shifts}
                roles={roles}
                saveEmployee={saveEmployee}
                saving={saving}
              />
            )}

            {step === 8 && (
    <FaceEnrollmentTab
        employeeId={createdEmployeeId}

onComplete={(data) => {

    alert(
        "Employee and face enrollment completed successfully."
    );

    refresh({

        // Original employee credentials
        ...createdCredentials,

        // Face enrollment response
        ...data,

        // Make sure employee ID is present
        id: createdEmployeeId

    });

}}

onCancel={() => {

    alert(
        "Employee created, but face enrollment was skipped."
    );

    refresh({

        // Keep the login credentials
        ...createdCredentials,

        id: createdEmployeeId

    });

}}
    />
)}
          </div>
        </div>

<div className="gx-form-footer">

    <button
        className="gx-btn-light"
        onClick={close}
    >
        <FaTimes />
        &nbsp; Cancel
    </button>


    {/* Previous button only for normal employee steps */}

    {step > 1 && step < 8 && (
        <button
            className="gx-btn-light"
            onClick={previousStep}
        >
            <FaArrowLeft />
            &nbsp; Previous
        </button>
    )}


    {/* Next button for steps 1-6 */}

    {step >= 1 && step <= 6 && (
        <button
            className="gx-btn-primary"
            onClick={nextStep}
        >
            Next
            &nbsp;
            <FaArrowRight />
        </button>
    )}


    {/* Step 7 = Create Employee */}

    {step === 7 && (
        <button
            className="gx-btn-success"
            onClick={saveEmployee}
            disabled={saving}
        >
            <FaSave />
            &nbsp;

            {saving
                ? "Creating Employee..."
                : "Create Employee"
            }
        </button>
    )}

</div>
      </div>
    </div>
  );
}
