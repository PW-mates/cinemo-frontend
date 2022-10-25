import React from "react";
import MainNavigation from "./MainNavigation";

import classes from "./MainLayout.module.css";

const MainLayout: React.FC<{children: React.ReactNode}> = (props) => {
  return (
    <>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </>
  );
};

export default MainLayout;
