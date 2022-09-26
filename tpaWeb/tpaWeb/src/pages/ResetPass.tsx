import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import './App.css'
import '../styles/style.scss'
import '../styles/logRes.scss'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Logo from '../assets/Logo.png'
import { UserAuth } from '../contexts/authContext'
import { useMutation, useQuery } from '@apollo/client'
import { SendForgotLink, LoginAcc, ResetPassword, GetLink } from '../queries/queryUser'

function ResetPass() {
    const { id } = useParams()
    const [ pass, setPass ] = useState("")
    const [ confPass, setConfPass ] = useState("")
    // const [ error, setError ] = useState("")
    const navigate = useNavigate()
    const userContext = UserAuth()
    const [ResetPasswords] = useMutation(ResetPassword)

    const { loading, error, data } = useQuery(GetLink, {
        variables:{
            id: id
        }
    })


    const reset = (e: any) =>{
        e.preventDefault()
        if(!loading){
            console.log("uda ad")
            const userID = data.getActivationLink.userID

            if(pass !== confPass){
                console.log(userID)
                alert("Password and confirmation password didn't match")
            }else if(pass.length === 0){
                alert("Please fill the password!")
            }else{
                ResetPasswords({variables:
                        {
                            id:userID, 
                            newPass: pass
                        }
                    }
                ).then(() => {
                    console.log("password changed")
                    navigate('/')
                }).catch((err) => {
                    console.log(err)
                })
            }
        }
    }

    return (
        <div className='fullscreen'>
            <div className="" id='main'>
                <img src={Logo} alt="" className='logo' />
                <div className="App" id='main'>
                    <form action="" className='form-forget'>
                        <h1 className='reset'>Reset password  </h1>
                        <input onChange={(e)=>setPass(e.target.value)} className='inp text-input' type="password" placeholder='Password'/>
                        <input onChange={(e)=>setConfPass(e.target.value)} className='inp text-input' type="password" placeholder='Confirm password'/>
                        <button onClick={reset} className='btn si btnBlue blue-button'>Reset</button>
                    </form>
                </div>
                <div className='footer'>
                    <p>footer</p>
                </div>
            </div>
        </div>
    )
}

export default ResetPass