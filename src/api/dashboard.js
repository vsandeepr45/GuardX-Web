import axios from "axios";

const API = "http://127.0.0.1:5001/api";

function getHeaders() {

    return {

        headers: {

            Authorization: `Bearer ${localStorage.getItem("token")}`

        }

    };

}

export const getDashboard = () =>

    axios.get(

        `${API}/dashboard/`,

        getHeaders()

    );




// import axios from "axios";

// const API = "http://127.0.0.1:5001/api";

// function getHeaders() {
//     return {
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`
//         }
//     };
// }

// /* ==========================================================
//    MAIN DASHBOARD
// ========================================================== */

// export function getDashboard() {
//     return axios.get(
//         `${API}/dashboard`,
//         getHeaders()
//     );
// }

// /* ==========================================================
//    CHARTS
// ========================================================== */

// export function getCharts() {
//     return axios.get(
//         `${API}/dashboard/charts`,
//         getHeaders()
//     );
// }

// /* ==========================================================
//    NOTIFICATIONS
// ========================================================== */

// export function getNotifications() {
//     return axios.get(
//         `${API}/dashboard/notifications`,
//         getHeaders()
//     );
// }

// /* ==========================================================
//    ACTIVITIES
// ========================================================== */

// export function getActivities() {
//     return axios.get(
//         `${API}/dashboard/activities`,
//         getHeaders()
//     );
// }

// /* ==========================================================
//    QUICK ACTIONS
// ========================================================== */

// export function getQuickActions() {
//     return axios.get(
//         `${API}/dashboard/quick-actions`,
//         getHeaders()
//     );
// }