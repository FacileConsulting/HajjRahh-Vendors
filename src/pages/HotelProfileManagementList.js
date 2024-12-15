import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { handleAPIData } from '../hooks/useCustomApi';
import VendorForm from '../components/VendorForm';
import { toast } from 'react-toastify';
import { toastOptions } from '../toastify';
import {
  defaultPackages
} from '../constant/func';
import {
  resetVendorsComponentFunc
} from '../reducers/vendorsSlice';
import { responseHandler } from '../constant/func';

const HotelProfileManagementList = ({ obj }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [ob, setOb] = useState({ ...obj });

  


  return (
    <div id={ob.id} className="vendor-dash dashboard-body">
      <div className="container-fluid">
        <div className="row">
          <div className="col-auto me-auto">
            <h2>Hotel Profile Management</h2>
          </div>
          <div className="col-auto">
            <a href="#!" className="btn btn-primary btn-sm">Add new</a>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-9 text-end">
            <div className="dropdown">
              <button className="btn btn-secondary btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="bi bi-funnel"></i>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label className="form-check-label" for="flexCheckDefault">
                        Option
                      </label>
                    </div>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label className="form-check-label" for="flexCheckDefault">
                        Option
                      </label>
                    </div>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label className="form-check-label" for="flexCheckDefault">
                        Option
                      </label>
                    </div>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label className="form-check-label" for="flexCheckDefault">
                        Option
                      </label>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-3">
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-search"></i></span>
              <input type="text" className="form-control" placeholder="search" />
            </div>
          </div>
          <div className="col-12">
            <div className="table-responsive mt-3">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Hotel Name</th>
                    <th>Location</th>
                    <th>Contact Info.</th>
                    <th>Star Rating</th>
                    <th>Halal Certification</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><a href="#!" className="coloured-link">Taj hotel</a></td>
                    <td>Bangalore,India</td>
                    <td>+91 9393829282</td>
                    <td>5 star</td>
                    <td>Available</td>
                    <td>
                      <a href="#!" className="me-2"><i className="bi bi-pencil-square"></i></a>
                      <a href="#!"><i className="bi bi-trash"></i></a>
                    </td>
                  </tr>
                  <tr>
                    <td><a href="#!" className="coloured-link">Taj hotel</a></td>
                    <td>Bangalore,India</td>
                    <td>+91 9393829282</td>
                    <td>5 star</td>
                    <td>Available</td>
                    <td>
                      <a href="#!" className="me-2"><i className="bi bi-pencil-square"></i></a>
                      <a href="#!"><i className="bi bi-trash"></i></a>
                    </td>
                  </tr>
                  <tr>
                    <td><a href="#!" className="coloured-link">Taj hotel</a></td>
                    <td>Bangalore,India</td>
                    <td>+91 9393829282</td>
                    <td>5 star</td>
                    <td>Available</td>
                    <td>
                      <a href="#!" className="me-2"><i className="bi bi-pencil-square"></i></a>
                      <a href="#!"><i className="bi bi-trash"></i></a>
                    </td>
                  </tr>
                  <tr>
                    <td><a href="#!" className="coloured-link">Taj hotel</a></td>
                    <td>Bangalore,India</td>
                    <td>+91 9393829282</td>
                    <td>5 star</td>
                    <td>Available</td>
                    <td>
                      <a href="#!" className="me-2"><i className="bi bi-pencil-square"></i></a>
                      <a href="#!"><i className="bi bi-trash"></i></a>
                    </td>
                  </tr>
                  </tbody>
              </table>
            </div>
          </div>
          <div className="col-6">
            <p>Showing 1-4 of 4</p>
          </div>
          <div className="col-6">
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-end">
                <li className="page-item disabled">
                  <a className="page-link">Previous</a>
                </li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item">
                  <a className="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelProfileManagementList;