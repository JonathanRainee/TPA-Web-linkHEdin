import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import ConnectReqComp from '../components/ConnectReqComp'
import FooterComp from '../components/FooterComp'
import Navbar from '../components/Navbar'
import RequestConnectComp from '../components/RequestConnectComp'
import UserConnectionComp from '../components/UserConnectionComp'
import UserYMKCard from '../components/UserYMKCard'
import { UserAuth } from '../contexts/authContext'
import { UserYouMightKnow } from '../queries/queryUser'

export default function NetworkPage(){
    const userContext = UserAuth()
    // console.log(userContext)
    // console.log(userContext.user.Connections)

    const { loading: loadingUserSuggestion, error: errorUserSuggestion, data: dataUserSuggestion, refetch: refetchUserSuggestion } = useQuery(UserYouMightKnow, {
        variables: {
            userId: userContext.user.id
        }
    })

    return(
        <div className="flex-row flex">
            <div className='linkedin-bg fullscreen center-col flex'>
                <Navbar></Navbar>
                <div>
                    <div className='profile white-bg border-border'>
                        <div className='flex-row w-full space-between'>
                            <div className='flex-col'>
                                <p className='text-black text-l bold'>Connect Request</p>
                                    {userContext.user.ConnectRequests.length === 0 && (
                                        <p>empty</p>
                                    )}
                                    {/* {userContext.user.ConnectRequests.length !== 0 && (
                                        <p>asda</p>
                                    )} */}
                                    {userContext.user.ConnectRequests.map((req: any) => {
                                        return(
                                            <ConnectReqComp key={req.id} connection={req}></ConnectReqComp>
                                            // console.log(req.id)
                                        )
                                        // <p>asd</p>
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='profile white-bg border-border'>
                        <div className='flex-row w-full space-between'>
                            <div className='flex-col'>
                                <p className='text-black text-l bold'>Your Connection</p>
                                {userContext.user.Connections.length === 0 && (
                                    <p>empty</p>
                                )}
                                {userContext.user.Connections.map((connect: any) => {
                                    return(
                                        <UserConnectionComp key={connect.id} connection={connect}></UserConnectionComp>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mb-20'>
                    <div className='profile white-bg border-border'>
                        <div className='flex-row w-full space-between'>
                            <div className='flex-col'>
                                <p className='text-black text-l bold'>User You Might Know</p>
                                {loadingUserSuggestion ? (
                                    <p>loading...</p>
                                ) : !errorUserSuggestion ? (
                                    <>
                                        <UserYMKCard userSuggestionData={dataUserSuggestion.userSuggestion}> </UserYMKCard>
                                    </>
                                ) : (
                                    <p>-</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                <FooterComp></FooterComp>
        </div>
    )
}