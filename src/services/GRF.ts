import axios from 'axios'

const AUTH_BASE_URL = import.meta.env.VITE_GRF_API_BASE_URL
const ENV = import.meta.env.MODE
const local = import.meta.env.VITE_LOCAL === 'true'

export class GRFService {

    static async createProduct(body: {name: string, description: string, price: number, stock: number}) {
        try {
            const response = await axios.post(`${AUTH_BASE_URL}/product/create`, body)
            return response.data
        } catch (error: any) {
            throw new Error('Product creation failed: ' + error.message)
        }
    }

    static async readProductAllActive() {
        try {
            const response = await axios.get(`${AUTH_BASE_URL}/product/read/all/active`)
            return response.data
        } catch (error: any) {
            throw new Error('Failed to fetch active products: ' + error.message)
        }
    }

}
