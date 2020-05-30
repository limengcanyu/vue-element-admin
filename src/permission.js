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
  console.log('===================================================================')
  console.log('=== router.beforeEach to.path: ' + to.path)

  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  console.log('=== router.beforeEach hasToken: ' + hasToken)

  if (hasToken) {
    console.log('=== router.beforeEach user has token hasToken: ' + hasToken)

    if (to.path === '/login') {
      console.log('=== router.beforeEach user to login')

      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      console.log('=== router.beforeEach user not to login')

      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      console.log('=== router.beforeEach hasRoles: ' + hasRoles)

      // determine whether the user has obtained his permission routes through getInfo
      // const hasRoutes = store.getters.routePaths && store.getters.routePaths.length > 0
      // console.log('=== router.beforeEach hasRoutes: ' + hasRoutes)

      const hasRoutes = store.getters.routeNames && store.getters.routeNames.length > 0
      console.log('=== router.beforeEach hasRoutes: ' + hasRoutes)

      if (hasRoles) {
        console.log('=== router.beforeEach user has roles')
        console.log('=== hasRoles: ' + JSON.stringify(hasRoles))
        console.log('=== hasRoutes: ' + JSON.stringify(hasRoutes))

        next()
      } else {
        console.log('=== router.beforeEach user has no roles')

        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          // const { roles } = await store.dispatch('user/getInfo')
          // console.log('get user info completed')

          // // generate accessible routes map based on roles
          // const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          // console.log('generate accessible routes map based on roles completed')

          // const { routePaths } = await store.dispatch('user/getInfo')
          // console.log('get user info completed routePaths: ' + JSON.stringify(routePaths))

          // // generate accessible routes map based on roles
          // const accessRoutes = await store.dispatch('permission/generateRoutesByRoutePath', routePaths)
          // console.log('generate accessible routes map based on route path completed')

          const { routeNames } = await store.dispatch('user/getInfo')
          console.log('=== router.beforeEach get user info completed routeNames: ' + JSON.stringify(routeNames))

          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutesByRouteName', routeNames)
          console.log('=== router.beforeEach generate accessible routes map based on route name completed accessRoutes: ')
          console.log(accessRoutes)

          // dynamically add accessible routes
          router.addRoutes(accessRoutes)
          console.log('=== router.beforeEach dynamically add accessible routes completed')

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
    console.log('=== router.beforeEach user has no token')

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
