interface login {
    username: string, password: string
}
const login = ({ username, password }: login) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await fetch(`api/auth/login`, {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            }).then((res) => res.json())

            setToken(data.token)
            setUser(data.user)

            resolve(true)
        } catch (error) {
            reject(error)
        }
    })
}

const useAuthToken = () => useState("auth_token")
const useAuthUser = () => useState("auth_users")

const setToken = (token: string) => {
    const authToken = useAuthToken()
    authToken.value = token
}

const setUser = (user: any) => {
    const authUser = useAuthUser()
    authUser.value = user
}

const initAuth = () => {
    return new Promise(async (resolve, reject) => {
        try {
            await refreshToken()
        } catch (error) {
            reject(error)
        }
    })
}

const refreshToken = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await fetch(`api/auth/refresh-token`).then((res) => res.json())

            setToken(data.token)

            resolve(true)
        } catch (error) {
            reject(error)
        }
    })
}

export function useAuth () {
    return {
        login,
        useAuthToken,
        useAuthUser,
        initAuth
    }
}