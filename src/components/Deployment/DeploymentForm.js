// import React, { useState, useEffect } from "react";
// import "../../styles/DeploymentForm.css";

// function DeploymentForm({
//     open,
//     deployment,
//     employees = [],
//     companies = [],
//     clients = [],
//     projects = [],
//     sites = [],
//     shifts = [],
//     onClose,
//     onSubmit
// }) {

//     const [formData, setFormData] = useState({
//         deployment_code: `DEP${Date.now().toString().slice(-6)}`,
//         employee_id: "",
//         company_id: "",
//         client_id: "",
//         project_id: "",
//         site_id: "",
//         duty_shift_id: "",
//         duty_position: "",
//         deployment_type: "Permanent",
//         priority: 1,
//         from_date: "",
//         to_date: "",
//         remarks: ""
//     });

//     const filteredClients = formData.company_id
//         ? clients.filter(
//             item => Number(item.company_id) === Number(formData.company_id)
//         )
//         : [];

//     const filteredProjects = formData.client_id
//         ? projects.filter(
//             item => Number(item.client_id) === Number(formData.client_id)
//         )
//         : [];

//     const filteredSites = formData.project_id
//         ? sites.filter(
//             item => Number(item.project_id) === Number(formData.project_id)
//         )
//         : [];


//     useEffect(() => {

//         if (deployment) {
//             setFormData({
//                 deployment_code:
//                     deployment.deployment_code,

//                 employee_id:
//                     deployment.employee_id || "",

//                 company_id:
//                     deployment.company_id || "",

//                 client_id:
//                     deployment.client_id || "",

//                 project_id:
//                     deployment.project_id || "",

//                 site_id:
//                     deployment.site_id || "",

//                 duty_shift_id:
//                     deployment.duty_shift_id || "",

//                 duty_position:
//                     deployment.duty_position || "",

//                 deployment_type:
//                     deployment.deployment_type || "Permanent",

//                 priority:
//                     deployment.priority || 1,

//                 from_date:
//                     deployment.from_date || "",

//                 to_date:
//                     deployment.to_date || "",

//                 remarks:
//                     deployment.remarks || ""
//             });

//         }

//     }, [deployment]);

// const handleChange = (e) => {

//     const { name, value } = e.target;

//     let data = {
//         ...formData,
//         [name]: value
//     };

//     if (name === "company_id") {

//         data.client_id = "";
//         data.project_id = "";
//         data.site_id = "";

//     }

//     if (name === "client_id") {

//         data.project_id = "";
//         data.site_id = "";

//     }

//     if (name === "project_id") {

//         data.site_id = "";

//     }

//     setFormData(data);

// };

//     const handleSubmit = (e) => {

//         if (!formData.employee_id)
//             return alert("Select Employee");

//         if (!formData.company_id)
//             return alert("Select Company");

//         if (!formData.client_id)
//             return alert("Select Client");

//         if (!formData.project_id)
//             return alert("Select Project");

//         if (!formData.site_id)
//             return alert("Select Site");

//         if (!formData.duty_shift_id)
//             return alert("Select Shift");

//         if (!formData.from_date)
//             return alert("Select From Date");

//         e.preventDefault();

//         onSubmit(formData);

//     };

//     if (!open) {
//         return null;
//     }

//     return (

//         <div className="dp-modal">

//             <div className="dp-modal-content">

//                 <h2>
//                     {
//                         deployment
//                             ? "Edit Deployment"
//                             : "Add Deployment"
//                     }
//                 </h2>
                    
//                 <form className="dp-form" onSubmit={handleSubmit}>

//                     <input
//                         className="dp-input"
//                         type="text"
//                         name="deployment_code"
//                         readOnly
//                         placeholder="Deployment Code"
//                         value={formData.deployment_code}
//                         onChange={handleChange}
//                     />

//                     <select

//                         className="dp-select"
//                         name="employee_id"
//                         value={formData.employee_id}
//                         onChange={handleChange}
//                     >
//                         <option value="">
//                             Select Employee
//                         </option>

//                         {
//                             employees.map(emp => (
//                                 <option
//                                     key={emp.id}
//                                     value={emp.id}
//                                 >
//                                     {emp.employee_name}
//                                 </option>
//                             ))
//                         }
//                     </select>

//                     <select
//                         className="dp-select"
//                         name="company_id"
//                         value={formData.company_id}
//                         onChange={handleChange}
//                     >
//                         <option value="">
//                             Select Company
//                         </option>

//                         {
//                             companies.map(company => (
//                                 <option
//                                     key={company.id}
//                                     value={company.id}
//                                 >
//                                     {company.company_name}
//                                 </option>
//                             ))
//                         }
//                     </select>

//                     <select
//                         className="dp-select"
//                         name="client_id"
//                         value={formData.client_id}
//                         onChange={handleChange}
//                     >
//                         <option value="">
//                             Select Client
//                         </option>

//                         {
//                             filteredClients.map(item => (
//                                 <option
//                                     key={item.id}
//                                     value={item.id}
//                                 >
//                                     {item.client_name}
//                                 </option>
//                             ))
//                         }
//                     </select>

//                     <select
//                         className="dp-select"
//                         name="project_id"
//                         value={formData.project_id}
//                         onChange={handleChange}
//                     >
//                         <option value="">
//                             Select Project
//                         </option>

//                         {
//                             filteredProjects.map(item => (
//                                 <option
//                                     key={item.id}
//                                     value={item.id}
//                                 >
//                                     {item.project_name}
//                                 </option>
//                             ))
//                         }
//                     </select>

//                     <select
//                     className="dp-select"
//                         name="site_id"
//                         value={formData.site_id}
//                         onChange={handleChange}
//                     >
//                         <option value="">
//                             Select Site
//                         </option>

//                         {
//                             filteredSites.map(item => (
//                                 <option
//                                     key={item.id}
//                                     value={item.id}
//                                 >
//                                     {item.site_name}
//                                 </option>
//                             ))
//                         }
//                     </select>

//                     <input
//                         className="dp-input"
//                         type="text"
//                         name="duty_position"
//                         placeholder="Duty Position"
//                         value={formData.duty_position}
//                         onChange={handleChange}
//                     />

//                     <select
//                     className="dp-select"
//                         name="duty_shift_id"
//                         value={formData.duty_shift_id}
//                         onChange={handleChange}
//                     >
//                         <option value="">
//                             Select Shift
//                         </option>

//                         {
//                             shifts.map(item => (
//                                 <option
//                                     key={item.id}
//                                     value={item.id}
//                                 >
//                                     {item.shift_name}
//                                 </option>
//                             ))
//                         }
//                     </select>

//                     <select
//                     className="dp-select"
//                         name="deployment_type"
//                         value={formData.deployment_type}
//                         onChange={handleChange}
//                     >
//                         <option value="Permanent">
//                             Permanent
//                         </option>

//                         <option value="Temporary">
//                             Temporary
//                         </option>

//                         <option value="Rotation">
//                             Rotation
//                         </option>
//                     </select>

//                     <input
//                         className="dp-input"
//                         type="number"
//                         name="priority"
//                         value={formData.priority}
//                         onChange={handleChange}
//                     />

//                     <input
//                         className="dp-input"
//                         type="date"
//                         name="from_date"
//                         value={formData.from_date}
//                         onChange={handleChange}
//                     />

//                     <input
//                         className="dp-input"
//                         type="date"
//                         name="to_date"
//                         value={formData.to_date}
//                         onChange={handleChange}
//                     />

//                     <textarea
//                     className="dp-textarea"
//                         name="remarks"
//                         placeholder="Remarks"
//                         value={formData.remarks}
//                         onChange={handleChange}
//                     />

// <div className="dp-btn-group">

//                         <button
//                         className="dp-btn dp-btn-cancel"
//                             type="button"
//                             onClick={onClose}
//                         >
//                             Cancel
//                         </button>

//                         <button className="dp-btn dp-btn-save" type="submit">
//                             Save
//                         </button>

//                     </div>

//                 </form>

//             </div>

//         </div>

//     );

// }

// export default DeploymentForm;








import React, {
    useEffect,
    useState
} from "react";

import "../../styles/DeploymentForm.css";


function DeploymentForm({

    open,

    deployment,

    employees = [],

    companies = [],

    clients = [],

    projects = [],

    sites = [],

    shifts = [],

    onClose,

    onSubmit

}) {

    const [formData, setFormData] = useState({

        deployment_code: "",

        deployment_request_id: "",

        employee_id: "",

        site_id: "",

        site_name: "",

        company_id: "",
        client_id: "",
        project_id: "",

        duty_shift_id: "",

        duty_position: "",

        deployment_type: "Permanent",

        priority: 1,

        from_date: "",

        to_date: "",

        remarks: "",

        requested_guards: 0,

        deployed_guards: 0,

        remaining_guards: 0

    });


    // ==========================================
    // FILTER CLIENTS
    // ==========================================

    const filteredClients =
        formData.company_id

            ? clients.filter(
                item =>
                    Number(item.company_id) ===
                    Number(formData.company_id)
            )

            : [];


    // ==========================================
    // FILTER PROJECTS
    // ==========================================

    const filteredProjects =
        formData.client_id

            ? projects.filter(
                item =>
                    Number(item.client_id) ===
                    Number(formData.client_id)
            )

            : [];


    // ==========================================
    // FILTER SITES
    // ==========================================

    const filteredSites =
        formData.project_id

            ? sites.filter(
                item =>
                    Number(item.project_id) ===
                    Number(formData.project_id)
            )

            : [];


    // ==========================================
    // LOAD DEPLOYMENT
    // ==========================================

    useEffect(() => {

        if (!deployment) {

            setFormData({

                deployment_code: "",

                deployment_request_id: "",

                employee_id: "",

                site_id: "",

                site_name: "",

                company_id: "",
                client_id: "",
                project_id: "",

                duty_shift_id: "",

                duty_position: "",

                deployment_type: "Permanent",

                priority: 1,

                from_date: "",

                to_date: "",

                remarks: "",

                requested_guards: 0,

                deployed_guards: 0,

                remaining_guards: 0

            });

            return;

        }


        setFormData({

            deployment_code:
                deployment.deployment_code || "",

            deployment_request_id:
                deployment.deployment_request_id || "",

            employee_id:
                deployment.employee_id || "",

            site_id:
                deployment.site_id || "",

            site_name:
                deployment.site_name || "",

            company_id:
                deployment.company_id || "",

            client_id:
                deployment.client_id || "",

            project_id:
                deployment.project_id || "",

            duty_shift_id:
                deployment.duty_shift_id || "",

            duty_position:
                deployment.duty_position || "",

            deployment_type:
                deployment.deployment_type ||
                "Permanent",

            priority:
                deployment.priority || 1,

            from_date:
                deployment.from_date || "",

            to_date:
                deployment.to_date || "",

            remarks:
                deployment.remarks || "",

            requested_guards:
                Number(
                    deployment.requested_guards || 0
                ),

            deployed_guards:
                Number(
                    deployment.deployed_guards || 0
                ),

            remaining_guards:
                Number(
                    deployment.remaining_guards || 0
                )

        });

    }, [deployment]);


    // ==========================================
    // HANDLE CHANGE
    // ==========================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setFormData(prev => {

            const updated = {

                ...prev,

                [name]: value

            };


            // Only reset these for manual deployment.
            // Request-based deployment fields are disabled.

            if (
                !prev.deployment_request_id &&
                name === "company_id"
            ) {

                updated.client_id = "";
                updated.project_id = "";
                updated.site_id = "";
                updated.site_name = "";

            }


            if (
                !prev.deployment_request_id &&
                name === "client_id"
            ) {

                updated.project_id = "";
                updated.site_id = "";
                updated.site_name = "";

            }


            if (
                !prev.deployment_request_id &&
                name === "project_id"
            ) {

                updated.site_id = "";
                updated.site_name = "";

            }


            return updated;

        });

    };


    // ==========================================
    // SUBMIT
    // ==========================================

    const handleSubmit = (e) => {

        e.preventDefault();


        if (!formData.employee_id) {

            alert(
                "Please select an employee."
            );

            return;

        }


        if (!formData.site_id) {

            alert(
                "Site is required."
            );

            return;

        }


        if (!formData.duty_shift_id) {

            alert(
                "Shift is required."
            );

            return;

        }


        if (!formData.from_date) {

            alert(
                "From date is required."
            );

            return;

        }


        // Request based deployment:
        // remaining guards belongs to THIS SITE

        if (
            formData.deployment_request_id &&
            Number(formData.remaining_guards) <= 0
        ) {

            alert(
                "All required guards are already deployed for this site."
            );

            return;

        }


        const payload = {

            ...formData,

            deployment_request_id:
                Number(
                    formData.deployment_request_id
                ),

            employee_id:
                Number(
                    formData.employee_id
                ),

            company_id:
                formData.company_id
                    ? Number(formData.company_id)
                    : null,

            client_id:
                formData.client_id
                    ? Number(formData.client_id)
                    : null,

            project_id:
                formData.project_id
                    ? Number(formData.project_id)
                    : null,

            site_id:
                Number(formData.site_id),

            duty_shift_id:
                Number(formData.duty_shift_id),

            priority:
                Number(formData.priority || 1)

        };


        console.log(
            "================================"
        );

        console.log(
            "DEPLOYMENT PAYLOAD"
        );

        console.log(
            payload
        );

        console.log(
            "================================"
        );


        onSubmit(payload);

    };


    if (!open) {

        return null;

    }


    return (

        <div className="dp-modal">

            <div className="dp-modal-content">

                <h2>

                    {
                        deployment
                            ? "Edit Deployment"
                            : "Assign Employee"
                    }

                </h2>


                {/* ==========================================
                    REQUEST SUMMARY
                ========================================== */}

                {
                    formData.deployment_request_id && (

                        <div className="dp-request-summary">

                            <div className="dp-summary-card">

                                <span>
                                    Request
                                </span>

                                <h3>
                                    DR
                                    {
                                        formData.deployment_request_id
                                    }
                                </h3>

                            </div>


                            <div className="dp-summary-card">

                                <span>
                                    Site
                                </span>

                                <h3>
                                    {
                                        formData.site_name ||
                                        "-"
                                    }
                                </h3>

                            </div>


                            <div className="dp-summary-card">

                                <span>
                                    Required
                                </span>

                                <h3>
                                    {
                                        formData.requested_guards
                                    }
                                </h3>

                            </div>


                            <div className="dp-summary-card">

                                <span>
                                    Assigned
                                </span>

                                <h3>
                                    {
                                        formData.deployed_guards
                                    }
                                </h3>

                            </div>


                            <div className="dp-summary-card">

                                <span>
                                    Remaining
                                </span>

                                <h3>
                                    {
                                        formData.remaining_guards
                                    }
                                </h3>

                            </div>

                        </div>

                    )
                }


                <form
                    className="dp-form"
                    onSubmit={handleSubmit}
                >

                    {/* ==========================================
                        DEPLOYMENT CODE
                    ========================================== */}

                    <input
                        className="dp-input"
                        type="text"
                        name="deployment_code"
                        readOnly
                        placeholder="Deployment Code"
                        value={
                            formData.deployment_code
                        }
                        onChange={handleChange}
                    />


                    {/* ==========================================
                        EMPLOYEE
                    ========================================== */}

                    <select
                        className="dp-select"
                        name="employee_id"
                        value={
                            formData.employee_id
                        }
                        onChange={handleChange}
                        required
                    >

                        <option value="">
                            Select Employee
                        </option>

                        {
                            employees.map(
                                emp => (

                                    <option
                                        key={emp.id}
                                        value={emp.id}
                                    >

                                        {
                                            emp.employee_name
                                        }

                                    </option>

                                )
                            )
                        }

                    </select>


                    {/* ==========================================
                        COMPANY
                    ========================================== */}

                    <select
                        className="dp-select"
                        name="company_id"
                        value={
                            formData.company_id
                        }
                        onChange={handleChange}
                        disabled={
                            !!formData.deployment_request_id
                        }
                    >

                        <option value="">
                            Select Company
                        </option>

                        {
                            companies.map(
                                company => (

                                    <option
                                        key={company.id}
                                        value={company.id}
                                    >

                                        {
                                            company.company_name
                                        }

                                    </option>

                                )
                            )
                        }

                    </select>


                    {/* ==========================================
                        CLIENT
                    ========================================== */}

                    <select
                        className="dp-select"
                        name="client_id"
                        value={
                            formData.client_id
                        }
                        onChange={handleChange}
                        disabled={
                            !!formData.deployment_request_id
                        }
                    >

                        <option value="">
                            Select Client
                        </option>

                        {
                            filteredClients.map(
                                item => (

                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >

                                        {
                                            item.client_name
                                        }

                                    </option>

                                )
                            )
                        }

                    </select>


                    {/* ==========================================
                        PROJECT
                    ========================================== */}

                    <select
                        className="dp-select"
                        name="project_id"
                        value={
                            formData.project_id
                        }
                        onChange={handleChange}
                        disabled={
                            !!formData.deployment_request_id
                        }
                    >

                        <option value="">
                            Select Project
                        </option>

                        {
                            filteredProjects.map(
                                item => (

                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >

                                        {
                                            item.project_name
                                        }

                                    </option>

                                )
                            )
                        }

                    </select>


                    {/* ==========================================
                        SITE
                    ========================================== */}

                    <input
                        className="dp-input"
                        type="text"
                        value={
                            formData.site_name
                        }
                        placeholder="Selected Site"
                        readOnly
                    />


                    {/* ==========================================
                        REQUEST ID
                    ========================================== */}

                    <input
                        type="hidden"
                        name="deployment_request_id"
                        value={
                            formData.deployment_request_id
                        }
                    />


                    {/* ==========================================
                        SITE ID
                    ========================================== */}

                    <input
                        type="hidden"
                        name="site_id"
                        value={
                            formData.site_id
                        }
                    />


                    {/* ==========================================
                        DUTY POSITION
                    ========================================== */}

                    <input
                        className="dp-input"
                        type="text"
                        name="duty_position"
                        placeholder="Duty Position"
                        value={
                            formData.duty_position
                        }
                        onChange={handleChange}
                    />


                    {/* ==========================================
                        SHIFT
                    ========================================== */}

                    <select
                        className="dp-select"
                        name="duty_shift_id"
                        value={
                            formData.duty_shift_id
                        }
                        onChange={handleChange}
                        disabled={
                            !!formData.deployment_request_id
                        }
                        required
                    >

                        <option value="">
                            Select Shift
                        </option>

                        {
                            shifts.map(
                                item => (

                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >

                                        {
                                            item.shift_name
                                        }

                                    </option>

                                )
                            )
                        }

                    </select>


                    {/* ==========================================
                        DEPLOYMENT TYPE
                    ========================================== */}

                    <select
                        className="dp-select"
                        name="deployment_type"
                        value={
                            formData.deployment_type
                        }
                        onChange={handleChange}
                    >

                        <option value="Permanent">
                            Permanent
                        </option>

                        <option value="Temporary">
                            Temporary
                        </option>

                        <option value="Rotation">
                            Rotation
                        </option>

                    </select>


                    {/* ==========================================
                        PRIORITY
                    ========================================== */}

                    <input
                        className="dp-input"
                        type="number"
                        name="priority"
                        value={
                            formData.priority
                        }
                        onChange={handleChange}
                        min="1"
                    />


                    {/* ==========================================
                        FROM DATE
                    ========================================== */}

                    <input
                        className="dp-input"
                        type="date"
                        name="from_date"
                        value={
                            formData.from_date
                        }
                        onChange={handleChange}
                        required
                    />


                    {/* ==========================================
                        TO DATE
                    ========================================== */}

                    <input
                        className="dp-input"
                        type="date"
                        name="to_date"
                        value={
                            formData.to_date
                        }
                        onChange={handleChange}
                    />


                    {/* ==========================================
                        REMARKS
                    ========================================== */}

                    <textarea
                        className="dp-textarea"
                        name="remarks"
                        placeholder="Remarks"
                        value={
                            formData.remarks
                        }
                        onChange={handleChange}
                    />


                    {/* ==========================================
                        BUTTONS
                    ========================================== */}

                    <div className="dp-btn-group">

                        <button
                            className="dp-btn dp-btn-cancel"
                            type="button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>


                        <button
                            className="dp-btn dp-btn-save"
                            type="submit"
                            disabled={
                                formData.deployment_request_id &&
                                Number(
                                    formData.remaining_guards
                                ) <= 0
                            }
                        >
                            {
                                deployment
                                    ? "Update"
                                    : "Deploy Employee"
                            }
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default DeploymentForm;