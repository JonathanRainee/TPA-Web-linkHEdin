import React, { useState } from 'react'
import { UpdateName } from '../queries/queryUser'
import { RefetchContext } from '../contexts/refetch'
import { UserAuth } from '../contexts/authContext'
import { useMutation } from '@apollo/client'

export default function ModalUpdtUsername (parameter: any){
    const user = UserAuth().user
    const userContext = UserAuth()
    const [ update ] = useMutation(UpdateName)
    const [ newUsername, setNewUsername ] = useState("")
    const refetchContext = RefetchContext()

    const handleUpdate = () => {
        update({
            variables:{
                id: user.id,
                newUsername: newUsername
            }
        }).then(()=>{
            userContext.refetchUser()
            parameter.toggle()
        }).catch((err)=>{
            console.log(err)
        })
    }

    return(
        <div className='modal center-all'>
            <div className='form'>
                <div className='w-full flex-row mb-20'>
                    <p className='text-black text-l bold'>Update User</p>
                </div>

                <div className='w-full flex-col'>
                    <p className='text-black text-s'>Username</p>
                    <input onChange={(e)=>setNewUsername(e.target.value)} type="text" className='text-input white-bg' placeholder='New Username' defaultValue={user.name}/>
                </div>

                <div className='w-full flex-row space-evenly'>
                    <button onClick={handleUpdate} className='blue-button-s text-white'>Save</button>
                    <button onClick={parameter.toggle} className='red-button-s text-white'>Cancel</button>
                </div>

            </div>
        </div>
    )

}