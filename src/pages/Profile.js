// import React, {
//     useEffect,
//     useState
// } from "react";

// import DashboardLayout from "../../layouts/DashboardLayout";

// import {

//     FaUserCircle,
//     FaUser,
//     FaEnvelope,
//     FaPhone,
//     FaMapMarkerAlt,
//     FaBriefcase,
//     FaIdCard,
//     FaSave,
//     FaCamera

// } from "react-icons/fa";

// import {

//     getProfile,
//     updateProfile

// } from "../../api/profile";

// import {

//     getToken

// } from "../../utils/auth";

// import "../../css/Profile.css";

// export default function Profile(){

// const [loading,setLoading]=useState(true);

// const [saving,setSaving]=useState(false);

// const [error,setError]=useState("");

// const [success,setSuccess]=useState("");

// const [profile,setProfile]=useState({

// employee_name:"",

// employee_code:"",

// username:"",

// email:"",

// mobile:"",

// alternate_mobile:"",

// current_address:"",

// permanent_address:"",

// city:"",

// state:"",

// pincode:"",

// gender:"",

// date_of_birth:"",

// blood_group:"",

// marital_status:"",

// department:"",

// designation:"",

// shift:"",

// joining_date:"",

// role:"",

// employee_type:"",

// employee_status:"",

// aadhaar_no:"",

// pan_no:"",

// passport_number:"",

// visa_number:"",

// qid_number:"",

// driving_license_number:"",

// nationality:"",

// emergency_contact_name:"",

// emergency_contact_mobile:"",

// emergency_contact_relation:"",

// employee_photo:""

// });

// useEffect(()=>{

// loadProfile();

// },[]);

// const loadProfile=async()=>{

// try{

// const response=

// await getProfile(

// getToken()

// );

// setProfile(

// response.data.data

// );

// }

// catch(err){

// setError(

// "Unable to load profile."

// );

// }

// finally{

// setLoading(false);

// }

// };

// const handleChange=(e)=>{

// setProfile({

// ...profile,

// [e.target.name]:

// e.target.value

// });

// };

// const saveProfile=async()=>{

// try{

// setSaving(true);

// setError("");

// setSuccess("");

// await updateProfile(

// getToken(),

// profile

// );

// setSuccess(

// "Profile updated successfully."

// );

// }

// catch(err){

// setError(

// err.response?.data?.message ||

// "Unable to update profile."

// );

// }

// finally{

// setSaving(false);

// }

// };

// if(loading){

// return(

// <DashboardLayout title="My Profile">

// <div className="gx-loading">

// Loading Profile...

// </div>

// </DashboardLayout>

// );

// }

// return(

// <DashboardLayout title="My Profile">

// <div className="gx-profile-page">

// <div className="gx-profile-hero">

// <div className="gx-profile-avatar">

// {

// profile.employee_photo

// ?

// <img

// src={profile.employee_photo}

// alt="profile"

// />

// :

// <FaUserCircle size={110}/>

// }

// <div className="gx-camera-btn">

// <FaCamera/>

// </div>

// </div>

// <div>

// <h2>

// {profile.employee_name}

// </h2>

// <p>

// {profile.role}

// </p>

// <span>

// {profile.employee_code}

// </span>

// </div>

// </div>