import axios from "axios";

const API = axios.create({

    baseURL: "http://127.0.0.1:5001/api",

    headers: {

        "Content-Type": "application/json"

    }

});

export const loginUser = (data) => {

    return API.post("/auth/login", data);

};

export const registerUser = (data) => {

    return API.post("/auth/register", data);

};

export const getCurrentUser = (token) => {

    return API.get("/auth/me", {

        headers: {

            Authorization: `Bearer ${token}`

        }

    });

};

export const logoutUser = (token) => {

    return API.post(

        "/auth/logout",

        {},

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

};

export const changePassword = (token, data) => {

    return API.put(

        "/auth/change-password",

        data,

        {

            headers:{

                Authorization:`Bearer ${token}`

            }

        }

    );

};