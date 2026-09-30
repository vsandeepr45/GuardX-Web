import React from "react";

import Sidebar from "../components/Common/Sidebar";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import Breadcrumb from "../components/Common/Breadcrumb";

function DashboardLayout({

    title,
    children

}) {

    return (

        <div className="gx-layout">

            <Sidebar />

            <div className="gx-main">

                <Header />

                <div className="gx-page">

                    <Breadcrumb
                        title={title}
                    />

                    <div className="gx-content">

                        {children}

                    </div>

                </div>

                <Footer />

            </div>

        </div>

    );

}

export default DashboardLayout;