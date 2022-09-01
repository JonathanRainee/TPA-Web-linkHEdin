import { useState } from 'react'
import '../styles/style.scss'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/Logo.png'
import { RegisterAcc } from '../queries/queryUser'
import { useMutation, useQuery } from '@apollo/client'

function Register(){

    const [ email, setEmail ] = useState("")
    const [ pass, setPass ] = useState("")
    const [ username, setUsername ] = useState("")
    const [ error, setError ] = useState(false)
    const [ registerAcc ] = useMutation(RegisterAcc)
    const navigate = useNavigate()

    const handleRegis = async () => {
        console.log(email, pass)
    }

    const regis = (e:any) => {
        e.preventDefault()
        registerAcc(
            {
                variables:{
                    email: email,
                    name: username,
                    password: pass
                }
            }
        ).then(()=>{
            setError(false);
            navigate('/')
        }).catch((err)=>{
            // console.log(err)
            // alert(err)
            setError(true)
        })
        console.log(email, username, pass)
    }

    

    return (
        <div className='fullscreen'>
            <div className="box" id='main'>
                <img src={Logo} alt="" className='logo' />
                <div className="App" id='main'>
                    <form action="" className='form'>
                        <h1 className='login'>Sign up</h1>
                        <p className='text '>Stay updated on your professional world</p>
                        <input onChange={(e)=>setUsername(e.target.value)} className='inp text-input' type="text" placeholder='username'/>
                        <input onChange={(e)=>setEmail(e.target.value)} className='inp text-input' type="text" placeholder='email'/>
                        <input onChange={(e)=>setPass(e.target.value)} className='inp text-input' type="password" placeholder='password'/>
                        <button onClick={regis} className='btn si btnBlue blue-button'>Agree & join</button>
                        <button className='btn sig btnWhite white-button'>Sign up with Google</button>
                        <div className='regis'>
                            <p>Already on LinkedIn?</p>
                            <Link to={'/'}>
                                <p className='txt'>Sign in</p>
                            </Link>
                        </div>
                    </form>
                    {error === true && (
                        <p>email already exist</p>
                    )}
                </div>
                <div className='footer'>
                <p>footer</p>
                </div>
                {/* <h1 onClick={handleRegis}>register</h1> */}
            </div>
        </div>
    )
}

export default Register