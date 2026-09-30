import { useEffect, useState } from "react";

export default function PatrolFilters({

    filters,

    setFilters,

    dashboard

}) {

    const [localFilters, setLocalFilters] = useState({

        employee_id: "",

        site_id: "",

        route_id: "",

        shift_id: "",

        status: "",

        date: ""

    });

    useEffect(() => {

        setFilters(localFilters);

    }, [localFilters]);

    function handleChange(e) {

        const { name, value } = e.target;

        setLocalFilters(prev => ({

            ...prev,

            [name]: value

        }));

    }

    return (

        <div className="gx-patrol-monitor-filter-grid">

            {/* Employee */}

            <select

                name="employee_id"

                value={localFilters.employee_id}

                onChange={handleChange}

            >

                <option value="">All Employees</option>

                {(dashboard?.filters?.employees || []).map(emp => (

                    <option

                        key={emp.id}

                        value={emp.id}

                    >

                        {emp.employee_name}

                    </option>

                ))}

            </select>

            {/* Site */}

            <select

                name="site_id"

                value={localFilters.site_id}

                onChange={handleChange}

            >

                <option value="">All Sites</option>

                {(dashboard?.filters?.sites || []).map(site => (

                    <option

                        key={site.id}

                        value={site.id}

                    >

                        {site.site_name}

                    </option>

                ))}

            </select>

            {/* Route */}

            <select

                name="route_id"

                value={localFilters.route_id}

                onChange={handleChange}

            >

                <option value="">All Routes</option>

                {(dashboard?.filters?.routes || []).map(route => (

                    <option

                        key={route.id}

                        value={route.id}

                    >

                        {route.route_name}

                    </option>

                ))}

            </select>

            {/* Shift */}

            <select

                name="shift_id"

                value={localFilters.shift_id}

                onChange={handleChange}

            >

                <option value="">All Shifts</option>

                {(dashboard?.filters?.shifts || []).map(shift => (

                    <option

                        key={shift.id}

                        value={shift.id}

                    >

                        {shift.shift_name}

                    </option>

                ))}

            </select>

            {/* Status */}

            <select

                name="status"

                value={localFilters.status}

                onChange={handleChange}

            >

                <option value="">All Status</option>

                <option value="Running">Running</option>

                <option value="Completed">Completed</option>

                <option value="Pending">Pending</option>

                <option value="Late">Late</option>

            </select>

            {/* Date */}

            <input

                type="date"

                name="date"

                value={localFilters.date}

                onChange={handleChange}

            />

        </div>

    );

}