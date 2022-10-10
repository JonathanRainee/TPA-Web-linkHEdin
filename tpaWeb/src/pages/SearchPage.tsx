import { NetworkStatus, useQuery } from '@apollo/client'
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import FIlterComp from '../components/FIlterComp'
import FooterComp from '../components/FooterComp'
import Navbar from '../components/Navbar'
import PostComp from '../components/PostComp'
import UserSearchComp from '../components/UserSearchComp'
import { UserAuth } from '../contexts/authContext'
import { QueryHashtags, QuerySearch, SearchPost, SearchUser } from '../queries/queryUser'

const SearchPage = () => {

    const UserContext = UserAuth()
    const p = useParams()
    const [filter, setFilter] = useState("")
    const [hasMorePost, setHasMorePost] = useState(true)
    const [hasMoreUser, setHasMoreUser] = useState(true)
    const [displayInputComment, setDisplayInputComment] = useState("hidden")

    useEffect(() => {
        if (hasMoreUser) {
            setDisplayInputComment("flex")
        } else {
            setDisplayInputComment("hidden")
        }
    })
    
    const {
        loading: loadingSearch,
        data: dataSearch,
        error: errorSearch,
        refetch: refetchSearch,
    } = useQuery(QuerySearch, {
        variables: { Keyword: p.text, userID: UserContext.user.id},
    })

    const {
        loading: loadingHashtag,
        data: dataHashtag,
        error: errorHashtag,
        refetch: refetchHashtag,
    } = useQuery(QueryHashtags)

    const {
        loading: loadingPost,
        error: errorPost,
        data: dataPost,
        fetchMore: fetchMorePost,
        refetch: refetchPost,
        networkStatus: networkStatusPost,
    } = useQuery(SearchPost, {
        variables: { Keyword: p.text, Limit: 2, Offset: 0 },
        notifyOnNetworkStatusChange: true,
    })

    const {
        loading: loadingUser,
        error: errorUser,
        data: dataUser,
        fetchMore: fetchMoreUser,
        refetch: refetchUser,
        networkStatus: networkStatusUser,
    } = useQuery(SearchUser, {
        variables: { Keyword: p.text, Limit: 2, Offset: 0, userID: UserContext.user.id},
        notifyOnNetworkStatusChange: true,
    })

    useEffect(() => {
        UserContext.refetchUser()
        refetchPost()
        refetchUser()
    }, [])

    if(!dataUser || !dataPost || !dataHashtag){
        return <p>Loading...</p>
    }

    if(errorUser || errorPost || errorHashtag){
        return <p>Error...</p>
    }

    window.onscroll = () => {
        if(window.innerHeight + window.scrollY > document.body.offsetHeight){
            if(hasMorePost && networkStatusPost !== NetworkStatus.fetchMore){
                fetchMorePost({
                    variables:{ Offset: dataPost.SearchPost.Posts.length},
                    updateQuery: (previosResult, {fetchMoreResult}) => {
                        if(fetchMoreResult.SearchPost.Posts.length === 0){
                            setHasMorePost(false)
                            return previosResult
                        }else{
                            setHasMorePost(true)
                            return {
                                SearchPost:{
                                    Posts: [
                                        ...previosResult.SearchPost.Posts,
                                        ...fetchMoreResult.SearchPost.Posts
                                    ]
                                }
                            }
                        }
                    }
                })
            }
        }
    }

    const handelLoadMoreUser = () => {
        fetchMoreUser({
            variables: {Offset: dataUser.SearchUser.Users.length},
            updateQuery: (previousResult, {fetchMoreResult}) => {
                if(fetchMoreResult.SearchUser.Users.length + previousResult.SearchUser.Users.length === dataSearch.Search.Users.length){
                    setHasMoreUser(false)
                }
                if(fetchMoreResult.SearchUser.Users.length === 0){
                    return previousResult
                }else{
                    return{
                        SearchUser: {
                            Users: [
                                ...previousResult.SearchUser.Users,
                                ...fetchMoreResult.SearchUser.Users
                            ]
                        }
                    }
                }
            }
        })
    }

    console.log(dataUser)
    console.log(dataSearch)
    console.log(dataHashtag)
    console.log(dataPost)

    return (
        <div className="flex-row flex">
            <div className='linkedin-bg fullscreen center-col'>
                <Navbar></Navbar>
                <FIlterComp setFilter={setFilter}></FIlterComp>
                {filter === "Post" ? null : (
                    <div>
                        <div className='profile white-bg border-border'>
                            <div className='flex-row w-full space-between'>
                                <div className='flex-col'>
                                    <p className='text-black text-l bold'>Users</p>
                                    {dataUser.SearchUser.Users.length === 0 && (
                                        <>
                                            <p>Empty</p>
                                        </>
                                    )}
                                    {dataUser.SearchUser.Users.map((user: any) => {
                                        return(
                                            <UserSearchComp key = {user.id} user={user} refetchUser={refetchUser}></UserSearchComp>
                                        )
                                    })}
                                    {dataUser.SearchUser.Users.length !== 0 && displayInputComment === "flex" && hasMoreUser == true && (
                                        <div className=' mt-20'>
                                            <button className='send-button2' onClick={handelLoadMoreUser}>Load more user</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {filter === "User" ? null : (
                    <div>
                        {/* <div className='profile white-bg border-border'>
                            <div className='flex-row w-full space-between'> */}
                                <div className='flex-col'>
                                    <p className='text-black text-l bold ml-20'>Posts</p>
                                    {dataPost.SearchPost.Posts.length === 0 && (
                                        <>
                                            <p>Empty</p>
                                        </>
                                    )}
                                    {dataPost.SearchPost.Posts.map((post: any) => {
                                        let initialValueTotalComment = post.Comments.length
                                        post.Comments.map((comment: any) => {
                                            initialValueTotalComment -= comment.Replies.length;
                                        })
                                        return (
                                            <PostComp  key = {post.id} initialValueTotalComment = {initialValueTotalComment} postData = {post} refectPostData={refetchPost} dataHashtags = {dataHashtag} refetchHashtag = {refetchHashtag}></PostComp>
                                        )
                                    })}
                                </div>
                            </div>
                    //     </div>
                    // </div>
                )}
            </div>
            <FooterComp></FooterComp>
        </div>
    )
}

export default SearchPage