import React from 'react'

const MessageCardComp = ({ messageData }: any) => {
    return (
        <div>
            <div className='flex-row'>
                <img src={messageData.sender.ProfilePicture} className="" alt="" />
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