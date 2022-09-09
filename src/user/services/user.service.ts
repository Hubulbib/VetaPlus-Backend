import User from '../../auth/schemas/user.schema'
import {UserError} from '../exceptions/user.error'
import {getByDate} from '../queries/getByDate'

class UserService {
    async getByDate(from: Date, until: Date, userId: string) {
        await this.findUser(userId)

        const expenses = (await User.aggregate(getByDate(userId, from, until)))[0].expenses

        return expenses.sort((a, b) => {
            const aDate = new Date(a.date)
            const bDate = new Date(b.date)
            if (aDate < bDate) return -1
            else if (aDate > bDate) return 1
            return 0
        })
    }

    async create(date: Date, amount: number, text: string, userId: string) {
        const user = await this.findUser(userId)

        user.expenses.push({date, amount, text})

        return (await user.save())
    }

    async edit(expenseId: string, amount: number, text: string, userId: string) {
        await this.findUser(userId)

        const editVisit = await this.isExists(expenseId, userId)

        await User.findByIdAndUpdate(userId, {$pull: {'expenses': {_id: expenseId}}})

        const user = await User.findByIdAndUpdate(userId, {
            $push: {
                'expenses': {
                    amount, text, date: editVisit.date
                }
            }
        }, {new: true})

        return user.expenses[user.expenses.length - 1]._id
    }

    async delete(expenseId: string, userId: string) {
        await this.findUser(userId)
        await this.isExists(expenseId, userId)

        return User.updateOne({_id: userId}, {$pull: {'expenses': {_id: expenseId}}})
    }

    private async findUser(userId) {
        const user = await User.findById(userId)

        if(user) {
            return user
        }
        throw UserError.NotFound('Такого пользователя не существует')
    }

    private async isExists(expenseId, userId) {
        const isExists = await User.findOne({ _id: userId, expenses: { $elemMatch: { _id: expenseId } } }, { 'expenses.$': 1, _id: 0 })

        if (!isExists) {
            throw UserError.NotFound('Данной записи не существует')
        }

        return isExists.expenses[0]
    }
}

export default new UserService