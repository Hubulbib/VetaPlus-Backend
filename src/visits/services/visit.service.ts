import Client from '../../clients/schemas/client.schema'
import { IfinReport } from '../interfaces/visit-finReport.interface'
import { IreceptionDay } from '../interfaces/visit-receptionDay.interface'
import { finReport } from '../queries/finReport'
import { receptionDay } from '../queries/receptionDay'

class VisitService {
    async getFinReport(dayFrom: Date, dayUntil: Date) {
        const finData: IfinReport[] = await Client.aggregate(finReport(dayFrom, dayUntil))

        return finData.sort((a, b) => {
            const aDate = new Date(a._id.day)
            const bDate = new Date(b._id.day)
            if (aDate < bDate) return -1
            else if (aDate > bDate) return 1
            return 0
        })
    }

    async getDay(day: Date) {
        const dayData: IreceptionDay[] = await Client.aggregate(receptionDay(day))

        return dayData.sort((a, b) => {
            const aDate = a.details.date
            const bDate = b.details.date
            if (aDate < bDate) return -1
            else if (aDate > bDate) return 1
            return 0
        })
    }
}

export default new VisitService()