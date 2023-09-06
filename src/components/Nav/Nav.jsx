import logo from '../../assets/logo.png'
import './Nav.css'
import {FaBars  } from 'react-icons/fa'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import {getAuth , signOut } from 'firebase/auth'
import useUser from '../../hooks/useUser';
function Nav () {
    const { user , isLoading } = useUser()
    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false)
    
    return(
    <div className="nav-bar">
        <img onClick={()=>{navigate(`/`)}} src={logo} alt="logo" />
        <ul>
            <li onClick={()=>{navigate(`/`)}} >Home</li>
            <li onClick={()=>navigate('/cart')} >Cart</li>
            {user
                 ? <li className='logBtn' onClick={()=>{signOut(getAuth())}}>Logout</li>
                 : <li className='logBtn' onClick={()=>navigate('/login')}>Login</li>
            }
        </ul>
        <div  className='hamBurgerMenu'>
        {
            (showMenu) 
            ? (
            <>
            <FaBars className='hamBurgerMenuIcon'
            onClick={()=>{
                setShowMenu(!showMenu)
                console.log("showMenu")
               }} 
             />
            <ul>
            <li>Home</li>
            <li>Cart</li>
            <li>{loginStatus}</li>
            </ul>
            </>   
            )
            : (<FaBars className='hamBurgerMenuIcon'
                onClick={()=>{
                    setShowMenu(!showMenu)
                    console.log("showMenu")
                   }} 
               />
              ) 
        }
            
        </div>
    </div>
    )
}
export default Nav