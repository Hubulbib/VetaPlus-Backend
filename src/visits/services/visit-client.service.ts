import { IvisitCreate } from '../interfaces/visit-create.interface'
import { IvisitEdit } from '../interfaces/visit-edit.interface'
import { VisitCreateDto } from '../dtos/visit-create.dto'
import { VisitEditDto } from '../dtos/visit-edit.dto'
import Client from '../../clients/schemas/client.schema'
import { VisitError } from '../exceptions/visit.error'
import { ClientError } from '../../clients/exceptions/client.error'

class VisitClientService {
    async create(visitData: IvisitCreate) {
        const client = await this.checkClient(visitData.clientId)

        const date = (new Date).toISOString()

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

        await Client.findOneAndUpdate({_id: visitData.clientId}, {$pull: {'visits': {_id: visitData.visitId}}})

        const client = await Client.findOneAndUpdate({_id: visitData.clientId}, {
            $push: {
                'visits': {
                    ...visitDto,
                    date: editVisit.date
                }
            }
        }, {new: true})

        return client.visits[client.visits.length - 1]._id
    }

    async delete(clientId: string, visitId: string) {
        await this.checkClient(clientId)

        await this.isExists(clientId, visitId)

        return Client.updateOne({_id: clientId}, {$pull: {'visits': {_id: visitId}}})
    }

    private async isExists(clientId: string, visitId: string) {
        const isExists = await Client.findOne({ _id: clientId, visits: { $elemMatch: { _id: visitId } } }, { 'visits.$': 1, _id: 0 })

        if (!isExists) {
            throw VisitError.NotFound('Данной записи не существует')
        }

        return isExists.visits[0]
    }

    private async checkClient(id: string) {
        const client = await Client.findById(id)

        if (!client) {
            throw ClientError.NotFound('Данного клиента не было на приеме')
        }
        return client
    }
}

export default new VisitClientService()