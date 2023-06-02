import React from "react";
import { Outlet } from "react-router-dom";

const main = () => {
  return (
    <div>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default main;
