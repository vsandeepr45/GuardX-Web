import axios from "axios";

const API = axios.create({

    baseURL:"http://127.0.0.1:5001/api",

    headers:{

        "Content-Type":"application/json"

    }

});

export const getProfile=(token)=>{

    return API.get(

        "/profile",

        {

            headers:{

                Authorization:`Bearer ${token}`

            }

        }

    );

};

export const updateProfile=(token,data)=>{

    return API.put(

        "/profile",

        data,

        {

            headers:{

                Authorization:`Bearer ${token}`

            }

        }

    );

};


export const getEmployeeStats=(token)=>{

    return API.get(

        "/profile/stats",

        {

            headers:{

                Authorization:`Bearer ${token}`

            }

        }

    );

};