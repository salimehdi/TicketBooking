import '../Cart/Cart.css'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import axios from "axios";
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
function Orders (){



    const navigate = useNavigate();
  const { user, isLoading } = useUser();
  const [cartItems, setCartItems] = useState([]);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(null); // State for handling errors

  const loadInfo = async () => {
    setLoad(true);
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};
    try {
      const response = await axios.get(`http://localhost:8000/api/orders`, {
        // Use a relative URL
        headers: headers,
      });
      setCartItems(response.data);
      console.log(response.data);
      setLoad(false);
    } catch (error) {
      setLoad(false);
      setError("Error loading order items. Please try again."); // Set the error message
      console.error("Error loading cart items:", error);
    }
  };

 

  
 

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
          ) : cartItems.length === 0 ? (<div className="message">You have not purchased yet !</div>)
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
                      <h3>Purchased: {item.quantity}</h3>
                    </div>
                    <div className="exploreAndRemoveBtn">
                      
                      <button
                        onClick={() => {
                          navigate(`/explore/${item.name}`);
                        }}
                      >
                        Explore
                      </button>
                      
                    </div>
                  </div>
                ))}
              </div>
              
            </div>
          ) : (
            <div className="loginReq">
              To see the previous orders, please <Link to="/login">Login</Link>
            </div>
          )}
        </div>
      );
}
export default Orders