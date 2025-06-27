
import { defineStore } from 'pinia'
import { ref } from 'vue'
const VITE_API_URL = import.meta.env.VITE_API_URL
void VITE_API_URL

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({
    ID: 0,
    name: '',
    ico_url: '',
    account: ''
  })

  const setUserInfo = (info: typeof userInfo.value) => {
    userInfo.value = info
    userInfo.value.ico_url = "http://1.95.40.68:8081" + userInfo.value.ico_url
  }
  const setAvater = (url: string) => {
    userInfo.value.ico_url = url
  }
  void setAvater
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
  //持久化配置
  persist: true
})
