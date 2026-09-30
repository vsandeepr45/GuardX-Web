import React, {
    useEffect,
    useRef,
    useState
} from "react";

import {
    FaBell
} from "react-icons/fa";

import {
    getUnreadNotificationCount
} from "../../api/notifications";

import NotificationPanel
    from "../Notifications/NotificationPanel";

import "../../styles/Notification.css";


export default function NotificationBell() {

    const [unreadCount, setUnreadCount] = useState(0);

    const [open, setOpen] = useState(false);

    const bellRef = useRef(null);


    /*
    ========================================================
    LOAD UNREAD COUNT
    ========================================================
    */

    const loadUnreadCount = async () => {

        try {

            const response =
                await getUnreadNotificationCount();

            if (
                response.data &&
                response.data.success
            ) {

                setUnreadCount(
                    response.data.data?.count || 0
                );

            }

        } catch (error) {

            console.error(
                "Unable to load notification count:",
                error
            );

        }

    };


    /*
    ========================================================
    INITIAL LOAD
    ========================================================
    */

    useEffect(() => {

        loadUnreadCount();

    }, []);


    /*
    ========================================================
    CLOSE WHEN CLICKING OUTSIDE
    ========================================================
    */

    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                bellRef.current &&
                !bellRef.current.contains(event.target)
            ) {

                setOpen(false);

            }

        };


        document.addEventListener(
            "mousedown",
            handleClickOutside
        );


        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };

    }, []);


    /*
    ========================================================
    TOGGLE PANEL
    ========================================================
    */

    const handleToggle = () => {

        setOpen(
            previous => !previous
        );

    };


    /*
    ========================================================
    AFTER READ
    ========================================================
    */

    const handleNotificationChange = () => {

        loadUnreadCount();

    };


    return (

        <div
            className="gx-notification-bell-wrapper"
            ref={bellRef}
        >

            <button
                type="button"
                className="gx-notification-bell"
                onClick={handleToggle}
                aria-label="Notifications"
            >

                <FaBell />

                {
                    unreadCount > 0 && (

                        <span className="gx-notification-badge">

                            {
                                unreadCount > 99
                                    ? "99+"
                                    : unreadCount
                            }

                        </span>

                    )
                }

            </button>


            {
                open && (

                    <NotificationPanel
                        onNotificationChange={
                            handleNotificationChange
                        }
                    />

                )
            }

        </div>

    );

}