import { useQuery } from '@apollo/client';
import React,  {useEffect, useState} from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import ModalPost from '../components/ModalPost';
import Navbar from '../components/Navbar'
import PostComp from '../components/PostComp';
import { UserAuth } from '../contexts/authContext';
import { QueryPost } from '../queries/queryUser';
import '../styles/logRes.scss'

function Home(){

    const userContext = UserAuth()
    const [ postToggle, setPostToggle ] = useState(false)
    const { loading: loadingPost, data: dataPost, error: errorPost, refetch: refetchPost } = useQuery(QueryPost, {
        variables: {
            userId: userContext.user.id,
            Limit: 5,
            Offset: 0,
        },
        notifyOnNetworkStatusChange: true
    })
    if(!loadingPost){
        console.log(dataPost.Posts[0])
    }
    
    console.log(userContext)

    useState(() => {
        refetchPost()
    },)

    const togglePost = () => {
        setPostToggle(!postToggle)
    } 

    if(loadingPost){
        return(
            <div>loading...</div>
        )
    }

    return (
        <div className="flex-row flex">
            <div className='linkedin-bg fullscreen center-col'>
                {
                    postToggle === true && (
                        <ModalPost toggle={togglePost} refetchPost={refetchPost}></ModalPost>
                    )
                }
                <Navbar></Navbar>
                <div className='all-center flex-col '>
                    <div className='all-center'>
                        <button className='add-button2' onClick={togglePost}>
                            <AiOutlinePlus className='plus-logo2 mr-10'></AiOutlinePlus>
                            Create Post
                        </button>
                    </div>
                    <div className=''>
                        {/* <p className='text-black text-l bold'>Posts</p> */}
                        {
                            dataPost.Posts.length == 0 ? (
                                <p>empty</p>
                            ) : (
                                dataPost.Posts.map((post: any) => {
                                    return(
                                        <PostComp key = {post.id} postData = {post} refectPostData={refetchPost}></PostComp>
                                    )
                                })
                                // <p>ada</p>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home