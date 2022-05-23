import { required } from '@vuelidate/validators'
import state from '../resources/state'
export const collection = 'addresses'
export const params = {
  relationship: ['country', 'province', 'city']
}
export const columns = [
  {
    name: 'country_id',
    required: true,
    label: 'Country',
    align: 'left',
    field: 'country_id',
    format: (val, row) => {
      if (!row.country) return '-'
      return `${row.country.name}`
    },
    sortable: true
  },
  {
    name: 'province_id',
    required: true,
    label: 'Province',
    align: 'left',
    field: 'province_id',
    format: (val, row) => {
      if (!row.province) return '-'
      return `${row.province.name}`
    },
    sortable: true
  },
  {
    name: 'city_id',
    required: true,
    label: 'City',
    align: 'left',
    field: 'city_id',
    format: (val, row) => {
      if (!row.city) return '-'
      return `${row.city.name}`
    },
    sortable: true
  },
  {
    name: 'address',
    required: true,
    label: 'Address',
    align: 'left',
    field: 'address',
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
  foreign_table: null,
  foreign_id: null,

  country_id: null,
  province_id: null,
  city_id: null,
  address: null,
  postalcode: null,
  latitude: null,
  longitude: null
}

export const resetValue = {
  ...form
}

export const layout = [
  [
    {
      type: 'QSelect',
      col: 'col',
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
      updateValues: ['province_id', 'city_id'], // update values to be null on value changed
      events: {}
    },
    {
      type: 'QSelect',
      col: 'col',
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
      updateValues: ['city_id'], // update values to be null on value changed
      events: {}
    },
    {
      type: 'QSelect',
      col: 'col',
      name: 'city_id',
      label: 'City',
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
      reference: 'cities',
      params: ['country_id', 'province_id'], // additional params on searching
      events: {}
    }
  ],
  [
    {
      type: 'QInput',
      col: 'col',
      name: 'address',
      label: 'Address',
      props: {
        maxlength: 1000,
        autogrow: true
      },
      events: {}
    }
  ],
  [
    {
      type: 'QInput',
      col: 'col-2',
      name: 'postalcode',
      label: 'Postal Code',
      props: {
        maxlength: 5
      },
      events: {}
    },
    {
      type: 'QInput',
      col: 'col',
      name: 'latitude',
      label: 'Latitude',
      props: {
        maxlength: 50,
        hint: '— optional'
      },
      events: {}
    },
    {
      type: 'QInput',
      col: 'col',
      name: 'longitude',
      label: 'Longitude',
      props: {
        maxlength: 50,
        hint: '— optional'
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
  city_id: {
    required
  },
  address: {
    required
  },
  postalcode: {
    required
  },
  latitude: {},
  longitude: {}
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
    params,
    validation
  }
}
