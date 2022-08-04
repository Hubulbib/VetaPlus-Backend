import { Ivisit } from '../../visits/interfaces/visit.interface'

export class ClientDto {
    name: string
    phone: string
    visits: Ivisit[] = []

    constructor(model) {
        this.name = model.name
        this.phone = model.phone
        this.visits = model.visits
    }
}