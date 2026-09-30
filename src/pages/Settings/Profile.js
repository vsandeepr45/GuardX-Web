import React, { useEffect, useState, useRef } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import { FaSave } from "react-icons/fa";

import { getProfile, updateProfile } from "../../api/profile";
import { getToken } from "../../utils/auth";
import EmployeeStats from "../../components/Profile/EmployeeStats";
import "../../styles/Profile.css";

import ProfileHero from "../../components/Profile/ProfileHero";
import QuickStats from "../../components/Profile/QuickStats";

import EmployeeIDCard from "../../components/Profile/EmployeeIDCard";
import DocumentsStatus from "../../components/Profile/DocumentsStatus";
import EmergencyCard from "../../components/Profile/EmergencyCard";
import ProfileCompletion from "../../components/Profile/ProfileCompletion";

import PersonalInfo from "../../components/Profile/PersonalInfo";
import ContactInfo from "../../components/Profile/ContactInfo";
import EmploymentInfo from "../../components/Profile/EmploymentInfo";
import DocumentsInfo from "../../components/Profile/DocumentsInfo";
import Timeline from "../../components/Profile/Timeline";
import EmergencyInfo from "../../components/Profile/EmergencyInfo";
import { uploadProfilePhoto } from "../../api/profilePhoto";
import {
    FaUser,
    FaPhone,
    FaBriefcase,
    FaFileAlt,
    FaHistory
} from "react-icons/fa";


export default function Profile() {

    const [loading,setLoading]=useState(true);

    const [saving,setSaving]=useState(false);

    const [error,setError]=useState("");
const [activeTab,setActiveTab]=useState("personal");
const [editMode,setEditMode]=useState(false);
    const [success,setSuccess]=useState("");
const fileInputRef = useRef(null);
    const [profile,setProfile]=useState({

        employee_name:"",

        employee_code:"",

        username:"",

        email:"",

        mobile:"",

        alternate_mobile:"",

        gender:"",

        date_of_birth:"",

        blood_group:"",

        marital_status:"",

        current_address:"",

        permanent_address:"",

        city:"",

        state:"",

        pincode:"",

        department:"",

        designation:"",

        shift:"",

        joining_date:"",

        employee_type:"",

        employee_status:"",

        role:"",

        nationality:"",

        aadhaar_no:"",

        pan_no:"",

        passport_number:"",

        passport_expiry:"",

        visa_number:"",

        visa_expiry:"",

        qid_number:"",

        qid_expiry:"",

        driving_license_number:"",

        emergency_contact_name:"",

        emergency_contact_mobile:"",

        emergency_contact_relation:"",

        employee_photo:""

    });

    useEffect(()=>{

        loadProfile();

    },[]);

    async function loadProfile(){

        try{

            setLoading(true);

            const res=await getProfile(getToken());

            setProfile(res.data.data);

        }

        catch(err){

            setError("Unable to load profile.");

        }

        finally{

            setLoading(false);

        }

    }
async function handlePhotoUpload(e){

    const file=e.target.files[0];

    if(!file) return;

    const formData=new FormData();

    formData.append("photo",file);

    try{

        await uploadProfilePhoto(

            getToken(),

            formData

        );

        loadProfile();

    }

    catch(err){

        alert("Unable to upload photo.");

    }

}
    function handleChange(e){

        setProfile({

            ...profile,

            [e.target.name]:e.target.value

        });

    }

    async function saveProfile(){

        try{

            setSaving(true);

            setError("");

            setSuccess("");

            await updateProfile(

                getToken(),

                profile

            );

            setSuccess("Profile Updated Successfully.");

            setEditMode(false);

        }

        catch(err){

            setError(

                err.response?.data?.message ||

                "Unable to update profile."

            );

        }

        finally{

            setSaving(false);

        }

    }

    if(loading){

        return(

            <DashboardLayout title="My Profile">

                <div className="gx-loading">

                    Loading Profile...

                </div>

            </DashboardLayout>

        );

    }

    return(

        <DashboardLayout title="My Profile">

            <div className="gx-profile-page">

<ProfileHero

profile={profile}

fileInputRef={fileInputRef}

handlePhotoUpload={handlePhotoUpload}

/>

                <EmployeeStats

profile={profile}

/>



                  

                    

<div className="gx-main-grid">

    {/* LEFT */}

    <div className="gx-left-column">

        <EmployeeIDCard profile={profile} />

        <ProfileCompletion profile={profile} />

        <DocumentsStatus profile={profile} />

        <EmergencyCard profile={profile} />

    </div>

    {/* RIGHT */}

    <div className="gx-right-column">

        <div className="gx-profile-tabs">

            <button
                className={activeTab==="personal" ? "active" : ""}
                onClick={()=>setActiveTab("personal")}
            >
                <FaUser/>
                <span>Personal</span>
            </button>

            <button
                className={activeTab==="contact" ? "active" : ""}
                onClick={()=>setActiveTab("contact")}
            >
                <FaPhone/>
                <span>Contact</span>
            </button>

            <button
                className={activeTab==="employment" ? "active" : ""}
                onClick={()=>setActiveTab("employment")}
            >
                <FaBriefcase/>
                <span>Employment</span>
            </button>

            <button
                className={activeTab==="documents" ? "active" : ""}
                onClick={()=>setActiveTab("documents")}
            >
                <FaFileAlt/>
                <span>Documents</span>
            </button>
<button

    className={activeTab==="emergency" ? "active" : ""}

    onClick={()=>setActiveTab("emergency")}

>

    <FaPhone/>

    <span>Emergency</span>

</button>
            <button
                className={activeTab==="timeline" ? "active" : ""}
                onClick={()=>setActiveTab("timeline")}
            >
                <FaHistory/>
                <span>Timeline</span>
            </button>

        </div>

        <div className="gx-profile-content">

            {activeTab==="personal" &&
                <PersonalInfo profile={profile}/>
            }

            {activeTab==="contact" &&
<ContactInfo
    profile={profile}
    handleChange={handleChange}
    editMode={editMode}
/>
            }

            {activeTab==="employment" &&
                <EmploymentInfo
                    profile={profile}
                />
            }

            {activeTab==="documents" &&
                <DocumentsInfo
                    profile={profile}
                />
            }

            {activeTab==="timeline" &&
                <Timeline
                    profile={profile}
                />
            }
            {

activeTab==="emergency" &&

<EmergencyInfo

    profile={profile}

    editMode={editMode}

    handleChange={handleChange}

/>

}

        </div>

    </div>

</div>

                <div className="gx-profile-footer">

                    <div>

                        {

                            error &&

                            <div className="gx-alert gx-error">

                                {error}

                            </div>

                        }

                        {

                            success &&

                            <div className="gx-alert gx-success">

                                {success}

                            </div>

                        }

                    </div>

<div className="gx-profile-actions">

    {

        !editMode ?

        (

            <button

                className="gx-btn-edit"

                onClick={() => setEditMode(true)}

            >

                Edit Profile

            </button>

        )

        :

        (

            <>

                <button

                    className="gx-btn-save"

                    onClick={saveProfile}

                    disabled={saving}

                >

                    <FaSave/>

                    {

                        saving ?

                        " Saving..."

                        :

                        " Save Changes"

                    }

                </button>

                <button

                    className="gx-btn-cancel"

                    onClick={() => {

                        setEditMode(false);

                        loadProfile();

                    }}

                >

                    Cancel

                </button>

            </>

        )

    }

</div>

                </div>

            </div>
            

        </DashboardLayout>

    );

}