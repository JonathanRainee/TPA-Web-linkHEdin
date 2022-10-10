import { useState, useEffect, lazy } from 'react'
// import reactLogo from './assets/react.svg'
// import './App.css'
import '../styles/style.scss'
import '../styles/logRes.scss'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/Logo.png'
import { UserAuth } from '../contexts/authContext'
import { useLazyQuery, useMutation } from '@apollo/client'
import { GetUsrByEmail, LoginAcc, LoginWithOutPass } from '../queries/queryUser'
import { BsGoogle } from 'react-icons/bs'
import jwtDecode from 'jwt-decode';
import useLocalStorage from '../contexts/useLocalStrg'

function login() {
    const [ count, setCount ] = useState(0)
    const [ email, setEmail ] = useState("")
    const [ pass, setPass ] = useState("")
    const [ error, setError ] = useState("")
    const navigate = useNavigate()
    const userContext = UserAuth()
    const [ userLog ] = useMutation(LoginAcc)
    const [ getUserEmail ] = useLazyQuery(GetUsrByEmail)
    const [ logwoPass ] = useMutation(LoginWithOutPass)
    const [ userId, setUserId ] = useLocalStorage("userId", "")
    const [ token, setToken ] = useLocalStorage("token", "")

    useEffect(() => {
        //@ts-ignore
        google.accounts.id.initialize({
            client_id: "932657777084-bdafa7fs26oqqglphokuhn7e4dofht1q.apps.googleusercontent.com",
            callback: googleLogin
        })
        //@ts-ignore
        google.accounts.id.renderButton(
            document.getElementById("gbutton"),
            {theme: "outline", size: "large"}
        )
    }, [])

    const googleLogin = (response:any)=>{
        // console.log("")
        type User = {
            given_name: String,
            email: String,
            family_name: String,
            token: String
        }
        const user:User = jwtDecode(response.credential)
        console.log(user)
        getUserEmail({variables:{email: user.email}}).then((e)=>{
            console.log(e.data)
            logwoPass({variables:{email: user.email}}).then((x)=>{
                console.log(x.data)
                userContext.setUser(x.data.LoginWOPass.user)
                userContext.setToken(x.data.LoginWOPass.token)
                navigate('/home')
            }).catch((err)=>{
                console.log(err)
                setError("Wrong credentials")
            })
        })
    }
    

    const log = (e:any) =>{
        e.preventDefault()
        userLog(
            {
                variables:{
                    email: email,
                    password: pass 
                }
            }
        ).then((e)=>{
            console.log(e)
            const data = e.data.Login
            console.log(e.data.Login)
            console.log(data.user)
            setUserId(data.user)
            setToken(data.token)
            // console.log(e.data.Login)
            // userContext.setUser(e.data.Login.user)
            navigate('/home')
            // console.log("masuk")
            // alert("A")
        })
        // .catch((err)=>{
        //     console.log(err)
        //     setError(err)
        //     alert(err)
        // })
        console.log(email, pass)
    }

    const handleForgot = async () => {
        navigate('/forgot')
    }

    return (
        <div className='fullscreen'>
            <div className="" id='main'>
                <img src={Logo} alt="" className='logo' />
                <div className="App" id='main'>
                    <form action="" className='form'>
                        <h1 className='login'>Sign in</h1>
                        <p className='text '>Stay updated on your professional world</p>
                        <input onChange={(e)=>setEmail(e.target.value)} className='inp text-input' type="text" placeholder='email'/>
                        <input onChange={(e)=>setPass(e.target.value)} className='inp text-input' type="password" placeholder='password'/>
                        <p onClick={handleForgot} className='forget'>Forgot password?</p>
                        <button onClick={log} className='btn si btnBlue blue-button'>Sign in</button>
                        {/* <button className='btn sig btnWhite white-button'>Sign in with Google</button> */}
                        <div id='gbutton'></div>
                        <div className='regis'>
                            <p>New to LinkedIn?</p>
                            <Link to={'/register'}>
                                <p className='txt'>Join now</p>
                            </Link>
                        </div>
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

export default login