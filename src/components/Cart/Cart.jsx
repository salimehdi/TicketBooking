import "./Cart.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import axios from "axios";
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const { user, isLoading } = useUser();
  const [cartItems, setCartItems] = useState([]);
  const [load, setLoad] = useState(true);
  const [total, setTotal] = useState(0);
  const [numOfSeats, setNumOfSeats] = useState({});
  const [error, setError] = useState(null); // State for handling errors

  const loadInfo = async () => {
    setLoad(true);
    
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};
    try {
      const response = await axios.get(`http://localhost:8000/api/cart`, {
        // Use a relative URL
        headers: headers,
      });
      setCartItems(response.data);
      setLoad(false);
    } catch (error) {
      setLoad(false);
      setError("Error loading cart items. Please try again."); // Set the error message
      console.error("Error loading cart items:", error);
    }
  };

  // async function removeFromCart(nameOfEventToBeRemoved) {
  //   setLoad(true);
  //   // Remove from cart
  //   const token = user && (await user.getIdToken());
  //   const headers = token ? { authtoken: token } : {};
  //   const response = await axios.get(`http://localhost:8000/api/removefromcart/${nameOfEventToBeRemoved}`,{headers: headers});
  //   setLoad(false);
  // }

  async function removeFromCart(nameOfEventToBeRemoved) {
    setLoad(true);
    // Remove from cart
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};

    try {
      const response = await axios.delete(
        `http://localhost:8000/api/removefromcart/${nameOfEventToBeRemoved}`,
        { headers: headers }
      );
      // Assuming that your server responds with success when an item is removed
      if (response.status === 200) {
        // Refresh the cart items after successful removal
        loadInfo();
      } else {
        // Handle the error here if the removal was not successful
        console.error("Error removing item from cart:", response);
      }
    } catch (error) {
      // Handle any network or other errors here
      console.error("Error removing item from cart:", error);
    }
  }
  async function buyTickets() {
    setLoad(true);
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};
    const response = await axios.post(
      `http://localhost:8000/api/buy`,
      { items: numOfSeats },
      { headers: headers }
    );
    if (response.status === 200) {
      // Refresh the cart items after successful removal
      loadInfo();
    } else {
      // Handle the error here if the removal was not successful
      console.error("Error removing item from cart:", response);
    }
    setLoad(false);
  }
  // Calculate total using reduce
  useEffect(() => {
    const newTotal = cartItems.reduce((accumulator, item) => {
      return accumulator + item.ticketPrice;
    }, 0);
    setTotal(newTotal);
  }, [cartItems]);

  useEffect(() => {
    // Load cart items when isLoading or load changes
    if (!isLoading && load) {
      loadInfo();
    }
  }, [isLoading, load]);

  return (
    <div className="out">
      {error ? (
        <div className="error">{error}</div>
      ) : load ? (
        <div className="loading">Loading</div>
      ) : cartItems.length === 0 ? (<div className="message">Cart is Empty !</div>)
      : user ? ( // Check if user is authenticated
        <div className="cartOuter">
          <div>
            {cartItems.map((item, index) => (
              <div style={{ color: "#fff" }} key={index} className="cart">
                <div
                  className="imgOfEventInExplore"
                  style={{ backgroundImage: `url(${item.image})` }}
                ></div>
                <div className="name-ven">
                  <h1>{item.name}</h1>
                  <h4>{item.venue}</h4>
                </div>
                <h3>Description: {item.description}</h3>
                <div className="details">
                  <h3>Price: {item.ticketPrice}</h3>
                  <h3>Seats: {item.availableTickets}</h3>
                </div>
                <div className="exploreAndRemoveBtn">
                  <button
                    onClick={() => {
                      removeFromCart(item.name);
                    }}
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => {
                      navigate(`/explore/${item.name}`);
                    }}
                  >
                    Explore
                  </button>
                  <div className="seatsControler">
                    <div className="tag">SEATS</div>
                    <div
                      className="decSeats"
                      
                      onClick={() => {
                        let temp = 1;
                        if (numOfSeats[item.name] - 1 < 1 ) { 
                          { numOfSeats[item.name] ? temp = numOfSeats[item.name] : temp = 1};
                        } else {
                        temp = numOfSeats[item.name] - 1}
                        setNumOfSeats({
                          ...numOfSeats,
                        [item.name]: temp,
                        })
                      }}
                    >
                      -
                    </div>
                    <input type="text" id="noOfSeats" value={numOfSeats[item.name] ? numOfSeats[item.name] : numOfSeats[item.name] = 1} />
                    <div
                      className="incSeats"
                      onClick={() => {
                        let temp = 1;
                        if (numOfSeats[item.name] + 1 > item.availableTickets ) { 
                          { numOfSeats[item.name] ? temp = numOfSeats[item.name] : temp = 1}
                        } else {
                        temp = numOfSeats[item.name] + 1}
                        setNumOfSeats({
                          ...numOfSeats,
                        [item.name]: temp,
                        })
                      }}
                    >
                      +
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bottom">
            <span className="total">Total: {total}₹</span>
            <button onClick={buyTickets} className="buyBtn">Buy Now</button>
          </div>
        </div>
      ) : (
        <div className="loginReq">
          To use the cart, please <Link to="/login">Login</Link>
        </div>
      )}{" "}
      {/* Display error message */}
    </div>
  );
}

export default Cart;
