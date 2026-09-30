import axios from "axios";

const API = "http://127.0.0.1:5001/api";

function getHeaders() {

    return {

        headers: {

            Authorization: `Bearer ${localStorage.getItem("token")}`

        }

    };

}


/*
============================================================
GET ALL NOTIFICATIONS
============================================================
*/

export const getNotifications = () =>

    axios.get(

        `${API}/notifications/`,

        getHeaders()

    );


/*
============================================================
GET UNREAD COUNT
============================================================
*/

export const getUnreadNotificationCount = () =>

    axios.get(

        `${API}/notifications/unread-count`,

        getHeaders()

    );


/*
============================================================
MARK ONE NOTIFICATION AS READ
============================================================
*/

export const markNotificationRead = (
    notificationId
) =>

    axios.patch(

        `${API}/notifications/${notificationId}/read`,

        {},

        getHeaders()

    );


/*
============================================================
MARK ALL NOTIFICATIONS AS READ
============================================================
*/

export const markAllNotificationsRead = () =>

    axios.patch(

        `${API}/notifications/read-all`,

        {},

        getHeaders()

    );