import { api } from 'boot/axios'

export const formDataConverter = (data) => {
  const formData = new FormData()
  for (const key in data) {
    if (data[key]) formData.append(key, data[key])
  }
  return formData
}

export const get = async (url, { params, headers = {}, config = {} } = {}) => {
  try {
    return await api.get(url, { params, headers, ...config })
  } catch (error) {
    throw error
  }
}

export const post = async (url, { data, params = {}, headers = {}, config = {} }) => {
  try {
    return await api.post(url, data, { params, headers, ...config })
  } catch (error) {
    throw error
  }
}

export const put = async (url, { data, params = {}, headers = {}, config = {} }) => {
  try {
    return await api.put(url, data, { params, headers, ...config })
  } catch (error) {
    throw error
  }
}

export const patch_ = async (url, { data, params = {}, headers = {}, config = {} }) => {
  try {
    return await api.patch(url, data, { params, headers, ...config })
  } catch (error) {
    throw error
  }
}

export const del = async (url, { data, params = {}, headers = {}, config = {} }) => {
  try {
    return await api.delete(url, {data, params, headers, ...config })
  } catch (error) {
    throw error
  }
}


export async function fetch (url, { params, headers = {}, config = {} } = {}) {
  try {
    const response = await get(url, { params, headers, ...config })
    const { data /** , status, statusText, headers, config **/ } = response
    return data
  } catch (error) {
    throw error
  }
}

export async function create (url, { data, params = {}, headers = {}, config = {} }) {
  try {
    const response = await post(url, data, { params, headers, ...config })
    const { data /** , status, statusText, headers, config **/ } = response
    return data
  } catch (error) {
    throw error
  }
}

export async function detail (url, { id, params, headers = {}, config = {} }) {
  try {
    const endpoint = `/${url}/${id}`
    const response = await get(endpoint, { params, headers, ...config })
    const { data /** , status, statusText, headers, config **/ } = response
    return data
  } catch (error) {
    throw error
  }
}

export async function update (url, { id, data, params, headers = {}, config = {} }) {
  try {
    data._method = 'PUT'
    const endpoint = `/${url}/${id}`
    const response = await post(endpoint, data, { params, headers, ...config })
    const { data /** , status, statusText, headers, config **/ } = response
    return data
  } catch (error) {
    throw error
  }
}

export async function patch (url, { id, data, params, headers = {}, config = {} }) {
  try {
    data._method = 'PATCH'
    const endpoint = `/${url}/${id}`
    const response = await post(endpoint, data, { params, headers, ...config })
    const { data /** , status, statusText, headers, config **/ } = response
    return data
  } catch (error) {
    throw error
  }
}

// Destroy Model by ID /collection/{id}
// Destroy Collection by selected Ids /collection/selected --params selected=[1,2,3]
// Destroy all Models in Collection /collection/all
export async function destroy (url, { type, data, params, headers = {}, config = {} }) {
  try {
    const endpoint = `/${url}/${type}`
    const response = await del(endpoint, { data, params, headers, ...config })
    const { data /** , status, statusText, headers, config **/ } = response
    return data
  } catch (error) {
    throw error
  }
}

// Delete Model by ID /collection/{id}/delete
// Delete Collection by selected Ids /collection/selected/delete --params ids=[1,2,3]
// Delete all Models in Collection /collection/all/delete
export async function hardDelete (url, { type, data, params, headers = {}, config = {} }) {
  try {
    const endpoint = `/${url}/${type}/delete`
    const response = await del(endpoint, { data, params, headers, ...config })
    const { data /** , status, statusText, headers, config **/ } = response
    return data
  } catch (error) {
    throw error
  }
}

export async function trash (url, { params, headers = {}, config = {} }) {
  try {
    const endpoint = `/${url}/trash` // Trash of collection
    const response = await get(endpoint, { params, headers, ...config })
    const { data /** , status, statusText, headers, config **/ } = response
    return data
  } catch (error) {
    throw error
  }
}

export async function trashed (url, { id, params, headers = {}, config = {} }) {
  try {
    const endpoint = `/${url}/${id}/trashed` // Trash of collection
    const response = await get(endpoint, { params, headers, ...config })
    const { data /** , status, statusText, headers, config **/ } = response
    return data
  } catch (error) {
    throw error
  }
}

// Restore Model by ID /collection/{id}/restore
// Restore Collection by selected Ids /collection/selected/restore --params selected=[1,2,3]
// Restore all Models in Collection /collection/all/restore
export async function restore (url, { type, data, params, headers = {}, config = {} }) {
  try {
    const endpoint = `/${url}/${type}/restore`
    const response = await post(endpoint, data, { params, headers, ...config })
    const { data /** , status, statusText, headers, config **/ } = response
    return data
  } catch (error) {
    throw error
  }
}
