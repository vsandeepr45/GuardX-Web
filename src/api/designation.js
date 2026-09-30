import axios from "axios";

const API = "http://127.0.0.1:5001/api";

function getHeaders(){

    return{

        headers:{

            Authorization:`Bearer ${localStorage.getItem("token")}`

        }

    };

}

/*
=========================================
DASHBOARD
=========================================
*/

export function getDesignationDashboard(){

    return axios.get(

        `${API}/designation/dashboard`,

        getHeaders()

    );

}

/*
=========================================
GET ALL
=========================================
*/

export function getDesignations(){

    return axios.get(

        `${API}/designation/`,

        getHeaders()

    );

}

/*
=========================================
GET BY ID
=========================================
*/

export function getDesignation(id){

    return axios.get(

        `${API}/designation/${id}`,

        getHeaders()

    );

}

/*
=========================================
CREATE
=========================================
*/

export function createDesignation(data){

    return axios.post(

        `${API}/designation/`,

        data,

        getHeaders()

    );

}

/*
=========================================
UPDATE
=========================================
*/

export function updateDesignation(id,data){

    return axios.put(

        `${API}/designation/${id}`,

        data,

        getHeaders()

    );

}

/*
=========================================
CHANGE STATUS
=========================================
*/

export function changeDesignationStatus(id,status){

    return axios.patch(

        `${API}/designation/${id}/status`,

        {

            status

        },

        getHeaders()

    );

}

/*
=========================================
DELETE
=========================================
*/

export function deleteDesignation(id){

    return axios.delete(

        `${API}/designation/${id}`,

        getHeaders()

    );

}

/*
=========================================
DROPDOWN
=========================================
*/

export function getDesignationDropdown(){

    return axios.get(

        `${API}/designation/dropdown`,

        getHeaders()

    );

}