import React from "react";

export default function VisitorFilters({
    search,
    setSearch,
    siteId,
    setSiteId,
    date,
    setDate,
    sites = []
}) {

    return (

        <div className="gx-visitor-filters">

            <input
                type="text"
                placeholder="Search visitor, code, mobile, company..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />


            <select
                value={siteId}
                onChange={(e) =>
                    setSiteId(e.target.value)
                }
            >

                <option value="">
                    All Sites
                </option>

                {sites.map((site) => (

                    <option
                        key={site.id}
                        value={site.id}
                    >
                        {site.site_name}
                    </option>

                ))}

            </select>


            <input
                type="date"
                value={date}
                onChange={(e) =>
                    setDate(e.target.value)
                }
            />

        </div>

    );

}