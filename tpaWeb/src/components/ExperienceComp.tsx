import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { BiTrash } from 'react-icons/bi'
import { UserAuth } from '../contexts/authContext'
import { DelExp } from '../queries/queryUser'
import ModalUpdtExperience from './ModalUpdtExperience'

export default function ExperienceComp(parameter: any){
    const userContext = UserAuth()
    const [ del ] = useMutation(DelExp)
    const [ updtExpToggle, setUpdtExpToggle ] = useState(false)

    const toggleUpdt = () =>{
        setUpdtExpToggle(!updtExpToggle)
    }

    const delExp = () => {
        del({
            variables:{
                id:parameter.experience.ID
            }
        }).then(()=>{
            userContext.refetchUser()
        })
        console.log(parameter.experience.ID)
    }

    const test = () =>{
        console.log(parameter.experience.ID)
    }

    return(
        <div className='eduOrExp'>
            {
                updtExpToggle === true && (
                    <ModalUpdtExperience toggle = {toggleUpdt} refetch = {parameter.refetch} experience={parameter.experience}></ModalUpdtExperience>
                )
            }
            <div className='w-full flex-col ml-10'>
                <p className='text-black text-l  mb-min10'>{parameter.experience.Title}</p>
                <p className='text-black text-s  mb-min10'>{parameter.experience.CompanyName} {parameter.experience.EmploymentType}</p>
                <p className='text-black text-s  mb-min10'>{parameter.experience.StartYear} - {parameter.experience.EndYear}</p>
                <p className='text-black text-s '>{parameter.experience.Location}</p>
            </div>
            {parameter.myProf && (
                <div className='flex-row  mr-10 mt-20'>
                    <AiFillEdit onClick={toggleUpdt} className='icon mr-20'></AiFillEdit>
                    <BiTrash onClick={delExp} className='icon'></BiTrash>
                </div>
            )}
        </div>
    )
}