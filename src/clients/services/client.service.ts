import Client from '../schemas/client.schema'

class ClientServie {

    async create(name: string, phone: string) {
        const candidate = await Client.findOne({ phone })
        if (candidate) {
            throw new Error('Такой клиент уже был на приеме')
        }
        const client = await Client.create({ name, phone })

        return client
    }

    async get(id: string) {
        const client = await this.checkClient(id)

        return client
    }

    async delete(id: string) {
        const client = await this.checkClient(id)
        const clientData = await client.delete()

        return clientData
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
            throw new Error('Такого клиента не существует')
        }
        return client
    }
}

export default new ClientServie()