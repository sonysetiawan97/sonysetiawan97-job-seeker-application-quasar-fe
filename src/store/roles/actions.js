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

import { api } from 'boot/axios'
import { Cookies } from 'quasar'

export async function getPermissions ({ state, commit, dispatch, getters }, { id, params, headers = {}, config = {} } = {}) {
  var token = Cookies.get('authorization_token')
  if (token) {
    headers = { Authorization: `Bearer ${token}`, ...headers }
  }
  config = { ...getters.config, ...config }
  const { collection } = state
  const ROUTE_FETCH = `/${collection}/${id}/permissions`
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

export async function changePermissions ({ state, commit, dispatch, getters }, { id, data, params, headers = {}, config = {} }) {
  var token = Cookies.get('authorization_token')
  if (token) {
    headers = { Authorization: `Bearer ${token}`, ...headers }
  }
  config = { ...getters.config, ...config }
  const { collection } = state
  const ROUTE_PATCH = `/${collection}/${id}/permissions`
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
