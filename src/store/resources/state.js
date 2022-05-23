export const collection = null
export const form = {}
export const resetValue = {...form}
export const params = {}
export const layout = []
export const validation = {}
export const data = []
export const columns = []
export const headers = {
  'Content-Type': 'application/json'
}

export const baseURL = process.env.APIURL

export default () => {
  return {
    // Collection name
    collection,
    // Parameters searching
    params,
    // Form data input
    form,
    // Form layout
    layout,
    // Form validation
    validation, // for validation use vuelidate
    // Data fetched from API
    data,
    // Datatable config
    columns,
    // configuration axios
    config: {
      baseURL
    },
    headers,
    resetValue
  }
}
