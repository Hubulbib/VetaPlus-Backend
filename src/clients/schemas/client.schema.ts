import { Schema, model } from 'mongoose'
import Visit from '../../visits/schemas/visit.schema'
import { Iclient } from '../interfaces/client.interface'

const schema = new Schema<Iclient>({
    name: { type: String, required: true },
    phone: { type: String },
    visits: [Visit]
})

export default model('Client', schema)