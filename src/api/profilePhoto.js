import axios from "axios";

const API = axios.create({

    baseURL:"http://127.0.0.1:5001/api"

});

export function uploadProfilePhoto(token, formData){

    return API.post(

        "/profile/photo",

        formData,

        {

            headers:{

                Authorization:`Bearer ${token}`,

                "Content-Type":"multipart/form-data"

            }

        }

    );

} 