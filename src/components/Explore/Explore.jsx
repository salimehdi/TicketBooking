import './Explore.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useUser from '../../hooks/useUser';
import { useNavigate } from 'react-router-dom';

function Explore() {
  const { user } = useUser();
  const navigate = useNavigate();
  const { name } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [eventDetails, setEventDetails] = useState({});

  const eventDetailDownload = async () => {
    setIsLoading(true);
    try {
      const response = await axios(`http://localhost:8000/api/name/${name}`);
      setEventDetails(response.data); // Corrected the data extraction
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching event details:", error);
      setIsLoading(false);
    }
  };

  async function AddAndGoTOCart(eventDetails_id) {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};
    const response = await axios.get(`http://localhost:8000/api/addtocart/${eventDetails_id}`,{headers: headers});
    navigate('/cart')
  }

  function datify(dateGiven) {
    const inputDate = dateGiven;
    const date = new Date(inputDate);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate; // Output: "Sep 10, 2023"
  }

  useEffect(() => {
    eventDetailDownload();
    console.log("started");
  }, []);

  return (
    isLoading ? (
      <h1>Loading...</h1>
    ) : (
      <div className="outerExplore">
        <div className="this-event-details">
          {/* Left.... */}
        <div className="imgOfEventInExplore" style={{ backgroundImage: `url(${eventDetails.image})` }}></div>
          <div className="this-event-details-text">
          
            <h1>{eventDetails.name}<div>Seats: {eventDetails.availableTickets}</div></h1>
            <h2>{eventDetails.category}</h2>
            <h3>{eventDetails.description}</h3>
            <h3>{datify(eventDetails.date)}</h3>
            <h3>{eventDetails.time}</h3>
            <h3>Venue: {eventDetails.venue}</h3>
            <h3 onClick={()=>{AddAndGoTOCart(eventDetails.name)}} >Add and go to cart: {eventDetails.ticketPrice}₹</h3>
            
          </div>
        </div>
      </div>
    )
  );
}

export default Explore;
