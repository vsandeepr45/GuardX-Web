import axios from "axios";



const API = "http://127.0.0.1:5001/api";

export const getDeploymentRequestDashboard = () =>
    axios.get(`${API}/deployment-request/dashboard`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });

export const getDeploymentRequests = () =>
    axios.get(`${API}/deployment-request/`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });

export const getDeploymentRequest = (id) =>
    axios.get(`${API}/deployment-request/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });

export const createDeploymentRequest = (data) =>
    axios.post(`${API}/deployment-request/`, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });

export const updateDeploymentRequest = (id, data) =>
    axios.put(`${API}/deployment-request/${id}`, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });

export const changeDeploymentRequestStatus = (id, status) =>
    axios.patch(`${API}/deployment-request/${id}/status`,
        { status },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
    );

export const deleteDeploymentRequest = (id) =>
    axios.delete(`${API}/deployment-request/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });

export const assignGuards = (id, data) =>
    axios.post(`${API}/deployment-request/${id}/assign`, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
