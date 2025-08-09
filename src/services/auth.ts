import axios from 'axios'
import { useCookies } from 'vue3-cookies'
import { useMainStore } from '@/stores/main'

const AUTH_BASE_URL = import.meta.env.VITE_AUTH_API_BASE_URL
const ENV = import.meta.env.MODE
const local = import.meta.env.VITE_LOCAL === 'true'

const { cookies } = useCookies()

const getCookieName = () => {
    return `auth_token_${ENV === 'prod' ? '' : ENV}`
}

export class AuthService {
    static async login(username: string, password: string) {
        try {
            const response = await axios.post(`${AUTH_BASE_URL}/login`, { username, password })
            const token = response.data.token

            if (!token) {
                throw new Error('No token received from server')
            }

            cookies.set(getCookieName(), token)
            console.log('local:', local)
        } catch (error: any) {
            throw new Error('Login failed: ' + error.response.data.message)
        }
    }

    static logout() {
        cookies.remove(getCookieName())
    }

    static isAuthenticated() {
        // needs to change in the future, a user can edit the store in the console
        const mainStore = useMainStore()
        if (mainStore.authenticated) return true

        const cookieName = getCookieName()
        const token = cookies.get(cookieName)

        if (!token) {
            return false
        }

        try {
            mainStore.toggleAuthentication()
            // add check to validate token with backend
            return true
        } catch (error) {
            console.error('Error validating token:', error)
            return false
        }
    }

    static async createAccount(username: string, password: string) {
        try {
            const response = await axios.post(`${AUTH_BASE_URL}/register`, { username, password })
            return response.data
        } catch (error: any) {
            throw new Error('Account creation failed: ' + error.response.data.message)
        }
    }
}
