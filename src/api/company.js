import axios from "axios";

const API = "http://127.0.0.1:5001/api";

/*
=========================================
Get Token
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
GET ALL COMPANIES
=========================================
*/

export function getCompanies() {

    return axios.get(

        `${API}/company/`,

        getHeaders()

    );

}

/*
=========================================
GET COMPANY BY ID
=========================================
*/

export function getCompany(id) {

    return axios.get(

        `${API}/company/${id}`,

        getHeaders()

    );

}

/*
=========================================
CREATE COMPANY
=========================================
*/

export function createCompany(data) {

    return axios.post(

        `${API}/company/`,

        data,

        getHeaders()

    );

}

/*
=========================================
UPDATE COMPANY
=========================================
*/

export function updateCompany(id,data) {

    return axios.put(

        `${API}/company/${id}`,

        data,

        getHeaders()

    );

}

/*
=========================================
CHANGE STATUS
=========================================
*/

export function changeCompanyStatus(id,status) {

    return axios.patch(

        `${API}/company/status/${id}`,

        {

            status

        },

        getHeaders()

    );

}

/*
=========================================
DELETE COMPANY
=========================================
*/

export function deleteCompany(id) {

    return axios.delete(

        `${API}/company/${id}`,

        getHeaders()

    );

}

export function getCompanyDashboard() {

    return axios.get(

        `${API}/company/dashboard`,

        getHeaders()

    );

}
export function getCompanyDropdown(){

    return axios.get(

        `${API}/company/dropdown`,

        getHeaders()

    );

}