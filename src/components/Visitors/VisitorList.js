import React from "react";
import VisitorRow from "./VisitorRow";

export default function VisitorList({

    visitors = [],

    onView,

    onApprove,

    onReject,

    onCheckIn,

    onCheckOut,

    canApprove = false,

    canCheckIn = false,

    canCheckOut = false

}) {

    return (

        <div className="gx-visitor-list">

            <div className="gx-visitor-list-header">

                <div>VISITOR</div>

                <div>COMPANY / PURPOSE</div>

                <div>SITE / HOST</div>

                <div>EXPECTED TIME</div>

                <div>STATUS</div>

                <div>ACTIONS</div>

            </div>


            {visitors.length === 0 ? (

                <div className="gx-visitor-empty">

                    <div className="gx-empty-icon">
                        👥
                    </div>

                    <h3>
                        No visitors today
                    </h3>

                    <p>
                        Scheduled visitors will appear here.
                    </p>

                </div>

            ) : (

                visitors.map((visitor) => (

<VisitorRow

    key={visitor.id}

    visitor={visitor}

    onView={onView}

    onApprove={onApprove}

    onReject={onReject}

    onCheckIn={onCheckIn}

    onCheckOut={onCheckOut}

    canApprove={canApprove}

    canCheckIn={canCheckIn}

    canCheckOut={canCheckOut}

/>

                ))

            )}

        </div>

    );

}