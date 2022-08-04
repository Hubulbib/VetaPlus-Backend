import { Schema, model } from 'mongoose'
import { Egender } from '../../visits/enums/gender.enum'
import { EpayType } from '../../visits/enums/payType.enum'
import { Iclient } from '../interfaces/client.interface'

const schema = new Schema<Iclient>({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    visits: [
        {
            date: { type: Number, required: true },
            pet: { type: String, required: true },
            nickname: { type: String, required: true },
            age: { type: Number, required: true },
            gender: { type: String, required: true, enum: Object.values(Egender) },
            disease: { type: String, required: true },
            treatment: { type: String, required: true },
            payType: { type: String, required: true, enum: Object.values(EpayType), default: 'cash' },
            paySum: { type: Number, required: true, default: 0 }
        }
    ]
})

export default model('Client', schema)