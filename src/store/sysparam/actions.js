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

export async function groups ({ state, commit, dispatch, getters }, { params, headers = {}, config = {} } = {}) {
  var token = Cookies.get('authorization_token')
  if (token) {
    headers = { Authorization: `Bearer ${token}`, ...headers }
  }
  config = { ...getters.config, ...config }
  const { collection } = state
  const ROUTE_FETCH = `/${collection}/groups`
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
