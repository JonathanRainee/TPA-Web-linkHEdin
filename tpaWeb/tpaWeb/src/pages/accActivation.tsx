import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { useParams, useNavigate } from 'react-router-dom'
import { ActivateAcc, GetLink } from '../queries/queryUser'
import Error404Page from './Error404Page'


const AccActivation = () => {
    const [ activate ] = useMutation(ActivateAcc)
    const [Error, setError] = useState(false);
    const { id } = useParams()
    const navigate = useNavigate()

    const { loading, error, data } = useQuery(GetLink, {
        variables:{
            id: id
        }
    })

    useEffect(()=>{
        if(!loading){
            if(error){
                console.log(error)
                setError(true)
            }else{
                const userID = data.getActivationLink.userID
                activate({variables:{id:userID}}).then(  ()=>{
                    console.log("activation completed")
                    navigate('/')
                })
                console.log(userID)
            }
        }

    }, [loading])

    return (
        <div>
            {
                Error === true && (
                    <Error404Page></Error404Page>
                )
            }
        </div>
    )
}

export default AccActivation