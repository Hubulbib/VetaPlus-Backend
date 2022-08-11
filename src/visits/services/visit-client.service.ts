import { IvisitCreate } from '../interfaces/visit-create.interface'
import { IvisitEdit } from '../interfaces/visit-edit.interface'
import { VisitCreateDto } from '../dtos/visit-create.dto'
import { VisitEditDto } from '../dtos/visit-edit.dto'
import Client from '../../clients/schemas/client.schema'

class VisitClientService {
    async create(visitData: IvisitCreate) {
        const client = await this.checkClient(visitData.clientId)

        const date = (new Date(Date.now())).toISOString()

        const visitDto = new VisitCreateDto({ date, ...visitData })

        client.visits.push(visitDto)
        await client.save()

        return visitDto
    }

    async getAll(clientId: string) {
        const client = await this.checkClient(clientId)

        return client.visits
    }

    async edit(visitData: IvisitEdit) {
        await this.checkClient(visitData.clientId)

        const editVisit = await this.isExists(visitData.clientId, visitData.visitId)

        const visitDto = new VisitEditDto(visitData)

        const visit = await Client.updateOne({ _id: visitData.clientId, 'visits._id': visitData.visitId }, { $set: { 'visits.$': { ...visitDto, date: editVisit.date } } })
        return visit
    }

    async delete(clientId: string, visitId: string) {
        await this.checkClient(clientId)

        await this.isExists(clientId, visitId)

        const visit = await Client.updateOne({ _id: clientId }, { $pull: { 'visits': { _id: visitId } } })

        return visit
    }

    private async isExists(clientId: string, visitId: string) {
        const isExists = await Client.findOne({ _id: clientId, visits: { $elemMatch: { _id: visitId } } }, { 'visits.$': 1, _id: 0 })

        if (!isExists) {
            throw new Error('Такой записи не существует')
        }

        return isExists.visits[0]
    }

    private async checkClient(id: string) {
        const client = await Client.findById(id)

        if (!client) {
            throw new Error('Такого клиента не существует')
        }
        return client
    }
}

export default new VisitClientService()