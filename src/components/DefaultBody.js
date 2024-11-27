import React from 'react';

const DefaultBody = ({ id }) => {

  return (
    <section id={id}>
      <div className="container-xxl py-5 section-block">
        <div className="row">
          <div className="col-auto me-auto">
            <h2>Trending destinations</h2>
          </div>
          <div className="col-auto">
            <a href="#!">
              <span className="see-all"><i className="bi bi-chevron-right"></i></span>
            </a>
          </div>

        </div>
        <div className="row">
          <div className="col">
            <div className="owl-carousel">
              <a className="trending-destination">
                <img src={"./assets/images/destination_images/img-1.png"} alt="" />
                <h3 className="mt-3">Mecca</h3>
                <p>20+ tours</p>
              </a>
              <a className="trending-destination">
                <img src="./assets/images/destination_images/img-2.png" alt="" />
                <h3 className="mt-3">Mecca</h3>
                <p>20+ tours</p>
              </a>
              <a className="trending-destination">
                <img src="./assets/images/destination_images/img-3.png" alt="" />
                <h3 className="mt-3">Mecca</h3>
                <p>20+ tours</p>
              </a>
              <a className="trending-destination">
                <img src="./assets/images/destination_images/img-4.png" alt="" />
                <h3 className="mt-3">Mecca</h3>
                <p>20+ tours</p>
              </a>
              <a className="trending-destination">
                <img src="./assets/images/destination_images/img-5.png" alt="" />
                <h3 className="mt-3">Mecca</h3>
                <p>20+ tours</p>
              </a>
              <a className="trending-destination">
                <img src="./assets/images/destination_images/img-6.png" alt="" />
                <h3 className="mt-3">Mecca</h3>
                <p>20+ tours</p>
              </a>
              <a className="trending-destination">
                <img src="./assets/images/destination_images/img-3.png" alt="" />
                <h3 className="mt-3">Mecca</h3>
                <p>20+ tours</p>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container-xxl py-5 section-block">
        <div className="row">
          <div className="col">
            <div className="colour-title">Find more places around you</div>
            <h2>Discover muslim-friendly places around you</h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <a>
              <img src="./assets/images/discover_images/img-1.png" className="img-style" alt="" />
              <h3 className="mt-3">Find restaurants near you</h3>
              <p>Discover a variety of delicious and authentic dining options in the holy city</p>
            </a>
          </div>
          <div className="col">
            <a>
              <img src="./assets/images/discover_images/img-2.png" className="img-style" alt="" />
              <h3 className="mt-3">Find restaurants near you</h3>
              <p>Discover a variety of delicious and authentic dining options in the holy city</p>
            </a>
          </div>
          <div className="col">
            <a>
              <img src="./assets/images/discover_images/img-3.png" className="img-style" alt="" />
              <h3 className="mt-3">Find restaurants near you</h3>
              <p>Discover a variety of delicious and authentic dining options in the holy city</p>
            </a>
          </div>
        </div>
      </div>
      <div className="container-xxl py-5 section-block">
        <div className="row">
          <div className="col-auto me-auto">
            <div className="colour-title">Book online</div>
            <h2>Halal friendly holidays, activities, and hotels</h2>
          </div>
          <div className="col-auto">
            {/* <a href="#!">See all <i className="bi bi-arrow-right"></i></a>  */}
            <a href="#!">
              <span className="see-all"><i className="bi bi-chevron-right"></i></span>
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <a>
              <img src="./assets/images/book_online/img-1.png" className="img-style" alt="" />
              <div className="rating"><span>9/10</span>Exceptional (23 reviews)</div>
              <h3>Novotel Thakher</h3>
              <p>Makkah</p>
              <h3 className="price">$39.00</h3>
              <p>per night <br />
                $78.00 total <br />
                inclusive taxes and fees</p>
            </a>
          </div>
          <div className="col">
            <a>
              <img src="./assets/images/book_online/img-2.png" className="img-style" alt="" />
              <div className="rating"><span>9/10</span>Exceptional (23 reviews)</div>
              <h3>Novotel Thakher</h3>
              <p>Makkah</p>
              <h3 className="price">$39.00</h3>
              <p>per night <br />
                $78.00 total <br />
                inclusive taxes and fees</p>
            </a>
          </div>
          <div className="col">
            <a>
              <img src="./assets/images/book_online/img-3.png" className="img-style" alt="" />
              <div className="rating"><span>9/10</span>Exceptional (23 reviews)</div>
              <h3>Novotel Thakher</h3>
              <p>Makkah</p>
              <h3 className="price">$39.00</h3>
              <p>per night <br />
                $78.00 total <br />
                inclusive taxes and fees</p>
            </a>
          </div>
          <div className="col">
            <a>
              <img src="./assets/images/book_online/img-4.png" className="img-style" alt="" />
              <div className="rating"><span>9/10</span>Exceptional (23 reviews)</div>
              <h3>Novotel Thakher</h3>
              <p>Makkah</p>
              <h3 className="mt-4">$39.00</h3>
              <p>per night <br />
                $78.00 total <br />
                inclusive taxes and fees</p>
            </a>
          </div>
        </div>
      </div>
      <div className="container-xxl py-5 section-block">
        <div className="row">
          <div className="col-auto me-auto">
            <h2>Innovation zone</h2>
          </div>
          {/* <div className="col-auto">
            <a>See all <i className="bi bi-arrow-right"></i></a>
          </div> */}
        </div>
        <div className="row">
          <div className="col">
            <div className="owl-carousel">
              <img src="./assets/images/innovation_zone/img-1.png" alt="" />
              <img src="./assets/images/innovation_zone/img-2.png" alt="" />
              <img src="./assets/images/innovation_zone/img-3.png" alt="" />
              <img src="./assets/images/innovation_zone/img-4.png" alt="" />
              <img src="./assets/images/innovation_zone/img-5.png" alt="" />
              <img src="./assets/images/innovation_zone/img-2.png" alt="" />
              <img src="./assets/images/innovation_zone/img-3.png" alt="" />
              <img src="./assets/images/innovation_zone/img-4.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="container-xxl py-5 section-block">
        <div className="row">
          <div className="col">
            <h2 className="app-section-title">Make your Umrah unforgettable: Enhance your spiritual experience with Nusuk app</h2>
            <p className="app-text">Manage your reservations, stay informed and navigate effortlessly - all in one app</p>
            <p className="get-app-text">Get app</p>
            <span className="app-icons">
              <a><img src="./assets/images/app-store.svg" alt="" /></a>
              <a><img src="./assets/images/play-store.svg" alt="" /></a>
            </span>
          </div>
          <div className="col">
            <div className="app-image">
              <img src="./assets/images/app-image.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="section-bg">
        <div className="container-xxl py-5 section-block">
          <div className="row">
            <div className="col">
              <h2>Customise your own Hajji & Umrah packages</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-4 mb-3">
              <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Select departure date" />
            </div>
            <div className="col-lg-3 col-md-4 mb-3">
              <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter required duration" />
            </div>
            <div className="col-lg-3 col-md-4 mb-3">
              <select className="form-select form-select-lg mb-3" aria-label="Large select example">
                <option selected>Choose Makkah hotel</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="col-lg-3 col-md-4 mb-3">
              <select className="form-select form-select-lg mb-3" aria-label="Large select example">
                <option selected>Pick Makkah hotel</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="col-lg-3 col-md-4 mb-3">
              <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Your name" />
            </div>
            <div className="col-lg-3 col-md-4 mb-3">
              <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="No. of passengers" />
            </div>
            <div className="col-lg-3 col-md-4 mb-3">
              <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Email ID" />
            </div>
            <div className="col-lg-3 col-md-4 mb-3">
              <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Contact number" />
            </div>
            <div className="col-lg-3 col-md-4 mb-3">
              <p className="mb-1">Include Ziyarat</p>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label mt-1" htmlFor="includeZiyarat">
                  Yes
                </label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button type="button" className="btn btn-primary float-end">Get price</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container-xxl py-5 section-block">
        <div className="row">
          <div className="col">
            <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button className="nav-link active" id="tab-1" data-bs-toggle="tab" data-bs-target="#tab-1-pane" type="button" role="tab" aria-controls="tab-1-pane" aria-selected="true"><i className="bi bi-info-circle"></i> <br /> Entrance to Umrah</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" id="tab-2" data-bs-toggle="tab" data-bs-target="#tab-2-pane" type="button" role="tab" aria-controls="tab-2-pane" aria-selected="false"><i className="bi bi-info-circle"></i> <br /> Travel and Access</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" id="tab-3" data-bs-toggle="tab" data-bs-target="#tab-3-pane" type="button" role="tab" aria-controls="tab-3-pane" aria-selected="false"><i className="bi bi-info-circle"></i> <br /> Miqat</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" id="tab-4" data-bs-toggle="tab" data-bs-target="#tab-4-pane" type="button" role="tab" aria-controls="tab-4-pane" aria-selected="false"><i className="bi bi-info-circle"></i> <br /> Ihram</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" id="tab-5" data-bs-toggle="tab" data-bs-target="#tab-5-pane" type="button" role="tab" aria-controls="tab-5-pane" aria-selected="false"><i className="bi bi-info-circle"></i> <br /> Access to santuary</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" id="tab-6" data-bs-toggle="tab" data-bs-target="#tab-6-pane" type="button" role="tab" aria-controls="tab-6-pane" aria-selected="false"><i className="bi bi-info-circle"></i> <br /> Sa’i</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" id="tab-7" data-bs-toggle="tab" data-bs-target="#tab-7-pane" type="button" role="tab" aria-controls="tab-7-pane" aria-selected="false"><i className="bi bi-info-circle"></i> <br /> Entrance to Ziyarah</button>
              </li>
            </ul>
          </div>
        </div>
        <div className="row tab-margin">
          <div className="col">
            <div className="tab-content" id="myTabContent">
              <div className="tab-pane fade show active" id="tab-1-pane" role="tabpanel" aria-labelledby="tab-1" tabIndex="0">
                <div className="row">
                  <div className="col">
                    <div className="tab-title">Umrah & Ziyarah</div>
                    <p className="text-dark">Learn the essential rituals and steps to fulfill your Umrah pilgrimage, ensuring a spiritually fulfilling journey. Understand the significance of visiting Al Masjid An Nabawi, the Prophet's Mosque, and the etiquettes to observe while there.
                      Gain insights into the historical and spiritual importance of these acts of worship.</p>
                  </div>
                  <div className="col">
                    <img src="./assets/images/tab-img.png" className="img-fluid" alt="" />
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="tab-2-pane" role="tabpanel" aria-labelledby="tab-2" tabIndex="0">
                <div className="row">
                  <div className="col">
                    <div className="tab-title">Umrah & Ziyarah</div>
                    <p className="text-dark">Learn the essential rituals and steps to fulfill your Umrah pilgrimage, ensuring a spiritually fulfilling journey. Understand the significance of visiting Al Masjid An Nabawi, the Prophet's Mosque, and the etiquettes to observe while there.
                      Gain insights into the historical and spiritual importance of these acts of worship.</p>
                  </div>
                  <div className="col">
                    <img src="./assets/images/tab-img.png" className="img-fluid" alt="" />
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="tab-3-pane" role="tabpanel" aria-labelledby="tab-3" tabIndex="0">
                <div className="row">
                  <div className="col">
                    <div className="tab-title">Umrah & Ziyarah</div>
                    <p className="text-dark">Learn the essential rituals and steps to fulfill your Umrah pilgrimage, ensuring a spiritually fulfilling journey. Understand the significance of visiting Al Masjid An Nabawi, the Prophet's Mosque, and the etiquettes to observe while there.
                      Gain insights into the historical and spiritual importance of these acts of worship.</p>
                  </div>
                  <div className="col">
                    <img src="./assets/images/tab-img.png" className="img-fluid" alt="" />
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="tab-4-pane" role="tabpanel" aria-labelledby="tab-4" tabIndex="0">
                <div className="row">
                  <div className="col">
                    <div className="tab-title">Umrah & Ziyarah</div>
                    <p className="text-dark">Learn the essential rituals and steps to fulfill your Umrah pilgrimage, ensuring a spiritually fulfilling journey. Understand the significance of visiting Al Masjid An Nabawi, the Prophet's Mosque, and the etiquettes to observe while there.
                      Gain insights into the historical and spiritual importance of these acts of worship.</p>
                  </div>
                  <div className="col">
                    <img src="./assets/images/tab-img.png" className="img-fluid" alt="" />
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="tab-5-pane" role="tabpanel" aria-labelledby="tab-5" tabIndex="0">
                <div className="row">
                  <div className="col">
                    <div className="tab-title">Umrah & Ziyarah</div>
                    <p className="text-dark">Learn the essential rituals and steps to fulfill your Umrah pilgrimage, ensuring a spiritually fulfilling journey. Understand the significance of visiting Al Masjid An Nabawi, the Prophet's Mosque, and the etiquettes to observe while there.
                      Gain insights into the historical and spiritual importance of these acts of worship.</p>
                  </div>
                  <div className="col">
                    <img src="./assets/images/tab-img.png" className="img-fluid" alt="" />
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="tab-6-pane" role="tabpanel" aria-labelledby="tab-6" tabIndex="0">
                <div className="row">
                  <div className="col">
                    <div className="tab-title">Umrah & Ziyarah</div>
                    <p className="text-dark">Learn the essential rituals and steps to fulfill your Umrah pilgrimage, ensuring a spiritually fulfilling journey. Understand the significance of visiting Al Masjid An Nabawi, the Prophet's Mosque, and the etiquettes to observe while there.
                      Gain insights into the historical and spiritual importance of these acts of worship.</p>
                  </div>
                  <div className="col">
                    <img src="./assets/images/tab-img.png" className="img-fluid" alt="" />
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="tab-7-pane" role="tabpanel" aria-labelledby="tab-7" tabIndex="0">
                <div className="row">
                  <div className="col">
                    <div className="tab-title">Umrah & Ziyarah</div>
                    <p className="text-dark">Learn the essential rituals and steps to fulfill your Umrah pilgrimage, ensuring a spiritually fulfilling journey. Understand the significance of visiting Al Masjid An Nabawi, the Prophet's Mosque, and the etiquettes to observe while there.
                      Gain insights into the historical and spiritual importance of these acts of worship.</p>
                  </div>
                  <div className="col">
                    <img src="./assets/images/tab-img.png" className="img-fluid" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
};

export default DefaultBody;
