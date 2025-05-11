import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return { 
        userInfo: {
          ID: 0,
          name: '',
          account: '',
        }
     }
  },
  actions: {
    setUserInfo(userInfo:any) {
      this.userInfo = userInfo;
      // console.log(this.userInfo);
    }
  }
})