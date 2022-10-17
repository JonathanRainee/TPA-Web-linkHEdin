import React from 'react'
import { HashtagRichText1, URLRichText, MentionRichText, HashtagRichText2 } from "../mod/RichText";
import { Link } from "react-router-dom";
import MentionHoverComp from './MentionHoverComp';

const TemplateRichText = ({ texts }: { texts: string[] }) => {
    return (
        <>
            {texts.map((text, index) => {
                if (text.match(HashtagRichText2)) {
                    console.log("match hastag2");
            
                    let firstIndexHastag = text.indexOf("[");
                    let lastIndexHastag = text.indexOf("]");
                    let hastagSubString = text.substring(
                        firstIndexHastag + 1,
                        lastIndexHastag
                    );
            
                    let hastagUrl = text.substring(firstIndexHastag + 2, lastIndexHastag);
                    return (
                        <Link className='richText-a' to={`/search/${hastagUrl}`} key={index}>
                            {hastagSubString}{" "}
                        </Link>
                    );
                } else if (text.match(HashtagRichText1)) {
                    let hastagUrl = text.substring(1, text.length);
                    return (
                        <Link className='richText-a' to={`/search/${hastagUrl}`} key={index}>
                            {text}{" "}
                        </Link>
                    );
                } else if (text.match(URLRichText)) {
                    return (
                        <a className='richText-a' href={text} key={index}>
                            {text}{" "}
                        </a>
                    );
                } else if (text.match(MentionRichText)) {
                    // return <p>d</p>;
                    return <MentionHoverComp text={text}  key ={index}/>
                    // incomplete
                } else {
                    return <span key={index}>{text} </span>;
                }
            })}
            </>
        );
}

export default TemplateRichText