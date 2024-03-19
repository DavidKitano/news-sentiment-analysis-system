import { defineStore } from 'pinia'

export const useComments = defineStore('comments', {
  state: () => ({
    commentList: [] as any[]
  }),
  getters: {},
  actions: {
    setCommentList(list: any[]) {
      this.commentList = list
    }
  }
})
