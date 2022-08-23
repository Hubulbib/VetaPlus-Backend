import { Document } from 'mongoose'

export interface IfinReport extends Document {
    _id: {
        date: string
    }
    paySum: number
    clients: number
}