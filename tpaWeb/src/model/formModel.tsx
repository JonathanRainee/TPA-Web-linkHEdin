import { UserType } from "./model"
import { ApolloQueryResult } from "@apollo/client";

export type setString = React.Dispatch<React.SetStateAction<string>>
export type setBoolean = React.Dispatch<React.SetStateAction<boolean>>
export type setNumber = React.Dispatch<React.SetStateAction<number>>
export type setUserType = React.Dispatch<React.SetStateAction<UserType>>
export type setReactMention = React.Dispatch<React.SetStateAction<reactMentionType>>

export type refectUserType = (variables?: Partial<{userId: string;}> | undefined) => Promise<ApolloQueryResult<any>>
export type refectPostType = (variables?: Partial<{Limit: number , Offset: number;}> | undefined) => Promise<ApolloQueryResult<any>>
export type refectHastagType = (variables?: Partial<{}> | undefined) => Promise<ApolloQueryResult<any>>
export type refectSearchType = (variables?: Partial<{Limit: number , Offset: number;}> | undefined) => Promise<ApolloQueryResult<any>>
export type refectCommentType = (variables?: Partial<{Limit: number , Offset: number , postId : string;}> | undefined) => Promise<ApolloQueryResult<any>>
export type refectJobType = (variables?: Partial<{}> | undefined) => Promise<ApolloQueryResult<any>>

export type workerInputType = {
    userId: string,
    title: string,
    employmentType: string,
    companyName: string,
    country: string,
    city: string,
    isActive: boolean,
    industry: string,
}

export type setWorkerInputType = React.Dispatch<React.SetStateAction<{
    userId: string,
    title: string,
    employmentType: string,
    companyName: string,
    country: string,
    city: string,
    isActive: boolean,
    industry: string,
}>>

export type educationInputType = {
    userId: string,
    school: string,
    degree: string,
    fieldStudy: string,
    grade: string,
    activities: string,
    description: string,
}

export type setEducationInputType = React.Dispatch<React.SetStateAction<{
    userId: string,
    school: string,
    degree: string,
    fieldStudy: string,
    grade: string,
    activities: string,
    description: string,
}>>

export type timeInputType = {
    monthStartDate: string,
    monthEndDate: string,
    yearStartDate: string,
    yearEndDate: string,
}

export type setTimeInputType = React.Dispatch<React.SetStateAction<{
    monthStartDate: string,
    monthEndDate: string,
    yearStartDate: string,
    yearEndDate: string,
}>>

export type reactMentionType = {
    id : string,
    display : string,
}

export enum enumEmploymentType {
    Appreticeship = 'Appreticeship',
    Contract = 'Contract',
    Freelance = 'Freelance',
    FullTime = 'Full-Time',
    Intership = 'Intership',
    PartTime = 'Part-Time',
    SelfEmployed = 'Self-Employed',
    Seasonal = 'Seasonal',
}

export enum enumIndustryType {
    Accounting = 'Accounting',
    AdvertisingServices = 'Advertising Services',
    MarketResearch = 'Market Reasearch',
    MarketService = 'Market Servicee',
    ITConsulting = "IT Consulting",
    SoftwareDevelopment = 'Software Development',
}

export enum enumCountryType {
    Indonesia = "Indonesia",
    Singapore = "Singapore",
    Malaysia = "Malaysia",
    Vietnam = "Vietnam",
    Amerika = "Amerika",
    England = "England",
}

export enum enumCityType {
    JakartaRaya = "Jakarta",
    WestJava = "West Java",
    EastJava = "East Java",
    CentralJava = "Central Java",
    WestKalimantan = "West Kalimantan",
    SouthKalimantan = "South Kalimantan",
    CentralKalimantan = "Central Kalimantan",
    WestSumatra = "West Sumatra",
    SouthSumatra = "South Sumatra",
    NorthSumatra = "North Sumatra",
    Bali = "Bali",
    Banten = "Banten",
}

export enum enumMonthType {
    January = "January",
    Feburary = "Feburary",
    March = "March",
    April = "April",
    May = "May",
    June = "June",
    July = "July",
    August = "August",
    September = "September",
    October = "October",
    November = "November",
    December = "December",
}



export const HastagRichText1 = /#[a-z0-9A-Z]+/g
export const HastagRichText2 = /@\[#[a-z0-9A-Z]+/g
export const MentionRichText = /@[a-z0-9A-Z]+/g
export const URLRichText = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._]{2,1000}\.\b([a-zA-Z0-9@:%_\+.#?&//=]*)/g
