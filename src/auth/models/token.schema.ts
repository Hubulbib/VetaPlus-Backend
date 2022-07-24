import { Schema, model } from 'mongoose'
import { tokenInterface } from '../interfaces/token.interface'

const schema = new Schema<tokenInterface>({
    refreshToken: { type: String, required: true }
})

export default model('Token', schema)