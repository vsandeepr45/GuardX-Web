import React, { useState } from "react";

import {
    FaTimes,
    FaUser,
    FaPhone,
    FaEnvelope,
    FaBuilding,
    FaIdCard,
    FaMapMarkerAlt,
    FaUserTie,
    FaCalendarAlt,
    FaClock,
    FaClipboardList,
    FaChevronDown,
} from "react-icons/fa";


export default function VisitorRegistrationModal({
    onClose,
    onSubmit,
    sites = [],
    employees = [],
}) {

    const today = new Date()
        .toISOString()
        .split("T")[0];


    const [form, setForm] = useState({

        visitor_name: "",
        mobile: "",
        email: "",
        company_name: "",

        id_type: "",
        id_number: "",

        site_id: "",
        host_employee_id: "",

        purpose: "",

        expected_date: today,
        expected_arrival_time: "",
        expected_departure_time: "",

    });


    const [submitting, setSubmitting] =
        useState(false);


    const [error, setError] =
        useState("");


    // =========================================================
    // HANDLE CHANGE
    // =========================================================

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;


        setForm((previous) => ({

            ...previous,

            [name]: value,

        }));

    };


    // =========================================================
    // SUBMIT
    // =========================================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");


        // -----------------------------------------------------
        // REQUIRED VALIDATION
        // -----------------------------------------------------

        if (!form.visitor_name.trim()) {

            setError(
                "Visitor name is required."
            );

            return;

        }


        if (!form.mobile.trim()) {

            setError(
                "Mobile number is required."
            );

            return;

        }


        if (!form.site_id) {

            setError(
                "Please select a site."
            );

            return;

        }


        if (!form.purpose.trim()) {

            setError(
                "Visit purpose is required."
            );

            return;

        }


        if (!form.expected_date) {

            setError(
                "Please select visit date."
            );

            return;

        }


        if (!form.expected_arrival_time) {

            setError(
                "Please select expected arrival time."
            );

            return;

        }


        if (!form.expected_departure_time) {

            setError(
                "Please select expected departure time."
            );

            return;

        }


        // -----------------------------------------------------
        // TIME VALIDATION
        // -----------------------------------------------------

        if (
            form.expected_departure_time <=
            form.expected_arrival_time
        ) {

            setError(
                "Expected departure time must be after arrival time."
            );

            return;

        }


        try {

            setSubmitting(true);


            // =================================================
            // SEND BACKEND FIELD NAMES DIRECTLY
            // =================================================

            await onSubmit({

                visitor_name:
                    form.visitor_name.trim(),

                mobile:
                    form.mobile.trim(),

                email:
                    form.email.trim() || null,

                company_name:
                    form.company_name.trim() || null,

                id_type:
                    form.id_type || null,

                id_number:
                    form.id_number.trim() || null,

                site_id:
                    Number(form.site_id),

                host_employee_id:
                    form.host_employee_id
                        ? Number(form.host_employee_id)
                        : null,

                purpose:
                    form.purpose.trim(),

                expected_date:
                    form.expected_date,

                expected_arrival_time:
                    form.expected_arrival_time,

                expected_departure_time:
                    form.expected_departure_time,

            });


        } catch (err) {

            setError(
                err.message ||
                "Unable to register visitor."
            );

        } finally {

            setSubmitting(false);

        }

    };


    return (

        <div
            className="gx-visitor-modal-backdrop"
            onMouseDown={onClose}
        >

            <div
                className="gx-visitor-modal"
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
            >

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="gx-visitor-modal-header">

                    <div>

                        <div className="gx-visitor-modal-eyebrow">
                            SECURITY OPERATIONS
                        </div>

                        <h2>
                            Register New Visitor
                        </h2>

                        <p>
                            Create a visitor access request
                            for your site.
                        </p>

                    </div>


                    <button
                        type="button"
                        className="gx-visitor-modal-close"
                        onClick={onClose}
                    >

                        <FaTimes />

                    </button>

                </div>


                <form
                    onSubmit={handleSubmit}
                    className="gx-visitor-registration-form"
                >

                    {/* =================================================
                        ERROR
                    ================================================= */}

                    {error && (

                        <div className="gx-visitor-form-error">

                            {error}

                        </div>

                    )}


                    {/* =================================================
                        VISITOR INFORMATION
                    ================================================= */}

                    <div className="gx-form-section">

                        <div className="gx-form-section-title">

                            <div className="gx-form-section-icon">
                                <FaUser />
                            </div>

                            <div>

                                <h3>
                                    Visitor Information
                                </h3>

                                <p>
                                    Basic visitor details
                                </p>

                            </div>

                        </div>


                        <div className="gx-form-grid">

                            {/* NAME */}

                            <div className="gx-form-field">

                                <label>
                                    Full Name
                                    <span>*</span>
                                </label>

                                <div className="gx-input-wrap">

                                    <FaUser />

                                    <input
                                        type="text"
                                        name="visitor_name"
                                        value={
                                            form.visitor_name
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Enter visitor name"
                                    />

                                </div>

                            </div>


                            {/* MOBILE */}

                            <div className="gx-form-field">

                                <label>
                                    Mobile Number
                                    <span>*</span>
                                </label>

                                <div className="gx-input-wrap">

                                    <FaPhone />

                                    <input
                                        type="tel"
                                        name="mobile"
                                        value={
                                            form.mobile
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Enter mobile number"
                                    />

                                </div>

                            </div>


                            {/* EMAIL */}

                            <div className="gx-form-field">

                                <label>
                                    Email Address
                                </label>

                                <div className="gx-input-wrap">

                                    <FaEnvelope />

                                    <input
                                        type="email"
                                        name="email"
                                        value={
                                            form.email
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="visitor@example.com"
                                    />

                                </div>

                            </div>


                            {/* COMPANY */}

                            <div className="gx-form-field">

                                <label>
                                    Company / Organization
                                </label>

                                <div className="gx-input-wrap">

                                    <FaBuilding />

                                    <input
                                        type="text"
                                        name="company_name"
                                        value={
                                            form.company_name
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Company name"
                                    />

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        IDENTIFICATION
                    ================================================= */}

                    <div className="gx-form-section">

                        <div className="gx-form-section-title">

                            <div className="gx-form-section-icon">
                                <FaIdCard />
                            </div>

                            <div>

                                <h3>
                                    Identification
                                </h3>

                                <p>
                                    Visitor identity verification
                                </p>

                            </div>

                        </div>


                        <div className="gx-form-grid">

                            {/* ID TYPE */}

                            <div className="gx-form-field">

                                <label>
                                    ID Type
                                </label>

                                <div className="gx-input-wrap">

                                    <FaIdCard />

                                    <select
                                        name="id_type"
                                        value={
                                            form.id_type
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    >

                                        <option value="">
                                            Select ID type
                                        </option>

                                        <option value="Aadhaar">
                                            Aadhaar
                                        </option>

                                        <option value="PAN">
                                            PAN
                                        </option>

                                        <option value="Passport">
                                            Passport
                                        </option>

                                        <option value="Driving License">
                                            Driving License
                                        </option>

                                        <option value="Voter ID">
                                            Voter ID
                                        </option>

                                        <option value="Other">
                                            Other
                                        </option>

                                    </select>

                                    <FaChevronDown
                                        className="gx-select-arrow"
                                    />

                                </div>

                            </div>


                            {/* ID NUMBER */}

                            <div className="gx-form-field">

                                <label>
                                    ID Number
                                </label>

                                <div className="gx-input-wrap">

                                    <FaIdCard />

                                    <input
                                        type="text"
                                        name="id_number"
                                        value={
                                            form.id_number
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Enter ID number"
                                    />

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        VISIT DETAILS
                    ================================================= */}

                    <div className="gx-form-section">

                        <div className="gx-form-section-title">

                            <div className="gx-form-section-icon">
                                <FaMapMarkerAlt />
                            </div>

                            <div>

                                <h3>
                                    Visit Details
                                </h3>

                                <p>
                                    Where and why the visitor is coming
                                </p>

                            </div>

                        </div>


                        <div className="gx-form-grid">

                            {/* SITE */}

                            <div className="gx-form-field">

                                <label>
                                    Site
                                    <span>*</span>
                                </label>

                                <div className="gx-input-wrap">

                                    <FaMapMarkerAlt />

                                    <select
                                        name="site_id"
                                        value={
                                            form.site_id
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    >

                                        <option value="">
                                            Select site
                                        </option>


                                        {sites.map(
                                            (site) => (

                                                <option
                                                    key={site.id}
                                                    value={site.id}
                                                >

                                                    {site.site_name}

                                                </option>

                                            )
                                        )}

                                    </select>

                                    <FaChevronDown
                                        className="gx-select-arrow"
                                    />

                                </div>

                            </div>


                            {/* HOST */}

                            <div className="gx-form-field">

                                <label>
                                    Host / Employee
                                </label>

                                <div className="gx-input-wrap">

                                    <FaUserTie />

                                    <select
                                        name="host_employee_id"
                                        value={
                                            form.host_employee_id
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    >

                                        <option value="">
                                            Select host
                                        </option>


                                        {employees.map(
                                            (employee) => (

                                                <option
                                                    key={employee.id}
                                                    value={employee.id}
                                                >

                                                    {employee.employee_name}

                                                </option>

                                            )
                                        )}

                                    </select>

                                    <FaChevronDown
                                        className="gx-select-arrow"
                                    />

                                </div>

                            </div>


                            {/* PURPOSE */}

                            <div className="gx-form-field gx-form-field-full">

                                <label>
                                    Visit Purpose
                                    <span>*</span>
                                </label>

                                <div className="gx-input-wrap gx-textarea-wrap">

                                    <FaClipboardList />

                                    <textarea
                                        name="purpose"
                                        value={
                                            form.purpose
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Why is the visitor coming?"
                                        rows="3"
                                    />

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        SCHEDULE
                    ================================================= */}

                    <div className="gx-form-section">

                        <div className="gx-form-section-title">

                            <div className="gx-form-section-icon">
                                <FaCalendarAlt />
                            </div>

                            <div>

                                <h3>
                                    Visit Schedule
                                </h3>

                                <p>
                                    Expected visitor movement
                                </p>

                            </div>

                        </div>


                        <div className="gx-form-grid gx-schedule-grid">

                            {/* DATE */}

                            <div className="gx-form-field">

                                <label>
                                    Visit Date
                                    <span>*</span>
                                </label>

                                <div className="gx-input-wrap">

                                    <FaCalendarAlt />

                                    <input
                                        type="date"
                                        name="expected_date"
                                        value={
                                            form.expected_date
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>

                            </div>


                            {/* ARRIVAL */}

                            <div className="gx-form-field">

                                <label>
                                    Expected In
                                    <span>*</span>
                                </label>

                                <div className="gx-input-wrap">

                                    <FaClock />

                                    <input
                                        type="time"
                                        name="expected_arrival_time"
                                        value={
                                            form.expected_arrival_time
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>

                            </div>


                            {/* DEPARTURE */}

                            <div className="gx-form-field">

                                <label>
                                    Expected Out
                                    <span>*</span>
                                </label>

                                <div className="gx-input-wrap">

                                    <FaClock />

                                    <input
                                        type="time"
                                        name="expected_departure_time"
                                        value={
                                            form.expected_departure_time
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        FOOTER
                    ================================================= */}

                    <div className="gx-visitor-modal-footer">

                        <button
                            type="button"
                            className="gx-visitor-cancel-btn"
                            onClick={onClose}
                            disabled={submitting}
                        >

                            Cancel

                        </button>


                        <button
                            type="submit"
                            className="gx-visitor-submit-btn"
                            disabled={submitting}
                        >

                            {submitting
                                ? "Registering..."
                                : "Register Visitor"}

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}