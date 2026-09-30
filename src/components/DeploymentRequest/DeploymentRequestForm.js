import React, {
    useEffect,
    useMemo,
    useState
} from "react";

import "../../styles/DeploymentRequest.css";
import SiteSelectionModal from "./SiteSelectionModal";


function DeploymentRequestForm({

    open,

    request,

    companies,

    clients,

    projects,

    sites,

    shifts,

    onClose,

    onSubmit

}) {

const [formData, setFormData] = useState({

    company_id: "",

    client_id: "",

    project_id: "",

    selected_sites: [],

    shift_id: "",

    request_type: "New Deployment",

    requested_guards: 0,

    required_from: "",

    required_to: "",

    priority: "Medium",

    remarks: ""

});
const [sitePopup, setSitePopup] = useState(false);


    // ===============================
    // EDIT DATA
    // ===============================

    useEffect(() => {

        if (request) {

            setFormData({

                company_id: request.company_id || "",

                client_id: request.client_id || "",

                project_id: request.project_id || "",

                selected_sites: request.selected_sites || [],

                shift_id: request.shift_id || "",
                            request_type:
                request.request_type || "New Deployment",

                requested_guards:
                    request.requested_guards || "",

                priority:
                    request.priority || "Medium",

                remarks:
                    request.remarks || ""

            });

        }

        else {

            setFormData({

                company_id: "",

                client_id: "",

                project_id: "",

                selected_sites: [],

                shift_id: "",
                request_type: "New Deployment",

                requested_guards: "",

                priority: "Medium",

                remarks: ""

            });

        }

    }, [request]);


    // ===============================
    // FILTER DROPDOWNS
    // ===============================

    const filteredClients = useMemo(() => {

        if (!formData.company_id)

            return [];

        return clients.filter(

            item =>

                String(item.company_id) ===
                String(formData.company_id)

        );

    }, [

        clients,

        formData.company_id

    ]);


    const filteredProjects = useMemo(() => {

        if (!formData.client_id) return [];

        return projects.filter(
            item => String(item.client_id) === String(formData.client_id)
        );

    }, [projects, formData.client_id]);

const filteredSites = useMemo(() => {

    if (!formData.project_id)
        return [];

    return sites.filter(site =>
        Number(site.project_id) ===
        Number(formData.project_id)
    );

}, [

    sites,

    formData.project_id

]);

    if (!open) {

        return null;

    }

    // ===============================
    // HANDLE CHANGE
    // ===============================

    const handleChange = (e) => {

        const {

            name,

            value

        } = e.target;

        setFormData((prev) => {

            const updated = {

                ...prev,

                [name]: value

            };

            // Reset dependent dropdowns

            if (name === "company_id") {

                updated.client_id = "";
                updated.project_id = "";
                updated.site_id = "";

            }

            if (name === "client_id") {

                updated.project_id = "";
                updated.site_id = "";

            }

if (name === "project_id") {

    updated.selected_sites = [];
    updated.requested_guards = 0;

}

            return updated;

        });

    };


  

    // ===============================
    // SUBMIT
    // ===============================

const handleSubmit = (e) => {

    e.preventDefault();

    if (

        !formData.company_id ||

        !formData.client_id ||

        !formData.project_id ||

        formData.selected_sites.length === 0 ||

        !formData.priority

    ) {

        alert("Please fill all required fields.");
        

        return;

    }

    const payload = {

        company_id: Number(formData.company_id),

        client_id: Number(formData.client_id),

        project_id: Number(formData.project_id),

        priority: formData.priority,

        request_type: formData.request_type,

        remarks: formData.remarks,

        required_from: formData.required_from,

        required_to: formData.required_to,

        sites: formData.selected_sites.map(site => ({

            site_id: site.id,

            shift_id: Number(formData.shift_id),

            required_guards: Number(site.total_guards)

        }))

    };

    onSubmit(payload);

};


    // ===============================
    // JSX START
    // ===============================

    return (

        <div className="dr-modal-overlay">

            <div className="dr-modal-box">

                <div className="dr-header">

                    <h2 className="dr-title">

                        {

                            request

                                ?

                                "Edit Deployment Request"

                                :

                                "New Deployment Request"

                        }

                    </h2>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="dr-form"
                >
                    <div className="dr-grid">

                        {/* Company */}

                        <div className="dr-group">

                            <label className="dr-label">Company *</label>

                            <select
                                className="dr-select"
                                name="company_id"
                                value={formData.company_id}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Company
                                </option>

                                {companies.map((item) => (

                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >

                                        {item.company_name}

                                    </option>

                                ))}

                            </select>

                        </div>


                        {/* Client */}

                        <div className="gx-form-group">

                            <label className="dr-label">Client *</label>

                            <select
                                className="dr-select"
                                name="client_id"
                                value={formData.client_id}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Client
                                </option>

                                {filteredClients.map((item) => (

                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >

                                        {item.client_name}

                                    </option>

                                ))}

                            </select>

                        </div>


                        {/* Project */}

                        <div className="gx-form-group">

                            <label className="dr-label">Project *</label>

                            <select
                                className="dr-select"
                                name="project_id"
                                value={formData.project_id}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Project
                                </option>

                                {filteredProjects.map((item) => (

                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >

                                        {item.project_name}

                                    </option>

                                ))}

                            </select>

                        </div>


                        {/* Site */}

<div className="gx-form-group">

<label className="dr-label">

Site *

</label>

<div
    className="site-picker"
>

<input

    type="text"

   value={

    formData.selected_sites

        .map(item => item.site_name)

        .join(", ")

}

    placeholder="Select Site"

    readOnly

/>

<button

    type="button"

    className="site-btn"

    disabled={!formData.project_id}

    onClick={() => {

        if (!formData.project_id) {

            alert("Please select Project first.");

            return;

        }

        setSitePopup(true);

    }}

>

Select Site

</button>

</div>

</div>


                        {/* Shift */}

                        <div className="gx-form-group">

                            <label className="dr-label">Shift *</label>

                            <select
                                className="dr-select"
                                name="shift_id"
                                value={formData.shift_id}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Shift
                                </option>

                                {shifts.map((item) => (

                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >

                                        {item.shift_name}

                                    </option>

                                ))}

                            </select>

                        </div>

<div className="gx-form-group">

    <label>
        Request Type *
    </label>

    <select
        name="request_type"
        value={formData.request_type}
        onChange={handleChange}
        required
    >

        <option value="New Deployment">
            New Deployment
        </option>

        <option value="Additional Guards">
            Additional Guards
        </option>

        <option value="Replacement">
            Replacement
        </option>

        <option value="Temporary">
            Temporary
        </option>

        <option value="Emergency">
            Emergency
        </option>

    </select>

</div>

                        {/* Required Guards */}

                        <div className="gx-form-group">

                            <label className="dr-label">

                                Required Guards *

                            </label>

<input

className="dr-input"

type="number"

name="requested_guards"

value={formData.requested_guards}

readOnly

placeholder="Auto Filled"

required

/>

                        </div>


                        {/* Priority */}

                        <div className="gx-form-group">

                            <label className="dr-label">

                                Priority *

                            </label>

                            <select
                                className="dr-select"

                                name="priority"

                                value={formData.priority}

                                onChange={handleChange}

                            >

                                <option value="Low">

                                    Low

                                </option>

                                <option value="Medium">

                                    Medium

                                </option>

                                <option value="High">

                                    High

                                </option>

                                <option value="Emergency">

                                    Emergency

                                </option>

                            </select>

                        </div>


                        {/* Remarks */}

                        <div className="dr-group dr-full">

                            <label className="dr-label">

                                Remarks

                            </label>

                            <textarea

                                className="dr-textarea"

                                rows="4"

                                name="remarks"

                                value={formData.remarks}

                                onChange={handleChange}

                                placeholder="Enter Remarks"

                            />

                        </div>

                    </div>

                    <div className="dr-actions">

                        <button
                            type="submit"
                            className="dr-save"
                        >

                            {
                                request
                                    ? "Update Request"
                                    : "Save Request"
                            }

                        </button>

                        <button
                            type="button"
                            className="dr-cancel"
                            onClick={onClose}
                        >

                            Cancel

                        </button>

                    </div>

                    <SiteSelectionModal

    open={sitePopup}

    sites={filteredSites}

    onClose={() =>
        setSitePopup(false)
    }

    onDone={(selected) => {

    const total = selected.reduce(

        (sum, item) =>

            sum + Number(item.total_guards),

        0

    );

    setFormData(prev => ({

        ...prev,

        selected_sites: selected,

        requested_guards: total

    }));

    setSitePopup(false);

}}

/>

                </form>

            </div>

        </div>

    );

}

export default DeploymentRequestForm;