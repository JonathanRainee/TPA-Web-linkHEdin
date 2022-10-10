import React from 'react'
import FooterComp from '../components/FooterComp'
import Navbar from '../components/Navbar'

const MessagePage = () => {
    return (
        <div className="flex-row flex">
            <div className='linkedin-bg fullscreen center-col'>
                <Navbar></Navbar>
            </div>
            <FooterComp></FooterComp>
        </div>
    )
}

export default MessagePage