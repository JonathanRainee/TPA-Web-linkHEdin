import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MentionModalComp from './MentionModalComp'


const MentionHoverComp = ({ text }: { text: string }) => {

    const [ modalMention, setModalMention ] = useState(false)
    let firstIndexMentionTag = text.indexOf("[")
    let lastIndexMentionTag = text.indexOf("]")
    let mentionTagSubString = text.substring(firstIndexMentionTag + 1, lastIndexMentionTag)
    let firstIndexUserId = text.indexOf("(")
    let lastIndexUserId = text.indexOf(")")
    let userIdSubString = text.substring(firstIndexUserId + 1, lastIndexUserId)

    return (
        // <div>MentionHoverComp</div>
        <span >
            {modalMention === true && <MentionModalComp userId={userIdSubString}/>}    
            <Link  className='richText-a'
                // onMouseOver={() => setModalMention(true)} 
                // onMouseLeave={() => setModalMention(false)} 
                to = {`/Profile/${userIdSubString}`}>
                {mentionTagSubString}
            </Link>
            {" "}
        </span>
    )
}

export default MentionHoverComp