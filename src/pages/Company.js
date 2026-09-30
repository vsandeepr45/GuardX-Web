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

} from "react-icons/fa";
import {
    FaBuilding,
    FaCheckCircle,
    FaTimesCircle
} from "react-icons/fa";
import {

    getCompanies,
    getCompany,
    getCompanyDashboard

} from "../api/company";
import { changeCompanyStatus } from "../api/company";
import CompanyTable from "../components/Company/CompanyTable";

import CompanyForm from "../components/Company/CompanyForm";
import CompanyView from "../components/Company/CompanyView";
import CompanyStatusDialog from "../components/Company/CompanyStatusDialog";
import {

    useAuth

} from "../context/AuthContext";
import {

    exportCSV,
    exportExcel,
    exportPDF,
    printTable

} from "../utils/export";
import {

    hasPermission

} from "../utils/permissions";

function Company() {

    const { user } = useAuth();

    const [companies, setCompanies] = useState([]);

    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [editForm, setEditForm] = useState(false);

    const [selectedCompany, setSelectedCompany] = useState(null);
    const [viewOpen,setViewOpen]=useState(false);
    const [statusFilter, setStatusFilter] = useState("all");
    const [statusOpen,setStatusOpen]=useState(false);
    const [stats, setStats] = useState({

        total:0,

        active:0,

        inactive:0

    });

    

    const loadDashboard = async()=>{

        const res = await getCompanyDashboard();

        setStats(res.data.data);

    };

const exportData = companies.map((company) => ({

    "Company Code": company.company_code,

    "Company Name": company.company_name,

    "Company Type": company.company_type,

    Email: company.email,

    Phone: company.phone,

    City: company.city,

    State: company.state,

    Status: company.status ? "Active" : "Inactive"

}));

const handleExcel = () => {

    exportExcel(

        exportData,

        "Companies"

    );

};

const handleCSV = () => {

    exportCSV(

        exportData,

        "Companies"

    );

};

const handlePDF = () => {

    exportPDF(

        exportData,

        "Companies"

    );

};

const filteredExportData = companies
    .filter(company => {

        const matchSearch =
            company.company_name?.toLowerCase().includes(search.toLowerCase()) ||
            company.company_code?.toLowerCase().includes(search.toLowerCase()) ||
            company.city?.toLowerCase().includes(search.toLowerCase());

        const matchStatus =
            statusFilter === "all" ||
            String(company.status) === statusFilter;

        return matchSearch && matchStatus;

    })
    .map(company => ({

        "Company Code": company.company_code,

        "Company Name": company.company_name,

        "Company Type": company.company_type,

        Email: company.email,

        Phone: company.phone,

        City: company.city,

        State: company.state,

        Status: company.status ? "Active" : "Inactive"

    }));
const loadCompanies = async () => {

    try {

        setLoading(true);

        const response = await getCompanies();

        setCompanies(response.data.data);

    }

    catch (error) {

        console.log(error);

    }

    finally {

        setLoading(false);

    }

};

const refreshPage = () => {

    loadCompanies();

    loadDashboard();

};

useEffect(() => {

    refreshPage();

}, []);

    return (

        <DashboardLayout

            title="Company Master"

        >

            {/* Header */}

            <div className="page-header">

                <div>

                    <h2>

                        Company Management

                    </h2>

                    <p>

                        Manage all companies in GuardX ERP

                    </p>

                </div>

                {

                    hasPermission(user, "company_add") &&

                    <button

                        className="btn-primary"

                        onClick={() => setShowForm(true)}

                    >

                        <FaPlus />

                        &nbsp;

                        Add Company

                    </button>

                }

            </div>

            {/* Search & Filter */}

            <div className="toolbar">

                <div className="search-box">

                    <FaSearch />

                    <input

                        type="text"

                        placeholder="Search Company..."

                        value={search}

                        onChange={(e) =>
                            setSearch(e.target.value)
                        }

                    />

                </div>

<div className="toolbar-buttons">

    <select

        className="form-control"

        value={statusFilter}

        onChange={(e)=>setStatusFilter(e.target.value)}

    >

        <option value="all">

            All Companies

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

        <FaDownload />

        &nbsp;

        Export

    </button>

    <div className="export-dropdown">

        <button onClick={handleExcel}>

            📗 Excel

        </button>

        <button onClick={handleCSV}>

            📄 CSV

        </button>

        <button onClick={handlePDF}>

            📕 PDF

        </button>

        <button onClick={() => printTable(exportData)}>

            🖨 Print

        </button>

    </div>

</div>

                </div>

            </div>

<div className="gx-company-summary">

    <div className="gx-summary-card total">

        <div>

            <h2>{stats.total}</h2>

            <span>Total Companies</span>

        </div>

        <div className="gx-summary-icon">

            <FaBuilding />

        </div>

    </div>

    <div className="gx-summary-card active">

        <div>

            <h2>{stats.active}</h2>

            <span>Active Companies</span>

        </div>

        <div className="gx-summary-icon">

            <FaCheckCircle />

        </div>

    </div>

    <div className="gx-summary-card inactive">

        <div>

            <h2>{stats.inactive}</h2>

            <span>Inactive Companies</span>

        </div>

        <div className="gx-summary-icon">

            <FaTimesCircle />

        </div>

    </div>

</div>

            {/* Table */}

            <CompanyTable

                loading={loading}

                companies={companies}
                statusFilter={statusFilter}

                search={search}

                refresh={refreshPage}

onEdit={async(company)=>{

    try{

        const response = await getCompany(company.id);

        setSelectedCompany(response.data.data);

        setEditForm(true);

    }

    catch(err){

        console.log(err);

    }

}}

onStatus={(company)=>{

    setSelectedCompany(company);

    setStatusOpen(true);

}}
onView={async(company)=>{

    const response=await getCompany(company.id);

    setSelectedCompany(response.data.data);

    setViewOpen(true);

}}

            />

            {/* Form */}

{

showForm &&

<CompanyForm

    mode="add"

    refresh={refreshPage}

    close={()=>

        setShowForm(false)

    }

/>

}
{

viewOpen &&

<CompanyView

    company={selectedCompany}

    close={()=>{

        setViewOpen(false);

        setSelectedCompany(null);

    }}

/>

}
{

statusOpen &&

<CompanyStatusDialog

    open={statusOpen}

    company={selectedCompany}

    close={()=>{

        setStatusOpen(false);

        setSelectedCompany(null);

    }}

    confirm={async()=>{

        await changeCompanyStatus(

            selectedCompany.id,

            !selectedCompany.status

        );

        refreshPage();

        setStatusOpen(false);

        setSelectedCompany(null);

    }}

/>

}
{

editForm &&

<CompanyForm

    mode="edit"

    company={selectedCompany}

    refresh={refreshPage}

    close={()=>{

        setEditForm(false);

        setSelectedCompany(null);

    }}

/>

}

        </DashboardLayout>

    );

}

export default Company;