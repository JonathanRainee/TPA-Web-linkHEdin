import React from 'react'
import { useNavigate } from 'react-router-dom'



export default function Error404Page() {
    const navigate = useNavigate()

    return (
        <div className='fullscreen center-all'>
            <h2>Error 404</h2>
            <h3>Page not found</h3>
            <button onClick={()=>{navigate('/')}} className = "blue-button2">
                Back
            </button>
        </div>
    )
}