import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  console.log('store permission hasPermission roles: ' + JSON.stringify(roles))
  console.log('store permission hasPermission route: ' + JSON.stringify(route))

  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Use route.path to determine if the current user has permission
 * @param userRoutes
 * @param route
 */
function hasPermissionByRoutes(userRoutes, route) {
  // console.log('=== userRoutes: ' + JSON.stringify(userRoutes) + '\n=== route.path: ' + JSON.stringify(route.path))

  if (route.path) {
    return userRoutes.includes(route.path)
  } else {
    return true
  }

  // return true
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
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
 * Filter asynchronous routing tables by recursion
 * @param allRoutes
 * @param userRoutes
 */
export function filterAsyncRoutesByRoutes(allRoutes, userRoutes) {
  const res = []

  allRoutes.forEach(route => {
    // console.log('filterAsyncRoutesByRoutes route: ' + JSON.stringify(route))

    const tmp = { ...route }
    if (hasPermissionByRoutes(userRoutes, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutesByRoutes(tmp.children, userRoutes)
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
    console.log('generateRoutes: ' + JSON.stringify(roles))

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

  generateRoutesByRoutes({ commit }, routes) {
    console.log('generateRoutesByRoutes: ' + JSON.stringify(routes))

    return new Promise(resolve => {
      // let accessedRoutes
      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }

      // const accessedRoutes = asyncRoutes

      const accessedRoutes = filterAsyncRoutesByRoutes(asyncRoutes, routes)

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
