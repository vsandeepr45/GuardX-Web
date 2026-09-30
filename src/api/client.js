import axios from "axios";

const API = "http://127.0.0.1:5001/api";

function getHeaders() {

    return {

        headers: {

            Authorization: `Bearer ${localStorage.getItem("token")}`

        }

    };

}

/*
=====================================
Company Dropdown
=====================================
*/

export function getCompaniesDropdown() {

    return axios.get(

        `${API}/client/companies`,

        getHeaders()

    );

}

/*
=====================================
Client List
=====================================
*/

export function getClients() {

    return axios.get(

        `${API}/client/`,

        getHeaders()

    );

}

/*
=====================================
Client Details
=====================================
*/

export function getClient(id) {

    return axios.get(

        `${API}/client/${id}`,

        getHeaders()

    );

}

/*
=====================================
Create Client
=====================================
*/

export function createClient(data) {

    return axios.post(

        `${API}/client/`,

        data,

        getHeaders()

    );

}

/*
=====================================
Update Client
=====================================
*/

export function updateClient(id,data) {

    return axios.put(

        `${API}/client/${id}`,

        data,

        getHeaders()

    );

}

/*
=====================================
Status
=====================================
*/

export function changeClientStatus(id,status) {

    return axios.patch(

        `${API}/client/status/${id}`,

        {

            status

        },

        getHeaders()

    );

}

/*
=====================================
Delete
=====================================
*/

export function deleteClient(id) {

    return axios.delete(

        `${API}/client/${id}`,

        getHeaders()

    );

}

/*
=====================================
Dashboard
=====================================
*/

export function getClientDashboard() {

    return axios.get(

        `${API}/client/dashboard`,

        getHeaders()

    );

}

export function getClientDropdown(){

    return axios.get(

        `${API}/client/dropdown`,

        getHeaders()

    );

}