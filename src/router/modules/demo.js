/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const demoRouter = [
  {
    path: '/demo',
    component: Layout,
    name: 'Demo',
    meta: {
      title: 'demo',
      icon: 'windows'
    },
    alwaysShow: true,
    children: [
      {
        path: 'news',
        component: () => import('@/views/demo/news'),
        name: 'NewsManage',
        meta: {
          title: 'newsManage',
          icon: 'file-word',
          roles: ['demo:news:all']
        }
      }
    ]
  }
]

export default demoRouter
