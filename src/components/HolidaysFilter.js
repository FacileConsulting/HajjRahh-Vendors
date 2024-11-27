import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Checkbox from './Checkbox';
import Button from './Button';
import store from '../store'


const HolidaysFilter = forwardRef((props, ref) => {
  const { id, loading, holidaysCallback, toCallback, panelClass, handlePanelCallback } = props;
  const { trip3, trip4, trip7, trip11, trip16, star5, star4, star3, transBus, transLandOnly, transFlight, transCruise, transOptional, themeAdventure, themeAffordable, themeArtCulture, themeBeach, themeBestSeller, priceLt1000, priceGt1000, priceGt2000, priceGt4000, priceGt8000, tourFocus1, tourFocus2, tourFocus3, tourFocus4, tourFocus5, languageHindi, languageEnglish, languageArabic, meals1, meals2, meals3, meals4, meals5, vehicleTypeHatchback, vehicleTypeSedan, vehicleTypeSUV, vehicleTypeMUV, vehicleTypeCompactSUV, sp1, sp2, sp3, sp4, sp5 } = useSelector(state => state.myAccount);
  const childRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(),useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];


  const handlePanel = () => {
    handlePanelCallback();
  }

  const handleSearchClick = () => {
    holidaysCallback('filter');
  }

  const handleCancelClick = () => {
    console.log('childRefs', childRefs);
    for (let index = 0; index < childRefs.length; index++) {
      if (childRefs[index].current) {
        childRefs[index].current.resetRefCalled();
      }
    }
  };

  useImperativeHandle(ref, () => ({
    handleCancelClick
  }));

  // Fetch data when component mounts
  useEffect(() => {
    handleCancelClick();
  }, [toCallback]); // Empty dependency array means this runs once on mount

  console.log('store.getState().items;', store.getState());
  return (
    <div id={id} className="section-listing-filter" >
      <div className="container-xxl">
        <div className="row">
          <div className="col">
            <ul className="d-flex flex-row listing-filters justify-content-center align-items-baseline list-unstyled">
              <li className="filter-type-first text-end">
                <a href="#!" onClick={handlePanel}><i className="bi bi-funnel-fill"></i></a>
              </li>
              <li className="filter-type">
                <a href="#!" onClick={handlePanel}>Trip duration <i className="bi bi-chevron-down"></i></a>
                <div className={panelClass}>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[0]} id={"holiday-filter-trip-3"} keyName={"trip3"} defaultValue={trip3} />
                      <label className="form-check-label" htmlFor="trip3For">
                        Up to 3 nights
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[1]} id={"holiday-filter-trip-4"} keyName={"trip4"} defaultValue={trip4} />
                      <label className="form-check-label" htmlFor="trip4For">
                        4 - 6 Nights
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[2]} id={"holiday-filter-trip-7"} keyName={"trip7"} defaultValue={trip7} />
                      <label className="form-check-label" htmlFor="trip7For">
                        7 - 10 Nights
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[3]} id={"holiday-filter-trip-11"} keyName={"trip11"} defaultValue={trip11} />
                      <label className="form-check-label" htmlFor="trip11For">
                        11 - 15 Nights
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[4]} id={"holiday-filter-trip-16"} keyName={"trip16"} defaultValue={trip16} />
                      <label className="form-check-label" htmlFor="trip16For">
                        Above 16 Nights
                      </label>
                    </div>
                  </a>

                </div>
              </li>
              <li className="filter-type">
                <a href="#!" onClick={handlePanel}>Hotel star <i className="bi bi-chevron-down"></i></a>
                <div className={panelClass}>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[5]} id={"holiday-filter-star-5"} keyName={"star5"} defaultValue={star5} />
                      <label className="form-check-label" htmlFor="star5For">
                        5 star
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[6]} id={"holiday-filter-star-4"} keyName={"star4"} defaultValue={star4} />
                      <label className="form-check-label" htmlFor="star6For">
                        4 star
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[7]} id={"holiday-filter-star-3"} keyName={"star3"} defaultValue={star3} />
                      <label className="form-check-label" htmlFor="star3For">
                        Upto 3 star
                      </label>
                    </div>
                  </a>
                </div>
              </li>
              <li className="filter-type">
                <a href="#!" onClick={handlePanel}>Transportation <i className="bi bi-chevron-down"></i></a>
                <div className={panelClass}>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[8]} id={"holiday-filter-trans-bus"} keyName={"transBus"} defaultValue={transBus} />
                      <label className="form-check-label" htmlFor="transBusFor">
                        Bus
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[9]} id={"holiday-filter-trans-landonly"} keyName={"transLandOnly"} defaultValue={transLandOnly} />
                      <label className="form-check-label" htmlFor="transLandOnlyFor">
                        Landonly
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[10]} id={"holiday-filter-trans-flight"} keyName={"transFlight"} defaultValue={transFlight} />
                      <label className="form-check-label" htmlFor="transFlightFor">
                        Flight
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[11]} id={"holiday-filter-trans-cruise"} keyName={"transCruise"} defaultValue={transCruise} />
                      <label className="form-check-label" htmlFor="transCruiseFor">
                        Cruise
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[12]} id={"holiday-filter-trans-optional"} keyName={"transOptional"} defaultValue={transOptional} />
                      <label className="form-check-label" htmlFor="transOptionalFor">
                        Optional
                      </label>
                    </div>
                  </a>
                </div>
              </li>
              <li className="filter-type">
                <a href="#!" onClick={handlePanel}>Theme <i className="bi bi-chevron-down"></i></a>
                <div className={panelClass}>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[13]} id={"holiday-filter-theme-adventure"} keyName={"themeAdventure"} defaultValue={themeAdventure} />
                      <label className="form-check-label" htmlFor="themeAdventureFor">
                        Adventure
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[14]} id={"holiday-filter-theme-affordable"} keyName={"themeAffordable"} defaultValue={themeAffordable} />
                      <label className="form-check-label" htmlFor="themeAffordableFor">
                        Affordable
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[15]} id={"holiday-filter-theme-artCulture"} keyName={"themeArtCulture"} defaultValue={themeArtCulture} />
                      <label className="form-check-label" htmlFor="themeArtCultureFor">
                        Art & Culture
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[16]} id={"holiday-filter-theme-beach"} keyName={"themeBeach"} defaultValue={themeBeach} />
                      <label className="form-check-label" htmlFor="themeBeachFor">
                        Beach
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[17]} id={"holiday-filter-theme-bestSeller"} keyName={"themeBestSeller"} defaultValue={themeBestSeller} />
                      <label className="form-check-label" htmlFor="themeBestSellerFor">
                        Best seller
                      </label>
                    </div>
                  </a>
                </div>
              </li>
              <li className="filter-type">
                <a href="#!" onClick={handlePanel}>Price <i className="bi bi-chevron-down"></i></a>
                <div className={panelClass}>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[18]} id={"holiday-filter-price-lt1000"} keyName={"priceLt1000"} defaultValue={priceLt1000} />
                      <label className="form-check-label" htmlFor="priceLt1000For">
                        Up To $1,000
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[19]} id={"holiday-filter-price-gt1000"} keyName={"priceGt1000"} defaultValue={priceGt1000} />
                      <label className="form-check-label" htmlFor="priceGt1000For">
                        $1,000 to $2,000
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[20]} id={"holiday-filter-price-gt2000"} keyName={"priceGt2000"} defaultValue={priceGt2000} />
                      <label className="form-check-label" htmlFor="priceGt2000For">
                        $2,000 to $4,000
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[21]} id={"holiday-filter-price-gt4000"} keyName={"priceGt4000"} defaultValue={priceGt4000} />
                      <label className="form-check-label" htmlFor="priceGt4000For">
                        $4,000 to $8,000
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[22]} id={"holiday-filter-price-gt8000"} keyName={"priceGt8000"} defaultValue={priceGt8000} />
                      <label className="form-check-label" htmlFor="priceGt8000For">
                        $8,000 and above
                      </label>
                    </div>
                  </a>
                </div>
              </li>
              <li className="filter-type">
                <a href="#!" onClick={handlePanel}>Tour Focus <i className="bi bi-chevron-down"></i></a>
                <div className={panelClass}>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[23]} id={"holiday-filter-tour-focus-1"} keyName={"tourFocus1"} defaultValue={tourFocus1} />
                      <label className="form-check-label" htmlFor="tourFocus1For">
                        Focus 1
                      </label>
                    </div>
                  </a><a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[24]} id={"holiday-filter-tour-focus-2"} keyName={"tourFocus2"} defaultValue={tourFocus2} />
                      <label className="form-check-label" htmlFor="tourFocus2For">
                        Focus 2
                      </label>
                    </div>
                  </a><a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[25]} id={"holiday-filter-tour-focus-3"} keyName={"tourFocus3"} defaultValue={tourFocus3} />
                      <label className="form-check-label" htmlFor="tourFocus3For">
                        Focus 3
                      </label>
                    </div>
                  </a><a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[26]} id={"holiday-filter-tour-focus-4"} keyName={"tourFocus4"} defaultValue={tourFocus4} />
                      <label className="form-check-label" htmlFor="tourFocus4For">
                        Focus 4
                      </label>
                    </div>
                  </a><a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[27]} id={"holiday-filter-tour-focus-5"} keyName={"tourFocus5"} defaultValue={tourFocus5} />
                      <label className="form-check-label" htmlFor="tourFocus5For">
                        Focus 5
                      </label>
                    </div>
                  </a>
                </div>
              </li>
              <li className="filter-type">
                <a href="#!" onClick={handlePanel}>Language <i className="bi bi-chevron-down"></i></a>
                <div className={panelClass}>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[28]} id={"holiday-filter-language-english"} keyName={"languageEnglish"} defaultValue={languageEnglish} />
                      <label className="form-check-label" htmlFor="languageEnglishFor">
                        English
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[29]} id={"holiday-filter-language-hindi"} keyName={"languageHindi"} defaultValue={languageHindi} />
                      <label className="form-check-label" htmlFor="languageHindiFor">
                        Hindi
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[30]} id={"holiday-filter-language-arabic"} keyName={"languageArabic"} defaultValue={languageArabic} />
                      <label className="form-check-label" htmlFor="languageArabicFor">
                        Arabic
                      </label>
                    </div>
                  </a>
                </div>
              </li>
              <li className="filter-type">
                <a href="#!" onClick={handlePanel}>Meals <i className="bi bi-chevron-down"></i></a>
                <div className={panelClass}>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[31]} id={"holiday-filter-meals-1"} keyName={"meals1"} defaultValue={meals1} />
                      <label className="form-check-label" htmlFor="meals1For">
                        Meals 1
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[32]} id={"holiday-filter-meals-2"} keyName={"meals2"} defaultValue={meals2} />
                      <label className="form-check-label" htmlFor="meals2For">
                        Meals 2
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[33]} id={"holiday-filter-meals-3"} keyName={"meals3"} defaultValue={meals3} />
                      <label className="form-check-label" htmlFor="meals3For">
                        Meals 3
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[34]} id={"holiday-filter-meals-4"} keyName={"meals4"} defaultValue={meals4} />
                      <label className="form-check-label" htmlFor="meals4For">
                        Meals 4
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[35]} id={"holiday-filter-meals-5"} keyName={"meals5"} defaultValue={meals5} />
                      <label className="form-check-label" htmlFor="meals5For">
                        Meals 5
                      </label>
                    </div>
                  </a>
                </div>
              </li>
              <li className="filter-type">
                <a href="#!" onClick={handlePanel}>Vehicle Type <i className="bi bi-chevron-down"></i></a>
                <div className={panelClass}>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[36]} id={"holiday-filter-vehicle-type-hatchback"} keyName={"vehicleTypeHatchback"} defaultValue={vehicleTypeHatchback} />
                      <label className="form-check-label" htmlFor="vehicleTypeHatchbackFor">
                        Hatchback
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[37]} id={"holiday-filter-vehicle-type-sedan"} keyName={"vehicleTypeSedan"} defaultValue={vehicleTypeSedan} />
                      <label className="form-check-label" htmlFor="vehicleTypeSedanFor">
                        Sedan
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[38]} id={"holiday-filter-vehicle-type-suv"} keyName={"vehicleTypeSUV"} defaultValue={vehicleTypeSUV} />
                      <label className="form-check-label" htmlFor="vehicleTypeSUVFor">
                        SUV
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[39]} id={"holiday-filter-vehicle-type-muv"} keyName={"vehicleTypeMUV"} defaultValue={vehicleTypeMUV} />
                      <label className="form-check-label" htmlFor="vehicleTypeMUVFor">
                        MUV
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[40]} id={"holiday-filter-vehicle-type-compact-suv"} keyName={"vehicleTypeCompactSUV"} defaultValue={vehicleTypeCompactSUV} />
                      <label className="form-check-label" htmlFor="vehicleTypeCompactSUVFor">
                        Comapact SUV
                      </label>
                    </div>
                  </a>
                </div>
              </li>
              <li className="filter-type">
                <a href="#!" onClick={handlePanel}>Sp. amenities <i className="bi bi-chevron-down"></i></a>
                <div className={panelClass}>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[41]} id={"holiday-filter-special-amenities-1"} keyName={"sp1"} defaultValue={sp1} />
                      <label className="form-check-label" htmlFor="sp1For">
                        Sp. Am. 1
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[42]} id={"holiday-filter-special-amenities-2"} keyName={"sp2"} defaultValue={sp2} />
                      <label className="form-check-label" htmlFor="sp2For">
                      Sp. Am. 2
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[43]} id={"holiday-filter-special-amenities-3"} keyName={"sp3"} defaultValue={sp3} />
                      <label className="form-check-label" htmlFor="sp3For">
                      Sp. Am. 3
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[44]} id={"holiday-filter-special-amenities-4"} keyName={"sp4"} defaultValue={sp4} />
                      <label className="form-check-label" htmlFor="sp4For">
                      Sp. Am. 4
                      </label>
                    </div>
                  </a>
                  <a href="#!">
                    <div className="form-check">
                      <Checkbox ref={childRefs[45]} id={"holiday-filter-special-amenities-5"} keyName={"sp5"} defaultValue={sp5} />
                      <label className="form-check-label" htmlFor="sp5For">
                      Sp. Am. 5
                      </label>
                    </div>
                  </a>
                </div>
              </li>
            </ul>
            <div className={`text-center mt-3 ${panelClass}`} onClick={handlePanel}>
              <Button id={"holiday-filter-cancel-btn"} handleBtnClick={handleCancelClick} btnType={"secondary"} classes={"btn-sm holiday-cancel-btn"} label={"Cancel"} />
              <Button id={"holiday-filter-search-btn"} loading={loading} handleBtnClick={handleSearchClick} btnType={"primary"} classes={"btn-sm"} label={"Search"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
});

export default HolidaysFilter;
