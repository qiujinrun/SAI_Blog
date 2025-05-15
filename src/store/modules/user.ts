// import { defineStore } from 'pinia'

// export const useUserStore = defineStore('user', {
//   state: () => {
//     return {
//       userInfo: {
//         ID: 0,
//         name: '',
//         ico_url: '',
//         account: '',
//       }
//     }
//   },
//   actions: {
//     setUserInfo(userInfo: any) {
//       this.userInfo = userInfo;
//       // console.log(this.userInfo);
//     }
//   },
// })
import { defineStore } from 'pinia'
import { ref } from 'vue'
const VITE_API_URL = import.meta.env.VITE_API_URL

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({
    ID: 0,
    name: '',
    ico_url: '',
    account: ''
  })

  const setUserInfo = (info: typeof userInfo.value) => {
    userInfo.value = info
    userInfo.value.ico_url = VITE_API_URL + userInfo.value.ico_url
  }
  const setAvater = (url: string) => {
    userInfo.value.ico_url = url
  }

  const clearUserInfo = () => {
    userInfo.value = {
      ID: 0,
      name: '',
      ico_url: '',
      account: ''
    }
  }

  return {
    userInfo,
    setUserInfo,
    clearUserInfo
  }
}, {
  persist: true // ✅ 持久化配置在这里，setup API 必须这样写！
})
