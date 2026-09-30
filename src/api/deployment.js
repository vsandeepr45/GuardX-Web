import axios from "axios";

const API = "http://127.0.0.1:5001/api";

function getHeaders() {

    return {
        headers: {
            Authorization:
                `Bearer ${
                    localStorage.getItem(
                        "token"
                    )
                }`
        }
    };

}

export function getDeployments() {

    return axios.get(
        `${API}/deployment/`,
        getHeaders()
    );

}

export function getDeployment(id) {

    return axios.get(
        `${API}/deployment/${id}`,
        getHeaders()
    );

}

export function createDeployment(data) {

    return axios.post(
        `${API}/deployment/`,
        data,
        getHeaders()
    );

}

export function updateDeployment(
    id,
    data
) {

    return axios.put(
        `${API}/deployment/${id}`,
        data,
        getHeaders()
    );

}


export function changeDeploymentStatus(
    id,
    status
) {

    return axios.patch(
        `${API}/deployment/${id}/status`,
        {
            status
        },
        getHeaders()
    );

}

export function deleteDeployment(id) {

    return axios.delete(
        `${API}/deployment/${id}`,
        getHeaders()
    );

}

export function getDeploymentDashboard() {

    return axios.get(
        `${API}/deployment/dashboard`,
        getHeaders()
    );

}


export const getPendingDeploymentRequests = () => {

    return axios.get(
        `${API}/deployment/pending-requests`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
    );

};

export function getCurrentDeployment() {

    return axios.get(
        `${API}/deployment/current`,
        getHeaders()
    );

}