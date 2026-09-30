import React,{
    useState,
    useEffect
} from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import "../styles/company.css";

import {

    FaPlus,
    FaSearch,
    FaDownload,
    FaClock,
    FaCheckCircle,
    FaTimesCircle

} from "react-icons/fa";

import {

    getShifts,
    getShift,
    getShiftDashboard,
    changeShiftStatus,
    deleteShift

} from "../api/shift";

import {

    exportExcel,
    exportCSV,
    exportPDF,
    printTable

} from "../utils/export";

import ShiftTable from "../components/Shift/ShiftTable";
import ShiftForm from "../components/Shift/ShiftForm";
import ShiftView from "../components/Shift/ShiftView";
import ShiftStatusDialog from "../components/Shift/ShiftStatusDialog";
import ShiftDeleteDialog from "../components/Shift/ShiftDeleteDialog";

import { useAuth } from "../context/AuthContext";
import { hasPermission } from "../utils/permissions";

function Shift(){

    const { user } = useAuth();

    const [shifts,setShifts]=useState([]);

    const [loading,setLoading]=useState(false);

    const [search,setSearch]=useState("");

    const [statusFilter,setStatusFilter]=useState("all");

    const [stats,setStats]=useState({

        total:0,

        active:0,

        inactive:0

    });

    const [

        selectedShift,

        setSelectedShift

    ]=useState(null);

    const [

        showForm,

        setShowForm

    ]=useState(false);

    const [

        editForm,

        setEditForm

    ]=useState(false);

    const [

        viewOpen,

        setViewOpen

    ]=useState(false);

    const [

        statusOpen,

        setStatusOpen

    ]=useState(false);

    const [

        deleteOpen,

        setDeleteOpen

    ]=useState(false);

    const loadDashboard=async()=>{

    try{

        const response=

        await getShiftDashboard();

        setStats(

            response.data.data

        );

    }

    catch(err){

        console.log(err);

    }

};

const loadShifts=async()=>{

    try{

        setLoading(true);

        const response=

        await getShifts();

        setShifts(

            response.data.data

        );

    }

    catch(err){

        console.log(err);

    }

    finally{

        setLoading(false);

    }

};

const refreshPage=()=>{

    loadDashboard();

    loadShifts();

};

useEffect(()=>{

    refreshPage();

},[]);

const exportData=

shifts

.filter(item=>{

    const matchSearch=

        item.shift_name

        ?.toLowerCase()

        .includes(

            search.toLowerCase()

        )

        ||

        item.shift_code

        ?.toLowerCase()

        .includes(

            search.toLowerCase()

        );

    const matchStatus=

        statusFilter==="all"

        ||

        String(item.status)

        ===

        statusFilter;

    return(

        matchSearch

        &&

        matchStatus

    );

})

.map(item=>({

    Code:item.shift_code,

    Shift:item.shift_name,

    Start:item.start_time,

    End:item.end_time,

    Hours:item.working_hours,

    Status:

    item.status

    ?

    "Active"

    :

    "Inactive"

}));

return(

    <DashboardLayout

        title="Shift Master"

    >

        {/* ======================================
                PAGE HEADER
        ======================================= */}

        <div className="page-header">

            <div>

                <h2>

                    Shift Management

                </h2>

                <p>

                    Manage Employee Shift Master

                </p>

            </div>

            {

                hasPermission(

                    user,

                    "shift_add"

                )

                &&

                <button

                    className="btn-primary"

                    onClick={()=>{

                        setShowForm(true);

                    }}

                >

                    <FaPlus/>

                    &nbsp;

                    Add Shift

                </button>

            }

        </div>

        {/* ======================================
                TOOLBAR
        ======================================= */}

        <div className="toolbar">

            <div className="search-box">

                <FaSearch/>

                <input

                    placeholder="Search Shift..."

                    value={search}

                    onChange={(e)=>{

                        setSearch(

                            e.target.value

                        );

                    }}

                />

            </div>

            <div className="toolbar-buttons">

                <select

                    value={statusFilter}

                    className="form-control"

                    onChange={(e)=>{

                        setStatusFilter(

                            e.target.value

                        );

                    }}

                >

                    <option value="all">

                        All

                    </option>

                    <option value="true">

                        Active

                    </option>

                    <option value="false">

                        Inactive

                    </option>

                </select>

                <div className="export-menu">

                    <button

                        className="btn-light"

                    >

                        <FaDownload/>

                        Export

                    </button>

                    <div className="export-dropdown">

                        <button

                            onClick={()=>{

                                exportExcel(

                                    exportData,

                                    "Shift"

                                );

                            }}

                        >

                            Excel

                        </button>

                        <button

                            onClick={()=>{

                                exportCSV(

                                    exportData,

                                    "Shift"

                                );

                            }}

                        >

                            CSV

                        </button>

                        <button

                            onClick={()=>{

                                exportPDF(

                                    exportData,

                                    "Shift"

                                );

                            }}

                        >

                            PDF

                        </button>

                        <button

                            onClick={()=>{

                                printTable(

                                    exportData

                                );

                            }}

                        >

                            Print

                        </button>

                    </div>

                </div>

            </div>

        </div>

        {/* ======================================
                SUMMARY
        ======================================= */}

        <div className="gx-company-summary">

            <div className="gx-summary-card total">

                <div>

                    <h2>

                        {stats.total}

                    </h2>

                    <span>

                        Total Shifts

                    </span>

                </div>

                <FaClock

                    className="gx-summary-icon"

                />

            </div>

            <div className="gx-summary-card active">

                <div>

                    <h2>

                        {stats.active}

                    </h2>

                    <span>

                        Active

                    </span>

                </div>

                <FaCheckCircle

                    className="gx-summary-icon"

                />

            </div>

            <div className="gx-summary-card inactive">

                <div>

                    <h2>

                        {stats.inactive}

                    </h2>

                    <span>

                        Inactive

                    </span>

                </div>

                <FaTimesCircle

                    className="gx-summary-icon"

                />

            </div>

        </div>

        {/* ======================================
                TABLE
        ======================================= */}

        <ShiftTable

            loading={loading}

            shifts={shifts}

            search={search}

            statusFilter={statusFilter}

            refresh={refreshPage}

            onView={async(item)=>{

                const response=

                await getShift(item.id);

                setSelectedShift(

                    response.data.data

                );

                setViewOpen(true);

            }}

            onEdit={async(item)=>{

                const response=

                await getShift(item.id);

                setSelectedShift(

                    response.data.data

                );

                setEditForm(true);

            }}

            onStatus={(item)=>{

                setSelectedShift(item);

                setStatusOpen(true);

            }}

            onDelete={(item)=>{

                setSelectedShift(item);

                setDeleteOpen(true);

            }}

        />

                {

            showForm &&

            <ShiftForm

                close={()=>{

                    setShowForm(false);

                }}

                refresh={()=>{

                    setShowForm(false);

                    refreshPage();

                }}

            />

        }

        {

            editForm &&

            <ShiftForm

                edit={true}

                shift={selectedShift}

                close={()=>{

                    setEditForm(false);

                    setSelectedShift(null);

                }}

                refresh={()=>{

                    setEditForm(false);

                    setSelectedShift(null);

                    refreshPage();

                }}

            />

        }

        {

            viewOpen &&

            <ShiftView

                shift={selectedShift}

                close={()=>{

                    setViewOpen(false);

                    setSelectedShift(null);

                }}

            />

        }

        {

            statusOpen &&

            <ShiftStatusDialog

                open={statusOpen}

                shift={selectedShift}

                close={()=>{

                    setStatusOpen(false);

                    setSelectedShift(null);

                }}

                confirm={async()=>{

                    await changeShiftStatus(

                        selectedShift.id,

                        !selectedShift.status

                    );

                    refreshPage();

                    setStatusOpen(false);

                }}

            />

        }

        {

            deleteOpen &&

            <ShiftDeleteDialog

                open={deleteOpen}

                shift={selectedShift}

                close={()=>{

                    setDeleteOpen(false);

                    setSelectedShift(null);

                }}

                confirm={async()=>{

                    await deleteShift(

                        selectedShift.id

                    );

                    refreshPage();

                    setDeleteOpen(false);

                }}

            />

        }

    </DashboardLayout>

);

}

export default Shift;