import { useMutation } from '@apollo/client'
import React, {useState} from 'react'
import { UserAuth } from '../contexts/authContext'
import { CreateJob } from '../queries/queryUser'

export default function ModalJob(parameter: any){

    const UserContext = UserAuth()
    const [ createJob ] = useMutation(CreateJob)
    const [ title, setTitle ] = useState("")
    const [ companyName, setCompanyName ] = useState("")
    const [ workplace, setWorkplace ] = useState("")
    const [ city, setCity ] = useState("")
    const [ country, setCountry ] = useState("")
    const [ employmentType, setEmploymentType ] =  useState("")
    const [ desc, setDesc ] = useState("")

    const createJobHandle = () => {
        createJob({
            variables:{
                title: title,
                companyName: companyName,
                workplace: workplace,
                city: city,
                country: country,
                employmentType: employmentType,
                description: desc
            }
        }).then((e) => {
            parameter.refetchJob().then((e: any) => {
                parameter.toggle()
            })
        }).catch((err) => {
            alert(err)
        })
    }

    return(
        <div className='modal center-all'>
        <div className='form'>
        <div className='w-full flex-row mb-min10 mt-min10'>
            <p className='text-black text-l bold'>Create a job</p>
        </div>

        <div className='w-full flex-col  mb-min10'>
            <p className='text-black text-s'>Title</p>
            <input onChange={(e)=>setTitle(e.target.value)} type="text" className='text-input white-bg' placeholder='Ex: Software engineer'/>
        </div>
        
        <div className='w-full flex-col  mb-min10'>
            <p className='text-black text-s'>Company Name</p>
            <input onChange = {(e)=>setCompanyName(e.target.value)} type="text" className='text-input white-bg' placeholder="Ex: Tohopedia"/>
        </div>

        <div className='w-full flex-col  mb-min10'>
            <p className='text-black text-s'>Workpalce</p>
            <input onChange = {(e)=>setWorkplace(e.target.value)} type="text" className='text-input white-bg' placeholder="Ex: Hehehe"/>
        </div>

        <div className='w-full flex-col  mb-min10'>
            <p className='text-black text-s'>City</p>
            <input id='Start' onChange = {(e)=>setCity(e.target.value)} type="text" className='text-input white-bg' placeholder='Ex: Jakardahh'/>
        </div>

        <div className='w-full flex-col  mb-min10'>
            <p className='text-black text-s'>Country</p>
            <input id='End' onChange = {(e)=>setCountry(e.target.value)} type="text" className='text-input white-bg' placeholder='Ex: Jakardahh'/>
        </div>

        <div className='w-full flex-col'>
            <p className='text-black text-s'>Employment Type</p>
            <select onChange={(e)=>setEmploymentType(e.target.value)} className='text-input white-bg'>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Freelance">Freelance</option>
            </select>
        </div>

        <div className='w-full flex-col'>
            <p className='text-black text-s'>Description</p>
            <input onChange = {(e)=>{setDesc(e.target.value)}} id='Description' type="text" className='text-input white-bg' placeholder="Ex: Gaji gede"/>
        </div>

        <div className='w-full flex-row space-evenly'>
            <button onClick={createJobHandle} className='blue-button-s text-white'>Create</button>
            <button onClick={parameter.toggle} className='red-button-s text-white'>Cancel</button>
        </div>
        </div>
    </div>
    )
}