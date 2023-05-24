import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/sideBar/sideBar";
import "./pharmaStyle.css";

function PharmaView () {
  return (
    <div className="pharmaView">
      <SideBar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default PharmaView;
