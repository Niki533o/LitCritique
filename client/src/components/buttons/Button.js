import React from "react";
import "./Button.css";
import Spinner from "react-bootstrap/esm/Spinner";

export default function Button({
  onClickHandler,
  labelText,
  color,
  size,
  isLoading,
  type,
}) {
  return (
    <button
      type={type}
      disabled={isLoading}
      className={`btn ${color} ${size}`}
      onClick={onClickHandler}
      style={{ color: 'white' }}
    >
      {isLoading ? <Spinner size='sm' /> : labelText}
    </button>
  );
}
