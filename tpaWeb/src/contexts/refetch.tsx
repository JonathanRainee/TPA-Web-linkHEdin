import { useQuery } from '@apollo/client'
import React, { createContext, useContext } from 'react'
import { GetUsrByID } from '../queries/queryUser'
import { UserAuth } from './authContext'

const Refetcher = createContext(null as any)

export default function RefetchContextProvider({children}: any){
    const userContext = UserAuth()
    // const user = useQuery(GetUsrByID, {variables: {UserID: userContext.user.id}})

    const refreshUser = () => {
        // user.refetch().then((x) => {
        //     userContext.setUser(x.data.getUser)
        // })
        console.log("asf")
    }

    return(
        <Refetcher.Provider value = {{refreshUser}}>
            {children}
        </Refetcher.Provider>
    )
}

export const RefetchContext = () => {
    return useContext(Refetcher)
}