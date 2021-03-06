import React from "react";
import "./Button.css";

const Button = ({ type, submit, children, onClick, botBtn }) => {
  return (
    <button
      type={submit ? "submit" : "button"}
      onClick={onClick}
      className={`btn btn-${type ?? "filled"} w-full`}
      style={{ padding: botBtn && "26px 65px" }}
    >
      <div className="content">{children}</div>

      <div className="layer"></div>
    </button>
  );
};

export default Button;
