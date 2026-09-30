import React, {
    useEffect,
    useState
} from "react";

import {
    FaCheckCircle,
    FaExclamationTriangle,
    FaInfoCircle
} from "react-icons/fa";

import {
    getNotifications,
    markNotificationRead,
    markAllNotificationsRead
} from "../../api/notifications";

import "../../styles/Notification.css";


const priorityIcons = {

    critical: <FaExclamationTriangle />,

    high: <FaExclamationTriangle />,

    normal: <FaInfoCircle />,

    low: <FaCheckCircle />

};


export default function NotificationPanel({
    onNotificationChange
}) {

    const [
        notifications,
        setNotifications
    ] = useState([]);

    const [
        loading,
        setLoading
    ] = useState(true);


    /*
    ========================================================
    LOAD NOTIFICATIONS
    ========================================================
    */

    const loadNotifications = async () => {

        try {

            setLoading(true);

            const response =
                await getNotifications();

            if (
                response.data &&
                response.data.success
            ) {

                setNotifications(
                    response.data.data || []
                );

            }

        } catch (error) {

            console.error(
                "Unable to load notifications:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadNotifications();

    }, []);


    /*
    ========================================================
    MARK ONE READ
    ========================================================
    */

    const handleNotificationClick = async (
        notification
    ) => {

        try {

            if (!notification.is_read) {

                await markNotificationRead(
                    notification.id
                );

                setNotifications(
                    previous =>
                        previous.map(item =>

                            item.id === notification.id

                                ? {
                                    ...item,
                                    is_read: true
                                }

                                : item

                        )
                );

                if (onNotificationChange) {

                    onNotificationChange();

                }

            }

        } catch (error) {

            console.error(
                "Unable to mark notification as read:",
                error
            );

        }


        /*
        ====================================================
        OPEN RELATED PAGE
        ====================================================
        */

        if (notification.action_url) {

            window.location.href =
                notification.action_url;

        }

    };


    /*
    ========================================================
    MARK ALL READ
    ========================================================
    */

    const handleMarkAllRead = async () => {

        try {

            await markAllNotificationsRead();

            setNotifications(
                previous =>
                    previous.map(item => ({
                        ...item,
                        is_read: true
                    }))
            );

            if (onNotificationChange) {

                onNotificationChange();

            }

        } catch (error) {

            console.error(
                "Unable to mark all notifications as read:",
                error
            );

        }

    };


    return (

        <div className="gx-notification-panel">

            <div className="gx-notification-panel-header">

                <div>

                    <h3>
                        Notifications
                    </h3>

                    <span>
                        Your latest updates
                    </span>

                </div>


                {
                    notifications.some(
                        item => !item.is_read
                    ) && (

                        <button
                            type="button"
                            onClick={handleMarkAllRead}
                        >
                            Mark all read
                        </button>

                    )
                }

            </div>


            <div className="gx-notification-list">

                {
                    loading ? (

                        <div className="gx-notification-empty">

                            Loading notifications...

                        </div>

                    ) : notifications.length === 0 ? (

                        <div className="gx-notification-empty">

                            <FaCheckCircle />

                            <strong>
                                You're all caught up
                            </strong>

                            <span>
                                No new notifications.
                            </span>

                        </div>

                    ) : (

                        notifications.map(notification => (

                            <button
                                type="button"
                                key={notification.id}
                                className={
                                    `gx-notification-item ${
                                        notification.is_read
                                            ? "read"
                                            : "unread"
                                    }`
                                }
                                onClick={() =>
                                    handleNotificationClick(
                                        notification
                                    )
                                }
                            >

                                <div
                                    className={
                                        `gx-notification-item-icon priority-${notification.priority}`
                                    }
                                >

                                    {
                                        priorityIcons[
                                            notification.priority
                                        ] ||
                                        <FaInfoCircle />
                                    }

                                </div>


                                <div className="gx-notification-item-content">

                                    <div className="gx-notification-item-top">

                                        <strong>
                                            {notification.title}
                                        </strong>

                                        {
                                            !notification.is_read && (

                                                <span className="gx-notification-unread-dot" />

                                            )
                                        }

                                    </div>


                                    <p>
                                        {notification.message}
                                    </p>


                                    <span className="gx-notification-time">

                                        {
                                            new Date(
                                                notification.created_at
                                            ).toLocaleString()
                                        }

                                    </span>

                                </div>

                            </button>

                        ))

                    )
                }

            </div>

        </div>

    );

}