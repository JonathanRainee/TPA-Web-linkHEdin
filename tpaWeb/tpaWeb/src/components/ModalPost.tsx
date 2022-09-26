import { useMutation } from '@apollo/client';
import React,  {useEffect, useState} from 'react'
import { UserAuth } from '../contexts/authContext';
import { CreatePost } from '../queries/queryUser';
import {MdInsertPhoto, MdVideoLibrary} from 'react-icons/Md'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebase.config';

export default function ModalPost(parameter:any){
    
    const [ Photo, setPhoto ] = useState('')
    const [ Video, setVideo ] = useState('')
    const [ text, setText] = useState('')

    const [create] = useMutation(CreatePost)

    const userContext = UserAuth();

    const uploadPhoto = async (e:any) =>{
        const img = e.target.files[0]
        const imgRef = ref(storage, 'postMed/'+img.name)
        uploadBytes(imgRef, img).then(() => {
            getDownloadURL(imgRef).then((x) => {
                setVideo('')
                setPhoto(x)
            })
        })
    }

    const uploadVid = async (e:any) => {
        const vid = e.target.files[0]
        const vidRef = ref(storage, 'postMed/'+vid.name)
        uploadBytes(vidRef, vid).then(() => {
            getDownloadURL(vidRef).then((x) => {
                setPhoto('')
                setVideo(x)
            })
        })
    }

    const handleCreate = () => {
        create({
            variables:{
                senderId: userContext.user.id,
                text: text,
                photoUrl: Photo,
                videoUrl: Video,
            }
        }).then((e) => {
            parameter.refetchPost().then((e: any) => {
                console.log("done")
                parameter.toggle()
            })
        }).catch((err) => {
            alert(err)
        })
        // if(Photo !== '' && Video === ''){
        //     create({
        //         variables:{
        //             senderId: userContext.user.id,
        //             text: text,
        //             photoUrl
        //         }
        //     })
        // }else if(Video !== '' && Photo === ''){

        // }
    }


    return(
        <div className='modal center-all'>
            <div className='small-form'>
                <div className='w-full flex-row'>
                    <p className='text-black text-l bold mh-20'>Create a Post</p>
                </div>
                <div className='w-full center-col mb-20'>
                    <textarea onChange={(e)=>setText(e.target.value)} id='tulisan' style={{resize:"none",width:"340px", borderRadius:"5px", height:"100px",padding:"10px"}} placeholder="What do you want to talk today"></textarea>
                </div>
                {(Photo!=='' || Video!=='') && (
                    <div className='w-full flex-row mb-20'>
                        <p className='text-black text-l bold mh-20'>Preview</p>
                    </div>
                )}
                {Photo!=='' && (
                    <img className='post-picture' src={Photo} alt="" />
                )}

                {Video!=='' && (
                    <video className='post-picture' controls src={Video}/>
                )}
                <div className='w-full flex-row mb-20'>
                    <label htmlFor="video">
                        <MdVideoLibrary className='icon mh-30'></MdVideoLibrary> 
                    </label>
                    <label htmlFor="photo">
                        <MdInsertPhoto className='icon'></MdInsertPhoto>
                    </label>
                    <input onChange={(e)=>{uploadVid(e)}} style={{display:'none'}} type="file" name="video" id="video" />
                    <input onChange={(e)=>{uploadPhoto(e)}} style={{display:'none'}} type="file" name="photo" id="photo" />
                </div>
                <div className='w-full flex-row space-evenly'>
                    <button onClick={handleCreate} className='blue-button-s text-white'>Post</button>
                    <button onClick={parameter.toggle} className='red-button-s text-white'>Cancel</button>
                </div>
            </div>
        </div>
    )

}