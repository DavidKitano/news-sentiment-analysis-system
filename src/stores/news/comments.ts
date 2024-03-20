import { defineStore } from 'pinia'
import type { UserNewsCommentDO } from '@/api/news/type'

export const useComments = defineStore('comments', {
  state: () => ({
    commentList: [] as UserNewsCommentDO[]
  }),
  getters: {},
  actions: {
    setCommentList(list: UserNewsCommentDO[]) {
      this.commentList = list
    },
    pushComment(comment: UserNewsCommentDO | UserNewsCommentDO[]) {
      if (Array.isArray(comment)) {
        this.commentList.push(...comment)
      } else {
        this.commentList.push(comment)
      }
    }
  }
})
