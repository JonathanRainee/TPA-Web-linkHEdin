import { useMutation } from '@apollo/client'
import React from 'react'
import { FiArrowUpRight } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../contexts/authContext'
import { CreateBlock, CreateConnect, CreateConnectReq, CreateNotif, DeleteBlock, DeleteConnectReq, FollowUser, UnfollowUser } from '../queries/queryUser'

const UserSearchComp = ({ user, refetchUser }: any) => {

    const UserContext = UserAuth()
    const navigate = useNavigate()
    const [ addConnection ] = useMutation(CreateConnect)
    const [ addConnectReq ] = useMutation(CreateConnectReq)
    const [ deleteConnectionReq ] = useMutation(DeleteConnectReq)
    const [ createNotif ] = useMutation(CreateNotif)
    const [ follow ] = useMutation(FollowUser)
    const [ unfollow ] = useMutation(UnfollowUser)
    const [ block ] = useMutation(CreateBlock)
    const [ unblock ] = useMutation(DeleteBlock)


    let alreadyConnected: boolean = false;
    let alreadyRequested: boolean = false;
    let giveConnectionStatus: boolean = false;
    let alreadyFollowed: boolean = false;
    let alreadyBlocked: boolean = false;

    const sendNotifHandler = (fromUserId: string, toUserId: string, message: string) => {
        if(fromUserId !== toUserId){
            createNotif({
                variables:{
                    fromUserId: fromUserId,
                    toUserId: toUserId,
                    message: message,
                }
            }).then((e)=>{
                console.log(e)
            }).catch((e)=>{
                alert(e)
            })
        }
    }

    const acceptConnectionHandler = (user1ID: string, fromUserId: string, toUserId: string) => {
        addConnection({
            variables: {
                user1ID: user1ID,
                user2ID: UserContext.user.id,
            }
        }).then((e) => {
            deleteConnectionReq({
                variables: {
                    fromUserId: fromUserId,
                    toUserId: toUserId,
                }
            }).then((e) => {
                UserContext.refetchUser()
                refetchUser().then((e: any) => {
                    alert("Connection Accepted")
                })
            }).catch((e) => {
                alert(e)
            })
        }).catch((e) => {
            alert(e)
        })
    }

    const ignoreConnectionHandler = (fromUserId: string, toUserId: string) => {
        deleteConnectionReq({
            variables: {
                fromUserId: fromUserId,
                toUserId: toUserId,
            }
        }).then((e) => {
            UserContext.refetchUser()
            refetchUser().then(() => {
                alert("Connection Declined!")
            })
        }).catch((e) => {
            alert(e)
        })
    }

    const requestConnectionHandler = (fromUserId: string, toUserId: string) => {
        addConnectReq({
            variables: {
                fromUserId: fromUserId,
                toUserId: toUserId,
                message: "wants to connect",
            }
        }).then((e) => {
            UserContext.refetchUser()
            refetchUser().then((e: any) => {
                alert("Request Connect Success!")
            })
        }).catch((e) => {
            alert(e)
        })
    }

    const followHandler = () => {
        follow({
            variables: {
                id1: UserContext.user.id,
                id2: user.id,
            }
        }).then(() => {
            UserContext.refetchUser().then((e: any) => {}).catch((e: any) => {
                alert(e)
            })
            refetchUser().then((e: any) => {
                alert("Follow Success!")
                sendNotifHandler(
                    UserContext.user.id,
                    user.id,
                    "Started Following You"
                )
            }).catch((e: any) => {
                alert(e)
            })
        }).catch((e) => {
            alert(e)
        })
    }

    const unfollowHandler = () => {
        unfollow({
            variables: {
                id1: UserContext.user.id,
                id2: user.id,
            }
        }).then(() => {
            UserContext.refetchUser().then((e: any) => {}).catch((e: any) => {
                alert(e)
            })
            refetchUser().then((e: any) => {
                alert("Unfollow Success!")
                sendNotifHandler(
                    UserContext.user.id,
                    user.id,
                    "Unfollowed You"
                )
            }).catch((e: any) => {
                alert(e)
            })
        }).catch((e) => {
            alert(e)
        })
    }

    const blockHandler = () => {
        block({
            variables: {
                userId: UserContext.user.id,
                blockId: user.id,
            }
        }).then((e) => {
            UserContext.refetchUser()
            refetchUser().then((e: any) => {
                alert("Block Success!")
            })
        }).catch((e) => {
            alert(e)
        })
    }

    const unblockHandler = () => {
        unblock({
            variables: {
                userId: UserContext.user.id,
                blockId: user.id,
            }
        }).then((e) => {
            UserContext.refetchUser()
            refetchUser().then((e: any) => {
                alert("Unblock Success!")
            })
        }).catch((e) => {
            alert(e)
        })
    }

    const goProf = () => {
        console.log(`${user.id}`)
        navigate(`/profile/${user.id}`)
    }

    UserContext.user.Connections.map((dataConnect: any)=>{
        if(dataConnect.user1.id === user.id || dataConnect.user2.id === user.id){
                alreadyConnected = true
            }
        }
    )

    user.ConnectRequests.map((connectRequestData: any) => {
        if (connectRequestData.fromUser.id === UserContext.user.id) {
                alreadyRequested = true
            }
        }
    )

    UserContext.user.ConnectRequests.map((connectRequestData: any) => {
        if (connectRequestData.fromUser.id === user.id) {
                giveConnectionStatus = true
            }
        }   
    )

    user.Follows.map((followData: any) => {
        if (followData.followId == user.id) {
            alreadyFollowed = true
            // console.log("wow")
        }
    })

    UserContext.user.Blocks.map((blockData: any) => {
        if (blockData.blockId === user.id) {
            alreadyBlocked = true;
        }
    })

    return (
        <div className='YMK-card'>
            <div className='flex-row card-suggest'>
                <img className='YMK-img' src={user.ProfilePicture} alt="" />
                <div className='mb-20 ml-20 flex-row'>
                    <p className='text-black text-l mt-20'>{user.name}</p>
                    <button onClick={goProf} className='transparent-btn mt-20'>
                            <FiArrowUpRight onClick={()=>goProf} className='icon-sug ml-10'></FiArrowUpRight>
                    </button>
                </div>
                <div className='ml-10 flex-row'>  
                    <>
                        {!alreadyConnected && !alreadyRequested && !giveConnectionStatus && (
                            <div>
                                <button onClick={() => requestConnectionHandler(UserContext.user.id, user.id)} className='blue-button-xs'>Request</button>
                            </div>
                        )}
                        {alreadyConnected && (
                            <div>
                                <button className='blue-button-xs' disabled>Connected</button>
                            </div>
                        )}
                        {alreadyRequested && (
                            <div>
                                <button className='grey-button-xs' >Requested</button>
                            </div>
                        )}
                        {giveConnectionStatus && (
                            <>
                                <div>
                                    <button onClick={() => acceptConnectionHandler(user.id, user.id, UserContext.user.id)} className='blue-button-xs ml-10'>Accept</button>
                                </div>
                                <div>
                                    <button onClick={() => ignoreConnectionHandler(user.id, UserContext.user.id)} className='red-button-xs ml-10'>Ignore</button>
                                </div>
                            </>
                        )}
                    </>
                </div>
            </div>
        </div>
    )
}

export default UserSearchComp