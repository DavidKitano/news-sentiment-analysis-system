import { defineStore } from 'pinia'

export const useAuth = defineStore('auth', {
  state: () => ({
    token: ''
  }),
  getters: {
    isLogin: (state) => {
      return !!state.token
    },
    bearerToken: (state) => {
      return `Bearer ${state.token}`
    }
  },
  actions: {
    restoreAuth() {
      const storageToken = localStorage.getItem('auth')
      if (!storageToken) return

      this.token = storageToken
    },
    setAuth(_token: string) {
      this.token = _token

      localStorage.setItem('auth', this.token)
    },
    clearAuth() {
      this.token = ''

      if (localStorage.getItem('auth')) {
        localStorage.removeItem('auth')
      }
    }
  }
})
