import { gql } from "@apollo/client";

export const RegisterAcc = gql`
    mutation Register($name: String! ,$email: String! ,$password:String!){
        Register(input:{name: $name, email:$email, password:$password})
    }
`

export const LoginAcc = gql`
    mutation Login($email:String!, $password:String!){
        Login(email:$email, password:$password)
    }
`

export const ActivateAcc = gql`
    mutation ActivateAcount ($id:ID!){
        ActivateAcount(id:$id)
    }
`

export const GetLink = gql`
    query getActivationLink ($id: String!){
        getActivationLink(id:$id){
            id,
            userID
        }
    }
`

export const SendForgotLink = gql `
    mutation SendForgotLink ($userEmail: String!){
        createForgetLink(userEmail: $userEmail)
    }
`

export const ResetPassword = gql`
    mutation ResetPassword ($id: String!, $newPass: String!){
        ResetPass(id: $id, newPass: $newPass)
    }
`

export const UpdateUser = gql`
    mutation UpdateUser($id: ID!, $input: UpdateUser!){
        UpdateUser(id: $id, input: $input){
            name
            id
        }
    }
`

export const FindUser = gql`
    query FindUser($id: ID!){
        user(od: $id){
            id,
            name,
            emai,
            verified,
            ProfilePicture,
            Backgroundpicture
        }
    }
`

export const UploadProfilePic = gql `
    mutation UploadProfilePic($id: ID!, $newProfilePicture: String!){
        UploadProfilePicture(id: $id, newProfilePicture: $newProfilePicture)
    }
`

// export const CreateEdu = gql`
//     mutation CreateEdu($UserID: ID!, $School: String!, $Degree: String!, $FieldOfStudy: String!, $StartDate: String!, $EndDate: String!, $Grade: Float!, $Activities: String!, $Description: $String!){
//         createEducation(input:{
//             UserID: $UserID, 
//             School: $School, 
//             Degree: $Degree, 
//             FieldOfStudy: $FieldOfStudy,  
//             StartDate: $StartDate, 
//             EndDate: $EndDate, 
//             Grade: $Grade, 
//             Activities: $Activities, 
//             Description: $Description
//         })
//     }
// `

export const CreateEdu = gql`
    mutation CreateEdu ($UserID:ID!, $School:String!, $Degree:String!, $FieldOfStudy:String!, $StartDate:String!, $EndDate:String!, $Grade:Float!, $Activities:String!, $Description:String!){
        createEducation(input:{
            UserID:$UserID,
            School:$School,
            Degree:$Degree,
            FieldOfStudy:$FieldOfStudy,
            StartDate:$StartDate,
            EndDate:$EndDate,
            Grade:$Grade,
            Activites:$Activities,
            Description:$Description
        })
    }
`

export const GetUsrEducation = gql `
    query GetUsrEducation($UserID: ID!){
        userEducation(UserID: $UserID){
            ID,
            UserID,
            School,
            Degree,
            FieldOfStudy,
            StartDate,
            EndDate,
            Grade,
            Activites
        }
    }
`

export const GetUsrByID = gql `
    query GetUsrByID($UserID: ID!) {
        getUser(id: $UserID) {
            id
            name
            email
            password
            verified
            ProfilePicture
            Backgroundpicture
            followed_user
            connected_user
            connect_request
        }
    }
`

export const DelEdu = gql `
    mutation DelEdu($id: String!){
        deleteEducation(id: $id)
    }
`

export const UpdtEdu = gql `
    mutation UpdtEdu($id: String!, $UserID: ID!, $School: String!, $Degree: String!, $FieldOfStudy: String!, $StartDate: String!, $EndDate: String!, $Grade: Float!, $Activites: String!, $Description: String!){
        updateEducation(
            id: $id
            input:{
                UserID: $UserID,
                School: $School,
                Degree: $Degree,
                FieldOfStudy: $FieldOfStudy,
                StartDate: $StartDate,
                EndDate: $EndDate,
                Grade: $Grade,
                Activites: $Activites,
                Description: $Description
            }
        )
    }
`

export const CreateExperience = gql`
    mutation CreateExperience($UserID:String!, $Title:String!, $EmploymentType:String!, $CompanyName:String!, $Location:String!, $Active:Boolean!, $StartYear:String!, $EndYear:String!, $Industry:String!, $Description:String!){
        createExperience(input:{
            UserID:$UserID,
            Title:$Title,
            EmploymentType:$EmploymentType,
            CompanyName:$CompanyName,
            Location:$Location,
            Active:$Active,
            StartYear:$StartYear,
            EndYear:$EndYear,
            Industry:$Industry,
            Description:$Description
        })
    }
`

export const GetUsrExperiences = gql`
    query GetUsrExperiences($UserID: ID!){
        userExperience(UserID: $UserID){
            ID,
            UserID,
            Title,
            EmploymentType,
            CompanyName,
            Location,
            Active,
            StartYear,
            EndYear,
            Industry,
            Description
        }
    }
`

export const DelExp = gql `
    mutation DelExp($id: ID!){
        deleteExperience(id: $id)
    }
`

export const UpdtExp = gql `
    mutation UpdtExp($id: ID!, $UserID:String!, $Title:String!, $EmploymentType:String!, $CompanyName:String!, $Location:String!, $Active:Boolean!, $StartYear:String!, $EndYear:String!, $Industry:String!, $Description:String!){
        updateExperience(
            id: $id
            input:{
                UserID:$UserID,
                Title:$Title,
                EmploymentType:$EmploymentType,
                CompanyName:$CompanyName,
                Location:$Location,
                Active:$Active,
                StartYear:$StartYear,
                EndYear:$EndYear,
                Industry:$Industry,
                Description:$Description
            }
        )
    }
`
export const RequestConnect = gql `
    mutation RequestConnect($id: String!, $recipient: String!){
        ReqConnect(id: $id, recipientID: $recipient)
    }
`

export const AcceptConnect = gql `
    mutation AcceptConnect($id: String!, $senderID: String!){
        AcceptReqConnect(id: $id, senderID: $senderID)
    }
`