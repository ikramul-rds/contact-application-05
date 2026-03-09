import React from "react";
import "./appLayout.scss";
import { Outlet } from "react-router-dom";

// components
import Navbar from "../common/Navbar";

const AppLayout = () => {
  return (
    <div className="appLayout">
      <Navbar />
      <main className="main_app">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
