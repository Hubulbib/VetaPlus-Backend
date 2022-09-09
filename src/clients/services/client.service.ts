import { ClientError } from '../exceptions/client.error'
import Client from '../schemas/client.schema'
import {getAll} from '../queries/getAll'

class ClientServie {

    async create(name: string, phone: string) {
        const candidate = await Client.findOne({ name })
        if (candidate) {
            throw ClientError.NotAcceptable('Данный клиент уже был на приеме')
        }
        return await Client.create({ name, phone })
    }

    async get(id: string) {
        const client = await this.checkClient(id)
        client.visits.sort((a, b) => {
            const aDate = new Date(a.date)
            const bDate = new Date(b.date)
            if (aDate < bDate) return 1
            else if (aDate > bDate) return -1
            return 0
        })

        return client
    }

    async getAll() {
        const clients = await Client.aggregate(getAll())
        return clients.map(el => {
            el.client[3] = el.client[3].length
            return [...el.client]
        })
    }

    async delete(id: string) {
        const client = await this.checkClient(id)

        await client.delete()
    }

    async edit(id: string, params: { name: string, phone: string }) {
        const client = await this.checkClient(id)

        client.name = params.name
        client.phone = params.phone

        await client.save()
    }

    private async checkClient(id: string) {
        const client = await Client.findById(id)
        if (!client) {
            throw ClientError.NotFound('Такого клиента не существует')
        }
        return client
    }
}

export default new ClientServie()