import { defineStore } from 'pinia'

export const useUser = defineStore('user', {
  state: () => ({
    userInfo: {} as any
  }),
  getters: {},
  actions: {
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo
    }
  }
})
