import { required } from '@vuelidate/validators'
import state from '../resources/state'

export const collection = 'sysparams'
export const params = {
  'orderby[group]': 'asc'
}
export const form = {
  group: null,
  key: null,
  value: null,
  data: null,
  order: 0,
  status: 'active',
}
export const resetValue = {...form}

export const columns = [
  {
    name: 'group',
    required: true,
    label: 'Group',
    align: 'left',
    field: 'group',
    format: (val) => val,
    sortable: true
  },
  {
    name: 'key',
    required: true,
    label: 'Key',
    align: 'left',
    field: 'key',
    format: (val) => val,
    sortable: true
  },
  {
    name: 'value',
    required: true,
    label: 'Value',
    align: 'left',
    field: 'value',
    format: (val) => val,
    sortable: true
  },
  {
    name: 'order',
    required: true,
    label: 'Order',
    align: 'left',
    field: 'order',
    format: (val) => val,
    sortable: true
  },
  {
    name: 'status',
    required: true,
    label: 'Status',
    align: 'left',
    field: 'status',
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

export const layout = [
  [
    {
      type: 'QInput',
      col: 'col-2',
      name: 'group',
      label: 'Group',
      props: {
        type: 'text',
        maxlength: 1024
      },
      events: {}
    },
    {
      type: 'QInput',
      col: 'col-2',
      name: 'key',
      label: 'Key',
      props: {
        type: 'text',
        maxlength: 1024
      },
      events: {}
    }
  ],
  [
    {
      type: 'QInput',
      col: 'col-6',
      name: 'value',
      label: 'Value',
      props: {
        type: 'text',
        maxlength: 1024
      },
      events: {}
    }
  ],
  [
    {
      type: 'QInput',
      col: 'col-2',
      name: 'order',
      label: 'Order',
      props: {
        type: 'number',
        maxlength: 1024
      },
      events: {}
    },
  ],
]

export const validation = {
  group: { required },
  key:  { required },
  value:  { required },
  data: {},
  order: {},
  status: {},
}

export const data = []
export const route = {}

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
    validation,
    route
  }
}
