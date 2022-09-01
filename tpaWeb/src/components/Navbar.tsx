import { useState } from 'react'
import {AiFillHome, AiFillMessage} from 'react-icons/ai'
import {BsPeopleFill, BsLinkedin, BsPersonCircle} from 'react-icons/bs'
import {FaSuitcase} from 'react-icons/fa'
import {IoMdNotifications} from 'react-icons/io'
import { NavLink } from 'react-router-dom'
import { UserAuth } from '../contexts/authContext'
import '../styles/logRes.scss'




export default function Navbar(){

    const userContext = UserAuth()
    const [dropDown, setDropDown] = useState(false)

    const handleActivePage = (state:any) =>{
        if(state.isActive){
            return 'navbar-items-active'
        }else{
            return 'navbar-items'
        }
    }

    const logOut = () => {
        userContext.setUser({})
        // console.log("logout")
    }

    return (
            <div className='white-bg w-screen navbar'>
            <BsLinkedin className='navbar-logo'></BsLinkedin>
            {/* <img src="../../assets/AppIcon.png" alt="" className='logo' /> */}
            <input type="text" className='searchbar white-bg' placeholder='Search' />
                <div className='navbar-menu-container'>
                    <NavLink to="/home" className= {handleActivePage}>
                        <AiFillHome className='navbar-icon'></AiFillHome>
                        <h6 className='item-label'>Home</h6>
                    </NavLink>
                    <NavLink to="/network" className= {handleActivePage}>
                        <BsPeopleFill className='navbar-icon'></BsPeopleFill>
                        <h6 className='item-label'>My Network</h6>
                    </NavLink>
                    <NavLink to="/jobs" className= {handleActivePage}>
                        <FaSuitcase className='navbar-icon'></FaSuitcase>
                        <h6 className='item-label'>Jobs</h6>
                    </NavLink>
                    <NavLink to="/messaging" className= {handleActivePage}>
                        <AiFillMessage className='navbar-icon'></AiFillMessage>
                        <h6 className='item-label'>Messaging</h6>
                    </NavLink>
                    <NavLink to="/notifications" className= {handleActivePage}>
                        <IoMdNotifications className='navbar-icon'></IoMdNotifications>
                        <h6 className='item-label'>Notifications</h6>
                    </NavLink>
                    <NavLink to={'/profile/'+userContext.user.id} onMouseEnter={()=>{setDropDown(true)}} onMouseLeave={()=>{setDropDown(false)}} className= {handleActivePage}>
                        <BsPersonCircle className='navbar-icon'></BsPersonCircle>
                        <h6 className='item-label'>Profile</h6>
                        {dropDown && (
                            <div className='dropdown'>
                                <div onClick={logOut}>Logout</div>
                            </div>
                        )}
                    </NavLink>
                </div>
            </div>
        )    
}


