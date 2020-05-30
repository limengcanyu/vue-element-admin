/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const salaryRouter = {
  path: '/salary',
  component: Layout,
  redirect: 'noRedirect',
  name: 'SalaryComponent',
  meta: {
    // title: 'Components',
    title: '薪酬管理',
    icon: 'component'
  },
  children: [
    {
      path: 'salary-config',
      component: () => import('@/views/salary/salary-config'),
      name: 'SalaryConfig',
      meta: { title: '薪资配置' }
    },
    {
      path: 'salary-search',
      component: () => import('@/views/salary/salary-search'),
      name: 'SalarySearch',
      meta: { title: '薪资查询' }
    },
    {
      path: 'attendance-summary',
      component: () => import('@/views/salary/attendance-summary'),
      name: 'AttendanceSummary',
      meta: { title: '考勤汇总' }
    },
    {
      path: 'salary-input',
      component: () => import('@/views/salary/salary-input'),
      name: 'SalaryInput',
      meta: { title: '薪资录入' }
    },
    {
      path: 'social-fund',
      component: () => import('@/views/salary/social-fund'),
      name: 'SocialFund',
      meta: { title: '五险一金' }
    },
    {
      path: 'special-additional',
      component: () => import('@/views/salary/special-additional'),
      name: 'SpecialAdditional',
      meta: { title: '专项附加' }
    },
    {
      path: 'compute-execute',
      component: () => import('@/views/salary/compute-execute'),
      name: 'ComputeExecute',
      meta: { title: '计算执行' }
    },
    {
      path: 'salary-verify',
      component: () => import('@/views/salary/salary-verify'),
      name: 'SalaryVerify',
      meta: { title: '薪资审核' }
    },
    {
      path: 'salary-offer',
      component: () => import('@/views/salary/salary-offer'),
      name: 'SalaryOffer',
      meta: { title: '薪资报盘' }
    },
    {
      path: 'salary-over',
      component: () => import('@/views/salary/salary-over'),
      name: 'SalaryOver',
      meta: { title: '薪资过数' }
    }
  ]
}

export default salaryRouter
