import { useQuery } from '@apollo/client';
import React from 'react'
import { createContext, useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { GetUsrByID } from '../queries/queryUser';
import useLocalStorage from './useLocalStrg';

const UserContext = createContext(null as any);

export default function AuthContextProvider({children}:any){
    const [ user, setUser ] = useLocalStorage("credentials", {})
    const [ userId, setUserId ] = useLocalStorage("userId", "")
    const [ token, setToken] = useLocalStorage("token", {})
    // console.log(userId)

    const userDB = useQuery(GetUsrByID, {
        variables:{
            UserID: userId
        }
    })

    // console.log(userDB)

    if(userDB.loading) return <p>Fetching datax...</p>
    if(userDB.error) console.log(userDB.error)
    // console.log(userDB.data)
    return(
        <UserContext.Provider value={{user: userDB.data.getUser, token, refetchUser: userDB.refetch}}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = ()=>{
    return useContext(UserContext)
}
