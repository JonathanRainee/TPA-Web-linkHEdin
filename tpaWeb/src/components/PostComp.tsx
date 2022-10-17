import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import React, {useState} from 'react'
import { AiFillLike } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { BsFillShareFill } from 'react-icons/bs';
import { Mention, MentionsInput, SuggestionDataItem } from 'react-mentions';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../contexts/authContext';
import { HashtagRichText1 } from '../mod/RichText';
import { Blocks, CreateComment, CreateHashtag, CreateLikePost, CreateNotif, QueryCommentPost, Rooms } from '../queries/queryUser';
import '../styles/logRes.scss'
import { mentionStyle } from '../util/helper';
import CommentComp from './CommentComp';
import ModalShare from './ModalShare';
import TemplateRichText from './TemplateRichText';

const PostComp = ({  initialValueTotalComment, dataHashtags, refetchHashtag, postData, refectPostData } : any) => {
    const navigate = useNavigate();
    const userContext = UserAuth();
    const [addComment] = useMutation(CreateComment)
    const [ createNotif ] = useMutation(CreateNotif)
    const [ createHash ] = useMutation(CreateHashtag)
    const sendNotif = (fromUserId: string, toUserId: string, message: string) => {
        if(fromUserId != toUserId){
            createNotif({
                variables:{
                    toUserId: toUserId,
                    fromUserId: fromUserId,
                    message: message
                }
            }).then((e) => {}).catch((e) => {})
        }
    }
    // console.log(postData.Comments)
    const [openComments, setopenComments] = useState(false)
    const [ThereAreMore, setThereAreMore] = useState(true)
    const [hasMore, setHasMore] = useState(true);
    const [ text, setText ] = useState("")
    const [displayInputComment, setDisplayInputComment] = useState("none")
    const [totalPostComment, setTotalPostComment] = useState(postData.Comments?.length)
    const [totalComment, setTotalComment] = useState(initialValueTotalComment)
    const [limit, setLimit] = useState(2);
    const [offset, setOffset] = useState(0);
    const [comment, setComment] = useState("")
    const [shareModal, setShareModal] = useState(false)
    const [commentInput, setCommentInput] = useState("")
    const [inputText, setInputText] = useState("")

    const toggleComment = () =>[
        setopenComments(!openComments)
    ]

    const { loading, error, data, startPolling } = useQuery(Rooms, {
        variables: { userId: userContext.user.id },
    })

    const {
        loading: loadingBLock,
        data: dataBlock,
        startPolling: startPollingBlock,
    } = useQuery(Blocks, { variables: { userId: userContext.user.id } });

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
            sendNotif(userContext.user.id, postData.Sender.id, "Liked your post")
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
    ] = useLazyQuery(QueryCommentPost)

    // if(dataComment && !loadingComment){
        // console.log(dataComment)
    // }

    const handleCommentShow = () => {
        if(displayInputComment == "flex"){
            setDisplayInputComment("none")
            setLimit(2)
            setOffset(0)
        }else{
            setDisplayInputComment("flex")
            commentQuery({
                variables:{
                    Limit: limit,
                    Offset: offset,
                    postId: postData.id,
                }
            }).then((e) => {
                if(e.data === undefined || e.data.postComments.length === 1 || e.data.postComments.length == totalComment){
                    setHasMore(false)
                }
            }).catch((e) => {
                alert(e)
            })
        }
    }

    const createCommentHandler = (e: any, postId: string) => {
        e.preventDefault()
        const texts = text?.split(" ")
        texts.map((text) => {
            if(text.match(HashtagRichText1)){
                const hashtag = text.substring(1, text.length)
                createHash({ variables: {hashtag: hashtag}}).then((e)=>{})
            }
        })

        if(comment === ""){
            alert("Please input your comment")
        } else {
            addComment({
                variables:{
                    postId: postId,
                    commenterId: userContext.user.id,
                    comment: comment,
                }
            }).then((e) => {
                // alert("masook")
                userContext.refetchUser()
                fecthMoreComment({
                    updateQuery: (previousResult) => {
                        if(!previousResult.postComments) {
                            return{ postComments: [e.data.addComment]}
                        }else{
                            return{
                                postComments: [
                                    e.data.addComment,
                                    ...previousResult.postComments,
                                ]
                            }
                        }
                    }
                }).then((e) => {
                    setComment("")
                    alert("success")
                    setTotalPostComment(totalPostComment + 1)
                    setTotalComment(totalComment + 1)
                    refetchHashtag()
                    sendNotif(userContext.user.id, postData.Sender.id, "commented on your post")
                }).catch((e) => {})
                // alert("cicici")
                setText("")
            }).catch((e) => {
                alert(e)
                setComment("")
            })
        }
    }

    if(loadingComment){
        return(
            <div>loading...</div>
        )
    }

    const handleShowModal = () => {
        setShareModal(true)
    }

    // console.log(dataComment)

    const fetchMoreComment = () => {
        fecthMoreComment({
            variables: {Offset: dataComment.postComments.length},
            updateQuery: (previousResult, { fetchMoreResult }) => {
                let check = false
                if(previousResult.postComments.length + fetchMoreResult.postComments.length == totalComment){
                    setHasMore(false)
                }
                for(let idx = 0; idx < previousResult.postComments.length; idx++){
                    for(let idx2 = 0; idx2 < previousResult.postComments.length; idx2++){
                        if(previousResult.postComments[idx].id === fetchMoreResult.postComments[idx2].id){
                            check = true
                        }
                    }
                }
                if(check === true || fetchMoreResult.postComments.length == 0){
                    return previousResult
                }else{
                    return{
                        postComments: [
                            ...previousResult.postComments,
                            ...fetchMoreResult.postComments
                        ]
                    }
                }
            }
        }).then((e) => {}).catch((e) => {setHasMore(false)})
    }

    const upComment = (event: any, postId: string) => {
        // if(event.key === "Enter"){
            setText("")
            createCommentHandler(event, postId)
        // }
    }

    // console.log(dataHashtags)

    const mentionDatas: SuggestionDataItem[] = []
    // userContext.user.Connections.map((dataMention: any) => {
    //     let mentionData: SuggestionDataItem = {id: "", display: ""}
    //     let at: string = "@"
    //     if(dataMention.user1.id != userContext.user.id){
    //         mentionData.id = dataMention.user1.id
    //         mentionData.display = at.concat(dataMention.user1.name)
    //         mentionDatas.push(mentionData)
    //     }else if(dataMention.user2.id != userContext.user.id){
    //         mentionData.id = dataMention.user2.id
    //         mentionData.display = at.concat(dataMention.user2.name)
    //         mentionDatas.push(mentionData)
    //     }
    // })
    userContext.user.Connections.map((dataMention:
            {
                user1: {id: string | number; name: string;}
                user2: {id: string | number; name: string;}
            }
        ) => {
            let mentionData: SuggestionDataItem = {id: "", display: ""}
            let at: string = "@"
            if(dataMention.user1.id != userContext.user.id){
                mentionData.id = dataMention.user1.id
                mentionData.display = at.concat(dataMention.user1.name)
                console.log(mentionData.display)
                mentionDatas.push(mentionData)
            }else if(dataMention.user2.id != userContext.user.id){
                mentionData.id = dataMention.user2.id
                mentionData.display = at.concat(dataMention.user2.name)
                console.log(mentionData.display)
                mentionDatas.push(mentionData)
            }
        }
    )

    const hashDatas: SuggestionDataItem[] = []
    dataHashtags.Hashtags.map((dataHashtag: any) => {
        let hashtagData: SuggestionDataItem = { id: "", display: ""}
        let at: string = "#"
        hashtagData.id = at.concat(dataHashtag.id)
        hashtagData.display = at.concat(dataHashtag.hashtag)
        hashDatas.push(hashtagData)
    })

    const handleComment = (e: any, newValue: any, newPlainTextValue: any) => {
        setComment(e.target.value);
        setInputText(newPlainTextValue);
    };


    // console.log(postData.Likes.includes)

    // if(postData.Likes.includes(userContext.user.id)){
    //     console.log("watata")
    // }else{
    //     console.log("faad")
    // }

    // console.log(postData.Comments.length)
    const texts = postData.text?.split(" ");

    return( 
        <div className='post white-bg border-border center-col box2 flex-col'>
            {
                shareModal === true && <ModalShare postData={postData} roomData={data.rooms} userBlockData={dataBlock.blocks} closeModal={setShareModal}></ModalShare>
            }
            <div className="w-full flex-row borderB">
                <img onClick={()=>{navigate(`/profile/${postData.Sender.id}`)}} src={postData.Sender.ProfilePicture} className="homepage-picture mh-10 mv-10" alt="" />
                <div className="w-full flex-row">
                    <span className="text-black text-m bold mh-10">{postData.Sender.name}</span>
                    <p className=''><TemplateRichText texts={texts}></TemplateRichText></p>
                    {/* <span className="text-black mh-10 text-s">{postData.text}</span> */}
                </div>
            </div>
            {postData.photoUrl !== '' &&(
                <img className="post-picture2 borderBT" src={postData.photoUrl} alt="" />
            )}
            {postData.videoUrl !== '' &&(
                <video className="post-picture2 borderBT" src={postData.videoUrl} controls/>
            )}
            <div className="w-full flex-row mv-10 borderT">
                <div className="mh-20 center-row">
                    {!postData.Likes.includes(userContext.user.id)&&(
                        <AiFillLike onClick={likeHandler} className="mt-12"/>
                    )}
                    {postData.Likes.includes(userContext.user.id)&&(
                        <AiFillLike onClick={fump} className=" mt-12"/>
                    )}
                    <p className="text-black text-s mh-10 ">{postData.Likes.length}</p>
                </div>
                <div className=" center-row">
                    <BiCommentDetail onClick={ (e) => {toggleComment()
                                                        handleCommentShow()}} className="mt-14"/> 
                    <p className="text-black text-s mh-10  ">{postData.Comments.length}</p>
                </div>
                <div>
                    <BsFillShareFill onClick={ ()=>setShareModal(true) } className='ml-10 cursor-pointer'>

                    </BsFillShareFill>
                </div>
            </div>
            {
                openComments && (
                    <>
                        <div className='flex-row w-full mb-10'>
                            <img src={postData.Sender.ProfilePicture} className="mh-10 homepage-picture" alt="" />
                            {/* <input onChange={(e)=>setText(e.target.value)} className='chat-input' type="text" placeholder='Comment' value={text}/> */}
                            <MentionsInput className='chat-input ml-10' value={comment} style={{width: "100%", minHeight: "30px", maxHeight: "auto"}} onChange={handleComment} placeholder="Add a reply...">
                                    <Mention trigger={"@"} data={mentionDatas} style={mentionStyle}></Mention>
                                    <Mention trigger={"#"} data={hashDatas} style={mentionStyle}></Mention>
                            </MentionsInput>
                            <button onClick={(event: any) => upComment(event, postData.id)} className='send-button'>Send</button>
                            <button className='cancel-button mr-10' onClick={toggleComment}>Cancel</button>
                        </div> 
                        {
                            // postData.Comments.length > 0 && (
                            //     <>
                            //         <div className='flex-col w-full p-10'>
                            //             <p>Comments</p>
                            //             {
                            //                 postData.Comments.map((data: any) => {
                            //                     // console.log(data.comment)
                            //                     return (<CommentComp key = {data.id} commentId = {data.id} dataHashtags = {dataHashtags} refetchHashtag = {refetchHashtag} commentReply = {data.Replies} totalComment = {totalPostComment} setTotalComment = {setTotalPostComment}></CommentComp>)
                            //                     // console.log(data.comment)
                            //                 })
                            //             }
                            //         </div>
                            //     </>
                            //     displayInputComment === "flex" && (
                            //         dataComment
                            //     )
                            // )
                            dataComment?.postComments?.map((data: any) => {
                                return (<CommentComp key = {data.id} commentId = {data.id} dataHashtags = {dataHashtags} refetchHashtag = {refetchHashtag} commentReply = {data.Replies} totalComment = {totalPostComment} setTotalComment = {setTotalPostComment}></CommentComp>)
                            })
                        }
                        {displayInputComment === "flex" && hasMore == true && (
                            <div className='mb-2 ml-20'>
                                <button className='send-button2' onClick={fetchMoreComment}>Load more comment</button>
                            </div>
                        )}
                    </>
                )
            }
        </div>
    )
}


export default PostComp