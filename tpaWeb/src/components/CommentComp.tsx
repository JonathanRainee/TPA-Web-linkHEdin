import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { BsFillReplyFill, BsReplyFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../contexts/authContext'
import { Mention, MentionsInput, SuggestionDataItem } from "react-mentions";
import { CreateLikeComment, DeleteLikeComment, QueryCommentPost, CreateNotif, CreateHashtag, CreateReply, QueryReplyComment, QueryPostComment, CreateComment } from '../queries/queryUser'
import TemplateRichText from './TemplateRichText'
import '../styles/logRes.scss'
import { HashtagRichText1 } from '../mod/RichText'
import PostReplyComp from './PostReplyComp'
import { mentionStyle } from '../util/helper'

const CommentComp = ({commentId,  commentReply, totalComment, setTotalComment, dataHashtags, refetchHashtag}: any) => {
    
    const userContext = UserAuth()
    const [ likeComment ] = useMutation(CreateLikeComment)
    const [ unlikeComment ] = useMutation(DeleteLikeComment)
    const [ createHash ] = useMutation(CreateHashtag)
    const [addComment] = useMutation(CreateComment)
    const [comment, setComment] = useState("")
    const [commentInput, setCommentInput] = useState("")
    const [limit, setLimit] = useState(2)
    const [offset, setOffset] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const [shareModal, setShareModal] = useState(false)
    const [ createNotif ] = useMutation(CreateNotif)
    const [ displayInputComment, setDisplayInputComment ] = useState("none")
    let checkUserLikes: boolean = false;
    const [ text, setText ] = useState("")
    const [modalProfilePoster, setModalProfilePoster] = useState(false)
    const [ addReply ] = useMutation(CreateReply)
    const [inputText, setInputText] = useState("")

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

    const [ replyQuery, {
            data: dataReply,
            fetchMore: fectMoreReply,
            loading: loadingReply,
            error: errorReply
            }
        ] = useLazyQuery(QueryReplyComment)
    
    const navigate = useNavigate()

    const{ 
        data: dataComment,
        refetch: refetchComment,
        loading: loadingComment,
        error: errorComment,
    } = useQuery(QueryPostComment, {
        variables:{id: commentId}
    })

    const [totalCommentReply, setTotalCommentReply] = useState(commentReply.length)

    if(loadingComment || loadingReply){
        return(
            <div>loadiing...</div>
        )
    }

    const texts = dataComment.postComment.comment.split(" ")
    console.log(texts)

    dataComment.postComment.Likes.map((dataLikes: any) => {
        if (dataLikes.User.id === userContext.user.id) {
            checkUserLikes = true;
        }
    })

    const handleLike = () => {
        likeComment({
            variables:{
                commentId: dataComment.postComment.id,
                userId: userContext.user.id
            }
        }).then((e) => {
            refetchComment().then((e) => {
                alert("Success")
                sendNotif(userContext.user.id, dataComment.postComment.Commenter.id, "liked your commnet")
            }).catch((e) => {
                alert(e)
            })
        }).catch((e) => {
            alert(e)
        })
    }

    const handleUnlike = () => {
        unlikeComment({
            variables:{
                commentId: dataComment.postComment?.id,
                userId: userContext.user.id
            }
        }).then((e) => {
            refetchComment().then((e) => {
                alert("success unlike")
            }).catch((e) => {
                alert(e)
            }).catch((e) => {
                alert(e)
            })
        })
    }

    const handleReplySHow = () => {
        if(displayInputComment == "flex"){
            setDisplayInputComment("none")
            setLimit(2)
            setOffset(0)
        }else{
            setDisplayInputComment("flex")
            replyQuery({
                variables: {
                    Limit: limit,
                    Offset: offset,
                    commentId: dataComment.postComment.id
                }
            }).then((e) => {
                if(e.data === undefined || e.data.repliedToComments.length == 1 || e.data.repliedToComments.length == commentReply.length){
                    setHasMore(false)
                }
            }).catch((e) => {
                alert(e)
            })
        }
    }

    const handleComment = (e: any, newValue: any, newPlainTextValue: any) => {
        setComment(e.target.value);
        setInputText(newPlainTextValue);
    };

    const handleCommentMutation = (e: any, postId: string) => {
        e.preventDefault()

        const texts = comment.split(" ")
        texts.map((inputText) => {
            if(inputText.match(HashtagRichText1)){
                const hashtag = inputText.substring(1, inputText.length)
                createHash({ variables: {hashtag}}).then((e) => {
                    console.log(e)
                })
            }
        })
        if(comment === ""){
            alert("Comment can't be empty")
        }else{
            addReply({
                variables:{
                    postId: postId,
                    commenterId: userContext.user.id,
                    comment: comment.substring,
                    replyToCommentId: commentId
                }
            }).then((e) => {
                if(e.data === undefined || e.data.repliedToComments.length === 1 || e.data.repliedToComments.length == commentReply.length){
                    setHasMore(false)
                }
            }).catch((e) => {
                alert(e)
            })
        }

        
    }

    const createCommentHandler = (e: any, postId: string) => {
        e.preventDefault()
        const texts = comment.split(" ")
        texts.map((inputText) => {
            if(inputText.match(HashtagRichText1)){
                const hashtag = inputText.substring(1, inputText.length)
                createHash({ variables: {hashtag: hashtag}}).then((e)=>{})
            }
        })
        if(comment === ""){
            alert("Reply cannot be empty")
        }else{
            addReply({
                variables:{
                    postId: postId,
                    commenterId: userContext.user.id,
                    comment: comment,
                    replyToCommentId: commentId
                }
            }).then((e) => {
                userContext.refetchUser()
                fectMoreReply({
                    updateQuery: (previousResult) => {
                        if(!previousResult.repliedToComments){
                            return { repliedToComments: [e.data.addReply]}
                        }else{
                            return{
                                repliedToComments: [
                                    e.data.addReply,
                                    ...previousResult.repliedToComments
                                ]
                            }
                        }
                    }
                }).then((e) => {
                    alert("success")
                    setTotalCommentReply(totalCommentReply + 1)
                    setTotalComment(totalComment + 1)
                    refetchHashtag()
                    // notif
                }).catch((e) => {
                    console.log(e)
                })
                setText("")
            }).catch((e) => {
                alert(e)
                setText("")
            })
        }
    }

    console.log(dataReply)
    

    const handleFetchMore = () => {
        fectMoreReply({
            variables:{ Offset: dataReply.repliedToComments.length, Limit: 2, commentId: commentId},
            updateQuery: (previousResult, { fetchMoreResult }) => {
                if(previousResult.repliedToComments.length + fetchMoreResult.repliedToComments.length === totalCommentReply){
                    setHasMore(false)
                }
                if(fetchMoreResult.repliedToComments.length === 0){
                    return previousResult
                }else{
                    return{
                        QueryReplyComment: [
                            ...previousResult.repliedToComments,
                            ...fetchMoreResult.repliedToComments,
                        ]
                    }
                }
            }
        }).then((e) => {}).catch((e) => {setHasMore(false)})
    }

    const pressHandleEnter = (event: any, postId: string) => {
        console.log(event.key);
        if (event.key === "Enter") {
            setCommentInput("");
            createCommentHandler(event, postId);
            setComment("")
        }
    }

    const mentionDatas: SuggestionDataItem[] = []
    userContext.user.Connections.map((dataMention: any) => {
        let mentionData: SuggestionDataItem = {id: "", display: ""}
        let at: string = "@"
        if(dataMention.user1.id != userContext.user.id){
            mentionData.id = dataMention.user1.id
            mentionData.display = at.concat(dataMention.user1.name)
            mentionDatas.push(mentionData)
        }else if(dataMention.user2.id != userContext.user.id){
            mentionData.id = dataMention.user2.id
            mentionData.display = at.concat(dataMention.user2.name)
            mentionDatas.push(mentionData)
        }
    })

    const hashDatas: SuggestionDataItem[] = []
    dataHashtags.Hashtags.map((dataHashtag: any) => {
        let hashtagData: SuggestionDataItem = { id: "", display: ""}
        let at: string = "#"
        hashtagData.id = at.concat(dataHashtag.id)
        hashtagData.display = at.concat(dataHashtag.hashtag)
        hashDatas.push(hashtagData)
    })


    return (
        // <div>CommentComp</div>
        <div className='flex-col w-full'>
            <div className='flex-row2 border-com mh-20 mb-10'>
                <div className='mr-2 mt-20 ml-10'>
                    <img src={dataComment.postComment?.Commenter.ProfilePicture} className="homepage-picture " alt="" />
                </div>
                <div className='w-full comment-content'>
                    <div className='pb-min10'>
                        <p className='text-black text-m bold'>{dataComment.postComment?.Commenter.name}</p>
                        <p className='mt-20'><TemplateRichText texts={texts}></TemplateRichText></p>
                    </div>
                    <div className='flex-row'>
                        { 
                            checkUserLikes === false ? (
                                <div className='flex-row items-center mr-2'>
                                    <p className="cursor-pointer" onClick={handleLike}>
                                        <AiOutlineLike></AiOutlineLike>
                                    </p>
                                    <p>{dataComment.postComment?.Likes.length}</p>
                                </div>
                            ):(
                                <div className='flex-row items-center mr-2'>
                                    <p className='cursor-pointer' onClick={handleUnlike}>
                                        <AiFillLike></AiFillLike>
                                    </p>
                                    <p>{dataComment.postComment.Likes.length}</p>
                                </div>
                            )
                        }
                        <div className='flex-row'>
                            <p className='cursor-pointer' onClick={handleReplySHow}>
                                <BsReplyFill></BsReplyFill>
                            </p>
                            <p>{totalCommentReply}</p>
                        </div>
                    </div>
                    <div className=''>
                        <div style={{ display: `${displayInputComment}`}} className="flex-col w-full">
                            <div className='flex-row mb-10 mr-50'>
                                <img className="homepage-picture" src={userContext.user.ProfilePicture} alt="" />
                                <MentionsInput className='chat-input ml-10' onKeyPress={(event) => pressHandleEnter(event, dataComment.postComment.postId)} value={comment} style={{width: "100%", minHeight: "50px", maxHeight: "auto"}} onChange={handleComment} placeholder="Add a reply...">
                                    <Mention trigger={"@"} data={mentionDatas} style={mentionStyle}></Mention>
                                    <Mention trigger={"#"} data={hashDatas} style={mentionStyle}></Mention>
                                </MentionsInput>
                            </div>
                        </div>
                        {
                            displayInputComment === "flex" && (
                                dataReply.repliedToComments?.map((replyData: any) => {
                                    return <PostReplyComp key={replyData.id} replyId={replyData.id}></PostReplyComp>
                                })
                            )
                        }
                        {
                            displayInputComment === "flex" && hasMore == true && (
                                <div className='ml-20'>
                                    <button onClick={handleFetchMore} className='blue-button-reply ml-40'>Load more</button>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentComp