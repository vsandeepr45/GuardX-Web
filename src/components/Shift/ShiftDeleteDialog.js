import React from "react";

import {

FaTrashAlt

} from "react-icons/fa";

function ShiftDeleteDialog({

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

<FaTrashAlt/>

&nbsp;

Delete Shift

</h2>

</div>

<div className="gx-status-body">

<h3>

Delete Shift?

</h3>

<p>

<strong>

{shift.shift_name}

</strong>

</p>

<p>

This action cannot be undone.

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

style={{

background:"#dc2626"

}}

onClick={confirm}

>

Delete

</button>

</div>

</div>

</div>

);

}

export default ShiftDeleteDialog;