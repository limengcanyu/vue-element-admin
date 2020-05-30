import { asyncRoutes, constantRoutes } from '@/router'

/**
 * 根据路由角色判断是否具有权限
 *
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  console.log('=== 根据路由角色判断是否具有权限')

  if (route.meta && route.meta.roles) {
    console.log('=== roles: ' + JSON.stringify(roles) + ' route.meta.roles: ' + JSON.stringify(route.meta.roles))

    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 根据路由Path判断是否具有权限
 *
 * Use route.path to determine if the current user has permission
 * @param userRoutes
 * @param route
 */
function hasPermissionByRoutePath(userRoutes, route) {
  console.log('=== 根据路由Path判断是否具有权限')
  // console.log('=== userRoutes: ' + JSON.stringify(userRoutes) + ' route.path: ' + JSON.stringify(route.path))

  if (route.path) {
    return userRoutes.includes(route.path)
  } else {
    return true
  }

  // return true
}

/**
 * 根据路由Name判断是否具有权限
 *
 * Use route.name to determine if the current user has permission
 * @param userRouteNames
 * @param route
 */
function hasPermissionByRouteName(userRouteNames, route) {
  console.log('=== 根据路由Name判断是否具有权限')
  // console.log('=== userRouteNames: ' + JSON.stringify(userRouteNames) + ' route.path: ' + JSON.stringify(route.name))

  if (route.path) {
    return userRouteNames.includes(route.name)
  } else {
    return true
  }

  // return true
}

/**
 * 根据用户role过滤路由
 *
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  console.log('=== 根据用户路由role过滤路由')
  // console.log('=== 用户路由role: ' + JSON.stringify(userRouteNames))

  const res = []

  routes.forEach(route => {
    // console.log('store permission filterAsyncRoutes route: ' + JSON.stringify(route))

    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

/**
 * 根据用户路由path过滤路由
 *
 * Filter asynchronous routing tables by recursion
 * @param allRoutes
 * @param userRoutes
 */
export function filterAsyncRoutesByRoutePath(allRoutes, userRoutes) {
  console.log('=== 根据用户路由path过滤路由')
  // console.log('=== 用户路由path: ' + JSON.stringify(userRouteNames))

  const res = []

  allRoutes.forEach(route => {
    // console.log('filterAsyncRoutesByRoutes route: ' + JSON.stringify(route))

    const tmp = { ...route }
    if (hasPermissionByRoutePath(userRoutes, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutesByRoutePath(tmp.children, userRoutes)
      }
      res.push(tmp)
    }
  })

  return res
}

/**
 * 根据用户路由name过滤路由
 *
 * Filter asynchronous routing tables by recursion
 * @param allRoutes
 * @param userRouteNames
 */
export function filterAsyncRoutesByRouteName(allRoutes, userRouteNames) {
  console.log('=== 根据用户路由name过滤路由')
  // console.log('=== 用户路由name: ' + JSON.stringify(userRouteNames))

  const res = []

  allRoutes.forEach(route => {
    // console.log('filterAsyncRoutesByRoutes route: ' + JSON.stringify(route))

    const tmp = { ...route }
    if (hasPermissionByRouteName(userRouteNames, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutesByRouteName(tmp.children, userRouteNames)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    console.log('=== 根据用户角色生成路由')
    console.log('=== 用户角色: ' + JSON.stringify(roles))

    return new Promise(resolve => {
      // let accessedRoutes
      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }

      const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)

      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },

  generateRoutesByRoutePath({ commit }, routePaths) {
    console.log('=== 根据用户路由Path生成路由')
    console.log('=== 用户路由Path: ' + JSON.stringify(routePaths))

    return new Promise(resolve => {
      // let accessedRoutes
      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }

      // const accessedRoutes = asyncRoutes

      const accessedRoutes = filterAsyncRoutesByRoutePath(asyncRoutes, routePaths)

      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },

  generateRoutesByRouteName({ commit }, routeNames) {
    console.log('=== 根据用户路由Name生成路由')
    console.log('=== 用户路由Name: ' + JSON.stringify(routeNames))

    return new Promise(resolve => {
      // let accessedRoutes
      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }

      // const accessedRoutes = asyncRoutes

      const accessedRoutes = filterAsyncRoutesByRouteName(asyncRoutes, routeNames)

      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
