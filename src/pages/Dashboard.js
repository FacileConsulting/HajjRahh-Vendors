import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import Chart from "react-apexcharts";
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

const Dashboard = ({ obj }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [ob, setOb] = useState({ ...obj });
  const series1 = [
    {
      name: "Hotel Earnings",
      data: [13902,38272,19384,20194,19023,23049],
    },
    {
      name: "Pilgrimage Earnings",
      data: [33243,12378,39495,20194,10948,19384],
    }
  ];
  const options1 = {
    chart: {
      id: "venue",
      toolbar: {
        show: false
      },
      zoom: {
        enabled: true
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    },
    yaxis: {
      title: {
        text: "$ (thousands)",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        },
      },
    },
  };
  const options = {
    chart: {
      id: "hotel-booking",
      toolbar: {
        show: false
      },
      zoom: {
        enabled: true
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    }
  };
  const series = [
    {
      name: "bookedHotels",
      data: [102, 219, 310, 205, 132, 143]
    }
  ];

  return (
    <div className="dashboard-body">
      <div className="container-fluid">
        <div className="row">
          <div className="col-auto me-auto">
            <h2 className="mb-4">Dashboard</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between mb-1">
              <h4>Stats</h4>
              <div className="dropdown">
                <a href="#!" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  Current month
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Current month</a></li>
                  <li><a className="dropdown-item" href="#">last month</a></li>
                  <li><a className="dropdown-item" href="#">last quarter</a></li>
                  <li><a className="dropdown-item" href="#">Last 6 months</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="info-box">
              <h1 className="mb-0">1,202</h1>
              <p>Total package bookings</p>
              <span className="change">
                <i className="bi bi-graph-up-arrow text-success pe-2"></i> 2.56%
              </span>
            </div>
          </div>
          <div className="col-3">
            <div className="info-box">
              <h1 className="mb-0">$83,742</h1>
              <p>Total Revenue</p>
              <span className="change">
                <i className="bi bi-graph-up-arrow text-success pe-2"></i> 1.13%
              </span>
            </div>
          </div>
          <div className="col-3">
            <div className="info-box">
              <h1 className="mb-0">931</h1>
              <p>Total Visitors</p>
              <span className="change">
                <i className="bi bi-graph-down-arrow text-danger pe-2"></i> 3%
              </span>
            </div>
          </div>
          <div className="col-3">
            <div className="info-box">
              <h1 className="mb-0">13</h1>
              <p>Total Cancellations</p>
              <span className="change">
                <i className="bi bi-graph-up-arrow text-success pe-2"></i> 0.26%
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="chart-block" style={{ width: "100%", height: "auto" }}>
                <div className="d-flex justify-content-between mb-1">
                  <h4>Hotel bookings</h4>
                  <div className="dropdown">
                    <a href="#!" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                      Last 6 months
                    </a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#">Current month</a></li>
                      <li><a className="dropdown-item" href="#">Last month</a></li>
                      <li><a className="dropdown-item" href="#">Last 6 months</a></li>
                    </ul>
                  </div>
                </div>
                  <Chart
                    options={options}
                    series={series}
                    type="bar"
                  />
              </div>
            </div>
            <div className="col-6">
              <div className="chart-block" style={{ width: "100%", height: "auto" }}>
                <div className="d-flex justify-content-between mb-1">
                  <h4>Piligrimage bookings</h4>
                  <div className="dropdown">
                    <a href="#!" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                      Last 6 months
                    </a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#">Current month</a></li>
                      <li><a className="dropdown-item" href="#">Last month</a></li>
                      <li><a className="dropdown-item" href="#">Last 6 months</a></li>
                    </ul>
                  </div>
                </div>
                  <Chart
                    options={options}
                    series={series}
                    type="bar"
                  />
              </div>
            </div>
          </div>

          <div className="col-6 mt-4">
            <div className="chart-block" style={{ width: "100%", height: "auto" }}>
              <div className="d-flex justify-content-between mb-1">
                <h4>Revenue</h4>
                <div className="dropdown">
                  <a href="#!" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Last 6 months
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Current month</a></li>
                    <li><a className="dropdown-item" href="#">Last month</a></li>
                    <li><a className="dropdown-item" href="#">Last 6 months</a></li>
                  </ul>
                </div>
              </div>
                <Chart options={options1} series={series1} type="bar" height="350" />
            </div>
          </div>
          <div className="col-6 mt-4">
            <div className="chart-block">
              <div className="mb-1">
                <h4>Upcoming Cab Bookings</h4>
                <div className="table-responsive mt-3 table-cards">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>From</th>
                        <th>To</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>23-oct-2024 13:00</td>
                        <td>Taj hotel</td>
                        <td>Airport</td>
                      </tr>
                      <tr>
                        <td>23-oct-2024 13:00</td>
                        <td>airport</td>
                        <td>Hotel marriot</td>
                      </tr>
                      <tr>
                        <td>23-oct-2024 13:00</td>
                        <td>Taj hotel</td>
                        <td>Beach</td>
                      </tr>
                      <tr>
                        <td>23-oct-2024 13:00</td>
                        <td>Beach</td>
                        <td>Taj hotel</td>
                      </tr>
                      <tr>
                        <td>23-oct-2024 13:00</td>
                        <td>Taj hotel</td>
                        <td>Airport</td>
                      </tr>
                      <tr>
                        <td>23-oct-2024 13:00</td>
                        <td>airport</td>
                        <td>Hotel marriot</td>
                      </tr>
                      <tr>
                        <td>23-oct-2024 13:00</td>
                        <td>Taj hotel</td>
                        <td>Beach</td>
                      </tr>
                      <tr>
                        <td>23-oct-2024 13:00</td>
                        <td>Beach</td>
                        <td>Taj hotel</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 mt-4">
            <div className="chart-block">
              <div className="mb-1">
                <h4>Upcoming Hotel Bookings</h4>
                <div className="table-responsive mt-3 table-cards">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Hotel</th>
                        <th>Traveller name</th>
                        <th>Mobile number</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>23-oct-2024</td>
                        <td>Taj hotel</td>
                        <td>John deo</td>
                        <td>+91 93838 83823</td>
                      </tr>
                      <tr>
                        <td>23-oct-2024</td>
                        <td>Hotel marriot</td>
                        <td>Jack smith</td>
                        <td>+91 83729 47382</td>
                      </tr>
                      <tr>
                        <td>23-oct-2024</td>
                        <td>Taj hotel</td>
                        <td>John deo</td>
                        <td>+91 83727 77284</td>
                      </tr>
                      <tr>
                        <td>23-oct-2024</td>
                        <td>Hotel marriot</td>
                        <td>Jack smith</td>
                        <td>+91 93748 72748</td>
                      </tr>
                      <tr>
                        <td>23-oct-2024</td>
                        <td>Taj hotel</td>
                        <td>John deo</td>
                        <td>+91 83618 83724</td>
                      </tr>
                      <tr>
                        <td>23-oct-2024</td>
                        <td>Hotel marriot</td>
                        <td>Jack smith</td>
                        <td>+91 83827 18382</td>
                      </tr>
                      <tr>
                        <td>23-oct-2024</td>
                        <td>Taj hotel</td>
                        <td>John deo</td>
                        <td>+91 98377 11193</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;