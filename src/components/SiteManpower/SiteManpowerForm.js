import React, { useState, useEffect } from "react";

import "../../styles/DeploymentForm.css";

import {
    createSiteManpower,
    updateSiteManpower
} from "../../api/siteManpower";

import {
    getCompanyDropdown
} from "../../api/company";

import {
    getClientDropdown
} from "../../api/client";

import {
    getProjectDropdown
} from "../../api/project";

import {
    getSiteDropdown,
    getSitePostDropdown
} from "../../api/site";

import {
    getShiftDropdown
} from "../../api/shift";

function SiteManpowerForm({

    open,
    mode,
    manpower,
    refresh,
    close

}) {

    /*
    =====================================
    STATES
    =====================================
    */

    const [loading, setLoading] = useState(false);

    const [companies, setCompanies] = useState([]);

    const [clients, setClients] = useState([]);

    const [projects, setProjects] = useState([]);

    const [sites, setSites] = useState([]);

    const [posts, setPosts] = useState([]);

    const [shifts, setShifts] = useState([]);

    const [formData, setFormData] = useState({

        company_id: "",

        client_id: "",

        project_id: "",

        site_id: "",

        post_id: "",

        shift_id: "",

        required_guards: 1,

        minimum_guards: 1,

        supervisor_required: 1,

        remarks: "",

        status: true

    });



    /*
    =====================================
    LOAD COMPANIES
    =====================================
    */

    const loadCompanies = async () => {

        try {

            const res = await getCompanyDropdown();

            setCompanies(res.data.data || []);

        } catch (err) {

            console.log(err);

        }

    };

    /*
    =====================================
    LOAD CLIENTS
    =====================================
    */

    const loadClients = async (companyId) => {

        try {

            const res = await getClientDropdown();

            const list = res.data.data || [];

            setClients(

                list.filter(

                    item =>

                        Number(item.company_id) === Number(companyId)

                )

            );

        }

        catch (err) {

            console.log(err);

        }

    };

    /*
    =====================================
    LOAD PROJECTS
    =====================================
    */

    const loadProjects = async (clientId) => {

        try {

            const res = await getProjectDropdown();

            const list = res.data.data || [];

            setProjects(

                list.filter(

                    item =>

                        Number(item.client_id) === Number(clientId)

                )

            );

        }

        catch (err) {

            console.log(err);

        }

    };

    /*
    =====================================
    LOAD SITES
    =====================================
    */

    const loadSites = async (projectId) => {

        try {

            const res = await getSiteDropdown(projectId);

            setSites(res.data.data || []);

        }

        catch (err) {

            console.log(err);

        }

    };

    /*
    =====================================
    LOAD POSTS
    =====================================
    */

    const loadPosts = async (siteId) => {

        try {

            const res = await getSitePostDropdown(siteId);

            setPosts(res.data.data || []);

        }

        catch (err) {

            console.log(err);

        }

    };

    /*
    =====================================
    LOAD SHIFTS
    =====================================
    */

    const loadShifts = async () => {

        try {

            const res = await getShiftDropdown();

            setShifts(res.data.data || []);

        }

        catch (err) {

            console.log(err);

        }

    };

    /*
    =====================================
    INITIAL LOAD
    =====================================
    */

    useEffect(() => {

        loadCompanies();

        loadShifts();

    }, []);

    /*
    =====================================
    EDIT MODE
    =====================================
    */

useEffect(() => {

    if (!manpower || mode !== "edit") return;

    setFormData({

        company_id: manpower.company_id || "",

        client_id: manpower.client_id || "",

        project_id: manpower.project_id || "",

        site_id: manpower.site_id || "",

        post_id: manpower.post_id || "",

        shift_id: manpower.shift_id || "",

        required_guards: manpower.required_guards || 1,

        minimum_guards: manpower.minimum_guards || 1,

        supervisor_required: manpower.supervisor_required || 1,

        remarks: manpower.remarks || "",

        status: manpower.status

    });

    loadClients(manpower.company_id);

    loadProjects(manpower.client_id);

    loadSites(manpower.project_id);

    loadPosts(manpower.site_id);

}, [manpower, mode]);

    /*
=====================================
HANDLE CHANGE
=====================================
*/

const handleChange = async (e) => {

    const { name, value } = e.target;

    let data = {

        ...formData,

        [name]: value

    };

    if (name === "company_id") {

        data.client_id = "";

        data.project_id = "";

        data.site_id = "";

        data.post_id = "";

        data.shift_id = "";

        setClients([]);

        setProjects([]);

        setSites([]);

        setPosts([]);

        await loadClients(value);

    }

    if (name === "client_id") {

        data.project_id = "";

        data.site_id = "";

        data.post_id = "";

        data.shift_id = "";

        setProjects([]);

        setSites([]);

        setPosts([]);

        await loadProjects(value);

    }

    if (name === "project_id") {

        data.site_id = "";

        data.post_id = "";

        data.shift_id = "";

        setSites([]);

        setPosts([]);

        await loadSites(value);

    }

    if (name === "site_id") {

        data.post_id = "";

        data.shift_id = "";

        setPosts([]);

        await loadPosts(value);

    }

    setFormData(data);

};

/*
=====================================
SAVE / UPDATE
=====================================
*/

const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        setLoading(true);

        if (mode === "add") {

            await createSiteManpower(formData);

        }

        else {

            await updateSiteManpower(

                manpower.id,

                formData

            );

        }

refresh();

setFormData({

    company_id:"",

    client_id:"",

    project_id:"",

    site_id:"",

    post_id:"",

    shift_id:"",

    required_guards:1,

    minimum_guards:1,

    supervisor_required:1,

    remarks:"",

    status:true

});

close();

    }

    catch (err) {

        console.log(err);

        alert(

            err.response?.data?.message ||

            "Unable to save."

        );

    }

    finally {

        setLoading(false);

    }

};
    if (!open) {

        return null;

    }
return (

<div className="dp-modal">

<div className="dp-modal-content">

<div className="dp-header">

<h2>

{

mode==="add"

?

"Add Site Manpower"

:

"Edit Site Manpower"

}

</h2>

</div>

<form

className="dp-form"

onSubmit={handleSubmit}

>

<div className="dp-grid">

<select

className="dp-select"

name="company_id"

value={formData.company_id}

onChange={handleChange}

required

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

<select

className="dp-select"

name="client_id"

value={formData.client_id}

onChange={handleChange}

required

>

<option value="">

Select Client

</option>

{

clients.map(client=>(

<option

key={client.id}

value={client.id}

>

{client.client_name}

</option>

))

}

</select>

<select

className="dp-select"

name="project_id"

value={formData.project_id}

onChange={handleChange}

required

>

<option value="">

Select Project

</option>

{

projects.map(project=>(

<option

key={project.id}

value={project.id}

>

{project.project_name}

</option>

))

}

</select>

<select

className="dp-select"

name="site_id"

value={formData.site_id}

onChange={handleChange}

required

>

<option value="">

Select Site

</option>

{

sites.map(site=>(

<option

key={site.id}

value={site.id}

>

{site.site_name}

</option>

))

}

</select>

<select

    className="dp-select"

    name="post_id"

    value={formData.post_id}

    onChange={handleChange}

    required

>

    <option value="">

        Select Site Post

    </option>

    {

        posts.map(post => (

            <option

                key={post.id}

                value={post.id}

            >

                {post.post_name}

            </option>

        ))

    }

</select>

<select

    className="dp-select"

    name="shift_id"

    value={formData.shift_id}

    onChange={handleChange}

    required

>

    <option value="">

        Select Shift

    </option>

    {

        shifts.map(shift => (

            <option

                key={shift.id}

                value={shift.id}

            >

                {shift.shift_name}

            </option>

        ))

    }

</select>

<input

    className="dp-input"

    type="number"

    name="required_guards"

    value={formData.required_guards}

    onChange={handleChange}

    placeholder="Required Guards"

    min="1"

    required

/>

<input

    className="dp-input"

    type="number"

    name="minimum_guards"

    value={formData.minimum_guards}

    onChange={handleChange}

    placeholder="Minimum Guards"

    min="1"

/>

<input

    className="dp-input"

    type="number"

    name="supervisor_required"

    value={formData.supervisor_required}

    onChange={handleChange}

    placeholder="Required Supervisors"

    min="0"

/>

<textarea

    className="dp-textarea"

    name="remarks"

    value={formData.remarks}

    onChange={handleChange}

    placeholder="Remarks"

    rows="3"

/>

<select

    className="dp-select"

    name="status"

    value={String(formData.status)}

    onChange={(e)=>

        setFormData({

            ...formData,

            status:e.target.value==="true"

        })

    }

>

    <option value="true">

        Active

    </option>

    <option value="false">

        Inactive

    </option>

</select>

</div>

<div className="dp-btn-group">

    <button

        type="button"

        className="btn btn-secondary"

        onClick={close}

    >

        Cancel

    </button>

    <button

        type="submit"

        className="btn btn-primary"

        disabled={loading}

    >

        {

            loading

            ?

            "Saving..."

            :

            mode==="add"

            ?

            "Save"

            :

            "Update"

        }

    </button>

</div>

</form>

</div>

</div>

);

}

export default SiteManpowerForm;