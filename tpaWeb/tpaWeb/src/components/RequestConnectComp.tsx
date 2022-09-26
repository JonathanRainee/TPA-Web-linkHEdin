import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { UserAuth } from '../contexts/authContext'
import { RefetchContext } from '../contexts/refetch'
import { AcceptConnect, GetUsrByID } from '../queries/queryUser'


export default function RequestConnectComp(parameter: any){
    const userContext = UserAuth()
    const refetchCOntext = RefetchContext()
    const user = useQuery(GetUsrByID, {variables:{UserID: parameter.id}})
    const [ acceptConnectInvitation ] = useMutation(AcceptConnect, {variables:{id: userContext.user.id, senderID: parameter.id}})

    console.log(userContext.user.id, "n",  parameter.id)
    const  [ userExperience, setUserExperience ] = useState([])

    const accept = () => {
        acceptConnectInvitation().then((x) => {
            refetchCOntext.refreshUser()
        })
    }
    
    const [User, setUser] = useState({
        id:"",
        name: "",
        profile_picture_url: "https://firebasestorage.googleapis.com/v0/b/linkhedin-vt.appspot.com/o/profilePictures%2Fdefault.jpg?alt=media&token=140c66e3-a51d-47ae-aaef-00ad043d2bd0",
        connect_request:[''],
        connected_user:['']
    })

    useEffect(()=>{
        if(!user.loading && !user.error){
            setUser(user.data.getUser)
        }
    }, [ user.loading, user.data])

    // console.log(user.data.getUser.profilePicture)
    

    return(
        <div className='w-full border-1- flex-row '>
            <img className='profile-pic-connect p-10' src={User.ProfilePicture} alt="" />
            <div className=' space-between flex-row'>
                <div className='flex-row mh-10 space-between flex-end'>
                    <p className='text-black text-m'>{User.name} wants to connect</p>
                    <div className='flex-row mb-10 flex-end '>
                        <button onClick={accept} className='blue-button-xs text-white mb-10 ml-10' >Accept</button>
                        <button className='red-button-xs text-white mb-10 ml-10'>Decline</button>

                    </div>
                </div>
            </div>
        </div>
    )

}