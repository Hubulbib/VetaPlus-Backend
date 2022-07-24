import { sign, verify } from 'jsonwebtoken'
import Token from '../models/token.schema'

class TokenService {
    generateTokens(payload) {
        const accessToken = sign(payload, process.env.secret_access_jwt, { expiresIn: '15m' })
        const refreshToken = sign(payload, process.env.secret_refresh_jwt, { expiresIn: '30d' })
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token: string) {
        try {
            const userData = verify(token, process.env.secret_access_jwt)
            return userData
        } catch (err) {
            return null
        }
    }

    validateRefreshToken(token: string) {
        try {
            const userData = verify(token, process.env.secret_refresh_jwt)
            return userData
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
        const token = await Token.create({ refreshToken })
        return token
    }

    async removeToken(refreshToken: string) {
        const tokenData = await Token.deleteOne({ refreshToken })
        return tokenData
    }

    async findToken(refreshToken: string) {
        const tokenData = await Token.findOne({ refreshToken })
        return tokenData
    }
}

export default new TokenService()