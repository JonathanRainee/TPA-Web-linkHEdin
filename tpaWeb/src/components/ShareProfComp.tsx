import React from 'react'
import { useNavigate } from 'react-router-dom'

const ShareProfComp = ({prof} : any) => {
    const navigate = useNavigate()

    const handleGoToProfile = () => {
        navigate(`/Profile/${prof.id}`)
    }

    console.log(prof.id);
    

    return (
        <div className='border-border ml-20 mr-20 mb-50 cursor-pointer' onClick={handleGoToProfile}>
            <div className='ml-10 mr-10 mt-5  flex-row'>
                {
                    prof.ProfilePicture === "" ?
                    (<img className='message-profile-pic'  src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'/>) :
                    (<img className='message-profile-pic' src={prof.ProfilePicture}/>)
                }
                <div  className='flex-row ml-10'>
                    <p>{prof.name}</p>
                    <p>
                        <span>{prof.Connections.length} Connections</span>
                        <span>  </span>
                        <span>{prof.Visits.length} Visits</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ShareProfComp