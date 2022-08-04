import { Types } from 'mongoose'
import { Ivisit } from '../../visits/interfaces/visit.interface'

export interface Iclient {
    _id: Types.ObjectId
    name: string
    phone: string
    visits: Ivisit[]
}