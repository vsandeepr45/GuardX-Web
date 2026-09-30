

import React, {
    useEffect,
    useState
} from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import "../styles/employee.css";

import SiteManpowerTable from "../components/SiteManpower/SiteManpowerTable";
import SiteManpowerForm from "../components/SiteManpower/SiteManpowerForm";
import SiteManpowerView from "../components/SiteManpower/SiteManpowerView";
import SiteManpowerStatusDialog from "../components/SiteManpower/SiteManpowerStatusDialog";
import SiteManpowerDeleteDialog from "../components/SiteManpower/SiteManpowerDeleteDialog";

import {

    getSiteManpower,

    getSiteManpowerDashboard,

    getSingleSiteManpower,

    createSiteManpower,

    updateSiteManpower,

    deleteSiteManpower,

    changeSiteManpowerStatus

} from "../api/siteManpower";

function SiteManpower(){

    const [loading,setLoading]=useState(true);

    const [manpower,setManpower]=useState([]);

    const [dashboard,setDashboard]=useState({});

    const [selected,setSelected]=useState(null);

    const [searchTerm,setSearchTerm]=useState("");

    const [formOpen,setFormOpen]=useState(false);

    const [viewOpen,setViewOpen]=useState(false);

    const [statusOpen,setStatusOpen]=useState(false);

    const [deleteOpen,setDeleteOpen]=useState(false);

    /*
    ==========================================
    DASHBOARD COUNTS
    ==========================================
    */

    const totalRecords=manpower.length;

    const activeRecords=manpower.filter(

        item=>item.status===true

    ).length;

    const inactiveRecords=

        manpower.filter(

            item=>item.status===false

        ).length;

    const totalRequired=

        manpower.reduce(

            (sum,item)=>

            sum+

            Number(item.required_guards||0),

            0

        );

    const totalAssigned=

        manpower.reduce(

            (sum,item)=>

            sum+

            Number(item.assigned_guards||0),

            0

        );

    const totalVacancies=

        totalRequired-

        totalAssigned;

    /*
    ==========================================
    LOAD DATA
    ==========================================
    */

    const loadData=async()=>{

        try{

            setLoading(true);

            const [

                manpowerRes,

                dashboardRes

            ]=await Promise.all([

                getSiteManpower(),

                getSiteManpowerDashboard()

            ]);

            setManpower(

                manpowerRes.data.data||[]

            );

            setDashboard(

                dashboardRes.data.data||{}

            );

        }

        catch(err){

            console.log(err);

        }

        finally{

            setLoading(false);

        }

    };

    useEffect(()=>{

        loadData();

    },[]);

    /*
==========================================
OPEN ADD
==========================================
*/

const openAdd = () => {

    setSelected(null);

    setFormOpen(true);

};

/*
==========================================
OPEN EDIT
==========================================
*/

const openEdit = async (row) => {

    try {

        const res = await getSingleSiteManpower(row.id);

        setSelected(

            res.data.data

        );

        setFormOpen(true);

    }

    catch (err) {

        console.log(err);

    }

};

/*
==========================================
OPEN VIEW
==========================================
*/

const openView = (row) => {

    setSelected(row);

    setViewOpen(true);

};

/*
==========================================
OPEN STATUS
==========================================
*/

const openStatus = (row) => {

    setSelected(row);

    setStatusOpen(true);

};

/*
==========================================
OPEN DELETE
==========================================
*/

const openDelete = (row) => {

    setSelected(row);

    setDeleteOpen(true);

};

/*
==========================================
SAVE
==========================================
*/

const handleSave = async (data) => {

    try {

        if (

            selected &&

            selected.id

        ) {

            await updateSiteManpower(

                selected.id,

                data

            );

        }

        else {

            await createSiteManpower(data);

        }

        setFormOpen(false);

        loadData();

    }

    catch (err) {

        console.log(err);

    }

};

/*
==========================================
DELETE
==========================================
*/

const handleDelete = async (id) => {

    try {

        await deleteSiteManpower(id);

        setDeleteOpen(false);

        loadData();

    }

    catch (err) {

        console.log(err);

    }

};

/*
==========================================
STATUS
==========================================
*/

const handleStatus = async (

    id,

    status

) => {

    try {

        await changeSiteManpowerStatus(

            id,

            status

        );

        setStatusOpen(false);

        loadData();

    }

    catch (err) {

        console.log(err);

    }

};

/*
==========================================
SEARCH
==========================================
*/

const filteredManpower = manpower.filter(

    (item) => {

        const search =

            searchTerm.toLowerCase();

        return (

            (item.company_name || "")

                .toLowerCase()

                .includes(search)

            ||

            (item.client_name || "")

                .toLowerCase()

                .includes(search)

            ||

            (item.project_name || "")

                .toLowerCase()

                .includes(search)

            ||

            (item.site_name || "")

                .toLowerCase()

                .includes(search)

            ||

            (item.post_name || "")

                .toLowerCase()

                .includes(search)

            ||

            (item.shift_name || "")

                .toLowerCase()

                .includes(search)

        );

    }

);

return (

    <DashboardLayout title="Site Manpower">

        <div className="gx-toolbar">

            <div>

                <h2>

                    Site Manpower

                </h2>

                <p>

                    Manage site manpower requirements

                </p>

            </div>

            <div className="gx-toolbar-right">

                <input

                    type="text"

                    className="gx-search"

                    placeholder="Search..."

                    value={searchTerm}

                    onChange={(e)=>

                        setSearchTerm(

                            e.target.value

                        )

                    }

                />

                <button

                    className="gx-add-btn"

                    onClick={openAdd}

                >

                    + Add Site Manpower

                </button>

            </div>

        </div>

        <div className="dp-dashboard-cards">

            <div className="dp-dashboard-card">

                <h2>

                    {totalRecords}

                </h2>

                <p>

                    Total Records

                </p>

            </div>

            <div className="dp-dashboard-card">

                <h2>

                    {activeRecords}

                </h2>

                <p>

                    Active

                </p>

            </div>

            <div className="dp-dashboard-card">

                <h2>

                    {inactiveRecords}

                </h2>

                <p>

                    Inactive

                </p>

            </div>

            <div className="dp-dashboard-card">

                <h2>

                    {totalRequired}

                </h2>

                <p>

                    Required Guards

                </p>

            </div>

            <div className="dp-dashboard-card">

                <h2>

                    {totalAssigned}

                </h2>

                <p>

                    Assigned Guards

                </p>

            </div>

            <div className="dp-dashboard-card">

                <h2>

                    {totalVacancies}

                </h2>

                <p>

                    Vacancies

                </p>

            </div>

        </div>

<SiteManpowerTable

    manpower={filteredManpower}

    loading={loading}

    search={searchTerm}

    statusFilter="all"

    onView={openView}

    onEdit={openEdit}

    onStatus={openStatus}

    onDelete={openDelete}

/>

        
            <SiteManpowerForm

            open={formOpen}

            mode={

                selected

                ?

                "edit"

                :

                "add"

            }

            manpower={selected}

            refresh={loadData}

            close={()=>

                setFormOpen(false)

            }

        />

        <SiteManpowerView

            open={viewOpen}

            manpower={selected}

            close={()=>

                setViewOpen(false)

            }

        />

        <SiteManpowerStatusDialog

            open={statusOpen}

            manpower={selected}

            close={()=>

                setStatusOpen(false)

            }

            confirm={(status)=>

                handleStatus(

                    selected.id,

                    status

                )

            }

        />

        <SiteManpowerDeleteDialog

            open={deleteOpen}

            manpower={selected}

            close={()=>

                setDeleteOpen(false)

            }

            confirm={()=>

                handleDelete(

                    selected.id

                )

            }

        />

            </DashboardLayout>

);

}

export default SiteManpower;