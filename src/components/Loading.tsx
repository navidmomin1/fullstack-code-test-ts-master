import React from "react";
import "../css/Loading.css";

function Loading() {
  return (
    <div className="loading-container">
      <div className="expanding-circle">
        <div className="center-dot" />
      </div>
    </div>
  );
}

export default Loading;
