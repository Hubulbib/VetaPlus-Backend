import { Schema, model } from 'mongoose'
import Expense from './expense.schema'
import { Iuser } from '../interfaces/user.interface'

const schema = new Schema<Iuser>({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    expenses: {type: [Expense]}
})

export default model('User', schema)