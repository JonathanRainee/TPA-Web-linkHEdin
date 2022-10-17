import { useMutation } from '@apollo/client'
import React from 'react'
import { FiArrowUpRight } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../contexts/authContext'
import { CreateConnect, CreateNotif, DeleteConnectReq } from '../queries/queryUser'

const ConnectReqComp = ({ connection }: any) => {

    const UserContext = UserAuth()
    let userTrue = true
    const [ createNotif ] = useMutation(CreateNotif)
    const [ addConnection ] = useMutation(CreateConnect)
    const [ deleteConnectionReq ] = useMutation(DeleteConnectReq)
    const navigate = useNavigate();

    const goProf = () => {
        console.log(connection)
        // console.log(`${userSuggestionData.id}`)
        navigate(`/profile/${connection.fromUser.id}`)
    }

    // console.log(connection)

    if (connection.fromUser.id === UserContext.user.id) {
        userTrue = false;
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
                alert("Success")
            }).catch((e) => {
                alert("gblh")
            })
        }).catch((e) => {
            alert("gblh2")
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
            alert("Connection declned")
        }).catch((e) => {
            alert(e)
        })
    }

    return (
        <div className='YMK-card'>
            {userTrue ? (
                <div className='flex-row card-suggest'>
                    <img className='YMK2-img' src={connection.fromUser.ProfilePicture} alt="" />
                    <div className='mb-10 ml-20 pt-10'>
                        <div className='flex-row'>
                            <p className='text-black text-l'>{connection.fromUser.name}</p>
                            <button className='transparent-btn'>
                                <FiArrowUpRight onClick={goProf} className='icon-sug ml-10'></FiArrowUpRight>
                            </button>
                            <div>
                                <button onClick={() => acceptConnectionHandler(connection.fromUser.id, connection.fromUser.id, UserContext.user.id)} className='blue-button-xs ml-10'>Accept</button>
                            </div>
                            <div>
                                <button onClick={() => ignoreConnectionHandler(connection.fromUser.id, UserContext.user.id)} className='red-button-xs ml-10'>Ignore</button>
                            </div>
                        </div>
                    </div>
                </div>) : (
                    <p>asdf</p>
                )
            }
        </div>
    )
}

export default ConnectReqComp

// onClick={() => acceptConnectionHandler(currentUser.id, currentUser.id, UserContext.user.id)}
// onClick={() => ignoreConnectionHandler(currentUser.id, UserContext.user.id)}