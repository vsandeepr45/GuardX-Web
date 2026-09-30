import axios from "axios";

const API = "http://127.0.0.1:5001/api";

/*
=========================================
Get Token
=========================================
*/

function getHeaders() {

    return {

        headers: {

            Authorization: `Bearer ${localStorage.getItem("token")}`

        }

    };

}

/* ==========================================================
   PATROL ROUTES
========================================================== */

/*
=========================================
GET ALL ROUTES
=========================================
*/

export function getRoutes() {

    return axios.get(

        `${API}/patrol/`,

        getHeaders()

    );

}

/*
=========================================
GET ROUTE
=========================================
*/

export function getRoute(id) {

    return axios.get(

        `${API}/patrol/${id}`,

        getHeaders()

    );

}

/*
=========================================
CREATE ROUTE
=========================================
*/

export function createRoute(data) {

    return axios.post(

        `${API}/patrol/`,

        data,

        getHeaders()

    );

}

/*
=========================================
UPDATE ROUTE
=========================================
*/

export function updateRoute(id,data) {

    return axios.put(

        `${API}/patrol/${id}`,

        data,

        getHeaders()

    );

}

/*
=========================================
CHANGE ROUTE STATUS
=========================================
*/

export function changeRouteStatus(id,status) {

    return axios.patch(

        `${API}/patrol/status/${id}`,

        {

            status

        },

        getHeaders()

    );

}

/*
=========================================
DELETE ROUTE
=========================================
*/

export function deleteRoute(id) {

    return axios.delete(

        `${API}/patrol/${id}`,

        getHeaders()

    );

}

/*
=========================================
ROUTE DASHBOARD
=========================================
*/

export function getPatrolDashboard() {

    return axios.get(

        `${API}/patrol/dashboard`,

        getHeaders()

    );

}

/*
=========================================
ROUTE DROPDOWN
=========================================
*/

export function getRouteDropdown(){

    return axios.get(

        `${API}/patrol/dropdown`,

        getHeaders()

    );

}

/* ==========================================================
   CHECKPOINTS
========================================================== */

/*
=========================================
GET CHECKPOINTS
=========================================
*/

export function getCheckpoints(){

    return axios.get(

        `${API}/patrol/checkpoints`,

        getHeaders()

    );

}

/*
=========================================
GET CHECKPOINT
=========================================
*/

export function getCheckpoint(id){

    return axios.get(

        `${API}/patrol/checkpoints/${id}`,

        getHeaders()

    );

}

/*
=========================================
CREATE CHECKPOINT
=========================================
*/

export function createCheckpoint(data){

    return axios.post(

        `${API}/patrol/checkpoints`,

        data,

        getHeaders()

    );

}

/*
=========================================
UPDATE CHECKPOINT
=========================================
*/

export function updateCheckpoint(id,data){

    return axios.put(

        `${API}/patrol/checkpoints/${id}`,

        data,

        getHeaders()

    );

}

/*
=========================================
CHANGE CHECKPOINT STATUS
=========================================
*/

export function changeCheckpointStatus(id,status){

    return axios.patch(

        `${API}/patrol/checkpoints/status/${id}`,

        {

            status

        },

        getHeaders()

    );

}

/*
=========================================
DELETE CHECKPOINT
=========================================
*/

export function deleteCheckpoint(id){

    return axios.delete(

        `${API}/patrol/checkpoints/${id}`,

        getHeaders()

    );

}

/*
=========================================
CHECKPOINT DASHBOARD
=========================================
*/

export function getCheckpointDashboard(){

    return axios.get(

        `${API}/patrol/checkpoints/dashboard`,

        getHeaders()

    );

}

/*
=========================================
CHECKPOINT DROPDOWN
=========================================
*/

export function getCheckpointDropdown(){

    return axios.get(

        `${API}/patrol/checkpoints/dropdown`,

        getHeaders()

    );

}

export function getScheduleDropdown(){

    return axios.get(

        `${API}/patrol/schedules/dropdown`,

        getHeaders()

    );

}


/* ==========================================================
   EMPLOYEE PATROL
========================================================== */

/*
=========================================
MY PATROLS
=========================================
*/

export function getMyPatrols() {

    return axios.get(

        `${API}/employee-patrol/my-patrols`,

        getHeaders()

    );

}

/*
=========================================
START PATROL
=========================================
*/

export function startPatrol(assignmentId) {

    return axios.post(
        `${API}/employee-patrol/start-patrol/${assignmentId}`,
        {},
        getHeaders()
    );

}

/*
=========================================
RESUME PATROL
=========================================
*/

export function resumePatrol() {

    return axios.get(

        `${API}/employee-patrol/resume-patrol`,

        getHeaders()

    );

}

/*
=========================================
SESSION CHECKPOINTS
=========================================
*/

export function getSessionCheckpoints(sessionId) {

    return axios.get(

        `${API}/employee-patrol/session/${sessionId}/checkpoints`,

        getHeaders()

    );

}

/*
=========================================
CHECKPOINT CHECK-IN
=========================================
*/

// export function checkpointCheckin(data) {

//     return axios.post(

//         `${API}/employee-patrol/checkpoint-checkin`,

//         data,

//         getHeaders()

//     );

// }
export function checkpointCheckin(formData) {

    return axios.post(

        `${API}/employee-patrol/checkpoint-checkin`,

        formData,

        {

            headers: {

                Authorization: `Bearer ${localStorage.getItem("token")}`,

                "Content-Type": "multipart/form-data"

            }

        }

    );

}
/*
=========================================
COMPLETE PATROL
=========================================
*/

export function completePatrol(sessionId) {

    return axios.post(

        `${API}/employee-patrol/complete-patrol/${sessionId}`,

        {},

        getHeaders()

    );

}



/*
=========================================
PATROL SESSION
=========================================
*/

export function getPatrolSession(sessionId){

    return axios.get(

        `${API}/employee-patrol/session/${sessionId}`,

        getHeaders()

    );

}

export function getCheckpointDetails(id){

    return axios.get(

        `${API}/employee-patrol/checkpoint/${id}`,

        getHeaders()

    );

}

// export const uploadPatrolPhoto = (formData) => {

//     return api.post(
//         "/upload/patrol-photo",
//         formData,
//         {
//             headers: {
//                 "Content-Type": "multipart/form-data"
//             }
//         }
//     );

// };

export function getCompletedPatrol(sessionId){

    return axios.get(

        `${API}/employee-patrol/completed/${sessionId}`,

        getHeaders()

    );

}

/* ==========================================================
   ADMIN PATROL DASHBOARD
========================================================== */

/*
=========================================
PATROL DASHBOARD SUMMARY
=========================================
*/

export function getAdminPatrolDashboard(){

    return axios.get(

        `${API}/patrol/dashboard`,

        getHeaders()

    );

}

/*
=========================================
RUNNING PATROLS
=========================================
*/

export function getRunningPatrols(){

    return axios.get(

        `${API}/patrol/running`,

        getHeaders()

    );

}

/*
=========================================
RECENT COMPLETED PATROLS
=========================================
*/

export function getCompletedPatrols(){

    return axios.get(

        `${API}/patrol/completed`,

        getHeaders()

    );

}