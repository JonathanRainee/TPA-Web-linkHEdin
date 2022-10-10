import { useQuery } from '@apollo/client'
import React from 'react'
import { GetUsrByID } from '../queries/queryUser'

const MentionModalComp = ({ userId }: any) => {

    const { loading, error, data } = useQuery(GetUsrByID, {
        variables: {
            UserID: userId
        }
    })

    if(loading){
        return(
            <div>
                <p>loading...</p>
            </div>
        )
    }else{
        console.log(data)
        return (
            <div className="modal-mention-container">
                <div className="modal-mention-content-container">
                    <div className="modal-mention-left-content">
                        <img src={data.getUser.ProfilePicture}></img>
                    </div>
                    <div className="modal-mention-right-content">
                        <p className="modal-mention-username">
                            {data.getUser.name}
                        </p>
                    </div>
                </div>
            </div>
        )
    }

}

export default MentionModalComp