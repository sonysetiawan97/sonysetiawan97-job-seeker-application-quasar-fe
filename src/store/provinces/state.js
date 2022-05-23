import { required } from '@vuelidate/validators'
import state from '../resources/state'
export const collection = 'provinces'
export const params = {
  relationship: 'country'
}

export const columns = [
  {
    name: 'country_id',
    required: true,
    label: 'Country',
    align: 'left',
    field: 'country_id',
    sortable: false,
    format: (val, row) => {
      if (!row.country) return '-'
      return `${row.country.name}`
    }
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
  // Always give this columns as default
  {
    name: 'action',
    label: null,
    field: 'key'
  }
]

export const form = {
  name: null,
  country_id: null
}
export const resetValue = {...form}
export const layout = [
  [
    {
      type: 'QSelect',
      col: 'col-4',
      name: 'country_id',
      label: 'Country',
      props: {
        options: [],
        'use-input': true,
        'emit-value': true,
        'map-options': true,
        'option-value': 'id',
        'option-label': 'name',
        'hide-selected': true,
        'fill-input': true
      },
      reference: 'countries',
      events: {}
    },
    {
      type: 'QInput',
      col: 'col-5',
      name: 'name',
      label: 'Province Name',
      props: {
        maxlength: 50
      },
      events: {}
    }
  ]
]

export const validation = {
  name: {
    required
  },
  country_id: {
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
    params,
    form,
    resetValue,
    layout,
    validation
  }
}
