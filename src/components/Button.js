import React from 'react';

const Button = ({id, aTag, btnType, label, classes, handleBtnClick, loading }) => {

  return (
    aTag ? (
      <a className={classes} id={id} onClick={handleBtnClick} >{label}</a>
    ) : 
    (
      <button type="button" id={id} className={`btn btn-${btnType} ${classes} ${loading ? "disable" : ""}`} onClick={handleBtnClick}>
        <span className="for-loading-margin">{label}</span>
        {loading && <span className="spinner-border spinner-border-sm" role="status"></span>}
      </button>
    )
    
  )
};

export default Button;
