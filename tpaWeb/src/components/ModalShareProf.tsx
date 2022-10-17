import { useMutation, useQuery } from '@apollo/client';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState }from 'react'
import { AiFillPicture } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../firebase.config';
import { UserAuth } from '../contexts/authContext'
import { AddMessage, AddMessageSharePost, AddMessageShareProfile, AddRoom, UserConnected } from '../queries/queryUser';

const ModalShareProf = ({ profData, roomData, userBlockData, closeModal }: any) => {
    const UserContext  = UserAuth()
    const [text, setText] = useState("")
    const [imageFile, setImageFile] = useState<File>()
    const [removeFileStyle, setRemoveFileStyle] = useState("hidden")
    const [roomId, setRoomId] = useState("")
    const [haveRoom, setHaveRoom] = useState(true)
    const [buttonDisable, setButtonDisable] = useState(true)
    const navigate = useNavigate()
    const [shareProfMutation] = useMutation(AddMessageShareProfile)

    const [selectedUser, setSelectedUser] = useState({
        userId: "",
    })

    // console.log(roomData);

    const rooms = roomData.rooms
    console.log(rooms);
    

    useEffect(()=>{
        for (let index = 0; index < rooms.length; index++) {
            // const element = array[index];
            console.log(rooms[index].id)
            console.log(selectedUser.userId)
            if(rooms[index].user2.id === selectedUser.userId || rooms[index].user1.id === selectedUser.userId){
                // console.log("asdfasd");
                console.log(rooms[index].id)
                setRoomId(rooms[index].id)
                return
            }
        }
    }, [selectedUser.userId])

    // console.log(roomData.length)
    
    const [localUrl, setLocalUrl] = useState({
        type: "",
        url: "",
    })

    const { loading, data, error } = useQuery(UserConnected, {
        variables: { userId: UserContext.user.id}
    })
    
    // console.log(roomData)

    const [roomMutation] = useMutation(AddRoom);

    const [messageMutation] = useMutation(AddMessage);

    useEffect(() => {
        UserContext.refetchUser();
    }, []);
    
    const showRemoveAttachmentFile = () => {
        if (localUrl.url === "") {
            setRemoveFileStyle("hidden");
        } else {
            setRemoveFileStyle("block");
        }
    };

    useEffect(() => {
        showRemoveAttachmentFile();
    }, [localUrl.url]);

    useEffect(() => {
        if (selectedUser.userId !== "" && (text !== "" || localUrl.url !== "")) {
            setButtonDisable(false);
        } else {
            setButtonDisable(true);
        }
    }, [text, localUrl.url, selectedUser.userId]);

    

    const changeImageHandler = (e: any, typeInput: string) => {
        const urlFile = URL.createObjectURL(e.target.files[0])
        setImageFile((e.target.files as FileList)[0] as File)
        let type = e.target.files[0].type
        let splitType = type.split("/")

        if(typeInput === splitType[0]){
            setLocalUrl((prev) => ({
                url: urlFile,
                type: splitType[0]
            }))
            setLocalUrl({ type: typeInput, url: urlFile})
        }else{
            alert("invalid format")
        }
    }

    const removeFileHandler = () => {
        setLocalUrl({ type: "", url: ""})
        setImageFile(undefined)
    }

    const handleAddChat = (imageUrl: string, roomId: string) => {
        if(text == "") setText("Sent a photo")
        messageMutation({
            variables:{
                senderId: UserContext.user.id,
                text: text,
                imageUrl: imageUrl,
                roomId: roomId,
            }
        }).then((e) => {
            setSelectedUser((prev) => ({
                userId: "",
            }))
            setLocalUrl({ type: "", url: ""})
            setText("")
            navigate(`/message/${roomId}`)
        }).catch((e) => {})
    }

    const hanldeUploadImage = async (roomId: string) => {
        if(localUrl.url !== "" && localUrl.type !== ""){
            const refStorage = ref(storage, `${roomId}/${(imageFile as File).name}`)
            await uploadBytes(refStorage, imageFile as File, {
                contentType: "message file",
            })
            const imageUrlFromFirebase = await getDownloadURL(refStorage)
            handleAddChat(imageUrlFromFirebase, roomId)
        }else{
            handleAddChat("", roomId)
        }
        closeModal(false)
    }

    const handleAddRoom = () => {
        if(selectedUser.userId !== ""){
            roomMutation({
                variables:{
                    userId1: UserContext.user.id,
                    userId2: selectedUser.userId,
                }
            }).then(async (e) => {
                // hanldeUploadImage(e.data.AddRoom.id)
                const roomData = e.data.addRoom
                handleShareProf(roomData.id)
            }).catch((e) => {})
        }else{
            alert("Can't send message to this user")
        }
    }

    console.log(profData);
    

    const handleShareProf = (roomId: string) => {
        console.log("aidi "+profData.id)
        shareProfMutation({
            variables:{
                senderId: UserContext.user.id,
                roomId: roomId,
                ShareProfileId: profData.id
            }
        }).then((e) => {
            setSelectedUser((prev) => ({
                userId: "",
            }))
            alert("Success")
            closeModal(false)
        }).catch((e)=>{
            alert(e)
        })
    }

    console.log("room "+roomId);
    

    const handleSendProfile = () => {
        if (haveRoom) {
            console.log("wow")
            console.log(roomId);
            handleShareProf(roomId)
        } else {
            console.log("ewew")
            handleAddRoom()
        }
    }

    console.log(userBlockData);
    

    useEffect(() => {
        if (selectedUser.userId !== "") {
            setButtonDisable(false)
        } else {
            setButtonDisable(true)
        }
    }, [selectedUser.userId])

    const setSelectUser = (e:any) => {
        let check = false
        let roomId: string = ""
        // if(check && roomId !== ""){
            //     navigate(`/message/${roomId}`)
            //     closeModal(false)
            // }else{
        let checkUserBlock = false
        let checkCurrentUserBlock = false
                
            roomData.rooms.map((roomData: any) => {
                if(e.target.value === roomData.user1.id || e.target.value === roomData.user2.id){
                    check = true
                    roomId = roomData.id
                }
            })
            userBlockData.blocks.map((userBlockData: any) => {
                if(userBlockData.blockId === e.target.value){
                    checkUserBlock = true
                }else if(userBlockData.userId === e.target.File){
                    checkUserBlock = true
                }
            })

            if(checkUserBlock){
                alert("Can't send message to this user, because you blocked this user")
                setSelectedUser(() => ({
                    userId: "",
                }))
            }else if(checkCurrentUserBlock){
                alert("Can't send message to this user, because you blocked this user")
                setSelectedUser(() => ({
                    userId: "",
                }))
            }else{
                setSelectedUser(() => ({
                    userId: e.target.value,
                }))
            }
        // }
    }

    if (loading || !data) return <p>Loading...</p>;

    return (
        // <div>MessageNewComp</div>
        <div className='center-all'>
            <div className="modal-bg">
                <div className="modal relative">
                    <button  type="button" className="close" data-modal-toggle="authentication-modal" onClick={() => closeModal(false)}>
                        <svg  className="w-5 h-5" fill="gray" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                    </button>
                    <h3 className='mb-2'>New message</h3>
                    <div>
                        <div>
                            {localUrl.url === "" ? null : localUrl.type === "image" ? (
                                <img src={localUrl.url} className="w-full border-border" alt="" />
                            ) : (
                                <video src={localUrl.url} className="w-full border-border"></video>
                            )}
                            <p className='mt-5'>Select a user to start a new conversation</p>
                            {data.UserConnected.length === 0 ? (
                                <p>No user</p>
                            ) : (
                                <select className='text-input white-bg' onChange={setSelectUser} defaultValue={""}>
                                    <option value={""} disabled={true}>select a user</option>
                                    {data.UserConnected.map((connect: any) => {
                                        return(
                                            <option value={connect.id} key={connect.id}>{connect.name}</option>
                                        )
                                    })}
                                </select>
                            )}
                        </div>
                        <div className="w-full mt-2">
                            <div className="flex-row">
                            
                            </div>
                            <div className='w-full flex-row'>
                                <button className="blue-button-xs" disabled={buttonDisable} onClick={handleSendProfile}>
                                    Send
                                </button>
                                <button className="red-button-xs ml-10" onClick={() => closeModal(false)}>
                                    Cancel
                                </button>
                                <button className={`red-button-xs ${removeFileStyle}`} onClick={removeFileHandler}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalShareProf