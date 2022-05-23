import { api } from 'boot/axios'
import { Cookies } from 'quasar'

export async function fetch ({ state, commit, dispatch, getters }, { params, headers = {}, config = {} } = {}) {
  var token = Cookies.get('authorization_token')
  if (token) {
    headers = { Authorization: `Bearer ${token}`, ...headers }
  }
  config = { ...getters.config, ...config }
  const { collection } = state
  const ROUTE_FETCH = `/${collection}`
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

export async function create ({ state, commit, dispatch, getters }, { data, params = {}, headers = {}, config = {} }) {
  var token = Cookies.get('authorization_token')
  const _headers = state.headers

  if (token) {
    headers = { Authorization: `Bearer ${token}`, ...headers, ..._headers }
  }

  if (headers['Content-Type'] === 'multipart/form-data') {
    const formData = new FormData()
    for (const key in data) {
      if (data[key]) formData.append(key, data[key])
    }
    data = formData
  }

  config = { ...getters.config, ...config }
  const { collection } = state
  const ROUTE_CREATE = `/${collection}`
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

export async function detail ({ state, commit, dispatch, getters }, { id, params, headers = {}, config = {} }) {
  var token = Cookies.get('authorization_token')
  if (token) {
    headers = { Authorization: `Bearer ${token}`, ...headers }
  }
  config = { ...getters.config, ...config }
  const { collection } = state
  const ROUTE_DETAIL = `/${collection}/${id}`
  const promise = new Promise((resolve, reject) => {
    return api.get(ROUTE_DETAIL, { params, headers, ...config }).then(response => {
      const { data /** , status, statusText, headers, config **/ } = response
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
  return promise
}

export async function update ({ state, commit, dispatch, getters }, { id, data, params, headers = {}, config = {} }) {
  var token = Cookies.get('authorization_token')
  const _headers = state.headers
  data._method = 'PUT'

  if (token) {
    headers = { Authorization: `Bearer ${token}`, ...headers, ..._headers }
  }

  if (headers['Content-Type'] === 'multipart/form-data') {
    const formData = new FormData()
    for (const key in data) {
      if (data[key]) formData.append(key, data[key])
    }
    data = formData
  }

  config = { ...getters.config, ...config }
  const { collection } = state
  const ROUTE_UPDATE = `/${collection}/${id}`
  const promise = new Promise((resolve, reject) => {
    return api.post(ROUTE_UPDATE, data, { params, headers, ...config }).then(response => {
    // return api.put(ROUTE_UPDATE, data, { params, headers, ...config }).then(response => {
      const { data /** , status, statusText, headers, config **/ } = response
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
  return promise
}

export async function patch ({ state, commit, dispatch, getters }, { id, data, params, headers = {}, config = {} }) {
  var token = Cookies.get('authorization_token')
  if (token) {
    headers = { Authorization: `Bearer ${token}`, ...headers }
  }
  config = { ...getters.config, ...config }
  const { collection } = state
  const ROUTE_PATCH = `/${collection}/${id}`
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

// Destroy Model by ID /collection/{id}
// Destroy Collection by selected Ids /collection/selected --params selected=[1,2,3]
// Destroy all Models in Collection /collection/all
export async function destroy ({ state, commit, dispatch, getters }, { type, data, params, headers = {}, config = {} }) {
  var token = Cookies.get('authorization_token')
  if (token) {
    headers = { Authorization: `Bearer ${token}`, ...headers }
  }
  config = { ...getters.config, ...config }
  const { collection } = state
  const ROUTE_DESTROY = `/${collection}/${type}` // Softdelete
  const promise = new Promise((resolve, reject) => {
    return api.delete(ROUTE_DESTROY, { data, params, headers, ...config }).then(response => {
      const { data /** , status, statusText, headers, config **/ } = response
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
  return promise
}

// Delete Model by ID /collection/{id}/delete
// Delete Collection by selected Ids /collection/selected/delete --params ids=[1,2,3]
// Delete all Models in Collection /collection/all/delete
export async function hardDelete ({ state, commit, dispatch, getters }, { type, data, params, headers = {}, config = {} }) {
  var token = Cookies.get('authorization_token')
  if (token) {
    headers = { Authorization: `Bearer ${token}`, ...headers }
  }
  config = { ...getters.config, ...config }
  const { collection } = state
  const ROUTE_DELETE = `/${collection}/${type}/delete` // Permanent delete
  const promise = new Promise((resolve, reject) => {
    return api.delete(ROUTE_DELETE, { data, params, headers, ...config }).then(response => {
      const { data /** , status, statusText, headers, config **/ } = response
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
  return promise
}

export async function trash ({ state, commit, dispatch, getters }, { params, headers = {}, config = {} }) {
  var token = Cookies.get('authorization_token')
  if (token) {
    headers = { Authorization: `Bearer ${token}`, ...headers }
  }
  config = { ...getters.config, ...config }
  const { collection } = state
  const ROUTE_TRASH = `/${collection}/trash` // Trash of collection
  const promise = new Promise((resolve, reject) => {
    return api.get(ROUTE_TRASH, { params, headers }).then(response => {
      const { data /** , status, statusText, headers, config **/ } = response
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
  return promise
}

export async function trashed ({ state, commit, dispatch, getters }, { id, params, headers = {}, config = {} }) {
  var token = Cookies.get('authorization_token')
  if (token) {
    headers = { Authorization: `Bearer ${token}`, ...headers }
  }
  config = { ...getters.config, ...config }
  const { collection } = state
  const ROUTE_TRASHED = `/${collection}/${id}/trashed` // Data trashed detail
  const promise = new Promise((resolve, reject) => {
    return api.get(ROUTE_TRASHED, { params, headers, ...config }).then(response => {
      const { data /** , status, statusText, headers, config **/ } = response
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
  return promise
}

// Restore Model by ID /collection/{id}/restore
// Restore Collection by selected Ids /collection/selected/restore --params selected=[1,2,3]
// Restore all Models in Collection /collection/all/restore
export async function restore ({ state, commit, dispatch, getters }, { type, data, params, headers = {}, config = {} }) {
  var token = Cookies.get('authorization_token')
  if (token) {
    headers = { Authorization: `Bearer ${token}`, ...headers }
  }
  config = { ...getters.config, ...config }
  const { collection } = state
  const ROUTE_RESTORE = `/${collection}/${type}/restore` // Restore of collection
  const promise = new Promise((resolve, reject) => {
    return api.post(ROUTE_RESTORE, data, { params, headers, ...config }).then(response => {
      const { data /** , status, statusText, headers, config **/ } = response
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
  return promise
}
