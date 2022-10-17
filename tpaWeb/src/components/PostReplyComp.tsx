import { useMutation, useQuery } from '@apollo/client'
import React from 'react'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../contexts/authContext'
import { CreateLikeComment, CreateNotif, DeleteLikeComment, QueryPostComment } from '../queries/queryUser'
import TemplateRichText from './TemplateRichText'

const PostReplyComp = ({ replyId }: { replyId: string }) => {
    
    const userContext = UserAuth()
    const [ likeComment ] = useMutation(CreateLikeComment)
    const [ unlikeComment ] = useMutation(DeleteLikeComment)
    const [ createNotif ] = useMutation(CreateNotif)
    const navigate = useNavigate()

    let checkUserLikes: boolean = false;

    const{ 
        data,
        refetch: refetchReply,
        loading,
        error,
    } = useQuery(QueryPostComment, {
        variables:{id: replyId}
    })

    if (loading) return <p>loading...</p>;
    if (error) return <p>Error...</p>;

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

    const handleLike = () => {
        likeComment({
            variables:{
                commentId: data.postComment?.id,
                userId: userContext.user.id
            }
        }).then((e) => {
            refetchReply().then((e) => {
                alert("Success")
                sendNotif(userContext.user.id, data.postComment.Commenter.id, "liked your reply")
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
                commentId: data.postComment?.id,
                userId: userContext.user.id
            }
        }).then((e) => {
            refetchReply().then((e) => {
                alert("success unlike")
            }).catch((e) => {
                alert(e)
            }).catch((e) => {
                alert(e)
            })
        })
    }

    data.postComment.Likes.map((likes: any) => {
        if(likes.User.id === userContext.user.id){
            checkUserLikes = true
        }
    })

    const text = data.postComment.comment.split(" ")
    

    return (
        <div>
            <div className='flex-row2 '>
                <div className='mr-2 mt-20 '>
                    <img src={data.postComment?.Commenter.ProfilePicture} className="homepage-picture" alt="" />
                </div>
                <div className='w-full border-border pl-20 mb-20 mr-20'>
                    <div className='ml-10'>
                        <div className='mb-min10'>
                            <p>
                                {data.postComment?.Commenter.name}
                            </p>
                            <p className='mt-10'>
                                <TemplateRichText texts={text}/>
                            </p>
                        </div>
                        <div className='mb-min10 mt-10'>
                            {checkUserLikes === false ? (
                                <div className='flex-row items-center'>
                                    <p className="cursor-pointer" onClick={handleLike}>
                                        <AiOutlineLike></AiOutlineLike>
                                    </p>
                                    <p>{data.postComment?.Likes.length}</p>
                                </div>
                            ):(
                                <div className='flex-row items-center mr-2'>
                                <p className='cursor-pointer' onClick={handleUnlike}>
                                    <AiFillLike></AiFillLike>
                                </p>
                                <p>{data.postComment.Likes.length}</p>
                            </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostReplyComp