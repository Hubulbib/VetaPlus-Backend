import { Schema, model } from 'mongoose'
import { userInterface } from '../interfaces/user.interface'

const schema = new Schema<userInterface>({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
})

export default model('User', schema)