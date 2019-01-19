import Layout from '@/views/layout/Layout'

const sysRouter = [
  {
    path: '/auth',
    component: Layout,
    name: 'AuthManage',
    meta: {
      title: 'authManage',
      icon: 'safetycertificate'
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/sys/user'),
        name: 'UserManage',
        meta: {
          title: 'userManage',
          icon: 'user',
          roles: ['sys:user:page']
        }
      },
      {
        path: 'dept',
        component: () => import('@/views/sys/dept'),
        name: 'DeptManage',
        meta: {
          title: 'deptManage',
          icon: 'apartment',
          roles: ['sys:dept:list']
        }
      },
      {
        path: 'role',
        component: () => import('@/views/sys/role'),
        name: 'RoleManage',
        meta: {
          title: 'roleManage',
          icon: 'team',
          roles: ['sys:role:page']
        }
      }
    ]
  },
  {
    path: '/sys',
    component: Layout,
    name: 'SysManage',
    meta: {
      title: 'sysManage',
      icon: 'setting'
    },
    children: [
      {
        path: 'menu',
        component: () => import('@/views/sys/menu'),
        name: 'MenuManage',
        meta: {
          title: 'menuManage',
          icon: 'unorderedlist',
          roles: ['sys:menu:list']
        }
      },
      {
        path: 'params',
        component: () => import('@/views/sys/params'),
        name: 'ParamsManage',
        meta: {
          title: 'paramsManage',
          icon: 'fileprotect',
          roles: ['sys:params:page']
        }
      },
      {
        path: 'dict',
        component: () => import('@/views/sys/dict'),
        name: 'DictManage',
        meta: {
          title: 'dictManage',
          icon: 'golden-fill',
          roles: ['sys:dict:page']
        }
      },
      {
        path: 'dict/:pid(\\d+)',
        component: () => import('@/views/sys/dict'),
        name: 'DictDetail',
        hidden: true,
        meta: {
          title: 'dictDetail',
          noCache: true,
          roles: ['sys:dict:page']
        }
      },
      {
        path: 'job',
        component: () => import('@/views/job/schedule'),
        name: 'JobManage',
        meta: {
          title: 'jobManage',
          icon: 'dashboard',
          roles: ['sys:schedule:page']
        }
      },
      {
        path: 'oss',
        component: () => import('@/views/oss/oss'),
        name: 'OssManage',
        meta: {
          title: 'ossManage',
          icon: 'upload',
          roles: ['sys:oss:all']
        }
      }
    ]
  },
  {
    path: '/activiti',
    component: Layout,
    name: 'ActivitiManage',
    meta: {
      title: 'activitiManage',
      icon: 'cluster'
    },
    children: [
      {
        path: 'process',
        component: () => import('@/views/activiti/process'),
        name: 'ProcessManage',
        meta: {
          title: 'processManage',
          icon: 'detail',
          roles: ['sys:process:all']
        }
      },
      {
        path: 'model',
        component: () => import('@/views/activiti/model'),
        name: 'ModelManage',
        meta: {
          title: 'modelManage',
          icon: 'appstore-fill',
          roles: ['sys:model:all']
        }
      },
      {
        path: 'running',
        component: () => import('@/views/activiti/running'),
        name: 'RunningManage',
        meta: {
          title: 'runningManage',
          icon: 'play-square',
          roles: ['sys:running:all']
        }
      }
    ]
  },
  {
    path: '/message',
    component: Layout,
    name: 'MessageManage',
    meta: {
      title: 'messageManage',
      icon: 'message'
    },
    children: [
      {
        path: 'sms',
        component: () => import('@/views/message/sms'),
        name: 'SmsManage',
        meta: {
          title: 'smsManage',
          icon: 'message-fill',
          roles: ['sys:sms:all']
        }
      },
      {
        path: 'mail_template',
        component: () => import('@/views/message/mail-template'),
        name: 'MailTemplate',
        meta: {
          title: 'mailTemplate',
          icon: 'mail',
          roles: ['sys:mail:all']
        }
      },
      {
        path: 'mail_log',
        component: () => import('@/views/message/mail-log'),
        name: 'MailLog',
        meta: {
          title: 'mailLog',
          icon: 'detail-fill',
          roles: ['sys:mail:log']
        }
      }
    ]
  },
  {
    path: '/log',
    component: Layout,
    name: 'LogManage',
    meta: {
      title: 'logManage',
      icon: 'container'
    },
    children: [
      {
        path: 'login',
        component: () => import('@/views/sys/log-login'),
        name: 'LogLogin',
        meta: {
          title: 'logLogin',
          icon: 'filedone',
          roles: ['sys:log:login']
        }
      },
      {
        path: 'operation',
        component: () => import('@/views/sys/log-operation'),
        name: 'LogOperation',
        meta: {
          title: 'logOperation',
          icon: 'solution',
          roles: ['sys:log:operation']
        }
      },
      {
        path: 'error',
        component: () => import('@/views/sys/log-error'),
        name: 'LogError',
        meta: {
          title: 'logError',
          icon: 'file-exception',
          roles: ['sys:log:error']
        }
      }
    ]
  },
  {
    path: 'sys-monitor',
    component: Layout,
    meta: {
      title: 'sysMonitor',
      icon: 'desktop'
    },
    alwaysShow: true,
    children: [
      {
        path: 'http://localhost:8080/renren-admin/druid/sql.html',
        meta: {
          title: 'sqlMonitor',
          icon: 'database',
          roles: ['sys:log:operation']
        }
      }
    ]
  }
]

export default sysRouter
