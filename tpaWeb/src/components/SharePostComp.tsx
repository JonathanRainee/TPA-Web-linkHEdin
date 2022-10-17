import React from 'react'
import TemplateRichText from './TemplateRichText'

const SharePostComp = ( { postData }: any) => {

    console.log(postData)
    return (
        // <p>safasd</p>
        <div className='ml-20 border-border mr-20 mb-20'>
            <div>
                <div className='flex-row ml-5'>
                    {
                        postData.SharePost.Sender.ProfilePicture === "" ?
                        (<img className='message-profile-pic'  src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'/>) :
                        (<img className='message-profile-pic' src={postData.SharePost.Sender.ProfilePicture}/>)
                    }
                    <p className='ml-5'>{postData.SharePost.Sender.name}</p>
                </div>
                
            </div>
            <div>
                <div className='ml-10'>
                    <p><TemplateRichText texts={postData.SharePost.text.split(" ")}></TemplateRichText></p>
                </div>
                <div className='w-full'>
                    {
                        postData.photoUrl !== "" && <img  className="cover" src={postData.SharePost.photoUrl} alt="" />
                    }
                    {
                        postData.videoUrl  !== "" && <img className="cover" src={postData.SharePost.videoUrl } alt="" />
                    }
                </div>
            </div>
        </div>
    )
}

export default SharePostComp