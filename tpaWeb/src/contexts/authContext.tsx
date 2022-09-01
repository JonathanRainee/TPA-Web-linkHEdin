import React from 'react'
import { createContext, useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import useLocalStorage from './useLocalStrg';

const UserContext = createContext(null as any);

export default function AuthContextProvider({children}:any){
    const [ user, setUser ] = useLocalStorage("credentials", {})
    const [ token, setToken] = useLocalStorage("token", {})
    
    return(
        <UserContext.Provider value={{user, setUser, token, setToken}}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = ()=>{
    return useContext(UserContext)
}
