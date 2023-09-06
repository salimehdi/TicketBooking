import './Explore.css'
import { useEffect , useState } from 'react';
import { useParams  } from 'react-router-dom';
import axios from 'axios';
function Explore () {
    const {name} = useParams()
    const [isLoading, setIsLoading] = useState(true);
    const [eventDetails, setEventDetails] = useState({});
    const eventDetailDownload = async () => {
        setIsLoading(true)
        const response = await axios(`http://localhost:8000/api/name/${name}`).data;
        setEventDetails({response})
        setIsLoading(false)
      };
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
        
            (isLoading)
            ? <h1>Loading...</h1>
            : (<div className="outerExplore">

                <div className="this-event-details">
                   <img src={eventDetails.image} alt="img" />
                   <div className="this-event-details-text">
                       <h1>{eventDetails.name}</h1>
                       <h2>{eventDetails.category}</h2>
                       <h3>{eventDetails.description}</h3>
                       <h3>{datify(eventDetails.date)}</h3>
                       <h3>{eventDetails.time}</h3>
                       <h3>Venue: {eventDetails.venue}</h3>
                       <h3>Buy Now: {eventDetails.ticketPrice}₹</h3>
                   </div>
                </div>
            </div>
            )
        
    )
}
export default Explore