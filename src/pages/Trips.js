import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { toastOptions } from '../toastify';
import { handleAPIData } from '../hooks/useCustomApi';
import TripContainer from '../components/TripContainer';

const Trips = ({ id }) => {
  localStorage.setItem('current_route', '/trips');
  const { displayEmail } = useSelector(state => state.myAccount );
  const [tripsData, setTripsData] = useState({ upcomingTrips: [], onGoingTrips: [], pastTrips: [] });
  // State to store loading status
  const [loading, setLoading] = useState(true);
  // State to store error (if any)
  const [error, setError] = useState(null);

  const fetchTripsData = async () => {
    try {
      setLoading(true);
      let response = await handleAPIData('POST', '/api/trips', { email: displayEmail });
      console.log('tripsresponse', response);
      if (response.status === 'success' && response.data.message && response.data.data.length === 0) {
        toast.error(response.data.message, toastOptions);
        setTripsData({ upcomingTrips: [], onGoingTrips: [], pastTrips: [] });
      } else if (response.status === 'success' && response.data.data.length > 0) {
        let responseData = response.data.data;
        const upcomingTripsArray = responseData.filter((trip) => trip.status === 'upcoming');
        const onGoingTripsArray = responseData.filter((trip) => trip.status === 'live');
        const pastTripsArray = responseData.filter((trip) => trip.status === 'completed');
        setTripsData({
          upcomingTrips: upcomingTripsArray,
          onGoingTrips: onGoingTripsArray,
          pastTrips: pastTripsArray
        });
      } else if (response.status === 'error') {
        setTripsData({ upcomingTrips: [], onGoingTrips: [], pastTrips: [] });
        toast.error(response.message, toastOptions);
      } else {
        setTripsData({ upcomingTrips: [], onGoingTrips: [], pastTrips: [] });
        toast.error('Something went wrong. Please try again.', toastOptions);
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    if (displayEmail) {
      fetchTripsData();
    }
    
  }, [displayEmail]); // Empty dependency array means this runs once on mount

  return (
    <>
      <div className="container-xxl section-block-inner">
        <div className="row align-items-center">
          <div className="col-lg-12 col-md-12 text-center">
            <h1 className="mb-2">Trips</h1>
            <p className="hero-text">View all of your trips</p>
          </div>
        </div>
      </div>
      <div className="container-xxl py-5 section-block">
        <div className="row mb-2 mt-4">
          <div className="col-auto me-auto offset-1">
            <h3>Upcoming Trips</h3>
          </div>
        </div>
        {
          tripsData.upcomingTrips && tripsData.upcomingTrips.length > 0 && tripsData.upcomingTrips.map((trip, index) => {
            console.log('trip', trip);
            return (<TripContainer id={`upcomingTrip-${index}`} tripData={trip} statusClass={"warning"} />)
          })
        }
        <div className="row mb-2">
          <div className="col-auto me-auto offset-1">
            <h3>On-Going Trips</h3>
          </div>
        </div>
        {
          tripsData.onGoingTrips && tripsData.onGoingTrips.length > 0 && tripsData.onGoingTrips.map((trip, index) => {
            return (<TripContainer id={`onGoingTrip-${index}`} tripData={trip} statusClass={"info"} />)
          })
        }
        <div className="row mb-2">
          <div className="col-auto me-auto offset-1">
            <h3>Past Trips</h3>
          </div>
        </div>
        {
          tripsData.pastTrips && tripsData.pastTrips.length > 0 && tripsData.pastTrips.map((trip, index) => {
            return (<TripContainer id={`pastTrip-${index}`} tripData={trip} statusClass={"info"} />)
          })
        }
      </div>
    </>
  )
};

export default Trips;
