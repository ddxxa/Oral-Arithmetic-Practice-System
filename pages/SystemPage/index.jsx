import React from "react";
import { Outlet } from "react-router-dom";
import css from "./index.module.css";
import Navigation from "../../Components/Navigation";
import DropdownMenu from "../../Components/Dropdown/index";
const System = () => {
  return (
    <div>
      <div className={css.top}>
        <span className={css.title}>口算练习系统</span>
        <Navigation />
        <DropdownMenu />
      </div>
      <div className={css.content}>
        <Outlet />
      </div>
    </div>
  );
};
export default System;
