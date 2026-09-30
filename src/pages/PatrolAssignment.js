import React, {
    useState,
    useEffect,
    useCallback
} from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import "../styles/PatrolForm.css";

import {
    FaPlus,
    FaDownload,
    FaClipboardList,
    FaCheckCircle,
    FaTimesCircle,
    FaSearch,
    FaSyncAlt
} from "react-icons/fa";

import {

    getPatrolAssignments,
    getPatrolAssignment,
    getPatrolAssignmentDashboard,
    changePatrolAssignmentStatus,
    deletePatrolAssignment

} from "../api/patrolAssignment";

import PatrolAssignmentTable from "../components/PatrolAssignment/PatrolAssignmentTable";
import PatrolAssignmentForm from "../components/PatrolAssignment/PatrolAssignmentForm";
import PatrolAssignmentView from "../components/PatrolAssignment/PatrolAssignmentView";
import PatrolAssignmentStatusDialog from "../components/PatrolAssignment/PatrolAssignmentStatusDialog";
import PatrolAssignmentDeleteDialog from "../components/PatrolAssignment/PatrolAssignmentDeleteDialog";

export default function PatrolAssignment(){

    const [assignments,setAssignments]=useState([]);

    const [dashboard,setDashboard]=useState({

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


    // ===========================================
    // Dashboard
    // ===========================================

    const loadDashboard=useCallback(async()=>{

        try{

            const res=await getPatrolAssignmentDashboard();

            setDashboard(res.data.data);

        }

        catch(err){

            console.log(err);

        }

    },[]);


    // ===========================================
    // Load Assignments
    // ===========================================

    const loadAssignments=useCallback(async()=>{

        try{

            setLoading(true);

            const res=await getPatrolAssignments();

            setAssignments(

                res.data.data || []

            );

        }

        catch(err){

            console.log(err);

        }

        finally{

            setLoading(false);

        }

    },[]);


    // ===========================================
    // Refresh
    // ===========================================

    const refresh=useCallback(()=>{

        loadDashboard();

        loadAssignments();

    },[

        loadDashboard,

        loadAssignments

    ]);


    useEffect(()=>{

        refresh();

    },[refresh]);


    // ===========================================
    // Add
    // ===========================================

    const addAssignment=()=>{

        setSelected(null);

        setEditMode(false);

        setShowForm(true);

    };


    // ===========================================
    // Edit
    // ===========================================

    const editAssignment=async(row)=>{

        try{

            const res=await getPatrolAssignment(

                row.id

            );

            setSelected(

                res.data.data

            );

            setEditMode(true);

            setShowForm(true);

        }

        catch(err){

            console.log(err);

        }

    };


    // ===========================================
    // View
    // ===========================================

    const viewAssignment=async(row)=>{

        try{

            const res=await getPatrolAssignment(

                row.id

            );

            setSelected(

                res.data.data

            );

            setShowView(true);

        }

        catch(err){

            console.log(err);

        }

    };


    // ===========================================
    // Status
    // ===========================================

    const statusAssignment=(row)=>{

        setSelected(row);

        setShowStatus(true);

    };


    // ===========================================
    // Delete
    // ===========================================

    const removeAssignment=(row)=>{

        setSelected(row);

        setShowDelete(true);

    };


    // ===========================================
    // After Save
    // ===========================================

    const afterSave=()=>{

        setShowForm(false);

        setSelected(null);

        setEditMode(false);

        refresh();

    };

        return (

        <DashboardLayout title="Patrol Assignment">

            {/* ===================================
                Header
            ==================================== */}

            <div className="gx-page-header">

                <div>

                    <h2>Patrol Assignment</h2>

                    <p>

                        Manage Employee Patrol Assignments

                    </p>

                </div>

                <div className="gx-header-actions">

                    <button

                        className="gx-btn-light"

                        onClick={refresh}

                    >

                        <FaSyncAlt />

                        &nbsp;

                        Refresh

                    </button>

                    <button

                        className="gx-btn-light"

                    >

                        <FaDownload />

                        &nbsp;

                        Export

                    </button>

                    <button

                        className="gx-btn-primary"

                        onClick={addAssignment}

                    >

                        <FaPlus />

                        &nbsp;

                        Add Assignment

                    </button>

                </div>

            </div>


            {/* ===================================
                Dashboard Cards
            ==================================== */}

            <div className="gx-summary">

                <div className="gx-card">

                    <FaClipboardList

                        className="gx-card-icon"

                    />

                    <h2>

                        {dashboard.total}

                    </h2>

                    <span>

                        Total Assignments

                    </span>

                </div>

                <div className="gx-card">

                    <FaCheckCircle

                        className="gx-card-icon success"

                    />

                    <h2>

                        {dashboard.active}

                    </h2>

                    <span>

                        Active

                    </span>

                </div>

                <div className="gx-card">

                    <FaTimesCircle

                        className="gx-card-icon danger"

                    />

                    <h2>

                        {dashboard.inactive}

                    </h2>

                    <span>

                        Inactive

                    </span>

                </div>

            </div>


            {/* ===================================
                Search
            ==================================== */}

            <div className="gx-toolbar">

                <div className="gx-search">

                    <FaSearch />

                    <input

                        type="text"

                        placeholder="Search Assignment..."

                        value={search}

                        onChange={(e)=>setSearch(

                            e.target.value

                        )}

                    />

                </div>

            </div>


            {/* ===================================
                Table
            ==================================== */}

            <PatrolAssignmentTable

                loading={loading}

                assignments={assignments}

                search={search}

                onView={viewAssignment}

                onEdit={editAssignment}

                onStatus={statusAssignment}

                onDelete={removeAssignment}

            />


            {/* ===================================
                Form
            ==================================== */}

            {

                showForm && (

                    <PatrolAssignmentForm

                        edit={editMode}

                        assignment={selected}

                        close={()=>{

                            setShowForm(false);

                            setSelected(null);

                            setEditMode(false);

                        }}

                        refresh={afterSave}

                    />

                )

            }


            {/* ===================================
                View
            ==================================== */}

            {

                showView && (

                    <PatrolAssignmentView

                        assignment={selected}

                        close={()=>{

                            setShowView(false);

                            setSelected(null);

                        }}

                    />

                )

            }


            {/* ===================================
                Status
            ==================================== */}

            {

                showStatus && (

                    <PatrolAssignmentStatusDialog

                        assignment={selected}

                        close={()=>{

                            setShowStatus(false);

                            setSelected(null);

                        }}

                        confirm={async()=>{

                            await changePatrolAssignmentStatus(

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


            {/* ===================================
                Delete
            ==================================== */}

            {

                showDelete && (

                    <PatrolAssignmentDeleteDialog

                        assignment={selected}

                        close={()=>{

                            setShowDelete(false);

                            setSelected(null);

                        }}

                        confirm={async()=>{

                            await deletePatrolAssignment(

                                selected.id

                            );

                            refresh();

                            setShowDelete(false);

                            setSelected(null);

                        }}

                    />

                )

            }

        </DashboardLayout>

    );

}