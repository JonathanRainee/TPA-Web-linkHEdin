import React from 'react'


const JobComp = ({ jobData } : any) => {
    return(
        <div className="eduOrExp">
        <div className='w-full flex-col ml-10'>
            <p className='text-black text-l mb-min10 mt-min10'>{jobData.title} - {jobData.employmentType}</p>
            <p className='text-black text-s mb-min10'>{jobData.companyName}</p>
            <p className='text-black text-s mb-20'>{jobData.city} , {jobData.country} , ({jobData.workplace}) </p>
        </div>
    </div>
    )
}

export default JobComp