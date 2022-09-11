import { Schema } from 'mongoose'
import { Egender } from '../enums/gender.enum'
import { EpayType } from '../enums/payType.enum'

const schema = new Schema({
    date: { type: Date, required: true },
    pet: { type: String, required: true },
    nickname: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true, enum: Object.values(Egender) },
    disease: { type: String, required: true },
    treatment: { type: String, required: true },
    payType: { type: String, required: true, enum: Object.values(EpayType), default: 'НАЛ' },
    paySum: { type: Number, required: true, default: 0 }
})

export default schema