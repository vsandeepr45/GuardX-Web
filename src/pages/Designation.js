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
    FaUserTie,
    FaCheckCircle,
    FaTimesCircle

} from "react-icons/fa";

import {

    getDesignations,
    getDesignation,
    getDesignationDashboard,
    changeDesignationStatus,
    deleteDesignation

} from "../api/designation";

import {

    exportExcel,
    exportCSV,
    exportPDF,
    printTable

} from "../utils/export";

import DesignationTable from "../components/Designation/DesignationTable";
import DesignationForm from "../components/Designation/DesignationForm";
import DesignationView from "../components/Designation/DesignationView";
import DesignationStatusDialog from "../components/Designation/DesignationStatusDialog";
import DesignationDeleteDialog from "../components/Designation/DesignationDeleteDialog";

import {

    useAuth

} from "../context/AuthContext";

import {

    hasPermission

} from "../utils/permissions";

function Designation(){

    const { user } = useAuth();

    const [

        designations,
        setDesignations

    ] = useState([]);

    const [

        loading,
        setLoading

    ] = useState(false);

    const [

        search,
        setSearch

    ] = useState("");

    const [

        statusFilter,
        setStatusFilter

    ] = useState("all");

    const [

        stats,
        setStats

    ] = useState({

        total:0,

        active:0,

        inactive:0

    });

    const [

        selectedDesignation,
        setSelectedDesignation

    ] = useState(null);

    const [

        showForm,
        setShowForm

    ] = useState(false);

    const [

        editForm,
        setEditForm

    ] = useState(false);

    const [

        viewOpen,
        setViewOpen

    ] = useState(false);

    const [

        statusOpen,
        setStatusOpen

    ] = useState(false);

    const [

        deleteOpen,
        setDeleteOpen

    ] = useState(false);

    const loadDashboard = async()=>{

    try{

        const response =

            await getDesignationDashboard();

        setStats(

            response.data.data

        );

    }

    catch(err){

        console.log(err);

    }

};

const loadDesignations = async()=>{

    try{

        setLoading(true);

        const response =

            await getDesignations();

        setDesignations(

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

    loadDesignations();

};

useEffect(()=>{

    refreshPage();

},[]);


const exportData =

designations

.filter(item=>{

    const matchSearch=

        item.designation_name

        ?.toLowerCase()

        .includes(

            search.toLowerCase()

        )

        ||

        item.designation_code

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

    Code:item.designation_code,

    Designation:item.designation_name,

    Department:item.department_name,

    Site:item.site_name,

    Status:

    item.status

    ?

    "Active"

    :

    "Inactive"

}));

return(

    <DashboardLayout

        title="Designation Master"

    >

        {/* ===================================
            HEADER
        ==================================== */}

        <div className="page-header">

            <div>

                <h2>

                    Designation Management

                </h2>

                <p>

                    Manage all Employee Designations

                </p>

            </div>

            {

                hasPermission(

                    user,

                    "designation_add"

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

                    Add Designation

                </button>

            }

        </div>

        {/* ===================================
            TOOLBAR
        ==================================== */}

        <div className="toolbar">

            <div className="search-box">

                <FaSearch/>

                <input

                    placeholder="Search Designation..."

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

                    className="form-control"

                    value={statusFilter}

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

                    <button className="btn-light">

                        <FaDownload/>

                        &nbsp;

                        Export

                    </button>

                    <div className="export-dropdown">

                        <button

                            onClick={()=>{

                                exportExcel(

                                    exportData,

                                    "Designation"

                                );

                            }}

                        >

                            Excel

                        </button>

                        <button

                            onClick={()=>{

                                exportCSV(

                                    exportData,

                                    "Designation"

                                );

                            }}

                        >

                            CSV

                        </button>

                        <button

                            onClick={()=>{

                                exportPDF(

                                    exportData,

                                    "Designation"

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

        {/* ===================================
            SUMMARY
        ==================================== */}

        <div className="gx-company-summary">

            <div className="gx-summary-card total">

                <div>

                    <h2>

                        {stats.total}

                    </h2>

                    <span>

                        Total Designations

                    </span>

                </div>

                <FaUserTie

                    className="gx-summary-icon"

                />

            </div>

            <div className="gx-summary-card active">

                <div>

                    <h2>

                        {stats.active}

                    </h2>

                    <span>

                        Active Designations

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

                        Inactive Designations

                    </span>

                </div>

                <FaTimesCircle

                    className="gx-summary-icon"

                />

            </div>

        </div>

        {/* ===================================
            TABLE
        ==================================== */}

        <DesignationTable

            loading={loading}

            designations={designations}

            search={search}

            statusFilter={statusFilter}

            refresh={refreshPage}

            onView={async(item)=>{

                try{

                    const response=

                    await getDesignation(

                        item.id

                    );

                    setSelectedDesignation(

                        response.data.data

                    );

                    setViewOpen(true);

                }

                catch(err){

                    console.log(err);

                }

            }}

            onEdit={async(item)=>{

                try{

                    const response=

                    await getDesignation(

                        item.id

                    );

                    setSelectedDesignation(

                        response.data.data

                    );

                    setEditForm(true);

                }

                catch(err){

                    console.log(err);

                }

            }}

            onStatus={(item)=>{

                setSelectedDesignation(item);

                setStatusOpen(true);

            }}

            onDelete={(item)=>{

                setSelectedDesignation(item);

                setDeleteOpen(true);

            }}

        />

                {/* ===================================
            ADD DESIGNATION
        ==================================== */}

        {

            showForm &&

            <DesignationForm

                close={()=>{

                    setShowForm(false);

                }}

                refresh={()=>{

                    setShowForm(false);

                    refreshPage();

                }}

            />

        }

        {/* ===================================
            EDIT DESIGNATION
        ==================================== */}

        {

            editForm &&

            <DesignationForm

                edit={true}

                designation={selectedDesignation}

                close={()=>{

                    setEditForm(false);

                    setSelectedDesignation(null);

                }}

                refresh={()=>{

                    setEditForm(false);

                    setSelectedDesignation(null);

                    refreshPage();

                }}

            />

        }

        {/* ===================================
            VIEW
        ==================================== */}

        {

            viewOpen &&

            <DesignationView

                designation={selectedDesignation}

                close={()=>{

                    setViewOpen(false);

                    setSelectedDesignation(null);

                }}

            />

        }

        {/* ===================================
            STATUS
        ==================================== */}

        {

            statusOpen &&

            <DesignationStatusDialog

                open={statusOpen}

                designation={selectedDesignation}

                close={()=>{

                    setStatusOpen(false);

                    setSelectedDesignation(null);

                }}

                confirm={async()=>{

                    try{

                        await changeDesignationStatus(

                            selectedDesignation.id,

                            !selectedDesignation.status

                        );

                        refreshPage();

                    }

                    catch(err){

                        console.log(err);

                    }

                    finally{

                        setStatusOpen(false);

                        setSelectedDesignation(null);

                    }

                }}

            />

        }

        {/* ===================================
            DELETE
        ==================================== */}

        {

            deleteOpen &&

            <DesignationDeleteDialog

                open={deleteOpen}

                designation={selectedDesignation}

                close={()=>{

                    setDeleteOpen(false);

                    setSelectedDesignation(null);

                }}

                confirm={async()=>{

                    try{

                        await deleteDesignation(

                            selectedDesignation.id

                        );

                        refreshPage();

                    }

                    catch(err){

                        console.log(err);

                    }

                    finally{

                        setDeleteOpen(false);

                        setSelectedDesignation(null);

                    }

                }}

            />

        }

    </DashboardLayout>

);

}

export default Designation;