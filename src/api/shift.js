import axios from "axios";

const API = "http://127.0.0.1:5001/api";

function getHeaders(){

    return{

        headers:{

            Authorization:`Bearer ${localStorage.getItem("token")}`

        }

    };

}

/*
=========================================
DASHBOARD
=========================================
*/

export function getShiftDashboard(){

    return axios.get(

        `${API}/shift/dashboard`,

        getHeaders()

    );

}

/*
=========================================
GET ALL
=========================================
*/

export function getShifts(){

    return axios.get(

        `${API}/shift/`,

        getHeaders()

    );

}

/*
=========================================
GET BY ID
=========================================
*/

export function getShift(id){

    return axios.get(

        `${API}/shift/${id}`,

        getHeaders()

    );

}

/*
=========================================
CREATE
=========================================
*/

export function createShift(data){

    return axios.post(

        `${API}/shift/`,

        data,

        getHeaders()

    );

}

/*
=========================================
UPDATE
=========================================
*/

export function updateShift(id,data){

    return axios.put(

        `${API}/shift/${id}`,

        data,

        getHeaders()

    );

}

/*
=========================================
CHANGE STATUS
=========================================
*/

export function changeShiftStatus(id,status){

    return axios.patch(

        `${API}/shift/${id}/status`,

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

export function deleteShift(id){

    return axios.delete(

        `${API}/shift/${id}`,

        getHeaders()

    );

}

/*
=========================================
DROPDOWN
=========================================
*/

export function getShiftDropdown(){

    return axios.get(

        `${API}/shift/dropdown`,

        getHeaders()

    );

}