import { api } from 'boot/axios'
import { Cookies } from 'quasar'

const REGISTER_ROUTE = '/user/register'
const VERIFICATION_ROUTE = '/auth/verify'
const LOGIN_ROUTE = '/user/login'
const CHANGE_PASSWORD = '/user/password'
const FETCH_USER_ROUTE = '/user/profile'
const PASSWORD_FORGOT_ROUTE = '/user/forgot'
const PASSWORD_RESET_ROUTE = '/auth/password/reset'

export function register ({ state, commit, dispatch }, data) {
  const p = new Promise(function (resolve, reject) {
    return api
      .post(REGISTER_ROUTE, data)
      .then(response => {
        const { data /** , status, statusText, headers, config **/ } = response
        resolve(data)
      })
      .catch(error => {
        reject(error)
      })
  })
  return p
}

export function login ({ state, commit, dispatch }, data) {
  const p = new Promise(function (resolve, reject) {
    return api
      .post(LOGIN_ROUTE, data)
      .then(response => {
        const { data /** , status, statusText, headers, config **/ } = response
        const user = data.data
        commit('setUser', user.user)
        commit('setRoles', [user.role])
        commit('loggedIn')
        const token = user.token
        api.defaults.headers.common.Authorization = 'Bearer ' + token
        dispatch('setToken', {
          token: token,
          rememberMe: state.rememberMe
        })
        resolve()
      })
      .catch(error => {
        reject(error)
      })
  })
  return p
}

export function forgotPassword ({ state, commit, dispatch }, data) {
  const p = new Promise(function (resolve, reject) {
    return api
      .post(PASSWORD_FORGOT_ROUTE, data)
      .then(response => {
        const { data /** , status, statusText, headers, config **/ } = response
        resolve(data)
      })
      .catch(error => {
        reject(error)
      })
  })
  return p
}

export function verifyEmail ({ state, commit, dispatch }, {id, params}) {
  const p = new Promise(function (resolve, reject) {
    return api
      .get(`/user/verify-email/${id}`, { params })
      .then(response => {
        const { data /** , status, statusText, headers, config **/ } = response
        resolve(data)
      })
      .catch(error => {
        reject(error)
      })
  })
  return p
}

export function setToken (state, data) {
  api.defaults.headers.common.Authorization = 'Bearer ' + data.token.access_token
  if (data.rememberMe) {
    Cookies.set('authorization_token', data.token.access_token, {
      expires: 365,
      path: '/'
    })
  } else {
    Cookies.set('authorization_token', data.token.access_token, {
      expires: 30,
      path: '/'
    })
  }
}

export async function fetch ({commit}) {
  var token = Cookies.get('authorization_token')
  if (token) {
    const headers = { Authorization: `Bearer ${token}`}
    return api.get(FETCH_USER_ROUTE, { headers }).then(response => {
      const { data /** , status, statusText, headers, config **/ } = response
      commit('setUser', data.data)
      commit('setPermissions', data.permissions)
      commit('setRoles', [data.role])
      commit('loggedIn')
    })
  }
}

export async function userPermissions ({commit}) {
  var token = Cookies.get('authorization_token')
  if (token) {
    const headers = { Authorization: `Bearer ${token}`}
    const FETCH_USER_ROUTE = '/user/permissions'
    return api.get(FETCH_USER_ROUTE, { headers }).then(response => {
      const { data /** , status, statusText, headers, config **/ } = response
      commit('setPermissions', data.data)
    })
  }
}

export function logout (state) {
  state.commit('loggedOut')
  Cookies.remove('authorization_token')
  state.commit('setUser', null)
}

export function verify (state, token) {
  return api.get(VERIFICATION_ROUTE + '?token=' + token)
}

export function passwordForgot (state, data) {
  return api.post(PASSWORD_FORGOT_ROUTE, data)
}

export function passwordReset (state, { token, data }) {
  return api.post(PASSWORD_RESET_ROUTE + '?token=' + token, data)
}

export function rememberMe ({ state, commit, dispatch }) {
  commit('rememberMe')
}

export function forgetMe ({ state, commit, dispatch }) {
  commit('forgetMe')
}

export function changePassword ({ state, commit, dispatch }, data) {
  const p = new Promise(function (resolve, reject) {
    return api
      .patch(CHANGE_PASSWORD, data)
      .then(response => {
        const { data /** , status, statusText, headers, config **/ } = response
        resolve(data)
      })
      .catch(error => {
        reject(error)
      })
  })
  return p
}
