import {Schema} from 'mongoose'
import {Iexpanse} from '../interfaces/expense.interface'

const schema =  new Schema<Iexpanse>({
    date: {type: Date, default: new Date((new Date).toISOString()), required: true},
    amount: {type: Number, required: true},
    text: {type: String}
})

export default schema