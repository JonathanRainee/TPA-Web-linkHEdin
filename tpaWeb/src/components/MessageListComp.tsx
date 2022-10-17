import React from 'react'
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../contexts/authContext';

const MessageListComp = ({ roomData }: any) => {
    const UserContext = UserAuth()
    const navigate = useNavigate()
    console.log(roomData)

    function redir(){
        navigate(`${roomData.id}`)
        console.log("redir")
    }


    return (
        // <div>MessageListComp</div>
        <>
            {roomData.map((roomData: any, index: any) => {
                return(
                    <div key={index}>
                        {roomData.user1.id === UserContext.user.id ? (
                            <div onClick={()=>navigate(`${roomData.id}`)} className="cursor-pointer content-user">
                                <div className='flex-row'>
                                    <div className='mr-2'>
                                        <img src={roomData.user2.ProfilePicture} className="message-profile-pic" alt="" />
                                    </div>
                                    <div className=''>
                                        <p className='cursor-pointer'>{roomData.user2.name}</p>
                                        {roomData.lastMessage.imageUrl === "" ? (
                                            roomData.lastMessage.sender.id === UserContext.user.id ? (
                                                <p>You: {roomData.lastMessage.text}</p>
                                            ) : (
                                                <p>{roomData.user2.name}: {roomData.lastMessage.text}</p>
                                            ) 
                                        ) : roomData.lastMessage.sender.id === UserContext.user.id ? (
                                            <p>You: Sent a photo</p>
                                        ) : (
                                            <p>{roomData.user2.name}: sent a photo</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div onClick={() => navigate(`${roomData.id}`)} className="content-user cursor-pointer">
                                <div className='flex-row'>
                                    <div className='mr-2'>
                                        <img src={roomData.user1.ProfilePicture} alt="" className='message-profile-pic' />
                                    </div>
                                    <div>
                                        <p className='cursor-pointer'>{roomData.user1.name}</p>
                                        {roomData.lastMessage.imageUrl === "" ? (
                                            roomData.lastMessage.sender.id === UserContext.user.id ? (
                                                <p>You: {roomData.lastMessage.text}</p>
                                            ) : (
                                                <p>{roomData.user1.name} : {" "}{roomData.lastMessage.text}</p>
                                            )
                                        ) : roomData.lastMessage.sender.id === UserContext.user.id ? (
                                            <p>You: sent a photo</p>
                                        ) : (
                                            <p>{roomData.user1.name}: sent a photo</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )
            })}
        </>
    )
}

export default MessageListComp