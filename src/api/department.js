import axios from "axios";

const API = "http://127.0.0.1:5001/api";

function getHeaders(){

    return{

        headers:{

            Authorization:`Bearer ${localStorage.getItem("token")}`

        }

    };

}

export function getDepartmentDashboard(){

    return axios.get(

        `${API}/department/dashboard`,

        getHeaders()

    );

}

export function getDepartments(){

    return axios.get(

        `${API}/department/`,

        getHeaders()

    );

}

export function getDepartment(id){

    return axios.get(

        `${API}/department/${id}`,

        getHeaders()

    );

}

export function createDepartment(data){

    return axios.post(

        `${API}/department/`,

        data,

        getHeaders()

    );

}

export function updateDepartment(id,data){

    return axios.put(

        `${API}/department/${id}`,

        data,

        getHeaders()

    );

}

export function changeDepartmentStatus(id,status){

    return axios.patch(

        `${API}/department/${id}/status`,

        {

            status

        },

        getHeaders()

    );

}

export function deleteDepartment(id){

    return axios.delete(

        `${API}/department/${id}`,

        getHeaders()

    );

}

export function departmentDropdown(){

    return axios.get(

        `${API}/department/dropdown`,

        getHeaders()

    );

}

export function getSiteDropdown(projectId){

    return axios.get(

        `${API}/site/dropdown/${projectId}`,

        getHeaders()

    );

}