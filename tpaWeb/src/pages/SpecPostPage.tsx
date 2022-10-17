import { useQuery } from '@apollo/client'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FooterComp from '../components/FooterComp'
import Navbar from '../components/Navbar'
import PostComp from '../components/PostComp'
import { UserAuth } from '../contexts/authContext'
import { QueryHashtags, QueryPost } from '../queries/queryUser'

const SpecPostPage = ({ post }: any) => {

    let initialValueTotalComment = post.Comments.length
    const { loading: loadingHashtag, data: dataHashtag, error: errorHashtag, refetch: refetchHashtag } = useQuery(QueryHashtags)
    const userContext = UserAuth()

    const { loading: loadingPost, data: dataPost, error: errorPost, refetch: refetchPost, fetchMore, networkStatus } = useQuery(QueryPost, {
        variables: {
            userId: userContext.user.id,
            Limit: 5,
            Offset: 0,
        },
        notifyOnNetworkStatusChange: true
    })

    return (
        <div className="flex-row flex">
            <div className='linkedin-bg fullscreen center-col'>
                <Navbar></Navbar>
                <PostComp initialValueTotalComment = {initialValueTotalComment} refectPostData={refetchPost} postData = {post} dataHashtags = {dataHashtag} refetchHashtag = {refetchHashtag}></PostComp>
                <FooterComp></FooterComp>
            </div>
        </div>
    )
}

export default SpecPostPage