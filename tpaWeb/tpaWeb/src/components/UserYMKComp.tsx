import React from 'react'
import { FiArrowUpRight } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const UserYMKComp = ({ userSuggestionData }: any) => {

    const navigate = useNavigate();
    const goProf = () => {
        console.log(`${userSuggestionData.id}`)
        navigate(`/profile/${userSuggestionData.id}`)
    }

    return (
        <div className='YMK-card'>
            <div className='flex-row card-suggest'>
                <img className='YMK-img' src={userSuggestionData.ProfilePicture} alt="" />
                <div className='mb-20 ml-20'>
                    <div className='flex-row'>
                        <p className='text-black text-l'>{userSuggestionData.name}</p>
                        <button onClick={goProf} className='transparent-btn'>
                            <FiArrowUpRight onClick={()=>goProf} className='icon-sug ml-10'></FiArrowUpRight>
                        </button>
                    </div>
                    <div className='flex-row'>
                        <a className='links' href="">Download CV </a>
                        <a className='links' href=""> Send Message</a>
                    </div>
                </div>
            </div>
        </div>
    ) 
}

export default UserYMKComp