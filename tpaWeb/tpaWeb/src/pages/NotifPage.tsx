import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import NotifComp from '../components/NotifComp'
import { UserAuth } from '../contexts/authContext'
import { QueryNotif } from '../queries/queryUser'


export default function NotifPage(){

    const userContext = UserAuth()

    const { loading: laodingNotif, data: dataNotif, error: errorNotif, startPolling } = useQuery(QueryNotif, {
        variables: {
            toUserId: userContext.user.id
        }
    })

    useEffect(() => {
        startPolling(500)
    }, [])
    console.log(dataNotif)

    if(laodingNotif){
        return(
            <div>Loading...</div>
        )
    }

    return(
        <div className="flex-row flex">
            <div className='linkedin-bg fullscreen center-col'>
                <Navbar></Navbar>
                <div className='all-center flex-col '>
                    <div className='box'>
                        <p className='text-black text-l bold'>Notifications</p>
                        {
                            dataNotif.userNotification.length == 0 ? (
                                <p>empty</p>
                            ) : (
                                dataNotif.userNotification.map((notif: any) => {
                                    return(
                                        <NotifComp key = {notif.any} notification={notif}></NotifComp>
                                    )
                                })
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

