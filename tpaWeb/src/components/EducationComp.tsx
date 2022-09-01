import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import {AiFillEdit} from 'react-icons/ai'
import {BiTrash} from 'react-icons/bi'
import { DelEdu } from '../queries/queryUser'
import '../styles/logRes.scss'
import ModalUpdtEducation from './ModalUpdtEducation'

export default function EducationComp(parameter:any) {
    const [delEdu] = useMutation(DelEdu)
    const [ updtEduToggle, setUpdtEduToggle ] = useState(false)

    const toggleUpdt = () => {
        setUpdtEduToggle(!updtEduToggle)
    }

    const deleteEdu = () => {
        delEdu({
            variables:{
                id: parameter.education.ID
            }
        }).then(()=>{
            parameter.refetch()
        })
    }

    const test = () =>{
        console.log(parameter.education.ID)
    }

    return (
        <div className='eduOrExp'>
            {
                updtEduToggle === true && (
                    <ModalUpdtEducation toggle = {toggleUpdt} refetch = {parameter.refetch} education= {parameter.education}></ModalUpdtEducation>
                )
            }
            <div className='w-full flex-col ml-10'>
                <p className='text-black text-l mb-min10'>{parameter.education.School}</p>
                <p className='text-black text-s mb-min10'>{parameter.education.Degree}, {parameter.education.FieldOfStudy}</p>
                <p className='text-black text-s'>{parameter.education.StartDate} - {parameter.education.EndDate}</p>
            </div>
            {parameter.myProf && (
                <div className='flex-row mr-10 mt-20'>
                    <AiFillEdit onClick={toggleUpdt} className='icon  mr-20'></AiFillEdit>
                    <BiTrash onClick={deleteEdu} className='icon'></BiTrash>
                </div>
            )}
        </div>
    )
}