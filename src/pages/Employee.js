// import React, { useState, useEffect, useCallback } from "react";
// import DashboardLayout from "../layouts/DashboardLayout";

// import "../styles/employee.css";

// import {
//     FaPlus,
//     FaDownload,
//     FaUsers,
//     FaUserCheck,
//     FaUserSlash,
//     FaSearch,
//     FaSyncAlt
// } from "react-icons/fa";

// import {
//     getEmployees,
//     getEmployee,
//     getEmployeeDashboard,
//     changeEmployeeStatus,
//     deleteEmployee
// } from "../api/employee";

// import EmployeeTable from "../components/Employee/EmployeeTable";
// import EmployeeForm from "../components/Employee/EmployeeForm";
// import EmployeeView from "../components/Employee/EmployeeView";
// import CredentialsDialog from "../components/Employee/EmployeeForm/CredentialsDialog";
// import EmployeeStatusDialog from "../components/Employee/EmployeeStatusDialog";
// import EmployeeDeleteDialog from "../components/Employee/EmployeeDeleteDialog";

// export default function Employee() {

//     const user = JSON.parse(localStorage.getItem("user"));

//     console.log("USER :", user);
//     console.log("ROLE :", user?.role);

//     const isEmployee = user?.role === "Security Guard";

//     console.log("isEmployee :", isEmployee);

//     const [employees, setEmployees] = useState([]);

//     const [dashboard, setDashboard] = useState({

//         total:0,

//         active:0,

//         inactive:0

//     });

//     const [loading,setLoading]=useState(false);

//     const [search,setSearch]=useState("");

//     const [selected,setSelected]=useState(null);

//     const [showForm,setShowForm]=useState(false);

//     const [showView,setShowView]=useState(false);

//     const [showStatus,setShowStatus]=useState(false);

//     const [showDelete,setShowDelete]=useState(false);

//     const [editMode,setEditMode]=useState(false);

//     const [credentials,setCredentials]=useState(null);

//     const [showCredentials,setShowCredentials]=useState(false);

//     const loadDashboard=useCallback(async()=>{

//         try{

//             const res=await getEmployeeDashboard();

//             setDashboard(res.data.data);

//         }

//         catch(err){

//             console.log(err);

//         }

//     },[]);

//     const loadEmployees=useCallback(async()=>{

//         try{

//             setLoading(true);

//             const res=await getEmployees();

//             setEmployees(res.data.data || []);

//         }

//         catch(err){

//             console.log(err);

//         }

//         finally{

//             setLoading(false);

//         }

//     },[]);

//     const refresh=useCallback(()=>{

//         loadDashboard();

//         loadEmployees();

//     },[loadDashboard,loadEmployees]);

//     useEffect(()=>{

//         refresh();

//     },[refresh]);

//     const addEmployee=()=>{

//         setSelected(null);

//         setEditMode(false);

//         setShowForm(true);

//     };

//     const editEmployee=async(row)=>{

//         try{

//             const res=await getEmployee(row.id);

//             setSelected(res.data.data);

//             setEditMode(true);

//             setShowForm(true);

//         }

//         catch(err){

//             console.log(err);

//         }

//     };

//     const viewEmployee=async(row)=>{

//         try{

//             const res=await getEmployee(row.id);

//             setSelected(res.data.data);

//             setShowView(true);

//         }

//         catch(err){

//             console.log(err);

//         }

//     };

//     const statusEmployee=(row)=>{

//         setSelected(row);

//         setShowStatus(true);

//     };

//     const removeEmployee=(row)=>{

//         setSelected(row);

//         setShowDelete(true);

//     };

//     const afterSave=(response)=>{

//         // if(response){
//         if(response && !editMode){

//             setCredentials(response);

//             setShowCredentials(true);

//         }

//         setShowForm(false);

//         setSelected(null);

//         setEditMode(false);

//         refresh();

//     };

//         return (

//         <DashboardLayout title="Employee Master">

//             {/* ===============================
//                 Header
//             ================================ */}

//             <div className="gx-page-header">

//                 <div>

//                     <h2>Employee Master</h2>

//                     <p>Manage Employee Information</p>

//                 </div>

//                 {!isEmployee && (

//                     <div className="gx-header-actions">

//                         <button
//                             className="gx-btn-light"
//                             onClick={refresh}
//                         >
//                             <FaSyncAlt />
//                             &nbsp;
//                             Refresh
//                         </button>

//                         <button className="gx-btn-light">

//                             <FaDownload />

//                             &nbsp;

//                             Export

//                         </button>

//                         <button
//                             className="gx-btn-primary"
//                             onClick={addEmployee}
//                         >

//                             <FaPlus />

//                             &nbsp;

//                             Add Employee

//                         </button>

//                     </div>

//                 )}

//             </div>

//             {/* ===============================
//                 Dashboard Cards
//             ================================ */}

//             {!isEmployee && (

//                 <div className="gx-summary">

//                     <div className="gx-card">

//                         <FaUsers className="gx-card-icon"/>

//                         <h2>{dashboard.total}</h2>

//                         <span>Total Employees</span>

//                     </div>

//                     <div className="gx-card">

//                         <FaUserCheck className="gx-card-icon success"/>

//                         <h2>{dashboard.active}</h2>

//                         <span>Active</span>

//                     </div>

//                     <div className="gx-card">

//                         <FaUserSlash className="gx-card-icon danger"/>

//                         <h2>{dashboard.inactive}</h2>

//                         <span>Inactive</span>

//                     </div>

//                 </div>

//             )}

//             {/* ===============================
//                 Search
//             ================================ */}

//             {!isEmployee && (

//                 <div className="gx-toolbar">

//                     <div className="gx-search">

//                         <FaSearch/>

//                         <input

//                             type="text"

//                             placeholder="Search Employee..."

//                             value={search}

//                             onChange={(e)=>setSearch(e.target.value)}

//                         />

//                     </div>

//                 </div>

//             )}

//             {/* ===============================
//                 Table
//             ================================ */}

//             {!isEmployee && (

//                 <EmployeeTable

//                     loading={loading}

//                     employees={employees}

//                     search={search}

//                     onView={viewEmployee}

//                     onEdit={editEmployee}

//                     onStatus={statusEmployee}

//                     onDelete={removeEmployee}

//                     isEmployee={isEmployee}

//                 />

//             )}

//             {/* ===============================
//                 Employee Form
//             ================================ */}

//             {

//                 showForm && (

//                     <EmployeeForm

//                         edit={editMode}

//                         employee={selected}

//                         close={()=>{

//                             setShowForm(false);

//                             setSelected(null);

//                             setEditMode(false);

//                         }}

//                         refresh={afterSave}

//                     />

//                 )

//             }

//             {/* ===============================
//                 View Employee
//             ================================ */}

//             {

//                 showView && (

//                     <EmployeeView

//                         employee={selected}

//                         close={()=>{

//                             setShowView(false);

//                             setSelected(null);

//                         }}

//                     />

//                 )

//             }

//             {/* ===============================
//                 Status Dialog
//             ================================ */}

//             {

//                 showStatus && (

//                     <EmployeeStatusDialog

//                         employee={selected}

//                         close={()=>{

//                             setShowStatus(false);

//                             setSelected(null);

//                         }}

//                         confirm={async()=>{

//                             await changeEmployeeStatus(

//                                 selected.id,

//                                 !selected.status

//                             );

//                             refresh();

//                             setShowStatus(false);

//                             setSelected(null);

//                         }}

//                     />

//                 )

//             }

//             {/* ===============================
//                 Delete Dialog
//             ================================ */}

//             {

//                 showDelete && (

//                     <EmployeeDeleteDialog

//                         employee={selected}

//                         close={()=>{

//                             setShowDelete(false);

//                             setSelected(null);

//                         }}

//                         confirm={async()=>{

//                             await deleteEmployee(

//                                 selected.id

//                             );

//                             refresh();

//                             setShowDelete(false);

//                             setSelected(null);

//                         }}

//                     />

//                 )

//             }

//             {/* ===============================
//                 Login Credentials
//             ================================ */}

//             {

//                 showCredentials && (

//                     <CredentialsDialog

//                         data={credentials}

//                         close={()=>{

//                             setShowCredentials(false);

//                             setCredentials(null);

//                         }}

//                     />

//                 )

//             }

//         </DashboardLayout>

//     );

// }

// import React, { useEffect, useState } from "react";

// import DashboardLayout from "../layouts/DashboardLayout";

// import "../styles/employee.css";

// import {
//   FaPlus,
//   FaDownload,
//   FaUsers,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaSearch,
// } from "react-icons/fa";

// import {
//   getEmployees,
//   getEmployee,
//   getEmployeeDashboard,
//   changeEmployeeStatus,
//   deleteEmployee,
// } from "../api/employee";

// import EmployeeTable from "../components/Employee/EmployeeTable";
// import EmployeeForm from "../components/Employee/EmployeeForm";
// import EmployeeView from "../components/Employee/EmployeeView";
// import EmployeeStatusDialog from "../components/Employee/EmployeeStatusDialog";
// import EmployeeDeleteDialog from "../components/Employee/EmployeeDeleteDialog";

// function Employee() {
//   const [employees, setEmployees] = useState([]);

//   const [dashboard, setDashboard] = useState({
//     total: 0,

//     active: 0,

//     inactive: 0,
//   });

//   const [loading, setLoading] = useState(false);

//   const [search, setSearch] = useState("");

//   const [selectedEmployee, setSelectedEmployee] = useState(null);

//   const [showForm, setShowForm] = useState(false);

//   const [editMode, setEditMode] = useState(false);

//   const [showView, setShowView] = useState(false);

//   const [showStatus, setShowStatus] = useState(false);

//   const [showDelete, setShowDelete] = useState(false);

//   const loadDashboard = async () => {
//     try {
//       const response = await getEmployeeDashboard();

//       setDashboard(response.data.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const loadEmployees = async () => {
//     try {
//       setLoading(true);

//       const response = await getEmployees();

//       setEmployees(response.data.data);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const refresh = () => {
//     loadDashboard();

//     loadEmployees();
//   };

//   useEffect(() => {
//     refresh();
//   }, []);

//   const viewEmployee = async (item) => {
//     const response = await getEmployee(item.id);

//     setSelectedEmployee(response.data.data);

//     setShowView(true);
//   };

//   const editEmployee = async (item) => {
//     const response = await getEmployee(item.id);

//     setSelectedEmployee(response.data.data);

//     setEditMode(true);

//     setShowForm(true);
//   };

//   const statusEmployee = (item) => {
//     setSelectedEmployee(item);

//     setShowStatus(true);
//   };

//   const removeEmployee = (item) => {
//     setSelectedEmployee(item);

//     setShowDelete(true);
//   };

//   return (
//     <DashboardLayout title="Employee Master">
//       <div className="gx-page-header">
//         <div>
//           <h2>Employee Master</h2>

//           <p>Manage Employees</p>
//         </div>

//         <button
//           className="gx-btn-primary"
//           onClick={() => {
//             setEditMode(false);

//             setSelectedEmployee(null);

//             setShowForm(true);
//           }}
//         >
//           <FaPlus />
//           &nbsp; Add Employee
//         </button>
//       </div>

//       <div className="gx-summary">
//         <div className="gx-card">
//           <FaUsers />

//           <h3>{dashboard.total}</h3>

//           <span>Employees</span>
//         </div>

//         <div className="gx-card">
//           <FaCheckCircle />

//           <h3>{dashboard.active}</h3>

//           <span>Active</span>
//         </div>

//         <div className="gx-card">
//           <FaTimesCircle />

//           <h3>{dashboard.inactive}</h3>

//           <span>Inactive</span>
//         </div>
//       </div>

//       <div className="gx-toolbar">
//         <div className="gx-search">
//           <FaSearch />

//           <input
//             placeholder="Search Employee"
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//             }}
//           />
//         </div>

//         <button className="gx-btn-light">
//           <FaDownload />
//           &nbsp; Export
//         </button>
//       </div>

//       <EmployeeTable
//         loading={loading}
//         employees={employees}
//         search={search}
//         onView={viewEmployee}
//         onEdit={editEmployee}
//         onStatus={statusEmployee}
//         onDelete={removeEmployee}
//       />

//       {showForm && (
//         <EmployeeForm
//           edit={editMode}
//           employee={selectedEmployee}
//           close={() => {
//             setShowForm(false);

//             setEditMode(false);

//             setSelectedEmployee(null);
//           }}
//           refresh={() => {
//             setShowForm(false);

//             setEditMode(false);

//             setSelectedEmployee(null);

//             refresh();
//           }}
//         />
//       )}

//       {showView && (
//         <EmployeeView
//           employee={selectedEmployee}
//           close={() => {
//             setShowView(false);

//             setSelectedEmployee(null);
//           }}
//         />
//       )}

//       {showStatus && (
//         <EmployeeStatusDialog
//           employee={selectedEmployee}
//           close={() => {
//             setShowStatus(false);

//             setSelectedEmployee(null);
//           }}
//           confirm={async () => {
//             await changeEmployeeStatus(
//               selectedEmployee.id,

//               !selectedEmployee.status,
//             );

//             refresh();

//             setShowStatus(false);

//             setSelectedEmployee(null);
//           }}
//         />
//       )}

//       {showDelete && (
//         <EmployeeDeleteDialog
//           employee={selectedEmployee}
//           close={() => {
//             setShowDelete(false);

//             setSelectedEmployee(null);
//           }}
//           confirm={async () => {
//             await deleteEmployee(selectedEmployee.id);

//             refresh();

//             setShowDelete(false);

//             setSelectedEmployee(null);
//           }}
//         />
//       )}
//     </DashboardLayout>
//   );
// }

// export default Employee;


import React, { useState, useEffect, useCallback } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

import "../styles/employee.css";

import {
    FaPlus,
    FaDownload,
    FaUsers,
    FaUserCheck,
    FaUserSlash,
    FaSearch,
    FaSyncAlt
} from "react-icons/fa";

import {
    getEmployees,
    getEmployee,
    getEmployeeDashboard,
    changeEmployeeStatus,
    deleteEmployee
} from "../api/employee";

import EmployeeTable from "../components/Employee/EmployeeTable";
import EmployeeForm from "../components/Employee/EmployeeForm";
import EmployeeView from "../components/Employee/EmployeeView";
import CredentialsDialog from "../components/Employee/EmployeeForm/CredentialsDialog";
import EmployeeStatusDialog from "../components/Employee/EmployeeStatusDialog";
import EmployeeDeleteDialog from "../components/Employee/EmployeeDeleteDialog";
import FaceEnrollmentTab from "../components/Employee/EmployeeForm/FaceEnrollmentTab";

export default function Employee() {

    const user = JSON.parse(localStorage.getItem("user"));

    const isEmployee = user?.role === "Security Guard";

    const [employees, setEmployees] = useState([]);

    const [dashboard, setDashboard] = useState({

        total:0,

        active:0,

        inactive:0

    });

    const [loading,setLoading]=useState(false);

    const [search,setSearch]=useState("");

    const [selected,setSelected]=useState(null);

    const [showForm,setShowForm]=useState(false);

    const [showView,setShowView]=useState(false);

    const [showStatus,setShowStatus]=useState(false);

    const [showDelete,setShowDelete]=useState(false);

    const [editMode,setEditMode]=useState(false);

    const [credentials,setCredentials]=useState(null);

    const [showCredentials,setShowCredentials]=useState(false);

    const [showFaceEnrollment, setShowFaceEnrollment] = useState(false);
    const [faceEmployee, setFaceEmployee] = useState(null);
    const [faceMode, setFaceMode] = useState("enroll");

    const loadDashboard=useCallback(async()=>{

        try{

            const res=await getEmployeeDashboard();

            setDashboard(res.data.data);

        }

        catch(err){

            console.log(err);

        }

    },[]);

    const loadEmployees=useCallback(async()=>{

        try{

            setLoading(true);

            const res=await getEmployees();

            setEmployees(res.data.data || []);

        }

        catch(err){

            console.log(err);

        }

        finally{

            setLoading(false);

        }

    },[]);

    const refresh=useCallback(()=>{

        loadDashboard();

        loadEmployees();

    },[loadDashboard,loadEmployees]);

    useEffect(()=>{

        refresh();

    },[refresh]);

    const addEmployee=()=>{

        setSelected(null);

        setEditMode(false);

        setShowForm(true);

    };

    const editEmployee=async(row)=>{

        try{

            const res=await getEmployee(row.id);

            setSelected(res.data.data);

            setEditMode(true);

            setShowForm(true);

        }

        catch(err){

            console.log(err);

        }

    };

    const viewEmployee=async(row)=>{

        try{

            const res=await getEmployee(row.id);

            setSelected(res.data.data);

            setShowView(true);

        }

        catch(err){

            console.log(err);

        }

    };

    const statusEmployee=(row)=>{

        setSelected(row);

        setShowStatus(true);

    };
const openFaceEnrollment = (row) => {

    const employeeId = row.id || row.employee_id;

    setFaceEmployee({
        ...row,
        id: employeeId
    });

    setFaceMode(
        row.face_enrolled
            ? "reenroll"
            : "enroll"
    );

    setShowFaceEnrollment(true);
};
    const removeEmployee=(row)=>{

        setSelected(row);

        setShowDelete(true);

    };

const afterSave = (response) => {

    // Only show credentials when the response
    // actually contains the temporary password.
    if (response?.temporary_password) {

        setCredentials(response);

        setShowCredentials(true);

    }

    setShowForm(false);

    setSelected(null);

    setEditMode(false);

    refresh();

};

        return (

        <DashboardLayout title="Employee Master">

            {/* ===============================
                Header
            ================================ */}

            <div className="gx-page-header">

                <div>

                    <h2>Employee Master</h2>

                    <p>Manage Employee Information</p>

                </div>

                {!isEmployee && (

                    <div className="gx-header-actions">

                        <button
                            className="gx-btn-light"
                            onClick={refresh}
                        >
                            <FaSyncAlt />
                            &nbsp;
                            Refresh
                        </button>

                        <button className="gx-btn-light">

                            <FaDownload />

                            &nbsp;

                            Export

                        </button>

                            <button
                                className="gx-btn-primary"
                                onClick={addEmployee}
                            >

                                <FaPlus />

                                &nbsp;

                                Add Employee

                            </button>

                    </div>

                )}

            </div>

            {/* ===============================
                Dashboard Cards
            ================================ */}
            {!isEmployee && (

                <div className="gx-summary">

                    <div className="gx-card">

                        <FaUsers className="gx-card-icon"/>

                        <h2>{dashboard.total}</h2>

                        <span>Total Employees</span>

                    </div>

                    <div className="gx-card">

                        <FaUserCheck className="gx-card-icon success"/>

                        <h2>{dashboard.active}</h2>

                        <span>Active</span>

                    </div>

                    <div className="gx-card">

                        <FaUserSlash className="gx-card-icon danger"/>

                        <h2>{dashboard.inactive}</h2>

                        <span>Inactive</span>

                    </div>

                </div>

            )}

            {/* ===============================
                Search
            ================================ */}

            {!isEmployee && (

                <div className="gx-toolbar">

                    <div className="gx-search">

                        <FaSearch/>

                        <input

                            type="text"

                            placeholder="Search Employee..."

                            value={search}

                            onChange={(e)=>setSearch(e.target.value)}

                        />

                    </div>

                </div>

            )}

            {/* ===============================
                Table
            ================================ */}

            <EmployeeTable
                loading={loading}
                employees={employees}
                search={search}
                onView={viewEmployee}
                onEdit={editEmployee}
                onStatus={statusEmployee}
                onDelete={removeEmployee}
                onFace={openFaceEnrollment}
                isEmployee={isEmployee}
            />

            {/* ===============================
                Employee Form
            ================================ */}

            {

                showForm && (

                    <EmployeeForm

                        edit={editMode}

                        employee={selected}

                        close={()=>{

                            setShowForm(false);

                            setSelected(null);

                            setEditMode(false);

                        }}

                        refresh={afterSave}

                    />

                )

            }

            {/* ===============================
                View Employee
            ================================ */}

            {

                showView && (

                    <EmployeeView

                        employee={selected}

                        close={()=>{

                            setShowView(false);

                            setSelected(null);

                        }}

                    />

                )

            }

            {/* ===============================
                Status Dialog
            ================================ */}

            {

                showStatus && (

                    <EmployeeStatusDialog

                        employee={selected}

                        close={()=>{

                            setShowStatus(false);

                            setSelected(null);

                        }}

                        confirm={async()=>{

                            await changeEmployeeStatus(

                                selected.id,

                                !selected.status

                            );

                            refresh();

                            setShowStatus(false);

                            setSelected(null);

                        }}

                    />

                )

            }

            {/* ===============================
                Delete Dialog
            ================================ */}

            {

                showDelete && (

                    <EmployeeDeleteDialog

                        employee={selected}

                        close={()=>{

                            setShowDelete(false);

                            setSelected(null);

                        }}

                        confirm={async()=>{

                            await deleteEmployee(

                                selected.id

                            );

                            refresh();

                            setShowDelete(false);

                            setSelected(null);

                        }}

                    />

                )

            }
{showFaceEnrollment && faceEmployee && (

    <div className="gx-modal">

        <div className="gx-modal-content gx-employee-form">

            <div className="gx-modal-header">

                <h2>
                    {faceMode === "reenroll"
                        ? "Re-enroll Employee Face"
                        : "Enroll Employee Face"}
                </h2>

                <button
                    className="gx-close"
                    onClick={() => {

                        setShowFaceEnrollment(false);
                        setFaceEmployee(null);

                    }}
                >
                    ×
                </button>

            </div>

            <FaceEnrollmentTab

                employeeId={faceEmployee.id}

                mode={faceMode}

                onComplete={(data) => {

                    setShowFaceEnrollment(false);
                    setFaceEmployee(null);

                    refresh();

                }}

                onCancel={() => {

                    setShowFaceEnrollment(false);
                    setFaceEmployee(null);

                }}

            />

        </div>

    </div>

)}
            {/* ===============================
                Login Credentials
            ================================ */}

            {

                showCredentials && (

                    <CredentialsDialog

                        data={credentials}

                        close={()=>{

                            setShowCredentials(false);

                            setCredentials(null);

                        }}

                    />

                )

            }

        </DashboardLayout>

    );

}