import { loginByUsername, getUserInfo, getUserPermissions } from '@/api/login'
import { setToken } from '@/utils/auth'
import user from './user_'

user.actions.LoginByUsername = ({ commit }, userInfo) => {
  const username = userInfo.username.trim()
  return new Promise((resolve, reject) => {
    loginByUsername(username, userInfo.password).then(response => {
      const data = response.data.data
      commit('SET_TOKEN', data.token)
      setToken(data.token)
      resolve()
    }).catch(error => {
      reject(error)
    })
  })
}

user.actions.GetUserInfo = ({ commit, state }) => {
  return new Promise((resolve, reject) => {
    Promise.all([
      getUserInfo(),
      getUserPermissions()
    ]).then((result) => {
      const userInfoResult = result[0].data.data
      const userPermissionsResult = result[1].data.data

      if (userPermissionsResult && userPermissionsResult.length > 0) { // 验证返回的roles是否是一个非空数组
        commit('SET_ROLES', userPermissionsResult)
      } else {
        reject('getInfo: roles must be a non-null array !')
      }

      commit('SET_NAME', userInfoResult.realName)
      commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
      commit('SET_INTRODUCTION', userInfoResult.introduction)

      resolve(userPermissionsResult)
    }).catch((error) => {
      reject(error)
    })
  })
}

export default user
