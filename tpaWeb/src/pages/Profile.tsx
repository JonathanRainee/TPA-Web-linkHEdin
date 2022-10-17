import { useMutation, useQuery } from "@apollo/client";
import { setDefaultResultOrder } from "dns";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UploadProfilePicture } from "../util/ProfilepicUtil";
import { UserAuth } from "../contexts/authContext";
import "../styles/profileStyle.scss";
import { FindUser, GetUsrByID, GetUsrEducation, GetUsrExperiences, RequestConnect, UpdateUser, UploadBgPic, UploadProfilePic, UserYouMightKnow, VisitUser } from "../queries/queryUser";
import Navbar from "../components/Navbar";
import { AiOutlinePlus, AiFillEdit } from 'react-icons/ai';
import { storage } from "../../firebase.config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import ModalEducation from "../components/ModalEducation";
import EducationComp from "../components/EducationComp";
import ModalExperience from "../components/ModalExperience";
import ExperienceComp from "../components/ExperienceComp";
import { RefetchContext } from "../contexts/refetch";
import ModalUpdtUsername from "../components/ModalUpdtUsername";
import UserInfoComp from "../components/UserInfoComp";
import UserYMKCard from "../components/UserYMKCard";
import UserYMKComp from "../components/UserYMKComp";
import FooterComp from "../components/FooterComp";

export default function Profile() {
    const { id } = useParams();
    const userContext = UserAuth();
    const [ loading2, setLoading ] = useState(false)
    const navigate = useNavigate();
    const [ updateFunc ] = useMutation(UpdateUser)
    const [ uploadProfPic ] = useMutation(UploadProfilePic)
    const [ uploadBgPic ] = useMutation(UploadBgPic)
    const [ eduToggle, setEduToggle ] = useState(false)
    const [ myProf, setMyProf ] = useState(false)
    const [ userEducations, setUserEducations ] = useState([])
    const [ userExperiences, setUserExperiences ] = useState([])
    // const { data, loading, error } = useQuery(GetUsrEducation, {variables:{UserID: userContext.user.id}})
    const [ progError, setProgError ] = useState(false)
    const [ userFetch, setUserFetch ] = useState(false)
    const [ eduFetch, setEduFetch ] = useState(false)
    const [ usernameToggle, setUsernameToggle ] = useState(false)
    const [ expToggle, setExpToggle ] = useState(false)
    let connectedUser: boolean = false
    let connectionReq: boolean = false
    let giveConnectStat: boolean = false
    // console.log(userContext)
    // console.log("asdfasdf")

    const [User, setUser] = useState({
        id:"",
        name: "",
        profile_picture_url: "https://firebasestorage.googleapis.com/v0/b/linkhedin-vt.appspot.com/o/profilePictures%2Fdefault.jpg?alt=media&token=140c66e3-a51d-47ae-aaef-00ad043d2bd0",
        bg_pic_url: "",
        connect_request:[''],
        connected_user:['']
    })

    const{loading, error, data, called, refetch: refetchCurrUser,} = useQuery(GetUsrByID, {variables: {UserID: id}, errorPolicy: "all"})

    const [ visit, { loading: loadingVisit, error: errorVisit, data: dataVisit } ] = useMutation(VisitUser)

    const { loading: loadingUserSuggestion, error: errorUserSuggestion, data: dataUserSuggestion, refetch: refetchUserSuggestion } = useQuery(UserYouMightKnow, {
        variables: {
            userId: userContext.user.id
        }
    })
 
    // console.log(data.getUser)
    const [ currUser, setCurrUser ] = useState()
    const [ fCurrUser, setFCurrUser ] = useState(false)
    const refetchContext = RefetchContext()
    const user = useQuery(GetUsrByID, {variables: {UserID: id}, errorPolicy: "all"})
    // console.log(userContext)
    // const educations = useQuery(GetUsrEducation, {variables: {UserID: User.id}})
    // const experiences = useQuery(GetUsrExperiences, {variables: {UserID: User.id}})
    // const [ reqConnect ] = useMutation(RequestConnect)

    

    useEffect(()=>{
        if(id === userContext.user.id){
            setMyProf(true)
        }else{
            setMyProf(false)
        }
    }, [id])

    // console.log(data.getUser)
    // if(!loading){
    //     console.log(data.getUser)
        useEffect(() => {
            if(dataVisit && data) {
                // console.log(dataVisit)
                if(dataVisit.VisitUser.length !== data.getUser.Visits.length){
                    refetchCurrUser()
                }
            }
        }, [loadingVisit, loading])
    
        useEffect(() => {
            if(userContext.user.id !== id){
                visit({
                    variables: {
                        id1: userContext.user.id,
                        id2: id
                    }
                }).then((e) => {})
            }
        }, [])
    // }

    // useEffect(()=>{
    //     setCurrUser(data.getUser)
    //     setFCurrUser(true)
    // }, [])

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
        if(newPP === undefined){
            alert("Please input a valid extension file")
        }else{}
        const imgRef = ref(storage, 'ProfilePic/'+ newPP.name)
        uploadBytes(imgRef, newPP).then(() => {
            getDownloadURL(imgRef).then((data) => {
                uploadProfPic({
                    variables:{
                        id: userContext.user.id,
                        newProfilePicture: data
                }}).then(() => {
                    user.refetch()
                    // refetchContext.refreshUser()
                    userContext.refetchUser()
                })
                // userContext.refetchUser()
                // const updatedUsr = userContext.user
                // updatedUsr.profile_picture = data
                // console.log(updatedUsr)
                // console.log("slesai")
                // userContext.setUser(updatedUsr)
            })
        })
    }

    const handleBgChange = async (e:any) => {
        const newBGP = e.target.files[0]
        const imgRef = ref(storage, 'BgPic/'+ newBGP.name)
        uploadBytes(imgRef, newBGP).then(() => {
            getDownloadURL(imgRef).then((data) => {
                uploadBgPic({
                    variables:{
                        id: userContext.user.id,
                        newBanner: data
                }}).then(() => {
                    user.refetch()
                    // refetchContext.refreshUser()
                    userContext.refetchUser()
                })
                // userContext.refetchUser()
                // const updatedUsr = userContext.user
                // updatedUsr.Backgroundpicture = data
                // console.log(userContext.user)
                // console.log(updatedUsr)
                // userContext.setUser(updatedUsr)
            })
        })
    }

    // console.log(userContext.user)

    const toggleEdu = () => {
        setEduToggle(!eduToggle)
    }
    
    const toggleExp = () => {
        setExpToggle(!expToggle)
    }

    const toggleUsrname = () => {
        setUsernameToggle(!usernameToggle)
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
    // console.log(userContext.user.profile_picture)

    // console.log()
    // console.log(userContext.user)
    // console.log(User)

    useEffect(() => {
        userContext.refetchUser()
        refetchCurrUser()
    }, [])
    // console.log(data.getUser)

    // console.log(data.getUser)
    // useEffect(() => {
    //     if(dataVisit && data) {
    //         if(dataVisit.visitUser.length !== data.getUser.Visits.length){
    //             refetchCurrUser()
    //         }
    //     }
    // }, [loadingVisit, loading])

    // useEffect(() => {
    //     if(userContext.user.id !== id){
    //         visit({
    //             variables: {
    //                 id1: userContext.user.id,
    //                 id2: id
    //             }
    //         }).then((e) => {console.log("askdlfj")})
    //     }
    // }, [])

    if(loadingVisit) {
        return(
            <div>Fetching data....</div>
        )
    }

    if(errorVisit){
        return(
            <div>Error...</div>
        )
    }

    if(loading){
        // console.log("afs")
        return (
            <div>
                Fetching data123...
            </div>
        )
    }else{
        console.log("uda")
        // useEffect(() => {
        //     if(dataVisit && data) {
        //         if(dataVisit.visitUser.length !== data.getUser.Visits.length){
        //             refetchCurrUser()
        //         }
        //     }
        // }, [loadingVisit, loading])
    }

    if(error){
        return(
            <div>Error...</div>
        )
    }

    if(loadingUserSuggestion){
        return(
            <div>loading...</div>
        )
    }

    // if(errorUserSuggestion){
    //     return(
    //         <div>error...</div>
    //     )
    // }

    if(dataUserSuggestion === undefined){
        console.log("gaad")
    }else{
        // console.log(dataUserSuggestion)
        console.log("ada")
    }
    // console.log(dataUserSuggestion)
    // if(errorUserSuggestion){
    //     return(
    //         <div>error...</div>
    //     )
    // }
    // else{
    //     console.log(data.getUser)
    // }
    // useEffect(() => {
    //     if(dataVisit && data) {
    //         if(dataVisit.visitUser.length !== data.getUser.Visits.length){
    //             refetchCurrUser()
    //         }
    //     }
    // }, [loadingVisit, loading])

    // useEffect(() => {
    //     if(userContext.user.id !== id){
    //         visit({
    //             variables: {
    //                 id1: userContext.user.id,
    //                 id2: id
    //             }
    //         }).then((e) => {})
    //     }
    // }, [])
    // console.log(data.getUser.Visits.length)
    // useEffect(() => {
    //     if(dataVisit && data) {
    //         if(dataVisit.visitUser.length !== data.getUser.Visits.length){
    //             refetchCurrUser()
    //         }
    //     }
    // }, [loadingVisit, loading])

    // useEffect(() => {
    //     if(userContext.user.id !== id){
    //         visit({
    //             variables: {
    //                 id1: userContext.user.id,
    //                 id2: id
    //             }
    //         }).then((e) => {})
    //     }
    // }, [])
    

    // console.log(data.getUser.Experiences)
    // console.log(dataUserSuggestion.userSuggestion)
    
    return (
        <div className="flex-row flex">
            <div className='linkedin-bg fullscreen center-col flex'>
                {eduToggle === true && (
                    <ModalEducation toggle={toggleEdu}></ModalEducation>
                )}
                {expToggle === true && (
                    <ModalExperience toggle={toggleExp}></ModalExperience>
                )}
                {/* {usernameToggle === true && (
                    <ModalUpdtUsername refetch={user.refetch} toggle={toggleUsrname}></ModalUpdtUsername>
                )} */}
                <Navbar></Navbar>
                <div>
                    <UserInfoComp currentUser={data.getUser} refetchCurrentUser={refetchCurrUser} edit={myProf}></UserInfoComp>
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
                            data.getUser.Educations.length === 0 && (
                                <p className='text-black text-s w-full'>Empty</p>
                            )
                        }
                        {
                            data.getUser.Educations.map((edu:any)=>{
                                return(
                                    <EducationComp key = {edu.ID} myProf={myProf} education={edu}></EducationComp>
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
                            data.getUser.Experiences.length === 0 && (
                                <p className='text-black text-s w-full'>Empty</p>
                            )
                        }
                        {
                            data.getUser.Experiences.map((exp:any)=>{
                                return(
                                    <ExperienceComp key = {exp.ID} myProf={myProf} experience={exp}></ExperienceComp>
                                )
                            })
                        }
                    </div>
                    {
                        dataUserSuggestion !== undefined ? (
                            <>
                                <div>     
                                    {
                                        myProf ? (
                                            <>
                                                <div className='profile white-bg border-border'>
                                                    <div className='flex-row w-full space-between'>
                                                        <p className="text-black text-l bold">User you might know</p>
                                                    </div>
                                                    {
                                                        // console.log(dataUserSuggestion)
                                                        loadingUserSuggestion ? (
                                                            <p>Loading...</p>
                                                        ) : !errorUserSuggestion ? (
                                                            <>
                                                                {/* <p>ada</p> */}
                                                                {/* <UserYMKComp userSuggestionData={dataUserSuggestion.userSuggestion[0]}></UserYMKComp> */}
                                                                <UserYMKCard userSuggestionData={dataUserSuggestion.userSuggestion}> </UserYMKCard>
                                                            </>
                                                        ) : (
                                                            <p>-</p>
                                                        )
                                                    }
                                                </div>
                                            </>
                                        ) : (
                                            <div></div>
                                        )
                                    }
                                </div>
                            </>
                        ) : (
                            <div></div>
                        )
                    }
                </div>
            </div>
            <FooterComp></FooterComp>
        </div>
    );
}
