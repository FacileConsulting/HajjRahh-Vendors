import React from 'react';

const Button = ({id, btnType, label, classes, handleBtnClick, loading }) => {

  return (
    <button type="button" id={id} className={`btn btn-${btnType} ${classes} ${loading ? "disable" : ""}`} onClick={handleBtnClick}>
      <span className="for-loading-margin">{label}</span>
      {loading && <span className="spinner-border spinner-border-sm" role="status"></span>}
    </button>
  )
};

export default Button;
