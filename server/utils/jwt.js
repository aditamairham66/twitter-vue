import jwt from "jsonwebtoken";

const generateToken = (user) => {
    const config = useRuntimeConfig()

    return jwt.sign({ userId: user.id }, config.jwtSecret, {
        expiresIn: '10m'
    })
}

const generateRefreshToken = (user) => {
    const config = useRuntimeConfig()

    return jwt.sign({ userId: user.id }, config.jwtSecret, {
        expiresIn: '4h'
    })
}

export const generateTokens = (user) => {
    const accessToken = generateToken(user)
    const refreshToken = generateRefreshToken(user)

    return {
        accessToken: accessToken,
        refreshToken: refreshToken
    }
}

export const sendRefreshToken = (event, token) => {
    setCookie(event.res, "refresh_token", token, {
        httpOnly: true,
        sameSite: true
    })
} 

export const decodeToken = (token) => {
    const config = useRuntimeConfig()

    try {
        return jwt.verify(token, config.jwtSecret)
    } catch (error) {
        return null
    }
}