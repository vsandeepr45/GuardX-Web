import axios from "axios";

const API = "http://127.0.0.1:5001/api";

/*
=========================================
JWT HEADER
=========================================
*/

function getHeaders() {

    return {

        headers: {

            Authorization: `Bearer ${localStorage.getItem("token")}`

        }

    };

}

/*
=========================================
GET ALL PROJECTS
=========================================
*/

export function getProjects() {

    return axios.get(

        `${API}/project/`,

        getHeaders()

    );

}

/*
=========================================
GET PROJECT
=========================================
*/

export function getProject(id) {

    return axios.get(

        `${API}/project/${id}`,

        getHeaders()

    );

}

/*
=========================================
CREATE PROJECT
=========================================
*/

export function createProject(data) {

    return axios.post(

        `${API}/project/`,

        data,

        getHeaders()

    );

}

/*
=========================================
UPDATE PROJECT
=========================================
*/

export function updateProject(id,data) {

    return axios.put(

        `${API}/project/${id}`,

        data,

        getHeaders()

    );

}

/*
=========================================
CHANGE STATUS
=========================================
*/

export function changeProjectStatus(id,status) {

    return axios.patch(

        `${API}/project/status/${id}`,

        {

            status

        },

        getHeaders()

    );

}

/*
=========================================
DELETE PROJECT
=========================================
*/

export function deleteProject(id) {

    return axios.delete(

        `${API}/project/${id}`,

        getHeaders()

    );

}

/*
=========================================
DASHBOARD
=========================================
*/

export function getProjectDashboard() {

    return axios.get(

        `${API}/project/dashboard`,

        getHeaders()

    );

}

/*
=========================================
COMPANY DROPDOWN
=========================================
*/

export function getCompaniesDropdown() {

    return axios.get(

        `${API}/project/company-dropdown`,

        getHeaders()

    );

}

/*
=========================================
CLIENT DROPDOWN
=========================================
*/

export function getClientsDropdown(companyId=null) {

    let url = `${API}/project/client-dropdown`;

    if(companyId){

        url += `?company_id=${companyId}`;

    }

    return axios.get(

        url,

        getHeaders()

    );

}

export function getProjectDropdown(){

    return axios.get(

        `${API}/project/dropdown`,

        getHeaders()

    );

}