import { Schema, model } from 'mongoose'
import { Iuser } from '../interfaces/user.interface'

const schema = new Schema<Iuser>({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
})

export default model('User', schema)