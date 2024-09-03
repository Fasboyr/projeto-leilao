import React from "react";
import style from "./background.module.css";

const Background = ({ children }) => {
  return (
    <div className={style.background}>
      {children}
    </div>
  );
};

export default Background;
