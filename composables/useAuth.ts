interface login {
    username: string, password: string
}
const login = (login: login) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await fetch(`api/auth/login`, {
                method: 'POST',
                body: JSON.stringify(login),
            }).then((res) => res.json())

            // console.log(data)
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

export function useAuth () {
    return {
        login,
        useAuthToken,
        useAuthUser
    }
}