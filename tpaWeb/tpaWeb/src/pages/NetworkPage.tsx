import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import RequestConnectComp from '../components/RequestConnectComp'
import { UserAuth } from '../contexts/authContext'

export default function NetworkPage(){
    const userContext = UserAuth()
    const [ connectReq, setCOnnectReq ] = useState([])


    return(
        <div className='white-bg fullscreen center-col'>
            <Navbar></Navbar>
            <div className='profile border-border'>
                <p className='text-black text-l bold'>Connect Request</p>
                {
                    userContext.user.connect_request.length == 0 && (
                        <p className='text-black text-s'>No Connect Request</p>
                    )
                }
                {
                    userContext.user.connect_request.map((req:any) => {
                        // console.log(req)
                        return (
                            <RequestConnectComp key={req} id={req}></RequestConnectComp>
                        )
                    })
                }
            </div>
        </div>
    )
}