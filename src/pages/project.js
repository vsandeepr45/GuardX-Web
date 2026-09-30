import React, {
    useEffect,
    useState
} from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import "../styles/company.css";

import {

    FaPlus,
    FaSearch,
    FaDownload,
    FaBuilding,
    FaCheckCircle,
    FaTimesCircle

} from "react-icons/fa";

import {

    getProjects,
    getProject,
    getProjectDashboard,
    changeProjectStatus

} from "../api/project";

import {

    exportExcel,
    exportCSV,
    exportPDF,
    printTable

} from "../utils/export";

import ProjectTable from "../components/Project/ProjectTable";
import ProjectForm from "../components/Project/ProjectForm";
import ProjectView from "../components/Project/ProjectView";
import ProjectStatusDialog from "../components/Project/ProjectStatusDialog";

import {

    useAuth

} from "../context/AuthContext";

import {

    hasPermission

} from "../utils/permissions";

function Project(){

    const { user } = useAuth();

    const [projects,setProjects]=useState([]);

    const [loading,setLoading]=useState(false);

    const [search,setSearch]=useState("");

    const [statusFilter,setStatusFilter]=useState("all");

    const [showForm,setShowForm]=useState(false);

    const [editForm,setEditForm]=useState(false);

    const [viewOpen,setViewOpen]=useState(false);

    const [statusOpen,setStatusOpen]=useState(false);

    const [selectedProject,setSelectedProject]=useState(null);

    const [stats,setStats]=useState({

        total:0,

        active:0,

        inactive:0

    });

    /*
    ===============================
    Dashboard
    ===============================
    */

    const loadDashboard=async()=>{

        try{

            const response=await getProjectDashboard();

            setStats(response.data.data);

        }

        catch(err){

            console.log(err);

        }

    };

    /*
    ===============================
    Projects
    ===============================
    */

    const loadProjects=async()=>{

        try{

            setLoading(true);

            const response=await getProjects();

            setProjects(response.data.data);

        }

        catch(err){

            console.log(err);

        }

        finally{

            setLoading(false);

        }

    };

    const refreshPage=()=>{

        loadProjects();

        loadDashboard();

    };

    useEffect(()=>{

        refreshPage();

    },[]);

        const exportData = projects

    .filter(project=>{

        const matchSearch=

            project.project_name

            ?.toLowerCase()

            .includes(search.toLowerCase())

            ||

            project.project_code

            ?.toLowerCase()

            .includes(search.toLowerCase());

        const matchStatus=

            statusFilter==="all"

            ||

            String(project.status)===statusFilter;

        return matchSearch && matchStatus;

    })

    .map(project=>({

        "Project Code":project.project_code,

        "Project Name":project.project_name,

        Company:project.company_name,

        Client:project.client_name,

        Manager:project.project_manager,

        City:project.city,

        Status:project.status

        ?

        "Active"

        :

        "Inactive"

    }));

        return(

        <DashboardLayout

            title="Project Master"

        >

            <div className="page-header">

                <div>

                    <h2>

                        Project Management

                    </h2>

                    <p>

                        Manage all Projects

                    </p>

                </div>

                {

                    hasPermission(user,"project_add") &&

                    <button

                        className="btn-primary"

                        onClick={()=>

                            setShowForm(true)

                        }

                    >

                        <FaPlus/>

                        &nbsp;

                        Add Project

                    </button>

                }

            </div>

                        <div className="toolbar">

                <div className="search-box">

                    <FaSearch/>

                    <input

                        placeholder="Search Project..."

                        value={search}

                        onChange={(e)=>

                            setSearch(e.target.value)

                        }

                    />

                </div>

                <div className="toolbar-buttons">

                    <select

                        className="form-control"

                        value={statusFilter}

                        onChange={(e)=>

                            setStatusFilter(e.target.value)

                        }

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

                            <button onClick={()=>exportExcel(exportData,"Projects")}>

                                Excel

                            </button>

                            <button onClick={()=>exportCSV(exportData,"Projects")}>

                                CSV

                            </button>

                            <button onClick={()=>exportPDF(exportData,"Projects")}>

                                PDF

                            </button>

                            <button onClick={()=>printTable(exportData)}>

                                Print

                            </button>

                        </div>

                    </div>

                </div>

            </div>

                        <div className="gx-company-summary">

                <div className="gx-summary-card total">

                    <div>

                        <h2>{stats.total}</h2>

                        <span>Total Projects</span>

                    </div>

                    <FaBuilding className="gx-summary-icon"/>

                </div>

                <div className="gx-summary-card active">

                    <div>

                        <h2>{stats.active}</h2>

                        <span>Active Projects</span>

                    </div>

                    <FaCheckCircle className="gx-summary-icon"/>

                </div>

                <div className="gx-summary-card inactive">

                    <div>

                        <h2>{stats.inactive}</h2>

                        <span>Inactive Projects</span>

                    </div>

                    <FaTimesCircle className="gx-summary-icon"/>

                </div>

            </div>

            <ProjectTable

    loading={loading}

    projects={projects}

    search={search}

    statusFilter={statusFilter}

    refresh={refreshPage}

    onView={async(project)=>{

        try{

            const response=await getProject(project.id);

            setSelectedProject(response.data.data);

            setViewOpen(true);

        }

        catch(err){

            console.log(err);

        }

    }}

    onEdit={async(project)=>{

        try{

            const response=await getProject(project.id);

            setSelectedProject(response.data.data);

            setEditForm(true);

        }

        catch(err){

            console.log(err);

        }

    }}

    onStatus={(project)=>{

        setSelectedProject(project);

        setStatusOpen(true);

    }}

/>
{

showForm &&

<ProjectForm

    mode="add"

    refresh={refreshPage}

    close={()=>{

        setShowForm(false);

    }}

/>

}
{

editForm &&

<ProjectForm

    mode="edit"

    project={selectedProject}

    refresh={refreshPage}

    close={()=>{

        setEditForm(false);

        setSelectedProject(null);

    }}

/>

}
{

viewOpen &&

<ProjectView

    project={selectedProject}

    close={()=>{

        setViewOpen(false);

        setSelectedProject(null);

    }}

/>

}
{

statusOpen &&

<ProjectStatusDialog

    open={statusOpen}

    project={selectedProject}

    close={()=>{

        setStatusOpen(false);

        setSelectedProject(null);

    }}

    confirm={async()=>{

        try{

            await changeProjectStatus(

                selectedProject.id,

                !selectedProject.status

            );

            refreshPage();

        }

        catch(err){

            console.log(err);

        }

        finally{

            setStatusOpen(false);

            setSelectedProject(null);

        }

    }}

/>

}
        </DashboardLayout>

    );

}

export default Project;