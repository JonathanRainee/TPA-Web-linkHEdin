import { useQuery, NetworkStatus } from '@apollo/client';
import React,  {useEffect, useState} from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { Oval } from 'react-loader-spinner';
import FooterComp from '../components/FooterComp';
import ModalPost from '../components/ModalPost';
import Navbar from '../components/Navbar'
import PostComp from '../components/PostComp';
import { UserAuth } from '../contexts/authContext';
import { QueryHashtag, QueryHashtags, QueryPost } from '../queries/queryUser';
import '../styles/logRes.scss'

function Home(){

    const userContext = UserAuth()
    const [ loding, setLoding ] = useState(true)
    const [ postToggle, setPostToggle ] = useState(false)
    const [hasMorePost, setHasMorePost] = useState(true)
    console.log(userContext)
    const { loading: loadingPost, data: dataPost, error: errorPost, refetch: refetchPost, fetchMore, networkStatus } = useQuery(QueryPost, {
        variables: {
            userId: userContext.user.id,
            Limit: 5,
            Offset: 0,
        },
        notifyOnNetworkStatusChange: true
    })

    const { loading: loadingHashtag, data: dataHashtag, error: errorHashtag, refetch: refetchHashtag } = useQuery(QueryHashtags)

    if(!loadingPost){
        // console.log(dataPost.Posts[0])
    }
    
    useEffect(() => {
        refetchPost()
    }, [])

    const togglePost = () => {
        setPostToggle(!postToggle)
    } 

    if(!dataPost || !dataHashtag){
        return(
            <div className='center-all mb-10 mt-10'>loadingzzz...</div>
        )
    }

    window.onscroll = () => {
        if(window.innerHeight + window.scrollY > document.body.offsetHeight){
            if(hasMorePost && networkStatus !== NetworkStatus.fetchMore){
                fetchMore({
                    variables:{ Offset: dataPost.Posts.length},
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                        if(fetchMoreResult.Posts.length === 0){
                            setHasMorePost(false)
                            return previousResult
                        }else{
                            setHasMorePost(true)
                            return{
                                Posts: [...previousResult.Posts, ...fetchMoreResult.Posts]
                            }
                        }
                    }
                })
            }
        }
    }

    return (
        <div className="flex-row flex">
            <div className='linkedin-bg fullscreen center-col'>
                {
                    postToggle === true && (
                        <ModalPost refetchHashtag={refetchHashtag} dataHashtags={dataHashtag} toggle={togglePost} refetchPost={refetchPost}></ModalPost>
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
                                    console.log(post);
                                    
                                    let initialValueTotalComment = post.Comments.length
                                    post.Comments.map((comment: any) => {
                                        initialValueTotalComment -= comment.Replies.length
                                    })
                                    return(
                                        <PostComp  key = {post.id} initialValueTotalComment = {initialValueTotalComment} postData = {post} refectPostData={refetchPost} dataHashtags = {dataHashtag} refetchHashtag = {refetchHashtag}></PostComp>
                                    )
                                })
                                // <p>ada</p>
                            )
                        }
                        {/* <div className="lds-ring"><div></div><div></div><div></div><div></div></div> */}
                        {
                            networkStatus === 3 && (
                                <div className='center-all mb-10 mt-10'>
                                    <Oval
                                        height={80}
                                        width={80}
                                        color="#000000"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        visible={true}
                                        ariaLabel='oval-loading'
                                        secondaryColor="#000000"
                                        strokeWidth={2}
                                        strokeWidthSecondary={2}
                                    />
                                </div>
                            )
                        }
                    </div>
                </div>
                {/* <div className='mb-20'></div> */}
            </div>
            <FooterComp></FooterComp>
        </div>
    )
}

export default Home