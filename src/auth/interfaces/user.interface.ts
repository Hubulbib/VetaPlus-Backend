import {Iexpanse} from './expense.interface'

export interface Iuser {
    username: string
    password: string
    expenses: [Iexpanse]
}