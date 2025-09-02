import { reactive, ref } from 'vue'

const userStore = reactive({
  isLogin: false,
  userInfo: {},
  accessToken: '',
  
  setUserInfo(info) {
    this.userInfo = info
  },
  
  setLoginStatus(status) {
    this.isLogin = status
  },
  
  setToken(token) {
    this.accessToken = token
    uni.setStorageSync('accessToken', token)
  },
  
  logout() {
    this.userInfo = {}
    this.isLogin = false
    this.accessToken = ''
    uni.removeStorageSync('accessToken')
    uni.reLaunch({
      url: '/pages/login/index'
    })
  }
})

export { userStore }
