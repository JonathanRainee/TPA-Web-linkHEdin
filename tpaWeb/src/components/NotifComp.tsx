import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotifComp = ({ notification }: any) => {

    const navigate = useNavigate()

    const moveToProfilePage = () => {
        navigate(`/profile/${notification.fromUser.id}`)
    }

    return (
        <div className='YMK-card mb-20 pointer' onClick={moveToProfilePage}>
            <div className='flex-row card-suggest'>
                <div className='mv-10'>
                    {
                        notification.fromUser.ProfilePicture === "" ?
                        (<img className='notif-img' src={"../assets/react.svg"} alt=""></img>) : (<img className='YMK-img' src={notification.fromUser.ProfilePicture} alt=""></img>)
                    }
                </div>
                <div className=' ml-20'>
                    <p>
                        <span>
                            {notification.fromUser.name}  {notification.message}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default NotifComp