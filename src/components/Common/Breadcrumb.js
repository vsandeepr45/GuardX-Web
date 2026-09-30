import React from "react";

function Breadcrumb({ title }) {
  return (
    <div className="gx-breadcrumb">
      <div>
        <h2>{title}</h2>

        <span>Home / {title}</span>
      </div>
    </div>
  );
}

export default Breadcrumb;
