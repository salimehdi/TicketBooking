import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ListEvent.css";
import axios from "axios";
import useUser from "../../hooks/useUser";
function ListEvent() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [eventDetails, setEventDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const [filteredEventDetails, setFilteredEventDetails] = useState([]);
  const [selectedOption, setSelectedOption] = useState("all");
  const [namesOfAddedItems, setNamesOfAddedItems] = useState([]);

  const handleOptionChange = (event) => {
    setIsLoading(true);
    setSelectedOption(event.target.value);
    setIsLoading(false);
  };

  const eventDetailDownload = async () => {
    setIsLoading(true);
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};

    const response4 = await axios.get(`http://localhost:8000/api/cartItems`, {
      headers: headers,
    });
    console.log(response4.data);
    setNamesOfAddedItems(response4.data);
    const response = await axios("http://localhost:8000/api/allEvents");
    setEventDetails(response.data);
    const response2 = await axios("http://localhost:8000/api/category");
    setCategory(response2.data);
    const response3 = await axios(
      `http://localhost:8000/api/category/${selectedOption}`
    );
    setFilteredEventDetails(response3.data);
    setIsLoading(false);
  };
  function datify(dateGiven) {
    const inputDate = dateGiven;
    const date = new Date(inputDate);
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate; // Output: "Sep 10, 2023"
  }

  async function addToCart(parameter) {
    setIsLoading(true);
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};
    const response = await axios.get(
      `http://localhost:8000/api/addtocart/${parameter}`,
      { headers: headers }
    );
    {
      !user && navigate("/cart");
    }
    setIsLoading(false);
  }
  function goToCart() {
    navigate("/cart");
  }
  useEffect(() => {
    setNamesOfAddedItems([]);
    eventDetailDownload();
  }, [selectedOption]);
  return (
    <div className="list-event">
      <div className="blurEffect"></div>
      <div className="filter">
        <h1>
          Filter <span className="drop-down">v</span>{" "}
        </h1>
        <h2>Category:</h2>
        <div className="category">
          <>
            <label htmlFor="all">
              <input
                type="radio"
                name="category"
                value="all"
                onChange={handleOptionChange}
              />
              &nbsp;&nbsp; All
            </label>
            {category.map((cat) => {
              return (
                <>
                  <label htmlFor={cat}>
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      onChange={handleOptionChange}
                    />
                    &nbsp;&nbsp; {cat}
                  </label>
                </>
              );
            })}
          </>
        </div>
      </div>
      <div className="event-list">
        {isLoading ? (
          <h1 className="loading">Loading</h1>
        ) : selectedOption !== "all" ? (
          filteredEventDetails.map((event) => {
            return (
              <div className="event">
                <div className="event-image">
                  <div
                    onClick={() => {
                      navigate(`/explore/${event.name}`);
                    }}
                    className="imgOfEventInListEvent"
                    style={{ backgroundImage: `url(${event.image})` }}
                  ></div>
                </div>
                <div className="event-details">
                  <div className="event-name">
                    <h3>{event.name}</h3>
                  </div>
                  <div className="event-venue">
                    <h4>Venue: {event.venue}</h4>
                  </div>
                  <div className="event-date">
                    <h4>{datify(event.date)}</h4>
                    <h4>{event.time}</h4>
                  </div>

                  <div className="event-price">
                    <h4
                      onClick={() => {
                        navigate(`/explore/${event.name}`);
                      }}
                    >
                      Explore
                    </h4>
                    <h4>Add to Cart: {event.ticketPrice}₹</h4>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          eventDetails.map((event) => {
            return (
              <div className="event">
                <div className="event-image">
                  <div
                    onClick={() => {
                      navigate(`/explore/${event.name}`);
                    }}
                    className="imgOfEventInListEvent"
                    style={{ backgroundImage: `url(${event.image})` }}
                  ></div>
                </div>
                <div className="event-details">
                  <div className="event-name">
                    <h3>{event.name}</h3>
                  </div>
                  <div className="event-venue">
                    <h4>Venue: {event.venue}</h4>
                  </div>
                  <div className="event-date">
                    <h4>{datify(event.date)}</h4>
                    <h4>{event.time}</h4>
                  </div>

                  <div className="event-price">
                    <h4
                      onClick={() => {
                        navigate(`/explore/${event.name}`);
                      }}
                    >
                      Explore
                    </h4>
                    {namesOfAddedItems.includes(event.name) ? (
                      <h4
                        onClick={() => {
                          goToCart(event.name);
                        }}
                      >
                        Go to Cart: {event.ticketPrice}₹
                      </h4>
                    ) : (
                      <h4
                        onClick={() => {
                          addToCart(event.name);
                        }}
                      >
                        Add to Cart: {event.ticketPrice}₹
                      </h4>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
export default ListEvent;
