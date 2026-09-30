// import {
//     FaCamera,
//     FaEdit,
//     FaMapMarkerAlt,
//     FaUserShield,
//     FaCalendarAlt,
//     FaClock,
//     FaCheckCircle,
//     FaDownload
// } from "react-icons/fa";

// export default function ProfileHeader({

//     profile,

//     onEdit,

// }) {

//     return (

//         <div className="gx-header">

//             <div className="gx-header-bg"></div>

//             <div className="gx-header-left">
//                                 <div className="gx-profile-photo-box">

//                     {

//                         profile.employee_photo ?

//                         <img
//                             src={profile.employee_photo}
//                             alt=""
//                             className="gx-profile-photo"
//                         />

//                         :

//                         <div className="gx-photo-placeholder">

//                             {profile.employee_name?.charAt(0)}

//                         </div>

//                     }

//                     <button className="gx-change-photo">

//                         <FaCamera/>

//                     </button>

//                 </div>
//                                 <div className="gx-profile-main">

//                     <div className="gx-greeting">

//                         👋 Good Morning

//                     </div>

//                     <h1>

//                         {profile.employee_name}

//                     </h1>

//                     <div className="gx-designation">

//                         <FaUserShield/>

//                         <span>

//                             {profile.designation}

//                         </span>

//                     </div>

//                     <div className="gx-chip-container">

//                         <span className="gx-chip blue">

//                             {profile.employee_code}

//                         </span>

//                         <span className="gx-chip green">

//                             Active

//                         </span>

//                         <span className="gx-chip orange">

//                             {profile.department}

//                         </span>

//                     </div>
//                                         <div className="gx-header-info">

//                         <div>

//                             <FaMapMarkerAlt/>

//                             <span>

//                                 Airport Project

//                             </span>

//                         </div>

//                         <div>

//                             <FaClock/>

//                             <span>

//                                 Day Shift

//                             </span>

//                         </div>

//                         <div>

//                             <FaCalendarAlt/>

//                             <span>

//                                 Joined

//                                 {profile.joining_date}

//                             </span>

//                         </div>

//                     </div>

//                 </div>

//             </div>
//                         <div className="gx-header-right">

//                 <button

//                     className="gx-header-btn"

//                     onClick={onEdit}

//                 >

//                     <FaEdit/>

//                     Edit Profile

//                 </button>

//                 <button

//                     className="gx-header-btn light"

//                 >

//                     <FaDownload/>

//                     Download ID

//                 </button>

//             </div>

//         </div>

//     );

// }
