import { Schema, model } from 'mongoose'
import { Itoken } from '../interfaces/token.interface'

const schema = new Schema<Itoken>({
    refreshToken: { type: String, required: true }
})

export default model('Token', schema)