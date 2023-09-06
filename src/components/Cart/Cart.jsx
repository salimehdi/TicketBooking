import "./Cart.css";
import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import axios from "axios";

function Cart() {
  const { user, isLoading } = useUser();
  const [cartItems, setCartItems] = useState([]);
  const [load , setLoad] = useState(true)
  const [total , setTotal] = useState(0)
  
  const loadInfo = async () => {
    setLoad(true)
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};
    try {
      const response0 = await axios.get(`http://localhost:8000/api/cart`, {
        headers: headers,
      });
      console.log(response0);
      console.log(response0.data);
      setCartItems(response0.data);
      setLoad(false)
      
    } catch (error) {
      setLoad(false)
      console.log("Error loading cart items:", error);
    }
  };
  //Calculate total
  useEffect(() => {
    let newTotal = 0;
    for (let i = 0; i < cartItems.length; i++) {
      newTotal += cartItems[i].ticketPrice;
    }
    setTotal(newTotal);
  }, [cartItems]);
  useEffect(() => {
    loadInfo();
    console.log("cartItems" + cartItems);
  }, [isLoading , load]);
  return (
    <div className="cartOuter">
      <div>
      {cartItems.map((e, index) => (
        <div style={{ color: "#fff" }} key={index} className="cart">
          <img src={e.image}/>
          <h1>Name:{e.name}</h1>
          <h2>Venue:{e.venue}</h2>
          <h3>Venue:{e.description}</h3>
          <h4>Price: {e.ticketPrice}</h4>
        </div>
      ))}
      </div>
      <div className="bottom">
        <span className="total">Total: {total}</span>
        <button className="buyBtn">Buy Now</button>
        </div>
    </div>
  );
}
export default Cart;
