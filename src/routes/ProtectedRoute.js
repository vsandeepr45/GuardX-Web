import React from "react";

import {

    Navigate,

    useLocation

} from "react-router-dom";

import {

    getToken,

    getUser

} from "../utils/auth";

function ProtectedRoute({

    children

}){

    const token=getToken();

    const user=getUser();

    const location=useLocation();

    // --------------------------------
    // Not Logged In
    // --------------------------------

    if(!token){

        return(

            <Navigate

                to="/login"

                replace

            />

        );

    }

    // --------------------------------
    // Force Password Change
    // --------------------------------

    if(

        user?.must_change_password===true &&

        location.pathname!=="/change-password"

    ){

        return(

            <Navigate

                to="/change-password"

                replace

            />

        );

    }

    return children;

}

export default ProtectedRoute;