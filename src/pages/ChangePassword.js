import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import { changePassword } from "../api/auth";
import { getToken } from "../utils/auth";
import { useAuth } from "../context/AuthContext";

import "../styles/ChangePassword.css";

function ChangePassword() {

    const navigate = useNavigate();

    const { user, updateUser } = useAuth();

    const [loading,setLoading] = useState(false);

    const [error,setError] = useState("");

    const [success,setSuccess] = useState("");

    const [form,setForm] = useState({

        old_password:"",

        new_password:"",

        confirm_password:""

    });

    const handleChange=(e)=>{

        setForm({

            ...form,

            [e.target.name]:e.target.value

        });

    };

    const validatePassword=()=>{

        const password=form.new_password;

        const regex=

        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        return regex.test(password);

    };

    const handleSubmit=async(e)=>{

        e.preventDefault();

        setError("");

        setSuccess("");

        if(!form.old_password){

            return setError("Current Password is required.");

        }

        if(!validatePassword()){

            return setError(
                "Password must contain uppercase, lowercase, number, special character and minimum 8 characters."
            );

        }

        if(form.new_password!==form.confirm_password){

            return setError("Passwords do not match.");

        }

        try{

            setLoading(true);

            const response=await changePassword(

                getToken(),

                {

                    old_password:form.old_password,

                    new_password:form.new_password

                }

            );

            if(!response.data.success){

                setError(response.data.message);

                return;

            }

            setSuccess("Password Updated Successfully.");

updateUser({

    ...user,

    must_change_password:false,

    password_changed_at:

    new Date()

});

            setTimeout(()=>{

                navigate("/dashboard");

            },1500);

        }

        catch(err){

            setError(

                err.response?.data?.message ||

                "Unable to update password."

            );

        }

        finally{

            setLoading(false);

        }

    };

    return(

        <DashboardLayout title="Change Password">

            <div className="gx-password-card">

                <div className="gx-password-header">

                    <h2>

                        First Time Login

                    </h2>

                    <p>

                        Your administrator assigned you a temporary password.

                        Please create your own secure password before accessing GuardX.

                    </p>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="gx-form-group">

                        <label>

                            Current Password

                        </label>

                        <input

                            type="password"

                            name="old_password"

                            value={form.old_password}

                            onChange={handleChange}

                        />

                    </div>

                    <div className="gx-form-group">

                        <label>

                            New Password

                        </label>

                        <input

                            type="password"

                            name="new_password"

                            value={form.new_password}

                            onChange={handleChange}

                        />

                    </div>

                    <div className="gx-form-group">

                        <label>

                            Confirm Password

                        </label>

                        <input

                            type="password"

                            name="confirm_password"

                            value={form.confirm_password}

                            onChange={handleChange}

                        />

                    </div>

                    <div className="gx-password-rules">

                        <h4>Password Requirements</h4>

                        <ul>

                            <li>Minimum 8 Characters</li>

                            <li>One Uppercase Letter</li>

                            <li>One Lowercase Letter</li>

                            <li>One Number</li>

                            <li>One Special Character</li>

                        </ul>

                    </div>

                    {

                        error &&

                        <div className="gx-error">

                            {error}

                        </div>

                    }

                    {

                        success &&

                        <div className="gx-success">

                            {success}

                        </div>

                    }

                    <button

                        className="gx-btn-primary"

                        disabled={loading}

                    >

                        {

                            loading

                            ?

                            "Updating..."

                            :

                            "Update Password"

                        }

                    </button>

                </form>

            </div>

        </DashboardLayout>

    );

}

export default ChangePassword;