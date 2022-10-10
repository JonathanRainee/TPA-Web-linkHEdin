import React from 'react'
import { useMutation, useQuery } from "@apollo/client";
import { GetUsrByID } from '../queries/queryUser';


const ModalHover = ({ userId }: any) => {

    const{ loading, error, data } = useQuery(GetUsrByID, {variables: {UserID: userId}, errorPolicy: "all"})


    if(loading){
        return(
            <div>loading...</div>
        )
    }else{
        return (
            <div className="modal-mention-container">
                <div className="modal-mention-content-container">
                    <div className="modal-mention-left-content">
                        <img src={data.getUser.ProfilePicture}></img>
                    </div>
                <div className="modal-mention-right-content">
                    <p className="modal-mention-username">{data.getUser.name}</p>
                </div>
            </div>
        </div>
        )

    }
}

export default ModalHover