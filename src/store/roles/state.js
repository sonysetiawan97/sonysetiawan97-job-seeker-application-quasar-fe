import { required } from '@vuelidate/validators'
import state from '../resources/state'
export const collection = 'roles'
export const data = []
export const columns = [
  {
    name: 'name',
    required: true,
    label: 'Role',
    align: 'left',
    field: 'name',
    format: (val) => val,
    sortable: true
  },
  {
    name: 'guard_name',
    required: true,
    label: 'Guard',
    align: 'left',
    field: 'guard_name',
    format: (val) => val,
    sortable: true
  },
  // Always give this columns as default
  {
    name: 'action',
    label: null,
    field: 'key'
  }
]

export const form = {
  name: null,
  guard_name: 'web'
}

export const resetValue = {...form}

export const layout = [
  [
    {
      type: 'QInput',
      col: 'col-8',
      name: 'name',
      label: 'Role',
      props: {
        maxlength: 100,
      },
      events: {}
    },
    {
      type: 'QInput',
      col: 'col-3',
      name: 'guard_name',
      label: 'Guard',
      props: {
        maxlength: 25,
      },
      events: {}
    }
  ]
]

export const validation = {
  name: {
    required
  },
  guard_name: {
    required
  }
}

export default function () {
  return {
    ...state(),
    // Collection name
    collection,
    // Datatable config
    columns,
    form,
    resetValue,
    layout,
    validation
  }
}
