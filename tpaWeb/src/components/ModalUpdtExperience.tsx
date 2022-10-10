import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { UserAuth } from '../contexts/authContext'
import { UpdtExp } from '../queries/queryUser'

export default function ModalUpdtExperience(parameter: any){
    const userContext = UserAuth()
    const [ update ] = useMutation(UpdtExp)
    const [ activeJob, setActiveJob ] = useState(false)
    const [ title, setTitle ] = useState("")
    const [ employmentType, setEmploymentType ] = useState("")
    const [ companyName, setCompanyName ] = useState("")
    const [ location, setLocation ] = useState("")
    const [ active, setActive ] = useState(false)
    const [ start, setStart ] = useState("")
    const [ end, setEnd ] = useState("")
    const [ industry, setIndustry ] = useState("")
    const [ desc, setDesc ] = useState("")

    const handleUpdateExp = () => {
        update({
            variables:{
                id: parameter.experience.ID,
                UserID: userContext.user.id,
                Title: title,
                EmploymentType: employmentType,
                CompanyName: companyName,
                Location: location,
                Active: active,
                StartYear: start,
                EndYear: end,
                Industry: industry,
                Description: desc 
            }
        }).then(()=>{
            userContext.refetchUser()
            parameter.toggle()
        })
    }


    return (
        <div className='modal center-all'>
            <div className='form'>
                <div className='w-full flex-row mb-min10'>
                    <p className='text-black text-l bold'>Update experience</p>
                </div>

                <div className='w-full flex-col'>
                    <p className='text-black text-s'>Title</p>
                    <input onChange={(e)=>setTitle(e.target.value)} type="text" className='text-input white-bg' placeholder='Ex: Front-End Develop'/>
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
                    <p className='text-black text-s'>Company Name</p>
                    <input onChange={(e)=>setCompanyName(e.target.value)} type="text" className='text-input white-bg' placeholder="Ex: Bina Nusantara University"/>
                </div>

                <div className='w-full flex-col'>
                    <p className='text-black text-s'>Location</p>
                    <input onChange={(e)=>setLocation(e.target.value)} type="text" className='text-input white-bg' placeholder="Ex: Jakarta, Indonesia"/>
                </div>

                <div className='w-full flex-row'>
                    <p className='text-black text-s'>This is my current active job</p>
                    <input onChange={()=>setActive(!active)} id='Active' type="checkbox" className='text-input white-bg cb'/>
                </div>

                <div className='w-full flex-row space-between mb-20'>
                    <p className='text-black text-s'>Start Year</p>
                    <input onChange={(e)=>setStart(e.target.value)} type="number" className='white-bg text-black text-s border-1'defaultValue={2020}/>
                </div>
                {
                    activeJob===true && (
                        <div className='w-full flex-row space-between mb-20'>
                            <p className='text-black text-s'>End Year</p>
                            <input disabled={activeJob} onChange={(e)=>setEnd(e.target.defaultValue)} type="text" id='EndYear'className='white-bg text-black text-s border-1 pr-20 float-r pr-20 inputt' defaultValue="Present"/>
                        </div>
                    )
                }
                {
                    activeJob!==true && (
                        <div className='w-full flex-row space-between mb-20'>
                            <p className='text-black text-s'>End Year</p>
                            <input onChange={(e)=>setEnd(e.target.value)} type="number" className='white-bg text-black text-s border-1'defaultValue={2022}/>
                        </div>
                    )
                }

                <div className='w-full flex-col'>
                    <p className='text-black text-s'>Industry</p>
                    <input onChange={(e)=>setIndustry(e.target.value)} type="text" className='text-input white-bg' placeholder="Ex: Fintech"/>
                </div>

                <div className='w-full flex-col'>
                    <p className='text-black text-s'>Profile Headline</p>
                    <input onChange={(e)=>setDesc(e.target.value)} type="text" className='text-input white-bg' placeholder="Ex: Best Employee"/>
                </div>

                <div className='w-full flex-row space-evenly'>
                    <button onClick={handleUpdateExp} className='blue-button-s text-white'>Save</button>
                    <button onClick={parameter.toggle} className='red-button-s text-white'>Cancel</button>
                </div>
            </div>
        </div>
    )
}