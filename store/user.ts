import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    id: null,
    isLoggedIn: false,
  }),
  actions: {
    login(user) {
      this.id = user.id
      this.isLoggedIn = true
    },
    logout() {
      this.id = null
      this.isLoggedIn = false
    },
  },
})