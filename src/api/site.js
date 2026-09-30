import axios from "axios";

const API = "http://127.0.0.1:5001/api";

function getHeaders() {

    return {

        headers: {

            Authorization: `Bearer ${localStorage.getItem("token")}`

        }

    };

}

export function getSiteDashboard() {

    return axios.get(

        `${API}/site/dashboard`,

        getHeaders()

    );

}

export function getSites() {

    return axios.get(

        `${API}/site/`,

        getHeaders()

    );

}

export function getSite(id) {

    return axios.get(

        `${API}/site/${id}`,

        getHeaders()

    );

}

export function createSite(data) {

    return axios.post(

        `${API}/site/`,

        data,

        getHeaders()

    );

}

export function updateSite(id,data) {

    return axios.put(

        `${API}/site/${id}`,

        data,

        getHeaders()

    );

}

export function changeSiteStatus(id,status) {

    return axios.patch(

        `${API}/site/${id}/status`,

        {

            status

        },

        getHeaders()

    );

}

export function deleteSite(id) {

    return axios.delete(

        `${API}/site/${id}`,

        getHeaders()

    );

}

/*
=========================================
SITE DROPDOWN
=========================================
*/

export function getSiteDropdown(projectId = null) {

    let url = `${API}/site/dropdown`;

    if (projectId) {

        url += `?project_id=${projectId}`;

    }

    return axios.get(

        url,

        getHeaders()

    );

}



/*
=========================================
SITE POST DROPDOWN
=========================================
*/

export function getSitePostDropdown(siteId = null) {

    let url = `${API}/site/post-dropdown`;

    if (siteId) {

        url += `?site_id=${siteId}`;

    }

    return axios.get(

        url,

        getHeaders()

    );

}

/*
=========================================
MY ASSIGNED SITES
=========================================
*/

export function getMyAssignedSites() {

    return axios.get(

        `${API}/site/my-assigned-sites`,

        getHeaders()

    );

}