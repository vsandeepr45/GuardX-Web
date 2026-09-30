import axios from "axios";

const API = "http://127.0.0.1:5001/api";

function getHeaders() {
    return {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    };
}


// ============================================================
// CATEGORIES
// ============================================================

export function getHelpdeskCategories() {
    return axios.get(
        `${API}/helpdesk/categories`,
        getHeaders()
    );
}


// ============================================================
// CREATE TICKET
// ============================================================

export function createHelpdeskTicket(data) {
    return axios.post(
        `${API}/helpdesk/tickets`,
        data,
        {
            headers: {
                Authorization:
                    `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            }
        }
    );
}


// ============================================================
// GET TICKETS
// ============================================================

export function getHelpdeskTickets(params = {}) {
    return axios.get(
        `${API}/helpdesk/tickets`,
        {
            ...getHeaders(),
            params
        }
    );
}


// ============================================================
// GET SINGLE TICKET
// ============================================================

export function getHelpdeskTicket(ticketId) {
    return axios.get(
        `${API}/helpdesk/tickets/${ticketId}`,
        getHeaders()
    );
}


// ============================================================
// ADD COMMENT
// ============================================================

export function addHelpdeskComment(ticketId, comment) {
    return axios.post(
        `${API}/helpdesk/tickets/${ticketId}/comments`,
        {
            comment
        },
        {
            headers: {
                Authorization:
                    `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            }
        }
    );
}


// ============================================================
// ASSIGN TICKET
// ============================================================

export function assignHelpdeskTicket(ticketId, assignedTo) {
    return axios.put(
        `${API}/helpdesk/tickets/${ticketId}/assign`,
        {
            assigned_to: assignedTo
        },
        getHeaders()
    );
}


// ============================================================
// UPDATE PRIORITY
// ============================================================

export function updateHelpdeskPriority(ticketId, priority) {
    return axios.put(
        `${API}/helpdesk/tickets/${ticketId}/priority`,
        {
            priority
        },
        getHeaders()
    );
}


// ============================================================
// UPDATE STATUS
// ============================================================

export function updateHelpdeskStatus(ticketId, status) {
    return axios.put(
        `${API}/helpdesk/tickets/${ticketId}/status`,
        {
            status
        },
        getHeaders()
    );
}


// ============================================================
// RESOLVE TICKET
// ============================================================

export function resolveHelpdeskTicket(
    ticketId,
    resolutionNotes
) {
    return axios.put(
        `${API}/helpdesk/tickets/${ticketId}/resolve`,
        {
            resolution_notes: resolutionNotes
        },
        getHeaders()
    );
}


// ============================================================
// CLOSE TICKET
// ============================================================

export function closeHelpdeskTicket(ticketId) {
    return axios.put(
        `${API}/helpdesk/tickets/${ticketId}/close`,
        {},
        getHeaders()
    );
}


// ============================================================
// GET TICKET ASSIGNEES
// ============================================================

export function getHelpdeskAssignees(ticketId) {
    return axios.get(
        `${API}/helpdesk/tickets/${ticketId}/assignees`,
        getHeaders()
    );
}

// ============================================================
// HELP & GUIDES
// ============================================================

export function getHelpGuides(params = {}) {
    return axios.get(
        `${API}/helpdesk/guides`,
        {
            ...getHeaders(),
            params
        }
    );
}


// ============================================================
// HELP GUIDE CATEGORIES
// ============================================================

export function getHelpGuideCategories() {
    return axios.get(
        `${API}/helpdesk/guides/categories`,
        getHeaders()
    );
}


// ============================================================
// SINGLE HELP GUIDE
// ============================================================

export function getHelpGuide(slug) {
    return axios.get(
        `${API}/helpdesk/guides/${encodeURIComponent(slug)}`,
        getHeaders()
    );
}