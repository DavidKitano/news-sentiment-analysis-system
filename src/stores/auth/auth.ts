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
      const storageToken = localStorage.getItem('nsasAuth')
      if (!storageToken) return

      this.token = storageToken
    },
    setAuth(_token: string) {
      this.token = _token

      localStorage.setItem('nsasAuth', this.token)
    },
    clearAuth() {
      this.token = ''

      if (localStorage.getItem('nsasAuth')) {
        localStorage.removeItem('nsasAuth')
      }
    }
  }
})
