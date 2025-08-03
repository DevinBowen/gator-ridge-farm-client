import { defineStore } from 'pinia'

export type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  stock: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),
  getters: {
    totalPrice: (state) =>
      state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    totalItems: (state) =>
      state.items.reduce((count, item) => count + item.quantity, 0),
  },
  actions: {
    addItem(item: Omit<CartItem, 'quantity'>) {
      const existing = this.items.find((i) => i.id === item.id)
      if (existing) {
        if (existing.quantity < existing.stock) {
          existing.quantity++
        } else {
          alert(`Only ${existing.stock} available in stock.`)
        }
      } else {
        this.items.push({ ...item, quantity: 1 })
      }
    },
    removeItem(id: number) {
      this.items = this.items.filter((item) => item.id !== id)
    },
    clearCart() {
      this.items = []
    },
  },
})