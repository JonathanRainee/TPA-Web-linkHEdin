import { useQuery } from '@apollo/client';
import React, {useState, useEffect} from 'react'
import { BiMessageAdd } from 'react-icons/bi';
import { Route, Routes, useNavigate } from 'react-router-dom';
import FooterComp from '../components/FooterComp'
import MessageListComp from '../components/MessageListComp';
import MessageNewComp from '../components/MessageNewComp';
import MessageRoomComp from '../components/MessageRoomComp';
import Navbar from '../components/Navbar'
import { UserAuth } from '../contexts/authContext';
import { Blocks, Rooms } from '../queries/queryUser';

const MessagePage = () => {
    const navigate = useNavigate();
    const UserContext = UserAuth();
    const [modalNew, setModalNew] = useState(false);

    const { loading, error, data, startPolling } = useQuery(Rooms, {
        variables: { userId: UserContext.user.id },
    })

    const {
        loading: loadingBLock,
        data: dataBlock,
        startPolling: startPollingBlock,
    } = useQuery(Blocks, { variables: { userId: UserContext.user.id } });

    useEffect(() => {
        startPolling(500);
        startPollingBlock(500);
    }, []);

    useEffect(() => {
        UserContext.refetchUser();
    }, []);

    if (loading || loadingBLock ) return <p>Fetching Room Data...</p>

    const gotoNewMessage = () => {
        navigate("/message/new");
    }

    // console.log(data.rooms)

    return (
        <div className="flex-row flex">
            <div className='linkedin-bg fullscreen center-col'>
                <Navbar></Navbar>
                {modalNew && (
                    <MessageNewComp roomData={data.rooms} userBlockData={dataBlock.blocks} closeModal={setModalNew}></MessageNewComp>
                )}
                <div className='message-container'>
                    <div className='message-main'>
                        <div className='col-user'>
                            <div className='head-user'>
                                <span className='cursor-pointer' onClick={() => navigate("/message")}>Message</span>
                                <BiMessageAdd className='button-new-message cursor-pointer' size={30} onClick={() => setModalNew(true)}/>
                            </div>
                            <MessageListComp roomData = {data.rooms}></MessageListComp>
                        </div>
                        <div className='col-chat'>
                            <Routes>
                                <Route path='/:roomid' element={<MessageRoomComp userBlockData={dataBlock.blocks}/>}></Route>
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
            <FooterComp></FooterComp>
        </div>
    )
}

export default MessagePage