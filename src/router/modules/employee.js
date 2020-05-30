/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const employeeRouter = {
  path: '/employee',
  component: Layout,
  redirect: 'noRedirect',
  name: 'EmployeeComponent',
  meta: {
    // title: 'Components',
    title: '人员管理',
    icon: 'component'
  },
  children: [
    {
      path: 'employee-list',
      component: () => import('@/views/employee/employee-list'),
      name: 'EmployeeList',
      meta: { title: '人员列表' }
    },
    {
      path: 'employee-add',
      component: () => import('@/views/employee/employee-add'),
      name: 'EmployeeAdd',
      meta: { title: '人员新增' }
    }
  ]
}

export default employeeRouter
