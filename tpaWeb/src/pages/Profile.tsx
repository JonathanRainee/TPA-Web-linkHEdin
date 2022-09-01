import { useMutation, useQuery } from "@apollo/client";
import { setDefaultResultOrder } from "dns";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UploadProfilePicture } from "../util/ProfilepicUtil";
import { UserAuth } from "../contexts/authContext";
import "../styles/profileStyle.scss";
import { FindUser, GetUsrByID, GetUsrEducation, GetUsrExperiences, RequestConnect, UpdateUser, UploadProfilePic } from "../queries/queryUser";
import Navbar from "../components/Navbar";
import { AiOutlinePlus } from 'react-icons/ai';
import { storage } from "../../firebase.config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import ModalEducation from "../components/ModalEducation";
import EducationComp from "../components/EducationComp";
import ModalExperience from "../components/ModalExperience";
import ExperienceComp from "../components/ExperienceComp";
import { RefetchContext } from "../contexts/refetch";

export default function Profile() {
    const { id } = useParams();
    const userContext = UserAuth();
    const [ loading2, setLoading ] = useState(false)
    const navigate = useNavigate();
    const [ updateFunc ] = useMutation(UpdateUser)
    const [ uploadProfPic ] = useMutation(UploadProfilePic)
    const [ eduToggle, setEduToggle ] = useState(false)
    const [ myProf, setMyProf ] = useState(false)
    const [ userEducations, setUserEducations ] = useState([])
    const [ userExperiences, setUserExperiences ] = useState([])
    const { data, loading, error } = useQuery(GetUsrEducation, {variables:{UserID: userContext.user.id}})
    const [ progError, setProgError ] = useState(false)
    const [ userFetch, setUserFetch ] = useState(false)
    const [ eduFetch, setEduFetch ] = useState(false)

    const [ expToggle, setExpToggle ] = useState(false)

    const [User, setUser] = useState({
        id:"",
        name: "",
        profile_picture_url: "https://firebasestorage.googleapis.com/v0/b/linkhedin-vt.appspot.com/o/profilePictures%2Fdefault.jpg?alt=media&token=140c66e3-a51d-47ae-aaef-00ad043d2bd0",
        connect_request:[''],
        connected_user:['']
    })


    const refetchContext = RefetchContext()
    const user = useQuery(GetUsrByID, {variables: {UserID: id}})
    const educations = useQuery(GetUsrEducation, {variables: {UserID: User.id}})
    const experiences = useQuery(GetUsrExperiences, {variables: {UserID: User.id}})
    const [ reqConnect ] = useMutation(RequestConnect)

    useEffect(()=>{
        if(id === userContext.user.id){
            setMyProf(true)
        }
    })

    useEffect(()=>{
        if(!educations.loading && !educations.error){
            // console.log(educations.data)
            setUserEducations(educations.data.userEducation)
        }
    }, [ educations.loading, educations.data ])

    useEffect(()=>{
        if(!experiences.loading && !experiences.error){
            setUserExperiences(experiences.data.userExperience)
        }
    }, [experiences.loading, experiences.data])

    const test = () =>{
        console.log(educations)
    }

    useEffect(()=>{
        if(user.error){
            setProgError(true)
        }
        if(!user.loading && !user.error){
            setProgError(false)
            // console.log(user.data.getUser)
            setUser(user.data.getUser)
            setUserFetch(true)
        }
    }, [ user.loading, user.data])

    // console.log(User)

    const handleProfPicChange = async (e:any) => {
        const newPP = e.target.files[0]
        const imgRef = ref(storage, 'ProfilePic/'+ newPP.name)
        uploadBytes(imgRef, newPP).then(() => {
            getDownloadURL(imgRef).then((data) => {
                uploadProfPic({
                    variables:{
                        id: userContext.user.id,
                        newProfilePicture: data
                }})
                console.log(data)
                // .then(() => {
                //     user.refetch()
                //     refetchContext.refreshUser()
                // })
                const updatedUsr = userContext.user
                updatedUsr.profile_picture = data
                // console.log(updatedUsr)
                userContext.setUser(updatedUsr)
            })
        })
    }

    const toggleEdu = () => {
        setEduToggle(!eduToggle)
    }
    
    const toggleExp = () => {
        setExpToggle(!expToggle)
    }

    useEffect(() => {
        if(eduToggle === true || expToggle === true){
            // console.log("truuu")
            document.body.style.overflow = "hidden";
        }else{
            // console.log("falseeee")
            document.body.style.overflow = "visible"
        }
    }, [eduToggle])
    // console.log(user.data.getUser.name)

    // console.log()
    // console.log(User)
    // console.log(User)

    if(loading){
        return (
            <div>
                kkontolll
            </div>
        )
    }
    
    return (
        <div className='linkedin-bg fullscreen center-col'>
            {eduToggle === true && (
                <ModalEducation  refetch={educations.refetch} toggle={toggleEdu}></ModalEducation>
            )}
            {expToggle === true && (
                <ModalExperience refetch={experiences.refetch} toggle={toggleExp}></ModalExperience>
            )}
            <Navbar></Navbar>
            <div className='profile white-bg border-border'>
                
                {/* <img className='profile-picture' src={userContext.user.ProfilePicture} alt="" /> */}
                <label htmlFor="file" onChange={(e)=>{handleProfPicChange(e)}}>
                    <img className='profile-picture m-20 white-bg' src={userContext.user.ProfilePicture} alt="" />
                </label>
                <div className="ml-20">
                    <p className='text-black mv-20 mb-min10 text-l'>{User.name}</p>
                    {
                        userExperiences.map((exp:any) => {
                            if(exp.Active){
                                return(
                                    <p key={exp.ID} className='text-black mt-min10 mh-20 ph-10 text-m'>{exp.Description} at {exp.CompanyName}</p>
                                )
                            }
                        })
                    }

                </div>
                {(
                    myProf != true && !User.connect_request.includes(userContext.user.id) && !User.connected_user.includes(userContext.user.id)) && (
                        <div>
                            <button onClick={()=>{reqConnect({variables:{id:userContext.user.id, recipient:User.id}}).then(()=>{user.refetch()})}}> Request Connect </button>
                        </div>
                )}
                {(
                    myProf != true && User.connect_request.includes(userContext.user.id)) && (
                        <div>
                            <button className=""> Requested </button>
                        </div>
                )}
                {(
                    myProf != true && User.connected_user.includes(userContext.user.id)) && (
                        <div>
                            <button className="white-button-s pt-min10"> Connected </button>
                        </div>
                )}
                <input disabled={!myProf} className="display-none" type="file" name='file' id='file' onChange={(e)=>{handleProfPicChange(e)}}/>
            </div>
            {/* <button onClick={test}>test</button> */}
            <div className='profile white-bg border-border'>
                <div className='flex-row w-full space-between'>
                    <p className='text-black text-l bold'>Education</p>
                    {
                        myProf === true && (
                            <button className='add-button' onClick={toggleEdu}>
                                <AiOutlinePlus className='plus-logo' ></AiOutlinePlus>
                            </button>
                        )
                    }
                </div>
                {
                    userEducations.length === 0 && (
                        <p className='text-black text-s w-full'>Empty</p>
                    )
                }
                {
                    userEducations.map((edu:any)=>{
                        return(
                            <EducationComp key = {edu.ID} myProf={myProf} education={edu} refetch={educations.refetch}></EducationComp>
                        )
                    })
                }
            </div>
            <div className='profile white-bg border-border'>
                <div className='flex-row w-full space-between'>
                    <p className='text-black text-l bold'>Experience</p>
                    {
                        myProf === true && (
                            <button className='add-button' onClick={toggleExp}>
                                <AiOutlinePlus className='plus-logo' ></AiOutlinePlus>
                            </button>
                        )
                    }
                </div>
                {
                    userExperiences.length === 0 && (
                        <p className='text-black text-s w-full'>Empty</p>
                    )
                }
                {
                    userExperiences.map((exp:any)=>{
                        return(
                            <ExperienceComp key = {exp.ID} myProf={myProf} experience={exp} refetch={experiences.refetch}></ExperienceComp>
                        )
                    })
                }
            </div>
        </div>
    );
}