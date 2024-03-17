import { defineStore } from 'pinia'

export const useAuth = defineStore('auth', {
  state: () => ({
    token: '',
    userAuthInfo: {} as any
  }),
  getters: {
    isLogin: (state) => {
      return !!state.token
    },
    bearerToken: (state) => {
      if (!state.token) return ''
      return `Bearer ${state.token}`
    },
    refreshToken: (state) => {
      return state.userAuthInfo.refresh_token || ''
    },
    userId: (state) => {
      return state.userAuthInfo.id || ''
    },
    userRole: (state) => {
      return state.userAuthInfo.role_list || ''
    }
  },
  actions: {
    restoreAuth() {
      const storageToken = localStorage.getItem('nsasAuth')
      const storageAuthInfo = localStorage.getItem('nsasAuthInfo')
      if (!storageToken) return

      this.token = storageToken
      if (storageAuthInfo) {
        this.userAuthInfo = JSON.parse(storageAuthInfo)
      }
    },
    setAuth(_token: string, _userInfo?: any) {
      this.token = _token
      localStorage.setItem('nsasAuth', this.token)
      if (_userInfo) {
        this.userAuthInfo = _userInfo
        localStorage.setItem('nsasAuthInfo', JSON.stringify(_userInfo))
      }
    },
    clearAuth() {
      this.token = ''
      this.userAuthInfo = {}

      if (localStorage.getItem('nsasAuth') || localStorage.getItem('nsasAuth') == 'undefined') {
        localStorage.removeItem('nsasAuth')
      }
      if (localStorage.getItem('nsasAuthInfo') || localStorage.getItem('nsasAuthInfo') == 'undefined') {
        localStorage.removeItem('nsasAuthInfo')
      }
    }
  }
})
