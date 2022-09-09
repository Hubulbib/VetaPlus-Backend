import { sign, verify } from 'jsonwebtoken'
import Token from '../schemas/token.schema'

class TokenService {
    generateTokens(payload: object) {
        const accessToken = sign(payload, process.env.secret_access_jwt, { expiresIn: '15m' })
        const refreshToken = sign(payload, process.env.secret_refresh_jwt, { expiresIn: '30d' })
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token: string) {
        try {
            return verify(token, process.env.secret_access_jwt)
        } catch (err) {
            return null
        }
    }

    validateRefreshToken(token: string) {
        try {
            return verify(token, process.env.secret_refresh_jwt)
        } catch (err) {
            return null
        }
    }

    async saveToken(refreshToken: string) {
        const tokenData = (await Token.find())[0]
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        return (await Token.create({ refreshToken }))
    }

    async removeToken(refreshToken: string) {
        return (await Token.deleteOne({ refreshToken }))
    }

    async findToken(refreshToken: string) {
        return (await Token.findOne({ refreshToken }))
    }
}

export default new TokenService()