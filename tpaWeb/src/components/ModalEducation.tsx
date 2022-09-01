import React, { useState } from 'react'
import { UserAuth } from '../contexts/authContext'
import { useMutation } from '@apollo/client'
import { FaSchool } from 'react-icons/fa'
import { CreateEdu } from '../queries/queryUser'
import { BsEmojiDizzy } from 'react-icons/bs'


export default function ModalEducation(parameter: any) {
    const userContext = UserAuth()
    const [ createEduc ] = useMutation(CreateEdu)
    const [ school, setSchool ] = useState("")
    const [ degree, setDegree ] = useState("")
    const [ studyField, setStudyField ] = useState("")
    const [ start, setStart ] = useState("")
    const [ end, setEnd ] = useState("")
    const [ grade, setGrade ] =  useState(0.0)
    const [ activites, setActivities ] = useState("")
    const [ desc, setDesc ] = useState("")

    function test(){
        console.log(userContext.user.id, school, degree, studyField, start, end, grade, activites, desc)
    }

    const handleCreateEducation = () =>{
        createEduc({
            variables:{
                UserID: userContext.user.id,
                School: school,
                Degree: degree,
                FieldOfStudy: studyField,
                StartDate: start,
                EndDate: end,
                Grade: grade,
                Activities: activites,
                Description: desc
            }}).then(()=>{
                parameter.refetch()
                parameter.toggle()
            })
    }


    

    return (
        <div className='modal center-all'>
            <div className='form'>
            <div className='w-full flex-row mb-min10 mt-min10'>
                <p className='text-black text-l bold'>Add education</p>
            </div>

            <div className='w-full flex-col  mb-min10'>
                <p className='text-black text-s'>School</p>
                <input onChange={(e)=>setSchool(e.target.value)} type="text" className='text-input white-bg' placeholder='Ex: Bina Nusantara University'/>
            </div>
            
            <div className='w-full flex-col  mb-min10'>
                <p className='text-black text-s'>Degree</p>
                <input onChange = {(e)=>setDegree(e.target.value)} type="text" className='text-input white-bg' placeholder="Ex: Bachelors"/>
            </div>

            <div className='w-full flex-col  mb-min10'>
                <p className='text-black text-s'>Field of Study</p>
                <input onChange = {(e)=>setStudyField(e.target.value)} type="text" className='text-input white-bg' placeholder="Ex: Mobile Application and Technology"/>
            </div>

            <div className='w-full flex-row space-between  mb-10'>
                <p className='text-black text-s'>Start Date</p>
                <input id='Start' onChange = {(e)=>setStart(e.target.value)} type="date" className='white-bg text-black text-s'/>
            </div>

            <div className='w-full flex-row space-between mb-min10 '>
                <p className='text-black text-s'>End Date</p>
                <input id='End' onChange = {(e)=>setEnd(e.target.value)} type="date" className='white-bg text-black text-s'/>
            </div>

            <div className='w-full flex-col mb-min10'>
                <p className='text-black text-s'>Grade</p>
                <input id='Grade' onChange = {(e)=>setGrade(parseFloat(e.target.value))} type="text" className='text-input white-bg' placeholder="Ex: 4.00"/>
            </div>

            <div className='w-full flex-col mb-min10'>
                <p className='text-black text-s'>Activities</p>
                <input onChange = {(e)=>setActivities(e.target.value)} type="text" className='text-input white-bg' placeholder="Ex: Voleyball, English Club"/>
            </div>

            <div className='w-full flex-col'>
                <p className='text-black text-s'>Description</p>
                <input onChange = {(e)=>{setDesc(e.target.value)}} id='Description' type="text" className='text-input white-bg' placeholder="Ex: Team captain"/>
            </div>

            <div className='w-full flex-row space-evenly'>
                <button onClick={handleCreateEducation} className='blue-button-s text-white'>Save</button>
                <button onClick={parameter.toggle} className='red-button-s text-white'>Cancel</button>
            </div>
            </div>
        </div>
    )

}