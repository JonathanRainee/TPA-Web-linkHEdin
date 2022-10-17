import React from 'react'
import { FiArrowUpRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../contexts/authContext';

const UserConnectionComp = ({ connection }: any) => {

    const userContext = UserAuth()
    let userTrue = true
    const navigate = useNavigate();
    console.log(connection)
    const goProf = () => {
        // console.log(connection)
        // console.log(`${userSuggestionData.id}`)
        navigate(`/profile/${connection.user2.id}`)
    }

    if (connection.user1.id === userContext.user.id) {
        userTrue = false;
    }


    return (
        <div className='YMK-card mb-10'>
            {userTrue ? ( 
                <div className="card-suggest flex-row">
                    <img className='YMK2-img' src={connection.user1.ProfilePicture} alt="" />
                    <div className='mb-10 ml-20 pt-10'>
                        <div className='flex-row'>
                            <p className='text-black text-l'>{connection.user1.name}</p>
                            <button className='transparent-btn'>
                                <FiArrowUpRight onClick={goProf} className='icon-sug ml-10'></FiArrowUpRight>
                            </button>
                            <div>
                                <button className='blue-button-xs ml-10'>Connected</button>
                            </div>
                        </div>
                    </div>
                </div>) : (
                <div className='card-suggest flex-row'>
                    <img className='YMK-img' src={connection.user2.ProfilePicture} alt="" />
                    <div className='mb-10 ml-20 pt-10'>
                        <div className='flex-row'>
                            <p className='text-black text-l'>{connection.user2.name}</p>
                            <button onClick={goProf} className='transparent-btn'>
                                <FiArrowUpRight className='icon-sug ml-10'></FiArrowUpRight>
                            </button>
                            <div>
                                <button className='blue-button-xs ml-10'>Connected</button>
                            </div>
                        </div>
                    </div>
                </div>)
            }
        </div>
    )
}

export default UserConnectionComp