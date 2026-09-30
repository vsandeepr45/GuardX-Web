// import {

//     FaUserCheck,
//     FaWalking,
//     FaExclamationTriangle,
//     FaClock

// } from "react-icons/fa";

// export default function QuickStats() {

//     const cards = [

//         {

//             title:"Attendance",

//             value:"98%",

//             icon:<FaUserCheck/>,

//             color:"green"

//         },

//         {

//             title:"Patrols",

//             value:"326",

//             icon:<FaWalking/>,

//             color:"blue"

//         },

//         {

//             title:"Incidents",

//             value:"08",

//             icon:<FaExclamationTriangle/>,

//             color:"orange"

//         },

//         {

//             title:"Experience",

//             value:"4 Years",

//             icon:<FaClock/>,

//             color:"purple"

//         }

//     ];

//     return (

//         <div className="gx-stat-grid">

//             {

//                 cards.map((card,index)=>

//                     <div
//                         key={index}
//                         className={`gx-stat-card ${card.color}`}
//                     >

//                         <div>

//                             <h4>

//                                 {card.title}

//                             </h4>

//                             <h2>

//                                 {card.value}

//                             </h2>

//                         </div>

//                         <div className="gx-stat-icon">

//                             {card.icon}

//                         </div>

//                     </div>

//                 )

//             }

//         </div>

//     );

// }