export type UserType = {
    ID: string,
    Email: string,
    Password: string,
    Verified: boolean,
    name: string,
    ProfilePicture: string,
    Backgroundpicture: string,
    Educations: Array<EducationType>,
    Experiences: Array<ExperienceType>,
    Visits: Array<VisitType>,
    Follows: Array<FollowType>,
    Blocks : Array<BlockType>
    Connections : Array<ConnectionType>
    ConnectRequests : Array<ConnectRequests>
}

export type EducationType = {
    id: string,
    userId: string,
    school: string,
    degree: string,
    fieldStudy: string,
    grade: string,
    activities: string,
    description: string,
    monthStartDate: string,
    monthEndDate: string,
    yearStartDate: string,
    yearEndDate: string,
}

export type ExperienceType = {
    id: string,
    title: string,
    userId: string,
    employmentType: string,
    companyName: string,
    country: string,
    city: string,
    isActive: boolean,
    industry: string,
    monthStartDate: string,
    monthEndDate: string,
    yearStartDate: string,
    yearEndDate: string,
}

export type PostType = {
    id: string,
    text: string,
    photoUrl: string,
    videoUrl : string,
    Sender: UserType,
    Likes: Array<LikeType>
    Comments : Array<CommentType>
}

export type VisitType = {
    userId: string,
    visitId: string,
}

export type FollowType = {
    userId: string,
    followId: string,
}

export type LikeType = {
    postId : string, 
    userId : string,
}

export type ConnectRequests ={
    id: string
    message: string
    fromUser : UserType
    toUser : UserType
}

export type ConnectionType = {
    id : string,
    user1 : UserType
    user2 : UserType
}

export type BlockType = {
    userId : string,
    blockId : string,
}

export type CommentType = {
    id: string,
    postId : string,
    Commenter : UserType,
    Likes : Array<LikeCommentType>
    Replies : Array<CommentType>
    comment : string,
}

export type LikeCommentType = {
    id : string,
    commentId : string,
    User : UserType
}

export type HastagType = {
    id : string,
    hastag : string,
}

export type JobsType = {
    id: string,
    title: string,
    companyName: string,
    workplace: string,
    city: string,
    country: string,
    employmentType: string,
    description: string,
}

export type NotificationType = {
    id : string,
    fromUser : UserType,
    toUser : UserType,
    message : string,
}