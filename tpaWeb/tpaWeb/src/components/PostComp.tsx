import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import React, {useState} from 'react'
import { AiFillLike } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../contexts/authContext';
import { CreateComment, CreateHashtag, CreateLikePost, CreateNotif, QueryCommentPost } from '../queries/queryUser';
import '../styles/logRes.scss'

const PostComp = ({ postData, refectPostData } : any) => {
    const navigate = useNavigate();
    const userContext = UserAuth();
    const [addComment] = useMutation(CreateComment)
    const [ createNotif ] = useMutation(CreateNotif)

    const [openComments, setopenComments] = useState(false);
    const [ThereAreMore, setThereAreMore] = useState(true);
    const [ text, setText ] = useState("")
    const [totalPostComment, setTotalPostComment] = useState(postData.Comments?.length);

    const toggleComment = () =>[
        setopenComments(!openComments)
    ]

    const [ addLike ] = useMutation(CreateLikePost)

    // const handleFetchMore = () => {

    // }

    // const [ commentQuery, { data: dataComment, fetchMore: fecthMoreComment, loading: loadingComment, error: errorComment} ]  = useQuery(QueryReplyComment)


    const likeHandler = () => {
        addLike({
            variables:{
                userId: userContext.user.id,
                postId: postData.id,
            }
        }).then((e) => {
            alert("SUccess")
            refectPostData()
            // createNotif({
            //     variables:{
            //         fromUserId: userContext.user.id,
            //         toUserId: ,
            //         message: message,
            //     }
            // })

        }).catch((e) => {
            alert(e)
        })
    }

    const fump = () => {
        console.log("oof")
    }

    const [
        commentQuery,
        {
            data: dataComment,
            fetchMore: fecthMoreComment,
            loading: loadingComment,
            error: errorComment,
        },
    ] = useLazyQuery(QueryCommentPost);

    // const createCommentHandler = (e: any, postId: string) => {
    //     e.preventDefault()
    //     const texts = text?.split(" ")
    //     texts.map((text) => {
    //         if(text.match)
    //     })

    //     if(text === ""){
    //         alert("Please input your comment")
    //     } else {
    //         addComment({
    //             variables:{
    //                 postId: postId,
    //                 commenterId: userContext.user.id,
    //                 comment: text,
    //             }
    //         }).then((e) => {
    //             userContext.refetchUser()
    //             fecthMoreComment({
    //                 updateQuery: (previousResult) => {
    //                     if(!previousResult.postComments) {
    //                         return{ postComments: [e.data.addComment]}
    //                     }else{
    //                         return{
    //                             postComments: [
    //                                 e.data.addComment,
    //                                 ...previousResult.postComments,
    //                             ]
    //                         }
    //                     }
    //                 }
    //             }).then((e) => {
    //                 alert("success")
    //             })
    //         })
    //     }


    // }

    // console.log(postData.Likes.includes)

    if(postData.Likes.includes(userContext.user.id)){
        console.log("watata")
    }else{
        console.log("faad")
    }

    return( 
        <div className='post white-bg border-border center-col box2'>
            <div className="w-full flex-row borderB">
                <img onClick={()=>{navigate(`/profile/${postData.Sender.id}`)}} src={postData.Sender.ProfilePicture} className="homepage-picture mh-10 mv-10" alt="" />
                <div className="w-full flex-col">
                    <span className="text-black text-m bold mh-10">{postData.Sender.name}</span>
                    <span className="text-black mh-10 text-s">{postData.text}</span>
                </div>
            </div>
            {postData.photoUrl !== '' &&(
                <img className="post-picture2 borderBT" src={postData.photoUrl} alt="" />
            )}
            {postData.videoUrl !== '' &&(
                <video className="post-picture2 borderBT" src={postData.videoUrl} controls/>
            )}
            <div className="w-full flex-row mv-10 borderT">
                <div className="mh-20 center-row ">
                    {!postData.Likes.includes(userContext.user.id)&&(
                        <AiFillLike onClick={likeHandler} className="icon mt-10"/>
                    )}
                    {postData.Likes.includes(userContext.user.id)&&(
                        <AiFillLike onClick={fump} className="icon-liked"/>
                    )}
                    <p className="text-black text-s mh-10 ">{postData.Likes.length}</p>
                </div>
                <div className=" center-row">
                    <BiCommentDetail onClick={toggleComment} className=""/>
                </div>
            </div>
            {
                openComments && (
                    <>
                        <div className='flex-row mv-30'>
                            <img src={postData.Sender.ProfilePicture} className="mh-10 homepage-picture" alt="" />
                            <input onChange={(e)=>setText(e.target.value)} className='chat-input' type="text" placeholder='Comment' />
                            <button className='send-button'>Send</button>
                            <button className='cancel-button' onClick={toggleComment}>Cancel</button>
                        </div> 
                        {
                            postData.Comments.length > 0 && (
                                <>
                                    <div>
                                        <p>Comments</p>
                                    </div>
                                </>
                            )
                        }
                    </>
                )
            }
        </div>
    )
}

export default PostComp