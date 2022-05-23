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

export async function upcreate ({ state, commit, dispatch, getters }, { data, params = {}, headers = {}, config = {} }) {
  var token = Cookies.get('authorization_token')
  const _headers = state.headers

  if (token) {
    headers = { Authorization: `Bearer ${token}`, ...headers, ..._headers }
  }

  headers['Content-Type'] = 'multipart/form-data'

  const formData = new FormData()
  for (const key in data) {
    if (data[key]) formData.append(key, data[key])
  }
  data = formData
  config = { ...getters.config, ...config }
  const { collection } = state
  const ROUTE_CREATE = `/${collection}/upcreate`
  const promise = new Promise((resolve, reject) => {
    return api.post(ROUTE_CREATE, data, { params, headers, ...config }).then(response => {
      const { data /** , status, statusText, headers, config **/ } = response
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
  return promise
}
