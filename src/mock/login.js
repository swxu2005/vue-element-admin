// import { param2Obj } from '@/utils'

const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  editor: {
    roles: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

const permissions = ['sys:dept:update', 'sys:params:update', 'sys:dept:info', 'sys:role:page', 'sys:user:export', 'sys:dept:delete', 'sys:params:delete', 'sys:params:page', 'sys:dept:list', 'sys:user:page', 'sys:role:list', 'sys:menu:select', 'sys:schedule:update', 'sys:schedule:save', 'sys:params:save', 'sys:params:info', 'sys:schedule:page', 'sys:dict:info', 'sys:role:save', 'demo:news:all', 'sys:schedule:log', 'sys:model:all', 'sys:role:update', 'sys:mail:log', 'sys:log:login', 'sys:user:save', 'sys:oss:all', 'sys:schedule:info', 'sys:params:export', 'sys:sms:all', 'sys:menu:update', 'sys:menu:delete', 'sys:running:all', 'sys:dict:delete', 'sys:menu:list', 'sys:dict:page', 'sys:mail:all', 'sys:schedule:resume', 'sys:user:delete', 'sys:user:update', 'sys:menu:info', 'sys:menu:save', 'sys:log:operation', 'sys:role:info', 'sys:schedule:delete', 'sys:process:all', 'sys:log:error', 'sys:user:info', 'sys:schedule:run', 'sys:role:delete', 'sys:dept:save', 'sys:schedule:pause', 'sys:dict:update', 'sys:dict:save']

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    return {
      code: 0,
      data: {
        token: username
      }
    }
  },
  getUserPermissions: config => {
    return {
      code: 0,
      data: permissions
    }
  },
  getUserInfo: config => {
    // const { token } = param2Obj(config.url)
    return {
      code: 0,
      data: userMap['admin']
    }
    // if (userMap[token]) {
    //   return {
    //     code: 0,
    //     data: userMap[token],
    //   }
    // } else {
    //   return false
    // }
  },
  logout: () => 'success'
}
