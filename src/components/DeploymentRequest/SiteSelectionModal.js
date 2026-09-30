import React, { useEffect, useState } from "react";
import "../../styles/SiteSelectionModal.css";

function SiteSelectionModal({
    open,
    sites,
    onClose,
    onDone
}) {

    const [selectedSites, setSelectedSites] = useState([]);

    useEffect(() => {

        if (open) {
            setSelectedSites([]);
        }

    }, [open]);

    const handleToggle = (site) => {

        const exists = selectedSites.find(
            item => item.id === site.id
        );

        if (exists) {

            setSelectedSites(

                selectedSites.filter(
                    item => item.id !== site.id
                )

            );

        } else {

            setSelectedSites([

                ...selectedSites,

                site

            ]);

        }

    };

    const totalGuards = selectedSites.reduce(

        (sum, item) =>

            sum + Number(item.total_guards || 0),

        0

    );

    if (!open) return null;

    return (

        <div className="site-modal-overlay">

            <div className="site-modal">

                <div className="site-modal-header">

                    <h2>

                        Select Project Sites

                    </h2>

                    <button
                        className="close-btn"
                        onClick={onClose}
                    >
                        ✕
                    </button>

                </div>

                <div className="site-table-wrapper">

                    <table className="site-table">

                        <thead>

                            <tr>

                                <th></th>

                                <th>Site</th>

                                <th>Shift</th>

                                <th>Guards</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                sites.length === 0 ?

                                    <tr>

                                        <td
                                            colSpan="4"
                                            className="no-data"
                                        >

                                            No Sites Found

                                        </td>

                                    </tr>

                                    :

                                    sites.map(site => {

                                        const checked =

                                            selectedSites.some(

                                                item =>

                                                    item.id === site.id

                                            );

                                        return (

                                            <tr
                                                key={site.id}
                                            >

                                                <td>

                                                    <input

                                                        type="checkbox"

                                                        checked={checked}

                                                        onChange={() =>
                                                            handleToggle(site)
                                                        }

                                                    />

                                                </td>

                                                <td>

                                                    {site.site_name}

                                                </td>

                                                <td>

                                                    {site.shift_type}

                                                </td>

                                                <td>

                                                    {site.total_guards}

                                                </td>

                                            </tr>

                                        );

                                    })

                            }

                        </tbody>

                    </table>

                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "20px"
                    }}
                >

                    <div>

                        <strong>

                            Selected :

                            {selectedSites.length}

                        </strong>

                        &nbsp;&nbsp;

                        <strong>

                            Total Guards :

                            {totalGuards}

                        </strong>

                    </div>

                    <div>

                        <button

                            className="dr-cancel"

                            onClick={onClose}

                        >

                            Cancel

                        </button>

                        <button

                            className="dr-save"

                            style={{

                                marginLeft: 10

                            }}

                            onClick={() =>

                                onDone(selectedSites)

                            }

                        >

                            Done

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default SiteSelectionModal;