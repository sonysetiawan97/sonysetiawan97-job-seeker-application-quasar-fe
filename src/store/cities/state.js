import { required } from '@vuelidate/validators'
import state from '../resources/state'
export const collection = 'cities'
export const headers = {
  'Content-Type': 'multipart/form-data'
}
export const params = {
  relationship: ['country', 'province']
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
    name: 'province_id',
    required: true,
    label: 'Province',
    align: 'left',
    field: 'province_id',
    sortable: false,
    format: (val, row) => {
      if (!row.province) return '-'
      return `${row.province.name}`
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
  country_id: null,
  province_id: null,
  name: null
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
      updateValues: ['province_id'], // update values to be null on value changed
      events: {}
    },
    {
      type: 'QSelect',
      col: 'col-4',
      name: 'province_id',
      label: 'Province',
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
      reference: 'provinces',
      params: ['country_id'], // additional params on searching
      events: {}
    }
  ],
  [
    {
      type: 'QInput',
      col: 'col-5',
      name: 'name',
      label: 'City Name',
      props: {
        maxlength: 50
      },
      events: {}
    }
  ]
]

export const validation = {
  country_id: {
    required
  },
  province_id: {
    required
  },
  name: {
    required
  }
}

export default function () {
  return {
    ...state(),
    headers,
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
