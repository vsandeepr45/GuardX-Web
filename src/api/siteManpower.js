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
=========================================
DASHBOARD
=========================================
*/

export function getSiteManpowerDashboard() {

    return axios.get(

        `${API}/site-manpower/dashboard`,

        getHeaders()

    );

}

/*
=========================================
GET ALL
=========================================
*/

export function getSiteManpower() {

    return axios.get(

        `${API}/site-manpower/`,

        getHeaders()

    );

}

/*
=========================================
GET BY ID
=========================================
*/

export function getSiteManpowerById(id) {

    return axios.get(

        `${API}/site-manpower/${id}`,

        getHeaders()

    );

}

/*
=========================================
CREATE
=========================================
*/

export function createSiteManpower(data) {

    return axios.post(

        `${API}/site-manpower/`,

        data,

        getHeaders()

    );

}

/*
=========================================
UPDATE
=========================================
*/

export function updateSiteManpower(id,data) {

    return axios.put(

        `${API}/site-manpower/${id}`,

        data,

        getHeaders()

    );

}

/*
=========================================
STATUS
=========================================
*/

export function changeSiteManpowerStatus(id,status) {

    return axios.patch(

        `${API}/site-manpower/${id}/status`,

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

export function deleteSiteManpower(id) {

    return axios.delete(

        `${API}/site-manpower/${id}`,

        getHeaders()

    );

}