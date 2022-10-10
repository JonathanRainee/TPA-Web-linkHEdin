import React, { useState } from 'react'
import { Link } from "react-router-dom";
import ModalHover from "./ModalHover";

const HoverMention = ({ text }: { text: string }) => {

    const [modalMention, setModalMention] = useState(false);

    let firstIndexMentionTag = text.indexOf("[");
    let lastIndexMentionTag = text.indexOf("]");
    let mentionTagSubString = text.substring(firstIndexMentionTag + 1, lastIndexMentionTag);

    let firstIndexUserId = text.indexOf("(");
    let lastIndexUserId = text.indexOf(")");
    let userIdSubString = text.substring(firstIndexUserId + 1, lastIndexUserId);

    return (
        // <div>HoverMention</div>
        <span style={{position: "relative"}}>
            {modalMention === true && <ModalHover userId = {userIdSubString}/>}
            <Link to={`/profile/${userIdSubString}`}>
                {mentionTagSubString}
            </Link>
        </span>
    )
}

export default HoverMention