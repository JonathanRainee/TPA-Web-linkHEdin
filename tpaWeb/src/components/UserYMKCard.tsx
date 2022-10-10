import React from 'react'
import UserYMKComp from './UserYMKComp'

const UserYMKCard = ({ userSuggestionData }: any) => {
    console.log(userSuggestionData)

    return (
        <div>
            {
                userSuggestionData.map((data: any) => {
                    return(
                        <UserYMKComp key={data.id} userSuggestionData={data}></UserYMKComp>
                    )
                })  
            }
        </div>
    )
}

export default UserYMKCard