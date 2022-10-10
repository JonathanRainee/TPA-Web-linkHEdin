import React, {useEffect, useState} from 'react'
import ModalJob from '../components/ModalJob'
import Navbar from '../components/Navbar'
import { AiOutlinePlus } from "react-icons/ai";
import { useQuery } from '@apollo/client';
import { QueryJob } from '../queries/queryUser';
import JobComp from '../components/JobComp';
import FooterComp from '../components/FooterComp';

export default function JobPage(){

    const [ jobToggle, setJobToggle ] = useState(false)
    const { loading: loadingJobs, data: dataJobs, error: errorJobs, refetch: refetchJobs } = useQuery(QueryJob)

    useState(() => {
        refetchJobs()
    },)

    const toggleJob = () => {
        setJobToggle(!jobToggle)
    }
    

    if(loadingJobs){
        return(
            <div>loading...</div>
        )
    }

    return(
        <div className="flex-row flex">
            <div className='linkedin-bg fullscreen center-col'>
                {jobToggle === true && (
                    <ModalJob toggle={toggleJob} refetchJob={refetchJobs}></ModalJob>
                )}
                <Navbar></Navbar>
                <div className='all-center flex-col '>
                    <div className='all-center'>
                        <button className='add-button2' onClick={toggleJob}>
                            <AiOutlinePlus className='plus-logo2 mr-10'></AiOutlinePlus>
                            Create Job
                        </button>
                    </div>

                    <div className='box'>
                        <p className='text-black text-l bold'>Available Jobs</p>
                        {
                            dataJobs.length == 0 ? (
                                <p>empty</p>
                            ) : (
                                // <p>lol</p>
                                dataJobs.Jobs.map((job: any) => {
                                    return(
                                        <JobComp  key = {job.id} jobData={job}></JobComp>
                                    )
                                })
                            )
                        }
                    </div>
                </div>
            </div>
            <FooterComp></FooterComp>
        </div>

    )

}