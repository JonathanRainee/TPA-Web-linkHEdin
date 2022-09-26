import { gql } from "@apollo/client";

// user
export const RegisterAcc = gql`
    mutation Register($name: String! ,$email: String! ,$password:String!){
        Register(input:{name: $name, email:$email, password:$password})
    }
`

export const LoginWithOutPass = gql `
    mutation LoginWithOutPass($email: String!){
        LoginWOPass(email: $email)
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

export const UploadBgPic = gql `
    mutation UploadBgPic($id: String!, $newBanner: String!){
        UploadBannerPicture(id: $id, newBanner: $newBanner)
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
        Educations {
            ID
            UserID
            School
            Degree
            FieldOfStudy
            StartDate
            EndDate
            Grade
            Activites
        }
        Experiences {
            ID
            UserID
            Title
            EmploymentType
            CompanyName
            Location
            Active
            StartYear
            EndYear
            Industry
            Description
        }
        Visits {
            userId
            visitId
        }
        Follows {
            userId
            followId
        }
        Connections {
            id
            user1 {
                id
                name
                ProfilePicture
            }
            user2 {
                id
                name
                ProfilePicture
            }
        }
        ConnectRequests {
            id
            fromUser {
                id
                name
                ProfilePicture
            }
            toUser {
                id
                name
                ProfilePicture
            }
            message
        }
        Blocks {
            userId
            blockId
        }
    }
}

`

export const GetUsrByEmail = gql `
    query GetUsrByEmail($email: String!){
        getUserByEmail(email: $email){
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

export const UpdateName = gql `
    mutation UpdateName($id: String!, $newUsername: String!){
        UpdateUsername(id: $id, newUsername: $newUsername)
    }
`

export const UserYouMightKnow = gql `
    query UserYouMightKnow($userId: ID!) {
        userSuggestion(userId: $userId) {
            id
            name
            ProfilePicture
        }
    }
`
// user

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


//education
export const CreateEdu = gql`
    mutation CreateEdu ($UserID:ID!, $School:String!, $Degree:String!, $FieldOfStudy:String!, $StartDate:String!, $EndDate:String!, $Grade:Float!, $Activities:String!){
        createEducation(input:{
            UserID:$UserID,
            School:$School,
            Degree:$Degree,
            FieldOfStudy:$FieldOfStudy,
            StartDate:$StartDate,
            EndDate:$EndDate,
            Grade:$Grade,
            Activites:$Activities,
        }){
            UserID
            School
            Degree
            FieldOfStudy
            StartDate
            EndDate
            Grade
            Activites
        }
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

export const DelEdu = gql `
    mutation DelEdu($id: ID!){
        deleteEducation(id: $id){
            ID
            School
            Degree
            FieldOfStudy
            StartDate
            EndDate
            Grade
            Activites
        }
    }
`

export const UpdtEdu = gql `
    mutation UpdtEdu($id: ID!, $UserID: ID!, $School: String!, $Degree: String!, $FieldOfStudy: String!, $StartDate: String!, $EndDate: String!, $Grade: Float!, $Activites: String!){
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
            }
        ){
            UserID
            School
            Degree
            FieldOfStudy
            StartDate
            EndDate
            Grade
            Activites
        }
    }
`
//education

// exp
export const CreateExperience = gql`
    mutation CreateExperience($UserID:ID!, $Title:String!, $EmploymentType:String!, $CompanyName:String!, $Location:String!, $Active:Boolean!, $StartYear:String!, $EndYear:String!, $Industry:String!, $Description:String!){
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
        }){
            Title
            EmploymentType
            CompanyName
        }
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
        deleteExperience(id: $id){
            Title
        }
    }
`

export const UpdtExp = gql `
    mutation UpdtExp($id: ID!, $UserID:ID!, $Title:String!, $EmploymentType:String!, $CompanyName:String!, $Location:String!, $Active:Boolean!, $StartYear:String!, $EndYear:String!, $Industry:String!, $Description:String!){
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
                Description:$Description,
            }
        ){
            Title
            CompanyName
        }
    }
`

// exp


//connection
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

export const follow = gql `
    mutation follow($id: String!, $follow: String!){
        Follow(id: $id, follow: $follow)
    }
`

export const unfollow = gql `
    mutation unfollow($id: String!, $unfollow: String!){
        Unfollow(id: $id, unfollow: $unfollow)
    }
`

export const CreateBlock = gql `
    mutation addBlock($userId: ID!, $blockId: ID!){
        addBlock(userId:$userId , blockId:$blockId) {
            userId
            blockId
        }
    } 
`

export const DeleteBlock = gql `
    mutation DeleteBlock($userId:ID! , $blockId:ID!){
        deleteBlock(userId: $userId, blockId: $blockId){
            userId
            blockId
        }
    }
`
//connection

//follow
export const FollowUser = gql `
    mutation FollowUser($id1: ID!, $id2: ID!){
        Follow(id1:$id1 , id2:$id2)
    }
`

export const UnfollowUser = gql `
    mutation UnfollowUser($id1:ID! , $id2:ID!){
        Unfollow(id1: $id1, id2: $id2)
    }
`

//follow

//visit
export const VisitUser = gql`
    mutation VisisUser($id1: ID!, $id2: ID!){
        VisitUser(id1:$id1, id2:$id2)
    }
` 

//visit

//post
export const CreatePost = gql `
    mutation CreatePost($senderId:ID! , $text:String! , $photoUrl:String! , $videoUrl:String!){
        CreatePost(
            input:{
                senderId: $senderId,
                text: $text,
                photoUrl: $photoUrl,
                videoUrl: $videoUrl
            }
        ){
            id
            text
            photoUrl
            videoUrl
            Sender{
                id
                name
            }
        }
    }
`

export const CreateLikePost = gql `
    mutation CreateLikePost($postId: ID!, $userId: ID!){
        LikePost(postId: $postId, userId: $userId){
            postId
            userId
        }
    }
`

export const CreateUnlikePost = gql `
    mutation CreateUnlikePost($postId:ID! , $userId:ID!){
        UnLikePost(postId:$postId , userId:$userId){
            postId
            userId
        }
    }
`
//post

//comment
export const CreateComment = gql `
    mutation CreateComment($postId: ID!, $commenterId: ID!, $comment: String!){
        addComment(postId: $postId, commenterId: $commenterId, comment: $comment){
            id
            postId
            Commenter{
                name
                ProfilePicture
            }
            comment
            Likes{
                id
                commentId
                User{
                    id
                    name
                }
            }
            Replies{
                id
            }
        }
    }
`

export const CreateReply = gql `
    mutation CreateReply($commenterId:ID!, $postId:ID!, $replyToCommentId:ID!, $comment:String!){
        addReply(commenterId: $commenterId, postId: $postId, replyToCommentId: $replyToCommentId, comment: $comment){
            id
            postId
            Commenter{
                name
                ProfilePicture
            }
            comment
            Likes{
                id
                commentId
                User{
                    id
                    name
                }
            }
            Replies{
                id
            }
        }
    }
`

export const CreateLikeComment = gql`
    mutation CreateLikeComment($commentId: ID!, $userId: ID!){
        addLikeComment(commentId: $commentId, userId: $userId){
            id
            commentId
            User{
                id
                name
            }
        }
    }
`

export const DeleteLikeComment = gql `
    mutation DeleteLikeComment($commentId: ID! , $userId: ID!){
        deleteLikeComment(commentId:$commentId , userId:$userId){
            id
            commentId
            User{
                id
                name
            }
        }
    }
`
//comment

//job
export const CreateJob = gql `
    mutation CreateJob($title: String!, $companyName: String!, $workplace: String! $city: String!, $country: String!, $employmentType: String!, $description: String!){
        addJob(title: $title, companyName: $companyName, workplace: $workplace, city: $city, country: $country, employmentType: $employmentType, description: $description){
            id
            title
            companyName
            workplace
            city
            country
            employmentType
            description
        }
    }
`
//job

// hashtag
export const CreateHashtag = gql `
    mutation CreateHashtag($hashtag: String!){
        addHashtag(hashtag: $hashtag){
            id
            hashtag
        }
    }
`

// hashtag


// connect
export const CreateConnect = gql `
    mutation CreateConnect($user1ID: ID!, $user2ID: ID!){
        addConnection(user1ID: $user1ID, user2ID: $user2ID){
            id
            user1{
                id
                name
            }
            user2{
                id
                name
            }
        }
    }
`

export const CreateConnectReq = gql `
    mutation CreateConnectReq($fromUserId: ID! , $toUserId: ID! , $message: String!){
        addConnectRequest(fromUserId: $fromUserId , toUserId: $toUserId , message: $message){
            id
            fromUser{
                id
                name
            }
            toUser{
                id
                name
            }
        }
    }
`

export const DeleteConnectReq = gql`
    mutation DeleteConnectReq($fromUserId: ID!, $toUserId: ID!) {
        deleteConnectRequest(fromUserId: $fromUserId, toUserId: $toUserId){
            id
            fromUser {
                id
                email
            }
            toUser {
                id
                email
            }
        }
    }
`

// connect

// notif
export const CreateNotif = gql `
    mutation CreateNotif($toUserId:ID! , $fromUserId:ID! , $message:String!){
        addNotification(toUserId:$toUserId , fromUserId:$fromUserId , message:$message){
            id
            message
            fromUser{
                id
                name
                ProfilePicture
            }
            toUser{
                id
                name
                ProfilePicture
            }
        }
    }
`

// notif

// searching
export const QuerySearch = gql `
    query Search($Keyword: String! , $Limit: Int!, $Offset: Int!){
        Search(Keyword: $Keyword , Limit: $Limit , Offset: $Offset){
            Users{
                id
                name
                ProfilePicture
                Backgroundpicture
                Educations{
                    ID
                    UserID
                    School
                    Degree
                    FieldOfStudy
                    StartDate
                    EndDate
                    Grade
                    Activites
                    Description
                }
                Experiences{
                    ID
                    UserID
                    Title
                    EmploymentType
                    CompanyName
                    Location
                    Active
                    StartYear
                    EndYear
                    Industry
                    Description
                }
                Visits{
                    userId
                    visitId
                }
                Follows{
                    userId
                    followId
                }
                Connections{
                    id
                    user1{
                        id
                        name
                        email
                        password
                    }
                    user2{  
                        id
                        name
                        email
                        password
                    }
                }
                ConnectRequests{
                    id
                    fromUser{
                        id
                        name
                        email
                        password
                    }
                    toUser{
                        id
                        name
                        email
                        password
                    }
                }
            }
            Posts{
                id
                text
                photoUrl
                videoUrl
                Sender{
                    id
                    name
                    ProfilePicture
                    Follows{
                        userId
                        followId
                    }
                }
            }
        }
    }
`

export const QueryHashtag = gql `
    query QueryHashtag($Keyword:String! , $Limit:Int!, $Offset:Int!){
        SearchHastag(Keyword: $Keyword, Limit: $Limit, Offset: $Offset){
            Posts{
                id
                text
                photoUrl
                videoUrl
                Sender{
                    id
                    name
                    ProfilePicture
                    Follows{
                        userId
                        followId
                    }
                }
            }
        }
    }
`

export const QueryPost = gql `
    query QueryPost($Limit: Int!, $Offset: Int!, $userId: ID!){
        Posts(Limit: $Limit , Offset: $Offset, userId: $userId) {
            id
            text
            photoUrl
            videoUrl
            Sender{
                id
                name
                ProfilePicture
                Follows{
                    userId
                    followId
                }
            }
            Likes{
                userId
                postId
            }
            Comments{
                id
                postId
                Commenter{
                    name
                    ProfilePicture
                }
                comment
                Likes{
                    id
                    commentId
                    User{
                        id
                        name
                    }
                }
                Replies{
                    id
                }
            }
        }
    }
`

export const QueryCommentPost = gql`
    query QueryCommentPost($Limit: Int!, $Offset: Int!){
        Posts(Limit: $Limit, Offset: $Offset){
            id
            text
            videoUrl
            photoUrl
            Sender{
                id
                name
                ProfilePicture
                Follows{
                    userId
                    followId
                }
            }
            Likes{
                userId
                postId
            }
            Comments{
                id
                postId
                Commenter{
                    name
                    ProfilePicture
                }
                comment
                Likes{
                    id
                    commentId
                    User{
                        id
                        name
                    }
                }
                Replies{
                    id
                }
            }
        }
    }
`

export const QueryReplyComment = gql`
    query QueryReplyComment($Limit: Int!, $Offset: Int!, $commentId: ID!){
        repliedToComments(Limit: $Limit, Offset: $Offset, commentId: $commentId){
            id
            postId
            Commenter{
                name
                ProfilePicture
            }
            comment
            Likes{
                id
                commentId
                User{
                    id
                    name
                }
            }
            Replies{
                id
            }
        }
    }
`

export const QueryPostComment = gql`
    query QueryPostComment($id: ID!){
        postComment(id:$id){
            id
            postId
            Commenter{
                id
                name
                ProfilePicture
            }
            comment
            Likes{
                id
                commentId
                User{
                    id
                    name
                }
            }
            Replies{
                id
            }
        }
    }
`

export const QueryHashtags = gql`
    query QueryHashtags{
        Hashtags{
            id
            hashtag
        }
    }
`

export const QueryJob = gql`
    query QueryJob{
        Jobs{
            id
            title
            companyName
            workplace
            city
            country
            employmentType
            description
        }
    }
`

export const QueryNotif = gql`
    query QueryNotif($toUserId:ID!){
        userNotification(toUserId:$toUserId){
            id
            message
            fromUser{
                id
                name
                ProfilePicture
            }
        }
    }
`
// searching
// ko HE ganteng sekaliiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
