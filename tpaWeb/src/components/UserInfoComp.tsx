import { useMutation } from '@apollo/client'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import React, {useState} from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { storage } from '../../firebase.config'
import { UserAuth } from '../contexts/authContext'
import { refectUserType } from '../model/formModel'
import { UserType } from '../model/model'
import "../styles/profileStyle.scss"
import { CreateBlock, CreateConnect, CreateConnectReq, CreateNotif, DeleteBlock, DeleteConnectReq, FollowUser, UnfollowUser, UploadBgPic, UploadProfilePic } from '../queries/queryUser'
import ModalUpdtUsername from './ModalUpdtUsername'

const UserInfoComp = ({ currentUser, refetchCurrentUser, edit} : any) => {
    
    const UserContext = UserAuth()
    const [modalUser, setModalUser] = useState(false)
    const [modalMore, setModalMore] = useState(false)
    const [modalConnect, setModalConnect] = useState(false)

    const [ uploadProfPic ] = useMutation(UploadProfilePic)
    const [ uploadBgPic ] = useMutation(UploadBgPic)
    const [ addConnection ] = useMutation(CreateConnect)
    const [ addConnectReq ] = useMutation(CreateConnectReq)
    const [ deleteConnectionReq ] = useMutation(DeleteConnectReq)
    const [ follow ] = useMutation(FollowUser)
    const [ unfollow ] = useMutation(UnfollowUser)
    const [ block ] = useMutation(CreateBlock)
    const [ unblock ] = useMutation(DeleteBlock)
    const [ createNotif ] = useMutation(CreateNotif)


    let alreadyConnected: boolean = false
    let alreadyRequested: boolean = false
    let giveConnectionStatus: boolean = false
    let alreadyFollowed: boolean = false
    let alreadyBlocked: boolean = false

    const handleProfPicChange = async (e:any) => {
        const newPP = e.target.files[0]
        if(newPP === undefined){
            alert("Please input a valid extension file")
        }else{
            const imgRef = ref(storage, 'ProfilePic/'+ newPP.name)
            uploadBytes(imgRef, newPP).then(() => {
                getDownloadURL(imgRef).then((data) => {
                    uploadProfPic({
                        variables:{
                            id: UserContext.user.id,
                            newProfilePicture: data
                        }}
                        ).then(() => {
                            refetchCurrentUser()
                            UserContext.refetchUser()
                    })
                })
            })
        }
        
    }

    const handleBgChange = async (e:any) => {
        const newBGP = e.target.files[0]
        if(newBGP === undefined){
            alert("Please input a valid extension file")
        }else{
            const imgRef = ref(storage, 'BgPic/'+ newBGP.name)
            uploadBytes(imgRef, newBGP).then(() => {
                getDownloadURL(imgRef).then((data) => {
                    uploadBgPic({
                        variables:{
                            id: UserContext.user.id,
                            newBanner: data
                    }}).then(() => {
                        refetchCurrentUser()
                        UserContext.refetchUser()
                    })
                })
            })
        }
    }

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
                refetchCurrentUser().then((e: any) => {
                    alert("Connection Accepted")
                    sendNotifHandler(
                        UserContext.user.id,
                        currentUser.id,
                        "Accepted your connect request",
                    )
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
            refetchCurrentUser().then(() => {
                alert("Connection Declined!")
                sendNotifHandler(
                    UserContext.user.id,
                    currentUser.id,
                    "Declined your connect request",
                )
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
            refetchCurrentUser().then((e: any) => {
                alert("Request Connect Success!")
                sendNotifHandler(
                    UserContext.user.id,
                    currentUser.id,
                    "Wants to connect"
                )
            })
        }).catch((e) => {
            alert(e)
        })
    }

    const followHandler = () => {
        follow({
            variables: {
                id1: UserContext.user.id,
                id2: currentUser.id,
            }
        }).then(() => {
            UserContext.refetchUser().then((e: any) => {}).catch((e: any) => {
                alert(e)
            })
            refetchCurrentUser().then((e: any) => {
                alert("Follow Success!")
                sendNotifHandler(
                    UserContext.user.id,
                    currentUser.id,
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
                id2: currentUser.id,
            }
        }).then(() => {
            UserContext.refetchUser().then((e: any) => {}).catch((e: any) => {
                alert(e)
            })
            refetchCurrentUser().then((e: any) => {
                alert("Unfollow Success!")
                sendNotifHandler(
                    UserContext.user.id,
                    currentUser.id,
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
                blockId: currentUser.id,
            }
        }).then((e) => {
            UserContext.refetchUser()
            refetchCurrentUser().then((e: any) => {
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
                blockId: currentUser.id,
            }
        }).then((e) => {
            UserContext.refetchUser()
            refetchCurrentUser().then((e: any) => {
                alert("Unblock Success!")
            })
        }).catch((e) => {
            alert(e)
        })
    }
    // console.log(currentUser)

    UserContext.user.Connections.map((dataConnect: any)=>{
        if(dataConnect.user1.id === currentUser.id || dataConnect.user2.id === currentUser.id){
                alreadyConnected = true
            }
        }
    )
    // console.log(UserContext)
    currentUser.ConnectRequests.map((connectRequestData: any) => {
        if (connectRequestData.fromUser.id === UserContext.user.id) {
                alreadyRequested = true
            }
        }
    )
    
    UserContext.user.ConnectRequests.map((connectRequestData: any) => {
        if (connectRequestData.fromUser.id === UserContext.user.id) {
                giveConnectionStatus = true
            }
        }   
    )

    UserContext.user.Follows.map((followData: any) => {
        if (followData.followId == currentUser.id) {
            alreadyFollowed = true
            console.log("wow")
        }
    })

    UserContext.user.Blocks.map((blockData: any) => {
        if (blockData.blockId === currentUser.id) {
            alreadyBlocked = true
        }
    })

    const handleMoreModal = () => {
        if (modalMore) setModalMore(false)
        else setModalMore(true)
    }
    
    const toggleUsrname = () => {
        setModalUser(!modalUser)
    }

    return (
        <div className='main-profile white-bg border-border relative'>
                <div className="w-120 flex-col white-bg" style={{backgroundImage: "url("+currentUser.Backgroundpicture+")", backgroundSize:"100% 100%",  backgroundRepeat:"no-repeat", borderRadius:"15px 15px 0 0"}}>
                    {/* <img src=userContext.user.Backgroundpicture alt="" /> */}
                    {modalUser === true && (
                        <ModalUpdtUsername toggle={toggleUsrname}></ModalUpdtUsername>
                    )}
                    <div className="w-120 flex-row">
                            {(
                                edit == true && (
                                    <label htmlFor="bgpic" className="w-fit" onChange={(e)=>{handleBgChange(e)}}>
                                        <div className="picture-btn cover pr-10">
                                            <AiFillEdit className="logo"></AiFillEdit>
                                        </div>
                                    </label>
                                    )
                            )}
                    </div>
                    <div className="w-full flex-row mt-60">
                        <label htmlFor="file" onChange={(e)=>{handleProfPicChange(e)}}>
                            <img className='profile-picture m-20 white-bg ml-20' src={currentUser.ProfilePicture} alt="" />
                            {/* <img className='profile-picture m-20 white-bg ml-20' src={userContext.user.ProfilePicture} alt="" /> */}
                        </label>
                    </div>
                </div>
                {/* <img className='profile-picture' src={userContext.user.ProfilePicture} alt="" /> */}
                <div className="ml-20 flex-row">
                    <p className='text-black mv-30 mb-min10 text-l ml-20'>{currentUser.name}</p>
                    {
                        edit == true && (
                            <AiFillEdit onClick={toggleUsrname}  className='icon mt-20 ml-10'></AiFillEdit>
                        )}
                </div>
                <div className="ml-20 flex-col">
                    <div className='ml-20 flex-row'>
                        {
                            edit ? null : (
                                <div className='w-full flex-row'>
                                    {!alreadyConnected && !alreadyRequested && !giveConnectionStatus && (
                                        <div>
                                            <button onClick={() => requestConnectionHandler(UserContext.user.id, currentUser.id)} className='blue-button-xs'>Request</button>
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
                                                <button onClick={() => acceptConnectionHandler(currentUser.id, currentUser.id, UserContext.user.id)} className='blue-button-xs ml-10'>Accept</button>
                                            </div>
                                            <div>
                                                <button onClick={() => ignoreConnectionHandler(currentUser.id, UserContext.user.id)} className='red-button-xs ml-10'>Ignore</button>
                                            </div>
                                        </>
                                    )}
                                    <div>
                                        {!alreadyFollowed && (
                                            <div>
                                                <button onClick={() => followHandler()} className='blue-button-xs ml-10'>Follow</button>
                                            </div>
                                        )}
                                        {alreadyFollowed && (
                                            <div>
                                                <button onClick={() => unfollowHandler()} className='red-button-xs ml-10'>Unfollow</button>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        {!alreadyBlocked && (
                                            <div>
                                                <button onClick={() => blockHandler()} className='red-button-xs ml-10'>Block</button>
                                            </div>
                                        )}
                                        {alreadyBlocked && (
                                            <div>
                                                <button onClick={() => unblockHandler()} className='blue-button-xs ml-10'>Unblock</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className=' flex-row'>
                        <p className='text-black mb-min10 text-s ml-20'>{currentUser.Connections.length} Connections,</p>
                        {/* <p className='text-black mb-min10 text-s ml-10'>{currentUser.Follows.length} Followers,</p> */}
                        <p className='text-black mb-min10 text-s ml-10'>{currentUser.Visits.length} Visit</p>
                    </div>

                </div>
                {
                    
                    currentUser.Experiences.map((exp:any) => {
                        if(exp.Active){
                            return(
                                <p key={exp.ID} className='text-black mt-min10 text-m ml-40'>{exp.Description} at {exp.CompanyName}</p>
                            )
                        }
                    })
                }
                {/* {(
                    myProf != true && !User.connect_request.includes(userContext.user.id) && !User.connected_user.includes(userContext.user.id)) && (
                        <div>
                            <button onClick={()=>{reqConnect({variables:{id:userContext.user.id, recipient:User.id}}).then(()=>{user.refetch()})}}> Request Connect </button>
                        </div>
                )} */}
                {/* {(
                    myProf != true && User.connect_request.includes(userContext.user.id)) && (
                        <div>
                            <button className=""> Requested </button>
                        </div>
                )}
                {(
                    myProf != true && User.connected_user.includes(userContext.user.id)) && (
                        <div>
                            <button className="white-button-s pt-min10"> Connected </button>
                        </div>
                )} */}
                <input disabled={!edit} className="display-none" type="file" name='file' id='file' onChange={(e)=>{handleProfPicChange(e)}}/>
                <input disabled={!edit} className="display-none" type="file" name='bgpic' id='bgpic' onChange={(e)=>{handleBgChange(e)}}/>
            </div>
    )
}

export default UserInfoComp