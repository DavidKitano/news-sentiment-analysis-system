import { defineStore } from 'pinia'

export const useUser = defineStore('user', {
  state: () => ({
    userInfo: {} as any
  }),
  getters: {
    userId: (state) => state.userInfo.id || state.userInfo.user?.id || '读取失败',
    username: (state) => state.userInfo.user?.username || '读取失败',
    avatar: (state) => state.userInfo.userInfo?.avatar || '读取失败',
    account: (state) => state.userInfo.user?.account || '读取失败',
    email: (state) => state.userInfo.user?.email || '读取失败',
    gender: (state) => state.userInfo.userInfo?.gender || '未知'
  },
  actions: {
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo
    }
  }
})
