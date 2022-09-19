import jwt_decode from "jwt-decode";

interface login {
    username: string, password: string
}
const login = ({ username, password }: login) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await $fetch<any>(`/api/auth/login`, {
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

const useAuthToken = () => useState<string>("auth_token")
const useAuthUser = () => useState<any>("auth_users")

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
        setLoading(true)
        try {
            await refreshToken()
            await getUsers()

            refreshTokenUpdater()
        } catch (error) {
            reject(error)
        } finally {
            setLoading(false)
        }
    })
}

const refreshToken = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await $fetch<any>(`/api/auth/refresh-token`)

            setToken(data.token)

            resolve(true)
        } catch (error) {
            reject(error)
        }
    })
}

const getUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await useFetchApi<any>(`/api/auth/users`, {server: false})

            setUser(data.user)

            resolve(true)
        } catch (error) {
            reject(error)
        }
    })
}

const refreshTokenUpdater = () => {
    const authToken = useAuthToken()
    if (!authToken.value) {
        return
    }
    const data = jwt_decode<any>(authToken.value)
    const refreshTime = data?.exp - 60000

    setTimeout(async () => {
        await refreshToken()
        refreshTokenUpdater()
    }, refreshTime)
}

const useLoading = () => useState("auth_loading", () => true)

const setLoading = (val: boolean) => {
    const authLoading = useLoading()
    authLoading.value = val
}

export function useAuth () {
    const config = useRuntimeConfig()

    return {
        login,
        useAuthToken,
        useAuthUser,
        initAuth,
        useLoading
    }
}