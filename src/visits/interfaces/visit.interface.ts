import { Types } from 'mongoose'

export interface Ivisit {
    _id: Types.ObjectId
    date: number
    pet: string
    nickname: string
    age: number
    gender: string
    disease: string
    treatment: string
    payType: string
    paySum: number
}