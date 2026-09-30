import React, {
    useEffect,
    useState
} from "react";

import {

    createSite,

    updateSite

} from "../../api/site";

import {

    getCompanyDropdown

} from "../../api/company";

import {

    getClientDropdown

} from "../../api/client";

import {

    getProjectDropdown

} from "../../api/project";

function SiteForm({

    mode,

    site,

    refresh,

    close

}){

    const [companies,setCompanies]=useState([]);

    const [clients,setClients]=useState([]);

    const [projects,setProjects]=useState([]);

    const [filteredClients,setFilteredClients]=useState([]);

    const [filteredProjects,setFilteredProjects]=useState([]);

    const [saving,setSaving]=useState(false);
    

    const [form,setForm]=useState({

        company_id:"",

        client_id:"",

        project_id:"",

        site_code:"",

        site_name:"",

        site_type:"",

        site_manager:"",

        contact_person:"",

        mobile:"",

        alternate_mobile:"",

        email:"",

        website:"",

        address:"",

        country:"India",

        state:"",

        district:"",

        city:"",

        pincode:"",

        latitude:"",

        longitude:"",

        shift_type:"",

        working_hours:"",

        total_guards:0,

        remarks:"",

        status:true

    });

    /*
    ==================================
    LOAD DROPDOWNS
    ==================================
    */

    const loadDropdowns=async()=>{

        try{

            const [

                companyRes,

                clientRes,

                projectRes

            ]=await Promise.all([

                getCompanyDropdown(),

                getClientDropdown(),

                getProjectDropdown()

            ]);

            setCompanies(companyRes.data.data);

            setClients(clientRes.data.data);

            setProjects(projectRes.data.data);

        }

        catch(err){

            console.log(err);

        }

    };

    /*
    ==================================
    EDIT MODE
    ==================================
    */

    useEffect(()=>{

        loadDropdowns();

        if(mode==="edit" && site){

            setForm({

                ...site

            });

        }

    },[]);

    /*
    ==================================
    FILTER CLIENTS
    ==================================
    */

    useEffect(()=>{

        if(!form.company_id){

            setFilteredClients([]);

            return;

        }

        const list=

            clients.filter(c=>

                Number(c.company_id)===

                Number(form.company_id)

            );

        setFilteredClients(list);

    },[

        form.company_id,

        clients

    ]);

    /*
    ==================================
    FILTER PROJECTS
    ==================================
    */

    useEffect(()=>{

        if(!form.client_id){

            setFilteredProjects([]);

            return;

        }

        const list=

            projects.filter(p=>

                Number(p.client_id)===

                Number(form.client_id)

            );

        setFilteredProjects(list);

    },[

        form.client_id,

        projects

    ]);

    /*
    ==================================
    INPUT CHANGE
    ==================================
    */

    const handleChange=(e)=>{

        const {

            name,

            value,

            type,

            checked

        }=e.target;

        setForm(prev=>({

            ...prev,

            [name]:

                type==="checkbox"

                ?

                checked

                :

                value

        }));

    };


    /*
=====================================
SAVE SITE
=====================================
*/

const handleSubmit = async (e)=>{

    e.preventDefault();

    try{

        setSaving(true);

        if(!form.company_id){

            alert("Select Company");

            return;

        }

        if(!form.client_id){

            alert("Select Client");

            return;

        }

        if(!form.project_id){

            alert("Select Project");

            return;

        }

        if(!form.site_code){

            alert("Enter Site Code");

            return;

        }

        if(!form.site_name){

            alert("Enter Site Name");

            return;

        }

        if(mode==="add"){

            await createSite(form);

        }

        else{

            await updateSite(

                site.id,

                form

            );

        }

        refresh();

        close();

    }

    catch(err){

        console.log(err);

        alert(

            err.response?.data?.message ||

            "Unable to save Site."

        );

    }

    finally{

        setSaving(false);

    }

};
    /*
==================================
BASIC INFORMATION
==================================
*/

return (

<div className="gx-modal">

<div className="gx-site-form">

    {/* ===========================================
        HERO HEADER
    =========================================== */}

    <div className="gx-form-hero">

        <div>

            <h2>

                🏢

                {

                    mode==="add"

                    ?

                    " Create New Site"

                    :

                    " Update Site"

                }

            </h2>

            <p>

                Manage security deployment locations for projects.

            </p>

        </div>

        <button

            className="gx-close-btn"

            onClick={close}

        >

            ✕

        </button>

    </div>


    {/* ===========================================
        STEPPER
    =========================================== */}
<form onSubmit={handleSubmit}>
    <div className="gx-stepper">

        <div className="gx-step active">

            <span>1</span>

            Basic

        </div>

        <div className="gx-step">

            <span>2</span>

            Contact

        </div>

        <div className="gx-step">

            <span>3</span>

            Address

        </div>

        <div className="gx-step">

            <span>4</span>

            Operations

        </div>

        <div className="gx-step">

            <span>5</span>

            Finish

        </div>

    </div>


    {/* ===========================================
        BASIC INFORMATION CARD
    =========================================== */}

    <div className="gx-form-card">

        <div className="gx-card-title">

            🏢 Basic Information

        </div>

        <div className="gx-grid-2">

            <div className="gx-input-group">

                <label>

                    Company

                </label>

                <select

                    name="company_id"

                    value={form.company_id}

                    onChange={handleChange}

                >

                    <option value="">

                        Select Company

                    </option>

                    {

                        companies.map(company=>(

                            <option

                                key={company.id}

                                value={company.id}

                            >

                                {company.company_name}

                            </option>

                        ))

                    }

                </select>

            </div>

            <div className="gx-input-group">

                <label>

                    Client

                </label>

                <select

                    name="client_id"

                    value={form.client_id}

                    onChange={handleChange}

                >

                    <option value="">

                        Select Client

                    </option>

                    {

                        filteredClients.map(client=>(

                            <option

                                key={client.id}

                                value={client.id}

                            >

                                {client.client_name}

                            </option>

                        ))

                    }

                </select>

            </div>

            <div className="gx-input-group">

                <label>

                    Project

                </label>

                <select

                    name="project_id"

                    value={form.project_id}

                    onChange={handleChange}

                >

                    <option value="">

                        Select Project

                    </option>

                    {

                        filteredProjects.map(project=>(

                            <option

                                key={project.id}

                                value={project.id}

                            >

                                {project.project_name}

                            </option>

                        ))

                    }

                </select>

            </div>

            <div className="gx-input-group">

                <label>

                    Site Code

                </label>

                <input

                    name="site_code"

                    value={form.site_code}

                    onChange={handleChange}

                    placeholder="SITE0001"

                />

            </div>

            <div className="gx-input-group gx-full">

                <label>

                    Site Name

                </label>

                <input

                    name="site_name"

                    value={form.site_name}

                    onChange={handleChange}

                    placeholder="Enter Site Name"

                />

            </div>

            <div className="gx-input-group">

                <label>

                    Site Type

                </label>

                <select

                    name="site_type"

                    value={form.site_type}

                    onChange={handleChange}

                >

                    <option>

                        Corporate

                    </option>

                    <option>

                        Residential

                    </option>

                    <option>

                        Industrial

                    </option>

                    <option>

                        Commercial

                    </option>

                    <option>

                        Government

                    </option>

                </select>

            </div>

        </div>

    </div>

    {/* ===========================================
    CONTACT INFORMATION
=========================================== */}

<div className="gx-form-card">

    <div className="gx-card-title">

        📞 Contact Information

    </div>

    <div className="gx-grid-2">

        <div className="gx-input-group">

            <label>

                Site Manager

            </label>

            <input

                name="site_manager"

                value={form.site_manager}

                onChange={handleChange}

                placeholder="Manager Name"

            />

        </div>

        <div className="gx-input-group">

            <label>

                Contact Person

            </label>

            <input

                name="contact_person"

                value={form.contact_person}

                onChange={handleChange}

                placeholder="Contact Person"

            />

        </div>

        <div className="gx-input-group">

            <label>

                Mobile Number

            </label>

            <input

                name="mobile"

                value={form.mobile}

                onChange={handleChange}

                placeholder="9876543210"

            />

        </div>

        <div className="gx-input-group">

            <label>

                Alternate Mobile

            </label>

            <input

                name="alternate_mobile"

                value={form.alternate_mobile}

                onChange={handleChange}

                placeholder="9876543210"

            />

        </div>

        <div className="gx-input-group">

            <label>

                Email

            </label>

            <input

                type="email"

                name="email"

                value={form.email}

                onChange={handleChange}

                placeholder="site@company.com"

            />

        </div>

        <div className="gx-input-group">

            <label>

                Website

            </label>

            <input

                name="website"

                value={form.website}

                onChange={handleChange}

                placeholder="https://"

            />

        </div>

    </div>

</div>



{/* ===========================================
    ADDRESS INFORMATION
=========================================== */}

<div className="gx-form-card">

    <div className="gx-card-title">

        📍 Address Information

    </div>

    <div className="gx-grid-2">

        <div className="gx-input-group gx-full">

            <label>

                Address

            </label>

            <textarea

                rows="4"

                name="address"

                value={form.address}

                onChange={handleChange}

                placeholder="Complete Address"

            />

        </div>

        <div className="gx-input-group">

            <label>

                Country

            </label>

            <input

                name="country"

                value={form.country}

                onChange={handleChange}

            />

        </div>

        <div className="gx-input-group">

            <label>

                State

            </label>

            <input

                name="state"

                value={form.state}

                onChange={handleChange}

            />

        </div>

        <div className="gx-input-group">

            <label>

                District

            </label>

            <input

                name="district"

                value={form.district}

                onChange={handleChange}

            />

        </div>

        <div className="gx-input-group">

            <label>

                City

            </label>

            <input

                name="city"

                value={form.city}

                onChange={handleChange}

            />

        </div>

        <div className="gx-input-group">

            <label>

                Pincode

            </label>

            <input

                name="pincode"

                value={form.pincode}

                onChange={handleChange}

            />

        </div>

    </div>

</div>
{/* ===========================================
    GPS LOCATION
=========================================== */}

<div className="gx-form-card">

    <div className="gx-card-title">

        🌍 GPS Location

    </div>

    <div className="gx-grid-2">

        <div className="gx-input-group">

            <label>

                Latitude

            </label>

            <input

                name="latitude"

                value={form.latitude}

                onChange={handleChange}

                placeholder="17.3850"

            />

        </div>

        <div className="gx-input-group">

            <label>

                Longitude

            </label>

            <input

                name="longitude"

                value={form.longitude}

                onChange={handleChange}

                placeholder="78.4867"

            />

        </div>

    </div>

</div>


{/* ===========================================
    OPERATION DETAILS
=========================================== */}

<div className="gx-form-card">

    <div className="gx-card-title">

        ⚙ Operational Information

    </div>

    <div className="gx-grid-2">

        <div className="gx-input-group">

            <label>

                Shift Type

            </label>

            <select

                name="shift_type"

                value={form.shift_type}

                onChange={handleChange}

            >

                <option value="">

                    Select Shift

                </option>

                <option>

                    Day

                </option>

                <option>

                    Night

                </option>

                <option>

                    Rotational

                </option>

                <option>

                    24 Hours

                </option>

            </select>

        </div>

        <div className="gx-input-group">

            <label>

                Working Hours

            </label>

            <input

                type="number"

                name="working_hours"

                value={form.working_hours}

                onChange={handleChange}

                placeholder="12"

            />

        </div>

        <div className="gx-input-group">

            <label>

                Total Guards

            </label>

            <input

                type="number"

                name="total_guards"

                value={form.total_guards}

                onChange={handleChange}

                placeholder="15"

            />

        </div>

        <div className="gx-input-group">

            <label>

                Status

            </label>

            <select

                name="status"

                value={String(form.status)}

                onChange={(e)=>setForm({

                    ...form,

                    status:e.target.value==="true"

                })}

            >

                <option value="true">

                    Active

                </option>

                <option value="false">

                    Inactive

                </option>

            </select>

        </div>

    </div>

</div>


{/* ===========================================
    REMARKS
=========================================== */}

<div className="gx-form-card">

    <div className="gx-card-title">

        📝 Additional Information

    </div>

    <div className="gx-input-group">

        <label>

            Remarks

        </label>

        <textarea

            rows="5"

            name="remarks"

            value={form.remarks}

            onChange={handleChange}

            placeholder="Enter Remarks..."

        />

    </div>

</div>


{/* ===========================================
    FOOTER
=========================================== */}

<div className="gx-form-footer">

    <button

        type="button"

        className="btn-light"

        onClick={close}

    >

        Cancel

    </button>

    <button

        type="submit"

        className="btn-primary"

    >

        {

            saving

            ?

            "Saving..."

            :

            mode==="add"

            ?

            "Create Site"

            :

            "Update Site"

        }

    </button>

</div>

</form>

</div>

</div>

);
}

export default SiteForm;