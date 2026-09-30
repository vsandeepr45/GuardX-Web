import axios from "axios";

const API = "http://127.0.0.1:5001/api";

function getHeaders() {

    return {

        headers: {

            Authorization: `Bearer ${localStorage.getItem("token")}`

        }

    };

}

export function getRoleDropdown() {

    return axios.get(

        `${API}/role/dropdown`,

        getHeaders()

    );

}