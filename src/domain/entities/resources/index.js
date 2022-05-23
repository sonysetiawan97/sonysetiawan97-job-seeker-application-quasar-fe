export const collection = null
export { form } from 'form'
export { params } from 'params'
export { layout } from 'layout'
export { validation } from 'validation'
export { data } from 'data'
export { columns } from 'columns'

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
  }
}
