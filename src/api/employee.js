import axios from "axios";

const API = "http://127.0.0.1:5001/api";

function getHeaders() {

    return {

        headers: {

            Authorization: `Bearer ${localStorage.getItem("token")}`

        }

    };

}

export function getEmployeeDashboard() {

    return axios.get(

        `${API}/employee/dashboard`,

        getHeaders()

    );

}

export function getEmployees() {

    return axios.get(

        `${API}/employee/`,

        getHeaders()

    );

}

export function getEmployee(id) {

    return axios.get(

        `${API}/employee/${id}`,

        getHeaders()

    );

}

export function createEmployee(data){

    const formData = new FormData();

    Object.keys(data).forEach(key=>{

        if(data[key]!==null && data[key]!==undefined){

            formData.append(key,data[key]);

        }

    });

    return axios.post(

        `${API}/employee`,

        formData,

        {

            headers:{

                Authorization:`Bearer ${localStorage.getItem("token")}`,

                "Content-Type":"multipart/form-data"

            }

        }

    );

}

export function updateEmployee(id, data) {

    const formData = new FormData();

    Object.keys(data).forEach(key => {

        if (data[key] !== null && data[key] !== undefined) {

            formData.append(key, data[key]);

        }

    });

    return axios.put(

        `${API}/employee/${id}`,

        formData,

        {

            headers:{

                Authorization:`Bearer ${localStorage.getItem("token")}`,

                "Content-Type":"multipart/form-data"

            }

        }

    );

}
export function changeEmployeeStatus(id, status) {

    return axios.patch(

        `${API}/employee/${id}/status`,

        {

            status

        },

        getHeaders()

    );

}

export function deleteEmployee(id) {

    return axios.delete(

        `${API}/employee/${id}`,

        getHeaders()

    );

}

export function getEmployeeDropdown() {

    return axios.get(

        `${API}/employee/dropdown`,

        getHeaders()

    );

}   

export function enrollEmployeeFace(id, images) {

    return axios.post(

        `${API}/employee/${id}/face-enrollment`,

        {
            images
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



// ==========================================
// FACE RE-ENROLLMENT
// ==========================================

export function reenrollEmployeeFace(employeeId, images) {

    return axios.post(

        `${API}/employee/${employeeId}/face-reenrollment`,

        {
            images
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


// ==========================================
// FACE STATUS
// ==========================================

export function getEmployeeFaceStatus(employeeId) {

    return axios.get(

        `${API}/employee/${employeeId}/face-status`,

        getHeaders()

    );

}