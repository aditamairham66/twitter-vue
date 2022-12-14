import jwt_decode from "jwt-decode";

interface login {
    username: string, password: string
}
const login = ({ username, password }: login) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await $fetch(`/api/auth/login`, {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            })

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
            const data = await $fetch(`/api/auth/refresh-token`)

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

const signOut = () => {
    return new Promise(async (resolve, reject) => {
        try {
            await useFetchApi<any>(`/api/auth/sign-out`, {
                method: "POST"
            })

            setToken(null)
            setUser(null)

            resolve(true)
        } catch (error) {
            reject(error)
        }
    })
}

const useToggleSignoutModal = () => useState("toggle_signout_modal", () => false)

const setToggleSignoutModal = (val: boolean) => {
    const toggleSignout = useToggleSignoutModal()
    toggleSignout.value = val
}

export function useAuth () {
    return {
        login,
        useAuthToken,
        useAuthUser,
        initAuth,
        useLoading,
        signOut,
        useToggleSignoutModal,
        setToggleSignoutModal
    }
}