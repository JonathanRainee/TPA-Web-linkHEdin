import React from 'react'

const MessageCardComp = ({ messageData }: any) => {

    console.log(messageData);
    
    return (
        <div>
            <div className='flex-row ml-10 mb-20 mt-10'>
                <img src={messageData.sender.ProfilePicture} className="message-profile-pic border-black" alt="" />
                <div className='text-s ml-5'>
                    <div>
                        {messageData.sender.name}
                    </div>
                    {messageData.text !== "" && messageData.imageUrl !== "" && (
                        <>
                            <div className='mt-5'>{messageData.text}</div>
                            <img src={messageData.imageUrl} alt="" />
                        </>
                    )}
                    {messageData.text !== "" && messageData.imageUrl === "" && (
                        <>
                            <div className='mt-5'>{messageData.text}</div>
                        </>
                    )}
                    {messageData.imageUrl !== "" && messageData.text === "" && (
                        <>
                            <img src={messageData.imageUrl} className="mt-5 message-image" alt="" />
                        </>
                    )}
                </div>
            </div>
        </div>
        // <div>MessageCardComp</div>
    )
}

export default MessageCardComp