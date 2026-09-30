export default function DeviceTab({

    session

}){

    if(!session){

        return(

            <div className="gx-empty-tab">

                <h3>No Device Connected</h3>

                <p>

                    Patrol has not started yet.

                </p>

            </div>

        );

    }

    return(

        <div className="gx-device-tab">

            <h3>Device Information</h3>

            <p>

                <b>Device :</b>

                {session.session.device_name || "--"}

            </p>

            <p>

                <b>Battery :</b>

                {session.session.battery_level}%

            </p>

            <p>

                <b>Last Activity :</b>

                {session.session.last_activity || "--"}

            </p>

        </div>

    );

}