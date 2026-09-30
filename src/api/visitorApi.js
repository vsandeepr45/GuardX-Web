import axios from "axios";

const API = "http://127.0.0.1:5001/api";

function getHeaders() {
    return {
        headers: {
            Authorization:
                `Bearer ${localStorage.getItem("token")}`
        }
    };
}


// ============================================================
// VISITOR DASHBOARD
// ============================================================

export function getVisitorDashboard() {

    return axios.get(
        `${API}/visitor/dashboard`,
        getHeaders()
    );

}


// ============================================================
// VISITORS
// ============================================================

export function getVisitors() {

    return axios.get(
        `${API}/visitors/`,
        getHeaders()
    );

}


export function getVisitor(id) {

    return axios.get(
        `${API}/visitors/${id}`,
        getHeaders()
    );

}


export function createVisitor(data) {

    return axios.post(
        `${API}/visitors/`,
        data,
        getHeaders()
    );

}


export function updateVisitor(id, data) {

    return axios.put(
        `${API}/visitors/${id}`,
        data,
        getHeaders()
    );

}


export function changeVisitorStatus(
    id,
    status
) {

    return axios.patch(
        `${API}/visitors/${id}/status`,
        {
            status
        },
        getHeaders()
    );

}


// ============================================================
// VISITS
// ============================================================

export function getVisits() {

    return axios.get(
        `${API}/visitor-visits/`,
        getHeaders()
    );

}


export function getVisit(id) {

    return axios.get(
        `${API}/visitor-visits/${id}`,
        getHeaders()
    );

}


export function createVisit(data) {

    return axios.post(
        `${API}/visitor-visits/`,
        data,
        getHeaders()
    );

}


export function updateVisitApproval(
    id,
    approval_status
) {

    return axios.patch(
        `${API}/visitor-visits/${id}/approval`,
        {
            approval_status
        },
        getHeaders()
    );

}


export function updateVisitStatus(
    id,
    visit_status
) {

    return axios.patch(
        `${API}/visitor-visits/${id}/status`,
        {
            visit_status
        },
        getHeaders()
    );

}


// ============================================================
// VISITOR PASS
// ============================================================

export function generateVisitorPass(
    visitId
) {

    return axios.post(
        `${API}/visitor-pass/${visitId}/generate`,
        {},
        getHeaders()
    );

}


export function getVisitorPass(
    visitId
) {

    return axios.get(
        `${API}/visitor-pass/${visitId}`,
        getHeaders()
    );

}


export function revokeVisitorPass(
    visitId
) {

    return axios.patch(
        `${API}/visitor-pass/${visitId}/revoke`,
        {},
        getHeaders()
    );

}

// =========================================================
// REGISTER VISITOR
// =========================================================

export function registerVisitor(data) {

    return axios.post(

        `${API}/visitors/`,

        data,

        getHeaders()

    );

}


// ============================================================
// VISITOR CHECK-IN / CHECK-OUT
// ============================================================

export function checkInVisitor(
    visitId,
    data
) {

    return axios.post(

        `${API}/visitor-checkin/${visitId}/check-in`,

        data,

        getHeaders()

    );

}


export function checkOutVisitor(
    visitId,
    data
) {

    return axios.post(

        `${API}/visitor-checkin/${visitId}/check-out`,

        data,

        getHeaders()

    );

}


export function getVisitorCheckinHistory(
    visitId
) {

    return axios.get(

        `${API}/visitor-checkin/${visitId}/history`,

        getHeaders()

    );

}

export function getVisitorHistory(
    params = {}
) {

    return axios.get(

        `${API}/visitor/history`,

        {
            ...getHeaders(),
            params
        }

    );

}

// ============================================================
// SUPERVISOR VISITOR MANAGEMENT
// ============================================================

export function getSupervisorVisitorDashboard() {

    return axios.get(
        `${API}/visitor-supervisor/dashboard`,
        getHeaders()
    );

}