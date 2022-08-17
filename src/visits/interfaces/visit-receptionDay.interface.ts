import { Types } from 'mongoose'

export interface IreceptionDay {
    _id: Types.ObjectId
    time: string
    name: string
    phone: string
    pet: string
    disease: string
    payType: string
    paySum: number
    details: {
        date: Date
        nickname: string
        gender: string
        age: number
        treatment: string
    }
}