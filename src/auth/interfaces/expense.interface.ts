import {Types} from 'mongoose'

export interface Iexpanse {
    _id?: Types.ObjectId
    date: Date
    amount: number
    text: string
}