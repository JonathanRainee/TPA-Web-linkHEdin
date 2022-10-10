import React from 'react'
import Logo from '../assets/Logo.png'

const FooterComp = () => {
    const links = [
        { title: "About", link: "https://about.linkedin.com/" },
        { title: "Accessibility", link: "https://www.linkedin.com/accessibility" },
        { title: "Safety Center", link: "https://safety.linkedin.com/" },
        { title: "Community Guidelines", link: "https://www.linkedin.com/legal/professional-community-policies", },
        { title: "Careers", link: "https://careers.linkedin.com/" },
    ]

    return (
        // <div>FooterComp</div>
        <>
            <footer className="footer w-full">
                <div>
                    <div className='row'>
                    <img src={Logo} width="130" height="80"></img>
                        {links.map((item) => (
                        <div className="footer-column" key={item.title}>
                            <a
                            className="link"
                            onClick={() => window.open(item.link)}
                            key={item.link}
                            >
                            {item.title}
                            </a>
                        </div>
                        ))}
                        {/* {links.map((item => {
                            <div className="footer-column">
                                <a className="link" onClick={() => window.open(item.link)} key = {item.link}>{item.title}</a>
                            </div>
                        }))} */}
                    </div>
                </div>
            </footer>
        </>
    )
}

export default FooterComp