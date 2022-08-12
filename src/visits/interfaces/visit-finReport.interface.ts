import { Document } from 'mongoose'

export interface IfinReport extends Document {
    _id: {
        day: string
    }
    paySum: number
    clients: number
}