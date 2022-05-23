import { required } from '@vuelidate/validators'
import state from '../resources/state'
export const collection = 'countries'
export const params = {
  'orderby[name]': 'asc'
}
export const columns = [
  {
    name: 'isocode',
    required: true,
    label: 'ISO Code ',
    align: 'left',
    field: 'isocode',
    format: (val) => val,
    sortable: true
  },
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'name',
    format: (val) => val,
    sortable: true
  },
  {
    name: 'phonecode',
    required: true,
    label: 'Phone Code',
    align: 'left',
    field: 'phonecode',
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
  isocode: null,
  name: null,
  phonecode: null
}
export const resetValue = {...form}
export const layout = [
  [
    {
      type: 'QInput',
      col: 'col-2',
      name: 'isocode',
      label: 'ISO Code',
      props: {
        maxlength: 2
      },
      events: {}
    },
    {
      type: 'QInput',
      col: 'col-6',
      name: 'name',
      label: 'Country',
      props: {
        maxlength: 50
      },
      events: {}
    },
    {
      type: 'QInput',
      col: 'col-2',
      name: 'phonecode',
      label: 'Phone Code',
      props: {
        maxlength: 3
      },
      events: {}
    }
  ]
]

export const validation = {
  isocode: {
    required
  },
  name: {
    required
  },
  phonecode: {
    required
  }
}

export default function () {
  return {
    ...state(),
    // Collection name
    collection,
    params,
    // Datatable config
    columns,
    form,
    resetValue,
    layout,
    validation
  }
}
