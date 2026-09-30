import React from "react";

import {

FaExchangeAlt

} from "react-icons/fa";

function ShiftStatusDialog({

open,

shift,

close,

confirm

}){

if(!open) return null;

return(

<div className="gx-modal">

<div className="gx-status-modal">

<div className="gx-status-header">

<h2>

<FaExchangeAlt/>

&nbsp;

Change Shift Status

</h2>

</div>

<div className="gx-status-body">

<h3>

{

shift.status

?

"Deactivate Shift?"

:

"Activate Shift?"

}

</h3>

<p>

<strong>

{shift.shift_name}

</strong>

</p>

</div>

<div className="gx-status-footer">

<button

className="btn-light"

onClick={close}

>

Cancel

</button>

<button

className="btn-primary"

onClick={confirm}

>

Confirm

</button>

</div>

</div>

</div>

);

}

export default ShiftStatusDialog;