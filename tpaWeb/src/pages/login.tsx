    import { useState } from 'react'
    // import reactLogo from './assets/react.svg'
    // import './App.css'
    import '../styles/style.scss'
    import '../styles/logRes.scss'
    import { Link, useNavigate } from 'react-router-dom'
    import Logo from '../assets/Logo.png'
    import { UserAuth } from '../contexts/authContext'
    import { useMutation } from '@apollo/client'
    import { LoginAcc } from '../queries/queryUser'

    function login() {
        const [ count, setCount ] = useState(0)
        const [ email, setEmail ] = useState("")
        const [ pass, setPass ] = useState("")
        const [ error, setError ] = useState("")
        const navigate = useNavigate()
        const userContext = UserAuth()
        const [ userLog ] = useMutation(LoginAcc)

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
                console.log(e.data.Login)
                userContext.setUser(e.data.Login.user)
                navigate('/home')
                // console.log("masuk")
                // alert("A")
            }).catch((err)=>{
                console.log(err)
                setError(err)
                alert(err)
            })
            console.log(email, pass)
        }

        const handleForgot = async () => {
            navigate('/forgot')
        }

        return (
            <div className='fullscreen'>
                <div className="box" id='main'>
                    <img src={Logo} alt="" className='logo' />
                    <div className="App" id='main'>
                        <form action="" className='form'>
                            <h1 className='login'>Sign in</h1>
                            <p className='text '>Stay updated on your professional world</p>
                            <input onChange={(e)=>setEmail(e.target.value)} className='inp text-input' type="text" placeholder='email'/>
                            <input onChange={(e)=>setPass(e.target.value)} className='inp text-input' type="password" placeholder='password'/>
                            <p onClick={handleForgot} className='forget'>Forgot password?</p>
                            <button onClick={log} className='btn si btnBlue blue-button'>Sign in</button>
                            <button className='btn sig btnWhite white-button'>Sign in with Google</button>
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