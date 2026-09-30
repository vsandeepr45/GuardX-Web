import React, {
    useEffect,
    useState
} from "react";

import {
    getEmployeeDropdown
} from "../../api/employee";

import "../../styles/DeploymentForm.css";

function AssignGuardsDialog({

    open,

    request,

    onClose,

    onAssign

}) {

    const [employees, setEmployees] = useState([]);

    const [selectedEmployees, setSelectedEmployees] = useState([]);

    const [formData, setFormData] = useState({

        from_date: "",

        to_date: "",

        duty_position: "Security Guard",

        remarks: ""

    });

    useEffect(() => {

        if (open) {

            loadEmployees();

        }

    }, [open]);

    const loadEmployees = async () => {

        try {

            const res = await getEmployeeDropdown();

            setEmployees(res.data || []);

        }

        catch (err) {

            console.log(err);

        }

    };

    if (!open || !request) {

        return null;

    }

        // ===============================
    // Employee Selection
    // ===============================

    const toggleEmployee = (employeeId) => {

        setSelectedEmployees((prev) => {

            if (prev.includes(employeeId)) {

                return prev.filter(id => id !== employeeId);

            }

            return [...prev, employeeId];

        });

    };


    // ===============================
    // Input Change
    // ===============================

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };


    // ===============================
    // Submit
    // ===============================

    const handleSubmit = (e) => {

        e.preventDefault();

        if (selectedEmployees.length === 0) {

            alert("Please select at least one employee.");

            return;

        }

        if (!formData.from_date) {

            alert("Please select From Date.");

            return;

        }

        onAssign({

            employee_ids: selectedEmployees,

            from_date: formData.from_date,

            to_date: formData.to_date,

            duty_position: formData.duty_position,

            remarks: formData.remarks

        });

    };


    return (

        <div className="gx-modal">

            <div
                className="gx-form-modal"
                style={{ maxWidth: "900px" }}
            >

                <div className="gx-modal-header">

                    <h2>

                        Assign Guards

                    </h2>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="gx-form"
                >

                    <div
                        style={{
                            background: "#f7f7f7",
                            padding: "15px",
                            marginBottom: "20px",
                            borderRadius: "6px"
                        }}
                    >

                        <p>

                            <strong>Client :</strong>

                            {request.client_name}

                        </p>

                        <p>

                            <strong>Project :</strong>

                            {request.project_name}

                        </p>

                        <p>

                            <strong>Site :</strong>

                            {request.site_name}

                        </p>

                        <p>

                            <strong>Shift :</strong>

                            {request.shift_name}

                        </p>

                        <p>

                            <strong>Requested Guards :</strong>

                            {request.requested_guards}

                        </p>

                    </div>

                    <h3>

                        Available Employees

                    </h3>

                    <div
                        style={{
                            maxHeight: "250px",
                            overflowY: "auto",
                            border: "1px solid #ddd",
                            padding: "10px",
                            marginBottom: "20px"
                        }}
                    >

                        {employees.map(emp => (

                            <div
                                key={emp.id}
                                style={{
                                    marginBottom: "8px"
                                }}
                            >

                                <label>

                                    <input
                                        type="checkbox"
                                        checked={selectedEmployees.includes(emp.id)}
                                        onChange={() => toggleEmployee(emp.id)}
                                    />

                                    {" "}

                                    {emp.employee_code}

                                    {" - "}

                                    {emp.employee_name}

                                </label>

                            </div>

                        ))}

                    </div>

                    <div className="gx-form-grid">

                        <div className="gx-form-group">

                            <label>

                                From Date

                            </label>

                            <input
                                type="date"
                                name="from_date"
                                value={formData.from_date}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="gx-form-group">

                            <label>

                                To Date

                            </label>

                            <input
                                type="date"
                                name="to_date"
                                value={formData.to_date}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="gx-form-group">

                            <label>

                                Duty Position

                            </label>

                            <input
                                type="text"
                                name="duty_position"
                                value={formData.duty_position}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="gx-form-group">

                            <label>

                                Remarks

                            </label>

                            <input
                                type="text"
                                name="remarks"
                                value={formData.remarks}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                                        <div className="gx-form-actions">

                        <button
                            type="submit"
                            className="gx-save-btn"
                        >

                            Deploy Selected Guards

                        </button>

                        <button
                            type="button"
                            className="gx-cancel-btn"
                            onClick={onClose}
                        >

                            Cancel

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default AssignGuardsDialog;