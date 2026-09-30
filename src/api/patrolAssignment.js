import axios from "axios";

const API = "http://127.0.0.1:5001/api";

function getHeaders() {

    return {

        headers: {

            Authorization: `Bearer ${localStorage.getItem("token")}`

        }

    };

}


// ===========================================
// Dashboard
// ===========================================

export function getPatrolAssignmentDashboard() {

    return axios.get(

        `${API}/patrol-assignment/dashboard`,

        getHeaders()

    );

}


// ===========================================
// Get All
// ===========================================

export function getPatrolAssignments() {

    return axios.get(

        `${API}/patrol-assignment/`,

        getHeaders()

    );

}


// ===========================================
// Get One
// ===========================================

export function getPatrolAssignment(id) {

    return axios.get(

        `${API}/patrol-assignment/${id}`,

        getHeaders()

    );

}


// ===========================================
// Create
// ===========================================

export function createPatrolAssignment(data) {

    return axios.post(

        `${API}/patrol-assignment/`,

        data,

        getHeaders()

    );

}


// ===========================================
// Update
// ===========================================

export function updatePatrolAssignment(id, data) {

    return axios.put(

        `${API}/patrol-assignment/${id}`,

        data,

        getHeaders()

    );

}


// ===========================================
// Change Status
// ===========================================

export function changePatrolAssignmentStatus(id, status) {

    return axios.patch(

        `${API}/patrol-assignment/${id}/status`,

        {

            status

        },

        getHeaders()

    );

}


// ===========================================
// Delete
// ===========================================

export function deletePatrolAssignment(id) {

    return axios.delete(

        `${API}/patrol-assignment/${id}`,

        getHeaders()

    );

}