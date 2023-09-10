import "./App.css";
import Nav from "./components/Nav/Nav";
import ListEvent from "./components/ListEvent/ListEvent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Explore from "./components/Explore/Explore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import CreateAccountPage from "./components/CreateAccount/CreateAccountPage";
import LoginPage from "./components/Login/Login";
import Cart from "./components/Cart/Cart";
import Orders from "./components/Orders/Orders";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvNsQINsCWQDZAlltw2rlBFi2QD3W4tZU",
  authDomain: "my-react-blog-6619d.firebaseapp.com",
  projectId: "my-react-blog-6619d",
  storageBucket: "my-react-blog-6619d.appspot.com",
  messagingSenderId: "898462735422",
  appId: "1:898462735422:web:b0b6691613dde0f280856f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />

        <Routes>
          <Route path="/" element={<ListEvent />} />
          <Route path="/explore/:name" element={<Explore />} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/orders' element={<Orders/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/create-account' element={<CreateAccountPage/>} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
