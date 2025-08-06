import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    authenticated: false
  }),
  actions: {
    toggleAuthentication() {
      this.authenticated = !this.authenticated
    }
  }
})