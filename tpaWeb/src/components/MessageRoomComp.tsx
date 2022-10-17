import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, {useState, useEffect} from 'react'
import { AiOutlinePicture, AiOutlineSend } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { storage } from '../../firebase.config';
import { UserAuth } from '../contexts/authContext';
import { AddMessage, Room } from '../queries/queryUser';
import MessageCardComp from './MessageCardComp';
import SharePostComp from './SharePostComp';
import ShareProfComp from './ShareProfComp';

const MessageRoomComp = ({ userBlockData }: any) => {
    const { roomid } = useParams()
    const UserContext = UserAuth()
    const navigate = useNavigate()
    const [imageFile, setImageFile] = useState<File>()
    const [buttonDisable, setButtonDisable] = useState(true)
    const [removeFileStyle, setRemoveFileStyle] = useState("hidden")
    const [text, setText] = useState("")
    const [messageMutation] = useMutation(AddMessage);
    const [localUrl, setLocalUrl] = useState({
        url: "",
        type: "",
    })
    // console.log(roomid)

    const { loading, error, data, startPolling } = useQuery(Room, {
        variables: { roomId: roomid },
    })

    // const [ getRoom , {loading, error, data, startPolling} ] = useLazyQuery(Room)

    // useEffect(() => {

    //     if(roomId !== undefined){
    //         console.log(roomId)
    //         getRoom({variables: {roomId: roomId}})
    //     }
    // }, [roomId])


    // console.log(data);
    
    // const [messageMutation] = useMutation(AddMessage)
    let checkUserBlock = ""
    let checkCurrentUserBlock = ""

    const showRemoveAttachmentFile = () => {
        if (localUrl.url === "") {
            setRemoveFileStyle("hidden");
        } else {
            setRemoveFileStyle("block");
        }
    };

    
    useEffect(() => {
        if(data !== undefined){
            startPolling(500);
        }
    }, [data]);

    useEffect(() => {
        if (text !== "" || localUrl.url !== "") {
            setButtonDisable(false);
        } else {
            setButtonDisable(true);
        }
    }, [text, localUrl.url]);

    useEffect(() => {
        showRemoveAttachmentFile();
    }, [localUrl.url])

    
    // console.log(data)
    if (!data) return <p>Fetching Chat Data...</p>;


    // console.log(roomid)

    const removeFileHandler = () => {
        setLocalUrl({ type: "", url: "" });
        setImageFile(undefined);
    }

    const changeImageHandler = (e: any, typeInput: string) => {
        const urlFile = URL.createObjectURL(e.target.files[0])
        setImageFile((e.target.files as FileList)[0] as File)
        let type = e.target.files[0].type
        let splitType = type.split("/")
    
        if (typeInput === splitType[0]) {
            setLocalUrl((prev) => ({
            url: urlFile,
            type: splitType[0],
            }))
        } else {
            alert("Invalid Format")
        }
    }

    const handleAddChat = (imageUrl: string, roomId: string) => {
        messageMutation({
            variables: {
                senderId: UserContext.user.id,
                text: text,
                imageUrl: imageUrl,
                roomId: roomId,
            },
        }).then((e) => {
            setLocalUrl((prev) => ({
                url: "",
                type: "",
            }));
            setText("");
            navigate(`/message/${roomId}`)
        }).catch((e) => {})
    }

    const handleUploadImage = async (roomId: string) => {
        if (localUrl.url !== "" && localUrl.type !== "") {
            const refStorage = ref(storage, `${roomId}/${(imageFile as File).name}`);
            await uploadBytes(refStorage, imageFile as File, {
                contentType: "message file",
            });
            const imageUrlFromFirebase = await getDownloadURL(refStorage);
            handleAddChat(imageUrlFromFirebase, roomId)
        } else {
            handleAddChat("", roomId)
        }
    }

    userBlockData.map((userBlockData: any) => {
        if(userBlockData.blockId === UserContext.user.id  && (userBlockData.userId === data.room.user1.id || userBlockData.userId === data.room.user2.id)){
            checkCurrentUserBlock = "blocked"
        }else if(userBlockData.userId === UserContext.user.id && (userBlockData.blockId === data.room.user1.id || userBlockData.blockId === data.room.user2.id)){
            checkUserBlock = "blocked"
        }
    })

    console.log(data)

    const handleCreateMessage = () => {
        handleUploadImage(data.room.id);
    }

    return (
        // <div>MessageRoomComp</div>
        <>
            <div className='h-full relative'>
                <div className='border-border user-profile-message'>
                    {data.room.user1.id === UserContext.user.id ? (
                        <>
                            <div className='flex-row mt-10 mb-10'>
                                <img className='message-profile-pic cover ml-10 ' src={data.room.user2.ProfilePicture} alt="" />
                                <div className='mt-5 ml-5 text-s'>
                                    {data.room.user2.name}
                                </div>

                            </div>
                        </>
                    ) : (
                        <>
                            <img className="profile-pic-connect cover mt-5 ml-5" src={data.room.user1.ProfilePicture} alt="" />
                            <div className='mt-5 ml-5 text-s'>
                                {data.room.user1.name}
                            </div>
                        </>
                    )}
                </div>
                <div className='message-mid-content'>
                    <div>
                        {checkUserBlock === "" && checkCurrentUserBlock === "" ? (
                            <div className='chat-box'>
                                {data.room.messages.map((data: any) => {
                                    console.log(data);
                                    
                                    return(
                                        <div>
                                            <div className='mb-2'>
                                                <MessageCardComp messageData = {data}></MessageCardComp>
                                                {data.SharePost.id !== "" && <SharePostComp  postData = {data}></SharePostComp>}
                                                {data.ShareProfile.id !== "" && <ShareProfComp prof = {data.ShareProfile}></ShareProfComp>}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <div>
                                {checkUserBlock !== "" ? (
                                    <p  className='ml-10 bold'>Can't send message to this user, please unblock this user first</p>
                                ) : (
                                    <p className='ml-10 bold'>Can't send message to this user, because you're blocked</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                {checkUserBlock === "" && checkCurrentUserBlock === "" && (
                    <div className='w-full absolute message-bottom-content mt-10 '>
                        {localUrl.url === "" ? null : localUrl.type === "image" ? (
                            <img src={localUrl.url} alt="" className='border-border image-preview cursor-pointer' onClick={removeFileHandler}/>
                        ) : (
                            <video src={localUrl.url} className='border-border image-preview cursor-pointer' onClick={removeFileHandler}></video>
                        )}
                        <div className='w-full mt-10'>
                            <div className='flex'>
                                <textarea className='border-border ' value={text} name="" id="" onChange={(e) => setText(e.target.value)} placeholder="Write a message..." style={{ resize: "none", width: "92%" }}></textarea>
                                <div className='h-full button-message-container'>
                                    <div>
                                        <label htmlFor="image-input" className='cursor-pointer'><AiOutlinePicture size={25}></AiOutlinePicture></label>
                                        <input type="file"  name="" onChange={(e) => changeImageHandler(e, "image")} style={{ display: "none" }} id="image-input" />
                                    </div>
                                    <div>
                                        <label htmlFor="" className='cursor-pointer' onClick={handleCreateMessage}><AiOutlineSend size={25}></AiOutlineSend></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default MessageRoomComp