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

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({
    ID: 0,
    name: '',
    ico_url: '',
    account: ''
  })

  const setUserInfo = (info: typeof userInfo.value) => {
    userInfo.value = info
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
