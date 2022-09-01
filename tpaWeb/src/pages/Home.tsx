import React from 'react'
import Navbar from '../components/Navbar'
import { UserAuth } from '../contexts/authContext';
import '../styles/logRes.scss'

function Home(){
    const { user } = UserAuth();
    console.log(user)
    return (
        <div className='fullscreen linkedin-bg'>
            <Navbar></Navbar>
        </div>
    )
}

export default Home