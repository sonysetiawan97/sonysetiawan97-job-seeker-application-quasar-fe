import { api } from 'boot/axios'
import { Cookies } from 'quasar'

export {
  fetch,
  create,
  detail,
  update,
  patch,
  destroy,
  hardDelete,
  trash,
  trashed,
  restore
} from '../resources/actions'

export async function changePassword ({ state, commit, dispatch, getters }, { id, data, params, headers = {}, config = {} }) {
  var token = Cookies.get('authorization_token')
  if (token) {
    headers = { Authorization: `Bearer ${token}`, ...headers }
  }
  config = { ...getters.config, ...config }
  const { collection } = state
  const ROUTE_PATCH = `/${collection}/${id}/password`
  const promise = new Promise((resolve, reject) => {
    return api.put(ROUTE_PATCH, data, { params, headers, ...config }).then(response => {
      const { data /** , status, statusText, headers, config **/ } = response
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
  return promise
}

export async function changeRoles ({ state, commit, dispatch, getters }, { id, data, params, headers = {}, config = {} }) {
  var token = Cookies.get('authorization_token')
  if (token) {
    headers = { Authorization: `Bearer ${token}`, ...headers }
  }
  config = { ...getters.config, ...config }
  const { collection } = state
  const ROUTE_PATCH = `/${collection}/${id}/roles`
  const promise = new Promise((resolve, reject) => {
    return api.put(ROUTE_PATCH, data, { params, headers, ...config }).then(response => {
      const { data /** , status, statusText, headers, config **/ } = response
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
  return promise
}

export async function roles ({ state, commit, dispatch, getters }, { id, params, headers = {}, config = {} } = {}) {
  var token = Cookies.get('authorization_token')
  if (token) {
    headers = { Authorization: `Bearer ${token}`, ...headers }
  }
  config = { ...getters.config, ...config }
  const { collection } = state
  const ROUTE_FETCH = `/${collection}/${id}/roles`
  const promise = new Promise((resolve, reject) => {
    return api.get(ROUTE_FETCH, { params, headers, ...config }).then(response => {
      const { data /** , status, statusText, headers, config **/ } = response
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
  return promise
}

export async function permissions ({ state, commit, dispatch, getters }, { id, params, headers = {}, config = {} } = {}) {
  var token = Cookies.get('authorization_token')
  if (token) {
    headers = { Authorization: `Bearer ${token}`, ...headers }
  }
  config = { ...getters.config, ...config }
  const { collection } = state
  const ROUTE_FETCH = `/${collection}/permissions`
  const promise = new Promise((resolve, reject) => {
    return api.get(ROUTE_FETCH, { params, headers, ...config }).then(response => {
      const { data /** , status, statusText, headers, config **/ } = response
      console.log(data)
      // commit('permissions', [])
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
  return promise
}
