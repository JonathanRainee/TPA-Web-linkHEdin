import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import './App.css'
import '../styles/style.scss'
import '../styles/logRes.scss'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/Logo.png'
import { UserAuth } from '../contexts/authContext'
import { useMutation } from '@apollo/client'
import { SendForgotLink, LoginAcc } from '../queries/queryUser'

function ForgotPass() {
    const [ email, setEmail ] = useState("")
    const [ pass, setPass ] = useState("")
    const [ error, setError ] = useState("")
    const navigate = useNavigate()
    const userContext = UserAuth()
    const [ sendLink ] = useMutation(SendForgotLink)
    
    const handleLogin = async () => {
        console.log(email, pass)
    }

    const handleBack = async () =>{
        navigate('/')
    }

    const send = (e:any) => {
        e.preventDefault()
        sendLink(
            {
                variables:{
                    userEmail:email
                }
            }
        ).then((e)=>{
            console.log(e)
            // setError(false);
            navigate('/')
            // if(e = )
        }).catch((err)=>{
            console.log(err)
            setError(err)
            alert(err)
        })
        console.log(email)
    }

    return (
        <div className='fullscreen'>
            <div className="box" id='main'>
                <img src={Logo} alt="" className='logo' />
                <div className="App" id='main'>
                    <form action="" className='form-forget'>
                        <h1 className='login'>Forget  </h1>
                        <input onChange={(e)=>setEmail(e.target.value)} className='inp text-input' type="text" placeholder='email'/>
                        <button onClick={send} className='btn si btnBlue blue-button'>Send Email</button>
                        <button onClick={handleBack} className='btn sig btnWhite white-button'>Back</button>
                        
                    </form>
                </div>
                <div className='footer'>
                    <p>footer</p>
                </div>
                {/* <h1 onClick={handleRegis}>register</h1> */}
            </div>
        </div>
    )
}

export default ForgotPass