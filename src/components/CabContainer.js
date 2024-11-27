import React from 'react';

const CabContainer = ({ id, cabData, cabCardCallback }) => {
  console.log('cabData', cabData);

  const handleCabCardClick = async (event) => {
    event.stopPropagation();
    cabCardCallback(cabData);
  }

  return (
    <div id={id} key={id} className="cabs-block" onClick={handleCabCardClick}>
      <div className="row">
        <div className="col-md-8 col-sm-12">
          <div className="d-flex flex-row">
            <div className="cab-image">
              <img src={`./assets/images/${cabData.cabImage}.png`} className="img-fluid" alt="" />
            </div>
            <div className="ps-3">
              <h3>{cabData.cabName}</h3>
              <p>One-way Trip &nbsp;&nbsp; · &nbsp;&nbsp; 152 kms &nbsp;&nbsp; · &nbsp;&nbsp; 2 Adults</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-12 text-end">
          <div className="d-flex justify-content-end">
            <div>
              <h2 className="cab-price"><span>${cabData.cabPrice}</span>${cabData.cabPrice - (cabData.cabDiscount / 100 * cabData.cabPrice)}</h2>
              <p className="offer">{cabData.cabDiscount}% off</p>
            </div>
            <div className="ps-3 text-center">
              <a href="#!" className="btn btn-primary btn-sm mb-2">Book now</a>
            </div>
          </div>
        </div>
      </div>
      <div className="cabs-separator"></div>
      <div className="row">
        <div className="col-md-6">
          <ul className="list-unstyled cab-conditions">
            {
              Array.isArray(cabData.cabFeatures) && cabData.cabFeatures.length > 0 && cabData.cabFeatures.map((feature, index) => {
                return (
                  <li><i className="bi bi-check-circle"></i> {feature}</li>
                )
              })
            }
          </ul>
        </div>
        <div className="col-md-6">
          {
            Array.isArray(cabData.cabTermsAndCondition) && cabData.cabTermsAndCondition.length > 0 && cabData.cabTermsAndCondition.map((tnc, index) => {
              return (
                <p>{tnc}</p>
              )
            })
          }
        </div>
      </div>
    </div>
  )
};

export default CabContainer;
