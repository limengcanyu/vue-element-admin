import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    console.log('user has token')

    if (to.path === '/login') {
      console.log('user to login')

      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      console.log('user not to login')

      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        console.log('user has roles')

        next()
      } else {
        console.log('user has no roles')

        try {
          // 根据用户角色生成路由
          // // get user info
          // // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          // const { roles } = await store.dispatch('user/getInfo')
          // console.log('get user info completed')
          //
          // // generate accessible routes map based on roles
          // const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          // console.log('generate accessible routes map based on roles completed')

          // 根据用户路由生成路由
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { routes } = await store.dispatch('user/getInfo')
          console.log('get user info completed')

          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutesByRoutes', routes)
          console.log('generate accessible routes map based on roles completed')

          // dynamically add accessible routes
          router.addRoutes(accessRoutes)
          console.log('dynamically add accessible routes completed')

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    console.log('user has no token')

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
