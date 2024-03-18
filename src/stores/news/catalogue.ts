import { defineStore } from 'pinia'

export const useCatalogue = defineStore('catalogue', {
  state: () => ({
    list: [
      {
        label: '',
        anchor: ''
      }
    ]
  }),
  getters: {},
  actions: {
    setCatalogue(list: Array<{ label: string; anchor: string }>) {
      this.list = list
    }
  }
})
