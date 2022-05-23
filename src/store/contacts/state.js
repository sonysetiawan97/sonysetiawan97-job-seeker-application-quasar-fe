import { required } from '@vuelidate/validators'
import state from '../resources/state'
export const collection = 'contacts'
export const columns = [
  {
    name: 'type',
    required: true,
    label: 'Contact Type ',
    align: 'left',
    field: 'type',
    format: (val) => val.charAt(0).toUpperCase() + val.slice(1),
    sortable: true
  },
  {
    name: 'contact',
    required: true,
    label: 'contact',
    align: 'left',
    field: 'contact',
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
  type: null,
  contact: null
}
export const resetValue = {...form}

export const layout = [
  [
    {
      type: 'QSelect',
      col: 'col-4',
      name: 'type',
      label: 'Contact Type',
      props: {
        options: [
          {
            label: 'Phone',
            value: 'phone'
          },
          {
            label: 'Mobile',
            value: 'mobile'
          },
          {
            label: 'Email',
            value: 'email'
          },
          {
            label: 'Fax',
            value: 'fax'
          },
          {
            label: 'Other',
            value: 'other'
          }
        ],
        'use-input': true,
        'emit-value': true,
        'map-options': true,
        'option-value': 'value',
        'option-label': 'label',
        'hide-selected': true,
        'fill-input': true
      },
      events: {}
    },
    {
      type: 'QInput',
      col: 'col',
      name: 'contact',
      label: 'Contact',
      props: {
      },
      events: {}
    }
  ]
]

export const validation = {
  type: {
    required
  },
  contact: {
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
