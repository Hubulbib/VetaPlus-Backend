import { compare, hash } from 'bcrypt'
import User from '../schemas/user.schema'
import tokenService from './token.service'
import { UserDto } from '../dtos/user.dto'
import { ApiError } from '../exceptions/api.error'

class UserService {

    async register(username: string, password: string) {
        const oneUser = await User.findOne({})
        if (oneUser) {
            throw ApiError.BadRequest('Администратор уже зарегистрирован')
        }
        const candidate = await User.findOne({ username })
        if (candidate) {
            throw ApiError.BadRequest('Пользователь с таким username уже существует')
        }
        const hashedPassword = await hash(password, 4)
        const user = await User.create({ username, password: hashedPassword })

        return await this.responseData(user)
    }

    async login(username: string, password: string) {
        const user = await User.findOne({ username })
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким username не найден')
        }
        const comparePassword = await compare(password, user.password)
        if (!comparePassword) {
            throw ApiError.BadRequest('Неверные данные при входе')
        }

        return await this.responseData(user)
    }

    async logout(refreshToken: string) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDB = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDB) {
            throw ApiError.UnauthorizedError()
        }
        const user = await User.findById(userData['id'])

        return await this.responseData(user)
    }

    private async responseData(user) {
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }
}

export default new UserService()